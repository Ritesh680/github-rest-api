import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPage from "./pages/DetailPage/DetailPage";
import Layout from "./pages/Layout";

function App() {
	return (
		<div className="flex flex-col">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />} />
					<Route path="/:id/:id" element={<DetailPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
