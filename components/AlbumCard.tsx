import { Album } from '@prisma/client';
import Image from 'next/image';
import * as React from 'react';
import * as dateFns from 'date-fns';
import Link from 'next/link';

interface AlbumCardProps {
  album: Album;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  return (
    <Link href={album.spotifyUrl} target='_blank'>
      <div
        key={album.id}
        className='flex flex-col
        
    '
      >
        <div
          className='flex flex-col items-center rounded-lg border-4 border-white transition duration-200 ease-in-out transform hover:scale-105 
            opacity-90 hover:opacity-100 overflow-hidden
        '
        >
          <Image src={album.image} alt={album.name} width={200} height={200} />
        </div>
        <div className='flex flex-col'>
          <p className='text-sm font-bold mt-2 capitalize'>{album.name}</p>
          <div className='flex items-center'>
            <p className='text-sm text-gray-400 font-semibold'>
              {dateFns.format(album.releaseDate, 'yyyy')}
            </p>
            <span className='mx-1 text-gray-400'>•</span>
            <p className='text-sm text-gray-400 capitalize font-semibold'>
              {album.albumType}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AlbumCard;
