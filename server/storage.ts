import { type User, type InsertUser, type Student, type InsertStudent, type Reservation, type InsertReservation, type Faculty, type InsertFaculty, type Announcement, type InsertAnnouncement, type Note, type InsertNote, type SamplePaper, type InsertSamplePaper, type Assignment, type InsertAssignment } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { users, students, faculty, reservations, announcements, notes, samplePapers, assignments } from "@shared/schema";
import { eq, and } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Student methods
  createStudent(student: InsertStudent): Promise<Student>;
  getAllStudents(): Promise<Student[]>;
  getStudentsByBranch(branch: string): Promise<Student[]>;
  getStudentsBySemester(semester: string): Promise<Student[]>;
  updateStudent(id: string, student: Partial<InsertStudent>): Promise<Student | undefined>;
  deleteStudent(id: string): Promise<boolean>;

  // Faculty methods
  createFaculty(faculty: InsertFaculty): Promise<Faculty>;
  getAllFaculty(): Promise<Faculty[]>;
  getFacultyByBranch(branch: string): Promise<Faculty[]>;
  updateFaculty(id: string, faculty: Partial<InsertFaculty>): Promise<Faculty | undefined>;
  deleteFaculty(id: string): Promise<boolean>;

  // Reservation methods
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  getReservationsByUserId(userId: string): Promise<Reservation[]>;
  getAllReservations(): Promise<Reservation[]>;
  updateReservationStatus(id: string, status: string): Promise<Reservation | undefined>;

  // Announcement methods
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  getAllAnnouncements(): Promise<Announcement[]>;
  getPublishedAnnouncements(): Promise<Announcement[]>;
  updateAnnouncement(id: string, announcement: Partial<InsertAnnouncement>): Promise<Announcement | undefined>;
  deleteAnnouncement(id: string): Promise<boolean>;

  // Notes methods
  createNote(note: InsertNote): Promise<Note>;
  getAllNotes(): Promise<Note[]>;
  getNotesBySubject(subject: string): Promise<Note[]>;
  getNotesByUploader(uploaderId: string): Promise<Note[]>;
  deleteNote(id: string): Promise<boolean>;

  // Sample Papers methods
  createSamplePaper(samplePaper: InsertSamplePaper): Promise<SamplePaper>;
  getAllSamplePapers(): Promise<SamplePaper[]>;
  getSamplePapersBySubject(subject: string): Promise<SamplePaper[]>;
  deleteSamplePaper(id: string): Promise<boolean>;

  // Assignments methods
  createAssignment(assignment: InsertAssignment): Promise<Assignment>;
  getAllAssignments(): Promise<Assignment[]>;
  getAssignmentsByTeacher(teacherId: string): Promise<Assignment[]>;
  getAssignmentsByBranch(branch: string): Promise<Assignment[]>;
  getAssignmentsBySemester(semester: string): Promise<Assignment[]>;
  updateAssignment(id: string, assignment: Partial<InsertAssignment>): Promise<Assignment | undefined>;
  deleteAssignment(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private students: Map<string, Student>;
  private faculty: Map<string, Faculty>;
  private reservations: Map<string, Reservation>;
  private announcements: Map<string, Announcement>;
  private notes: Map<string, Note>;
  private samplePapers: Map<string, SamplePaper>;
  private assignments: Map<string, Assignment>;

  constructor() {
    this.users = new Map();
    this.students = new Map();
    this.faculty = new Map();
    this.reservations = new Map();
    this.announcements = new Map();
    this.notes = new Map();
    this.samplePapers = new Map();
    this.assignments = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, role: insertUser.role || "student" };
    this.users.set(id, user);
    return user;
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const id = randomUUID();
    const student: Student = { ...insertStudent, id, status: insertStudent.status || "Active" };
    this.students.set(id, student);
    return student;
  }

  async getAllStudents(): Promise<Student[]> {
    return Array.from(this.students.values());
  }

  async getStudentsByBranch(branch: string): Promise<Student[]> {
    return Array.from(this.students.values()).filter(
      (student) => student.branch === branch,
    );
  }

  async getStudentsBySemester(semester: string): Promise<Student[]> {
    return Array.from(this.students.values()).filter(
      (student) => student.semester === semester,
    );
  }

  async updateStudent(id: string, updateData: Partial<InsertStudent>): Promise<Student | undefined> {
    const student = this.students.get(id);
    if (student) {
      const updatedStudent = { ...student, ...updateData };
      this.students.set(id, updatedStudent);
      return updatedStudent;
    }
    return undefined;
  }

  async deleteStudent(id: string): Promise<boolean> {
    return this.students.delete(id);
  }

  async createFaculty(insertFaculty: InsertFaculty): Promise<Faculty> {
    const id = randomUUID();
    const faculty: Faculty = { ...insertFaculty, id, status: insertFaculty.status || "Active" };
    this.faculty.set(id, faculty);
    return faculty;
  }

  async getAllFaculty(): Promise<Faculty[]> {
    return Array.from(this.faculty.values());
  }

  async getFacultyByBranch(branch: string): Promise<Faculty[]> {
    return Array.from(this.faculty.values()).filter(
      (faculty) => faculty.branch === branch,
    );
  }

  async updateFaculty(id: string, updateData: Partial<InsertFaculty>): Promise<Faculty | undefined> {
    const faculty = this.faculty.get(id);
    if (faculty) {
      const updatedFaculty = { ...faculty, ...updateData };
      this.faculty.set(id, updatedFaculty);
      return updatedFaculty;
    }
    return undefined;
  }

  async deleteFaculty(id: string): Promise<boolean> {
    return this.faculty.delete(id);
  }

  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    const id = randomUUID();
    const reservation: Reservation = {
      ...insertReservation,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.reservations.set(id, reservation);
    return reservation;
  }

  async getReservationsByUserId(userId: string): Promise<Reservation[]> {
    return Array.from(this.reservations.values()).filter(
      (reservation) => reservation.userId === userId,
    );
  }

  async getAllReservations(): Promise<Reservation[]> {
    return Array.from(this.reservations.values());
  }

  async updateReservationStatus(id: string, status: string): Promise<Reservation | undefined> {
    const reservation = this.reservations.get(id);
    if (reservation) {
      const updatedReservation = { ...reservation, status };
      this.reservations.set(id, updatedReservation);
      return updatedReservation;
    }
    return undefined;
  }

  async createAnnouncement(insertAnnouncement: InsertAnnouncement): Promise<Announcement> {
    const id = randomUUID();
    const announcement: Announcement = {
      ...insertAnnouncement,
      id,
      status: insertAnnouncement.status || "Published",
      priority: insertAnnouncement.priority || "Medium",
      createdAt: new Date(),
    };
    this.announcements.set(id, announcement);
    return announcement;
  }

  async getAllAnnouncements(): Promise<Announcement[]> {
    return Array.from(this.announcements.values());
  }

  async getPublishedAnnouncements(): Promise<Announcement[]> {
    return Array.from(this.announcements.values()).filter(
      (announcement) => announcement.status === "Published",
    );
  }

  async updateAnnouncement(id: string, updateData: Partial<InsertAnnouncement>): Promise<Announcement | undefined> {
    const announcement = this.announcements.get(id);
    if (announcement) {
      const updatedAnnouncement = { ...announcement, ...updateData };
      this.announcements.set(id, updatedAnnouncement);
      return updatedAnnouncement;
    }
    return undefined;
  }

  async deleteAnnouncement(id: string): Promise<boolean> {
    return this.announcements.delete(id);
  }

  async createNote(insertNote: InsertNote): Promise<Note> {
    const id = randomUUID();
    const note: Note = { ...insertNote, id, uploadedAt: new Date() };
    this.notes.set(id, note);
    return note;
  }

  async getAllNotes(): Promise<Note[]> {
    return Array.from(this.notes.values());
  }

  async getNotesBySubject(subject: string): Promise<Note[]> {
    return Array.from(this.notes.values()).filter(
      (note) => note.subject === subject,
    );
  }

  async getNotesByUploader(uploaderId: string): Promise<Note[]> {
    return Array.from(this.notes.values()).filter(
      (note) => note.uploaderId === uploaderId,
    );
  }

  async deleteNote(id: string): Promise<boolean> {
    return this.notes.delete(id);
  }

  async createSamplePaper(insertSamplePaper: InsertSamplePaper): Promise<SamplePaper> {
    const id = randomUUID();
    const samplePaper: SamplePaper = { ...insertSamplePaper, id, uploadedAt: new Date() };
    this.samplePapers.set(id, samplePaper);
    return samplePaper;
  }

  async getAllSamplePapers(): Promise<SamplePaper[]> {
    return Array.from(this.samplePapers.values());
  }

  async getSamplePapersBySubject(subject: string): Promise<SamplePaper[]> {
    return Array.from(this.samplePapers.values()).filter(
      (samplePaper) => samplePaper.subject === subject,
    );
  }

  async deleteSamplePaper(id: string): Promise<boolean> {
    return this.samplePapers.delete(id);
  }

  async createAssignment(insertAssignment: InsertAssignment): Promise<Assignment> {
    const id = randomUUID();
    const assignment: Assignment = { ...insertAssignment, id, createdAt: new Date() };
    this.assignments.set(id, assignment);
    return assignment;
  }

  async getAllAssignments(): Promise<Assignment[]> {
    return Array.from(this.assignments.values());
  }

  async getAssignmentsByTeacher(teacherId: string): Promise<Assignment[]> {
    return Array.from(this.assignments.values()).filter(
      (assignment) => assignment.teacherId === teacherId,
    );
  }

  async getAssignmentsByBranch(branch: string): Promise<Assignment[]> {
    return Array.from(this.assignments.values()).filter(
      (assignment) => assignment.branch === branch,
    );
  }

  async getAssignmentsBySemester(semester: string): Promise<Assignment[]> {
    return Array.from(this.assignments.values()).filter(
      (assignment) => assignment.semester === semester,
    );
  }

  async updateAssignment(id: string, updateData: Partial<InsertAssignment>): Promise<Assignment | undefined> {
    const assignment = this.assignments.get(id);
    if (assignment) {
      const updatedAssignment = { ...assignment, ...updateData };
      this.assignments.set(id, updatedAssignment);
      return updatedAssignment;
    }
    return undefined;
  }

  async deleteAssignment(id: string): Promise<boolean> {
    return this.assignments.delete(id);
  }
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const result = await db.insert(students).values({
      ...insertStudent,
      status: insertStudent.status || "Active",
    }).returning();
    return result[0];
  }

  async getAllStudents(): Promise<Student[]> {
    return await db.select().from(students);
  }

  async getStudentsByBranch(branch: string): Promise<Student[]> {
    return await db.select().from(students).where(eq(students.branch, branch));
  }

  async getStudentsBySemester(semester: string): Promise<Student[]> {
    return await db.select().from(students).where(eq(students.semester, semester));
  }

  async updateStudent(id: string, updateData: Partial<InsertStudent>): Promise<Student | undefined> {
    const result = await db.update(students).set(updateData).where(eq(students.id, id)).returning();
    return result[0];
  }

  async deleteStudent(id: string): Promise<boolean> {
    const result = await db.delete(students).where(eq(students.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async createFaculty(insertFaculty: InsertFaculty): Promise<Faculty> {
    const result = await db.insert(faculty).values({
      ...insertFaculty,
      status: insertFaculty.status || "Active",
    }).returning();
    return result[0];
  }

  async getAllFaculty(): Promise<Faculty[]> {
    return await db.select().from(faculty);
  }

  async getFacultyByBranch(branch: string): Promise<Faculty[]> {
    return await db.select().from(faculty).where(eq(faculty.branch, branch));
  }

  async updateFaculty(id: string, updateData: Partial<InsertFaculty>): Promise<Faculty | undefined> {
    const result = await db.update(faculty).set(updateData).where(eq(faculty.id, id)).returning();
    return result[0];
  }

  async deleteFaculty(id: string): Promise<boolean> {
    const result = await db.delete(faculty).where(eq(faculty.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    const result = await db.insert(reservations).values({
      ...insertReservation,
      status: "pending",
      createdAt: new Date(),
    }).returning();
    return result[0];
  }

  async getReservationsByUserId(userId: string): Promise<Reservation[]> {
    return await db.select().from(reservations).where(eq(reservations.userId, userId));
  }

  async getAllReservations(): Promise<Reservation[]> {
    return await db.select().from(reservations);
  }

  async updateReservationStatus(id: string, status: string): Promise<Reservation | undefined> {
    const result = await db.update(reservations).set({ status }).where(eq(reservations.id, id)).returning();
    return result[0];
  }

  async createAnnouncement(insertAnnouncement: InsertAnnouncement): Promise<Announcement> {
    const result = await db.insert(announcements).values({
      ...insertAnnouncement,
      status: insertAnnouncement.status || "Published",
      priority: insertAnnouncement.priority || "Medium",
      createdAt: new Date(),
    }).returning();
    return result[0];
  }

  async getAllAnnouncements(): Promise<Announcement[]> {
    return await db.select().from(announcements);
  }

  async getPublishedAnnouncements(): Promise<Announcement[]> {
    return await db.select().from(announcements).where(eq(announcements.status, "Published"));
  }

  async updateAnnouncement(id: string, updateData: Partial<InsertAnnouncement>): Promise<Announcement | undefined> {
    const result = await db.update(announcements).set(updateData).where(eq(announcements.id, id)).returning();
    return result[0];
  }

  async deleteAnnouncement(id: string): Promise<boolean> {
    const result = await db.delete(announcements).where(eq(announcements.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async createNote(insertNote: InsertNote): Promise<Note> {
    const result = await db.insert(notes).values({
      ...insertNote,
      uploadedAt: new Date(),
    }).returning();
    return result[0];
  }

  async getAllNotes(): Promise<Note[]> {
    return await db.select().from(notes);
  }

  async getNotesBySubject(subject: string): Promise<Note[]> {
    return await db.select().from(notes).where(eq(notes.subject, subject));
  }

  async getNotesByUploader(uploaderId: string): Promise<Note[]> {
    return await db.select().from(notes).where(eq(notes.uploaderId, uploaderId));
  }

  async deleteNote(id: string): Promise<boolean> {
    const result = await db.delete(notes).where(eq(notes.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async createSamplePaper(insertSamplePaper: InsertSamplePaper): Promise<SamplePaper> {
    const result = await db.insert(samplePapers).values({
      ...insertSamplePaper,
      uploadedAt: new Date(),
    }).returning();
    return result[0];
  }

  async getAllSamplePapers(): Promise<SamplePaper[]> {
    return await db.select().from(samplePapers);
  }

  async getSamplePapersBySubject(subject: string): Promise<SamplePaper[]> {
    return await db.select().from(samplePapers).where(eq(samplePapers.subject, subject));
  }

  async deleteSamplePaper(id: string): Promise<boolean> {
    const result = await db.delete(samplePapers).where(eq(samplePapers.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async createAssignment(insertAssignment: InsertAssignment): Promise<Assignment> {
    const result = await db.insert(assignments).values({
      ...insertAssignment,
      createdAt: new Date(),
    }).returning();
    return result[0];
  }

  async getAllAssignments(): Promise<Assignment[]> {
    return await db.select().from(assignments);
  }

  async getAssignmentsByTeacher(teacherId: string): Promise<Assignment[]> {
    return await db.select().from(assignments).where(eq(assignments.teacherId, teacherId));
  }

  async getAssignmentsByBranch(branch: string): Promise<Assignment[]> {
    return await db.select().from(assignments).where(eq(assignments.branch, branch));
  }

  async getAssignmentsBySemester(semester: string): Promise<Assignment[]> {
    return await db.select().from(assignments).where(eq(assignments.semester, semester));
  }

  async updateAssignment(id: string, updateData: Partial<InsertAssignment>): Promise<Assignment | undefined> {
    const result = await db.update(assignments).set(updateData).where(eq(assignments.id, id)).returning();
    return result[0];
  }

  async deleteAssignment(id: string): Promise<boolean> {
    const result = await db.delete(assignments).where(eq(assignments.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

export const storage = new MemStorage();
