import React, { useMemo } from "react";

export default function Bg() {
	const svg = useMemo(
		() => (
			<svg
				id="visual"
				className="relative inset-0 dark:filter dark:hue-rotate-15 h-screen"
				xmlns="http://www.w3.org/2000/svg"
				style={{ zIndex: -1 }}
			>
				<defs>
					<filter id="blur1" x="-10%" y="-10%" width="10vw" height="10vh">
						{/* <feFlood floodOpacity="0" result="BackgroundImageFix" /> */}
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
					{/* <circle cx="597" cy="483" fill="#000000" r="363" /> */}
					{/* <circle cx="1000" cy="500" fill="#6600FF" r="363" /> */}
					<circle cx="40" cy="934" fill="#000000" r="363" />
				</g>
			</svg>
		),
		[],
	);

	return svg;
}
