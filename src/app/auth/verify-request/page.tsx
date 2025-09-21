"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function VerifyRequest() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [isResending, setIsResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResend = async () => {
    if (!email || isResending) return;

    setIsResending(true);
    try {
      await signIn("nodemailer", {
        email,
        redirect: false,
      });
      setResent(true);
      setTimeout(() => setResent(false), 3000);
    } catch (error) {
      console.error("Ошибка повторной отправки:", error);
    } finally {
      setIsResending(false);
    }
  };

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
          {/* Иконка письма */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-10 w-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Проверьте почту
          </h2>

          <div className="mb-6 space-y-4">
            <p className="leading-relaxed text-gray-600">
              Мы отправили ссылку для входа на адрес:
            </p>

            {email && (
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="font-semibold break-all text-gray-900">{email}</p>
              </div>
            )}

            <p className="text-sm leading-relaxed text-gray-600">
              Нажмите на ссылку в письме, чтобы войти в систему. Ссылка
              действительна в течение <strong>24 часов</strong>.
            </p>
          </div>

          {/* Предупреждение */}
          <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 h-5 w-5 text-yellow-600">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="mb-1 text-sm font-medium text-yellow-800">
                  Не видите письмо?
                </p>
                <ul className="space-y-1 text-xs text-yellow-700">
                  <li>
                    • Проверьте папку &quot;Спам&quot; или &quot;Нежелательная
                    почта&quot;
                  </li>
                  <li>• Убедитесь, что адрес введен правильно</li>
                  <li>• Подождите несколько минут</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="space-y-3">
            {email && (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="w-full rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isResending ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Отправляем...</span>
                  </div>
                ) : resent ? (
                  "Письмо отправлено повторно!"
                ) : (
                  "Отправить повторно"
                )}
              </button>
            )}

            <Link
              href="/auth/signin"
              className="block w-full rounded-full border-2 border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Изменить email
            </Link>

            <Link
              href="/"
              className="block w-full text-sm text-gray-600 transition-colors hover:text-gray-900"
            >
              ← Вернуться на главную
            </Link>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-8 rounded-xl border border-gray-200 bg-white/60 p-6 backdrop-blur-sm">
          <div className="text-center">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Что вы получите после входа?
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-red-600"></div>
                <span>Доступ к информации о диагностике</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-red-600"></div>
                <span>Поиск ближайших клиник</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-red-600"></div>
                <span>Актуальная статистика по региону</span>
              </div>
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
