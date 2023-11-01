import { useState } from "react"
import { images as initialImages } from "../primitives/images"
import Image from "./Image"

const Gallery = () => {
    const [images, setImages] = useState(initialImages.sort((a, b) => a.id - b.id))
    const [selectedImages, setSelectedImages] = useState<number[]>([])

    const toggledImage = (id: number) => {
        setSelectedImages((prevSelected) => prevSelected.includes(id)
            ? prevSelected.filter(imgId => imgId !== id)
            : [...prevSelected, id]
        );
    }

    const deleteSelectedImages = () => {
        setImages((prevImages) => prevImages.filter(image => !selectedImages.includes(image.id)))
        setSelectedImages([])
    }

    const headerContent = () => {
        if (selectedImages.length === 0) {
            return (
                <div className="py-2 border-b-4">
                    <h3 className="text-xl font-bold">Gallery</h3>
                </div>
            )
        } else {
            return (
                <div className="flex items-center justify-between py-2 border-b-4">
                    <p className="text-lg font-semibold"><span className="text-xl font-black">{selectedImages?.length}</span> File Selected</p>
                    <button
                        onClick={deleteSelectedImages}
                        className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-md"
                    >
                        Delete images
                    </button>
                </div>
            )
        }
    }

    return (
        <div className="p-5 m-5 bg-white border rounded-lg shadow lg:m-0">
            {headerContent()}
            <div className="grid grid-flow-row grid-cols-5 grid-rows-3 gap-6 mx-auto mt-4 lg:max-w-3xl">
                {
                    images.map((image, index) => (
                        <Image
                            onToggle={toggledImage}
                            selectedImages={selectedImages}
                            key={image.id}
                            image={image}
                            order={index + 1}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Gallery
