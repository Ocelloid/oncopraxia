"use client";

import { Card, CardBody, Chip, Progress, Spinner } from "@heroui/react";
import { type RiskAssessmentResult } from "~/types/cancer-risk";

interface RiskResultsProps {
  riskResults: RiskAssessmentResult | null;
  isLoading: boolean;
}

export default function RiskResults({
  riskResults,
  isLoading,
}: RiskResultsProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <Spinner size="lg" color="primary" />
          <p className="mt-4 text-gray-600">Расчет рисков...</p>
        </div>
      </div>
    );
  }

  if (!riskResults) {
    return (
      <div className="py-8 text-center">
        <div className="mb-4 text-6xl text-gray-400">📊</div>
        <h3 className="mb-2 text-lg font-semibold text-gray-700">
          Заполните форму для получения результатов
        </h3>
        <p className="text-gray-500">
          Укажите ваш возраст и пол, чтобы начать оценку рисков
        </p>
      </div>
    );
  }

  const { results, overallRisk } = riskResults;

  // Группируем результаты по уровню риска
  const highRiskResults = results.filter((r) => r.riskLevel === "high");
  const mediumRiskResults = results.filter((r) => r.riskLevel === "medium");
  const lowRiskResults = results.filter((r) => r.riskLevel === "low");

  return (
    <div className="space-y-6">
      {/* Общая статистика */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardBody>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <span>📈</span>
            Общая статистика рисков
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Низкий риск */}
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {overallRisk.low}%
              </div>
              <div className="text-sm text-gray-600">Низкий риск</div>
              <Progress
                value={overallRisk.low}
                color="success"
                size="sm"
                className="mt-2"
              />
            </div>

            {/* Средний риск */}
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {overallRisk.medium}%
              </div>
              <div className="text-sm text-gray-600">Средний риск</div>
              <Progress
                value={overallRisk.medium}
                color="warning"
                size="sm"
                className="mt-2"
              />
            </div>

            {/* Высокий риск */}
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {overallRisk.high}%
              </div>
              <div className="text-sm text-gray-600">Высокий риск</div>
              <Progress
                value={overallRisk.high}
                color="danger"
                size="sm"
                className="mt-2"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Результаты высокого риска */}
      {highRiskResults.length > 0 && (
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-red-700">
            <span>⚠️</span>
            Высокий риск ({highRiskResults.length})
          </h3>
          <div className="space-y-2">
            {highRiskResults.map((result, index) => (
              <Card
                key={result.cancerType.id}
                className="border-l-4 border-l-red-500"
              >
                <CardBody className="py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-red-600">
                        {index + 1}
                      </span>
                      <span className="font-medium text-gray-900">
                        {result.cancerType.name}
                      </span>
                    </div>
                    <Chip color="danger" variant="flat" size="sm">
                      {result.riskLabel}
                    </Chip>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Результаты среднего риска */}
      {mediumRiskResults.length > 0 && (
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-orange-700">
            <span>⚡</span>
            Средний риск ({mediumRiskResults.length})
          </h3>
          <div className="space-y-2">
            {mediumRiskResults.map((result, index) => (
              <Card
                key={result.cancerType.id}
                className="border-l-4 border-l-orange-500"
              >
                <CardBody className="py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-orange-600">
                        {highRiskResults.length + index + 1}
                      </span>
                      <span className="font-medium text-gray-900">
                        {result.cancerType.name}
                      </span>
                    </div>
                    <Chip color="warning" variant="flat" size="sm">
                      {result.riskLabel}
                    </Chip>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Результаты низкого риска */}
      {lowRiskResults.length > 0 && (
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-green-700">
            <span>✅</span>
            Низкий риск ({lowRiskResults.length})
          </h3>
          <div className="space-y-2">
            {lowRiskResults.slice(0, 5).map((result, index) => (
              <Card
                key={result.cancerType.id}
                className="border-l-4 border-l-green-500"
              >
                <CardBody className="py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-green-600">
                        {highRiskResults.length +
                          mediumRiskResults.length +
                          index +
                          1}
                      </span>
                      <span className="font-medium text-gray-900">
                        {result.cancerType.name}
                      </span>
                    </div>
                    <Chip color="success" variant="flat" size="sm">
                      {result.riskLabel}
                    </Chip>
                  </div>
                </CardBody>
              </Card>
            ))}
            {lowRiskResults.length > 5 && (
              <Card className="border-2 border-dashed border-gray-300">
                <CardBody className="py-3 text-center">
                  <span className="text-gray-500">
                    И еще {lowRiskResults.length - 5} заболеваний с низким
                    риском
                  </span>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Рекомендации */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardBody>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <span>💡</span>
            Рекомендации
          </h3>

          <div className="space-y-3 text-sm">
            {highRiskResults.length > 0 && (
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">🔴</span>
                <p className="text-gray-700">
                  <strong>Высокий риск:</strong> Рекомендуется срочная
                  консультация с врачом-онкологом и регулярные профилактические
                  осмотры.
                </p>
              </div>
            )}

            {mediumRiskResults.length > 0 && (
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-orange-500">🟡</span>
                <p className="text-gray-700">
                  <strong>Средний риск:</strong> Следует пройти профилактическое
                  обследование и скорректировать образ жизни.
                </p>
              </div>
            )}

            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-green-500">🟢</span>
              <p className="text-gray-700">
                <strong>Общие рекомендации:</strong> Ведите здоровый образ
                жизни, откажитесь от вредных привычек, регулярно занимайтесь
                спортом и правильно питайтесь.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
