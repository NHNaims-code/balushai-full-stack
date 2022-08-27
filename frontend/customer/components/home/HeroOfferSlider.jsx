import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image'

export default function HeroOfferSlider(){


   /*  const PrevArrowButton = (props) => {
      console.log(props)
      const {className, onClick} = props
      return(<div 
        className={className} 
        onClick={onClick}>
          <i className={`fa-light fa-chevron-right text-white`}></i>
        </div>)
    }

    const NextArrowButton = (props) => {
      const {className, onClick} = props
      return(<div className={className} onClick={onClick} style={{color: 'white'}}>Next</div>)
    } */

    const settings = {
      dots: false,
      lazyLoad: true,
      autoplay: true,
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      // prevArrow:<PrevArrowButton/>,
      // nextArrow:<NextArrowButton/>,
      customPaging: (index) => {
        return <div></div>
      },
      dotsClass: 'slick-dots custom-indicator'
    };

    return (
      <div className="w-full">
        <Slider {...settings}>
          <div>
            <div className="bg-white my-4 mx-1 p-1 rounded-lg shadow-md flex flex-col">
              <div className="h-32 bg-center bg-cover bg-no-repeat" style={{backgroundImage: `url('/home-slider-images/slide1.webp')`}}></div>
              <p className="font-semibold text-center">Price: $100</p>
              <button className="bg-[#D23E41] text-white px-2 py-1 text-sm mt-1">Buy Now</button>
            </div>
          </div>
          <div>
            <div className="bg-white my-4 mx-1 p-1 rounded-lg shadow-md flex flex-col">
              <div className="h-32 bg-center bg-cover bg-no-repeat" style={{backgroundImage: `url('/home-slider-images/slide2.webp')`}}></div>
              <p className="font-semibold text-center">Price: $100</p>
              <button className="bg-[#D23E41] text-white px-2 py-1 text-sm mt-1">Buy Now</button>
            </div>
          </div>
          <div>
            <div className="bg-white my-4 mx-1 p-1 rounded-lg shadow-md flex flex-col">
              <div className="h-32 bg-center bg-cover bg-no-repeat" style={{backgroundImage: `url('/home-slider-images/slide3.webp')`}}></div>
              <p className="font-semibold text-center">Price: $100</p>
              <button className="bg-[#D23E41] text-white px-2 py-1 text-sm mt-1">Buy Now</button>
            </div>
          </div>
          <div>
            <div className="bg-white my-4 mx-1 p-1 rounded-lg shadow-md flex flex-col">
              <div className="h-32 bg-center bg-cover bg-no-repeat" style={{backgroundImage: `url('/home-slider-images/slide4.webp')`}}></div>
              <p className="font-semibold text-center">Price: $100</p>
              <button className="bg-[#D23E41] text-white px-2 py-1 text-sm mt-1">Buy Now</button>
            </div>
          </div>
          <div>
            <div className="bg-white my-4 mx-1 p-1 rounded-lg shadow-md flex flex-col">
              <div className="h-32 bg-center bg-cover bg-no-repeat" style={{backgroundImage: `url('/home-slider-images/slide4.webp')`}}></div>
              <p className="font-semibold text-center">Price: $100</p>
              <button className="bg-[#D23E41] text-white px-2 py-1 text-sm mt-1">Buy Now</button>
            </div>
          </div>
          
          
        </Slider>
      </div>
    );
}