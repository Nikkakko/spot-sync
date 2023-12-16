'use client';
import { useUserInfoStore } from '@/hooks/user-info';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import * as React from 'react';

interface ArtistProfileCardProps {}

const ArtistProfileCard: React.FC<ArtistProfileCardProps> = ({}) => {
  const { artists } = useUserInfoStore();
  const [isSelected, setIsSelected] = React.useState<string | null>(null);

  const getArtists = artists.map(artist => {
    return artist.items?.slice(0, 3);
  });

  React.useEffect(() => {
    //set the first artist as selected
    setIsSelected(getArtists[0][0]?.id);
  }, [isSelected, getArtists]);

  return (
    <div className='flex flex-col flex-1 my-8'>
      <div
        className='grid grid-rows-3  grid-flow-col  gap-2
        md:grid-rows-1 md:grid-cols-3 md:grid-flow-row'
      >
        {getArtists[0]?.map(artist => (
          <div
            key={artist.id}
            className={cn(
              'flex flex-col p-4 md:max-w-[152px]  rounded-2xl shadow-md bg-gray-100 items-start md:items-center cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl',
              isSelected === artist.id && 'border-2 border-gray-900'
            )}
            onClick={() => setIsSelected(artist.id)}
          >
            <div className='flex items-center md:flex-col '>
              <div className='relative w-12 h-12   md:w-[100px] md:h-[100px] rounded-full'>
                <Image
                  src={artist.images[0].url}
                  alt={artist.name}
                  layout='fill'
                  objectFit='cover'
                  className='rounded-full '
                  priority
                />
              </div>

              <div className='flex flex-col flex-1 p-2'>
                <h1 className='text-sm font-bold text-gray-900'>
                  {artist.name}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistProfileCard;
