import Link from "next/link";

export default function AchievementsSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Достижения в ранней диагностике
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Пермский край демонстрирует значительные успехи в развитии системы
            раннего выявления онкологических заболеваний
          </p>
        </div>

        {/* Ключевые показатели эффективности */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-6 text-center shadow-lg">
            <div className="mb-2 text-4xl font-bold text-green-600">
              85% {/* PLACEHOLDER */}
            </div>
            <div className="font-medium text-gray-700">
              выявлено на ранних стадиях
            </div>
            <div className="mt-2 text-sm text-gray-500">
              I-II стадии заболевания
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center shadow-lg">
            <div className="mb-2 text-4xl font-bold text-blue-600">
              +15% {/* PLACEHOLDER */}
            </div>
            <div className="font-medium text-gray-700">рост выявляемости</div>
            <div className="mt-2 text-sm text-gray-500">
              за последние 3 {/* PLACEHOLDER */} года
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center shadow-lg">
            <div className="mb-2 text-4xl font-bold text-purple-600">
              92% {/* PLACEHOLDER */}
            </div>
            <div className="font-medium text-gray-700">
              5-летняя выживаемость
            </div>
            <div className="mt-2 text-sm text-gray-500">
              при раннем выявлении
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 p-6 text-center shadow-lg">
            <div className="mb-2 text-4xl font-bold text-orange-600">
              -25% {/* PLACEHOLDER */}
            </div>
            <div className="font-medium text-gray-700">снижение смертности</div>
            <div className="mt-2 text-sm text-gray-500">
              за последние 5 {/* PLACEHOLDER */} лет
            </div>
          </div>
        </div>

        {/* Основные достижения */}
        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Инфраструктурные достижения */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 p-8 shadow-xl">
            <div className="mb-6 flex items-center">
              <div className="mr-4 rounded-full bg-blue-600 p-4 text-white">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Развитие инфраструктуры
              </h3>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg bg-white/70 p-4">
                <h4 className="mb-3 font-semibold text-gray-900">
                  Создано и модернизировано:
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    8 {/* PLACEHOLDER */} центров амбулаторной онкологической
                    помощи
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    44 {/* PLACEHOLDER */} первичных онкологических кабинета
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    232 {/* PLACEHOLDER */} кабинета раннего выявления
                    заболеваний
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Центр телемедицинских консультаций
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Качественные достижения */}
          <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 p-8 shadow-xl">
            <div className="mb-6 flex items-center">
              <div className="mr-4 rounded-full bg-green-600 p-4 text-white">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Качество диагностики
              </h3>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg bg-white/70 p-4">
                <h4 className="mb-3 font-semibold text-gray-900">
                  Улучшение показателей:
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    Сокращение времени диагностики до 14 {/* PLACEHOLDER */}{" "}
                    дней
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    Внедрение современных методов ПЭТ/КТ диагностики
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    Увеличение доступности высокотехнологичной помощи
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    Развитие телемедицинских консультаций
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Награды и признание */}
        <div className="rounded-2xl bg-gradient-to-r from-yellow-50 to-orange-50 p-8 shadow-xl">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500 text-white">
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Признание и награды
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-2 text-2xl font-bold text-yellow-600">
                  2024 {/* PLACEHOLDER */}
                </div>
                <div className="font-medium text-gray-700">
                  Лучший регион по развитию онкологической службы
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-2 text-2xl font-bold text-yellow-600">
                  TOP-5 {/* PLACEHOLDER */}
                </div>
                <div className="font-medium text-gray-700">
                  По показателям ранней диагностики в РФ
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-2 text-2xl font-bold text-yellow-600">
                  98% {/* PLACEHOLDER */}
                </div>
                <div className="font-medium text-gray-700">
                  Удовлетворенность пациентов качеством помощи
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-700 p-8 text-white">
            <h3 className="mb-4 text-2xl font-bold">
              Присоединяйтесь к программе ранней диагностики!
            </h3>
            <p className="mb-6 text-xl opacity-90">
              Воспользуйтесь всеми возможностями современной онкологической
              службы Пермского края
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/opportunities"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-gray-100"
              >
                Узнать о программах скрининга
              </Link>
              <a
                href="tel:+73422393333"
                className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-blue-600"
              >
                Записаться на обследование
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
