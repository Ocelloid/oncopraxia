"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// Временно заменяем иконки на простой текст
const BarChart3 = () => <span>📊</span>;
const Trophy = () => <span>🏆</span>;
const Building2 = () => <span>🏥</span>;
const Phone = () => <span>📞</span>;
const FolderOpen = () => <span>📁</span>;
const MapPin = () => <span>📍</span>;
const PieChart = () => <span>📈</span>;
const Users = () => <span>👥</span>;
const FileText = () => <span>📄</span>;
const Home = () => <span>🏠</span>;
const Settings = () => <span>⚙️</span>;
const LogOut = () => <span>🚪</span>;
import { signOut } from "next-auth/react";

const sidebarItems = [
  {
    name: "Дашборд",
    href: "/admin",
    icon: Home,
  },
  {
    name: "Статистика",
    href: "/admin/statistics",
    icon: BarChart3,
  },
  {
    name: "Достижения",
    href: "/admin/achievements",
    icon: Trophy,
  },
  {
    name: "Учреждения",
    href: "/admin/facilities",
    icon: Building2,
  },
  {
    name: "Контакты",
    href: "/admin/contacts",
    icon: Phone,
  },
  {
    name: "Проекты",
    href: "/admin/projects",
    icon: FolderOpen,
  },
  {
    name: "Города",
    href: "/admin/cities",
    icon: MapPin,
  },
  {
    name: "Виды рака",
    href: "/admin/cancer-types",
    icon: PieChart,
  },
  {
    name: "Демография",
    href: "/admin/demographics",
    icon: Users,
  },
  {
    name: "Инструкции",
    href: "/admin/instructions",
    icon: FileText,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col bg-white shadow-lg">
      <div className="flex h-16 items-center justify-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Панель управления</h1>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-3">
        <Link
          href="/admin/settings"
          className={`mb-2 flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            pathname === "/admin/settings"
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <Settings />
          Настройки
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-red-700"
        >
          <LogOut />
          Выйти
        </button>
      </div>
    </div>
  );
}
