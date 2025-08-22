import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { AlertProvider } from "@/context/AlertContext";
import AlertMessage from "@/components/AlertMessage";
import Header from "@/components/Header";
import { ArimThemeProvider } from "@/context/ArimThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Qui Sky - Real Estate Broker",
  description: "Qui Sky - Real Estate Broker",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">

      <AuthProvider>
        <AlertProvider>
          <LanguageProvider>
            <ArimThemeProvider>
              <body
                className={`antialiased font-instagram  h-full w-full`}
              >
                <AlertMessage></AlertMessage>
                <main className="relative h-full w-full">
                  <Header></Header>
                  {children}
                </main>
              </body>
            </ArimThemeProvider>
          </LanguageProvider>
        </AlertProvider>
      </AuthProvider>
    </html>
  );
}
