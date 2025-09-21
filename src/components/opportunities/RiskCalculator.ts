import {
  type UserFormData,
  type CancerRiskData,
  type RiskAssessmentResult,
  type CancerRiskResult,
  type CancerType,
  type AgeRiskGroup,
} from "~/types/cancer-risk";

/**
 * Определяет возрастную группу пользователя
 */
function getAgeGroup(age: number): "young" | "middle" | "elderly" {
  if (age >= 18 && age <= 39) return "young";
  if (age >= 40 && age <= 64) return "middle";
  return "elderly";
}

/**
 * Получает базовый риск для конкретного типа рака
 */
function getBaseRisk(cancerType: CancerType, formData: UserFormData): number {
  const ageGroup = getAgeGroup(formData.age);
  const genderRisks: AgeRiskGroup = cancerType.baseRisk[formData.gender];
  return genderRisks[ageGroup];
}

/**
 * Применяет модификаторы риска на основе факторов пользователя
 */
function applyRiskModifiers(
  baseRisk: number,
  cancerType: CancerType,
  formData: UserFormData,
): number {
  let totalRisk = baseRisk;
  const factors = cancerType.riskFactors;

  // Курение
  const smokingModifier = factors.smoking[formData.smoking];
  totalRisk *= smokingModifier;

  // Алкоголь
  const alcoholModifier = factors.alcohol[formData.alcohol];
  totalRisk *= alcoholModifier;

  // Физическая активность
  const activityModifier = factors.physicalActivity[formData.physicalActivity];
  totalRisk *= activityModifier;

  // Питание
  const dietModifier = factors.diet[formData.diet];
  totalRisk *= dietModifier;

  // Семейная история
  const familyModifier = factors.familyHistory[formData.familyHistory];
  totalRisk *= familyModifier;

  // Работа с химикатами
  const chemicalsModifier = factors.chemicals[formData.chemicals];
  totalRisk *= chemicalsModifier;

  // Радиация
  const radiationModifier = factors.radiation[formData.radiation];
  totalRisk *= radiationModifier;

  // Диабет (если применимо)
  if (factors.diabetes && formData.diabetes) {
    const diabetesModifier = factors.diabetes[formData.diabetes];
    totalRisk *= diabetesModifier;
  }

  // Гипертония (если применимо)
  if (factors.hypertension && formData.hypertension) {
    const hypertensionModifier = factors.hypertension[formData.hypertension];
    totalRisk *= hypertensionModifier;
  }

  return totalRisk;
}

/**
 * Определяет уровень риска на основе значения
 */
function getRiskLevel(
  riskScore: number,
  data: CancerRiskData,
): { level: "low" | "medium" | "high"; color: string; label: string } {
  const { riskLevels } = data;

  const lowLevel = riskLevels.low;
  const mediumLevel = riskLevels.medium;
  const highLevel = riskLevels.high;

  if (!lowLevel || !mediumLevel || !highLevel) {
    throw new Error("Risk levels configuration is incomplete");
  }

  if (riskScore <= lowLevel.threshold) {
    return {
      level: "low",
      color: lowLevel.color,
      label: lowLevel.label,
    };
  } else if (riskScore <= mediumLevel.threshold) {
    return {
      level: "medium",
      color: mediumLevel.color,
      label: mediumLevel.label,
    };
  } else {
    return {
      level: "high",
      color: highLevel.color,
      label: highLevel.label,
    };
  }
}

/**
 * Нормализует риск для корректного сравнения
 * Использует логарифмическое масштабирование для больших значений
 */
function normalizeRisk(riskScore: number): number {
  // Применяем логарифмическое масштабирование для значений > 1
  if (riskScore > 1) {
    return Math.log10(riskScore * 9 + 1) / Math.log10(10);
  }
  return riskScore;
}

/**
 * Основная функция расчета рисков
 */
export function calculateRiskAssessment(
  formData: UserFormData,
  data: CancerRiskData,
): RiskAssessmentResult {
  const results: CancerRiskResult[] = [];

  // Рассчитываем риск для каждого типа рака
  for (const cancerType of data.cancerTypes) {
    // Получаем базовый риск
    const baseRisk = getBaseRisk(cancerType, formData);

    // Пропускаем типы рака, которые не применимы к полу пользователя
    if (baseRisk === 0) continue;

    // Применяем модификаторы
    const rawRiskScore = applyRiskModifiers(baseRisk, cancerType, formData);

    // Нормализуем риск
    const normalizedRisk = normalizeRisk(rawRiskScore);

    // Определяем уровень риска
    const riskInfo = getRiskLevel(normalizedRisk, data);

    results.push({
      cancerType,
      riskScore: normalizedRisk,
      riskLevel: riskInfo.level,
      riskColor: riskInfo.color,
      riskLabel: riskInfo.label,
    });
  }

  // Сортируем результаты по уровню риска (высокий -> низкий)
  results.sort((a, b) => {
    const levelOrder = { high: 3, medium: 2, low: 1 };
    if (levelOrder[a.riskLevel] !== levelOrder[b.riskLevel]) {
      return levelOrder[b.riskLevel] - levelOrder[a.riskLevel];
    }
    // При одинаковом уровне сортируем по значению риска
    return b.riskScore - a.riskScore;
  });

  // Подсчитываем общую статистику рисков
  const totalCount = results.length;
  const lowCount = results.filter((r) => r.riskLevel === "low").length;
  const mediumCount = results.filter((r) => r.riskLevel === "medium").length;
  const highCount = results.filter((r) => r.riskLevel === "high").length;

  const overallRisk = {
    low: Math.round((lowCount / totalCount) * 100),
    medium: Math.round((mediumCount / totalCount) * 100),
    high: Math.round((highCount / totalCount) * 100),
  };

  return {
    results,
    overallRisk,
  };
}

/**
 * Получает цвет для зоны тела на основе максимального риска в этой зоне
 */
export function getBodyZoneRiskColor(
  bodyZone: string,
  riskResults: RiskAssessmentResult | null,
  data: CancerRiskData,
): string {
  if (!riskResults) return data.bodyZones[bodyZone]?.color ?? "#E5E7EB";

  // Находим все типы рака для данной зоны тела
  const zoneRisks = riskResults.results.filter(
    (result) => result.cancerType.bodyZone === bodyZone,
  );

  if (zoneRisks.length === 0) {
    return data.bodyZones[bodyZone]?.color ?? "#E5E7EB";
  }

  // Находим максимальный риск в зоне
  const maxRisk = Math.max(...zoneRisks.map((r) => r.riskScore));
  const maxRiskResult = zoneRisks.find((r) => r.riskScore === maxRisk);

  const lowLevelColor = data.riskLevels.low?.color ?? "#4CAF50";
  return maxRiskResult?.riskColor ?? lowLevelColor;
}

/**
 * Получает список типов рака для конкретной зоны тела
 */
export function getCancerTypesForZone(
  bodyZone: string,
  riskResults: RiskAssessmentResult | null,
): CancerRiskResult[] {
  if (!riskResults) return [];

  return riskResults.results.filter(
    (result) => result.cancerType.bodyZone === bodyZone,
  );
}
