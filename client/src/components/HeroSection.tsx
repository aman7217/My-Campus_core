import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import heroImage from "@assets/generated_images/Polytechnic_campus_building_hero_938875df.png";

export function HeroSection() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
      <img
        src={heroImage}
        alt="Government Polytechnic Srinagar Garhwal Campus"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-16">
        <div className="flex items-center gap-3 mb-4">
          <GraduationCap className="h-12 w-12 text-white" />
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Government Polytechnic
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-white/90 mb-2">
          Srinagar Garhwal
        </p>
        <p className="text-base text-white/80 mb-6 max-w-2xl">
          Your gateway to quality technical education. Access timetables, study materials, and campus resources.
        </p>
        <div className="flex gap-3">
          <Button
            size="lg"
            className="bg-white/10 border border-white/20 text-white backdrop-blur-sm hover-elevate"
            data-testid="button-explore"
          >
            Explore Resources
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/5 border-white/20 text-white backdrop-blur-sm hover-elevate"
            data-testid="button-timetable"
          >
            View Timetable
          </Button>
        </div>
      </div>
    </div>
  );
}
