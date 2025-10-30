import { TimetableCard } from '../TimetableCard';

export default function TimetableCardExample() {
  const mockClasses = [
    { code: 'EL301', title: 'Java', room: 'IT Lab', time: '10:00-11:40', teacher: 'Mr. Bhupendra Rana' },
    { code: 'CS302', title: 'E-COMM', room: 'IT Lab', time: '11:40-1:20', teacher: 'Mrs. Reena' },
    { code: 'CS301', title: 'MP', room: 'IT Lab', time: '1:40-3:20', teacher: 'Mr. Bhupendra Rana' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <TimetableCard day="Monday" classes={mockClasses} />
      <TimetableCard day="Tuesday" classes={mockClasses.slice(0, 2)} />
      <TimetableCard day="Sunday" classes={[]} />
    </div>
  );
}
