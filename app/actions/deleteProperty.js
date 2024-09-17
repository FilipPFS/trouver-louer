"use server";
import cloudinary from "@/config/cloudinary";
import connectToDb from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
  await connectToDb();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("UserID is required.");
  }

  const property = await Property.findById(propertyId);

  if (!property) throw new Error("Property not found.");

  if (property.owner.toString() !== sessionUser.userId) {
    throw new Error("You can't not delete a property from other users.");
  }

  const imageUrls = property.images;

  imageUrls.forEach(async (url) => {
    // Extract the public ID (e.g., 'qzcltiqk2p0bwbaesjt2')
    const publicId = url.split("/").pop()?.split(".")[0];

    if (publicId) {
      // Delete the image using the correct public ID
      await cloudinary.uploader.destroy(
        `trouver-louer/${publicId}`, // The full public ID, including the folder path
        (error, result) => {
          if (error) {
            console.error(
              `Failed to delete image with public ID ${publicId}:`,
              error
            );
          } else {
            console.log(
              `Successfully deleted image with public ID ${publicId}:`,
              result
            );
          }
        }
      );
    } else {
      console.error("Invalid URL, could not extract public ID:", url);
    }
  });

  await property.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteProperty;
