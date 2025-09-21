"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const error = searchParams.get("error");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const result = await signIn("nodemailer", {
        email,
        redirect: false,
        callbackUrl,
      });

      if (result?.ok) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Ошибка входа:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
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

          {/* Карточка успеха */}
          <div className="rounded-2xl border border-gray-200 bg-white/90 p-8 text-center shadow-lg backdrop-blur-sm">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Письмо отправлено!
            </h2>

            <p className="mb-6 leading-relaxed text-gray-600">
              Мы отправили ссылку для входа на адрес{" "}
              <strong className="text-gray-900">{email}</strong>
            </p>

            <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="text-sm text-blue-800">
                <strong>Важно:</strong> Проверьте папку &quot;Спам&quot;, если
                письмо не пришло в течение нескольких минут. Ссылка
                действительна 24 часа.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setEmail("");
                }}
                className="w-full rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
              >
                Отправить повторно
              </button>

              <Link
                href="/"
                className="block w-full rounded-full border-2 border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                На главную
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

        {/* Карточка входа */}
        <div className="rounded-2xl border border-gray-200 bg-white/90 p-8 shadow-lg backdrop-blur-sm">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Вход в систему
            </h2>
            <p className="text-gray-600">
              Введите email для получения ссылки входа
            </p>
          </div>

          {/* Сообщение об ошибке */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-800">
                {error === "Verification" &&
                  "Ссылка недействительна или истекла. Попробуйте войти заново."}
                {error === "AccessDenied" &&
                  "Доступ запрещен. Обратитесь к администратору."}
                {error === "Configuration" && "Ошибка конфигурации сервера."}
                {!["Verification", "AccessDenied", "Configuration"].includes(
                  error,
                ) && "Произошла ошибка. Попробуйте еще раз."}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email адрес
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-red-500 focus:ring-2 focus:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="your@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full transform cursor-pointer rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Отправляем...</span>
                </div>
              ) : (
                "Получить ссылку для входа"
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <p className="text-center text-sm text-gray-500">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-8 text-center">
          <p className="mb-4 text-sm text-gray-600">
            Ранняя диагностика спасает жизни
          </p>
        </div>

        {/* Ссылка на главную */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-600 transition-colors hover:text-gray-900"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}
