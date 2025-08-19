"use client"
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import ContactDialog from "./ContactDialog";

const MidContectSection = () => {
  const [inViewLeft, setInViewLeft] = useState(false);
  const [inViewRight, setInViewRight] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const observerLeft = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setInViewLeft(true);
        }
      });
    }, { threshold: 0.5 }); // Trigger when 50% of the element is in view

    const observerRight = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setInViewRight(true);
        }
      });
    }, { threshold: 0.5 });

    const targetLeft = document.querySelector("#slide-left");
    const targetRight = document.querySelector("#slide-right");

    if (targetLeft) observerLeft.observe(targetLeft);
    if (targetRight) observerRight.observe(targetRight);

    return () => {
      if (targetLeft) observerLeft.unobserve(targetLeft);
      if (targetRight) observerRight.unobserve(targetRight);
    };
  }, []);

  return (
    <div className="h-[350px] w-full bg-center bg-no-repeat bg-cover bg-fixed" style={{
      backgroundImage: "url('https://ik.imagekit.io/mlsbase/pexels-pixabay-258154.jpg?updatedAt=1734395669134')"
    }}>
      
      <div className="h-full w-full bg-black bg-opacity-50">
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div
            id="slide-left"
            className={`text-4xl mb-1 text-white font-bold transition-all ${inViewLeft ? "slide-left" : "opacity-0"
              }`}
          >
            REAL ESTATE DONE RIGHT
          </div>
          <div
            id="slide-right"
            className={`text-lg text-white mb-4 transition-all ${inViewRight ? "slide-right" : "opacity-0"
              }`}
          >
            ARE YOU A FIRST TIME HOME BUYER? ARE YOU LOOKING TO SELL?
          </div>
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
            CONTACT
          </Button>
        </div>
      </div>
      <ContactDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </div>
  );
};

export default MidContectSection;
