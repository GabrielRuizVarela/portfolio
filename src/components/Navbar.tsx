import React from "react";
import { motion } from "framer-motion";
// a navbar for my personal portfolio as a web developer
export default function Navbar({
	setActiveSection,
}: { setActiveSection: (id: number) => void }) {
	return (
		<motion.div
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			className="navbar bg-black bg-opacity-20 dark:bg-stone900 dark:bg-opacity-60 h-min fixed lg:px-12 z-10"
		>
			<div className="flex-1">
				<span className="btn btn-ghost normal-case text-xl">
					<a href="https://github.com/GabrielRuizVarela">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							// fill='white'
							className="fill-white "
						>
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
						</svg>
					</a>
				</span>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal p-0">
					<li className="xs:hidden sm:block">
						<button type="button" onClick={() => setActiveSection(0)}>
							About
						</button>
					</li>
					<li className="xs:hidden sm:block">
						<button type="button" onClick={() => setActiveSection(1)}>
							Projects
						</button>
					</li>
					<li className="xs:hidden sm:block">
						<button type="button" onClick={() => setActiveSection(3)}>
							Skills
						</button>
					</li>
					<li className="xs:hidden sm:block">
						<button type="button" onClick={() => setActiveSection(4)}>
							Contact
						</button>
					</li>
					{/* github logo with link */}
					<li>
						<label className="swap swap-rotate h-5 self-center">
							{/* <!-- this hidden checkbox controls the state --> */}
							<input
								name="theme"
								type="checkbox"
								onClick={() => {
									const body = document.querySelector("html");
									body?.classList.toggle("dark");
								}}
							/>

							{/* <!-- sun icon --> */}
							<svg
								className="swap-on fill-current w-5 h-5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
							</svg>

							{/* <!-- moon icon --> */}
							<svg
								className="swap-off fill-current w-5 h-5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
							</svg>
						</label>
					</li>
				</ul>
			</div>
		</motion.div>
	);
}
