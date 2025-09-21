# 📧 Настройка почты Mail.ru для NextAuth

## ❌ Проблема

Ошибка: `Invalid login: 535 5.7.0 NEOBHODIM parol prilozheniya / Application password is REQUIRED`

**Причина:** Mail.ru требует пароль приложения для внешних приложений, обычный пароль не подходит.

## ✅ Решение

### 1. Включение двухфакторной аутентификации

Пароль приложения можно создать только при включенной 2FA:

1. Зайдите в настройки Mail.ru: https://account.mail.ru/user/2-step-auth/
2. Включите двухфакторную аутентификацию
3. Подтвердите через SMS или приложение

### 2. Создание пароля приложения

1. **Перейдите в настройки безопасности:**

   - https://account.mail.ru/user/2-step-auth/passwords

2. **Создайте новый пароль приложения:**

   - Нажмите "Создать пароль приложения"
   - Введите название: `NextAuth OncopraxiA`
   - Сохраните сгенерированный пароль (он больше не будет показан!)

3. **Скопируйте пароль** - это будет ваш `EMAIL_SERVER_PASSWORD`

### 3. Обновление переменных окружения

Обновите ваш `.env` файл:

```env
# Настройки Mail.ru SMTP
EMAIL_SERVER_HOST=smtp.mail.ru
EMAIL_SERVER_PORT=465
EMAIL_SERVER_USER=your-email@mail.ru
EMAIL_SERVER_PASSWORD=ваш-пароль-приложения-здесь
EMAIL_FROM=your-email@mail.ru
```

### 4. Альтернативные настройки портов

Если порт 465 не работает, попробуйте:

**Вариант 1 (TLS):**

```env
EMAIL_SERVER_HOST=smtp.mail.ru
EMAIL_SERVER_PORT=587
```

**Вариант 2 (SSL):**

```env
EMAIL_SERVER_HOST=smtp.mail.ru
EMAIL_SERVER_PORT=465
```

## 🔧 Альтернативные почтовые сервисы

Если Mail.ru продолжает создавать проблемы, рекомендуется использовать:

### Gmail

```env
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
```

### Yandex

```env
EMAIL_SERVER_HOST=smtp.yandex.ru
EMAIL_SERVER_PORT=465
EMAIL_SERVER_USER=your-email@yandex.ru
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=your-email@yandex.ru
```

### Mailgun (рекомендуется для продакшена)

```env
EMAIL_SERVER_HOST=smtp.mailgun.org
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=postmaster@your-domain.mailgun.org
EMAIL_SERVER_PASSWORD=your-mailgun-smtp-password
EMAIL_FROM=noreply@your-domain.com
```

## 🧪 Тестирование

После обновления настроек:

1. Перезапустите dev сервер: `pnpm dev`
2. Попробуйте войти через email
3. Проверьте логи в терминале

## 🔒 Безопасность

- ✅ Никогда не коммитьте `.env` файл в git
- ✅ Используйте разные пароли приложений для разных сервисов
- ✅ Регулярно обновляйте пароли приложений
- ✅ Отзывайте неиспользуемые пароли приложений

## 📞 Поддержка

Если проблемы продолжаются:

1. Проверьте правильность всех данных
2. Убедитесь, что 2FA включена в Mail.ru
3. Попробуйте создать новый пароль приложения
4. Рассмотрите переход на другой почтовый сервис
