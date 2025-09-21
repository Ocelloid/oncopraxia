"use client";

import { useState } from "react";
import type { RiskAssessmentResult, BodyZone } from "~/types/cancer-risk";

interface BodyImageOverlayProps {
  bodyZones: Record<string, BodyZone>;
  riskResults: RiskAssessmentResult | null;
  getZoneColor: (zoneName: string) => string;
  getZoneNumbers: (zoneName: string) => number[];
  onZoneSelect: (zoneName: string | null) => void;
  selectedZone: string | null;
}

interface RiskZoneProps {
  zoneName: string;
  zone: BodyZone;
  color: string;
  numbers: number[];
  isSelected: boolean;
  onClick: () => void;
}

function RiskZone({
  zoneName,
  zone,
  color,
  numbers,
  isSelected,
  onClick,
}: RiskZoneProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        left: `${(zone.x / 300) * 100}%`,
        top: `${(zone.y / 400) * 100}%`,
        transform: "translate(-50%, -50%)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Основная зона риска */}
      <div
        className="flex cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-300"
        style={{
          backgroundColor: color,
          borderColor: isSelected ? "#1f2937" : "#374151",
          borderWidth: isSelected ? "3px" : "2px",
          width: isSelected || isHovered ? "50px" : "40px",
          height: isSelected || isHovered ? "50px" : "40px",
          opacity: isSelected ? 1 : 0.9,
          boxShadow: isHovered ? "0 4px 12px rgba(0,0,0,0.3)" : "none",
          zIndex: isSelected || isHovered ? 20 : 10,
        }}
        onClick={onClick}
        title={`${getZoneLabel(zoneName)} - нажмите для подробной информации`}
      >
        {/* Номера заболеваний */}
        {numbers.length > 0 && (
          <div
            className="text-center leading-tight font-bold break-words text-white"
            style={{
              textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
              fontSize: (() => {
                const baseSize = isSelected || isHovered ? 0.85 : 0.8;
                if (numbers.length === 1) return `${baseSize}rem`;
                if (numbers.length === 2) return `${baseSize * 0.9}rem`;
                if (numbers.length <= 4) return `${baseSize * 0.8}rem`;
                return `${baseSize * 0.7}rem`;
              })(),
              lineHeight: numbers.length > 2 ? "1.1" : "1",
            }}
          >
            {(() => {
              if (numbers.length === 1) {
                return numbers[0];
              } else if (numbers.length === 2) {
                return `${numbers[0]} ${numbers[1]}`;
              } else if (numbers.length <= 6) {
                return numbers.join(" ");
              } else {
                return `${numbers.slice(0, 3).join(" ")}\n+${numbers.length - 3}`;
              }
            })()}
          </div>
        )}

        {/* Индикатор пульсации для высокого риска */}
        {color === "#F44336" && (
          <div
            className="absolute inset-0 animate-ping rounded-full border-2 border-red-400"
            style={{ opacity: 0.3 }}
          />
        )}
      </div>

      {/* Всплывающая подсказка при наведении */}
      {isHovered && !isSelected && (
        <div
          className="absolute bottom-full mb-2 rounded-lg bg-gray-900 px-3 py-2 text-sm whitespace-nowrap text-white shadow-lg"
          style={{
            transform: "translateX(-50%)",
            left: "50%",
            zIndex: 30,
          }}
        >
          <div className="font-medium">{getZoneLabel(zoneName)}</div>
          {numbers.length > 0 && (
            <div className="text-xs text-gray-300">
              {numbers.length === 1
                ? "1 заболевание"
                : `${numbers.length} заболеваний`}
            </div>
          )}
          {/* Стрелочка */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}

      {/* Метка зоны для выбранной области */}
      {isSelected && (
        <div
          className="absolute -top-12 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium whitespace-nowrap text-white shadow-lg"
          style={{
            transform: "translateX(-50%)",
            left: "50%",
            zIndex: 25,
          }}
        >
          {getZoneLabel(zoneName)}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-blue-600" />
        </div>
      )}
    </div>
  );
}

export default function BodyImageOverlay({
  bodyZones,
  riskResults,
  getZoneColor,
  getZoneNumbers,
  onZoneSelect,
  selectedZone,
}: BodyImageOverlayProps) {
  const handleZoneClick = (zoneName: string) => {
    onZoneSelect(selectedZone === zoneName ? null : zoneName);
  };

  return (
    <div className="absolute inset-0 -mb-16">
      {Object.entries(bodyZones).map(([zoneName, zone]) => {
        const zoneColor = getZoneColor(zoneName);
        const numbers = getZoneNumbers(zoneName);

        // Показываем зону только если есть данные о рисках или если зона выбрана
        if (!riskResults && numbers.length === 0) {
          return null;
        }

        return (
          <RiskZone
            key={zoneName}
            zoneName={zoneName}
            zone={zone}
            color={zoneColor}
            numbers={numbers}
            isSelected={selectedZone === zoneName}
            onClick={() => handleZoneClick(zoneName)}
          />
        );
      })}
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
