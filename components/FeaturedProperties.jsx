import connectToDb from "@/config/database"
import Property from "@/models/Property";
import SingleFeaturedProperty from "./SingleFeaturedProperty";

const FeaturedProperties = async () => {
    await connectToDb();

    const properties = await Property.find({ is_featured: true }).lean();

    return (
        properties.length > 0 ?
            (
                <section class="bg-blue-50 px-4 pt-6 pb-10">
                    <div class="container-xl lg:container m-auto">
                        <h2 class="text-3xl font-bold text-blue-500 mb-6 text-center">
                            Locations en vedette
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {properties.map((property) => {
                                return (
                                    <SingleFeaturedProperty property={property} />
                                )
                            })}
                        </div>
                    </div>
                </section>
            )
            : (null)
    )
}

export default FeaturedProperties