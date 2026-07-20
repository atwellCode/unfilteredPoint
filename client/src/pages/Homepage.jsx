import React from 'react';
import Marquee from '../Components/Marquee';
import TrendingSection from '../Components/TrendingSection';
import MainFeedSection from '../Components/MainFeedSection';
import NewsMarquee from '../components/NewsMarquee';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">

      <Marquee />
      <TrendingSection />
      <NewsMarquee/>
      <MainFeedSection />
      <Marquee/>
      
    </div>
  );
};

export default Homepage;
