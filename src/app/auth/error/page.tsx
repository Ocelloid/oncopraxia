"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const errorMessages = {
  Configuration: {
    title: "Ошибка конфигурации",
    description:
      "Произошла ошибка в настройках сервера. Пожалуйста, обратитесь к администратору.",
    icon: "⚙️",
    color: "red",
  },
  AccessDenied: {
    title: "Доступ запрещен",
    description:
      "У вас нет прав доступа к этому ресурсу. Обратитесь к администратору для получения доступа.",
    icon: "🚫",
    color: "red",
  },
  Verification: {
    title: "Ошибка верификации",
    description:
      "Ссылка недействительна или срок её действия истек. Попробуйте войти в систему заново.",
    icon: "⚠️",
    color: "yellow",
  },
  Default: {
    title: "Произошла ошибка",
    description:
      "Что-то пошло не так. Попробуйте еще раз или обратитесь в службу поддержки.",
    icon: "❌",
    color: "red",
  },
  Signin: {
    title: "Ошибка входа",
    description:
      "Не удалось войти в систему. Проверьте правильность введенных данных.",
    icon: "🔐",
    color: "red",
  },
  OAuthSignin: {
    title: "Ошибка OAuth входа",
    description:
      "Произошла ошибка при входе через внешний сервис. Попробуйте еще раз.",
    icon: "🔗",
    color: "red",
  },
  OAuthCallback: {
    title: "Ошибка OAuth",
    description: "Произошла ошибка при обработке ответа от внешнего сервиса.",
    icon: "🔗",
    color: "red",
  },
  OAuthCreateAccount: {
    title: "Ошибка создания аккаунта",
    description: "Не удалось создать аккаунт через внешний сервис.",
    icon: "👤",
    color: "red",
  },
  EmailCreateAccount: {
    title: "Ошибка создания аккаунта",
    description: "Не удалось создать аккаунт с указанным email адресом.",
    icon: "📧",
    color: "red",
  },
  Callback: {
    title: "Ошибка обратного вызова",
    description: "Произошла ошибка при обработке входа в систему.",
    icon: "🔄",
    color: "red",
  },
  OAuthAccountNotLinked: {
    title: "Аккаунт не связан",
    description:
      "Этот email уже используется с другим способом входа. Попробуйте войти другим способом.",
    icon: "🔗",
    color: "yellow",
  },
  EmailSignin: {
    title: "Ошибка отправки email",
    description:
      "Не удалось отправить письмо для входа. Проверьте правильность email адреса.",
    icon: "📧",
    color: "red",
  },
  CredentialsSignin: {
    title: "Неверные данные",
    description: "Неправильный email или пароль. Проверьте введенные данные.",
    icon: "🔐",
    color: "red",
  },
  SessionRequired: {
    title: "Требуется авторизация",
    description: "Для доступа к этой странице необходимо войти в систему.",
    icon: "🔒",
    color: "blue",
  },
};

// Компонент для работы с search parameters
function SearchParamsHandler({
  onParamsReceived,
}: {
  onParamsReceived: (error: string) => void;
}) {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") ?? "Default";

  useEffect(() => {
    onParamsReceived(error);
  }, [error, onParamsReceived]);

  return null;
}

// Основной компонент ошибки
function AuthErrorContent({ error }: { error: string }) {
  const errorInfo =
    errorMessages[error as keyof typeof errorMessages] || errorMessages.Default;

  const getColorClasses = (color: string) => {
    switch (color) {
      case "red":
        return {
          bg: "bg-red-100",
          border: "border-red-200",
          icon: "text-red-600",
          title: "text-red-900",
          text: "text-red-800",
        };
      case "yellow":
        return {
          bg: "bg-yellow-100",
          border: "border-yellow-200",
          icon: "text-yellow-600",
          title: "text-yellow-900",
          text: "text-yellow-800",
        };
      case "blue":
        return {
          bg: "bg-blue-100",
          border: "border-blue-200",
          icon: "text-blue-600",
          title: "text-blue-900",
          text: "text-blue-800",
        };
      default:
        return {
          bg: "bg-gray-100",
          border: "border-gray-200",
          icon: "text-gray-600",
          title: "text-gray-900",
          text: "text-gray-800",
        };
    }
  };

  const colors = getColorClasses(errorInfo.color);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-red-50 px-4">
      <div className="w-full max-w-md">
        {/* Заголовок */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              Онконастороженность
            </h1>
            <p className="text-gray-600">
              Информационный портал ранней диагностики
            </p>
          </Link>
        </div>

        {/* Основная карточка */}
        <div className="rounded-2xl border border-gray-200 bg-white/90 p-8 text-center shadow-lg backdrop-blur-sm">
          {/* Иконка ошибки */}
          <div
            className={`h-20 w-20 ${colors.bg} mx-auto mb-6 flex items-center justify-center rounded-full`}
          >
            <span className="text-4xl">{errorInfo.icon}</span>
          </div>

          <h2 className={`text-2xl font-bold ${colors.title} mb-4`}>
            {errorInfo.title}
          </h2>

          <p className="mb-6 leading-relaxed text-gray-600">
            {errorInfo.description}
          </p>

          {/* Детали ошибки для разработчика */}
          {error !== "Default" && (
            <div
              className={`${colors.bg} ${colors.border} mb-6 rounded-lg border p-4`}
            >
              <p className={`${colors.text} text-sm`}>
                <strong>Код ошибки:</strong> {error}
              </p>
            </div>
          )}

          {/* Кнопки действий */}
          <div className="space-y-3">
            {error === "Verification" || error === "EmailSignin" ? (
              <Link
                href="/auth/signin"
                className="block w-full rounded-full bg-red-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-red-700"
              >
                Попробовать снова
              </Link>
            ) : error === "SessionRequired" ? (
              <Link
                href="/auth/signin"
                className="block w-full rounded-full bg-blue-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Войти в систему
              </Link>
            ) : (
              <Link
                href="/auth/signin"
                className="block w-full rounded-full bg-red-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-red-700"
              >
                Попробовать войти снова
              </Link>
            )}

            <Link
              href="/"
              className="block w-full rounded-full border-2 border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              На главную
            </Link>
          </div>
        </div>

        {/* Помощь */}
        <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50/80 p-6 backdrop-blur-sm">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-600">
              <svg
                className="h-4 w-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-sm font-semibold text-gray-900">
              Нужна помощь?
            </h3>
            <p className="mb-3 text-xs leading-relaxed text-gray-600">
              Если проблема повторяется, обратитесь к администратору портала или
              попробуйте позже.
            </p>
            <div className="space-y-1 text-xs text-gray-500">
              <p>• Проверьте подключение к интернету</p>
              <p>• Убедитесь, что email адрес введен правильно</p>
              <p>• Попробуйте очистить кэш браузера</p>
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className="mt-6 text-center">
          <p className="mb-3 text-sm text-gray-600">
            Ранняя диагностика спасает жизни
          </p>
        </div>
      </div>
    </div>
  );
}

// Главный экспортируемый компонент с Suspense
export default function AuthError() {
  const [error, setError] = useState("Default");

  const handleParamsReceived = (newError: string) => {
    setError(newError);
  };

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-red-50">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-red-600"></div>
        </div>
      }
    >
      <SearchParamsHandler onParamsReceived={handleParamsReceived} />
      <AuthErrorContent error={error} />
    </Suspense>
  );
}
