// src/features/homepage/components/Stats.tsx
export function Stats() {
  const stats = [
    {
      value: '30+',
      label: 'Completed Projects',
      description: 'With over 5 years of experience, Smashtechhub energetic, and vibrant team keeps offering creative and industry knowledge expertise.'
    },
    {
      value: '10+',
      label: 'Client Base',
      description: 'With over 5 years of experience, Smashtechhub energetic, and vibrant team keeps offering creative and industry knowledge expertise.'
    },
    {
      value: '98%',
      label: 'Client Satisfaction',
      description: 'With over 5 years of experience, Smashtechhub energetic, and vibrant team keeps offering creative and industry knowledge expertise.'
    }
  ]

  return (
    <section className="py-20 bg-[#FFF8F5]">
      <div className="max-w-screen mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-4">
              {/* Large Number */}
              <div className="text-7xl md:text-8xl font-bold text-orange-500 leading-none">
                {stat.value}
              </div>

              {/* Horizontal Line */}
              <div className="w-full h-px bg-gray-300"></div>

              {/* Label */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}