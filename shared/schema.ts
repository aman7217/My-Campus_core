import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("student"), // "student", "admin", or "teacher"
});

export const students = pgTable("students", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  branch: text("branch").notNull(), // e.g., "Computer Engineering", "Electrical Engineering"
  semester: text("semester").notNull(), // e.g., "1st", "2nd", "3rd", "4th", "5th", "6th"
  status: text("status").notNull().default("Active"), // "Active", "Inactive"
});

export const reservations = pgTable("reservations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  resourceId: varchar("resource_id").notNull(),
  resourceName: text("resource_name").notNull(),
  date: text("date").notNull(),
  timeFrom: text("time_from").notNull(),
  timeTo: text("time_to").notNull(),
  status: text("status").notNull().default("pending"), // "pending", "approved", "declined"
  createdAt: timestamp("created_at").defaultNow(),
});

export const faculty = pgTable("faculty", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  branch: text("branch").notNull(), // e.g., "Computer Engineering", "Electrical Engineering"
  designation: text("designation").notNull(), // e.g., "Professor", "Lecturer", "HOD"
  status: text("status").notNull().default("Active"), // "Active", "Inactive"
});

export const announcements = pgTable("announcements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  date: text("date").notNull(),
  status: text("status").notNull().default("Published"), // "Published", "Draft"
  priority: text("priority").notNull().default("Medium"), // "High", "Medium", "Low"
  targetAudience: text("target_audience").notNull().default("all"), // "all", "students", "teachers"
  createdAt: timestamp("created_at").defaultNow(),
});

export const notes = pgTable("notes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  uploaderId: varchar("uploader_id").notNull(),
  uploaderName: text("uploader_name").notNull(),
  subject: text("subject").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  fileName: text("file_name").notNull(),
  filePath: text("file_path").notNull(),
  fileSize: text("file_size").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const samplePapers = pgTable("sample_papers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  uploaderId: varchar("uploader_id").notNull(),
  uploaderName: text("uploader_name").notNull(),
  subject: text("subject").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  fileName: text("file_name").notNull(),
  filePath: text("file_path").notNull(),
  fileSize: text("file_size").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const assignments = pgTable("assignments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  teacherId: varchar("teacher_id").notNull(),
  teacherName: text("teacher_name").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  subject: text("subject").notNull(),
  branch: text("branch").notNull(), // Target branch
  semester: text("semester").notNull(), // Target semester
  dueDate: text("due_date").notNull(),
  fileName: text("file_name"),
  filePath: text("file_path"),
  fileSize: text("file_size"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
});

export const insertReservationSchema = createInsertSchema(reservations).pick({
  userId: true,
  resourceId: true,
  resourceName: true,
  date: true,
  timeFrom: true,
  timeTo: true,
});

export const insertFacultySchema = createInsertSchema(faculty).omit({
  id: true,
});

export const insertAnnouncementSchema = createInsertSchema(announcements).omit({
  id: true,
  createdAt: true,
});

export const insertNoteSchema = createInsertSchema(notes).omit({
  id: true,
  uploadedAt: true,
});

export const insertSamplePaperSchema = createInsertSchema(samplePapers).omit({
  id: true,
  uploadedAt: true,
});

export const insertAssignmentSchema = createInsertSchema(assignments).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Reservation = typeof reservations.$inferSelect;
export type InsertReservation = z.infer<typeof insertReservationSchema>;
export type Faculty = typeof faculty.$inferSelect;
export type InsertFaculty = z.infer<typeof insertFacultySchema>;
export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;
export type Note = typeof notes.$inferSelect;
export type InsertNote = z.infer<typeof insertNoteSchema>;
export type SamplePaper = typeof samplePapers.$inferSelect;
export type InsertSamplePaper = z.infer<typeof insertSamplePaperSchema>;
export type Assignment = typeof assignments.$inferSelect;
export type InsertAssignment = z.infer<typeof insertAssignmentSchema>;
