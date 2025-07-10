import React from 'react'
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined';
export default function Loading() {
  return (
    <div className='flex justify-center item-center flex-1 flex-col'>
      <RotateRightOutlinedIcon className="animate-spin"></RotateRightOutlinedIcon>
    </div>
  )
}

