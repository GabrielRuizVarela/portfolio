import React from "react";
import Navbar from "./Navbar";
import About from "./About";
import Projects from "./Projects";
import EngProjects from "./EngProjects";
import Skills from "./Skills";
import "../App.css";
import Contact from "./Contact";

function Main() {
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

export default Main;
