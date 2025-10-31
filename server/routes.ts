import type { Express } from "express";
import { createServer, type Server } from "http";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { storage } from "./storage";
import { insertReservationSchema, insertStudentSchema, insertFacultySchema, insertAnnouncementSchema, insertNoteSchema, insertSamplePaperSchema, insertAssignmentSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Configure multer for file uploads
  const uploadDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

  const upload = multer({
    storage: storageConfig,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['.pdf', '.doc', '.docx', '.txt', '.ppt', '.pptx', '.jpg', '.png'];
      const ext = path.extname(file.originalname).toLowerCase();
      if (allowedTypes.includes(ext)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only PDF, DOC, DOCX, TXT, PPT, PPTX, JPG, PNG files are allowed.'));
      }
    }
  });

  // Student API endpoints
  app.post("/api/students", async (req, res) => {
    try {
      const studentData = insertStudentSchema.parse(req.body);
      const student = await storage.createStudent(studentData);
      res.json(student);
    } catch (error) {
      console.error("Create student error:", error);
      res.status(500).json({ error: "Failed to create student" });
    }
  });

  app.get("/api/students", async (req, res) => {
    try {
      const { branch, semester } = req.query;
      let students;

      if (branch) {
        students = await storage.getStudentsByBranch(branch as string);
      } else if (semester) {
        students = await storage.getStudentsBySemester(semester as string);
      } else {
        students = await storage.getAllStudents();
      }

      res.json(students);
    } catch (error) {
      console.error("Get students error:", error);
      res.status(500).json({ error: "Failed to fetch students" });
    }
  });

  app.patch("/api/students/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const student = await storage.updateStudent(id, updateData);
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
      res.json(student);
    } catch (error) {
      console.error("Update student error:", error);
      res.status(500).json({ error: "Failed to update student" });
    }
  });

  app.delete("/api/students/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteStudent(id);
      if (!deleted) {
        return res.status(404).json({ error: "Student not found" });
      }
      res.json({ message: "Student deleted successfully" });
    } catch (error) {
      console.error("Delete student error:", error);
      res.status(500).json({ error: "Failed to delete student" });
    }
  });

  // Faculty API endpoints
  app.post("/api/faculty", async (req, res) => {
    try {
      const facultyData = insertFacultySchema.parse(req.body);
      const faculty = await storage.createFaculty(facultyData);
      res.json(faculty);
    } catch (error) {
      console.error("Create faculty error:", error);
      res.status(500).json({ error: "Failed to create faculty" });
    }
  });

  app.get("/api/faculty", async (req, res) => {
    try {
      const { branch } = req.query;
      let faculty;

      if (branch) {
        faculty = await storage.getFacultyByBranch(branch as string);
      } else {
        faculty = await storage.getAllFaculty();
      }

      res.json(faculty);
    } catch (error) {
      console.error("Get faculty error:", error);
      res.status(500).json({ error: "Failed to fetch faculty" });
    }
  });

  app.patch("/api/faculty/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const faculty = await storage.updateFaculty(id, updateData);
      if (!faculty) {
        return res.status(404).json({ error: "Faculty not found" });
      }
      res.json(faculty);
    } catch (error) {
      console.error("Update faculty error:", error);
      res.status(500).json({ error: "Failed to update faculty" });
    }
  });

  app.delete("/api/faculty/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteFaculty(id);
      if (!deleted) {
        return res.status(404).json({ error: "Faculty not found" });
      }
      res.json({ message: "Faculty deleted successfully" });
    } catch (error) {
      console.error("Delete faculty error:", error);
      res.status(500).json({ error: "Failed to delete faculty" });
    }
  });

  // Reservation API endpoints
  app.post("/api/reservations", async (req, res) => {
    try {
      const reservationData = insertReservationSchema.parse(req.body);
      const reservation = await storage.createReservation(reservationData);
      res.json(reservation);
    } catch (error) {
      console.error("Create reservation error:", error);
      res.status(500).json({ error: "Failed to create reservation" });
    }
  });

  app.get("/api/reservations", async (req, res) => {
    try {
      const { userId } = req.query;
      if (userId) {
        // Student view - get their own reservations
        const reservations = await storage.getReservationsByUserId(userId as string);
        res.json(reservations);
      } else {
        // Admin view - get all reservations
        const reservations = await storage.getAllReservations();
        res.json(reservations);
      }
    } catch (error) {
      console.error("Get reservations error:", error);
      res.status(500).json({ error: "Failed to fetch reservations" });
    }
  });

  app.patch("/api/reservations/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["approved", "declined"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }

      const reservation = await storage.updateReservationStatus(id, status);
      if (!reservation) {
        return res.status(404).json({ error: "Reservation not found" });
      }

      res.json(reservation);
    } catch (error) {
      console.error("Update reservation status error:", error);
      res.status(500).json({ error: "Failed to update reservation status" });
    }
  });

  // Announcement API endpoints
  app.post("/api/announcements", async (req, res) => {
    try {
      const announcementData = insertAnnouncementSchema.parse(req.body);
      const announcement = await storage.createAnnouncement(announcementData);
      res.json(announcement);
    } catch (error) {
      console.error("Create announcement error:", error);
      res.status(500).json({ error: "Failed to create announcement" });
    }
  });

  app.get("/api/announcements", async (req, res) => {
    try {
      const { published } = req.query;
      let announcements;

      if (published === "true") {
        announcements = await storage.getPublishedAnnouncements();
      } else {
        announcements = await storage.getAllAnnouncements();
      }

      res.json(announcements);
    } catch (error) {
      console.error("Get announcements error:", error);
      res.status(500).json({ error: "Failed to fetch announcements" });
    }
  });

  app.patch("/api/announcements/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const announcement = await storage.updateAnnouncement(id, updateData);
      if (!announcement) {
        return res.status(404).json({ error: "Announcement not found" });
      }
      res.json(announcement);
    } catch (error) {
      console.error("Update announcement error:", error);
      res.status(500).json({ error: "Failed to update announcement" });
    }
  });

  app.delete("/api/announcements/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteAnnouncement(id);
      if (!deleted) {
        return res.status(404).json({ error: "Announcement not found" });
      }
      res.json({ message: "Announcement deleted successfully" });
    } catch (error) {
      console.error("Delete announcement error:", error);
      res.status(500).json({ error: "Failed to delete announcement" });
    }
  });

  // Notes API endpoints
  app.post("/api/notes", upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "File is required" });
      }

      const { uploaderId, uploaderName, subject, title, description } = req.body;

      if (!uploaderId || !uploaderName || !subject || !title) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const noteData = insertNoteSchema.parse({
        uploaderId,
        uploaderName,
        subject,
        title,
        description: description || '',
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileSize: req.file.size.toString(),
      });

      const note = await storage.createNote(noteData);
      res.json(note);
    } catch (error) {
      console.error("Create note error:", error);
      res.status(500).json({ error: "Failed to upload note" });
    }
  });

  app.get("/api/notes", async (req, res) => {
    try {
      const { subject, uploaderId } = req.query;
      let notes;

      if (subject) {
        notes = await storage.getNotesBySubject(subject as string);
      } else if (uploaderId) {
        notes = await storage.getNotesByUploader(uploaderId as string);
      } else {
        notes = await storage.getAllNotes();
      }

      res.json(notes);
    } catch (error) {
      console.error("Get notes error:", error);
      res.status(500).json({ error: "Failed to fetch notes" });
    }
  });

  app.get("/api/notes/:id/download", async (req, res) => {
    try {
      const { id } = req.params;
      const notes = await storage.getAllNotes();
      const note = notes.find(n => n.id === id);

      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }

      if (!fs.existsSync(note.filePath)) {
        return res.status(404).json({ error: "File not found on server" });
      }

      res.download(note.filePath, note.fileName);
    } catch (error) {
      console.error("Download note error:", error);
      res.status(500).json({ error: "Failed to download note" });
    }
  });

  app.delete("/api/notes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const notes = await storage.getAllNotes();
      const note = notes.find(n => n.id === id);

      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }

      // Delete file from filesystem
      if (fs.existsSync(note.filePath)) {
        fs.unlinkSync(note.filePath);
      }

      const deleted = await storage.deleteNote(id);
      if (!deleted) {
        return res.status(404).json({ error: "Note not found" });
      }

      res.json({ message: "Note deleted successfully" });
    } catch (error) {
      console.error("Delete note error:", error);
      res.status(500).json({ error: "Failed to delete note" });
    }
  });

  // Sample Papers API endpoints
  app.post("/api/sample-papers", upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "File is required" });
      }

      const { uploaderId, uploaderName, subject, title, description } = req.body;

      if (!uploaderId || !uploaderName || !subject || !title) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const samplePaperData = insertSamplePaperSchema.parse({
        uploaderId,
        uploaderName,
        subject,
        title,
        description: description || '',
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileSize: req.file.size.toString(),
      });

      const samplePaper = await storage.createSamplePaper(samplePaperData);
      res.json(samplePaper);
    } catch (error) {
      console.error("Create sample paper error:", error);
      res.status(500).json({ error: "Failed to upload sample paper" });
    }
  });

  app.get("/api/sample-papers", async (req, res) => {
    try {
      const { subject } = req.query;
      let samplePapers;

      if (subject) {
        samplePapers = await storage.getSamplePapersBySubject(subject as string);
      } else {
        samplePapers = await storage.getAllSamplePapers();
      }

      res.json(samplePapers);
    } catch (error) {
      console.error("Get sample papers error:", error);
      res.status(500).json({ error: "Failed to fetch sample papers" });
    }
  });

  app.get("/api/sample-papers/:id/download", async (req, res) => {
    try {
      const { id } = req.params;
      const samplePapers = await storage.getAllSamplePapers();
      const samplePaper = samplePapers.find(sp => sp.id === id);

      if (!samplePaper) {
        return res.status(404).json({ error: "Sample paper not found" });
      }

      if (!fs.existsSync(samplePaper.filePath)) {
        return res.status(404).json({ error: "File not found on server" });
      }

      res.download(samplePaper.filePath, samplePaper.fileName);
    } catch (error) {
      console.error("Download sample paper error:", error);
      res.status(500).json({ error: "Failed to download sample paper" });
    }
  });

  app.delete("/api/sample-papers/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const samplePapers = await storage.getAllSamplePapers();
      const samplePaper = samplePapers.find(sp => sp.id === id);

      if (!samplePaper) {
        return res.status(404).json({ error: "Sample paper not found" });
      }

      // Delete file from filesystem
      if (fs.existsSync(samplePaper.filePath)) {
        fs.unlinkSync(samplePaper.filePath);
      }

      const deleted = await storage.deleteSamplePaper(id);
      if (!deleted) {
        return res.status(404).json({ error: "Sample paper not found" });
      }

      res.json({ message: "Sample paper deleted successfully" });
    } catch (error) {
      console.error("Delete sample paper error:", error);
      res.status(500).json({ error: "Failed to delete sample paper" });
    }
  });

  // Assignments API endpoints
  app.post("/api/assignments", upload.single('file'), async (req, res) => {
    try {
      const { teacherId, teacherName, title, description, subject, branch, semester, dueDate } = req.body;

      if (!teacherId || !teacherName || !title || !description || !subject || !branch || !semester || !dueDate) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const assignmentData = insertAssignmentSchema.parse({
        teacherId,
        teacherName,
        title,
        description,
        subject,
        branch,
        semester,
        dueDate,
        fileName: req.file?.originalname || null,
        filePath: req.file?.path || null,
        fileSize: req.file?.size.toString() || null,
      });

      const assignment = await storage.createAssignment(assignmentData);
      res.json(assignment);
    } catch (error) {
      console.error("Create assignment error:", error);
      res.status(500).json({ error: "Failed to create assignment" });
    }
  });

  app.get("/api/assignments", async (req, res) => {
    try {
      const { teacherId, branch, semester } = req.query;
      let assignments;

      if (teacherId) {
        assignments = await storage.getAssignmentsByTeacher(teacherId as string);
      } else if (branch) {
        assignments = await storage.getAssignmentsByBranch(branch as string);
      } else if (semester) {
        assignments = await storage.getAssignmentsBySemester(semester as string);
      } else {
        assignments = await storage.getAllAssignments();
      }

      res.json(assignments);
    } catch (error) {
      console.error("Get assignments error:", error);
      res.status(500).json({ error: "Failed to fetch assignments" });
    }
  });

  app.patch("/api/assignments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const assignment = await storage.updateAssignment(id, updateData);
      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }
      res.json(assignment);
    } catch (error) {
      console.error("Update assignment error:", error);
      res.status(500).json({ error: "Failed to update assignment" });
    }
  });

  app.delete("/api/assignments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const assignments = await storage.getAllAssignments();
      const assignment = assignments.find(a => a.id === id);

      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      // Delete file from filesystem if exists
      if (assignment.filePath && fs.existsSync(assignment.filePath)) {
        fs.unlinkSync(assignment.filePath);
      }

      const deleted = await storage.deleteAssignment(id);
      if (!deleted) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      res.json({ message: "Assignment deleted successfully" });
    } catch (error) {
      console.error("Delete assignment error:", error);
      res.status(500).json({ error: "Failed to delete assignment" });
    }
  });

  app.get("/api/assignments/:id/download", async (req, res) => {
    try {
      const { id } = req.params;
      const assignments = await storage.getAllAssignments();
      const assignment = assignments.find(a => a.id === id);

      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      if (!assignment.filePath || !fs.existsSync(assignment.filePath)) {
        return res.status(404).json({ error: "File not found on server" });
      }

      res.download(assignment.filePath, assignment.fileName);
    } catch (error) {
      console.error("Download assignment error:", error);
      res.status(500).json({ error: "Failed to download assignment" });
    }
  });

  // Chatbot API endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // TODO: Integrate with Google AI Studio API
      // For now, return a mock response
      const response = await generateAIResponse(message);

      res.json({ response });
    } catch (error) {
      console.error("Chat API error:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

async function generateAIResponse(userMessage: string): Promise<string> {
  try {
    const genAI = new GoogleGenerativeAI("AIzaSyBPnYTWyMdi2aJFgoxqehuDNyr-N-NEmhI");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const systemPrompt = `You are an AI assistant for Government Polytechnic Srinagar Garhwal. You help students with information about:

ACADEMIC PROGRAMS:
- Computer Engineering, Electrical Engineering, Mechanical Engineering, Civil Engineering
- 3-year diploma programs

CAMPUS FACILITIES & LOCATIONS:
- Admin Block (88): Administrative offices, principal's office
- CSE/IT Block (15): Computer Science and IT classrooms and labs
- Libraries: NT Library (38 & 32) - study materials, books, reading rooms
- Labs: AM Lab (09), CT Lab, Mech Auto Lab (AB), Chemistry/Physics labs
- Auditoriums: Main auditorium (16) for events
- Hostels: Girls Hostel (41), NIT Boys Hostel
- Sports Ground: Outdoor sports facilities
- Cafeteria: Near sports ground
- Medicinal Garden (07): Botanical garden
- Workshops: Filling & Plumbing Shop (CH), various technical workshops

NAVIGATION GUIDANCE:
- Main entrance leads to Admin Block (88)
- From main entrance: Admin Block is straight ahead, Library to the right
- CSE/IT Block (15) is located near the center of campus
- Labs are clustered in the laboratory complex
- Hostels are at the far end of campus
- Sports ground is behind the main academic buildings

TIMETABLES & SCHEDULES:
- Classes typically 9 AM - 5 PM, Monday to Friday
- Labs have specific timing slots
- Library open 8 AM - 8 PM weekdays

ADMINISTRATIVE PROCEDURES:
- Fee payments, admissions, certificates at Admin Block
- Faculty offices in respective department blocks
- Student records and transcripts available at admin office

Always be helpful, accurate, and provide specific information when possible. For navigation, give clear, step-by-step directions based on the campus layout. If you don't have specific information, suggest where the student can find it or who to contact.

Keep responses concise but informative.`;

    const result = await model.generateContent(`${systemPrompt}\n\nUser question: ${userMessage}`);
    const response = await result.response;
    const text = response.text();

    return text;

  } catch (error) {
    console.error("AI API error:", error);

    // Fallback responses in case of API failure
    const fallbackResponses = [
      "Based on the polytechnic's information, the library is open from 8 AM to 8 PM on weekdays. You can access study materials and reserve study rooms there.",
      "For Computer Engineering timetable, classes are scheduled from Monday to Friday, 9 AM to 5 PM. You can check the detailed schedule in the Timetable section.",
      "The campus has multiple facilities including computer labs, workshops, sports grounds, and a cafeteria. The main building houses administrative offices and classrooms.",
      "To access study materials, go to the Study Materials page where you can find notes, assignments, and reference materials for your courses.",
      "The polytechnic offers programs in Computer Engineering, Electrical Engineering, Mechanical Engineering, and Civil Engineering. Each program has a duration of 3 years.",
      "For any academic queries, you can contact your faculty advisor or visit the academic office. For technical issues, please reach out to the IT support team.",
    ];

    // Simple keyword matching for fallback
    const input = userMessage.toLowerCase();
    if (input.includes("library") || input.includes("study")) {
      return fallbackResponses[0];
    } else if (input.includes("timetable") || input.includes("schedule")) {
      return fallbackResponses[1];
    } else if (input.includes("facility") || input.includes("campus")) {
      return fallbackResponses[2];
    } else if (input.includes("material") || input.includes("notes")) {
      return fallbackResponses[3];
    } else if (input.includes("program") || input.includes("course")) {
      return fallbackResponses[4];
    } else if (input.includes("contact") || input.includes("help")) {
      return fallbackResponses[5];
    } else {
      return "I'm sorry, I'm having trouble connecting to the AI service right now. Please try again later, or contact the IT support team for assistance.";
    }
  }
}
