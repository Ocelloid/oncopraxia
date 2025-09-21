import Link from "next/link";

export default function DiagnosticOpportunitiesSection() {
  return (
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
                44 {/* PLACEHOLDER */}
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
                    Посещений в 2024 {/* PLACEHOLDER */} году:
                  </span>
                  <span className="text-2xl font-bold text-red-600">
                    189,650 {/* PLACEHOLDER */}
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
                232 {/* PLACEHOLDER */}
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
                      516,009 {/* PLACEHOLDER */}
                    </div>
                    <div className="text-sm text-gray-600">
                      осмотрено человек
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      18,699 {/* PLACEHOLDER */}
                    </div>
                    <div className="text-sm text-gray-600">
                      выявлено заболеваний
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Где работают:</h4>
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
                8 {/* PLACEHOLDER */}
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
                      Посещений в 2024 {/* PLACEHOLDER */} г.:
                    </span>
                    <span className="font-bold text-green-600">
                      67,454 {/* PLACEHOLDER */}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">
                      Получили химиотерапию:
                    </span>
                    <span className="font-bold text-green-600">
                      4,460 {/* PLACEHOLDER */}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Курсов терапии:</span>
                    <span className="font-bold text-green-600">
                      14,028 {/* PLACEHOLDER */}
                    </span>
                  </div>
                </div>
                <div className="mt-3 text-sm font-medium text-green-700">
                  ↗ Рост посещений на 9,9% {/* PLACEHOLDER */}, курсов терапии
                  на 27,2% {/* PLACEHOLDER */}
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
                      Консультаций в 2024 {/* PLACEHOLDER */} г.:
                    </span>
                    <span className="font-bold text-purple-600">
                      12,225 {/* PLACEHOLDER */}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">С НМИЦ:</span>
                    <span className="font-bold text-purple-600">
                      680 {/* PLACEHOLDER */}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Возможности:</h4>
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
                <h4 className="text-xl font-bold text-gray-900">Онкопатруль</h4>
              </div>

              <p className="mb-4 text-gray-700">
                Онкоскрининг на предприятиях - выездные обследования сотрудников
                крупных предприятий региона для раннего выявления онкологических
                заболеваний.
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
                совершенствование системы онкологической помощи в Пермском крае.
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
  );
}
