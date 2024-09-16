import Image from "next/image"

const PropertyHeaderImg = ({ src }) => {
    return (
        <section>
            <div class="container-xl m-auto">
                <div class="grid grid-cols-1">
                    <Image src={src}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="object-cover h-[400px] w-full"
                    />
                </div>
            </div>
        </section>
    )
}

export default PropertyHeaderImg