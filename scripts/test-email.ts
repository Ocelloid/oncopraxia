/**
 * Скрипт для тестирования почтовых настроек
 * Запуск: npx tsx scripts/test-email.ts <email>
 */

import { createTransport } from "nodemailer";
import { env } from "~/env";

async function testEmail(testEmail: string) {
  try {
    console.log("📧 Тестирование почтовых настроек...\n");

    console.log("🔧 Конфигурация:");
    console.log(`   Host: ${env.EMAIL_SERVER_HOST}`);
    console.log(`   Port: ${env.EMAIL_SERVER_PORT}`);
    console.log(`   User: ${env.EMAIL_SERVER_USER}`);
    console.log(`   From: ${env.EMAIL_FROM}`);
    console.log(`   Secure: ${Number(env.EMAIL_SERVER_PORT) === 465}\n`);

    const transport = createTransport({
      host: env.EMAIL_SERVER_HOST,
      port: Number(env.EMAIL_SERVER_PORT),
      secure: Number(env.EMAIL_SERVER_PORT) === 465,
      auth: {
        user: env.EMAIL_SERVER_USER,
        pass: env.EMAIL_SERVER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    console.log("🔍 Проверка соединения с SMTP сервером...");
    await transport.verify();
    console.log("✅ Соединение с SMTP сервером успешно!\n");

    console.log("📤 Отправка тестового письма...");
    const result = await transport.sendMail({
      from: env.EMAIL_FROM,
      to: testEmail,
      subject: "Тест почтовых настроек - OncopraxiA",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">🎉 Почтовые настройки работают!</h2>
          <p>Это тестовое письмо подтверждает, что настройки SMTP корректны.</p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Детали конфигурации:</h3>
            <ul>
              <li><strong>Host:</strong> ${env.EMAIL_SERVER_HOST}</li>
              <li><strong>Port:</strong> ${env.EMAIL_SERVER_PORT}</li>
              <li><strong>From:</strong> ${env.EMAIL_FROM}</li>
              <li><strong>Время:</strong> ${new Date().toLocaleString("ru-RU")}</li>
            </ul>
          </div>
          <p style="color: #666; font-size: 14px;">
            Если вы получили это письмо, значит NextAuth будет работать корректно.
          </p>
        </div>
      `,
      text: `
Тест почтовых настроек - OncopraxiA

Почтовые настройки работают корректно!

Детали:
- Host: ${env.EMAIL_SERVER_HOST}
- Port: ${env.EMAIL_SERVER_PORT}
- From: ${env.EMAIL_FROM}
- Время: ${new Date().toLocaleString("ru-RU")}
      `,
    });

    console.log("✅ Тестовое письмо отправлено успешно!");
    console.log(`📬 MessageId: ${result.messageId}`);
    console.log(`📧 Получатель: ${testEmail}\n`);
    console.log("🎯 Проверьте почтовый ящик (включая спам)!");
  } catch (error) {
    console.error("❌ Ошибка при тестировании почты:");
    if (error instanceof Error) {
      console.error(`   ${error.message}\n`);

      // Специфичные подсказки для Mail.ru
      if (
        error.message.includes("535") ||
        error.message.includes("NEOBHODIM parol prilozheniya")
      ) {
        console.log("💡 Решение для Mail.ru:");
        console.log("   1. Включите двухфакторную аутентификацию");
        console.log("   2. Создайте пароль приложения:");
        console.log("      https://account.mail.ru/user/2-step-auth/passwords");
        console.log(
          "   3. Используйте пароль приложения в EMAIL_SERVER_PASSWORD\n",
        );
      }

      if (
        error.message.includes("ECONNREFUSED") ||
        error.message.includes("timeout")
      ) {
        console.log("💡 Проблема с подключением:");
        console.log("   1. Проверьте правильность хоста и порта");
        console.log(
          "   2. Попробуйте другой порт (587 вместо 465 или наоборот)",
        );
        console.log("   3. Проверьте настройки файрвола\n");
      }
    } else {
      console.error(error);
    }
  } finally {
    process.exit(0);
  }
}

// Получаем email из аргументов командной строки
const testEmail = process.argv[2];

if (!testEmail) {
  console.error("❌ Укажите email для тестирования:");
  console.error(
    "Использование: npx tsx scripts/test-email.ts test@example.com",
  );
  process.exit(1);
}

if (!testEmail.includes("@")) {
  console.error("❌ Укажите корректный email адрес");
  process.exit(1);
}

void testEmail(testEmail);
