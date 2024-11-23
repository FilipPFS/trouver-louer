import Image from "next/image"
import Link from "next/link";
import { FaBath, FaBed, FaMapMarker, FaMoneyBill, FaRulerCombined } from "react-icons/fa"

const SingleFeaturedProperty = ({ property }) => {

    const getRateDisplay = () => {
        const { rates } = property;
        if (rates.monthly) {
            return `$${rates.monthly.toLocaleString()}/mois`
        } else if (rates.weekly) {
            return `$${rates.weekly.toLocaleString()}/semaine`
        } else if (rates.nightly) {
            return `$${rates.nightly.toLocaleString()}/nuit`
        }
    }

    return (
        <div
            className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row"
        >
            <Image
                src={property.images[0]}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                class="w-full h-auto rounded-t-xl md:rounded-tr-none md:rounded-l-xl md:w-2/5"
            />
            <div className="p-6">
                <h3 className="text-xl font-bold">{property.name}</h3>
                <div className="text-gray-600 mb-4">{property.type}</div>
                <h3
                    className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right"
                >
                    {getRateDisplay()}
                </h3>

                <div className="flex justify-center gap-4 text-gray-500 mb-4">
                    <p>
                        <FaBed className="md:hidden lg:inline" /> {property.beds}{" "}
                        <span className="md:hidden lg:inline">Lits</span>
                    </p>
                    <p>
                        <FaBath className="md:hidden lg:inline" /> {property.baths}{" "}
                        <span className="md:hidden lg:inline">Salle de bains</span>
                    </p>
                    <p>
                        <FaRulerCombined className="md:hidden lg:inline" /> {property.square_feet}{" "}
                        <span className="md:hidden lg:inline">m2</span>
                    </p>
                </div>

                <div
                    className="flex justify-center gap-4 text-green-900 text-sm mb-4"
                >
                    {property.rates.nightly && (
                        <p>
                            <FaMoneyBill className='inline mr-2' /> Par Nuit
                        </p>
                    )}

                    {property.rates.weekly && (
                        <p>
                            <FaMoneyBill className='inline mr-2' /> Par Semaine
                        </p>
                    )}

                    {property.rates.monthly && (
                        <p>
                            <FaMoneyBill className='inline mr-2' /> Par Mois
                        </p>
                    )}
                </div>

                <div className="border border-gray-200 mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between">
                    <div className="flex align-middle items-center gap-2 mb-4 lg:mb-0">
                        <FaMapMarker
                            className="text-lg text-orange-700"
                        />
                        <span className="text-orange-700"> {property.location.city}</span>
                    </div>
                    <Link
                        href={`/properties/${property._id}`}
                        className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                    >
                        Voir Plus
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SingleFeaturedProperty