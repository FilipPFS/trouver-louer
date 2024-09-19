import MessageCard from "@/components/MessageCard";
import { convertToOject } from "@/config/convertToObject";
import connectToDb from "@/config/database"
import Message from "@/models/Message";
import "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

const MessagesPage = async () => {

    await connectToDb();

    const sessionUser = await getSessionUser();

    const { userId } = sessionUser;

    const readMessages = await Message.find({ recipient: userId, seen: true })
        .sort({ createdAt: -1 })
        .populate('sender', 'username')
        .populate('property', 'name')
        .lean()

    const unreadMessages = await Message.find({ recipient: userId, seen: false })
        .sort({ createdAt: -1 })
        .populate('sender', 'username')
        .populate('property', 'name')
        .lean()

    const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
        const message = convertToOject(messageDoc);
        message.sender = convertToOject(messageDoc.sender);
        message.property = convertToOject(messageDoc.property);
        return message;
    })

    console.log("MESSAGES", messages);

    return (
        <section className="bg-blue-50">
            <div className="container m-auto py-24 max-w-6xl">
                <div
                    className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
                >
                    <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
                    {messages.length === 0 ? (<p>Vous n'avez aucun message</p>) : (
                        messages.map((message) => {
                            return (
                                <MessageCard key={message._id} message={message} />
                            )
                        })
                    )}
                </div>
            </div>
        </section>
    )
}

export default MessagesPage