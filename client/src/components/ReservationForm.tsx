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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reservation = {
      resourceId: selectedResource,
      date,
      timeFrom,
      timeTo,
    };
    console.log("Reservation submitted:", reservation);
    onSubmit?.(reservation);
    // Reset form
    setSelectedResource("");
    setDate("");
    setTimeFrom("");
    setTimeTo("");
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

          <Button type="submit" className="w-full" data-testid="button-submit-reservation">
            Request Reservation
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
