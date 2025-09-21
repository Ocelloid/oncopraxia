"use client";

import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Link } from "@heroui/react";
import {
  type UserFormData,
  type CancerRiskData,
  type RiskAssessmentResult,
} from "~/types/cancer-risk";
import DemographicsForm from "./DemographicsForm";
import RiskFactorsForm from "./RiskFactorsForm";
import RiskResults from "./RiskResults";
import BodyDiagram from "./BodyDiagram";
import { calculateRiskAssessment } from "./RiskCalculator";

// Импорт мок-данных
import cancerRiskData from "~/data/cancer-risk-data.json";

const initialFormData: UserFormData = {
  age: 30,
  gender: "male",
  city: "",
  profession: "",
  maritalStatus: "",
  smoking: "no",
  smokingYears: undefined,
  alcohol: "never",
  physicalActivity: "medium",
  diet: "balanced",
  familyHistory: "no",
  familyRelation: undefined,
  chemicals: "no",
  radiation: "no",
  diabetes: "no",
  hypertension: "no",
  otherDiseases: undefined,
};

export default function CancerRiskForm() {
  const [formData, setFormData] = useState<UserFormData>(initialFormData);
  const [riskResults, setRiskResults] = useState<RiskAssessmentResult | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  // Типизированные данные
  const data = cancerRiskData as CancerRiskData;

  // Обновление результатов при изменении формы
  useEffect(() => {
    const calculateRisks = async () => {
      setIsLoading(true);
      try {
        // Небольшая задержка для демонстрации загрузки
        // await new Promise<void>((resolve) => {
        //   setTimeout(resolve, 100);
        // });

        const results = calculateRiskAssessment(formData, data);
        setRiskResults(results);
      } catch (error) {
        console.error("Ошибка при расчете рисков:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Рассчитываем риски только если заполнены основные поля
    if (formData.age && formData.gender) {
      void calculateRisks();
    }
  }, [formData, data]);

  const updateFormData = (updates: Partial<UserFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Заголовок страницы */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Оценка рисков онкологических заболеваний
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Заполните форму ниже, чтобы получить персональную оценку рисков
            развития различных типов рака. Результаты обновляются автоматически
            при заполнении полей.
          </p>
        </div>

        {/* Дисклеймер */}
        <Card className="mb-8 border-l-4 border-l-amber-400">
          <CardBody>
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                <span className="text-sm font-bold text-amber-600">!</span>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-amber-800">
                  Важное уведомление
                </h3>
                <p className="text-sm text-amber-700">{data.disclaimer}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Левая колонка - Формы */}
          <div className="space-y-6 lg:col-span-1">
            {/* Демографические данные */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">
                  Демографические данные
                </h2>
              </CardHeader>
              <CardBody>
                <DemographicsForm
                  formData={formData}
                  updateFormData={updateFormData}
                  data={data}
                />
              </CardBody>
            </Card>

            {/* Факторы риска */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">
                  Факторы риска
                </h2>
              </CardHeader>
              <CardBody>
                <RiskFactorsForm
                  formData={formData}
                  updateFormData={updateFormData}
                />
              </CardBody>
            </Card>
          </div>

          {/* Правая колонка - Результаты */}
          <div className="space-y-6 lg:col-span-2">
            {/* Диаграмма тела */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">
                  Карта рисков
                </h2>
              </CardHeader>
              <CardBody>
                <BodyDiagram
                  riskResults={riskResults}
                  bodyZones={data.bodyZones}
                  isLoading={isLoading}
                />
              </CardBody>
            </Card>

            {/* Результаты оценки */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">
                  Результаты оценки рисков
                </h2>
              </CardHeader>
              <CardBody>
                <RiskResults riskResults={riskResults} isLoading={isLoading} />
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Нижний блок с дополнительной информацией */}
        <Card className="mt-8">
          <CardBody>
            <div className="text-center">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Нужна консультация специалиста?
              </h3>
              <p className="mb-4 text-gray-600">
                Если результаты оценки показывают повышенные риски, рекомендуем
                обратиться к врачу-онкологу для профессиональной консультации.
              </p>
              <div className="flex flex-row flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                <span>📞 Горячая линия: 8-800-555-0123</span>
                <Link href="/clinics">🏥 Онкологические центры</Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
