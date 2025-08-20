"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Button } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { Listing } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useAlert } from '@/context/AlertContext';

interface ListingGridProps {
  status?: number; // 1: sale, 2: sold
}

const ListingGrid: React.FC<ListingGridProps> = ({ status = 1 }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const { currentUser } = useAuth();
  const { showAlert } = useAlert();

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

  const handleDeleteClick = async (listingId: string) => {
    if (!currentUser) {
      alert('You must be logged in to delete a listing.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(`/api/listings?id=${listingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setListings(listings.filter(listing => listing.id !== listingId));
        showAlert('Listing deleted successfully!');
      } else {
        const data = await res.json();
        alert(`Failed to delete listing: ${data.error || res.statusText}`);
      }
    } catch (error) {
      console.error('An error occurred during deletion:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <Grid2
      container
      rowSpacing={3}
      columnSpacing={{ xs: 0, sm: 3 }}
    >
      {listings.map((item) => (
        <Grid2 size={{ xs: 12, sm:6, md: 4 }} key={item.id}>
          <Card sx={{ position: 'relative' }}>
            {currentUser?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
              <Button
                onClick={() => handleDeleteClick(item.id)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 2,
                  minWidth: 'auto',
                  width: 28,
                  height: 28,
                  padding: 0,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: 'white',
                  },
                }}
              >
                x
              </Button>
            )}
            <CardActionArea>
              <CardMedia
                component="img"
                image={item.photo}
                alt={item.address}
                sx={{
                  height: '340px', 
                  width: '100%', 
                  objectFit: 'cover',
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