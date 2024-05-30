import React from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";
import NewCollections from "../Components/NewCollections/NewCollections";
import NewsLetter from "../Components/NewsLetter/NewsLetter";
import SlideShow from "../Components/SlideShow/SlideShow";
import "./CSS/Shop.css";
import ContentSlide from "../Components/ContentSlider/ContentSlide";

const Shop = () => {
  return (
    <div style={{ background: "black" }}>
      <Hero />
      <div className="slider">
        <div className="sld_content">
          <ContentSlide />
        </div>
        <div className="sld_slideshow">
          <SlideShow />
        </div>
      </div>
      <NewCollections />
      <NewsLetter />
    </div>
  );
};

export default Shop;
