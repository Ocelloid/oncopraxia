import { pgTableCreator } from "drizzle-orm/pg-core";
export const createTable = pgTableCreator((name) => `oncopraxia_${name}`);
export * from "./schema/users";
export * from "./schema/info";
