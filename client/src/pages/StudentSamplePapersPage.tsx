import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { Download, FileText, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SamplePaper {
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

export default function StudentSamplePapersPage() {
  const [samplePapers, setSamplePapers] = useState<SamplePaper[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
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
    fetchSamplePapers();
  }, [selectedSubject]);

  const fetchSamplePapers = async () => {
    try {
      const url = selectedSubject && selectedSubject !== "all"
        ? `/api/sample-papers?subject=${encodeURIComponent(selectedSubject)}`
        : "/api/sample-papers";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setSamplePapers(data);
      }
    } catch (error) {
      console.error("Failed to fetch sample papers:", error);
      toast({
        title: "Error",
        description: "Failed to load sample papers",
        variant: "destructive",
      });
    }
  };

  const handleDownload = async (samplePaperId: string, fileName: string) => {
    try {
      const response = await fetch(`/api/sample-papers/${samplePaperId}/download`);
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
        description: "Failed to download sample paper",
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
        <h1 className="text-2xl font-bold mb-2">Sample Papers</h1>
        <p className="text-muted-foreground">
          Download sample papers to prepare for your exams
        </p>
      </div>

      {/* Filter */}
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

      {/* Sample Papers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {samplePapers.map((samplePaper) => (
          <Card key={samplePaper.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">{samplePaper.title}</CardTitle>
                  <CardDescription className="mt-1">
                    Uploaded by {samplePaper.uploaderName}
                  </CardDescription>
                </div>
                <Badge variant="secondary">{samplePaper.subject}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {samplePaper.description && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {samplePaper.description}
                </p>
              )}

              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <FileText className="h-3 w-3" />
                <span>{samplePaper.fileName}</span>
                <span>•</span>
                <span>{formatFileSize(samplePaper.fileSize)}</span>
                <span>•</span>
                <span>{formatDate(samplePaper.uploadedAt)}</span>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDownload(samplePaper.id, samplePaper.fileName)}
                className="w-full"
              >
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {samplePapers.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {selectedSubject
              ? `No sample papers found for ${selectedSubject}`
              : "No sample papers available yet. Check back later!"}
          </p>
        </div>
      )}

      <ChatbotWidget />
    </div>
  );
}
