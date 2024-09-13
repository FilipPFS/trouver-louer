"use client";

import properties from '@/properties.json';
import PropertyCard from './PropertyCard';
import { useState } from 'react';

const HomeProperties = () => {

    const newProperties = properties.slice(0, 3);

    const [viewAll, setViewAll] = useState(false);

    return (
        <section className='px-4 py-6'>
            <div className='container-xl lg:container m-auto px-4 py-6'>
                <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>Récement ajoutés</h2>
                {newProperties.length === 0 ? (
                    <p>Aucune location n'a été trouvé.</p>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {(viewAll ? properties : newProperties).map((property) => {
                            return (
                                <PropertyCard key={property._id} property={property} />
                            )
                        })}
                    </div>
                )}
            </div>
            <div className='w-full flex justify-center'>
                <button onClick={() => setViewAll(prev => !prev)} className='bg-blue-500 py-2 px-3 rounded-lg text-white'>View all</button>
            </div>
        </section>
    )
}

export default HomeProperties