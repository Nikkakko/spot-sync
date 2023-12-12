import * as React from 'react';

interface SiteHeaderProps {}

const SiteHeader: React.FC<SiteHeaderProps> = ({}) => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background'>
      SiteHeader
    </header>
  );
};

export default SiteHeader;
