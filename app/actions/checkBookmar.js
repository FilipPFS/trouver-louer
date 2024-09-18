"use server";

import connectToDb from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

async function checkBookmark(propertyId) {
  await connectToDb();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("UserId is required.");
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId);

  let isBookmared = user.bookmarks.includes(propertyId);

  return {
    isBookmared,
  };
}

export default checkBookmark;
