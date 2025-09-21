import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "~/components/admin/AdminSidebar";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Админ-панель | Онконастороженность",
  description: "Административная панель для управления данными",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Проверяем, что пользователь авторизован и является админом
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  // Проверяем роль администратора
  if (session.user.role !== "admin") {
    redirect("/admin/access-denied");
  }

  return (
    <div
      className="flex flex-1 flex-grow bg-gray-50"
      style={{ height: "calc(100vh - 134px)" }}
    >
      <AdminSidebar />
      <main className="h-full flex-1 flex-grow p-6">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
