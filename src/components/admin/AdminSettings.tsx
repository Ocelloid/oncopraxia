"use client";

import { Card, CardBody, CardHeader, Button, Chip } from "@heroui/react";
import { useSession } from "next-auth/react";

export default function AdminSettings() {
  const { data: session } = useSession();

  const systemInfo = [
    { label: "Версия системы", value: "1.0.0" },
    {
      label: "Последнее обновление",
      value: new Date().toLocaleDateString("ru-RU"),
    },
    { label: "База данных", value: "PostgreSQL" },
    { label: "Статус", value: "Активна", color: "success" as const },
  ];

  const adminActions = [
    {
      title: "Очистка кеша",
      description: "Очистить кеш системы для обновления данных",
      action: () => {
        // Здесь будет логика очистки кеша
        alert("Кеш очищен");
      },
      color: "primary" as const,
    },
    {
      title: "Экспорт данных",
      description: "Экспортировать все данные системы",
      action: () => {
        // Здесь будет логика экспорта
        alert("Функция в разработке");
      },
      color: "secondary" as const,
    },
    {
      title: "Импорт данных",
      description: "Импортировать данные из файла",
      action: () => {
        // Здесь будет логика импорта
        alert("Функция в разработке");
      },
      color: "warning" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Настройки системы</h1>
        <p className="text-gray-600">
          Управление системными настройками и параметрами
        </p>
      </div>

      {/* Информация о пользователе */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Информация о пользователе</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">
                {session?.user?.email ?? "Не авторизован"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Имя:</span>
              <span className="font-medium">{session?.user?.name ?? "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Роль:</span>
              <Chip color="primary" size="sm">
                Администратор
              </Chip>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Последний вход:</span>
              <span className="font-medium">
                {new Date().toLocaleString("ru-RU")}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Информация о системе */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Информация о системе</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {systemInfo.map((info, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600">{info.label}:</span>
                {info.color ? (
                  <Chip color={info.color} size="sm">
                    {info.value}
                  </Chip>
                ) : (
                  <span className="font-medium">{info.value}</span>
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Административные действия */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Административные действия</h3>
        </CardHeader>
        <CardBody>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {adminActions.map((action, index) => (
              <Card key={index} className="border">
                <CardBody>
                  <div className="space-y-3">
                    <h4 className="font-semibold">{action.title}</h4>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                    <Button
                      color={action.color}
                      size="sm"
                      onPress={action.action}
                      className="w-full"
                    >
                      Выполнить
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Статистика использования */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Статистика использования</h3>
        </CardHeader>
        <CardBody>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">
                Активных пользователей
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">847</div>
              <div className="text-sm text-gray-600">Записей в базе</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">156</div>
              <div className="text-sm text-gray-600">Операций сегодня</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">99.9%</div>
              <div className="text-sm text-gray-600">Время работы</div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Предупреждения и уведомления */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Системные уведомления</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg bg-green-50 p-3">
              <div className="mt-2 h-2 w-2 rounded-full bg-green-500"></div>
              <div>
                <div className="font-medium text-green-800">
                  Система работает стабильно
                </div>
                <div className="text-sm text-green-600">
                  Все сервисы функционируют нормально
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-yellow-50 p-3">
              <div className="mt-2 h-2 w-2 rounded-full bg-yellow-500"></div>
              <div>
                <div className="font-medium text-yellow-800">
                  Рекомендуется обновление
                </div>
                <div className="text-sm text-yellow-600">
                  Доступна новая версия системы
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
