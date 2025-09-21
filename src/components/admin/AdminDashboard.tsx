"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
// Временно заменяем иконки на простой текст
const BarChart3 = () => <span>📊</span>;
const Trophy = () => <span>🏆</span>;
const Building2 = () => <span>🏥</span>;
const Phone = () => <span>📞</span>;
const FolderOpen = () => <span>📁</span>;
const FileText = () => <span>📄</span>;
const TrendingUp = () => <span>📈</span>;
const Activity = () => <span>⚡</span>;
import { api } from "~/trpc/react";

export default function AdminDashboard() {
  // Загружаем общую статистику для дашборда
  const { data: latestStats, isLoading: statsLoading } =
    api.info.getLatestStatistics.useQuery();
  const { data: activeContent, isLoading: contentLoading } =
    api.info.getActiveContent.useQuery();

  const statsCards = [
    {
      title: "Региональная статистика",
      value: latestStats ? `${latestStats.year} год` : "—",
      description: "Последние данные",
      icon: BarChart3,
      color: "bg-blue-500",
      href: "/admin/statistics",
    },
    {
      title: "Активные достижения",
      value: (activeContent?.achievements?.length ?? 0).toString(),
      description: "Опубликованных наград",
      icon: Trophy,
      color: "bg-yellow-500",
      href: "/admin/achievements",
    },
    {
      title: "Медицинские учреждения",
      value: (activeContent?.facilities?.length ?? 0).toString(),
      description: "Активных учреждений",
      icon: Building2,
      color: "bg-green-500",
      href: "/admin/facilities",
    },
    {
      title: "Активные проекты",
      value: (activeContent?.projects?.length ?? 0).toString(),
      description: "Текущих программ",
      icon: FolderOpen,
      color: "bg-purple-500",
      href: "/admin/projects",
    },
  ];

  const quickActions = [
    {
      title: "Добавить статистику",
      description: "Внести данные за новый год",
      icon: TrendingUp,
      href: "/admin/statistics?action=create",
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      title: "Управление контактами",
      description: "Обновить контактную информацию",
      icon: Phone,
      href: "/admin/contacts",
      color: "bg-green-50 text-green-700 border-green-200",
    },
    {
      title: "Инструкции пациентам",
      description: "Редактировать пошаговые руководства",
      icon: FileText,
      href: "/admin/instructions",
      color: "bg-orange-50 text-orange-700 border-orange-200",
    },
  ];

  if (statsLoading || contentLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="mb-4 h-8 w-1/3 rounded bg-gray-200"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 rounded-lg bg-gray-200"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Дашборд</h1>
        <p className="mt-2 text-gray-600">
          Обзор системы управления информационными данными
        </p>
      </div>

      {/* Статистические карточки */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card
              key={index}
              className="cursor-pointer transition-transform hover:scale-105"
              isPressable
              onPress={() => {
                window.location.href = card.href;
              }}
            >
              <CardBody className="p-6">
                <div className="flex items-center">
                  <div className={`rounded-full p-3 ${card.color} text-white`}>
                    <Icon />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {card.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {card.value}
                    </p>
                    <p className="text-xs text-gray-500">{card.description}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Быстрые действия */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Быстрые действия
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card
                key={index}
                className="cursor-pointer border transition-all hover:shadow-md"
                isPressable
                onPress={() => {
                  window.location.href = action.href;
                }}
              >
                <CardBody className={`p-6 ${action.color} rounded-lg border`}>
                  <div className="flex items-start">
                    <Icon />
                    <div>
                      <h3 className="text-lg font-semibold">{action.title}</h3>
                      <p className="text-sm opacity-80">{action.description}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Последние данные */}
      {latestStats && (
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Последняя статистика
          </h2>
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Activity />
                <h3 className="text-lg font-semibold">
                  Данные за {latestStats.year} год
                </h3>
              </div>
            </CardHeader>
            <CardBody>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {latestStats.oncologyVisits.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Онкологических посещений
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {latestStats.examinations.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Проведено осмотров</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {latestStats.chemotherapyPatients.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Пациентов на химиотерапии
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
