import React from "react";

export default function Contact() {
	return (
		<div className="w-screen h-screen flex flex-col justify-center items-center bg-white text-black gap-8">
			<h1 className="text-4xl font-bold">Contact</h1>
			<p className="text-2xl">
				Email:{" "}
				<a href="mailto:gabrielruizvarela@gmail.com" className="text-blue-500 ">
					Gabrielruizvarela@gmail.com
				</a>
			</p>
			<p className="text-2xl">
				LinkedIn:{" "}
				<a
					href="https://www.linkedin.com/in/GabrielRuizVarela"
					className="text-blue-500"
				>
					@GabrielRuizVarela
				</a>
			</p>
			<p className="text-2xl">
				GitHub:{" "}
				<a
					href="https://www.github.com/GabrielRuizVarela"
					className="text-blue-500"
				>
					@GabrielRuizVarela
				</a>
			</p>
		</div>
	);
}
