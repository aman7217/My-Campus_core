import { AnnouncementList } from '../AnnouncementList';

export default function AnnouncementListExample() {
  const mockAnnouncements = [
    {
      id: '1',
      title: 'Zonal Games Starting Next Week',
      content: 'All students are invited to participate in the annual zonal games. Registration open until Friday.',
      date: 'Oct 25, 2025',
      priority: 'high' as const,
    },
    {
      id: '2',
      title: 'New Study Materials Available',
      content: 'Updated course materials for Microprocessors and Java Programming are now available in the library.',
      date: 'Oct 23, 2025',
      priority: 'medium' as const,
    },
    {
      id: '3',
      title: 'Lab Reservation System Update',
      content: 'The lab reservation system has been upgraded. Please use the new interface for bookings.',
      date: 'Oct 20, 2025',
      priority: 'low' as const,
    },
  ];

  return (
    <div className="p-4 max-w-2xl">
      <AnnouncementList announcements={mockAnnouncements} />
    </div>
  );
}
