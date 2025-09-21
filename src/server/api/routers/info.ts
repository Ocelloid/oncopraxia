import { z } from "zod";
import { eq, desc, asc } from "drizzle-orm";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import {
  regionalStatistics,
  cityStatistics,
  cancerTypeStatistics,
  demographicStatistics,
  achievements,
  medicalFacilities,
  regionalProjects,
  contactInfo,
  patientInstructions,
} from "~/server/db/schema";

// Zod схемы для валидации входных данных
const createRegionalStatisticsSchema = z.object({
  year: z.number().min(2000).max(2100),
  primaryOncologyCabinets: z.number().min(0),
  earlyDetectionCabinets: z.number().min(0),
  ambulatoryCenters: z.number().min(0),
  oncologyVisits: z.number().min(0),
  examinations: z.number().min(0),
  pretumorDiseases: z.number().min(0),
  caopVisits: z.number().min(0),
  caopGrowthPercent: z.string().optional(),
  chemotherapyPatients: z.number().min(0),
  therapyCourses: z.number().min(0),
  therapyGrowthPercent: z.string().optional(),
  telemedicineConsultations: z.number().min(0),
  nmicConsultations: z.number().min(0),
  partnerCentersCount: z.number().min(0),
  earlyStageDetectionPercent: z.string().optional(),
  fiveYearSurvivalRate: z.string().optional(),
  mortalityReductionPercent: z.string().optional(),
});

const createAchievementSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  year: z.number().min(2000).max(2100).optional(),
  achievementType: z.enum(["award", "ranking", "infrastructure", "quality"]),
  value: z.string().max(100).optional(),
  isActive: z.boolean().default(true),
});

const createMedicalFacilitySchema = z.object({
  name: z.string().min(1).max(200),
  facilityType: z.enum([
    "primary_oncology",
    "early_detection",
    "caop",
    "main_dispensary",
  ]),
  address: z.string().optional(),
  phone: z.string().max(20).optional(),
  city: z.string().max(100).optional(),
  isActive: z.boolean().default(true),
  annualVisits: z.number().min(0).optional(),
  staffCount: z.number().min(0).optional(),
});

const createContactInfoSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  contactType: z.enum(["hotline", "emergency", "general"]),
  phone: z.string().max(20).optional(),
  email: z.string().email().max(100).optional(),
  website: z.string().max(500).optional(),
  workingHours: z.string().max(100).optional(),
  isActive: z.boolean().default(true),
});

const createRegionalProjectSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().optional(),
  projectType: z.enum(["screening", "infrastructure", "education"]),
  startYear: z.number().min(2000).max(2100).optional(),
  endYear: z.number().min(2000).max(2100).optional(),
  website: z.string().max(500).optional(),
  isActive: z.boolean().default(true),
  participantsCount: z.number().min(0).optional(),
  detectedCases: z.number().min(0).optional(),
});

const createCityStatisticsSchema = z.object({
  statisticsId: z.number(),
  cityName: z.string().min(1).max(100),
  casesCount: z.number().min(0),
  population: z.number().min(0).optional(),
  incidenceRate: z.string().optional(), // decimal как строка
});

const createCancerTypeStatisticsSchema = z.object({
  statisticsId: z.number(),
  cancerType: z.string().min(1).max(100),
  casesCount: z.number().min(0),
  percentage: z.string(), // decimal как строка, обязательное поле
});

const createDemographicStatisticsSchema = z.object({
  statisticsId: z.number(),
  gender: z.enum(["male", "female"]),
  ageGroup: z.string().min(1).max(20),
  casesCount: z.number().min(0),
  percentage: z.string(), // decimal как строка, обязательное поле
});

const createPatientInstructionSchema = z.object({
  stepNumber: z.number().min(1),
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  instructionType: z.enum(["diagnosis", "treatment", "screening"]),
  isActive: z.boolean().default(true),
});

