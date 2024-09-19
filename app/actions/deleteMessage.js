"use server";
import connectToDb from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteMessage(messageId) {
  await connectToDb();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("UserID is required.");
  }

  const message = await Message.findById(messageId);

  if (!message) throw new Error("Messgae not found.");

  if (message.recipient.toString() !== sessionUser.userId) {
    throw new Error("Unathorized.");
  }

  await message.deleteOne();

  const count = await Message.countDocuments({
    recipient: sessionUser.userId,
    seen: false,
  });

  revalidatePath("/", "layout");

  return { count };
}

export default deleteMessage;
