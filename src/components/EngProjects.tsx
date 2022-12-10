/* eslint-disable react/jsx-boolean-value */
import React from "react";
import { motion } from "framer-motion";
import { engineeringProjects } from "../assets/data/projects";
import video from "../assets/images/video.webm";

export default function Projects() {
	return (
		<div className="h-min-screen  bg-gray-900 dark:bg-gray-200 grid align-center justify-center sm:h-min min-h-screen w-screen">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px- grid content-center">
				<div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
					<motion.h2
						initial={{ opacity: 0, scale: 1.1 }}
						whileInView={{ opacity: [0, 1], scale: [1.1, 1] }}
						viewport={{ once: true }}
						transition={{ duration: 0.35, ease: "easeInOut" }}
						className="text-2xl pb-16 font-bold text-gray-200 dark:text-gray-900"
					>
						Engineering Projects
					</motion.h2>
					<motion.div
						viewport={{ once: true }}
						initial={{ opacity: 0, x: "-100%" }}
						transition={{ duration: 0.4 }}
						whileInView={{ x: ["-100%", "0%"], opacity: [0, 1] }}
						className="mt-6 pt-8 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0 "
					>
						{engineeringProjects.map((callout) => (
							<div
								key={callout.name}
								className="group relative mx-16 hover:scale-105 transition-transform"
							>
								<div className="relative h-40 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
									{callout.video ? (
										<video
											autoPlay={true}
											muted={true}
											className="group relative h-full w-full object-fit object-center"
										>
											<source src={video} type="video/webm" />
										</video>
									) : (
										<img
											src={callout.imageSrc}
											alt={callout.imageAlt}
											className="h-full w-full object-contain object-center"
										/>
									)}
								</div>
								<h3 className="mt-6 text-sm text-gray-500">
									<a href={callout.href}>
										<span className="absolute inset-0" />
										{callout.name}
									</a>
								</h3>
								<p className="text-base font-semibold dark:text-gray-900">
									{callout.description}
								</p>
							</div>
						))}
					</motion.div>
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
