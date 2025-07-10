
import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface Item {
  id: number;
  name: string;
}

const ListingGrid: React.FC = () => {
  // ListingGrid
  const items: Item[] = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
  }));

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {items.map((item, index) => (
        <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="340"
                image="https://hpb-2024.51img.ca/C11893939-0.jpg"
                alt="green iguana"
                sx={{
                  height: '340px',
                  transition: 'transform 0.3s ease', // Smooth transition for zoom
                  '&:hover': {
                    transform: 'scale(1.05)', // Scale the image slightly on hover
                  },
                }}
              />
              <CardContent>
                <div className='flex gap-3 items-center mb-1'>
                  <div className='text-xl'>
                    $980,000
                  </div>
                  <div className='px-2 bg-[#b39f68] rounded-sm text-sm h-[fit-content]'>For Sale</div>
                </div>
                <div className='truncate text-sm mb-1' title='76 Amanda Driveasdklfjasdlfjalksdjfkasldjf, Toronto, Ontario M1V 1C9'>
                  76 Amanda Driveasdklfjasdlfjalksdjfkasldjf, Toronto, Ontario M1V 1C9
                </div>
                <div className='flex gap-4'>

                  <div className='flex gap-2 items-center'>
                    <i className='iconfont icon-bed-room h-[20px]' style={{ fontSize: '12px' }}></i><div className=' text-[12px] leading-[14px]'>2</div>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <i className='iconfont icon-wash-room h-[20px]' style={{ fontSize: '12px' }}></i><div className=' text-[12px] leading-[14px]'>1</div>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <i className='iconfont icon-car h-[20px]' style={{ fontSize: '12px' }}></i><div className=' text-[12px] leading-[14px]'>2</div>
                  </div>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListingGrid;
