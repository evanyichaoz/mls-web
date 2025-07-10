import Carousel from "@/components/Carousel";
import ListingGrid from "@/components/ListingGrid";
import MidContectSection from "@/components/MidContectSection";
import React from "react";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col items-center sm:items-start pb-10">
        <Carousel />
        <div className="flex w-full gap-[30px] py-[50px] bg-[#b39f68]">
          <div className="flex mx-auto px-[16px] flex-col md:flex-row">
            <div className="w-full md:w-1/2 px-[16px] flex justify-center md:justify-end ">
              <img className="block max-w-full h-auto" src="https://ik.imagekit.io/mlsbase/avatar.jpg?updatedAt=1734397659049" alt="your-image" />
            </div>
            <div className="w-full md:w-1/2 mt-3 md:mt-0 px-[16px] text-white flex flex-col gap-2">
              <div className="text-[16px] font-semibold" >Sky Qui</div>
              <div className="flex flex-col gap-3 text-[14px]">Real Estate Broker</div>
              <div className="flex flex-col gap-3 text-[12px]">
                <div>As a passionate and dedicated real estate professional, I am committed to helping clients find their dream homes and make sound investment decisions. With 20 years of experience in the industry, I pride myself on providing personalized services and expert guidance tailored to each individual's needs.</div>
                <div>Whether you’re buying, selling, or renting, my goal is to make the process as smooth and stress-free as possible. Real estate is not just about properties; it's about the people who live in them. I strive to ensure you feel confident, informed, and supported every step of the way.</div>
                <div>I look forward to working with you and helping you achieve your real estate goals. Let’s turn your property dreams into reality!</div>
              </div>
            </div>
          </div>
        </div>
        <MidContectSection></MidContectSection>

        <div className="flex flex-col">
          <div className="w-full h-0 flex justify-center py-8 font-semibold">RECENTLY LISTED PROPERTIES </div>
          <div className="w-full flex-1 px-4 py-4">
            <ListingGrid></ListingGrid>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