export const infoRouter = createTRPCRouter({
  // РЕГИОНАЛЬНАЯ СТАТИСТИКА
  getRegionalStatistics: publicProcedure
    .input(z.object({ year: z.number().optional() }).optional())
    .query(async ({ ctx, input }) => {
      const query = ctx.db.select().from(regionalStatistics);

      if (input?.year) {
        return await query.where(eq(regionalStatistics.year, input.year));
      }

      return await query.orderBy(desc(regionalStatistics.year));
    }),

  createRegionalStatistics: protectedProcedure
    .input(createRegionalStatisticsSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(regionalStatistics).values(input).returning();
    }),

  updateRegionalStatistics: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: createRegionalStatisticsSchema.partial(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(regionalStatistics)
        .set({ ...input.data, updatedAt: new Date() })
        .where(eq(regionalStatistics.id, input.id))
        .returning();
    }),

  deleteRegionalStatistics: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(regionalStatistics)
        .where(eq(regionalStatistics.id, input.id))
        .returning();
    }),

  // ДОСТИЖЕНИЯ
  getAchievements: publicProcedure
    .input(
      z
        .object({
          isActive: z.boolean().optional(),
          achievementType: z
            .enum(["award", "ranking", "infrastructure", "quality"])
            .optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const query = ctx.db.select().from(achievements);

      const conditions = [];
      if (input?.isActive !== undefined) {
        conditions.push(eq(achievements.isActive, input.isActive));
      }
      if (input?.achievementType) {
        conditions.push(
          eq(achievements.achievementType, input.achievementType),
        );
      }

      if (conditions.length > 0) {
        return await query
          .where(conditions[0])
          .orderBy(desc(achievements.year), desc(achievements.createdAt));
      }

      return await query.orderBy(
        desc(achievements.year),
        desc(achievements.createdAt),
      );
    }),

  createAchievement: protectedProcedure
    .input(createAchievementSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(achievements).values(input).returning();
    }),

  updateAchievement: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: createAchievementSchema.partial(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(achievements)
        .set({ ...input.data, updatedAt: new Date() })
        .where(eq(achievements.id, input.id))
        .returning();
    }),

  deleteAchievement: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(achievements)
        .where(eq(achievements.id, input.id))
        .returning();
    }),

  // МЕДИЦИНСКИЕ УЧРЕЖДЕНИЯ
  getMedicalFacilities: publicProcedure
    .input(
      z
        .object({
          isActive: z.boolean().optional(),
          facilityType: z
            .enum([
              "primary_oncology",
              "early_detection",
              "caop",
              "main_dispensary",
            ])
            .optional(),
          city: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const query = ctx.db.select().from(medicalFacilities);

      const conditions = [];
      if (input?.isActive !== undefined) {
        conditions.push(eq(medicalFacilities.isActive, input.isActive));
      }
      if (input?.facilityType) {
        conditions.push(eq(medicalFacilities.facilityType, input.facilityType));
      }
      if (input?.city) {
        conditions.push(eq(medicalFacilities.city, input.city));
      }

      if (conditions.length > 0) {
        return await query
          .where(conditions[0])
          .orderBy(asc(medicalFacilities.city), asc(medicalFacilities.name));
      }

      return await query.orderBy(
        asc(medicalFacilities.city),
        asc(medicalFacilities.name),
      );
    }),

  createMedicalFacility: protectedProcedure
    .input(createMedicalFacilitySchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(medicalFacilities).values(input).returning();
    }),

  updateMedicalFacility: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: createMedicalFacilitySchema.partial(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(medicalFacilities)
        .set({ ...input.data, updatedAt: new Date() })
        .where(eq(medicalFacilities.id, input.id))
        .returning();
    }),

  deleteMedicalFacility: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(medicalFacilities)
        .where(eq(medicalFacilities.id, input.id))
        .returning();
    }),

  // КОНТАКТНАЯ ИНФОРМАЦИЯ
  getContactInfo: publicProcedure
    .input(
      z
        .object({
          isActive: z.boolean().optional(),
          contactType: z.enum(["hotline", "emergency", "general"]).optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const query = ctx.db.select().from(contactInfo);

      const conditions = [];
      if (input?.isActive !== undefined) {
        conditions.push(eq(contactInfo.isActive, input.isActive));
      }
      if (input?.contactType) {
        conditions.push(eq(contactInfo.contactType, input.contactType));
      }

      if (conditions.length > 0) {
        return await query
          .where(conditions[0])
          .orderBy(asc(contactInfo.contactType), asc(contactInfo.title));
      }

      return await query.orderBy(
        asc(contactInfo.contactType),
        asc(contactInfo.title),
      );
    }),

  createContactInfo: protectedProcedure
    .input(createContactInfoSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(contactInfo).values(input).returning();
    }),

  updateContactInfo: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: createContactInfoSchema.partial(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(contactInfo)
        .set({ ...input.data, updatedAt: new Date() })
        .where(eq(contactInfo.id, input.id))
        .returning();
    }),

  deleteContactInfo: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(contactInfo)
        .where(eq(contactInfo.id, input.id))
        .returning();
    }),

  // РЕГИОНАЛЬНЫЕ ПРОЕКТЫ
  getRegionalProjects: publicProcedure
    .input(
      z
        .object({
          isActive: z.boolean().optional(),
          projectType: z
            .enum(["screening", "infrastructure", "education"])
            .optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const query = ctx.db.select().from(regionalProjects);

      const conditions = [];
      if (input?.isActive !== undefined) {
        conditions.push(eq(regionalProjects.isActive, input.isActive));
      }
      if (input?.projectType) {
        conditions.push(eq(regionalProjects.projectType, input.projectType));
      }

      if (conditions.length > 0) {
        return await query
          .where(conditions[0])
          .orderBy(
            desc(regionalProjects.startYear),
            asc(regionalProjects.name),
          );
      }

      return await query.orderBy(
        desc(regionalProjects.startYear),
        asc(regionalProjects.name),
      );
    }),

  createRegionalProject: protectedProcedure
    .input(createRegionalProjectSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(regionalProjects).values(input).returning();
    }),

  updateRegionalProject: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: createRegionalProjectSchema.partial(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(regionalProjects)
        .set({ ...input.data, updatedAt: new Date() })
        .where(eq(regionalProjects.id, input.id))
        .returning();
    }),

  deleteRegionalProject: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(regionalProjects)
        .where(eq(regionalProjects.id, input.id))
        .returning();
    }),

  // СТАТИСТИКА ПО ГОРОДАМ
  getCityStatistics: publicProcedure
    .input(z.object({ statisticsId: z.number().optional() }).optional())
    .query(async ({ ctx, input }) => {
      const query = ctx.db.select().from(cityStatistics);

      if (input?.statisticsId) {
        return await query.where(
          eq(cityStatistics.statisticsId, input.statisticsId),
        );
      }

      return await query.orderBy(desc(cityStatistics.casesCount));
    }),

  createCityStatistics: protectedProcedure
    .input(createCityStatisticsSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(cityStatistics).values(input).returning();
    }),

  updateCityStatistics: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: createCityStatisticsSchema.partial(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(cityStatistics)
        .set(input.data)
        .where(eq(cityStatistics.id, input.id))
        .returning();
    }),

  deleteCityStatistics: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(cityStatistics)
        .where(eq(cityStatistics.id, input.id))
        .returning();
    }),

  // СТАТИСТИКА ПО ВИДАМ РАКА
  getCancerTypeStatistics: publicProcedure
    .input(z.object({ statisticsId: z.number().optional() }).optional())
    .query(async ({ ctx, input }) => {
      const query = ctx.db.select().from(cancerTypeStatistics);

      if (input?.statisticsId) {
        return await query.where(
          eq(cancerTypeStatistics.statisticsId, input.statisticsId),
        );
      }

      return await query.orderBy(desc(cancerTypeStatistics.percentage));
    }),

  createCancerTypeStatistics: protectedProcedure
    .input(createCancerTypeStatisticsSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(cancerTypeStatistics)
        .values(input)
        .returning();
    }),

  updateCancerTypeStatistics: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: createCancerTypeStatisticsSchema.partial(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(cancerTypeStatistics)
        .set(input.data)
        .where(eq(cancerTypeStatistics.id, input.id))
        .returning();
    }),

  deleteCancerTypeStatistics: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(cancerTypeStatistics)
        .where(eq(cancerTypeStatistics.id, input.id))
        .returning();
    }),

  // ДЕМОГРАФИЧЕСКАЯ СТАТИСТИКА
  getDemographicStatistics: publicProcedure
    .input(z.object({ statisticsId: z.number().optional() }).optional())
    .query(async ({ ctx, input }) => {
      const query = ctx.db.select().from(demographicStatistics);

      if (input?.statisticsId) {
        return await query.where(
          eq(demographicStatistics.statisticsId, input.statisticsId),
        );
      }

      return await query.orderBy(
        asc(demographicStatistics.gender),
        asc(demographicStatistics.ageGroup),
      );
    }),

  createDemographicStatistics: protectedProcedure
    .input(createDemographicStatisticsSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(demographicStatistics)
        .values(input)
        .returning();
    }),

  updateDemographicStatistics: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: createDemographicStatisticsSchema.partial(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(demographicStatistics)
        .set(input.data)
        .where(eq(demographicStatistics.id, input.id))
        .returning();
    }),

  deleteDemographicStatistics: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(demographicStatistics)
        .where(eq(demographicStatistics.id, input.id))
        .returning();
    }),

  // ИНСТРУКЦИИ ДЛЯ ПАЦИЕНТОВ
  getPatientInstructions: publicProcedure
    .input(
      z
        .object({
          isActive: z.boolean().optional(),
          instructionType: z
            .enum(["diagnosis", "treatment", "screening"])
            .optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const query = ctx.db.select().from(patientInstructions);

      const conditions = [];
      if (input?.isActive !== undefined) {
        conditions.push(eq(patientInstructions.isActive, input.isActive));
      }
      if (input?.instructionType) {
        conditions.push(
          eq(patientInstructions.instructionType, input.instructionType),
        );
      }

      if (conditions.length > 0) {
        return await query
          .where(conditions[0])
          .orderBy(asc(patientInstructions.stepNumber));
      }

      return await query.orderBy(asc(patientInstructions.stepNumber));
    }),

  createPatientInstruction: protectedProcedure
    .input(createPatientInstructionSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(patientInstructions).values(input).returning();
    }),

  updatePatientInstruction: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: createPatientInstructionSchema.partial(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(patientInstructions)
        .set({ ...input.data, updatedAt: new Date() })
        .where(eq(patientInstructions.id, input.id))
        .returning();
    }),

  deletePatientInstruction: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(patientInstructions)
        .where(eq(patientInstructions.id, input.id))
        .returning();
    }),

  // СВОДНЫЕ ЗАПРОСЫ ДЛЯ КОМПОНЕНТОВ
  getLatestStatistics: publicProcedure.query(async ({ ctx }) => {
    const [latestStats] = await ctx.db
      .select()
      .from(regionalStatistics)
      .orderBy(desc(regionalStatistics.year))
      .limit(1);

    return latestStats ?? null;
  }),

  getActiveContent: publicProcedure.query(async ({ ctx }) => {
    const [
      activeAchievements,
      activeFacilities,
      activeProjects,
      activeContacts,
    ] = await Promise.all([
      ctx.db
        .select()
        .from(achievements)
        .where(eq(achievements.isActive, true))
        .orderBy(desc(achievements.year)),
      ctx.db
        .select()
        .from(medicalFacilities)
        .where(eq(medicalFacilities.isActive, true))
        .orderBy(asc(medicalFacilities.city), asc(medicalFacilities.name)),
      ctx.db
        .select()
        .from(regionalProjects)
        .where(eq(regionalProjects.isActive, true))
        .orderBy(desc(regionalProjects.startYear)),
      ctx.db
        .select()
        .from(contactInfo)
        .where(eq(contactInfo.isActive, true))
        .orderBy(asc(contactInfo.contactType)),
    ]);

    return {
      achievements: activeAchievements,
      facilities: activeFacilities,
      projects: activeProjects,
      contacts: activeContacts,
    };
  }),

  // ПОЛНАЯ СТАТИСТИКА ДЛЯ АНАЛИТИЧЕСКИХ КОМПОНЕНТОВ
  getFullStatistics: publicProcedure
    .input(z.object({ year: z.number() }))
    .query(async ({ ctx, input }) => {
      const [stats] = await ctx.db
        .select()
        .from(regionalStatistics)
        .where(eq(regionalStatistics.year, input.year));

      if (!stats) {
        return null;
      }

      const [cities, cancerTypes, demographics] = await Promise.all([
        ctx.db
          .select()
          .from(cityStatistics)
          .where(eq(cityStatistics.statisticsId, stats.id))
          .orderBy(desc(cityStatistics.casesCount)),
        ctx.db
          .select()
          .from(cancerTypeStatistics)
          .where(eq(cancerTypeStatistics.statisticsId, stats.id))
          .orderBy(desc(cancerTypeStatistics.percentage)),
        ctx.db
          .select()
          .from(demographicStatistics)
          .where(eq(demographicStatistics.statisticsId, stats.id))
          .orderBy(
            asc(demographicStatistics.gender),
            asc(demographicStatistics.ageGroup),
          ),
      ]);

      return {
        statistics: stats,
        cities,
        cancerTypes,
        demographics,
      };
    }),
});
