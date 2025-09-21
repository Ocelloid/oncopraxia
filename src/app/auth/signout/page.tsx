"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const { data: session } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.error("Ошибка выхода:", error);
      setIsSigningOut(false);
    }
  };

  const handleCancel = () => {
    router.back();
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
          {/* Иконка выхода */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-10 w-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>

          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Выход из системы
          </h2>

          <div className="mb-6">
            {session?.user ? (
              <div className="space-y-3">
                <p className="text-gray-600">
                  Вы действительно хотите выйти из системы?
                </p>

                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="mb-1 text-sm text-gray-500">
                    Текущий пользователь:
                  </div>
                  <div className="font-semibold break-all text-gray-900">
                    {session.user.email}
                  </div>
                </div>

                <p className="text-sm text-gray-500">
                  После выхода вам потребуется снова войти в систему для доступа
                  к личному кабинету.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-gray-600">Вы не авторизованы в системе</p>
                <p className="text-sm text-gray-500">
                  Для доступа к функциям портала войдите в систему
                </p>
              </div>
            )}
          </div>

          {/* Кнопки действий */}
          <div className="space-y-3">
            {session?.user ? (
              <>
                <button
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="w-full rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSigningOut ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Выходим...</span>
                    </div>
                  ) : (
                    "Да, выйти из системы"
                  )}
                </button>

                <button
                  onClick={handleCancel}
                  disabled={isSigningOut}
                  className="w-full rounded-full border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Отмена
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="block w-full rounded-full bg-red-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-red-700"
                >
                  Войти в систему
                </Link>

                <Link
                  href="/"
                  className="block w-full rounded-full border-2 border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  На главную
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Информация о безопасности */}
        <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50/80 p-6 backdrop-blur-sm">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
              <svg
                className="h-4 w-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-sm font-semibold text-blue-900">
              Безопасность данных
            </h3>
            <p className="text-xs leading-relaxed text-blue-800">
              Ваши данные защищены. При выходе из системы все активные сессии
              будут завершены. Для повторного входа потребуется новая ссылка на
              email.
            </p>
          </div>
        </div>

        {/* Статистика */}
        <div className="mt-6 text-center">
          <p className="mb-3 text-sm text-gray-600">
            Ранняя диагностика спасает жизни
          </p>
        </div>

        {/* Ссылка на главную */}
        {session?.user && (
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-600 transition-colors hover:text-gray-900"
            >
              ← Вернуться на главную
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
