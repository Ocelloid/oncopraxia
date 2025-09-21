"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Закрытие меню при изменении размера экрана
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Предотвращение скролла когда меню открыто
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Очистка при размонтировании
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Закрытие меню по клавише Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between transition-colors hover:text-black/80">
          {/* Логотип/название сайта */}
          <div className="text-xl font-bold">
            <Link href="/" className="">
              Онконастороженность
            </Link>
          </div>

          {/* Навигационное меню */}
          <nav className="hidden items-center space-x-2 md:flex">
            <Link href="/" className="transition-colors">
              Главная
            </Link>
            <Link href="/about" className="transition-colors">
              Обоснование
            </Link>
            <Link href="/clinics" className="transition-colors">
              Клиники
            </Link>
            <Link href="/opportunities" className="transition-colors">
              Возможности
            </Link>
            {session && (
              <Link href="/admin" className="transition-colors">
                Кабинет
              </Link>
            )}

            {/* Аутентификация */}
            <div className="flex items-center space-x-4">
              {session && (
                <span className="text-sm text-black/70">
                  {session.user?.email}
                </span>
              )}
              <Link
                href={session ? "/auth/signout" : "/auth/signin"}
                className="rounded-full bg-black/10 px-6 py-2 text-sm font-semibold no-underline transition hover:bg-black/20"
              >
                {session ? "Выйти" : "Войти"}
              </Link>
            </div>
          </nav>

          {/* Мобильное меню (кнопка) */}
          <div className="md:hidden">
            <button
              className="text-black hover:text-black/80 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Открыть меню"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="animate-in slide-in-from-top-2 fixed top-[69px] right-0 left-0 z-50 border-b border-gray-200 bg-white/95 shadow-lg backdrop-blur-sm duration-200">
            <nav className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-2">
                <Link
                  href="/"
                  className="block rounded-lg px-3 py-3 text-black transition-all duration-200 hover:bg-black/5 active:bg-black/10"
                  onClick={closeMobileMenu}
                >
                  🏠 Главная
                </Link>
                <Link
                  href="/about"
                  className="block rounded-lg px-3 py-3 text-black transition-all duration-200 hover:bg-black/5 active:bg-black/10"
                  onClick={closeMobileMenu}
                >
                  📋 Обоснование
                </Link>
                <Link
                  href="/clinics"
                  className="block rounded-lg px-3 py-3 text-black transition-all duration-200 hover:bg-black/5 active:bg-black/10"
                  onClick={closeMobileMenu}
                >
                  🏥 Клиники
                </Link>
                <Link
                  href="/opportunities"
                  className="block rounded-lg px-3 py-3 text-black transition-all duration-200 hover:bg-black/5 active:bg-black/10"
                  onClick={closeMobileMenu}
                >
                  🎯 Возможности
                </Link>
                {session && (
                  <Link
                    href="/admin"
                    className="block rounded-lg px-3 py-3 text-black transition-all duration-200 hover:bg-black/5 active:bg-black/10"
                    onClick={closeMobileMenu}
                  >
                    👤 Кабинет
                  </Link>
                )}

                {/* Мобильная аутентификация */}
                <div className="mt-4 border-t border-gray-200 pt-4">
                  {session && (
                    <div className="mb-3 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700">
                      👤 {session.user?.email}
                    </div>
                  )}
                  <Link
                    href={session ? "/auth/signout" : "/auth/signin"}
                    className="block w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition-all duration-200 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg active:scale-95"
                    onClick={closeMobileMenu}
                  >
                    {session ? "🚪 Выйти" : "🔑 Войти"}
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
