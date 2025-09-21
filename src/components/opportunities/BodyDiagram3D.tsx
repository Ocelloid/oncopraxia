"use client";

import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Sphere, Box, Cylinder } from "@react-three/drei";
import { Spinner } from "@heroui/react";
import type * as THREE from "three";
import type {
  RiskAssessmentResult,
  BodyZone,
  CancerRiskData,
} from "~/types/cancer-risk";
import { getBodyZoneRiskColor, getCancerTypesForZone } from "./RiskCalculator";
import {
  BODY_ZONES_3D_CONFIG,
  RISK_COLORS,
  ANIMATION_CONFIG,
  SCENE_CONFIG,
  Body3DUtils,
} from "./body3d-utils";

interface BodyDiagram3DProps {
  riskResults: RiskAssessmentResult | null;
  bodyZones: Record<string, BodyZone>;
  isLoading: boolean;
}

interface RiskZoneProps {
  zoneName: string;
  position: [number, number, number];
  scale: number;
  color: string;
  numbers: number[];
  onHover: (zoneName: string | null) => void;
  onClick: (zoneName: string) => void;
}

function RiskZone({
  zoneName,
  position,
  scale,
  color,
  numbers,
  onHover,
  onClick,
}: RiskZoneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Легкая анимация пульсации для зон с высоким риском
      const isHighRisk = color === RISK_COLORS.high;
      const pulseScale = Body3DUtils.getPulseScale(
        state.clock.elapsedTime,
        scale,
        isHighRisk,
      );
      meshRef.current.scale.setScalar(
        hovered
          ? pulseScale * ANIMATION_CONFIG.hoverScaleMultiplier
          : pulseScale,
      );
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    onHover(zoneName);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHovered(false);
    onHover(null);
    document.body.style.cursor = "auto";
  };

  const handleClick = () => {
    onClick(zoneName);
  };

  return (
    <group position={position}>
      {/* Основная зона риска */}
      <Sphere
        ref={meshRef}
        args={[1, 16, 16]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          roughness={0.2}
          metalness={0.1}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </Sphere>

      {/* Номера заболеваний */}
      {numbers.length > 0 && (
        <Html center>
          <div
            className="bg-opacity-80 pointer-events-none flex items-center justify-center rounded-full bg-black font-bold text-white"
            style={{
              width: "40px",
              height: "40px",
              fontSize: (() => {
                if (numbers.length === 1) return "0.9rem";
                if (numbers.length === 2) return "0.8rem";
                if (numbers.length <= 4) return "0.7rem";
                return "0.6rem";
              })(),
              lineHeight: numbers.length > 2 ? "1.1" : "1",
            }}
          >
            <span className="text-center leading-tight">
              {(() => {
                if (numbers.length === 1) {
                  return numbers[0];
                } else if (numbers.length === 2) {
                  return `${numbers[0]},${numbers[1]}`;
                } else if (numbers.length <= 4) {
                  return numbers.join(",");
                } else {
                  return `${numbers.slice(0, 3).join(",")}\n+${numbers.length - 3}`;
                }
              })()}
            </span>
          </div>
        </Html>
      )}

      {/* Подпись зоны при наведении */}
      {hovered && (
        <Html center distanceFactor={8}>
          <div className="pointer-events-none rounded bg-gray-800 px-2 py-1 text-sm text-white">
            {getZoneLabel(zoneName)}
          </div>
        </Html>
      )}
    </group>
  );
}

