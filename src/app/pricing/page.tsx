import Hero from '@/components/ui/Hero'
import Plan from '@/components/ui/Plan'
import FAQ from '@/components/ui/FAQ'
// Pricing Component
export default function Portfolio() {
    return (
        <div className="">
            <Hero header="Pricing" paragraph="Whether you're launching a startup, scaling your digital presence, or building a custom product from scratch, our pricing plans are crafted to give you clarity, value, and flexibility." />
            <Plan />
            <FAQ />
        </div>
    );
}