import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Resource {
  id: string;
  name: string;
  type: string;
  location: string;
}

interface ReservationFormProps {
  resources: Resource[];
  onSubmit?: (reservation: any) => void;
}

export function ReservationForm({ resources, onSubmit }: ReservationFormProps) {
  const [selectedResource, setSelectedResource] = useState("");
  const [date, setDate] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedResource || !date || !timeFrom || !timeTo) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedResourceData = resources.find(r => r.id === selectedResource);
      const reservation = {
        userId: "current-user-id", // TODO: Get from auth context
        resourceId: selectedResource,
        resourceName: selectedResourceData?.name || "",
        date,
        timeFrom,
        timeTo,
      };

      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
      });

      if (!response.ok) {
        throw new Error("Failed to submit reservation");
      }

      const result = await response.json();

      toast({
        title: "Success",
        description: "Reservation request submitted successfully. Awaiting admin approval.",
      });

      onSubmit?.(result);

      // Reset form
      setSelectedResource("");
      setDate("");
      setTimeFrom("");
      setTimeTo("");
    } catch (error) {
      console.error("Reservation submission error:", error);
      toast({
        title: "Error",
        description: "Failed to submit reservation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reserve Lab/Classroom</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resource">Select Resource</Label>
            <Select value={selectedResource} onValueChange={setSelectedResource}>
              <SelectTrigger id="resource" data-testid="select-resource">
                <SelectValue placeholder="Choose a lab or classroom" />
              </SelectTrigger>
              <SelectContent>
                {resources.map((resource) => (
                  <SelectItem key={resource.id} value={resource.id}>
                    {resource.name} - {resource.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-10"
                data-testid="input-date"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time-from">From</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="time-from"
                  type="time"
                  value={timeFrom}
                  onChange={(e) => setTimeFrom(e.target.value)}
                  className="pl-10"
                  data-testid="input-time-from"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time-to">To</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="time-to"
                  type="time"
                  value={timeTo}
                  onChange={(e) => setTimeTo(e.target.value)}
                  className="pl-10"
                  data-testid="input-time-to"
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" data-testid="button-submit-reservation" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Request Reservation"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
