import { relations, sql } from "drizzle-orm";
import {
  pgTableCreator,
  serial,
  text,
  integer,
  decimal,
  timestamp,
  boolean,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `oncopraxia_${name}`);

// Основная статистика региона
export const regionalStatistics = createTable("regional_statistics", {
  id: serial("id").primaryKey(),
  year: integer("year").notNull(),

  // Инфраструктура
  primaryOncologyCabinets: integer("primary_oncology_cabinets").notNull(),
  earlyDetectionCabinets: integer("early_detection_cabinets").notNull(),
  ambulatoryCenters: integer("ambulatory_centers").notNull(),

  // Посещения и осмотры
  oncologyVisits: integer("oncology_visits").notNull(),
  examinations: integer("examinations").notNull(),
  pretumorDiseases: integer("pretumor_diseases").notNull(),
  caopVisits: integer("caop_visits").notNull(),
  caopGrowthPercent: decimal("caop_growth_percent", { precision: 5, scale: 2 }),

  // Лечение
  chemotherapyPatients: integer("chemotherapy_patients").notNull(),
  therapyCourses: integer("therapy_courses").notNull(),
  therapyGrowthPercent: decimal("therapy_growth_percent", {
    precision: 5,
    scale: 2,
  }),

  // Телемедицина
  telemedicineConsultations: integer("telemedicine_consultations").notNull(),
  nmicConsultations: integer("nmic_consultations").notNull(),
  partnerCentersCount: integer("partner_centers_count").notNull(),

  // Эффективность
  earlyStageDetectionPercent: decimal("early_stage_detection_percent", {
    precision: 5,
    scale: 2,
  }),
  fiveYearSurvivalRate: decimal("five_year_survival_rate", {
    precision: 5,
    scale: 2,
  }),
  mortalityReductionPercent: decimal("mortality_reduction_percent", {
    precision: 5,
    scale: 2,
  }),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Статистика заболеваемости по городам и районам
export const cityStatistics = createTable("city_statistics", {
  id: serial("id").primaryKey(),
  statisticsId: integer("statistics_id")
    .references(() => regionalStatistics.id)
    .notNull(),
  cityName: varchar("city_name", { length: 100 }).notNull(),
  casesCount: integer("cases_count").notNull(),
  population: integer("population"),
  incidenceRate: decimal("incidence_rate", { precision: 8, scale: 2 }), // на 100 тыс. населения

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Статистика по видам онкологических заболеваний
export const cancerTypeStatistics = createTable("cancer_type_statistics", {
  id: serial("id").primaryKey(),
  statisticsId: integer("statistics_id")
    .references(() => regionalStatistics.id)
    .notNull(),
  cancerType: varchar("cancer_type", { length: 100 }).notNull(),
  casesCount: integer("cases_count").notNull(),
  percentage: decimal("percentage", { precision: 5, scale: 2 }).notNull(),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Демографическая статистика (пол и возраст)
export const demographicStatistics = createTable("demographic_statistics", {
  id: serial("id").primaryKey(),
  statisticsId: integer("statistics_id")
    .references(() => regionalStatistics.id)
    .notNull(),
  gender: varchar("gender", { length: 10 }).notNull(), // 'male', 'female'
  ageGroup: varchar("age_group", { length: 20 }).notNull(), // '20-39', '40-59', '60+'
  casesCount: integer("cases_count").notNull(),
  percentage: decimal("percentage", { precision: 5, scale: 2 }).notNull(),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Достижения и награды
export const achievements = createTable("achievements", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  year: integer("year"),
  achievementType: varchar("achievement_type", { length: 50 }).notNull(), // 'award', 'ranking', 'infrastructure', 'quality'
  value: varchar("value", { length: 100 }), // значение достижения (например, "TOP-5", "98%")
  isActive: boolean("is_active").default(true).notNull(),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Медицинские учреждения
export const medicalFacilities = createTable("medical_facilities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  facilityType: varchar("facility_type", { length: 50 }).notNull(), // 'primary_oncology', 'early_detection', 'caop', 'main_dispensary'
  address: text("address"),
  phone: varchar("phone", { length: 20 }),
  city: varchar("city", { length: 100 }),
  isActive: boolean("is_active").default(true).notNull(),

  // Статистика учреждения
  annualVisits: integer("annual_visits"),
  staffCount: integer("staff_count"),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Региональные проекты и программы
export const regionalProjects = createTable("regional_projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  projectType: varchar("project_type", { length: 50 }).notNull(), // 'screening', 'infrastructure', 'education'
  startYear: integer("start_year"),
  endYear: integer("end_year"),
  website: varchar("website", { length: 500 }),
  isActive: boolean("is_active").default(true).notNull(),

  // Результаты проекта
  participantsCount: integer("participants_count"),
  detectedCases: integer("detected_cases"),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Контактная информация и инструкции
export const contactInfo = createTable("contact_info", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  contactType: varchar("contact_type", { length: 50 }).notNull(), // 'hotline', 'emergency', 'general'
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 100 }),
  website: varchar("website", { length: 500 }),
  workingHours: varchar("working_hours", { length: 100 }),
  isActive: boolean("is_active").default(true).notNull(),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Пошаговые инструкции для пациентов
export const patientInstructions = createTable("patient_instructions", {
  id: serial("id").primaryKey(),
  stepNumber: integer("step_number").notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  instructionType: varchar("instruction_type", { length: 50 }).notNull(), // 'diagnosis', 'treatment', 'screening'
  isActive: boolean("is_active").default(true).notNull(),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Relations
export const regionalStatisticsRelations = relations(
  regionalStatistics,
  ({ many }) => ({
    cities: many(cityStatistics),
    cancerTypes: many(cancerTypeStatistics),
    demographics: many(demographicStatistics),
  }),
);

export const cityStatisticsRelations = relations(cityStatistics, ({ one }) => ({
  statistics: one(regionalStatistics, {
    fields: [cityStatistics.statisticsId],
    references: [regionalStatistics.id],
  }),
}));

export const cancerTypeStatisticsRelations = relations(
  cancerTypeStatistics,
  ({ one }) => ({
    statistics: one(regionalStatistics, {
      fields: [cancerTypeStatistics.statisticsId],
      references: [regionalStatistics.id],
    }),
  }),
);

export const demographicStatisticsRelations = relations(
  demographicStatistics,
  ({ one }) => ({
    statistics: one(regionalStatistics, {
      fields: [demographicStatistics.statisticsId],
      references: [regionalStatistics.id],
    }),
  }),
);
