'use client'

import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import InviteSection from '@/components/InviteSection';
import DateSection from '@/components/DateSection';
import VenueSection from '@/components/VenueSection';
import ProgramSection from '@/components/ProgramSection';
import RSVPSection from '@/components/RSVPSection';
import HostsSection from '@/components/HostsSection';
import CountdownSection from '@/components/CountdownSection';
import MusicPlayer from '@/components/MusicPlayer';
import AdminPanel from '@/components/AdminPanel';
import FloralDivider from '@/components/FloralDivider';
import OrnekDivider from '@/components/OrnekDivider';
import ScrollRevealSection from '@/components/ScrollRevealSection';

export default function Home() {
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Warm up database connection on page load
  useEffect(() => {
    fetch('/api/warmup')
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          console.log('✅ Database connection warmed up');
        }
      })
      .catch(err => {
        console.log('⚠️ Database warmup failed:', err);
      });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        setShowAdminPanel(true);
      }
      if (e.key === 'Escape') {
        setShowAdminPanel(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Desktop: Paper card effect */}
      <div className="md:min-h-screen md:py-6" style={{ background: '#E8E0D6' }}>
        <div
          className="md:max-w-[480px] md:mx-auto md:rounded-lg overflow-hidden"
          style={{
            background: 'var(--bg)',
            boxShadow: '0 12px 60px rgba(60,40,20,0.10)',
            minHeight: '100vh',
            position: 'relative'
          }}
        >
          {/* Controls */}
          <MusicPlayer />

          {/* Main Content */}
          <main>
            <HeroSection />

            {/* Content sections with padding */}
            <div style={{ padding: '24px 24px 40px' }}>
              <ScrollRevealSection>
                <InviteSection />
              </ScrollRevealSection>

              <ScrollRevealSection delay={100}>
                <DateSection />
              </ScrollRevealSection>

              <ScrollRevealSection delay={200}>
                <VenueSection />
              </ScrollRevealSection>

              <ScrollRevealSection delay={300}>
                <ProgramSection />
              </ScrollRevealSection>

              <ScrollRevealSection delay={400}>
                <div className="py-6">
                  <OrnekDivider width={280} />
                </div>
              </ScrollRevealSection>

              <ScrollRevealSection delay={500}>
                <RSVPSection />
              </ScrollRevealSection>

              <ScrollRevealSection delay={600}>
                <HostsSection />
              </ScrollRevealSection>

              <ScrollRevealSection delay={700}>
                {/* Spacer + Floral divider before countdown */}
                <div style={{ height: 14 }} />
                <FloralDivider width={280} />
              </ScrollRevealSection>

              <ScrollRevealSection delay={800}>
                <CountdownSection />
              </ScrollRevealSection>
            </div>
          </main>
        </div>
      </div>

      {/* Admin Panel */}
      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
      />
    </>
  );
}
