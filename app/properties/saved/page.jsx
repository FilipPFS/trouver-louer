import PropertyCard from "@/components/PropertyCard";
import connectToDb from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser"

const SavedProperties = async () => {
    await connectToDb();
    const { userId } = await getSessionUser();
    const { bookmarks } = await User.findById(userId).populate('bookmarks');

    return (
        <section className="px-4 py-6">
            <div className="container lg:container m-auto px-4 py-6">
                <h1 className="text-2xl mb-4">Saved properties</h1>
                {bookmarks.length === 0 ? (<p>Vous n'avez pas sauvagrdé des locations.</p>) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {bookmarks.map((bookmark) => {
                            return (
                                <PropertyCard key={bookmark._id} property={bookmark} />
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    )
}

export default SavedProperties