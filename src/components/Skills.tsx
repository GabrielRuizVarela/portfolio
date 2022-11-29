import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const features = [
	{
		name: "Javascript",
		icon: "fa-brands:js-square",
	},
	{
		name: "Typescript",
		icon: "mdi:language-typescript",
	},
	{
		name: "React",
		icon: "akar-icons:react-fill",
	},
	{
		name: "NextJS",
		icon: "akar-icons:nextjs-fill",
	},
	{
		name: "Redux",
		icon: "tabler:brand-redux",
	},
	{
		name: "Node",
		icon: "fa6-brands:node",
	},
	{
		name: "Python ",
		icon: "akar-icons:python-fill",
	},
	{
		name: "Matlab",
		icon: "file-icons:matlab",
	},
	{
		name: "MongoDB",
		icon: "teenyicons:mongodb-outline",
	},
	{
		name: "Express",
		icon: "simple-icons:express",
	},
	{
		name: "Git",
		icon: "mdi:git",
	},
	{
		name: "HTML",
		icon: "mdi:language-html5",
	},
	{
		name: "CSS",
		icon: "mdi:language-css3",
	},
	{
		name: "Sass",
		icon: "mdi:sass",
	},
	{
		name: "Tailwind",
		icon: "mdi:tailwind",
	},
];

export default function Skills() {
	return (
		<div className="bg-zinc-900 dark:bg-indigo-300 py-12 min-h-screen grid content-center w-screen justify-center">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="lg:text-center">
					<motion.p
						whileInView={{ opacity: [0, 1], scale: [0, 1] }}
            transition={{ duration: 0.2 }}
						className="text-3xl font-bold leading-8 tracking-tight text-gray-200 dark:text-black sm:text-4xl"
					>
						Skills
					</motion.p>
				</div>

				<div className="mt-10 flex flex-wrap container mx-auto px-32 justify-center">
					{features.map((feature, index) => (
						<motion.div
							whileInView={{ opacity: [0, 1] }}
							transition={{ duration: 0.5, delay: index * 0.05 }}
							key={feature.name}
							className="drop-shadow-md"
						>
							<div className="flex m-2 mb-1 h-12 w-12 items-center justify-center rounded-md bg-indigo-300 dark:bg-zinc-900 text-black dark:text-white">
								<Icon
									icon={feature.icon}
									className="h-6 w-6"
									aria-hidden="true"
								/>
							</div>
							<p className="text-xs leading-6 font-medium text-white dark:text-black">
								{feature.name}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
