import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { motion } from "framer-motion";
import HelloThere from "./HelloThere";
import Bg from "./Bg";

export default function About() {
	const svgString = encodeURIComponent(renderToStaticMarkup(<Bg />));
	return (
		<div
			className="hero h-screen w-screen dark:filter dark:hue-rotate-30"
			style={{
				backgroundImage: `url("data:image/svg+xml,${svgString}")`,
				filter: "",
			}}
		>
			<div className="hero-overlay w-screen bg-opacity-70 filter contrast-125 dark:contrast-100 dark:bg-opacity-40 z-0" />
			<div className="hero-content flex-col lg:flex-row">
				<div className="hero-content text-center text-neutral-content">
					<div className="max-w-md">
						<span className="tooltip">
							<motion.h1
              whileInView={{ opacity: [0, 1], scale: [1.4, 1] }}
								className="
            mb-5 text-5xl font-bold
            animate-pulse
            "
							>
								Hello there
							</motion.h1>
							<HelloThere />
						</span>

						<motion.p
            whileInView={{ opacity: [0, 1], scale: [0.4, 1] }}
            className="mb-5">
							I am a Fullstack Developer currently looking for a remote
							position.
						</motion.p>
						{/* <button className="btn btn-primary">Get Started</button> */}
					</div>
				</div>
			</div>
		</div>
	);
}
