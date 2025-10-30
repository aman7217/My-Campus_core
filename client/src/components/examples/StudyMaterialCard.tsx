import { StudyMaterialCard } from '../StudyMaterialCard';

export default function StudyMaterialCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <StudyMaterialCard
        title="Java Programming Complete Course"
        platform="YouTube"
        instructor="Code with Harry"
        duration="12h 30m"
        rating={4.8}
        isFree={true}
        category="Java"
        url="https://youtube.com"
      />
      <StudyMaterialCard
        title="E-Commerce Web Development"
        platform="Udemy"
        instructor="Angela Yu"
        duration="45h"
        rating={4.6}
        isFree={false}
        price="₹499"
        category="E-COMM"
        url="https://udemy.com"
      />
      <StudyMaterialCard
        title="Microprocessor Fundamentals"
        platform="Coursera"
        instructor="MIT OpenCourseWare"
        duration="8 weeks"
        rating={4.7}
        isFree={true}
        category="MP"
        url="https://coursera.org"
      />
    </div>
  );
}
