import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import "./SlideShow.css";
import image1 from "../../images/hp2_clock1.jpg";
import image2 from "../../images/hp2_clock2.jpg";
import image3 from "../../images/hp2_clock3.jpg";

const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
};

const divStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "600px",
};
const slideImages = [
  {
    url: image1,
    caption: "Slide 1",
  },
  {
    url: image2,
    caption: "Slide 2",
  },
  {
    url: image3,
    caption: "Slide 3",
  },
];
const SlideShow = () => {
  return (
    <div className="slide-container">
      <Slide
        autoplay={true}
        duration={2500}
        transitionDuration={1000}
        infinite={true}
      >
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
            ></div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default SlideShow;
