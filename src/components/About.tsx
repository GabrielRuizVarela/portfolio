import React from "react";

export default function About() {
	return (
		// <div className="hero min-h-screen  bg-cover bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
		<div className="hero h-screen w-screen">
			{/* <img src={bgSVG} alt="" className="absolute inset-0 w-full h-full" style={{zIndex: -1}}/> */}
			<svg
				id="visual"
				className="relative inset-0 dark:filter dark:hue-rotate-15 h-screen"
				xmlns="http://www.w3.org/2000/svg"
				width="100vw"
				height="100vh"
				version="1.1"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				preserveAspectRatio="xMidYMid slice"
				xmlSpace="preserve"
				enableBackground="new 0 0 50 100"
				// viewBox="0 0 1000 1000"
				style={{ zIndex: -1 }}
			>
				<defs>
					<filter id="blur1" x="-10%" y="-10%" width="120vw" height="120vh">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="BackgroundImageFix"
							result="shape"
						/>
						<feGaussianBlur
							stdDeviation="163"
							result="effect1_foregroundBlur"
						/>
					</filter>
				</defs>
				<rect
					className="w-full h-full"
					width="100vw"
					height="100vh"
					fill="#6600FF"
				/>
				<g filter="url(#blur1)">
					<circle cx="779" cy="386" fill="#000000" r="363" />
					<circle cx="931" cy="65" fill="#6600FF" r="363" />
					<circle cx="405" cy="261" fill="#000000" r="363" />
					<circle cx="156" cy="272" fill="#000000" r="363" />
					<circle cx="0" cy="0" fill="rgb(32, 1, 1)" r="363" />
					<circle cx="0" cy="500" fill="rgb(137, 115, 115)" r="363" />
					<circle cx="33" cy="531" fill="#6600FF" r="363" />
					<circle cx="597" cy="483" fill="#000000" r="363" />
					<circle cx="1000" cy="500" fill="#6600FF" r="363" />
					<circle cx="1040" cy="234" fill="#000000" r="363" />
				</g>
			</svg>
			<div className="hero-overlay w-screen bg-opacity-70 filter contrast-125 dark:contrast-100 dark:bg-opacity-40 z-0" />
			<div className="hero-content flex-col lg:flex-row">
				{/* <img src={profileImg} className="max-w-sm rounded-lg shadow-2xl" /> */}
				<div className="hero-content text-center text-neutral-content">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold">Hello there</h1>

						<p className="mb-5">
							I am a web developer with a passion for learning and creating. I
							am currently working on my portfolio and learning new
							technologies.
						</p>
						{/* <button className="btn btn-primary">Get Started</button> */}
					</div>
				</div>
			</div>
		</div>
	);
}
