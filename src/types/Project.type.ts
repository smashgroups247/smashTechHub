// src/types/Project.ts
import { ComponentType, SVGProps } from "react";

export interface Project {
  id: number;
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>; // Lucide icons
  description: string;
  duration: string;
  tags: string[];
  category: "web" | "mobile" | "all";
  bgColor: string;
  textColor: string;
  features?: string[];
}
