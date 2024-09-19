"use server";

import connectToDb from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function markMessageAsRead(messageId) {
  await connectToDb();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("UserId is required.");
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  console.log("MESSAGE", message);

  if (!message) {
    throw new Error("Message not found.");
  }

  if (message.recipient.toString() !== userId) {
    throw new Error("Unahorized.");
  }

  message.seen = !message.seen;

  revalidatePath("/messages", "page");

  await message.save();

  const count = await Message.countDocuments({
    recipient: userId,
    seen: false,
  });

  return {
    seen: message.seen,
    count,
  };
}

export default markMessageAsRead;
