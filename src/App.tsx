import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import EngProjects from "./components/EngProjects";
import Skills from "./components/Skills";
import "./App.css";
import Contact from "./components/Contact";
import Main from "./components/Main";

function App() {
	// const [count, setCount] = useState(0);

	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Main />} />
			</Routes>
		</HashRouter>
	);
}

export default App;
