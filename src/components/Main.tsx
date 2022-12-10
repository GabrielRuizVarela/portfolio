import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { motion, useAnimationControls } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import About from "./About";
import Projects from "./Projects";
import EngProjects from "./EngProjects";
import Skills from "./Skills";
import "../App.css";
import Contact from "./Contact";
import Navbar from "./Navbar";

const variants = {
	enter: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.5 },
		transform: "rotateX(0deg)",
	},
	exit: {
		y: -50,
		opacity: 0,
		transition: { duration: 0.5 },
		transform: "rotateX(90deg)",
	},
};

const sections = [
	{
		id: "about",
		title: "About Me",
		content: <About />,
	},
	{
		id: "projects",
		title: "Projects",
		content: <Projects />,
	},
	{
		id: "eng-projects",
		title: "Engineering Projects",
		content: <EngProjects />,
	},
	{
		id: "skills",
		title: "Skills",
		content: <Skills />,
	},
	{
		id: "contact",
		title: "Contact",
		content: <Contact />,
	},
];
function Main() {
	const [activeSection, setActiveSection] = useState(0);
	const controls = useAnimationControls();
	const [isScrolling, setIsScrolling] = useState(false);
	let lastScrollTime = new Date();
	// const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
	const isMobile = useMediaQuery({ query: "(max-width: 1022px)" });
	const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
		if (isScrolling) return;
		const date = new Date();
		if (Number(date) - Number(lastScrollTime) < 500) return;
		lastScrollTime = new Date();

		setIsScrolling(true);
		if (e.deltaY > 0) {
			if (activeSection < sections.length - 1) {
				setActiveSection(activeSection + 1);
			}
		} else if (activeSection > 0) setActiveSection(activeSection - 1);
		setTimeout(() => {
			setIsScrolling(false);
		}, 500);
	};
	const [lastTouchY, setLastTouchY] = useState(0);
	const [scrollTop, setScrollTop] = useState(0);
	const [scrollBottom, setScrollBottom] = useState(0);

	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		setLastTouchY(e.touches[0].clientY);
		setScrollBottom(
			e.currentTarget.scrollHeight - e.currentTarget.offsetHeight,
		);
		setScrollTop(e.currentTarget.scrollTop);
	};
	const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
		const currentTouchY = e.changedTouches[0].clientY;
		const currentScrollTop = e.currentTarget.scrollTop;

		if (currentTouchY < lastTouchY && activeSection < sections.length - 1) {
			// Only switch to the next section if the user has reached the bottom of the current section
			if (
				currentScrollTop + e.currentTarget.offsetHeight >=
				e.currentTarget.scrollHeight
			) {
				e.currentTarget.scrollTop = 0;
				setActiveSection(activeSection + 1);
			}
		} else if (currentTouchY > lastTouchY && activeSection > 0) {
			// Only switch to the previous section if the user has reached the top of the current section
			if (currentScrollTop === 0 && scrollTop === 0) {
				e.currentTarget.scrollTop = 0;
				setActiveSection(activeSection - 1);
			}
		}
		setLastTouchY(0);
	};

	useEffect(() => {
		controls.set({
			opacity: 0,
		});
		controls.start({
			opacity: 1,
			transition: { duration: 0.5 },
		});
	}, [activeSection, controls]);

	return (
		<div
			onWheel={(e) => handleWheel(e)}
			// onTouchMove={(e) => handleTouch(e)}
			onTouchStart={(e) => handleTouchStart(e)}
			onTouchEnd={(e) => handleTouchEnd(e)}
			className="App w-screen min-h-screen flex flex-col"
		>
			<Navbar setActiveSection={setActiveSection} />

			{isMobile ? (
				<div className="sections min-h-full">
					{sections.map((section) => (
						<div key={section.id} className="section">
							{section.content}
						</div>
					))}
				</div>
			) : (
				<>
					<div
						style={{ zIndex: 10, right: "1%", bottom: "40%" }}
						className="absolute flex flex-col justify-center items-center z-10"
					>
						{sections.map((section, index) => (
							<div
								key={section.id}
								className="flex flex-col-reverse"
								style={{
									marginRight: "1rem",
									alignItems: "center",
								}}
							>
								<button onClick={() => setActiveSection(index)} type='button'>
									<Icon
										icon="ant-design:caret-down-outlined"
										style={{
											color: activeSection === index ? "#1E90FF" : "#fff",
										}}
									/>
								</button>
							</div>
						))}
					</div>
					<motion.div animate={controls} className="sections min-h-full">
						{sections[activeSection].content}
					</motion.div>
				</>
			)}
		</div>
	);
}

export default Main;
