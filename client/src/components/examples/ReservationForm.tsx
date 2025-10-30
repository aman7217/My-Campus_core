import { ReservationForm } from '../ReservationForm';

export default function ReservationFormExample() {
  const mockResources = [
    { id: '1', name: 'IT Lab', type: 'lab', location: 'IT Block' },
    { id: '2', name: 'Chemistry Lab', type: 'lab', location: 'Labs Block' },
    { id: '3', name: 'Smart Classroom', type: 'classroom', location: 'IT Block' },
    { id: '4', name: 'Seminar Hall', type: 'hall', location: 'Admin Block' },
  ];

  return (
    <div className="p-4 max-w-md">
      <ReservationForm resources={mockResources} />
    </div>
  );
}
