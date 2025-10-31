import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { Upload, Download, Trash2, FileText, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Note {
  id: string;
  uploaderId: string;
  uploaderName: string;
  subject: string;
  title: string;
  description?: string;
  fileName: string;
  filePath: string;
  fileSize: string;
  uploadedAt: string;
}

export default function StudentNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [uploadForm, setUploadForm] = useState({
    subject: "Select a subject",
    title: "",
    description: "",
    file: null as File | null,
  });
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const subjects = [
    "Java",
    "E-COMM",
    "MP",
    "SE",
    "AAD",
    "ADD",
    "Data Structures",
    "Algorithms",
    "Database Management",
    "Web Development",
    "Computer Networks",
    "Operating Systems",
  ];

  useEffect(() => {
    fetchNotes();
  }, [selectedSubject]);

  const fetchNotes = async () => {
    try {
      const url = selectedSubject && selectedSubject !== "all"
        ? `/api/notes?subject=${encodeURIComponent(selectedSubject)}`
        : "/api/notes";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      toast({
        title: "Error",
        description: "Failed to load notes",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadForm(prev => ({ ...prev, file }));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadForm.file || !uploadForm.subject || !uploadForm.title) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", uploadForm.file);
      formData.append("uploaderId", localStorage.getItem("userId") || "anonymous");
      formData.append("uploaderName", localStorage.getItem("userName") || "Anonymous User");
      formData.append("subject", uploadForm.subject);
      formData.append("title", uploadForm.title);
      formData.append("description", uploadForm.description);

      const response = await fetch("/api/notes", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Note uploaded successfully",
        });
        setUploadForm({
          subject: "",
          title: "",
          description: "",
          file: null,
        });
        // Reset file input
        const fileInput = document.getElementById("file-input") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        fetchNotes();
      } else {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload note",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async (noteId: string, fileName: string) => {
    try {
      const response = await fetch(`/api/notes/${noteId}/download`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        throw new Error("Download failed");
      }
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download note",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (noteId: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Note deleted successfully",
        });
        fetchNotes();
      } else {
        throw new Error("Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      });
    }
  };

  const formatFileSize = (bytes: string) => {
    const size = parseInt(bytes);
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Student Notes</h1>
        <p className="text-muted-foreground">
          Upload and share study materials with your classmates
        </p>
      </div>

      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload New Note
          </CardTitle>
          <CardDescription>
            Share your study materials with other students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Subject *</label>
                <Select
                  value={uploadForm.subject}
                  onValueChange={(value) => setUploadForm(prev => ({ ...prev, subject: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Title *</label>
                <Input
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Note title"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={uploadForm.description}
                onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the note"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium">File *</label>
              <Input
                id="file-input"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.jpg,.png"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Supported formats: PDF, DOC, DOCX, TXT, PPT, PPTX, JPG, PNG (Max 10MB)
              </p>
            </div>

            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload Note"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Filter and Notes List */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="font-medium">Filter by Subject:</span>
          </div>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All subjects</SelectItem>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <Card key={note.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                    <CardDescription className="mt-1">
                      by {note.uploaderName}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">{note.subject}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {note.description && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {note.description}
                  </p>
                )}

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <FileText className="h-3 w-3" />
                  <span>{note.fileName}</span>
                  <span>•</span>
                  <span>{formatFileSize(note.fileSize)}</span>
                  <span>•</span>
                  <span>{formatDate(note.uploadedAt)}</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(note.id, note.fileName)}
                    className="flex-1"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(note.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {notes.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {selectedSubject
                ? `No notes found for ${selectedSubject}`
                : "No notes uploaded yet. Be the first to share!"}
            </p>
          </div>
        )}
      </div>

      <ChatbotWidget />
    </div>
  );
}
