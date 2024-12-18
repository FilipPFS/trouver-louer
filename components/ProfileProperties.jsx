"use client";
import deleteProperty from '@/app/actions/deleteProperty';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ProfileProperties = ({ properties: initialProperties }) => {

    const [properties, setProperties] = useState(initialProperties);

    const handleDeleteProperty = async (propertyId) => {
        const confirmed = window.confirm("Etes vous sûr de vouloir supprimer cette propriété?");

        if (!confirmed) return;

        await deleteProperty(propertyId);

        const updatedProperties = properties.filter((property) => property._id !== propertyId);

        setProperties(updatedProperties);

        toast.success("La location a bien été supprimé.")
    }

    return properties.map((property) => {
        return (
            <div key={property._id} className="mb-10">
                <Link href={`/properties/${property._id}`}>
                    <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={property.images[0]}
                        alt="Property 1"
                        width={1000}
                        height={200}
                    />
                </Link>
                <div className="mt-2">
                    <p className="text-lg font-semibold">{property.name}</p>
                    <p className="text-gray-600">Adresse: {property.location.street}, {property.location.city}</p>
                </div>
                <div className="mt-2">
                    <a
                        href={`/properties/${property._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-2 rounded-md mr-2 hover:bg-blue-600"
                    >
                        Modifier
                    </a>
                    <button
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                        onClick={() => handleDeleteProperty(property._id)}
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        )
    })
}

export default ProfileProperties