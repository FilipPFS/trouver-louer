import React from 'react'
import '@/assets/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalProvider } from '@/context/GlobalContext'
import 'photoswipe/dist/photoswipe.css';

export const metadata = {
    title: 'Trouver-Louer',
    keywords: 'louer, maison, appartament, trouver',
    description: 'Trouver facilement votre propriété.'
}

const MainLayout = ({ children }) => {
    return (
        <AuthProvider>
            <GlobalProvider>
                <html>
                    <body>
                        <Navbar />
                        <main>{children}</main>
                        <ToastContainer />
                    </body>
                </html>
            </GlobalProvider>
        </AuthProvider>
    )
}

export default MainLayout;