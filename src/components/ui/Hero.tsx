export default function Hero({ header, paragraph }: { header: string; paragraph: string }) {
    return (
        <div className="">
            <section className="relative bg-black text-white pt-32 pb-34 px-6">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-transparent"></div>
                <div className="relative max-w-4xl mx-auto text-center">
                    <h1 className="text-6xl md:text-6xl font-semibold mb-6">{header}</h1>
                    <p className="text-white/70 text-lg md:text-medium mb-8 max-w-3xl mx-auto leading-relaxed">
                        {paragraph}
                    </p>

                </div>
            </section>

        </div>
    );
}