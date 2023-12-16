import * as React from 'react';
import ArtistProfileCard from '@/components/ArtistProfileCard';
import UserForm from '@/components/UserForm';
import { Icons } from '@/components/icons';

import { getToken } from '@/lib/spotify';
import Link from 'next/link';

interface OnBoardingProps {}

const OnboardingPage: React.FC<OnBoardingProps> = async () => {
  const token = await getToken();

  return (
    <div className='container max-w-2xl py-10 h-screen flex flex-col j'>
      <div
        className='flex flex-col space-y-2 max-w-[250px] 
        md:max-w-xs lg:max-w-sm 
        '
      >
        <Link href='/' prefetch={false}>
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

      <ArtistProfileCard />
      <UserForm token={token.access_token} />
    </div>
  );
};

export default OnboardingPage;
