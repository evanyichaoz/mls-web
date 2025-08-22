"use client"

import { useEffect, useRef, useState } from 'react';
import '@splidejs/splide/dist/css/splide.min.css';
import Splide from '@splidejs/splide';
import { Button } from '@mui/material';
import ContactDialog from './ContactDialog';
import { useLanguage } from '@/context/LanguageContext';

const Carousel = () => {
    const splideRef = useRef(null);
    const [openDialog, setOpenDialog] = useState(false);
    const { t } = useLanguage();

    const images = [
        'https://ik.imagekit.io/mlsbase/pexels-leorossatti-2598638.jpg?updatedAt=1734381492500',
        'https://ik.imagekit.io/mlsbase/pexels-quirva-4030908.jpg?updatedAt=1734381402803',
        'https://ik.imagekit.io/mlsbase/pexels-fotoaibe-1571459.jpg?updatedAt=1734381402109'
    ];

    useEffect(() => {
        if (splideRef.current) {
            let splideInstance = new Splide(splideRef.current, {
                type: 'fade',
                gap: '1rem',
                pagination: false,
                arrows: false,
                heightRatio: 0.5,
                autoplay: true,
                loop: true,
                interval: 3000,
            }).mount();

            return () => {
                splideInstance.destroy();
            };
        }
    }, []);

    return (
        <>
            <div ref={splideRef} className="splide ">
                <div className="splide__track">
                    <ul className="splide__list">
                        {images.map((src, index) => (
                            <li key={index} className="splide__slide">
                                <div className='h-full w-full relative'>
                                    <img className='max-w-full h-auto object-contain' src={src} alt={`Slide ${index + 1}`} />
                                    <div className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-40 z-10"></div>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-white md:text-2xl lg:text-4xl font-bold flex flex-col justify-center items-center gap-3">
                                        <div>{t('what.is.your.home.worth')}</div>
                                        <div className='text-sm lg:text-base'>{t('find.out.worth')}</div>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                color: 'white',
                                                borderColor: 'white',
                                                '&:hover': {
                                                    borderColor: 'white',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                                }
                                            }}
                                            onClick={() => setOpenDialog(true)}
                                        >
                                            {t('get.started')}
                                        </Button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <ContactDialog open={openDialog} onClose={() => setOpenDialog(false)} />
        </>
    );
};

export default Carousel;