import React from "react";
import "./Hero.css";
import video from "../../images/video.mp4";

const Hero = () => {
  return (
    <div className="hero">
      <video className="hero_video" src={video} autoPlay muted loop />
      <div className="hero_content">
        <button className="hero_btn1">Breaking news</button>
        <h2 className="hero_h2">Tempor Consectetur Est Elit</h2>
        <p className="hero_p">
          Dec 24, 2022<button className="hero_btn2">5 mins read</button>
        </p>
      </div>
    </div>
  );
};

export default Hero;
