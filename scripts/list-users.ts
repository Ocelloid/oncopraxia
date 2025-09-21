/**
 * Скрипт для просмотра всех пользователей и их ролей
 * Запуск: npx tsx scripts/list-users.ts
 */

import { db } from "~/server/db";
import { users } from "~/server/db/schema";

async function listUsers() {
  try {
    console.log("📋 Список всех пользователей:\n");

    const allUsers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        emailVerified: users.emailVerified,
      })
      .from(users);

    if (allUsers.length === 0) {
      console.log("ℹ️  Пользователи не найдены");
      return;
    }

    // Выводим таблицу пользователей
    console.table(
      allUsers.map((user) => ({
        ID: user.id.slice(0, 8) + "...",
        Имя: user.name ?? "—",
        Email: user.email,
        Роль: user.role,
        "Email подтвержден": user.emailVerified ? "✅" : "❌",
      })),
    );

    const adminCount = allUsers.filter((user) => user.role === "admin").length;
    const userCount = allUsers.filter((user) => user.role === "user").length;

    console.log(`\n📊 Статистика:`);
    console.log(`   Всего пользователей: ${allUsers.length}`);
    console.log(`   Администраторов: ${adminCount}`);
    console.log(`   Обычных пользователей: ${userCount}`);
  } catch (error) {
    console.error("❌ Ошибка при получении списка пользователей:", error);
  } finally {
    process.exit(0);
  }
}

void listUsers();
