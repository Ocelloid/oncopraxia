export default function ChartsAnalyticsSection() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Аналитика и статистика
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Детальный анализ заболеваемости и эффективности диагностики в
            Пермском крае
          </p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Диаграмма по городам */}
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">
              Заболеваемость по городам и районам
            </h3>

            <div className="mb-6">
              {/* Простая горизонтальная диаграмма */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">г. Пермь</span>
                  <div className="flex w-48 items-center">
                    <div className="mr-2 h-4 w-32 rounded-full bg-red-200">
                      <div className="h-4 w-24 rounded-full bg-red-500"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      1,250 {/* PLACEHOLDER */}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Березники</span>
                  <div className="flex w-48 items-center">
                    <div className="mr-2 h-4 w-32 rounded-full bg-blue-200">
                      <div className="h-4 w-16 rounded-full bg-blue-500"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      320 {/* PLACEHOLDER */}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Соликамск</span>
                  <div className="flex w-48 items-center">
                    <div className="mr-2 h-4 w-32 rounded-full bg-green-200">
                      <div className="h-4 w-12 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      180 {/* PLACEHOLDER */}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Чайковский</span>
                  <div className="flex w-48 items-center">
                    <div className="mr-2 h-4 w-32 rounded-full bg-yellow-200">
                      <div className="h-4 w-10 rounded-full bg-yellow-500"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      145 {/* PLACEHOLDER */}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Кунгур</span>
                  <div className="flex w-48 items-center">
                    <div className="mr-2 h-4 w-32 rounded-full bg-purple-200">
                      <div className="h-4 w-8 rounded-full bg-purple-500"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      98 {/* PLACEHOLDER */}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Сельские районы</span>
                  <div className="flex w-48 items-center">
                    <div className="mr-2 h-4 w-32 rounded-full bg-orange-200">
                      <div className="h-4 w-20 rounded-full bg-orange-500"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      450 {/* PLACEHOLDER */}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-600">
                <strong>Всего выявлено:</strong> 2,443 {/* PLACEHOLDER */}{" "}
                случая в 2024 {/* PLACEHOLDER */} году
              </p>
            </div>
          </div>

          {/* Диаграмма по видам рака */}
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">
              Структура заболеваемости по видам рака
            </h3>

            <div className="mb-6">
              {/* Круговая диаграмма в виде прогресс-баров */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 h-4 w-4 rounded-full bg-red-500"></div>
                    <span className="text-gray-700">Рак легких</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    22.5% {/* PLACEHOLDER */}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 h-4 w-4 rounded-full bg-blue-500"></div>
                    <span className="text-gray-700">Рак молочной железы</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    18.3% {/* PLACEHOLDER */}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 h-4 w-4 rounded-full bg-green-500"></div>
                    <span className="text-gray-700">Колоректальный рак</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    15.7% {/* PLACEHOLDER */}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 h-4 w-4 rounded-full bg-yellow-500"></div>
                    <span className="text-gray-700">
                      Рак предстательной железы
                    </span>
                  </div>
                  <span className="font-medium text-gray-900">
                    12.1% {/* PLACEHOLDER */}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 h-4 w-4 rounded-full bg-purple-500"></div>
                    <span className="text-gray-700">Рак желудка</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    9.8% {/* PLACEHOLDER */}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 h-4 w-4 rounded-full bg-orange-500"></div>
                    <span className="text-gray-700">Другие виды</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    21.6% {/* PLACEHOLDER */}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-600">
                Данные основаны на статистике за 2024 {/* PLACEHOLDER */} год
              </p>
            </div>
          </div>

          {/* Диаграмма по полу */}
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">
              Заболеваемость по полу и возрастным группам
            </h3>

            <div className="mb-6 space-y-6">
              {/* Мужчины */}
              <div>
                <h4 className="mb-4 text-lg font-semibold text-blue-600">
                  Мужчины - 52.3% {/* PLACEHOLDER */}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">20-39 лет</span>
                    <div className="flex w-32 items-center">
                      <div className="mr-2 h-3 w-24 rounded-full bg-blue-200">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-sm">3.2% {/* PLACEHOLDER */}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">40-59 лет</span>
                    <div className="flex w-32 items-center">
                      <div className="mr-2 h-3 w-24 rounded-full bg-blue-200">
                        <div className="h-3 w-12 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-sm">28.5% {/* PLACEHOLDER */}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">60+ лет</span>
                    <div className="flex w-32 items-center">
                      <div className="mr-2 h-3 w-24 rounded-full bg-blue-200">
                        <div className="h-3 w-20 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-sm">68.3% {/* PLACEHOLDER */}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Женщины */}
              <div>
                <h4 className="mb-4 text-lg font-semibold text-pink-600">
                  Женщины - 47.7% {/* PLACEHOLDER */}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">20-39 лет</span>
                    <div className="flex w-32 items-center">
                      <div className="mr-2 h-3 w-24 rounded-full bg-pink-200">
                        <div className="h-3 w-4 rounded-full bg-pink-500"></div>
                      </div>
                      <span className="text-sm">5.8% {/* PLACEHOLDER */}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">40-59 лет</span>
                    <div className="flex w-32 items-center">
                      <div className="mr-2 h-3 w-24 rounded-full bg-pink-200">
                        <div className="h-3 w-16 rounded-full bg-pink-500"></div>
                      </div>
                      <span className="text-sm">35.2% {/* PLACEHOLDER */}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">60+ лет</span>
                    <div className="flex w-32 items-center">
                      <div className="mr-2 h-3 w-24 rounded-full bg-pink-200">
                        <div className="h-3 w-18 rounded-full bg-pink-500"></div>
                      </div>
                      <span className="text-sm">59.0% {/* PLACEHOLDER */}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* График динамики */}
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">
              Динамика заболеваемости за 5 лет
            </h3>

            <div className="mb-6">
              {/* Простой линейный график */}
              <div className="relative h-64 rounded-lg bg-gray-50 p-4">
                <div className="flex h-full items-end justify-between">
                  <div className="flex flex-col items-center">
                    <div className="mb-2 h-20 w-8 rounded-t bg-blue-400"></div>
                    <span className="text-xs text-gray-600">
                      2020 {/* PLACEHOLDER */}
                    </span>
                    <span className="text-xs font-medium">
                      2,180 {/* PLACEHOLDER */}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="mb-2 h-24 w-8 rounded-t bg-blue-500"></div>
                    <span className="text-xs text-gray-600">
                      2021 {/* PLACEHOLDER */}
                    </span>
                    <span className="text-xs font-medium">
                      2,290 {/* PLACEHOLDER */}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="mb-2 h-28 w-8 rounded-t bg-blue-600"></div>
                    <span className="text-xs text-gray-600">
                      2022 {/* PLACEHOLDER */}
                    </span>
                    <span className="text-xs font-medium">
                      2,385 {/* PLACEHOLDER */}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="mb-2 h-32 w-8 rounded-t bg-blue-700"></div>
                    <span className="text-xs text-gray-600">
                      2023 {/* PLACEHOLDER */}
                    </span>
                    <span className="text-xs font-medium">
                      2,401 {/* PLACEHOLDER */}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="mb-2 h-36 w-8 rounded-t bg-blue-800"></div>
                    <span className="text-xs text-gray-600">
                      2024 {/* PLACEHOLDER */}
                    </span>
                    <span className="text-xs font-medium">
                      2,443 {/* PLACEHOLDER */}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-green-50 p-4">
                <div className="text-2xl font-bold text-green-600">
                  +12% {/* PLACEHOLDER */}
                </div>
                <div className="text-sm text-gray-600">
                  Рост выявляемости за 5 лет
                </div>
              </div>
              <div className="rounded-lg bg-blue-50 p-4">
                <div className="text-2xl font-bold text-blue-600">
                  78% {/* PLACEHOLDER */}
                </div>
                <div className="text-sm text-gray-600">
                  Выявлено на ранних стадиях
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-white">
          <div className="text-center">
            <h3 className="mb-4 text-2xl font-bold">Ключевые выводы анализа</h3>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <div className="mb-2 text-3xl font-bold">↗️</div>
                <div className="text-lg font-semibold">Рост выявляемости</div>
                <div className="text-sm opacity-90">
                  Улучшение системы скрининга привело к росту ранней диагностики
                </div>
              </div>
              <div>
                <div className="mb-2 text-3xl font-bold">🏥</div>
                <div className="text-lg font-semibold">Доступность помощи</div>
                <div className="text-sm opacity-90">
                  Расширение сети медицинских учреждений по всему краю
                </div>
              </div>
              <div>
                <div className="mb-2 text-3xl font-bold">📊</div>
                <div className="text-lg font-semibold">Эффективность</div>
                <div className="text-sm opacity-90">
                  Повышение качества диагностики и лечения онкозаболеваний
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
