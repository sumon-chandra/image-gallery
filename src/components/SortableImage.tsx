import { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import demoImg from "../assets/image.svg";

interface SortableImageProps {
	image: { id: number; img?: string };
	onToggle: (id: number) => void;
	selectedImages: number[];
	order: number;
}

const SortableImage: FC<SortableImageProps> = ({ image, order, selectedImages, onToggle }) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: image.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const content = () => {
		if (image.img) {
			return (
				<div className={`${isDragging && "ring-4 ring-neutral-400 rounded-md shadow-md"} z-30 cursor-pointer`}>
					<img src={image.img} alt="Product Image" className="h-full rounded-md" />
					<div
						className={`absolute top-0 left-0 w-full h-full transition-opacity bg-[#00000071] opacity-0 rounded-md
                        ${selectedImages?.includes(image.id) ? "opacity-100" : "opacity-0"} 
                        hover:opacity-100`}
					/>
				</div>
			);
		} else {
			return (
				<div className="flex flex-col items-center justify-center w-32 h-32 text-center cursor-auto">
					<img src={demoImg} className="w-6 h-6" alt="Demo Image" />
					<span className="text-xs font-semibold">Add image</span>
				</div>
			);
		}
	};

	const checkbox = () => {
		if (image.img !== "") {
			return (
				<input
					type="checkbox"
					// onClick={() => handleToggle(image.id)}
					onChange={() => onToggle(image.id)}
					checked={selectedImages?.includes(image.id)}
					className={`${
						selectedImages?.includes(image.id) && "opacity-100"
					} absolute z-50 w-5 h-5 opacity-0 cursor-pointer group-hover:opacity-100 top-2 left-2`}
				/>
			);
		}
	};

	return (
		<div
			className={`border-2 relative flex items-center justify-center rounded-md select-none group ${
				order === 1
					? "row-span-2 col-span-2"
					: image.img === ""
					? " border-4 border-gray-400 border-dotted"
					: "row-span-1"
			}`}
		>
			{checkbox()}
			<div ref={setNodeRef} {...attributes} {...listeners} style={image.img ? style : undefined}>
				{content()}
			</div>
		</div>
	);
};

export default SortableImage;
