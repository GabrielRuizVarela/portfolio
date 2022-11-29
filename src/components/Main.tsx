import React, { useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import About from "./About";
import Projects from "./Projects";
import EngProjects from "./EngProjects";
import Skills from "./Skills";
import "../App.css";
import Contact from "./Contact";

function Main() {
	const scrollRef = useRef(null);
	return (
		<div className="App w-screen h-screen flex flex-col">
			<Navbar />
			<div className="sections" ref={scrollRef}>
				<div id="about">
					<About />
				</div>
				<motion.div
					whileInView={{
						visibility: "visible",
						opacity: 1,
					}}
					viewport={{ root: scrollRef }}
					// while not in view set opacity to 0
					// onViewportLeave={(e) => {
					// 	e?.target.classList.add("zero-opacity");
					// }}
				>
					<Projects />
				</motion.div>
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
