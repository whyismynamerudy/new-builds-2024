import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Image from 'next/image';
import { MarkerDetails } from '@/app/page';
import { MapPin, Calendar, Compass, ArrowUpRight } from 'lucide-react';

interface MapSheetProps {
  isOpen: boolean;
  onClose: () => void;
  content: MarkerDetails;
}

export default function MapSheet({ isOpen, onClose, content }: MapSheetProps) {
  const {
    longitude,
    latitude,
    heading,
    pitch,
    fov,
    image_url,
    description,
    captured_at,
  } = content;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='w-full sm:max-w-lg bg-gray-900 text-gray-100 border-gray-800'>
        <SheetHeader className='space-y-4'>
          <SheetTitle className='text-2xl font-bold text-gray-100'>
            Location Details
          </SheetTitle>
          <div className='relative aspect-video w-full overflow-hidden rounded-lg'>
            <Image
              src={image_url}
              alt='Street View Image'
              layout='fill'
              objectFit='cover'
              className='transition-transform duration-300 hover:scale-105'
            />
          </div>
        </SheetHeader>
        <div className='mt-6 space-y-4'>
          <SheetDescription className='text-gray-300'>
            {description}
          </SheetDescription>
          <Separator className='bg-gray-700' />
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div className='flex items-center space-x-2'>
              <MapPin className='w-4 h-4 text-gray-400' />
              <span>
                {latitude.toFixed(6)}, {longitude.toFixed(6)}
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <Calendar className='w-4 h-4 text-gray-400' />
              <span>{formatDate(captured_at)}</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Compass className='w-4 h-4 text-gray-400' />
              <span>Heading: {heading.toFixed(2)}°</span>
            </div>
            <div className='flex items-center space-x-2'>
              <ArrowUpRight className='w-4 h-4 text-gray-400' />
              <span>Pitch: {pitch.toFixed(2)}°</span>
            </div>
          </div>
        </div>
        <SheetFooter className='mt-6'>
          <Button
            asChild
            className='w-full bg-[#f7fafc] hover:bg-[#e2e8f0] text-[#1a202c] font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#38a89d] focus:ring-opacity-50'
          >
            <Link
              href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${latitude},${longitude}&heading=${heading}&pitch=${pitch}&fov=${fov}`}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center justify-center space-x-2'
            >
              <span>Open in Street View</span>
              <ArrowUpRight className='w-4 h-4' />
            </Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
