import PropertyEditForm from "@/components/PropertyEditForm";
import { convertToOject } from "@/config/convertToObject";
import connectToDb from "@/config/database";
import Property from "@/models/Property";

const PropertyEditPage = async ({ params }) => {
    await connectToDb();

    const propertyDoc = await Property.findById(params.id).lean();
    const property = convertToOject(propertyDoc);

    console.log("PROPERTY", property);

    if (!property) {
        return <h1>La location n'a pas été trouvé.</h1>
    }

    return (
        <section className="bg-blue-50">
            <div className="container m-auto max-w-2xl py-24">
                <div className="bg-white px-6 py-8 shadow-md rounded-md border m-4 md:m-0">
                    <PropertyEditForm property={property} />
                </div>
            </div>
        </section>
    )
}

export default PropertyEditPage;