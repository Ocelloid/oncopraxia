import {
  MapPin,
  Phone,
  Globe,
  CreditCard,
  Stethoscope,
  Building2,
  Zap,
} from "lucide-react";

export default async function Clinics() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Заголовок страницы */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Онкологические клиники
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Информация о ведущих онкологических центрах Пермского края и
            возможностях получения медицинской помощи
          </p>
        </div>

        {/* Основной онкологический диспансер */}
        <section className="mb-16">
          <div className="mb-8 rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center">
              <Building2 className="mr-4 h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                Пермский краевой онкологический диспансер
              </h2>
            </div>

            <div className="mb-6 flex items-center text-gray-600">
              <MapPin className="mr-2 h-5 w-5" />
              <span>г. Пермь, ул. Баумана, 15</span>
            </div>

            {/* Способы записи */}
            <div className="grid gap-8 md:grid-cols-2">
              {/* Запись по ОМС */}
              <div className="rounded-xl bg-green-50 p-6">
                <div className="mb-4 flex items-center">
                  <Stethoscope className="mr-3 h-6 w-6 text-green-600" />
                  <h3 className="text-xl font-semibold text-green-800">
                    Запись на прием по ОМС
                  </h3>
                </div>
                <p className="mb-4 text-green-700">
                  Прием проводится по направлению врача-онколога или лечащего
                  врача поликлиники после проведенного обследования, если
                  заподозрено или выявлено злокачественное новообразование.
                </p>
                <a
                  href="https://www.permcancer.ru/Pacijentam/Poleznaja-informacija/Pravila-zapisi-na-pervichnyj-prijem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-600 hover:text-green-800"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Правила записи на первичный прием
                </a>
              </div>

              {/* Платные услуги */}
              <div className="rounded-xl bg-blue-50 p-6">
                <div className="mb-4 flex items-center">
                  <CreditCard className="mr-3 h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-blue-800">
                    Платные медицинские услуги
                  </h3>
                </div>
                <div className="mb-4 space-y-2 text-blue-700">
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    <span>(342) 263-11-36 или 8-800-3000-300</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    <span>www.k-vrachu.ru</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    <span>www.gosuslugi.ru</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <a
                    href="https://www.permcancer.ru/Pacijentam/Platnyje-uslugi/Prejskurant/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:text-blue-800"
                  >
                    📋 Прейскурант цен
                  </a>
                  <a
                    href="https://www.permcancer.ru/Pacijentam/Platnyje-uslugi/Tehnicheskoje-zadanije-k-dogovoru-na-okazanije-platnyh-(vozmezdnyh)-medicinskih-uslug/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:text-blue-800"
                  >
                    📅 График оказания услуг
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Центры амбулаторной онкологической помощи */}
        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Центры амбулаторной онкологической помощи (ЦАОП)
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600">
              Главная задача ЦАОП — сделать онкологическую помощь доступной для
              населения, а также проведение первичной диагностики
              злокачественных новообразований
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Березники */}
            <div className="rounded-xl bg-white p-6 shadow-lg transition-transform hover:scale-105">
              <div className="mb-4 flex items-center">
                <MapPin className="mr-3 h-6 w-6 text-purple-600" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Березники
                </h3>
              </div>
              <p className="mb-2 text-gray-600">
                Краевая больница им. Вагнера Е.А
              </p>
              <p className="mb-4 text-sm text-gray-500">
                ул. Ломоносова, 102, корпус 8
              </p>
              <p className="mb-4 text-sm text-gray-600">
                Обслуживает жителей Березниковского городского округа и
                Александровского муниципального округа
              </p>
              <a
                href="https://kbvagnera.ru/otdelenija/poliklinika-g-berezniki/centr-ambulatornoj-onkologicheskoj-pomoschi-151"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-purple-600 hover:text-purple-800"
              >
                <Globe className="mr-2 h-4 w-4" />
                Подробнее
              </a>
            </div>

            {/* Краснокамск */}
            <div className="rounded-xl bg-white p-6 shadow-lg transition-transform hover:scale-105">
              <div className="mb-4 flex items-center">
                <MapPin className="mr-3 h-6 w-6 text-purple-600" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Краснокамск
                </h3>
              </div>
              <p className="mb-2 text-gray-600">
                Краснокамская городская больница
              </p>
              <p className="mb-4 text-sm text-gray-500">ул. Шоссейная, 1</p>
              <a
                href="https://kcrp.ru/medicinskije-rabotniki/poliklinika-2/centr-ambulatornoj-onkologicheskoj-pomoshhi/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-purple-600 hover:text-purple-800"
              >
                <Globe className="mr-2 h-4 w-4" />
                Подробнее
              </a>
            </div>

            {/* Другие города */}
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center">
                <MapPin className="mr-3 h-6 w-6 text-purple-600" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Другие города
                </h3>
              </div>
              <div className="space-y-2 text-gray-600">
                <p>• Кунгур</p>
                <p>• Чайковский</p>
                <p>• Чусовой</p>
                <p>• Кудымкар</p>
                <p>• Соликамск</p>
                <p>• ГКБ № 4 города Перми</p>
              </div>
            </div>
          </div>
        </section>

        {/* Новый онкологический диспансер */}
        <section className="mb-16">
          <div className="rounded-2xl bg-gradient-to-r from-green-500 to-blue-600 p-8 text-white">
            <div className="mb-6 flex items-center">
              <Zap className="mr-4 h-8 w-8" />
              <h2 className="text-3xl font-bold">Новый онкологический центр</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="mb-4 text-lg">
                  На данный момент идет активная фаза строительства нового
                  онкоцентра регионального значения для диагностики и лечения
                  пациентов в рамках программы государственных гарантий.
                </p>
                <p className="text-green-100">
                  Центр сможет принимать порядка 1 000 пациентов в сутки
                </p>
              </div>
              <div className="rounded-xl bg-white/10 p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  Современное оборудование:
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• 6 линейных ускорителей</li>
                  <li>• Позитронно-эмиссионная КТ</li>
                  <li>• Однофотонная эмиссионная КТ</li>
                  <li>• Система брахитерапии</li>
                  <li>• 3 КТ, 2 МРТ, маммограф</li>
                  <li>• 14 операционных</li>
                  <li>• 32 койки реанимации</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ПЭТ Технолоджи */}
        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              ПЭТ Технологии
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600">
              Центры лучевой терапии с современными диагностическими
              возможностями
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Центры */}
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Центры ПЭТ
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="mt-1 mr-3 h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium">Центр на Баумана</p>
                    <p className="text-sm text-gray-600">
                      г. Пермь, ул. Баумана, д. 15
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="mt-1 mr-3 h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium">Центр на Братьев Игнатовых</p>
                    <p className="text-sm text-gray-600">
                      г. Пермь, ул. Братьев Игнатовых, д. 2
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Услуги */}
            <div className="space-y-6">
              <div className="rounded-xl bg-orange-50 p-6">
                <div className="mb-3 flex items-center">
                  <Globe className="mr-3 h-6 w-6 text-orange-600" />
                  <h3 className="text-lg font-semibold text-orange-800">
                    Телемедицина
                  </h3>
                </div>
                <p className="mb-3 text-orange-700">
                  Дистанционные консультации по видеосвязи. Помощь можно
                  получить из дома.
                </p>
                <a
                  href="https://www.pet-net.ru/online-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:text-orange-800"
                >
                  Онлайн консультация →
                </a>
              </div>

              <div className="rounded-xl bg-indigo-50 p-6">
                <div className="mb-3 flex items-center">
                  <Stethoscope className="mr-3 h-6 w-6 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-indigo-800">
                    Диагностика
                  </h3>
                </div>
                <p className="mb-3 text-indigo-700">
                  ПЭТ, КТ, МРТ и другие неинвазивные исследования. ПЭТ — мощный
                  диагностический инструмент с непревзойденной
                  чувствительностью.
                </p>
                <a
                  href="https://www.pet-net.ru/category/petkt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Подробнее о ПЭТ/КТ →
                </a>
              </div>
            </div>
          </div>

          {/* ОМС */}
          <div className="mt-8 rounded-xl bg-green-100 p-6 text-center">
            <div className="mb-2 flex items-center justify-center">
              <CreditCard className="mr-3 h-6 w-6 text-green-600" />
              <h3 className="text-xl font-semibold text-green-800">
                Возможность оплаты по ОМС
              </h3>
            </div>
            <p className="text-green-700">
              Многие услуги доступны в рамках обязательного медицинского
              страхования
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
