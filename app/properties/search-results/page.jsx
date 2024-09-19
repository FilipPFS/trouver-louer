import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import { convertToOject } from "@/config/convertToObject";
import connectToDb from "@/config/database"
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowCircleLeft } from "react-icons/fa";

const SearchResultsPage = async ({ searchParams: { location, propertyType } }) => {

    await connectToDb();

    const locationPattern = new RegExp(location, 'i');
    let query = {
        $or: [
            { name: locationPattern },
            { description: locationPattern },
            { 'location.street': locationPattern },
            { 'location.city': locationPattern },
            { 'location.state': locationPattern },
            { 'location.zipcode': locationPattern }
        ]
    };

    if (propertyType && propertyType !== 'All') {
        const typePattern = new RegExp(propertyType, 'i');
        query = {
            $and: [
                query,
                { type: typePattern }
            ]
        };
    }

    const propertiesQueryResults = await Property.find(query).lean();
    const properties = convertToOject(propertiesQueryResults);

    return (
        <>
            <section className="bg-blue-700 py-4">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
                    <PropertySearchForm />
                </div>
            </section>
            <section className="px-4 py-6">
                <div className="container-xl lg:container m-auto px-4 py-6">
                    <Link href={'/properties'} className="flex items-center text-blue-500 hover:underline mb-3">
                        <FaArrowCircleLeft className="mr-2 mb-1" /> Revenir sur les locations
                    </Link>
                    <h1 className="text-2xl font-bold mb-4">Les resultats</h1>
                    {properties.length === 0 ? <p>Aucun resultat</p> : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {properties.map((property) => {
                                return (
                                    <PropertyCard key={property._id} property={property} />
                                )
                            })}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default SearchResultsPage;
