
import React from 'react';
import Hero from '@/features/components/Hero';
import FeaturedProducts from '@/features/components/FeaturedProducts';
import Services from '@/features/components/Services';
import WhyUs from '@/features/components/WhyUs';
import Projects from '@/features/components/Projects';
import { Testimonials } from '@/features/components/Testimonials';
import Process from '@/features/components/Process';
import { Footer } from '@/features/components/Footer';


// Main App Component
export default function App() {
    return (
        <div className="min-h-screen">
            <Hero />
            <FeaturedProducts />
            <Services />
            <WhyUs />
            <Projects />
            <Process />
            <Testimonials />
            <Footer />
        </div>
    );
}