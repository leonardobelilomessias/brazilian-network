// pages/index.js
'use client'
import React from 'react';
import { Footer } from 'react-day-picker';
import EventsSection from './EventsSection';
import FeaturedBanner from './FeaturedBanner';
import RecentQuestionsSection from './RecentQuestionsSection';
import TopTipsSection from './TopTipsSection';
import VideosSection from './VideosSection';


export  function Feed() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 bg-gray-50">
      {/* Main content area only */}
      <FeaturedBanner />
      <EventsSection />
      <TopTipsSection />
      <VideosSection />
      <RecentQuestionsSection />
      
    </div>
  );
}

// components/FeaturedBanner.js


// components/EventsSection.js


// components/TopTipsSection.js


// components/VideosSection.js


// components/RecentQuestionsSection.js


// components/Footer.js
