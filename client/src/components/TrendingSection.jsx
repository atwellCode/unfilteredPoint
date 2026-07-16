import React from 'react';

const TrendingSection = () => {
    const mainTrending = {
        tag: "Trending",
        title: "Benzyo global operations hit milestone user interaction rates this week.",
        desc: "Our decentralized network management interface reports seamless scale across 24 corporate sectors globally.",
        date: "15 July 2026",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80"
    };

    const sideTrending = [
        {
            id: 1,
            tag: "News",
            title: "Benzyo introduces internal cloud optimization protocols.",
            date: "14 July 2026",
            image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: 2,
            tag: "News",
            title: "Product updates: Live reporting filters deploy today.",
            date: "13 July 2026",
            image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&auto=format&fit=crop&q=80"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
            <h2 className="text-center text-4xl font-serif font-bold text-gray-900 mb-8 tracking-tight">
                Todays <br /> Trending News
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Big Card */}
                <div className="lg:col-span-2 relative rounded-3xl overflow-hidden aspect-[16/10] bg-gray-900 group shadow-md">
                    <img
                        src={mainTrending.image}
                        alt="Trending Main"
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 md:p-8 flex flex-col justify-end">
                        <span className="bg-[#FF0000] text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">
                            {mainTrending.tag}
                        </span>
                        <h3 className="text-xl md:text-3xl font-bold text-white leading-tight mb-2">
                            {mainTrending.title}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-300 mb-4 line-clamp-2 max-w-2xl">
                            {mainTrending.desc}
                        </p>
                        <div className="flex justify-between items-center text-xs font-semibold">
                            <span className="text-red-500">{mainTrending.date}</span>
                            <span className="text-red-500 uppercase tracking-widest">Trending</span>
                        </div>
                    </div>
                </div>

                {/* Right Side Two Small Cards */}
                <div className="flex flex-col gap-6 justify-between">
                    {sideTrending.map((item) => (
                        <div key={item.id} className="relative rounded-3xl overflow-hidden flex-1 min-h-[180px] bg-gray-900 group shadow-md">
                            <img
                                src={item.image}
                                alt="Trending Side"
                                className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 flex flex-col justify-end">
                                <span className="bg-[#FF0000] text-white text-[10px] font-bold px-2 py-0.5 rounded-full w-fit mb-2">
                                    {item.tag}
                                </span>
                                <h4 className="text-sm md:text-base font-bold text-white leading-snug mb-3 line-clamp-2">
                                    {item.title}
                                </h4>
                                <div className="flex justify-between items-center text-[11px] font-semibold">
                                    <span className="text-red-500">{item.date}</span>
                                    <span className="text-red-500 uppercase tracking-wider">Trending</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dashed Separator Line exactly as per drawing */}
            <hr className="border-t-2 border-dashed border-gray-300 mt-12 w-full" />
        </div>
    );
};

export default TrendingSection;