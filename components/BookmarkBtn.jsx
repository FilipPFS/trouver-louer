"use client";
import { FaBookmark } from "react-icons/fa"
import bookmarkProperty from "@/app/actions/bookmarkProperty"
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import checkBookmark from "@/app/actions/checkBookmar";

const BookmarkBtn = ({ property }) => {
    const { data: session } = useSession();

    const [bookmarked, setBookmarked] = useState(false);

    const userId = session?.user?.id;

    useEffect(() => {
        const handleCheck = async () => {
            const res = await checkBookmark(property._id);

            if (res) {
                setBookmarked(res.isBookmared);
            }
        }

        handleCheck();
    }, [property._id, userId, checkBookmark])

    const handleClick = async () => {
        if (!userId) {
            toast.error("Vous devez être connecté pour sauvegarder les locations.")
        }

        try {
            const res = await bookmarkProperty(property._id);
            if (res) {
                toast.success(res.message);
                setBookmarked(res.isBookmared);
            }
        } catch (err) {
            toast.error(err)
        }
    }

    return (
        bookmarked ? (
            <button
                onClick={handleClick}
                className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
            >
                <FaBookmark className="mr-2" />Annuler
            </button>
        ) :
            (
                <button
                    onClick={handleClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
                >
                    <FaBookmark className="mr-2" />Sauvegarder
                </button>
            )
    )
}

export default BookmarkBtn