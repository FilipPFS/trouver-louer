"use server";

import connectToDb from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

async function getUnreadMessages() {
  await connectToDb();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("UserId is required.");
  }

  const { userId } = sessionUser;

  const count = await Message.countDocuments({
    recipient: userId,
    seen: false,
  });

  return { count };
}

export default getUnreadMessages;
