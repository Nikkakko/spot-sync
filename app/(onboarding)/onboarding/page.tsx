import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import * as React from 'react';

interface OnBoardingProps {}

const OnboardingPage: React.FC<OnBoardingProps> = ({}) => {
  return (
    <div className='container max-w-lg py-10 h-screen flex flex-col justify-between'>
      <div
        className='flex flex-col space-y-2 max-w-[250px] 
        md:max-w-xs lg:max-w-sm 
        '
      >
        <Link href='/'>
          <Icons.arrowLeft className='w-6 h-6 hover:text-gray-400 transition-all' />
        </Link>
        <h1
          className='
          text-5xl
          font-bold
          text-gray-900
          leading-none
          tracking-tight
          sm:text-2xl
          lg:text-4xl
          
        '
        >
          Whats your artist name?
        </h1>
        <p
          className='
          text-md
          font-bold
          text-gray-600
          tracking-tight
          sm:text-md
          lg:text-2xl
          '
        >
          We are going to use it to search for your profile on Spotify...
        </p>
      </div>

      <form className='flex flex-col space-y-2'>
        <Input placeholder='e.g KayaKata' className='shadow-md p-6' />
        <Button variant='default' className='shadow-md p-6'>
          Next
        </Button>
      </form>
    </div>
  );
};

export default OnboardingPage;
