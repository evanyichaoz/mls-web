"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { Listing } from '@/types';

interface ListingGridProps {
  status?: number; // 1: sale, 2: sold
}

const ListingGrid: React.FC<ListingGridProps> = ({ status = 1 }) => {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    fetch(`/api/listings?status=${status}`)
      .then(res => res.json())
      .then(data => {
        setListings(data);
        console.log('Listings from API:', data);
      })
      .catch(err => {
        console.error('Failed to fetch listings:', err);
      });
  }, []);

  return (
    <Grid2
      container
      spacing={3}
      justifyContent={listings.length === 1 ? "flex-start" : "flex-start"}
    >
      {listings.map((item) => (
        <Grid2 xs={12} sm={6} md={4} key={item.id}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="340"
                image={item.photo}
                alt={item.address}
                sx={{
                  height: '340px',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
              <CardContent>
                <div className='flex gap-3 items-center mb-1'>
                  <div className='text-xl'>
                    {item.mlsNum}
                  </div>
                  <div className='px-2 bg-[#b39f68] rounded-sm text-sm h-[fit-content]'>
                    {item.status === 1 ? 'For Sale' : 'Sold'}
                  </div>
                </div>
                <div className='truncate text-sm mb-1' title={`${item.address}, ${item.city}, ${item.province} ${item.postCode}`}>
                  {item.address}, {item.city}, {item.province} {item.postCode}
                </div>
                <div className='flex gap-4'>
                  <div className='flex gap-2 items-center'>
                    <i className='iconfont icon-bed-room h-[20px]' style={{ fontSize: '12px' }}></i>
                    <div className='text-[12px] leading-[14px]'>{item.bedRoom}</div>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <i className='iconfont icon-wash-room h-[20px]' style={{ fontSize: '12px' }}></i>
                    <div className='text-[12px] leading-[14px]'>{item.bathRoom}</div>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <i className='iconfont icon-car h-[20px]' style={{ fontSize: '12px' }}></i>
                    <div className='text-[12px] leading-[14px]'>{item.parking}</div>
                  </div>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default ListingGrid;