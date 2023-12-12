import SectionHero from '@/components/sections/SectionHero';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex flex-1 flex-col'>
      <div className='bg-section-pattern3 flex flex-1'>
        <SectionHero />
      </div>
    </main>
  );
}
