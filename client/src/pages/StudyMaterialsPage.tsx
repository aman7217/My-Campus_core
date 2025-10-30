import { useState } from "react";
import { StudyMaterialCard } from "@/components/StudyMaterialCard";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function StudyMaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // todo: remove mock functionality
  const materials = [
    {
      id: '1',
      title: 'Java Programming Complete Course - From Basics to Advanced',
      platform: 'YouTube',
      instructor: 'Code with Harry',
      duration: '12h 30m',
      rating: 4.8,
      isFree: true,
      category: 'Java',
      url: 'https://youtube.com',
    },
    {
      id: '2',
      title: 'E-Commerce Web Development with MERN Stack',
      platform: 'Udemy',
      instructor: 'Angela Yu',
      duration: '45h',
      rating: 4.6,
      isFree: false,
      price: '₹499',
      category: 'E-COMM',
      url: 'https://udemy.com',
    },
    {
      id: '3',
      title: 'Microprocessor 8086 Architecture and Programming',
      platform: 'Coursera',
      instructor: 'MIT OpenCourseWare',
      duration: '8 weeks',
      rating: 4.7,
      isFree: true,
      category: 'MP',
      url: 'https://coursera.org',
    },
    {
      id: '4',
      title: 'Software Engineering Principles and Practices',
      platform: 'edX',
      instructor: 'IIT Bombay',
      duration: '6 weeks',
      rating: 4.5,
      isFree: true,
      category: 'SE',
      url: 'https://edx.org',
    },
    {
      id: '5',
      title: 'Advanced Java Programming and Design Patterns',
      platform: 'Udemy',
      instructor: 'Tim Buchalka',
      duration: '30h',
      rating: 4.7,
      isFree: false,
      price: '₹799',
      category: 'Java',
      url: 'https://udemy.com',
    },
    {
      id: '6',
      title: 'Algorithm Analysis and Design - Complete Guide',
      platform: 'YouTube',
      instructor: 'Abdul Bari',
      duration: '15h',
      rating: 4.9,
      isFree: true,
      category: 'AAD',
      url: 'https://youtube.com',
    },
  ];

  const categories = ['All', 'Java', 'E-COMM', 'MP', 'SE', 'AAD', 'ADD'];

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.platform.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || material.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Study Materials</h1>
        <p className="text-muted-foreground">
          Curated courses and resources from top educational platforms
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-materials"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer hover-elevate"
            onClick={() => setSelectedCategory(category === 'All' ? null : category)}
            data-testid={`filter-${category.toLowerCase()}`}
          >
            {category}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaterials.map((material) => (
          <StudyMaterialCard key={material.id} {...material} />
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No materials found matching your criteria.</p>
        </div>
      )}

      <ChatbotWidget />
    </div>
  );
}
