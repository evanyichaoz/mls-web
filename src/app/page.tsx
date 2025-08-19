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
        <MidContectSection />

        <div className="flex flex-col w-full">
          <div className="w-full flex justify-center py-8 font-semibold">RECENTLY LISTED PROPERTIES</div>
          <div className="w-full flex-1 px-4 py-4">
            <ListingGrid status={1} />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="w-full flex justify-center py-8 font-semibold">RECENTLY SOLD PROPERTIES</div>
          <div className="w-full flex-1 px-4 py-4"> 
            <ListingGrid status={2} />
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex flex-col items-center justify-center w-full py-8 bg-[#f5f5f5] text-[#333]">
        <div className="font-semibold text-lg mb-2">Sky Qui | Real Estate Broker</div>
        <div className="mb-1">Toronto, Ontario</div>
        <div className="mb-1">Phone: <a href="tel:6478826789" className="underline">(647) 882-6789</a></div>
        <div className="mb-1">Email: <a href="mailto:canadaqiu@qq.com" className="underline">canadaqiu@qq.com</a></div>
        <div className="mt-2 text-sm text-gray-500">© {new Date().getFullYear()} Sky Qui. All rights reserved.</div>
      </footer>
    </div>
  );
}