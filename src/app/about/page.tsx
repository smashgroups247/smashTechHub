
import React from 'react';

import { Footer } from '@/features/components/Footer';
import ProjectCard from '@/features/components/Portfolio/ProjectCard';
import Hero from '@/features/components/about/hero';
import OurJourney from '@/features/components/about/OurJourney';
import OurValues from '@/features/components/about/OurValues';
import { Team } from '@/features/components/about/Team';
import { Stats } from '@/features/components/about/Stats';


// Main App Component
export default function Portfolio() {
    return (
        <div className="min-h-screen">
            <Hero />
            <OurJourney />
            <OurValues />
            <Team />
            <Stats />
        </div>
    );
}