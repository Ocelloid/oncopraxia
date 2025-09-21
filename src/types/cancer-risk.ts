export interface CancerType {
  id: number;
  name: string;
  bodyZone: string;
  baseRisk: {
    male: AgeRiskGroup;
    female: AgeRiskGroup;
  };
  riskFactors: RiskFactors;
}

export interface AgeRiskGroup {
  young: number;
  middle: number;
  elderly: number;
}

export interface RiskFactors {
  smoking: { yes: number; former: number; no: number };
  alcohol: {
    never: number;
    rarely: number;
    moderate: number;
    frequent: number;
  };
  physicalActivity: { low: number; medium: number; high: number };
  diet: { balanced: number; unbalanced: number };
  familyHistory: { yes: number; no: number };
  chemicals: { yes: number; no: number };
  radiation: { yes: number; no: number };
  diabetes?: { yes: number; no: number };
  hypertension?: { yes: number; no: number };
}

export interface BodyZone {
  x: number;
  y: number;
  color: string;
}

export interface AgeGroup {
  min: number;
  max: number;
}

export interface RiskLevel {
  threshold: number;
  color: string;
  label: string;
}

export interface CancerRiskData {
  cancerTypes: CancerType[];
  bodyZones: Record<string, BodyZone>;
  ageGroups: Record<string, AgeGroup>;
  riskLevels: Record<string, RiskLevel>;
  cities: string[];
  professions: string[];
  maritalStatus: string[];
  disclaimer: string;
}

export interface UserFormData {
  // Демографические данные
  age: number;
  gender: "male" | "female";
  city: string;
  profession: string;
  maritalStatus: string;

  // Факторы риска
  smoking: "yes" | "former" | "no";
  smokingYears?: number;
  alcohol: "never" | "rarely" | "moderate" | "frequent";
  physicalActivity: "low" | "medium" | "high";
  diet: "balanced" | "unbalanced";
  familyHistory: "yes" | "no";
  familyRelation?: string;
  chemicals: "yes" | "no";
  radiation: "yes" | "no";
  diabetes: "yes" | "no";
  hypertension: "yes" | "no";
  otherDiseases?: string;
}

export interface CancerRiskResult {
  cancerType: CancerType;
  riskScore: number;
  riskLevel: "low" | "medium" | "high";
  riskColor: string;
  riskLabel: string;
}

export interface RiskAssessmentResult {
  results: CancerRiskResult[];
  overallRisk: {
    low: number;
    medium: number;
    high: number;
  };
}
