import { Icon } from "@iconify/react";
import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
	return (
		<div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-900 text-white gap-8 dark:bg-white dark:text-black">
			<div className="hero min-h-screen">
				<div className="hero-content flex-col lg:flex-row-reverse m-8 lg:ml-16">
					<div className="text-center lg:text-left">
						<motion.h1
							viewport={{ once: true }}
							initial={{ x: "0%", visibility: "hidden" }}
							whileInView={{ x: ["100%", "0%"], visibility: "visible" }}
							transition={{ duration: 0.35, ease: "easeInOut" }}
							className="text-5xl font-bold"
						>
							Am I a good fit for your company or project?
						</motion.h1>
						<motion.p
							viewport={{ once: true }}
							initial={{ y: "100%", visibility: "hidden" }}
							whileInView={{ y: ["100%", "0%"], visibility: "visible" }}
							transition={{ duration: 0.35, ease: "easeInOut" }}
							className="py-6"
						>
							Let me know! I&apos;m always looking for new opportunities to work
							with great people and fun projects.
						</motion.p>
					</div>
					<motion.div className="flex flex-col items-center min-w-fit">
						<motion.div
							initial={{ x: "-100%", visibility: "hidden" }}
							viewport={{ once: true }}
							whileInView={{ x: ["-100%", "0%"], visibility: "visible" }}
							transition={{ duration: 0.35, ease: "easeInOut" }}
							className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-violet-200 dark:bg-violet-400"
						>
							<div className="card-body">
								<form
									action="mailto:gabrielruizvarela@gmail.com"
									method="get"
									encType="text/plain"
									className="flex flex-col gap-4"
								>
									<input
										type="text"
										name="subject"
										placeholder="Subject"
										className="input input-bordered w-full bg-purple-300 placeholder-gray-800 dark:bg-purple-200"
									/>
									<textarea
										// className="textarea input-bordered w-full"
										className="textarea input-bordered w-full bg-purple-300 placeholder-gray-800 dark:bg-purple-200"
										name="body"
										placeholder="Body"
									/>

									<div className="form-control mt-6">
										<button
											type="submit"
											name="submit"
											value="Send"
											className="btn btn-primary bg-purple-800 dark:bg-pink-400 dark:text-black dark:hover:bg-cyan-100"
										>
											Email me
										</button>
									</div>
								</form>
							</div>
						</motion.div>
						<motion.div
							viewport={{ once: true }}
							initial={{ y: "100%", visibility: "hidden" }}
							whileInView={{ y: ["100%", "0%"], visibility: "visible" }}
							transition={{ duration: 0.35, ease: "easeInOut" }}
							className="flex gap-4 m-4"
						>
							<a
								href="
              https://www.linkedin.com/in/GabrielRuizVarela"
							>
								<Icon icon="akar-icons:linkedin-fill" />
							</a>
							<a
								href="
            https://www.github.com/GabrielRuizVarela"
							>
								<Icon icon="akar-icons:github-fill" />
							</a>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
