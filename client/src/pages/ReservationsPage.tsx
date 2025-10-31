import { ReservationForm } from "@/components/ReservationForm";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface Reservation {
  id: string;
  userId: string;
  resourceId: string;
  resourceName: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  status: string;
  createdAt: string;
}

export default function ReservationsPage() {
  const resources = [
    { id: '1', name: 'IT Lab', type: 'lab', location: 'IT Block' },
    { id: '2', name: 'Chemistry Lab', type: 'lab', location: 'Labs Block' },
    { id: '3', name: 'E-Classroom', type: 'room', location: 'Admin Block' },
    { id: '4', name: 'Physics Lab', type: 'lab', location: 'Labs Block' },
    { id: '5', name: 'Smart Classroom', type: 'classroom', location: 'IT Block' },
    { id: '6', name: 'Seminar Hall', type: 'hall', location: 'Admin Block' },
  ];

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch("/api/reservations?userId=current-user-id"); // TODO: Get from auth context
      if (response.ok) {
        const data = await response.json();
        setReservations(data);
      }
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
      toast({
        title: "Error",
        description: "Failed to load reservations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReservationSubmit = (newReservation: Reservation) => {
    setReservations(prev => [newReservation, ...prev]);
  };

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
          <ReservationForm resources={resources} onSubmit={handleReservationSubmit} />
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-sm text-muted-foreground">Loading reservations...</p>
              ) : reservations.length === 0 ? (
                <p className="text-sm text-muted-foreground">No reservations yet</p>
              ) : (
                <div className="space-y-3">
                  {reservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="border rounded-lg p-4 hover-elevate"
                      data-testid={`reservation-${reservation.id}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{reservation.resourceName}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {reservation.date} · {reservation.timeFrom} - {reservation.timeTo}
                          </p>
                        </div>
                        <Badge
                          variant={
                            reservation.status === 'approved' ? 'default' :
                            reservation.status === 'declined' ? 'destructive' : 'secondary'
                          }
                        >
                          {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
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
