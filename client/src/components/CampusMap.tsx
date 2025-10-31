'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Map, Navigation, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type SelectedLocation = string | null;

const locations: { id: string; name: string; description?: string }[] = [
    { id: 'principal-quarter', name: 'Principal Quarter', description: 'Administrative offices and principal\'s residence' },
    { id: 'block-3', name: 'Block III', description: 'Academic building with classrooms' },
    { id: 'type-4', name: 'Type IV (04)', description: 'Academic building' },
    { id: 'type-5', name: 'Type V (05)', description: 'Academic building' },
    { id: '06', name: 'Building 06', description: 'Academic facility' },
    { id: 'medicinal-garden', name: 'Medicinal Garden (07)', description: 'Botanical garden with medicinal plants' },
    { id: 'admin-block-88', name: 'Admin Block (88)', description: 'Administrative offices' },
    { id: 'audio-rium', name: 'Auditorium (16)', description: 'Main auditorium for events and gatherings' },
    { id: 'girls-hostel', name: 'Girls Hostel (41)', description: 'Residential facility for female students' },
    { id: 'am-lab', name: 'AM Lab (09)', description: 'Applied Mechanics laboratory' },
    { id: 'nit-boys-hostel', name: 'NIT Boys Hostel', description: 'Residential facility for male students' },
    { id: 'ct-lab', name: 'CT Lab', description: 'Computer Technology laboratory' },
    { id: 'cse-it-block', name: 'CSE/IT Block (15)', description: 'Computer Science and IT classrooms and labs' },
    { id: 'mech-auto-lab', name: 'Mech Auto (AB) Lab', description: 'Mechanical and Automotive laboratory' },
    { id: 'ca-type-4', name: 'CA Type IV', description: 'Academic building' },
    { id: 'type-x', name: 'Type X (28)', description: 'Academic building' },
    { id: 'type-iv-n', name: 'Type IV N', description: 'Academic building' },
    { id: 'filling-plumbing-shop', name: 'Filling & Plumbing Shop (CH)', description: 'Workshop for filling and plumbing training' },
    { id: 'library-38', name: 'NT Library (38)', description: 'National Technology library' },
    { id: 'library-32', name: 'NT Library (32)', description: 'National Technology library' },
    { id: 'nit-admin-block-13', name: 'NIT Administrative Block (13)', description: 'Administrative offices' },
    { id: 'nit-admin-block', name: 'NIT Administrative Block', description: 'Administrative offices' },
    { id: 'type-31', name: 'Type 31', description: 'Academic building' },
    { id: 'staff-room', name: 'Staff Room', description: 'Faculty staff room' },
    { id: 'ty-staff-room', name: 'TY Staff Room', description: 'Teaching staff room and rest area' },
  ];

