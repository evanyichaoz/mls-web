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
        <p><strong>Header:</strong> {t('login.signup')}</p>
        <p><strong>Listing:</strong> {t('for.sale')}</p>
        <p><strong>Contact:</strong> {t('contact.us')}</p>
        <p><strong>Add Listing:</strong> {t('add.listing')}</p>
        <p><strong>Common:</strong> {t('cancel')}</p>
      </div>
    </div>
  );
}
