"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

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
            <button className="text-black hover:text-black/80">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
