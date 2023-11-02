import { Toaster } from "sonner";
import Gallery from "./components/Gallery";

const App = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-neutral-200">
			<Gallery />
			<Toaster richColors position="top-center" className="flex items-center justify-center" />
		</div>
	);
};

export default App;
