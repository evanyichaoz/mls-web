"use client";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@mui/material";

export default function TestPage() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Language Test Page</h1>
      
      <div className="mb-4">
        <p>Current Language: {language}</p>
        <div className="flex gap-2 mt-2">
          <Button 
            variant={language === 'en' ? 'contained' : 'outlined'}
            onClick={() => setLanguage('en')}
          >
            English
          </Button>
          <Button 
            variant={language === 'zh' ? 'contained' : 'outlined'}
            onClick={() => setLanguage('zh')}
          >
            中文
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold mt-4">Header & Navigation:</h2>
        <p><strong>Login/Signup:</strong> {t('login.signup')}</p>
        <p><strong>Logout:</strong> {t('logout')}</p>
        <p><strong>Contact Us:</strong> {t('contact.us')}</p>
        
                 <h2 className="text-lg font-semibold mt-4">Carousel:</h2>
         <p><strong>What is Your Home Worth:</strong> {t('what.is.your.home.worth')}</p>
         <p><strong>Find Out Worth:</strong> {t('find.out.worth')}</p>
         <p><strong>Get Started:</strong> {t('get.started')}</p>
         
         <h2 className="text-lg font-semibold mt-4">Mid Content Section:</h2>
         <p><strong>Real Estate Done Right:</strong> {t('real.estate.done.right')}</p>
         <p><strong>First Time Buyer Question:</strong> {t('first.time.buyer.question')}</p>
        
        <h2 className="text-lg font-semibold mt-4">Listing Grid:</h2>
        <p><strong>For Sale:</strong> {t('for.sale')}</p>
        <p><strong>Sold:</strong> {t('sold')}</p>
        <p><strong>Asking Price:</strong> {t('asking.price')}</p>
        
        <h2 className="text-lg font-semibold mt-4">Broker Info:</h2>
        <p><strong>Broker Name:</strong> {t('broker.name')}</p>
        <p><strong>Broker Title:</strong> {t('broker.title')}</p>
        <p><strong>Description 1:</strong> {t('broker.description.1')}</p>
        <p><strong>Description 2:</strong> {t('broker.description.2')}</p>
        <p><strong>Description 3:</strong> {t('broker.description.3')}</p>
        
        <h2 className="text-lg font-semibold mt-4">Home Page:</h2>
        <p><strong>Recently Listed:</strong> {t('recently.listed')}</p>
        <p><strong>Recently Sold:</strong> {t('recently.sold')}</p>
        <p><strong>Add Listing:</strong> {t('add.listing')}</p>
        
        <h2 className="text-lg font-semibold mt-4">Footer:</h2>
        <p><strong>Location:</strong> {t('location')}</p>
        <p><strong>Phone:</strong> {t('footer.phone')}</p>
        <p><strong>Email:</strong> {t('footer.email')}</p>
        <p><strong>All Rights Reserved:</strong> {t('all.rights.reserved')}</p>
        
        <h2 className="text-lg font-semibold mt-4">Common:</h2>
        <p><strong>Cancel:</strong> {t('cancel')}</p>
        <p><strong>Submit:</strong> {t('submit')}</p>
        <p><strong>Delete:</strong> {t('delete')}</p>
      </div>
    </div>
  );
}
