"use client";

import { Input, Select, SelectItem } from "@heroui/react";
import { type UserFormData, type CancerRiskData } from "~/types/cancer-risk";

interface DemographicsFormProps {
  formData: UserFormData;
  updateFormData: (updates: Partial<UserFormData>) => void;
  data: CancerRiskData;
}

export default function DemographicsForm({
  formData,
  updateFormData,
  data,
}: DemographicsFormProps) {
  return (
    <div className="space-y-2">
      {/* Возраст */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <span>🎂</span>
          Возраст
        </label>
        <Input
          type="number"
          placeholder="Введите ваш возраст"
          value={formData.age?.toString() ?? ""}
          onChange={(e) =>
            updateFormData({ age: parseInt(e.target.value) || 0 })
          }
          min="18"
          max="100"
          className="w-full"
          variant="bordered"
          size="md"
        />
      </div>

      {/* Пол */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <span>👤</span>
          Пол
        </label>
        <Select
          placeholder="Выберите пол"
          selectedKeys={formData.gender ? [formData.gender] : []}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0] as string;
            updateFormData({ gender: selectedKey as "male" | "female" });
          }}
          variant="bordered"
          size="md"
        >
          <SelectItem key="male">Мужской</SelectItem>
          <SelectItem key="female">Женский</SelectItem>
        </Select>
      </div>

      {/* Город */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <span>🏙️</span>
          Город проживания
        </label>
        <Select
          placeholder="Выберите город"
          selectedKeys={formData.city ? [formData.city] : []}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0] as string;
            updateFormData({ city: selectedKey });
          }}
          variant="bordered"
          size="md"
          classNames={{
            listboxWrapper: "max-h-[300px]",
            popoverContent: "w-full min-w-[250px]",
          }}
        >
          {data.cities.map((city) => (
            <SelectItem key={city}>{city}</SelectItem>
          ))}
        </Select>
      </div>

      {/* Профессия */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <span>💼</span>
          Профессия
        </label>
        <Select
          placeholder="Выберите профессию"
          selectedKeys={formData.profession ? [formData.profession] : []}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0] as string;
            updateFormData({ profession: selectedKey });
          }}
          variant="bordered"
          size="md"
          classNames={{
            listboxWrapper: "max-h-[300px]",
            popoverContent: "w-full min-w-[250px]",
          }}
        >
          {data.professions.map((profession) => (
            <SelectItem key={profession}>{profession}</SelectItem>
          ))}
        </Select>
      </div>

      {/* Семейное положение */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <span>💑</span>
          Семейное положение
        </label>
        <Select
          placeholder="Выберите семейное положение"
          selectedKeys={formData.maritalStatus ? [formData.maritalStatus] : []}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0] as string;
            updateFormData({ maritalStatus: selectedKey });
          }}
          variant="bordered"
          size="md"
          classNames={{
            listboxWrapper: "max-h-[300px]",
            popoverContent: "w-full min-w-[220px]",
          }}
        >
          {data.maritalStatus.map((status) => (
            <SelectItem key={status}>{status}</SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
