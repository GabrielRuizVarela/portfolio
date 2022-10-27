import React from 'react';
import profileImg from '../assets/profile.jpg';
// About section for my personal portfolio as a web developer
export default function About() {
  return (
    <div
      className="hero min-h-screen bg-about"
      // style={{ backgroundImage: `url("https://placeimg.com/1000/800/arch")` }}
    >
      <div className="hero-overlay bg-opacity-60" />
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
