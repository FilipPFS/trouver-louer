import connectToDb from '@/config/database';
import PropertyCard from './PropertyCard';
import Link from 'next/link';
import Property from '@/models/Property';

const HomeProperties = async () => {

    await connectToDb();

    const properties = await Property.find().sort({ createdAt: -1 }).limit(3).lean();

    return (
        <section className='px-4 py-6'>
            <div className='container-xl lg:container m-auto px-4 py-6'>
                <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>Récement ajoutés</h2>
                {properties.length === 0 ? (
                    <p>Aucune location n'a été trouvé.</p>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {properties.map((property) => {
                            return (
                                <PropertyCard key={property._id} property={property} />
                            )
                        })}
                    </div>
                )}
            </div>
            <div className='w-full flex justify-center'>
                <Link href={'/properties'}>View all</Link>
            </div>
        </section>
    )
}

export default HomeProperties