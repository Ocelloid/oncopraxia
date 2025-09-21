/**
 * Скрипт для назначения роли администратора пользователю
 * Запуск: npx tsx scripts/set-admin-role.ts <email>
 */

import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

async function setAdminRole(email: string) {
  try {
    console.log(`Поиск пользователя с email: ${email}`);

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user.length === 0) {
      console.error(`❌ Пользователь с email ${email} не найден`);
      return;
    }

    const [foundUser] = user;
    if (!foundUser) {
      console.error(`❌ Пользователь с email ${email} не найден`);
      return;
    }

    console.log(`✅ Пользователь найден: ${foundUser.name ?? foundUser.email}`);

    if (foundUser.role === "admin") {
      console.log(`ℹ️  Пользователь уже является администратором`);
      return;
    }

    await db.update(users).set({ role: "admin" }).where(eq(users.email, email));

    console.log(
      `🎉 Роль администратора успешно назначена пользователю ${email}`,
    );
  } catch (error) {
    console.error("❌ Ошибка при назначении роли:", error);
  } finally {
    process.exit(0);
  }
}

// Получаем email из аргументов командной строки
const email = process.argv[2];

if (!email) {
  console.error("❌ Укажите email пользователя:");
  console.error(
    "Использование: npx tsx scripts/set-admin-role.ts user@example.com",
  );
  process.exit(1);
}

void setAdminRole(email);
