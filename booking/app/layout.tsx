import type { Metadata } from "next";

import "@/assets/styles/globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AuthWrapper from "@/components/AuthWrapper"


const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Booking App",
  description: "Book a meetiing or a conference room",
};



//auth provider is client we use hooks in the provider so if we are going to wrap this around with the auth provider
//this should be a client component. but then the layout and everything will be client

//solution----->
//create a seperate component and create an authwrapperuses that provider 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthWrapper>
      <html lang="en">
      <body
        className={inter.className}
      >
        <Header/>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
        </main>
        <Footer/>
        <ToastContainer/>
      </body>
    </html>
    </AuthWrapper>
  );
}
