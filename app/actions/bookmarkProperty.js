"use server";

import connectToDb from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId) {
  await connectToDb();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("UserId is required.");
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId);

  let isBookmared = user.bookmarks.includes(propertyId);

  let message;

  if (isBookmared) {
    user.bookmarks.pull(propertyId);
    message = "Bookmark removed";
    isBookmared = false;
  } else {
    user.bookmarks.push(propertyId);
    message = "Bookmark added";
    isBookmared = true;
  }

  await user.save();

  revalidatePath("/properties/saved", "page");

  return {
    message,
    isBookmared,
  };
}

export default bookmarkProperty;
