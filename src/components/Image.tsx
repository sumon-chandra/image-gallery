import { FC } from "react"
interface ImageProps {
    image: { img: string, id: number };
    order: number;
    onToggle: (id: number) => void;
    selectedImages: number[]
}

const Image: FC<ImageProps> = ({ image, order, onToggle, selectedImages }) => {

    const content = () => {
        if (image.img) {
            return (
                <div className="cursor-pointer">
                    <img
                        src={image.img}
                        alt="Product Image"
                        className="h-full rounded-md"
                    />
                    <div className={`absolute z-10 top-0 left-0 w-full h-full transition-opacity bg-[#00000071] opacity-0 rounded-md
                        ${selectedImages.includes(image.id) ? "opacity-100" : "opacity-0"} 
                        hover:opacity-100`}
                    >
                        <input
                            type="checkbox"
                            onChange={() => onToggle(image.id)}
                            checked={selectedImages.includes(image.id)}
                            className="absolute z-50 w-5 h-5 opacity-100 cursor-pointer top-2 left-2"
                        />
                    </div>
                </div>
            )
        } else {
            return <div className="absolute left-0 w-full text-center top-14">
                <span className="text-xs font-semibold">Add image</span>
            </div>
        }
    }

    return (
        <div className={`border-2 relative flex items-center justify-center rounded-md ${order === 1 ? "row-span-2 col-span-2" : image.img === "" ? " border-4 border-gray-400 border-dotted" : "row-span-1"}`}>
            {content()}
        </div>
    )
}

export default Image
