import React from 'react'
import '@/assets/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
    title: 'Trouver-Louer',
    keywords: 'louer, maison, appartament, trouver',
    description: 'Trouver facilement votre propriété.'
}

const MainLayout = ({ children }) => {
    return (
        <html>
            <body>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    )
}

export default MainLayout;