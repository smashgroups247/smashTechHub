import React from "react";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  name: string;
  desc: string;
  color: string;
  imageUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, desc, color, imageUrl }) => {
  return (
    <div className="bg-gray-800 rounded-3xl overflow-hidden hover:scale-105 transition-transform">
      {/* Image / Color Banner */}
      <div className={`${color} h-48 flex items-center justify-center`}>
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-400 mb-4">{desc}</p>
        <button className="text-orange-500 hover:text-orange-400 font-medium flex items-center gap-2">
          View Case Study <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
