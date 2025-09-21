import { HydrateClient } from "~/trpc/server";
import Link from "next/link";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-red-50">
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-gradient-to-r from-gray-100 via-transparent to-gray-100"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 py-16 text-center">
            <div className="mx-auto max-w-4xl">
              {/* Главный заголовок */}
              <h1 className="mb-6 text-5xl leading-tight font-bold text-gray-900 md:text-7xl">
                Ранняя диагностика —{" "}
                <span className="text-red-600">спасает жизни</span>
              </h1>

              {/* Подзаголовок */}
              <p className="mb-8 text-xl leading-relaxed text-gray-700 md:text-2xl">
                Информационный портал о возможностях ранней диагностики
                онкологических заболеваний в Пермском крае
              </p>

              {/* Ключевое сообщение */}
              <div className="mb-8 rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
                <h2 className="mb-4 text-2xl font-semibold text-gray-900 md:text-3xl">
                  Почему это важно?
                </h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  Онкологические заболевания, выявленные на ранних стадиях,
                  поддаются успешному лечению в{" "}
                  <strong className="text-red-600">90% случаев</strong>.
                  Современные методы диагностики позволяют обнаружить
                  заболевание до появления симптомов.
                </p>
              </div>

              {/* Call-to-Action кнопки */}
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/opportunities"
                  className="transform rounded-full bg-red-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-700"
                >
                  Узнать о возможностях диагностики
                </Link>

                <Link
                  href="/clinics"
                  className="transform rounded-full border-2 border-red-600 bg-white px-8 py-4 text-lg font-semibold text-red-600 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-50"
                >
                  Найти ближайшую клинику
                </Link>
              </div>

              {/* Статистика */}
              <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="rounded-xl bg-white/60 p-6 shadow-md backdrop-blur-sm">
                  <div className="mb-2 text-3xl font-bold text-red-600">44</div>
                  <div className="text-gray-700">
                    первичных онкологических кабинета
                  </div>
                </div>

                <div className="rounded-xl bg-white/60 p-6 shadow-md backdrop-blur-sm">
                  <div className="mb-2 text-3xl font-bold text-red-600">
                    232
                  </div>
                  <div className="text-gray-700">
                    кабинета раннего выявления
                  </div>
                </div>

                <div className="rounded-xl bg-white/60 p-6 shadow-md backdrop-blur-sm">
                  <div className="mb-2 text-3xl font-bold text-red-600">8</div>
                  <div className="text-gray-700">
                    центров амбулаторной помощи
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                Статистика по Пермскому краю
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600">
                Актуальные данные о состоянии онкологической помощи в регионе за
                2024 год
              </p>
            </div>

            {/* Основная статистика */}
            <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border-l-4 border-red-500 bg-white p-8 text-center shadow-lg">
                <div className="mb-2 text-4xl font-bold text-red-600">
                  189,650
                </div>
                <div className="font-medium text-gray-700">
                  посещений онкологов
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  в первичных кабинетах
                </div>
              </div>

              <div className="rounded-2xl border-l-4 border-blue-500 bg-white p-8 text-center shadow-lg">
                <div className="mb-2 text-4xl font-bold text-blue-600">
                  516,009
                </div>
                <div className="font-medium text-gray-700">
                  осмотрено человек
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  в кабинетах раннего выявления
                </div>
              </div>

              <div className="rounded-2xl border-l-4 border-green-500 bg-white p-8 text-center shadow-lg">
                <div className="mb-2 text-4xl font-bold text-green-600">
                  18,699
                </div>
                <div className="font-medium text-gray-700">
                  предопухолевых заболеваний
                </div>
                <div className="mt-2 text-sm text-gray-500">выявлено</div>
              </div>

              <div className="rounded-2xl border-l-4 border-orange-500 bg-white p-8 text-center shadow-lg">
                <div className="mb-2 text-4xl font-bold text-orange-600">
                  67,454
                </div>
                <div className="font-medium text-gray-700">посещений ЦАОП</div>
                <div className="mt-2 text-sm text-gray-500">рост на 9,9%</div>
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
                    <span className="font-bold text-red-600">4,460</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">
                      Курсов лекарственной терапии:
                    </span>
                    <span className="font-bold text-red-600">14,028</span>
                  </div>
                  <div className="text-sm font-medium text-green-600">
                    ↗ Рост на 27,2% по сравнению с 2023 годом
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
                    <span className="font-bold text-blue-600">12,225</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">
                      Дистанционных консультаций с НМИЦ:
                    </span>
                    <span className="font-bold text-blue-600">680</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Консультации с 12 ведущими медицинскими центрами страны
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
                  Отчет 2024
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
                  Отчет 2023
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Where to Go Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                Куда обратиться для обследования?
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600">
                Пошаговая инструкция для получения онкологической помощи в
                Пермском крае
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
                    <strong>Первый шаг:</strong> Обратитесь к участковому
                    терапевту
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
                      8 центров амбулаторной онкологической помощи (ЦАОП)
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
                      <li>• Выявление опухолей от 2-3 мм</li>
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
                  <p className="text-sm text-gray-600">
                    По индивидуальному плану
                  </p>
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
                  Горячая линия по вопросам онкологической помощи в Пермском
                  крае
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

        {/* Diagnostic Opportunities Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                Возможности ранней диагностики
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600">
                В Пермском крае создана современная система раннего выявления
                онкологических заболеваний
              </p>
            </div>

            <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Первичные онкологические кабинеты */}
              <div className="rounded-2xl bg-white p-8 shadow-xl">
                <div className="mb-6 flex items-center">
                  <div className="mr-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-2xl font-bold text-white">
                    44
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Первичные онкологические кабинеты
                    </h3>
                    <p className="text-gray-600">
                      Специализированная первичная помощь
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg bg-red-50 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-semibold text-gray-900">
                        Посещений в 2024 году:
                      </span>
                      <span className="text-2xl font-bold text-red-600">
                        189,650
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Консультации врачей-онкологов в первичных кабинетах
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">
                      Что получают пациенты:
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Консультация врача-онколога</li>
                      <li>• Первичный осмотр и диагностика</li>
                      <li>• Направление на дополнительные обследования</li>
                      <li>• Разработка плана лечения</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Кабинеты раннего выявления */}
              <div className="rounded-2xl bg-white p-8 shadow-xl">
                <div className="mb-6 flex items-center">
                  <div className="mr-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                    232
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Кабинеты раннего выявления
                    </h3>
                    <p className="text-gray-600">Профилактические осмотры</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          516,009
                        </div>
                        <div className="text-sm text-gray-600">
                          осмотрено человек
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          18,699
                        </div>
                        <div className="text-sm text-gray-600">
                          выявлено заболеваний
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">
                      Где работают:
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• В поликлиниках</li>
                      <li>• В женских консультациях</li>
                      <li>• В сельских врачебных амбулаториях</li>
                      <li>• В участковых больницах</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* ЦАОП */}
              <div className="rounded-2xl bg-white p-8 shadow-xl">
                <div className="mb-6 flex items-center">
                  <div className="mr-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-2xl font-bold text-white">
                    8
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Центры амбулаторной онкологической помощи
                    </h3>
                    <p className="text-gray-600">ЦАОП - современное лечение</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg bg-green-50 p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-700">
                          Посещений в 2024 г.:
                        </span>
                        <span className="font-bold text-green-600">67,454</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">
                          Получили химиотерапию:
                        </span>
                        <span className="font-bold text-green-600">4,460</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Курсов терапии:</span>
                        <span className="font-bold text-green-600">14,028</span>
                      </div>
                    </div>
                    <div className="mt-3 text-sm font-medium text-green-700">
                      ↗ Рост посещений на 9,9%, курсов терапии на 27,2%
                    </div>
                  </div>
                </div>
              </div>

              {/* Телемедицина */}
              <div className="rounded-2xl bg-white p-8 shadow-xl">
                <div className="mb-6 flex items-center">
                  <div className="mr-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-xl font-bold text-white">
                    📱
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Телемедицинские консультации
                    </h3>
                    <p className="text-gray-600">Дистанционная поддержка</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg bg-purple-50 p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-700">
                          Консультаций в 2024 г.:
                        </span>
                        <span className="font-bold text-purple-600">
                          12,225
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">С НМИЦ:</span>
                        <span className="font-bold text-purple-600">680</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">
                      Возможности:
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Консультации с ведущими специалистами</li>
                      <li>• Определение тактики лечения</li>
                      <li>• Второе мнение экспертов</li>
                      <li>• Доступ к федеральным центрам</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Региональные проекты */}
            <div className="rounded-2xl bg-white p-8 shadow-xl">
              <h3 className="mb-8 text-center text-3xl font-bold text-gray-900">
                Региональные проекты
              </h3>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Онкопатруль */}
                <div className="rounded-xl bg-gradient-to-r from-red-50 to-orange-50 p-6">
                  <div className="mb-4 flex items-center">
                    <div className="mr-4 rounded-lg bg-red-600 p-3 text-white">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">
                      Онкопатруль
                    </h4>
                  </div>

                  <p className="mb-4 text-gray-700">
                    Онкоскрининг на предприятиях - выездные обследования
                    сотрудников крупных предприятий региона для раннего
                    выявления онкологических заболеваний.
                  </p>

                  <a
                    href="https://new.nmicr.ru/pacientam/onkopatrul/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-medium text-red-600 hover:text-red-700"
                  >
                    Подробнее о проекте
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>

                {/* Борьба с онкозаболеваниями */}
                <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                  <div className="mb-4 flex items-center">
                    <div className="mr-4 rounded-lg bg-blue-600 p-3 text-white">
                      <svg
                        className="h-6 w-6"
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
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">
                      Борьба с онкологическими заболеваниями
                    </h4>
                  </div>

                  <p className="mb-4 text-gray-700">
                    Комплексная региональная программа, направленная на
                    совершенствование системы онкологической помощи в Пермском
                    крае.
                  </p>

                  <div className="font-medium text-blue-600">
                    Включает развитие диагностики, лечения и реабилитации
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <div className="rounded-2xl bg-gradient-to-r from-red-600 to-red-700 p-8 text-white">
                <h3 className="mb-4 text-2xl font-bold">
                  Не откладывайте заботу о своем здоровье!
                </h3>
                <p className="mb-6 text-xl opacity-90">
                  Ранняя диагностика - это ваш шанс на полное выздоровление
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    href="/opportunities"
                    className="rounded-lg bg-white px-8 py-3 font-semibold text-red-600 transition-colors hover:bg-gray-100"
                  >
                    Записаться на обследование
                  </Link>
                  <Link
                    href="/clinics"
                    className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-red-600"
                  >
                    Найти ближайшую клинику
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </HydrateClient>
  );
}
