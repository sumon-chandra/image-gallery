import { images } from "../primitives/images"
import Image from "./Image"

const Gallery = () => {
    return (
        <div className="p-5 bg-white border rounded-lg shadow">
            <div className="grid grid-flow-col grid-rows-3 gap-6 mx-auto lg:max-w-3xl">
                {
                    images.map((image, index) => (
                        <Image
                            key={image.id}
                            image={image.img}
                            order={index + 1}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Gallery
