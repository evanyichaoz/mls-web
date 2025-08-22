"use client";

import Carousel from "@/components/Carousel";
import ListingGrid from "@/components/ListingGrid";
import MidContectSection from "@/components/MidContectSection";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@mui/material";
import AddListingDialog from "@/components/AddListingDialog";

export default function Home() {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const [openAddListingDialog, setOpenAddListingDialog] = useState(false);

  return (
    <div>
      <main className="flex flex-col items-center sm:items-start pb-10">
        <Carousel />
        <div className="flex w-full gap-[30px] py-[50px] bg-[#b39f68]">
          <div className="flex mx-auto px-[16px] flex-col md:flex-row">
            <div className="w-full md:w-1/3 px-[16px] flex justify-center md:justify-end ">
              <img className="block max-w-full h-auto" src="https://ik.imagekit.io/mlsbase/avatar.jpg?updatedAt=1734397659049" alt="your-image" />
            </div>
                         <div className="w-full md:w-1/2 mt-3 md:mt-0 px-[16px] text-white flex flex-col gap-2">
               <div className="text-[16px] font-semibold" >{t('broker.name')}</div>
               <div className="flex flex-col gap-3 text-[14px]">{t('broker.title')}</div>
              <div className="flex flex-col gap-3 text-[12px] md:pr-12">
                <div>{t('broker.description.1')}</div>
                <div>{t('broker.description.2')}</div>
                <div>{t('broker.description.3')}</div>
              </div>
            </div>
          </div>
        </div>
        <MidContectSection />

        <div className="flex flex-col w-full">
          <div className="w-full flex justify-center items-center py-8 gap-4">
            <div className="font-semibold">{t('recently.listed')}</div>
            {currentUser?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
              <Button variant="contained" onClick={() => setOpenAddListingDialog(true)}>
                {t('add.listing')}
              </Button>
            )}
          </div>
          <div className="w-full flex-1 px-4 py-4">
            <ListingGrid status={1} />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="w-full flex justify-center py-8 font-semibold">{t('recently.sold')}</div>
          <div className="w-full flex-1 px-4 py-4"> 
            <ListingGrid status={2} />
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex flex-col items-center justify-center w-full py-8 bg-[#f5f5f5] text-[#333]">
        <div className="font-semibold text-lg mb-2">{t('broker.name')} | {t('broker.title')}</div>
        <div className="mb-1">{t('location')}</div>
        <div className="mb-1">{t('footer.phone')}: <a href="tel:6478826789" className="underline">(647) 882-6789</a></div>
        <div className="mb-1">{t('footer.email')}: <a href="mailto:canadaqiu@qq.com" className="underline">canadaqiu@qq.com</a></div>
        <div className="mt-2 text-sm text-gray-500">© {new Date().getFullYear()} {t('broker.name')}. {t('all.rights.reserved')}</div>
      </footer>
      <AddListingDialog
        open={openAddListingDialog}
        onClose={() => setOpenAddListingDialog(false)}
      />
    </div>
  );
}