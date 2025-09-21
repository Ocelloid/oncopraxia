"use client";

import { Select, SelectItem, Input, Card, CardBody } from "@heroui/react";
import { type UserFormData } from "~/types/cancer-risk";

interface RiskFactorsFormProps {
  formData: UserFormData;
  updateFormData: (updates: Partial<UserFormData>) => void;
}

export default function RiskFactorsForm({
  formData,
  updateFormData,
}: RiskFactorsFormProps) {
  return (
    <div className="space-y-2">
      {/* Вредные привычки */}
      <Card className="border-l-4 border-l-red-400">
        <CardBody className="space-y-2">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <span>🚬</span>
            Вредные привычки
          </h3>
          {/* Курение */}
          <Select
            label="Курение"
            placeholder="Выберите статус курения"
            selectedKeys={formData.smoking ? [formData.smoking] : []}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              updateFormData({
                smoking: selectedKey as "yes" | "former" | "no",
              });
            }}
            variant="bordered"
            size="md"
            classNames={{
              label: "text-sm font-medium text-gray-700 -mt-6",
              trigger: "mt-1",
            }}
          >
            <SelectItem key="no">Никогда не курил(а)</SelectItem>
            <SelectItem key="former">Бросил(а) курить</SelectItem>
            <SelectItem key="yes">Курю в настоящее время</SelectItem>
          </Select>

          {/* Стаж курения (показывается только если курит или бросил) */}
          {(formData.smoking === "yes" || formData.smoking === "former") && (
            <Input
              type="number"
              label="Стаж курения (лет)"
              placeholder="Сколько лет курили/курите"
              value={formData.smokingYears?.toString() ?? ""}
              onChange={(e) =>
                updateFormData({ smokingYears: parseInt(e.target.value) || 0 })
              }
              min="0"
              max="50"
              variant="bordered"
              size="md"
              classNames={{
                label: "text-sm font-medium text-gray-700 -mt-6",
              }}
            />
          )}

          {/* Алкоголь */}
          <Select
            label="Употребление алкоголя"
            placeholder="Выберите частоту употребления"
            selectedKeys={formData.alcohol ? [formData.alcohol] : []}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              updateFormData({
                alcohol: selectedKey as
                  | "never"
                  | "rarely"
                  | "moderate"
                  | "frequent",
              });
            }}
            variant="bordered"
            size="md"
            classNames={{
              label: "text-sm font-medium text-gray-700 -mt-6",
              trigger: "mt-1",
            }}
          >
            <SelectItem key="never">Никогда</SelectItem>
            <SelectItem key="rarely">Редко (по праздникам)</SelectItem>
            <SelectItem key="moderate">Умеренно (1-2 раза в неделю)</SelectItem>
            <SelectItem key="frequent">
              Часто (ежедневно или почти ежедневно)
            </SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Образ жизни */}
      <Card className="border-l-4 border-l-green-400">
        <CardBody className="space-y-2">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <span>🏃‍♂️</span>
            Образ жизни
          </h3>
          {/* Физическая активность */}
          <Select
            label="Физическая активность"
            placeholder="Выберите уровень активности"
            selectedKeys={
              formData.physicalActivity ? [formData.physicalActivity] : []
            }
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              updateFormData({
                physicalActivity: selectedKey as "low" | "medium" | "high",
              });
            }}
            variant="bordered"
            size="md"
            classNames={{
              label: "text-sm font-medium text-gray-700 -mt-6",
              trigger: "mt-1",
            }}
          >
            <SelectItem key="low">Низкая (сидячий образ жизни)</SelectItem>
            <SelectItem key="medium">
              Средняя (2-3 тренировки в неделю)
            </SelectItem>
            <SelectItem key="high">Высокая (ежедневные тренировки)</SelectItem>
          </Select>

          {/* Питание */}
          <Select
            label="Питание"
            placeholder="Оцените качество питания"
            selectedKeys={formData.diet ? [formData.diet] : []}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              updateFormData({
                diet: selectedKey as "balanced" | "unbalanced",
              });
            }}
            variant="bordered"
            size="md"
            classNames={{
              label: "text-sm font-medium text-gray-700 -mt-6",
              trigger: "mt-1",
            }}
          >
            <SelectItem key="balanced">
              Сбалансированное (фрукты, овощи, минимум фастфуда)
            </SelectItem>
            <SelectItem key="unbalanced">
              Несбалансированное (много жирной пищи, фастфуда)
            </SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Наследственность */}
      <Card className="border-l-4 border-l-purple-400">
        <CardBody className="space-y-2">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <span>🧬</span>
            Наследственность
          </h3>
          {/* Семейная история рака */}
          <Select
            label="Случаи рака в семье"
            placeholder="Были ли случаи рака у родственников"
            selectedKeys={
              formData.familyHistory ? [formData.familyHistory] : []
            }
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              updateFormData({ familyHistory: selectedKey as "yes" | "no" });
            }}
            variant="bordered"
            size="md"
            classNames={{
              label: "text-sm font-medium text-gray-700 -mt-6",
              trigger: "mt-1",
            }}
          >
            <SelectItem key="no">Нет</SelectItem>
            <SelectItem key="yes">Да, были случаи</SelectItem>
          </Select>

          {/* Степень родства (показывается только если есть семейная история) */}
          {formData.familyHistory === "yes" && (
            <Input
              label="Степень родства"
              placeholder="Например: родители, бабушка, дедушка"
              value={formData.familyRelation ?? ""}
              onChange={(e) =>
                updateFormData({ familyRelation: e.target.value })
              }
              variant="bordered"
              size="md"
              classNames={{
                label: "text-sm font-medium text-gray-700 -mt-6",
                inputWrapper: "mt-1",
              }}
            />
          )}
        </CardBody>
      </Card>

      {/* Профессиональные факторы */}
      <Card className="border-l-4 border-l-orange-400">
        <CardBody className="space-y-2">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <span>🏭</span>
            Профессиональные факторы
          </h3>
          {/* Работа с химическими веществами */}
          <Select
            label="Работа с химическими веществами"
            placeholder="Работаете ли с химикатами"
            selectedKeys={formData.chemicals ? [formData.chemicals] : []}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              updateFormData({ chemicals: selectedKey as "yes" | "no" });
            }}
            variant="bordered"
            size="md"
            classNames={{
              label: "text-sm font-medium text-gray-700 -mt-6",
              trigger: "mt-1",
            }}
          >
            <SelectItem key="no">Нет</SelectItem>
            <SelectItem key="yes">
              Да, работаю с химическими веществами
            </SelectItem>
          </Select>

          {/* Радиационное воздействие */}
          <Select
            label="Радиационное воздействие"
            placeholder="Подвергались ли радиации"
            selectedKeys={formData.radiation ? [formData.radiation] : []}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              updateFormData({ radiation: selectedKey as "yes" | "no" });
            }}
            variant="bordered"
            size="md"
            classNames={{
              label: "text-sm font-medium text-gray-700 -mt-6",
              trigger: "mt-1",
            }}
          >
            <SelectItem key="no">Нет</SelectItem>
            <SelectItem key="yes">
              Да, работаю в условиях повышенной радиации
            </SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Хронические заболевания */}
      <Card className="border-l-4 border-l-blue-400">
        <CardBody className="space-y-2">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <span>🏥</span>
            Хронические заболевания
          </h3>
          {/* Сахарный диабет */}
          <Select
            label="Сахарный диабет"
            placeholder="Есть ли диагноз диабета"
            selectedKeys={formData.diabetes ? [formData.diabetes] : []}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              updateFormData({ diabetes: selectedKey as "yes" | "no" });
            }}
            variant="bordered"
            size="md"
            classNames={{
              label: "text-sm font-medium text-gray-700 -mt-6",
              trigger: "mt-1",
            }}
          >
            <SelectItem key="no">Нет</SelectItem>
            <SelectItem key="yes">Да, есть диагноз</SelectItem>
          </Select>

          {/* Гипертония */}
          <Select
            label="Гипертония"
            placeholder="Есть ли повышенное давление"
            selectedKeys={formData.hypertension ? [formData.hypertension] : []}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              updateFormData({ hypertension: selectedKey as "yes" | "no" });
            }}
            variant="bordered"
            size="md"
            classNames={{
              label: "text-sm font-medium text-gray-700 -mt-6",
              trigger: "mt-1",
            }}
          >
            <SelectItem key="no">Нет</SelectItem>
            <SelectItem key="yes">Да, есть гипертония</SelectItem>
          </Select>

          {/* Другие заболевания */}
          <Input
            label="Другие хронические заболевания"
            placeholder="Укажите другие заболевания (необязательно)"
            value={formData.otherDiseases ?? ""}
            onChange={(e) => updateFormData({ otherDiseases: e.target.value })}
            variant="bordered"
            size="md"
            classNames={{
              label: "text-sm font-medium text-gray-700 -mt-6",
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
}
