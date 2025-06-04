// This is the landing page.

import React from 'react';
import CallToActionSection from './CallToActionSection';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import DiscoverSection from './DiscoverSection';
import FooterSection from './FooterSection';

const Landing = () => {
  return (
    <div>
        <HeroSection />
        <FeaturesSection />
        <DiscoverSection />
        <CallToActionSection/>
        <FooterSection/>
    </div>
    
  )
}

export default Landing