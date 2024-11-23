"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const PropertySearchForm = () => {
    const [location, setLocation] = useState("");
    const [propertyType, setPropertyType] = useState("All");

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (location === '' && propertyType === 'All') {
            router.push('/properties');
        } else {
            const query = `?location=${location}&propertyType=${propertyType}`;
            router.push(`/properties/search-results${query}`)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
        >
            <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
                <label htmlFor="location" className="sr-only">Location</label>
                <input
                    type="text"
                    id="location"
                    placeholder="Entrer la location (ville, déptartement, code postale)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>
            <div className="w-full md:w-2/5 md:pl-2">
                <label htmlFor="property-type" className="sr-only">Property Type</label>
                <select
                    id="property-type"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
                >
                    <option value="All">Tous</option>
                    <option value="Apartment">Appartement</option>
                    <option value="Studio">Studio</option>
                    <option value="Condo">Condo</option>
                    <option value="House">Maison</option>
                    <option value="Cabin Or Cottage">Chalet</option>
                    <option value="Loft">Entrepôt</option>
                    <option value="Room">Chambre</option>
                    <option value="Other">Autre</option>
                </select>
            </div>
            <button
                type="submit"
                className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
            >
                Rechercher
            </button>
        </form>
    )
}

export default PropertySearchForm