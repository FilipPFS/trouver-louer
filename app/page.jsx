import Hero from '@/components/Hero'
import HomeProperties from '@/components/HomeProperties'
import InfoBoxes from '@/components/InfoBoxes'
import Link from 'next/link'
import React from 'react'

const HomePage = () => {

    return (
        <div>
            <Hero />
            <InfoBoxes />
            <HomeProperties />
        </div>
    )
}

export default HomePage