function BodyModel({
  riskResults,
  bodyZones,
  onZoneHover,
  onZoneClick,
}: {
  riskResults: RiskAssessmentResult | null;
  bodyZones: Record<string, BodyZone>;
  onZoneHover: (zoneName: string | null) => void;
  onZoneClick: (zoneName: string) => void;
}) {
  // Получаем цвета для каждой зоны на основе рисков
  const getZoneColor = (zoneName: string) => {
    if (!riskResults) return "#E5E7EB";
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
    <group>
      {/* Базовая модель тела */}
      <group>
        {/* Голова */}
        <Sphere position={[0, 1.8, 0]} args={[0.25, 16, 16]}>
          <meshStandardMaterial color="#FFD1A0" transparent opacity={0.3} />
        </Sphere>

        {/* Шея */}
        <Cylinder position={[0, 1.5, 0]} args={[0.1, 0.12, 0.3, 8]}>
          <meshStandardMaterial color="#FFD1A0" transparent opacity={0.3} />
        </Cylinder>

        {/* Туловище */}
        <Box position={[0, 0.5, 0]} args={[0.8, 1.4, 0.4]}>
          <meshStandardMaterial color="#FFD1A0" transparent opacity={0.3} />
        </Box>

        {/* Руки */}
        <Cylinder
          position={[-0.6, 0.8, 0]}
          args={[0.08, 0.06, 0.8, 8]}
          rotation={[0, 0, Math.PI / 6]}
        >
          <meshStandardMaterial color="#FFD1A0" transparent opacity={0.3} />
        </Cylinder>
        <Cylinder
          position={[0.6, 0.8, 0]}
          args={[0.08, 0.06, 0.8, 8]}
          rotation={[0, 0, -Math.PI / 6]}
        >
          <meshStandardMaterial color="#FFD1A0" transparent opacity={0.3} />
        </Cylinder>

        {/* Ноги */}
        <Cylinder position={[-0.2, -0.8, 0]} args={[0.1, 0.08, 1.0, 8]}>
          <meshStandardMaterial color="#FFD1A0" transparent opacity={0.3} />
        </Cylinder>
        <Cylinder position={[0.2, -0.8, 0]} args={[0.1, 0.08, 1.0, 8]}>
          <meshStandardMaterial color="#FFD1A0" transparent opacity={0.3} />
        </Cylinder>
      </group>

      {/* Зоны риска */}
      {Object.entries(bodyZones).map(([zoneName, _zone]) => {
        const zone3D = BODY_ZONES_3D_CONFIG[zoneName];
        if (!zone3D) return null;

        const zoneColor = getZoneColor(zoneName);
        const numbers = getZoneNumbers(zoneName);

        return (
          <RiskZone
            key={zoneName}
            zoneName={zoneName}
            position={zone3D.position}
            scale={zone3D.scale}
            color={zoneColor}
            numbers={numbers}
            onHover={onZoneHover}
            onClick={onZoneClick}
          />
        );
      })}
    </group>
  );
}

export default function BodyDiagram3D({
  riskResults,
  bodyZones,
  isLoading,
}: BodyDiagram3DProps) {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const handleZoneHover = (_zoneName: string | null) => {
    // Можно добавить логику для отображения информации при наведении
  };

  const handleZoneClick = (zoneName: string) => {
    setSelectedZone(selectedZone === zoneName ? null : zoneName);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <Spinner size="lg" color="primary" />
          <p className="mt-4 text-gray-600">Обновление 3D диаграммы...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* 3D Canvas */}
      <div className="h-96 w-full max-w-2xl overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-b from-blue-50 to-white">
        <Canvas
          camera={{
            position: SCENE_CONFIG.camera.position,
            fov: SCENE_CONFIG.camera.fov,
          }}
          shadows
        >
          <Suspense fallback={null}>
            {/* Освещение */}
            <ambientLight
              intensity={SCENE_CONFIG.lighting.ambient.intensity}
              color={SCENE_CONFIG.lighting.ambient.color}
            />
            <directionalLight
              position={SCENE_CONFIG.lighting.directional.position}
              intensity={SCENE_CONFIG.lighting.directional.intensity}
              castShadow={SCENE_CONFIG.lighting.directional.castShadow}
              shadow-mapSize-width={
                SCENE_CONFIG.lighting.directional.shadowMapSize
              }
              shadow-mapSize-height={
                SCENE_CONFIG.lighting.directional.shadowMapSize
              }
            />
            <pointLight
              position={SCENE_CONFIG.lighting.point.position}
              intensity={SCENE_CONFIG.lighting.point.intensity}
            />

            {/* Модель тела */}
            <BodyModel
              riskResults={riskResults}
              bodyZones={bodyZones}
              onZoneHover={handleZoneHover}
              onZoneClick={handleZoneClick}
            />

            {/* Контролы камеры */}
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={SCENE_CONFIG.controls.minDistance}
              maxDistance={SCENE_CONFIG.controls.maxDistance}
              maxPolarAngle={SCENE_CONFIG.controls.maxPolarAngle}
              enableDamping={SCENE_CONFIG.controls.enableDamping}
              dampingFactor={SCENE_CONFIG.controls.dampingFactor}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Информация о выбранной зоне */}
      {selectedZone && riskResults && (
        <div className="mt-4 max-w-md rounded-lg bg-gray-50 p-4">
          <h4 className="mb-2 font-semibold text-gray-800">
            {getZoneLabel(selectedZone)}
          </h4>
          <div className="text-sm text-gray-600">
            {(() => {
              const zoneRisks = getCancerTypesForZone(
                selectedZone,
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
        <p className="mb-2">
          🖱️ Вращайте, увеличивайте и перемещайте модель для лучшего обзора
        </p>
        <p className="mb-2">
          👆 Нажимайте на цветные зоны для получения подробной информации
        </p>
        {!riskResults && (
          <p className="text-gray-500">
            Заполните форму, чтобы увидеть зоны риска на 3D модели
          </p>
        )}
        {riskResults && (
          <p>
            Цифры на модели соответствуют номерам заболеваний в списке
            результатов
          </p>
        )}
      </div>
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
