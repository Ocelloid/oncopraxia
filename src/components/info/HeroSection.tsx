import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-gradient-to-r from-gray-100 via-transparent to-gray-100"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          {/* Главный заголовок */}
          <h1 className="leading-tight font-bold text-gray-900 md:text-7xl">
            Ранняя диагностика
          </h1>
          <span className="mb-6 text-5xl font-bold text-red-600 md:text-7xl">
            спасает жизни
          </span>

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
              <strong className="text-red-600">
                90% {/* PLACEHOLDER */} случаев
              </strong>
              . Современные методы диагностики позволяют обнаружить заболевание
              до появления симптомов.
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
              <div className="mb-2 text-3xl font-bold text-red-600">
                44 {/* PLACEHOLDER */}
              </div>
              <div className="text-gray-700">
                первичных онкологических кабинета
              </div>
            </div>

            <div className="rounded-xl bg-white/60 p-6 shadow-md backdrop-blur-sm">
              <div className="mb-2 text-3xl font-bold text-red-600">
                232 {/* PLACEHOLDER */}
              </div>
              <div className="text-gray-700">кабинета раннего выявления</div>
            </div>

            <div className="rounded-xl bg-white/60 p-6 shadow-md backdrop-blur-sm">
              <div className="mb-2 text-3xl font-bold text-red-600">
                8 {/* PLACEHOLDER */}
              </div>
              <div className="text-gray-700">центров амбулаторной помощи</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