export function CampusMap() {
  const [selected, setSelected] = useState<SelectedLocation>(null);

  const handleLocationClick = (id: string) => {
    setSelected(id);
  };

  const getDisplayName = (id: string | null) => {
    if (!id) return 'Select a location';
    return locations.find(l => l.id === id)?.name || 'Campus Map';
  };

  const getLocationDescription = (id: string | null) => {
    if (!id) return null;
    return locations.find(l => l.id === id)?.description || null;
  };

  const handleGetDirections = () => {
    if (!selected) return;
    const locationName = getDisplayName(selected);
    // This will trigger the chatbot to provide navigation assistance
    const event = new CustomEvent('chatbot-navigate', {
      detail: { location: locationName, type: 'directions' }
    });
    window.dispatchEvent(event);
  };

  const handleAskChatbot = () => {
    if (!selected) return;
    const locationName = getDisplayName(selected);
    // This will trigger the chatbot to provide information about the location
    const event = new CustomEvent('chatbot-navigate', {
      detail: { location: locationName, type: 'info' }
    });
    window.dispatchEvent(event);
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Map className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="text-3xl font-bold font-headline text-primary">Interactive Campus Map</CardTitle>
            <p className="text-muted-foreground">{getDisplayName(selected)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        {selected && (
          <div className="absolute top-4 right-4 z-10 bg-background/95 backdrop-blur-sm border rounded-lg p-4 shadow-lg max-w-xs">
            <h3 className="font-semibold text-sm mb-2">{getDisplayName(selected)}</h3>
            {getLocationDescription(selected) && (
              <p className="text-xs text-muted-foreground mb-3">{getLocationDescription(selected)}</p>
            )}
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleGetDirections} className="flex items-center gap-1">
                <Navigation className="h-3 w-3" />
                Directions
              </Button>
              <Button size="sm" variant="outline" onClick={handleAskChatbot} className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                Ask AI
              </Button>
            </div>
          </div>
        )}
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base and Title */}
          <path d="M55 55 L280 55 L280 65 L270 75 L100 75 Q80 75 80 55 Z" className="fill-primary/20" />
          <text x="200" y="30" textAnchor="middle" className="font-bold text-lg fill-primary">GOVT. POLYTECHNIC</text>
          <text x="200" y="45" textAnchor="middle" className="font-bold text-md fill-primary">SRINGAR GARHHAL</text>

          {/* Buildings */}
          <g onClick={() => handleLocationClick('principal-quarter')} className="cursor-pointer">
            <path d="M50 70 L50 85 L80 85 L80 70 Z" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'principal-quarter'})} />
            <text x="52" y="76" className="text-[5px] fill-foreground">PRINCIPAL</text>
            <text x="55" y="82" className="text-[5px] fill-foreground">QUARTER</text>
          </g>

          <g onClick={() => handleLocationClick('block-3')} className="cursor-pointer">
            <path d="M40 90 L40 130 L60 130 L60 90 Z" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'block-3'})} />
            <text x="47" y="100" className="text-[5px] rotate-90 fill-foreground">B L O C K</text>
            <text x="52" y="112" className="text-[5px] rotate-90 fill-foreground">I I I</text>
          </g>

          <g onClick={() => handleLocationClick('type-4')} className="cursor-pointer">
            <path d="M70 90 L70 120 L90 120 L90 90 Z" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'type-4'})} />
             <text x="77" y="98" className="text-[5px] rotate-90 fill-foreground">T Y P E</text>
             <text x="82" y="105" className="text-[5px] rotate-90 fill-foreground">IV</text>
             <text x="83" y="118" className="text-[5px] fill-foreground">04</text>
          </g>

          <g onClick={() => handleLocationClick('06')} className="cursor-pointer">
            <path d="M100 90 L130 90 L130 100 L100 100 Z" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === '06'})} />
            <text x="112" y="97" className="text-[7px] font-bold fill-foreground">06</text>
          </g>

          <g onClick={() => handleLocationClick('type-5')} className="cursor-pointer">
            <path d="M105 105 L125 105 L125 110 L120 115 L110 115 L105 110 Z" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'type-5'})} />
            <text x="110" y="111" className="text-[4px] fill-foreground">TYPE 05</text>
          </g>

          <g onClick={() => handleLocationClick('medicinal-garden')} className="cursor-pointer">
            <rect x="30" y="140" width="60" height="40" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'medicinal-garden'})} />
            <text x="60" y="155" className="text-[7px] font-bold fill-foreground text-center" textAnchor="middle">07</text>
            <text x="60" y="165" className="text-[5px] fill-foreground text-center" textAnchor="middle">MEDICINAL</text>
            <text x="60" y="172" className="text-[5px] fill-foreground text-center" textAnchor="middle">GARGEN</text>
          </g>

          <g onClick={() => handleLocationClick('admin-block-88')} className="cursor-pointer">
             <rect x="95" y="125" width="20" height="30" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'admin-block-88'})} />
            <text x="105" y="132" className="text-[4px] fill-foreground text-center" textAnchor="middle">88</text>
            <text x="105" y="140" className="text-[4px] fill-foreground text-center" textAnchor="middle">ADM</text>
            <text x="105" y="146" className="text-[4px] fill-foreground text-center" textAnchor="middle">BLOCK</text>
          </g>

          <g onClick={() => handleLocationClick('am-lab')} className="cursor-pointer">
            <rect x="90" y="190" width="50" height="40" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'am-lab'})} />
            <text x="115" y="205" className="text-[7px] font-bold text-center" textAnchor="middle">09</text>
            <text x="115" y="215" className="text-[6px] text-center" textAnchor="middle">AM.LAB</text>
          </g>

          <g onClick={() => handleLocationClick('audio-rium')} className="cursor-pointer">
            <rect x="40" y="195" width="40" height="25" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'audio-rium'})} />
            <text x="60" y="202" className="text-[4px] fill-foreground text-center" textAnchor="middle">16</text>
            <text x="60" y="208" className="text-[4px] fill-foreground text-center" textAnchor="middle">AUDYO</text>
            <text x="60" y="214" className="text-[4px] fill-foreground text-center" textAnchor="middle">RIUM</text>
          </g>

          <g onClick={() => handleLocationClick('girls-hostel')} className="cursor-pointer">
            <rect x="40" y="230" width="40" height="40" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'girls-hostel'})} />
            <rect x="60" y="235" width="15" height="15" className="fill-background stroke-primary stroke-1"/>
            <text x="45" y="238" className="text-[4px] fill-foreground">41</text>
            <text x="58" y="255" className="text-[5px] fill-foreground text-center" textAnchor="middle">GIRLS</text>
            <text x="58" y="262" className="text-[5px] fill-foreground text-center" textAnchor="middle">HOSTEL</text>
          </g>

           <g onClick={() => handleLocationClick('nit-boys-hostel')} className="cursor-pointer">
            <path d="M150 80 L180 80 L180 90 L170 90 L170 95 L160 95 L160 90 L150 90 Z" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'nit-boys-hostel'})} />
            <text x="155" y="87" className="text-[4px] fill-foreground">TY</text>
            <text x="165" y="92" className="text-[4px] fill-foreground text-center" textAnchor="middle">NIT BOYS HOSTEL</text>
          </g>

          <g onClick={() => handleLocationClick('ct-lab')} className="cursor-pointer">
            <path d="M150 115 L180 115 L180 130 L150 130 Z" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'ct-lab'})} />
            <text x="165" y="124" className="text-[6px] fill-foreground text-center" textAnchor="middle">CT LAB</text>
          </g>

          <g>
            <path d="M185 110 L195 110 L195 120 L185 120 Z" className="stroke-primary fill-transparent stroke-1" />
            <text x="190" y="113" className="text-[3px] fill-foreground rotate-90" textAnchor="middle">ELECT</text>
            <text x="190" y="117" className="text-[3px] fill-foreground rotate-90" textAnchor="middle">LAB</text>
          </g>

          <g onClick={() => handleLocationClick('cse-it-block')} className="cursor-pointer">
            <rect x="120" y="165" width="60" height="20" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'cse-it-block'})} />
            <text x="150" y="172" className="text-[5px] fill-foreground text-center" textAnchor="middle">C.S.E & I.T BLOCK</text>
            <text x="125" y="180" className="text-[5px] fill-foreground">15</text>
          </g>

           <g onClick={() => handleLocationClick('mech-auto-lab')} className="cursor-pointer">
            <rect x="210" y="80" width="40" height="20" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'mech-auto-lab'})} />
            <text x="230" y="88" className="text-[4px] fill-foreground text-center" textAnchor="middle">MECH</text>
            <text x="230" y="94" className="text-[4px] fill-foreground text-center" textAnchor="middle">AUTO (AB)</text>
          </g>

           <g onClick={() => handleLocationClick('ca-type-4')} className="cursor-pointer">
            <rect x="260" y="83" width="30" height="15" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'ca-type-4'})} />
            <text x="275" y="90" className="text-[4px] fill-foreground text-center" textAnchor="middle">CA</text>
            <text x="275" y="95" className="text-[4px] fill-foreground text-center" textAnchor="middle">TYPE IV</text>
          </g>

          <g onClick={() => handleLocationClick('ty-staff-room')} className="cursor-pointer">
             <rect x="150" y="190" width="30" height="20" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'ty-staff-room'})} />
             <text x="155" y="196" className="text-[4px] fill-foreground">TY</text>
             <text x="165" y="200" className="text-[4px] fill-foreground text-center" textAnchor="middle">STAFF ROOM</text>
             <text x="165" y="206" className="text-[3px] fill-foreground text-center" textAnchor="middle">REST ROOM</text>
          </g>

          <g onClick={() => handleLocationClick('library-38')} className="cursor-pointer">
            <rect x="160" y="220" width="40" height="20" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'library-38'})} />
            <text x="165" y="227" className="text-[5px] fill-foreground">38</text>
            <text x="180" y="232" className="text-[5px] fill-foreground text-center" textAnchor="middle">NT</text>
            <text x="180" y="237" className="text-[5px] fill-foreground text-center" textAnchor="middle">LIBRARY</text>
          </g>

          <g onClick={() => handleLocationClick('library-32')} className="cursor-pointer">
            <rect x="170" y="245" width="40" height="20" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'library-32'})} />
            <text x="190" y="260" className="text-[5px] fill-foreground text-center" textAnchor="middle">NT LIBRARY</text>
            <text x="203" y="252" className="text-[5px] fill-foreground">32</text>
          </g>

          <g onClick={() => handleLocationClick('filling-plumbing-shop')} className="cursor-pointer">
            <rect x="210" y="130" width="80" height="40" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'filling-plumbing-shop'})} />
            <text x="250" y="145" className="text-[5px] fill-foreground text-center" textAnchor="middle">CH</text>
            <text x="250" y="152" className="text-[5px] fill-foreground text-center" textAnchor="middle">FILLING & PLUMBING</text>
            <text x="250" y="159" className="text-[5px] fill-foreground text-center" textAnchor="middle">SHOP</text>
          </g>

          <g onClick={() => handleLocationClick('type-x')} className="cursor-pointer">
            <path d="M300 85 L320 85 L320 95 L300 95 Z" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'type-x'})} />
            <text x="310" y="92" className="text-[4px] fill-foreground text-center" textAnchor="middle">28 TYPE X</text>
          </g>

          <g onClick={() => handleLocationClick('type-iv-n')} className="cursor-pointer">
            <path d="M310 105 L340 105 L340 145 L330 145 L330 115 L310 115 Z" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'type-iv-n'})} />
            <text x="325" y="112" className="text-[5px] fill-foreground text-center" textAnchor="middle">TYPE IV</text>
            <text x="335" y="130" className="text-[5px] fill-foreground text-center" textAnchor="middle">N</text>
          </g>

          <g onClick={() => handleLocationClick('nit-admin-block-13')} className="cursor-pointer">
             <path d="M220 200 L260 200 L260 220 L250 230 L220 230 Z" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'nit-admin-block-13'})} />
             <text x="225" y="208" className="text-[5px] fill-foreground">13</text>
             <text x="240" y="215" className="text-[5px] fill-foreground text-center" textAnchor="middle">NIT ADMINSTRATIVE</text>
             <text x="240" y="221" className="text-[5px] fill-foreground text-center" textAnchor="middle">BLOCK</text>
          </g>

          <g>
            <rect x="225" y="235" width="20" height="20" className="stroke-primary fill-transparent stroke-1" />
            <text x="215" y="245" className="text-[5px] fill-foreground">3T</text>
          </g>

          <g onClick={() => handleLocationClick('nit-admin-block')} className="cursor-pointer">
            <path d="M280 230 L350 230 L350 250 L340 260 L280 260 Z" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'nit-admin-block'})} />
            <text x="315" y="242" className="text-[5px] fill-foreground text-center" textAnchor="middle">NIT</text>
            <text x="315" y="249" className="text-[5px] fill-foreground text-center" textAnchor="middle">ADMINITRATIVE</text>
            <text x="315" y="255" className="text-[5px] fill-foreground text-center" textAnchor="middle">BLOCK</text>
          </g>

          <g onClick={() => handleLocationClick('type-31')} className="cursor-pointer">
            <rect x="350" y="210" width="20" height="20" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'type-31'})} />
            <text x="360" y="222" className="text-[5px] fill-foreground text-center" textAnchor="middle">31 TIPE</text>
          </g>

          <g onClick={() => handleLocationClick('staff-room')} className="cursor-pointer">
            <path d="M280 180 L340 180 L340 190 L330 200 L290 200 L280 190 Z" className={cn('stroke-primary fill-transparent stroke-1 hover:fill-accent/20', {'fill-accent/50': selected === 'staff-room'})} />
             <text x="310" y="188" className="text-[5px] fill-foreground text-center" textAnchor="middle">STAFF ROOM</text>
             <text x="310" y="195" className="text-[4px] fill-foreground text-center" textAnchor="middle">S NG</text>
          </g>
        </svg>
      </CardContent>
    </Card>
  );
}
