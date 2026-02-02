import ContactForm from "@/features/components/contact/ContactForm";
import Hero from "@/features/components/contact/Hero";

// Main App Component
export default function Portfolio() {
    return (
        <div className="min-h-screen">
            <Hero />
            <ContactForm />
        </div>
    );
}