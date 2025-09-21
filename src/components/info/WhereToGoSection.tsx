import Link from "next/link";

export default function WhereToGoSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Куда обратиться для обследования?
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Пошаговая инструкция для получения онкологической помощи в Пермском
            крае
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Поликлиника по месту жительства */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-8 shadow-lg">
            <div className="mb-6 flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Поликлиника по месту жительства
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>Первый шаг:</strong> Обратитесь к участковому терапевту
              </p>

              <div className="rounded-lg bg-white/70 p-4">
                <h4 className="mb-2 font-semibold text-gray-900">
                  Что делает терапевт:
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Проводит первичный осмотр</li>
                  <li>• Назначает необходимые анализы</li>
                  <li>• При подозрении направляет к онкологу</li>
                </ul>
              </div>

              <div className="flex items-center font-medium text-green-600">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Бесплатно по полису ОМС
              </div>
            </div>
          </div>

          {/* Онкологический диспансер */}
          <div className="rounded-2xl bg-gradient-to-br from-red-50 to-red-100 p-8 shadow-lg">
            <div className="mb-6 flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-xl font-bold text-white">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Онкологический диспансер
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>Пермский краевой онкологический диспансер</strong>
              </p>

              <div className="space-y-2 rounded-lg bg-white/70 p-4">
                <div className="flex items-center text-gray-700">
                  <svg
                    className="mr-2 h-4 w-4 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm">г. Пермь, ул. Баумана, 15</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg
                    className="mr-2 h-4 w-4 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-sm">8 (342) 239-33-33</span>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <strong>
                  8 {/* PLACEHOLDER */} центров амбулаторной онкологической
                  помощи (ЦАОП)
                </strong>{" "}
                по всему краю
              </div>
            </div>
          </div>

          {/* ПЭТ-Технолоджи */}
          <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-8 shadow-lg">
            <div className="mb-6 flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                ПЭТ-Технолоджи
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>Современная ПЭТ/КТ диагностика</strong>
              </p>

              <div className="rounded-lg bg-white/70 p-4">
                <h4 className="mb-2 font-semibold text-gray-900">
                  Преимущества ПЭТ:
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Выявление опухолей от 2-3 {/* PLACEHOLDER */} мм</li>
                  <li>• Определение стадии заболевания</li>
                  <li>• Контроль эффективности лечения</li>
                  <li>• Раннее выявление метастазов</li>
                </ul>
              </div>

              <div className="flex items-center font-medium text-blue-600">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Высокоточная диагностика
              </div>
            </div>
          </div>
        </div>

        {/* Пошаговая инструкция */}
        <div className="mt-16 rounded-2xl bg-gray-50 p-8">
          <h3 className="mb-8 text-center text-2xl font-bold text-gray-900">
            Как получить помощь: пошаговая инструкция
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                1
              </div>
              <h4 className="mb-2 font-semibold text-gray-900">
                Запишитесь к терапевту
              </h4>
              <p className="text-sm text-gray-600">
                В поликлинике по месту жительства
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-2xl font-bold text-white">
                2
              </div>
              <h4 className="mb-2 font-semibold text-gray-900">
                Получите направление
              </h4>
              <p className="text-sm text-gray-600">
                К врачу-онкологу при необходимости
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-2xl font-bold text-white">
                3
              </div>
              <h4 className="mb-2 font-semibold text-gray-900">
                Пройдите обследование
              </h4>
              <p className="text-sm text-gray-600">
                В онкологическом диспансере или ЦАОП
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-2xl font-bold text-white">
                4
              </div>
              <h4 className="mb-2 font-semibold text-gray-900">
                Получите лечение
              </h4>
              <p className="text-sm text-gray-600">По индивидуальному плану</p>
            </div>
          </div>
        </div>

        {/* Контактная информация */}
        <div className="mt-12 text-center">
          <div className="rounded-2xl bg-blue-50 p-8">
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              Нужна помощь? Обращайтесь!
            </h3>
            <p className="mb-6 text-gray-700">
              Горячая линия по вопросам онкологической помощи в Пермском крае
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:+73422393333"
                className="inline-flex items-center rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                8 (342) 239-33-33
              </a>
              <Link
                href="/clinics"
                className="inline-flex items-center rounded-lg border-2 border-red-600 bg-white px-6 py-3 font-semibold text-red-600 transition-colors hover:bg-red-50"
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Найти ближайшую клинику
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
