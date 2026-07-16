import React from 'react';

const Marquee = () => {
    return (
        <div className="bg-[#FF0000] text-white py-3.5 overflow-hidden relative w-full font-bold italic tracking-wide text-lg border-b border-red-700 shadow-sm select-none">
            <div className="flex w-max animate-marquee gap-16">
                {/* Original content */}
                <div className="flex gap-16 shrink-0">
                    <span>⚠️ BREAKING NEWS: Benzyo launches fully functional Instagram-style enterprise dashboard portal layout updates...</span>
                    <span>⚠️ BREAKING NEWS: Benzyo launches fully functional Instagram-style enterprise dashboard portal layout updates...</span>
                </div>
                {/* Cloned content for seamless infinite looping */}
                <div className="flex gap-16 shrink-0" aria-hidden="true">
                    <span>⚠️ BREAKING NEWS: Benzyo launches fully functional Instagram-style enterprise dashboard portal layout updates...</span>
                    <span>⚠️ BREAKING NEWS: Benzyo launches fully functional Instagram-style enterprise dashboard portal layout updates...</span>
                </div>
            </div>
        </div>
    );
};

export default Marquee;