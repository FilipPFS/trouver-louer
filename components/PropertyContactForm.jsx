"use client";

import addMessage from "@/app/actions/addMessage";
import { useSession } from "next-auth/react";
import { useEffect } from "react"
import { FaPaperPlane } from "react-icons/fa"
import { useFormState } from 'react-dom'
import { toast } from "react-toastify";
import SubmitFormButton from "./SubmitFormButton";

const PropertyContactForm = ({ property }) => {

    const { data: session } = useSession();

    const [state, formAction] = useFormState(addMessage, {});

    useEffect(() => {
        if (state.error) {
            toast.error(state.error);
        }
        if (state.submited) {
            toast.success("Votre message a été envoyé.")
        }
    }, [state])

    if (state.submited) {
        return <p className="text-green-500 mb-4">Message a été envoyé.</p>
    }

    return (
        session && <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-6">Contact le propriétaire</h3>
            <form action={formAction}>
                <div className="mb-4">
                    <input
                        type="hidden"
                        id="property"
                        name="property"
                        defaultValue={property._id}
                    />
                    <input
                        type="hidden"
                        id="recipient"
                        name="recipient"
                        defaultValue={property.owner}
                    />
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                    >
                        Nom:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Votre nom"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Votre email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="phone"
                    >
                        Téléphone
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="Votre numéro de téléphone"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="message"
                    >
                        Message:
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                        id="body"
                        name="body"
                        placeholder="Votre message"
                    ></textarea>
                </div>
                <div>
                    <SubmitFormButton />
                </div>
            </form>
        </div>
    )
}

export default PropertyContactForm