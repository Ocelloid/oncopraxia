"use client";

import { Spinner } from "@heroui/react";
import {
  type RiskAssessmentResult,
  type BodyZone,
  type CancerRiskData,
} from "~/types/cancer-risk";
import { getBodyZoneRiskColor, getCancerTypesForZone } from "./RiskCalculator";

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
      {/* SVG диаграмма человеческого тела */}
      <div className="relative">
        <svg
          viewBox="0 0 300 400"
          className="h-auto w-full max-w-md"
          style={{ maxHeight: "500px" }}
        >
          {/* Контур тела */}
          <g stroke="#374151" strokeWidth="2" fill="none">
            {/* Голова */}
            <circle cx="150" cy="50" r="25" />

            {/* Шея */}
            <line x1="150" y1="75" x2="150" y2="90" />

            {/* Туловище */}
            <ellipse cx="150" cy="180" rx="60" ry="90" />

            {/* Руки */}
            <line x1="90" y1="120" x2="60" y2="200" />
            <line x1="210" y1="120" x2="240" y2="200" />

            {/* Ноги */}
            <line x1="120" y1="270" x2="110" y2="380" />
            <line x1="180" y1="270" x2="190" y2="380" />
          </g>

          {/* Зоны риска */}
          {Object.entries(bodyZones).map(([zoneName, zone]) => {
            const zoneColor = getZoneColor(zoneName);
            const numbers = getZoneNumbers(zoneName);

            return (
              <g key={zoneName}>
                {/* Цветовая зона */}
                <circle
                  cx={zone.x}
                  cy={zone.y}
                  r="15"
                  fill={zoneColor}
                  stroke="#374151"
                  strokeWidth="1"
                  opacity="0.8"
                  className="transition-all duration-300"
                />

                {/* Номера заболеваний в зоне */}
                {numbers.length > 0 && (
                  <>
                    {numbers.length === 1 ? (
                      <text
                        x={zone.x}
                        y={zone.y + 4}
                        textAnchor="middle"
                        className="fill-white text-xs font-bold"
                        style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.5)" }}
                      >
                        {numbers[0]}
                      </text>
                    ) : (
                      <text
                        x={zone.x}
                        y={zone.y + 4}
                        textAnchor="middle"
                        className="fill-white text-xs font-bold"
                        style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.5)" }}
                      >
                        {numbers.slice(0, 2).join(",")}
                        {numbers.length > 2 && "..."}
                      </text>
                    )}
                  </>
                )}

                {/* Подпись зоны */}
                <text
                  x={zone.x}
                  y={zone.y + 35}
                  textAnchor="middle"
                  className="fill-gray-600 text-xs"
                >
                  {getZoneLabel(zoneName)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

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

      {/* Инструкция */}
      {!riskResults && (
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Заполните форму, чтобы увидеть зоны риска на диаграмме</p>
        </div>
      )}

      {riskResults && (
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Цифры на диаграмме соответствуют номерам заболеваний в списке
            результатов
          </p>
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
