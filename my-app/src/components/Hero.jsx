import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import HeroItem from './HeroItem';
import { heroItems } from '../data/heroItems';
import leftArrow from "../assets/arrow-left-circle.svg"
import rightArrow from "../assets/arrow-right-circle.svg"

const Hero = () => {
    const responsiveCarouselConfig = {
        showArrows: true,
        showStatus: true,
        showIndicators: false,
        infiniteLoop: true,
        showThumbs: false,
        autoPlay: true,
        interval: 2000,
        transitionTime: 800,
        swipeable: true,
        dynamicHeight: false,
        emulateTouch: false,
        selectedItem: 0,
        axis: 'horizontal',
        useKeyboardArrows: false,
        autoPlayInterval: 3000,
        transitionTimeUnit: 'ms',
        swipeScrollTolerance: 5
      };

  return (
    <div>
        <Carousel 
            {...responsiveCarouselConfig} 
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    className=" text-[#ff4500] w-[30px] absolute top-1/2 left-0 z-[4000] ml-4 hover:bg-white  rounded-full"
                  >
                    <img className=' w-full' src={leftArrow} alt="" />
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    className=" text-[#ff4500] w-[30px] absolute right-0 top-1/2 mr-4 hover:bg-white rounded-full"
                  >
                    <img src={rightArrow} alt="" />
                  </button>
                )
              }
            
            >
            {heroItems.map((item)=>(
                <HeroItem
                    key={item._id}
                    itemId={item.id}
                    image={item.image}
                    title={item.title}
                />
            ))
            }
        </Carousel>
    </div>
  )
}

export default Hero