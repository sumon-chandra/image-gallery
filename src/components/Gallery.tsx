import { useState } from "react";
import { images as initialImages } from "../primitives/images";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { toast } from "sonner";
import SortableImage from "./SortableImage";

interface GalleryProps {
	id: number;
	img?: string;
}

const Gallery = () => {
	const [images, setImages] = useState<GalleryProps[]>(initialImages);
	const [selectedImages, setSelectedImages] = useState<number[]>([]);

	const toggledImage = (id: number) => {
		setSelectedImages(prevSelected =>
			prevSelected.includes(id) ? prevSelected.filter(imgId => imgId !== id) : [...prevSelected, id]
		);
	};

	const deleteSelectedImages = () => {
		setImages(prevImages => prevImages.filter(image => !selectedImages.includes(image.id)));
		toast.error("Images deleted!!");
		setSelectedImages([]);
	};

	const headerContent = () => {
		if (selectedImages.length === 0) {
			return (
				<div className="py-2 border-b-4">
					<h3 className="text-xl font-bold">Gallery</h3>
				</div>
			);
		} else {
			return (
				<div className="flex items-center justify-between py-2 border-b-4">
					<p className="text-lg font-semibold">
						<span className="text-xl font-black">{selectedImages?.length}</span> File Selected
					</p>
					<button
						onClick={deleteSelectedImages}
						className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-md"
					>
						Delete images
					</button>
				</div>
			);
		}
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (active.id !== over?.id) {
			setImages(prevImages => {
				const imagesIds = prevImages.map(img => img.id);
				const activeIndex = imagesIds.indexOf(active.id as number);
				const overIndex = imagesIds.indexOf(over?.id as number);
				return arrayMove(images, activeIndex, overIndex);
			});
		}
	};

	return (
		<div className="p-5 m-5 bg-white border rounded-lg shadow lg:m-0">
			{headerContent()}
			<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
				<SortableContext items={images} strategy={rectSortingStrategy}>
					<div className="grid grid-flow-row grid-cols-2 grid-rows-3 gap-6 mx-auto mt-4 lg:grid-cols-5 lg:max-w-3xl">
						{images.map((image, index) => (
							<SortableImage
								key={image.id}
								image={image}
								order={index + 1}
								selectedImages={selectedImages}
								onToggle={toggledImage}
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>
		</div>
	);
};

export default Gallery;
