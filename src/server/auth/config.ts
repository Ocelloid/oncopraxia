import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { type Adapter } from "next-auth/adapters";
import Nodemailer from "next-auth/providers/nodemailer";
import { type EmailConfig } from "next-auth/providers/email";
import { type Theme } from "@auth/core/types";
import { createTransport } from "nodemailer";
import { randomInt } from "crypto";
import { env } from "~/env";

import { db } from "~/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "~/server/db/schema";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
  }
}

function gernerateOTP() {
  return randomInt(100000, 999999);
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    Nodemailer({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: Number(env.EMAIL_SERVER_PORT),
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: env.EMAIL_FROM,
      sendVerificationRequest: sendVerificationRequest,
      async generateVerificationToken() {
        const token = gernerateOTP().toString();
        return token;
      },
    }),
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: user.role,
      },
    }),
  },
} satisfies NextAuthConfig;

export async function sendVerificationRequest(params: {
  identifier: string;
  url: string;
  provider: EmailConfig;
  theme: Theme;
}) {
  const { identifier, url, provider } = params;
  const { host } = new URL(url);
  const transport = createTransport(provider.server);
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Войти в ${host} - ${new Date().toLocaleString("ru-RU")}`,
    text: text({ url, host }),
    html: html({ url, host }),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(
      `Email(s) (${failed.map((m) => (typeof m === "string" ? m : m.address)).join(", ")}) could not be sent`,
    );
  }
}

function html(params: { url: string; host: string }) {
  const { url, host } = params;

  const escapedHost = host.replace(/\./g, "&#8203;.");

  const color = {
    background:
      "linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #fecaca 100%)",
    text: "#374151",
    mainBackground: "#ffffff",
    cardBackground: "rgba(255, 255, 255, 0.9)",
    buttonBackground: "#dc2626",
    buttonBackgroundHover: "#b91c1c",
    buttonBorder: "#dc2626",
    buttonText: "#ffffff",
    accent: "#dc2626",
    textSecondary: "#6b7280",
    border: "#e5e7eb",
  };

  return `
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: ${color.background}; min-height: 100vh;">
  <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Заголовок с логотипом -->
    <div style="text-align: center; margin-bottom: 40px;">
      <div style="background: ${color.cardBackground}; border-radius: 20px; padding: 30px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); border: 1px solid ${color.border};">
        <h1 style="margin: 0 0 10px 0; font-size: 28px; font-weight: bold; color: ${color.text};">
          Онконастороженность
        </h1>
        <p style="margin: 0; font-size: 16px; color: ${color.textSecondary};">
          Информационный портал ранней диагностики
        </p>
      </div>
    </div>

    <!-- Основной контент -->
    <div style="background: ${color.cardBackground}; border-radius: 20px; padding: 40px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); border: 1px solid ${color.border}; text-align: center;">
      <h2 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 600; color: ${color.text};">
        Вход в систему
      </h2>
      
      <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: ${color.textSecondary};">
        Для входа в личный кабинет на портале <strong style="color: ${color.text};">${escapedHost}</strong> 
        нажмите кнопку ниже:
      </p>

      <!-- Кнопка входа -->
      <div style="margin: 30px 0;">
        <a href="${url}" target="_blank" 
           style="display: inline-block; background: ${color.buttonBackground}; color: ${color.buttonText}; 
                  text-decoration: none; padding: 16px 32px; border-radius: 50px; font-size: 18px; 
                  font-weight: 600; border: 2px solid ${color.buttonBorder}; 
                  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3); 
                  transition: all 0.3s ease;">
          Войти в систему
        </a>
      </div>

      <!-- Информационный блок -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 30px 0;">
        <div style="display: inline-block; width: 24px; height: 24px; background: ${color.accent}; border-radius: 50%; margin-bottom: 10px;">
          <span style="color: white; font-size: 16px; font-weight: bold; line-height: 24px;">!</span>
        </div>
        <p style="margin: 0; font-size: 14px; color: ${color.textSecondary}; line-height: 1.5;">
          <strong style="color: ${color.text};">Важно:</strong> Ссылка действительна в течение 24 часов.
        </p>
      </div>

      <!-- Статистика -->
      <div style="border-top: 1px solid ${color.border}; padding-top: 20px; margin-top: 30px;">
        <p style="margin: 0 0 15px 0; font-size: 14px; color: ${color.textSecondary};">
          Ранняя диагностика спасает жизни
        </p>
      </div>
    </div>

    <!-- Подвал -->
    <div style="text-align: center; margin-top: 30px; padding: 20px;">
      <p style="margin: 0; font-size: 14px; color: ${color.textSecondary}; line-height: 1.5;">
        Если вы не запрашивали это письмо, просто проигнорируйте его.
        <br>
        Письмо отправлено автоматически, отвечать на него не нужно.
      </p>
    </div>
  </div>
</body>
`;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
  return `
Онконастороженность - Информационный портал ранней диагностики

Вход в систему на ${host}

Для входа в личный кабинет перейдите по ссылке:
${url}

Важно: Ссылка действительна в течение 24 часов.

Наша миссия - ранняя диагностика спасает жизни.

Если вы не запрашивали это письмо, просто проигнорируйте его.
`;
}
