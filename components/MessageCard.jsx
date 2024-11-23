'use client';

import deleteMessage from "@/app/actions/deleteMessage";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import { useGlobalContext } from "@/context/GlobalContext";
import { useState } from "react";
import { toast } from "react-toastify";

const MessageCard = ({ message }) => {

    const { setUnreadCount } = useGlobalContext();

    const [isSeen, setIsSeen] = useState(message.seen);
    const [isDeleted, setIsDeleted] = useState(false);

    const handleReadClick = async () => {
        const res = await markMessageAsRead(message._id);

        setIsSeen(res.seen);
        setUnreadCount(res.count);
        toast.success(`Marqué comme ${res.seen ? 'lu' : 'nouveau'}`)
    }

    const handleDeleteClick = async () => {
        const res = await deleteMessage(message._id);
        setUnreadCount(res.count);
        setIsDeleted(true);
        toast.success("Le message a été supprimé.")
    }

    return (
        <div
            className="relative bg-white p-4 rounded-md shadow-md border border-gray-200"
        >
            {!isSeen && <div className="absolute top-2 right-2 text-white
             bg-yellow-500 px-2 py-1 rounded-md">NOUVEAU</div>}
            <h2 className="text-xl mb-4">
                <span className="font-bold">Nom de la location:</span>
                {" "}{message.property.name}
            </h2>
            <p className="text-gray-700">
                {message.body}
            </p>

            <ul className="mt-4">
                <li><strong>Nom:</strong> {message.name}</li>

                <li>
                    <strong>Email:</strong>
                    <a href={`mailto:${message.email}`} className="text-blue-500"
                    >{" "}{message.email}</a>
                </li>
                <li>
                    <strong>Numéro de téléphone:</strong>
                    <span className="text-blue-500"
                    > {message.phone}</span>
                </li>
                <li><strong>Envoyé le:</strong> {new Date(message.createdAt).toLocaleDateString()}</li>
            </ul>
            <button
                onClick={handleReadClick}
                className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
            >
                {isSeen ? "Marquer comme nouveau" : "Marquer comme lu"}
            </button>
            <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md" onClick={handleDeleteClick}>
                Supprimer
            </button>
        </div>
    )
}

export default MessageCard