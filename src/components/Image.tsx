import { FC } from "react"
interface ImageProps {
    image: string;
    order: number;
}
const Image: FC<ImageProps> = ({ image, order }) => {
    return (
        <div className={`w-full border-2 rounded-md 
        ${order === 1 ? "row-span-2 col-span-2"
                : image === "" ? " border-4 border-gray-400 border-dotted"
                    : "row-span-1"} items-start`}>
            {
                image ? (
                    <img
                        src={image}
                        alt="Product Image"
                    />
                ) : (
                    <div className="relative top-14">
                        <span className="absolute w-full text-xs font-bold text-center">Add image</span>
                    </div>
                )
            }
        </div>
    )
}

export default Image
