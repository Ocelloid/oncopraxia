"use client";

import { Button, ButtonGroup, Tooltip } from "@heroui/react";

interface ViewModeToggleProps {
  viewMode: "2d" | "3d";
  onModeChange: (mode: "2d" | "3d") => void;
  disabled?: boolean;
}

export default function ViewModeToggle({
  viewMode,
  onModeChange,
  disabled = false,
}: ViewModeToggleProps) {
  return (
    <div className="flex flex-col items-center">
      <ButtonGroup>
        <Tooltip
          content="Плоская схематичная диаграмма тела с зонами риска"
          placement="top"
        >
          <Button
            color={viewMode === "2d" ? "primary" : "default"}
            variant={viewMode === "2d" ? "solid" : "bordered"}
            onPress={() => onModeChange("2d")}
            disabled={disabled}
            className="transition-all duration-300"
          >
            📊 2D Диаграмма
          </Button>
        </Tooltip>

        <Tooltip
          content="Интерактивная 3D модель тела с вращением и масштабированием"
          placement="top"
        >
          <Button
            color={viewMode === "3d" ? "primary" : "default"}
            variant={viewMode === "3d" ? "solid" : "bordered"}
            onPress={() => onModeChange("3d")}
            disabled={disabled}
            className="transition-all duration-300"
          >
            🎯 3D Модель
          </Button>
        </Tooltip>
      </ButtonGroup>

      <div className="mt-2 max-w-xs text-center text-xs text-gray-500">
        {viewMode === "2d"
          ? "Простой и быстрый обзор зон риска"
          : "Детальное 3D исследование с интерактивностью"}
      </div>
    </div>
  );
}
