import PropertyCard from '@/components/PropertyCard';
import connectToDb from '@/config/database';
import Property from '@/models/Property';

const PropertiesPage = async () => {

    await connectToDb();

    const properties = await Property.find().lean();

    return (
        <section className='px-4 py-6'>
            <div className='container-xl lg:container m-auto px-4 py-6'>
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
        </section>
    )
}

export default PropertiesPage;