import { ReservationForm } from "@/components/ReservationForm";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ReservationsPage() {
  // todo: remove mock functionality
  const resources = [
    { id: '1', name: 'IT Lab', type: 'lab', location: 'IT Block' },
    { id: '2', name: 'Chemistry Lab', type: 'lab', location: 'Labs Block' },
    { id: '3', name: 'E-Classroom', type: 'room', location: 'Admin Block' },
    { id: '4', name: 'Physics Lab', type: 'lab', location: 'Labs Block' },
    { id: '5', name: 'Smart Classroom', type: 'classroom', location: 'IT Block' },
    { id: '6', name: 'Seminar Hall', type: 'hall', location: 'Admin Block' },
  ];

  const mockBookings = [
    { id: '1', resource: 'IT Lab', date: 'Oct 30, 2025', time: '2:00 PM - 4:00 PM', status: 'Approved' },
    { id: '2', resource: 'Smart Classroom', date: 'Oct 28, 2025', time: '10:00 AM - 12:00 PM', status: 'Pending' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Lab & Classroom Reservations</h1>
        <p className="text-muted-foreground">
          Book labs and classrooms for your projects and study groups
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ReservationForm resources={resources} />
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              {mockBookings.length === 0 ? (
                <p className="text-sm text-muted-foreground">No reservations yet</p>
              ) : (
                <div className="space-y-3">
                  {mockBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border rounded-lg p-4 hover-elevate"
                      data-testid={`booking-${booking.id}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{booking.resource}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {booking.date} · {booking.time}
                          </p>
                        </div>
                        <Badge
                          variant={booking.status === 'Approved' ? 'default' : 'secondary'}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ChatbotWidget />
    </div>
  );
}
