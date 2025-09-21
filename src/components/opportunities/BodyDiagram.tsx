"use client";

import { useState } from "react";
import { Spinner } from "@heroui/react";
import Image from "next/image";
import {
  type RiskAssessmentResult,
  type BodyZone,
  type CancerRiskData,
} from "~/types/cancer-risk";
import { getBodyZoneRiskColor, getCancerTypesForZone } from "./RiskCalculator";
import BodyDiagram3D from "./BodyDiagram3D";
import ViewModeToggle from "./ViewModeToggle";
import BodyImageOverlay from "./BodyImageOverlay";

interface BodyDiagramProps {
  riskResults: RiskAssessmentResult | null;
  bodyZones: Record<string, BodyZone>;
  isLoading: boolean;
}

export default function BodyDiagram({
  riskResults,
  bodyZones,
  isLoading,
}: BodyDiagramProps) {
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");
  const [selectedZone2D, setSelectedZone2D] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <Spinner size="lg" color="primary" />
          <p className="mt-4 text-gray-600">Обновление диаграммы...</p>
        </div>
      </div>
    );
  }

  // Получаем цвета для каждой зоны на основе рисков
  const getZoneColor = (zoneName: string) => {
    if (!riskResults) return "#E5E7EB"; // Серый по умолчанию
    return getBodyZoneRiskColor(zoneName, riskResults, {
      bodyZones,
      riskLevels: {
        low: { threshold: 0.3, color: "#4CAF50", label: "Низкий" },
        medium: { threshold: 0.7, color: "#FF9800", label: "Средний" },
        high: { threshold: 1.0, color: "#F44336", label: "Высокий" },
      },
      cancerTypes: [],
      ageGroups: {},
      cities: [],
      professions: [],
      maritalStatus: [],
      disclaimer: "",
    } as CancerRiskData);
  };

  // Получаем номера заболеваний для зоны
  const getZoneNumbers = (zoneName: string): number[] => {
    if (!riskResults) return [];
    const zoneRisks = getCancerTypesForZone(zoneName, riskResults);
    return zoneRisks.map((risk) => risk.cancerType.id);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Переключатель режимов просмотра */}
      <div className="mb-6">
        <ViewModeToggle
          viewMode={viewMode}
          onModeChange={setViewMode}
          disabled={isLoading}
        />
      </div>

      {/* Условный рендеринг в зависимости от режима */}
      {viewMode === "3d" ? (
        <BodyDiagram3D
          riskResults={riskResults}
          bodyZones={bodyZones}
          isLoading={isLoading}
        />
      ) : (
        <div className="flex flex-col items-center">
          {/* Изображение человеческого тела с зонами риска */}
          <div className="relative" style={{ height: "500px" }}>
            <Image
              src="/body.jpg"
              alt="Диаграмма человеческого тела"
              width={300}
              height={400}
              className="h-auto w-full max-w-md rounded-lg shadow-sm"
              style={{ maxWidth: "275px" }}
              priority
            />

            {/* Интерактивные зоны риска поверх изображения */}
            <BodyImageOverlay
              bodyZones={bodyZones}
              riskResults={riskResults}
              getZoneColor={getZoneColor}
              getZoneNumbers={getZoneNumbers}
              onZoneSelect={setSelectedZone2D}
              selectedZone={selectedZone2D}
            />
          </div>

          {/* Информация о выбранной зоне */}
          {selectedZone2D && riskResults && (
            <div className="mt-4 max-w-md rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 font-semibold text-gray-800">
                {getZoneLabel(selectedZone2D)}
              </h4>
              <div className="text-sm text-gray-600">
                {(() => {
                  const zoneRisks = getCancerTypesForZone(
                    selectedZone2D,
                    riskResults,
                  );
                  if (zoneRisks.length === 0) {
                    return <p>Нет данных о рисках для этой зоны</p>;
                  }
                  return (
                    <ul className="space-y-1">
                      {zoneRisks.slice(0, 3).map((risk, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{risk.cancerType.name}</span>
                          <span
                            className={`font-medium ${
                              risk.riskLevel === "high"
                                ? "text-red-600"
                                : risk.riskLevel === "medium"
                                  ? "text-orange-600"
                                  : "text-green-600"
                            }`}
                          >
                            {risk.riskLabel}
                          </span>
                        </li>
                      ))}
                      {zoneRisks.length > 3 && (
                        <li className="text-gray-500">
                          и ещё {zoneRisks.length - 3} заболеваний...
                        </li>
                      )}
                    </ul>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Легенда */}
          <div className="mt-6 w-full max-w-md">
            <h4 className="mb-3 text-center text-sm font-semibold text-gray-700">
              Уровни риска
            </h4>
            <div className="flex justify-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span>Низкий</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                <span>Средний</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <span>Высокий</span>
              </div>
            </div>
          </div>

          {/* Инструкции */}
          <div className="mt-4 max-w-md text-center text-sm text-gray-600">
            {!riskResults ? (
              <p className="text-gray-500">
                Заполните форму, чтобы увидеть зоны риска на диаграмме
              </p>
            ) : (
              <div className="space-y-2">
                <p>
                  👆 Нажимайте на цветные зоны для получения подробной
                  информации
                </p>
                <p>
                  Цифры на диаграмме соответствуют номерам заболеваний в списке
                  результатов
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Получает человекочитаемое название зоны
 */
function getZoneLabel(zoneName: string): string {
  const labels: Record<string, string> = {
    head: "Голова",
    neck: "Шея",
    chest: "Грудь",
    breast: "Молочная железа",
    abdomen: "Живот",
    pelvis: "Таз",
    skin: "Кожа",
    blood: "Кровь",
    lymph: "Лимфа",
    bones: "Кости",
  };

  return labels[zoneName] ?? zoneName;
}
