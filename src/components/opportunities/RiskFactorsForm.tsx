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
              if (!!selectedKey)
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
              if (!!selectedKey)
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
              listboxWrapper: "max-h-[400px]",
              popoverContent: "w-full min-w-[280px]",
            }}
          >
            <SelectItem key="never" textValue="Никогда">
              <div className="flex flex-col">
                <span className="text-small">Никогда</span>
              </div>
            </SelectItem>
            <SelectItem key="rarely" textValue="Редко">
              <div className="flex flex-col">
                <span className="text-small">Редко</span>
                <span className="text-tiny text-default-400">
                  по праздникам
                </span>
              </div>
            </SelectItem>
            <SelectItem key="moderate" textValue="Умеренно">
              <div className="flex flex-col">
                <span className="text-small">Умеренно</span>
                <span className="text-tiny text-default-400">
                  1-2 раза в неделю
                </span>
              </div>
            </SelectItem>
            <SelectItem key="frequent" textValue="Часто">
              <div className="flex flex-col">
                <span className="text-small">Часто</span>
                <span className="text-tiny text-default-400">
                  ежедневно или почти ежедневно
                </span>
              </div>
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
              if (!!selectedKey)
                updateFormData({
                  physicalActivity: selectedKey as "low" | "medium" | "high",
                });
            }}
            variant="bordered"
            size="md"
            classNames={{
              label: "text-sm font-medium text-gray-700 -mt-6",
              trigger: "mt-1",
              listboxWrapper: "max-h-[400px]",
              popoverContent: "w-full min-w-[280px]",
            }}
          >
            <SelectItem key="low" textValue="Низкая">
              <div className="flex flex-col">
                <span className="text-small">Низкая</span>
                <span className="text-tiny text-default-400">
                  сидячий образ жизни
                </span>
              </div>
            </SelectItem>
            <SelectItem key="medium" textValue="Средняя">
              <div className="flex flex-col">
                <span className="text-small">Средняя</span>
                <span className="text-tiny text-default-400">
                  2-3 тренировки в неделю
                </span>
              </div>
            </SelectItem>
            <SelectItem key="high" textValue="Высокая">
              <div className="flex flex-col">
                <span className="text-small">Высокая</span>
                <span className="text-tiny text-default-400">
                  ежедневные тренировки
                </span>
              </div>
            </SelectItem>
          </Select>

          {/* Питание */}
          <Select
            label="Питание"
            placeholder="Оцените качество питания"
            selectedKeys={formData.diet ? [formData.diet] : []}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              if (!!selectedKey)
                updateFormData({
                  diet: selectedKey as "balanced" | "unbalanced",
                });
            }}
            variant="bordered"
            size="md"
            classNames={{
              label: "text-sm font-medium text-gray-700 -mt-6",
              trigger: "mt-1",
              listboxWrapper: "max-h-[400px]",
              popoverContent: "w-full min-w-[320px]",
            }}
          >
            <SelectItem key="balanced" textValue="Сбалансированное">
              <div className="flex flex-col">
                <span className="text-small">Сбалансированное</span>
                <span className="text-tiny text-default-400">
                  фрукты, овощи, минимум фастфуда
                </span>
              </div>
            </SelectItem>
            <SelectItem key="unbalanced" textValue="Несбалансированное">
              <div className="flex flex-col">
                <span className="text-small">Несбалансированное</span>
                <span className="text-tiny text-default-400">
                  много жирной пищи, фастфуда
                </span>
              </div>
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
              if (!!selectedKey)
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
              if (!!selectedKey)
                updateFormData({ chemicals: selectedKey as "yes" | "no" });
            }}
            variant="bordered"
            size="md"
            classNames={{
              label: "text-sm font-medium text-gray-700 -mt-6",
              trigger: "mt-1",
              listboxWrapper: "max-h-[400px]",
              popoverContent: "w-full min-w-[300px]",
            }}
          >
            <SelectItem key="no">Нет</SelectItem>
            <SelectItem key="yes" textValue="Да">
              <div className="flex flex-col">
                <span className="text-small">Да</span>
                <span className="text-tiny text-default-400">
                  работаю с химическими веществами
                </span>
              </div>
            </SelectItem>
          </Select>

          {/* Радиационное воздействие */}
          <Select
            label="Радиационное воздействие"
            placeholder="Подвергались ли радиации"
            selectedKeys={formData.radiation ? [formData.radiation] : []}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              if (!!selectedKey)
                updateFormData({ radiation: selectedKey as "yes" | "no" });
            }}
            variant="bordered"
            size="md"
            classNames={{
              label: "text-sm font-medium text-gray-700 -mt-6",
              trigger: "mt-1",
              listboxWrapper: "max-h-[400px]",
              popoverContent: "w-full min-w-[320px]",
            }}
          >
            <SelectItem key="no">Нет</SelectItem>
            <SelectItem key="yes" textValue="Да">
              <div className="flex flex-col">
                <span className="text-small">Да</span>
                <span className="text-tiny text-default-400">
                  работаю в условиях повышенной радиации
                </span>
              </div>
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
              if (!!selectedKey)
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
              if (!!selectedKey)
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
