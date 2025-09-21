export default function StatisticsSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Статистика по Пермскому краю
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Актуальные данные о состоянии онкологической помощи в регионе за
            2024 {/* PLACEHOLDER */} год
          </p>
        </div>

        {/* Основная статистика */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border-l-4 border-red-500 bg-white p-8 text-center shadow-lg">
            <div className="mb-2 text-4xl font-bold text-red-600">
              189,650 {/* PLACEHOLDER */}
            </div>
            <div className="font-medium text-gray-700">посещений онкологов</div>
            <div className="mt-2 text-sm text-gray-500">
              в первичных кабинетах
            </div>
          </div>

          <div className="rounded-2xl border-l-4 border-blue-500 bg-white p-8 text-center shadow-lg">
            <div className="mb-2 text-4xl font-bold text-blue-600">
              516,009 {/* PLACEHOLDER */}
            </div>
            <div className="font-medium text-gray-700">осмотрено человек</div>
            <div className="mt-2 text-sm text-gray-500">
              в кабинетах раннего выявления
            </div>
          </div>

          <div className="rounded-2xl border-l-4 border-green-500 bg-white p-8 text-center shadow-lg">
            <div className="mb-2 text-4xl font-bold text-green-600">
              18,699 {/* PLACEHOLDER */}
            </div>
            <div className="font-medium text-gray-700">
              предопухолевых заболеваний
            </div>
            <div className="mt-2 text-sm text-gray-500">выявлено</div>
          </div>

          <div className="rounded-2xl border-l-4 border-orange-500 bg-white p-8 text-center shadow-lg">
            <div className="mb-2 text-4xl font-bold text-orange-600">
              67,454 {/* PLACEHOLDER */}
            </div>
            <div className="font-medium text-gray-700">посещений ЦАОП</div>
            <div className="mt-2 text-sm text-gray-500">
              рост на 9,9% {/* PLACEHOLDER */}
            </div>
          </div>
        </div>

        {/* Дополнительная статистика */}
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">
              Лекарственная терапия
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">
                  Пациентов получили химиотерапию:
                </span>
                <span className="font-bold text-red-600">
                  4,460 {/* PLACEHOLDER */}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">
                  Курсов лекарственной терапии:
                </span>
                <span className="font-bold text-red-600">
                  14,028 {/* PLACEHOLDER */}
                </span>
              </div>
              <div className="text-sm font-medium text-green-600">
                ↗ Рост на 27,2% {/* PLACEHOLDER */} по сравнению с 2023{" "}
                {/* PLACEHOLDER */} годом
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">
              Телемедицина
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">
                  Телемедицинских консультаций:
                </span>
                <span className="font-bold text-blue-600">
                  12,225 {/* PLACEHOLDER */}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">
                  Дистанционных консультаций с НМИЦ:
                </span>
                <span className="font-bold text-blue-600">
                  680 {/* PLACEHOLDER */}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Консультации с 12 {/* PLACEHOLDER */} ведущими медицинскими
                центрами страны
              </div>
            </div>
          </div>
        </div>

        {/* Источники данных */}
        <div className="rounded-2xl bg-blue-50 p-8 text-center">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">
            Источники данных
          </h3>
          <p className="mb-4 text-gray-700">
            Статистика основана на официальных отчетах о состоянии
            онкологической помощи в Пермском крае
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="https://www.permcancer.ru/upload/pages/2210/Sostojanije-onkopomoshhi-2024.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Отчет 2024 {/* PLACEHOLDER */}
            </a>
            <a
              href="https://permcancer.ru/upload/pages/2210/2023_Sostoyanie_onkopomoshi_v_PK.pdf.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-gray-600 px-6 py-3 text-white transition-colors hover:bg-gray-700"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Отчет 2023 {/* PLACEHOLDER */}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
