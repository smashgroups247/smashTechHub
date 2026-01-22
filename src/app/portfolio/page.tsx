
import React from 'react';

import { Footer } from '@/features/components/Footer';
import Hero from '@/features/components/Portfolio/Hero';
import ProjectCard from '@/features/components/Portfolio/ProjectCard';


// Main App Component
export default function Portfolio() {
    return (
        <div className="min-h-screen">
            <Hero />
            <ProjectCard />
        </div>
    );
}