'use client';
import Link from 'next/link';
import * as React from 'react';
import { Button, buttonVariants } from '../ui/button';
import { SignInButton, useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import { Icons } from '../icons';
import FlickeringText from '../FlickeringText';

interface SiteHeaderProps {}

const SiteHeader: React.FC<SiteHeaderProps> = ({}) => {
  const title = 'Spot-Sync';
  const { user, isSignedIn } = useUser();

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background h-16'>
      <div className='flex items-center justify-between h-full min-w-full px-4 max-w-7xl'>
        <Link href='/faq' className='hover:text-gray-600 font-bold'>
          WHAT?
        </Link>

        <FlickeringText text={title} />

        <Link
          className={cn('font-bold', buttonVariants({ variant: 'ghost' }))}
          href='/onboarding'
        >
          {isSignedIn ? 'My Site' : 'Login'}
          <Icons.arrowRight className='w-4 h-4 ml-2 ' />
        </Link>
      </div>
    </header>
  );
};

export default SiteHeader;
