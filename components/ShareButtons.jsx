"use client";

import { FaEnvelope, FaFacebook } from "react-icons/fa"
import { FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { EmailShareButton, FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share"

const ShareButtons = ({ property }) => {

    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

    return (
        <>
            <h3 className="text-xl font-bold text-center pt-2">Partager cette location</h3>
            <div className="flex justify-center gap-3 pb-5">
                <FacebookShareButton url={shareUrl} quote={property.name}>
                    <FaFacebook size={40} />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title={property.name}>
                    <FaXTwitter size={40} />
                </TwitterShareButton>
                <WhatsappShareButton url={shareUrl} title={property.name}>
                    <FaWhatsapp size={40} />
                </WhatsappShareButton>
            </div>
        </>
    )
}

export default ShareButtons