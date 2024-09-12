import React from 'react'
import '@/assets/styles/globals.css'

export const metadata = {
    title: 'Trouver-Louer',
    keywords: 'louer, maison, appartament, trouver',
    description: 'Trouver facilement votre propriété.'
}

const MainLayout = ({ children }) => {
    return (
        <html>
            <body>
                <main>{children}</main>
            </body>
        </html>
    )
}

export default MainLayout;