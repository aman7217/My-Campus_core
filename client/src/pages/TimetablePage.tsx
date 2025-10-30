import { TimetableCard } from "@/components/TimetableCard";
import { ChatbotWidget } from "@/components/ChatbotWidget";

export default function TimetablePage() {
  // todo: remove mock functionality
  const weekSchedule = {
    Monday: [
      { code: 'EL301', title: 'Java', room: 'IT Lab', time: '10:00-11:40', teacher: 'Mr. Bhupendra Rana' },
      { code: 'CS302', title: 'E-COMM', room: 'IT Lab', time: '11:40-1:20', teacher: 'Mrs. Reena' },
      { code: 'CS301', title: 'MP', room: 'IT Lab', time: '1:40-3:20', teacher: 'Mr. Bhupendra Rana' },
      { code: 'CS302', title: 'AAD', room: 'IT Lab', time: '3:20-5:00', teacher: 'Mrs. Reena' },
    ],
    Tuesday: [
      { code: 'IT301', title: 'SE', room: 'Smart class', time: '10:00-11:40', teacher: 'Mrs. Prerna Puri' },
      { code: 'CS303', title: 'AAD', room: 'IT Lab', time: '11:40-1:20', teacher: 'Mrs. Reena' },
      { code: 'CS301', title: 'MP', room: 'IT Lab', time: '1:40-5:00', teacher: 'Mr. Bhupendra Rana' },
    ],
    Wednesday: [
      { code: 'CS302', title: 'E-COMM', room: 'IT Lab', time: '10:00-11:40', teacher: 'Mrs. Reena' },
      { code: 'CS302', title: 'AAD', room: 'IT Lab', time: '11:40-1:20', teacher: 'Mrs. Reena' },
      { code: 'CS301', title: 'MP', room: 'IT Lab', time: '1:40-3:20', teacher: 'Mr. Bhupendra Rana' },
      { code: 'EL301', title: 'Java', room: 'IT Lab', time: '3:20-5:00', teacher: 'Mr. Bhupendra Rana' },
    ],
    Thursday: [
      { code: 'IT301', title: 'SE', room: 'Smart class', time: '10:00-11:40', teacher: 'Mrs. Prerna Puri' },
      { code: 'CS302', title: 'ADD', room: 'IT Lab', time: '11:40-1:20', teacher: 'Mrs. Reena' },
      { code: 'CS301', title: 'MP', room: 'IT Lab', time: '1:40-3:20', teacher: 'Mr. Bhupendra Rana' },
      { code: 'EL301', title: 'Java', room: 'IT Lab', time: '3:20-5:00', teacher: 'Mr. Bhupendra Rana' },
    ],
    Friday: [
      { code: 'CS302', title: 'MP', room: 'IT Lab', time: '10:00-11:20', teacher: 'Mr. Bhupendra Rana' },
      { code: 'CS302', title: 'AAD', room: 'IT Lab', time: '11:20-11:40', teacher: 'Mrs. Reena' },
      { code: 'CS302', title: 'E-COMM', room: 'IT Lab', time: '11:40-1:20', teacher: 'Mrs. Reena' },
      { code: 'EL301', title: 'Java', room: 'IT Lab', time: '1:40-3:20', teacher: 'Mr. Bhupendra Rana' },
    ],
    Saturday: [
      { code: 'EL301', title: 'Java', room: 'IT Lab', time: '10:00-11:40', teacher: 'Mr. Bhupendra Rana' },
      { code: 'CS302', title: 'MP', room: 'IT Lab', time: '11:40-1:20', teacher: 'Mr. Bhupendra Rana' },
      { code: 'CS301', title: 'MP', room: 'IT Lab', time: '1:40-3:20', teacher: 'Mr. Bhupendra Rana' },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Weekly Timetable</h1>
        <p className="text-muted-foreground">
          Computer Engineering - Semester 3
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(weekSchedule).map(([day, classes]) => (
          <TimetableCard key={day} day={day} classes={classes} />
        ))}
      </div>

      <ChatbotWidget />
    </div>
  );
}
