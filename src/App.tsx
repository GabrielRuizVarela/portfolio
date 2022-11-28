import React from "react";

import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import EngProjects from "./components/EngProjects";
import Skills from "./components/Skills";
import "./App.css";
import Contact from "./components/Contact";

function App() {
	// const [count, setCount] = useState(0);

	return (
		<div className="App w-screen h-screen flex flex-col">
			<Navbar />
			<div className="sections">
				<div id="about">
					<About />
				</div>
				<div id="projects">
					<Projects />
				</div>
				<EngProjects />
				<div id="skills">
					<Skills />
				</div>
				<div id="contact">
					<Contact />
				</div>
			</div>
		</div>
	);
}

export default App;
