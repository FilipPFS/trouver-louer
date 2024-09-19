"use server";

import connectToDb from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

const addMessage = async (previousState, formData) => {
  await connectToDb();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("UserId not found.");
  }

  const { userId } = sessionUser;

  const recipient = formData.get("recipient");

  if (userId === recipient) {
    return { error: "You can not write a message to yourself." };
  }

  const message = new Message({
    sender: userId,
    recipient,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("body"),
  });

  await message.save();

  return {
    submited: true,
  };
};

export default addMessage;
