import { FaCheck, FaBed, FaBath, FaRulerCombined, FaXmark, FaLocationDot } from 'react-icons/fa6'
import PropertyMap from './PropertyMap';

const PropertyDetails = ({ property }) => {

    const { location } = property;
    const { rates } = property;

    return (
        <main>
            <div
                className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
            >
                <div className="text-gray-500 mb-4">{property.type}</div>
                <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
                <div
                    className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
                >
                    <FaLocationDot className='text-lg text-orange-700 mr-2' />
                    <p className="text-orange-700">
                        {location.street}, {location.city} {location.zipcode}
                    </p>
                </div>

                <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
                    Tarifs & Options
                </h3>
                <div className="flex flex-col md:flex-row justify-around">
                    <div
                        className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
                    >
                        <div className="text-gray-500 mr-2 font-bold">Nuit</div>
                        <div className="text-2xl font-bold text-blue-500">
                            {rates.nightly ? (
                                `$${rates.nightly.toLocaleString()}`
                            ) : (
                                <FaXmark className='text-red-600' />
                            )}
                        </div>
                    </div>
                    <div
                        className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
                    >
                        <div className="text-gray-500 mr-2 font-bold">Semaine</div>
                        <div className="text-2xl font-bold text-blue-500">
                            {rates.weekly ? (
                                `$${rates.weekly.toLocaleString()}`
                            ) : (
                                <FaXmark />
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">Mois</div>
                        <div className="text-2xl font-bold text-blue-500">
                            {rates.monthly ? (
                                `$${rates.monthly.toLocaleString()}`
                            ) : (
                                <FaXmark />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">Description & Details</h3>
                <div
                    className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9"
                >
                    <p className='flex items-center gap-2'>
                        <FaBed /> {property.beds}
                        <span className="hidden sm:inline">Beds</span>
                    </p>
                    <p className='flex items-center gap-2'>
                        <FaBath /> {property.baths}
                        <span className="hidden sm:inline">Baths</span>
                    </p>
                    <p className='flex items-center gap-2'>
                        <FaRulerCombined />
                        {property.square_feet} <span className="hidden sm:inline">sqft</span>
                    </p>
                </div>
                <p className="text-gray-500 mb-4">
                    {property.description}
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">Amenities</h3>

                <ul
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none"
                >
                    {property.amenities.map((amenitie, index) => {
                        return (
                            <li key={index} className='flex items-center gap-2'>
                                <FaCheck className='text-green-600' />
                                {amenitie}
                            </li>
                        )
                    })}
                </ul>
            </div>
            {/* <!-- Map --> */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <PropertyMap property={property} />
            </div>
        </main>
    )
}

export default PropertyDetails