import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";
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

export default function TeacherReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch("/api/reservations");
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

  const handleStatusUpdate = async (reservationId: string, status: string) => {
    try {
      const response = await fetch(`/api/reservations/${reservationId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update reservation status");
      }

      const updatedReservation = await response.json();

      // Update local state
      setReservations(prev =>
        prev.map(res =>
          res.id === reservationId ? updatedReservation : res
        )
      );

      toast({
        title: "Success",
        description: `Reservation ${status} successfully`,
      });
    } catch (error) {
      console.error("Failed to update reservation status:", error);
      toast({
        title: "Error",
        description: "Failed to update reservation status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="default" className="bg-green-100 text-green-800">Approved</Badge>;
      case "declined":
        return <Badge variant="destructive">Declined</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const pendingReservations = reservations.filter(r => r.status === "pending");
  const approvedReservations = reservations.filter(r => r.status === "approved");
  const declinedReservations = reservations.filter(r => r.status === "declined");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Reservation Management</h1>
        <p className="text-muted-foreground">
          Review and manage student reservation requests
        </p>
      </div>

      {/* Pending Reservations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Pending Requests ({pendingReservations.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading reservations...</p>
          ) : pendingReservations.length === 0 ? (
            <p className="text-sm text-muted-foreground">No pending reservations</p>
          ) : (
            <div className="space-y-4">
              {pendingReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="border rounded-lg p-4 bg-yellow-50 border-yellow-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">{reservation.resourceName}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {reservation.date} · {reservation.timeFrom} - {reservation.timeTo}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Requested on {new Date(reservation.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(reservation.status)}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-green-50 hover:bg-green-100 border-green-200"
                          onClick={() => handleStatusUpdate(reservation.id, "approved")}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-red-50 hover:bg-red-100 border-red-200"
                          onClick={() => handleStatusUpdate(reservation.id, "declined")}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approved Reservations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Approved Reservations ({approvedReservations.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {approvedReservations.length === 0 ? (
            <p className="text-sm text-muted-foreground">No approved reservations</p>
          ) : (
            <div className="space-y-3">
              {approvedReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="border rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{reservation.resourceName}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {reservation.date} · {reservation.timeFrom} - {reservation.timeTo}
                      </p>
                    </div>
                    {getStatusBadge(reservation.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Declined Reservations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            Declined Reservations ({declinedReservations.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {declinedReservations.length === 0 ? (
            <p className="text-sm text-muted-foreground">No declined reservations</p>
          ) : (
            <div className="space-y-3">
              {declinedReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="border rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{reservation.resourceName}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {reservation.date} · {reservation.timeFrom} - {reservation.timeTo}
                      </p>
                    </div>
                    {getStatusBadge(reservation.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
