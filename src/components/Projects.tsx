import { Icon } from "@iconify/react";
import React from "react";
import { motion } from "framer-motion";
import { webProjects } from "../assets/data/projects";
// import video from '../assets/images/video.webm';

export default function Projects() {
	return (
		<div className="h-min-screen bg-black dark:bg-purple-100  align-center justify-center sm:h-min min-h-screen w-screen">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid content-center">
				<div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32 ">
					<motion.h2
						viewport={{ once: true }}
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.55, ease: "easeInOut", delay: 0.3 }}
						className="text-2xl pb-6 font-bold text-gray-200 dark:text-gray-900 "
					>
						Web Dev Projects
					</motion.h2>
					<div className="mt-6 pt-8 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-16 xl:justify-evenly lg:space-y-0">
						{webProjects.map((callout) => (
							<div key={callout.name}>
								<div
									className="group relative  
                 hover:scale-105 
                 transition-transform"
								>
									<a href={callout.href}>
										<motion.div
											viewport={{ once: true }}
											initial={{ opacity: 0, x: "100%" }}
											whileInView={{
												x: ["100%", "0%"],
												opacity: 1,
											}}
											transition={{ duration: 0.4, delay: 0.5 }}
											className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 
                    lg:aspect-h-1 
                    "
										>
											<img
												src={callout.imageSrc}
												alt={callout.imageAlt}
												className="h-full w-full object-cover object-center"
											/>
										</motion.div>
										<motion.h3
											viewport={{ once: true }}
											initial={{ opacity: 0, x: "-100%" }}
											whileInView={{ x: ["-100%", "0%"], opacity: 1 }}
											className="mt-6 text-sm text-gray-500"
										>
											<span className="absolute inset-0" />
											{callout.name}
										</motion.h3>
									</a>
									<motion.p
										viewport={{ once: true }}
										initial={{ opacity: 0, x: "-100%" }}
										whileInView={{ x: ["-100%", "0%"], opacity: 1 }}
										className="text-base font-semibold dark:text-gray-900"
									>
										{callout.description}
									</motion.p>
									{/* <button
									type="button"
									className="btn btn-outline hover:scale-105 transition-transform m-2 text-2xl"
								> */}
								</div>
								<motion.button
									viewport={{ once: true }}
									initial={{ opacity: 0 }}
									whileInView={{
										x: ["20%", "-30%", "40%", "-50%", "0%"],
										opacity: [0, 1],
									}}
									type="button"
									className="btn btn-outline hover:scale-205 transition-transform m-2 text-2xl"
								>
									<a href={callout.repo}>
										<div className="text-gray-100 dark:text-gray-900 justify-center items-center flex m-2 hover:scale-110 transition-transform">
											{/* github icon */}
											<Icon icon="mdi:github" />
										</div>
									</a>
								</motion.button>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

// {/* <h2 className="flex flex-col text-2xl font-bold text-gray-200 dark:text-gray-900">
//             Web
//           </h2>
//           <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
//             <div className="group relative">
//               <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
//                 <video
//                   autoPlay
//                   muted
//                   className="group relative h-full w-full object-cover object-center"
//                 >
//                   <source src={video} type="video/webm" />
//                 </video>
//               </div>
//               <h3 className="mt-6 text-sm text-gray-500">
//                 <a href="https://drive.google.com/file/d/12xD_orI_FXxF6glyaHA1aQex5ILdyOxO/view?usp=sharing">
//                   <span className="absolute inset-0" />
//                   {/* {callout.name} */}
//                 </a>
//               </h3>
//               <p className="text-base font-semibold text-gray-900">
//                 {/* {callout.description} */}
//               </p>
//             </div>
//           </div> */}
