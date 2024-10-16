import React from "react";
import  Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ShopButton from "./ShopButton";
import SingleProduct from "./SingleProduct";

function ProductsCarousel({ title, data }) {

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 976 },
          items: 4
          
        },
        tablet: {
          breakpoint: { max: 976, min: 745 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 745, min: 515 },
          items: 2
        },
        small: {
            breakpoint: { max: 515, min: 465 },
            items: 2
          },

          smallest: {
            breakpoint: { max: 465, min:0 },
            items: 1
          }
      };

    return <div className="">
        <div className=" flex justify-between py-2.5 border-b-[1px] border-solid border-black mb-4">
            <h1 className=" text-3xl font-extralight tracking-wider">{title}</h1>
            <div className="flex">
                <ShopButton
                  buttonContent='Shop Now'
                  backgroundColor='[#f0f0f0]'
                  textColor='black'
                  shop={true}
                  path='/shop'
                />
            </div>
        </div>
        <Carousel 
                    className=" bg-[#f0f0f0] "
                    responsive={responsive}
                    infinite={true}
                    arrows={true}
                    draggable={true}
                    autoPlay={true}
                    autoPlaySpeed={2000}
                    keyBoardControl={true}
                    customTransition="transform 500ms ease-in-out"
                    transitionDuration={500}
                    partialVisible={false}
                    containerClass=""
                    itemClass=" flex justify-center"
                >
            {data.map((product)=>(
                <SingleProduct
                    key={product._id}
                    product={product}
                    bool={true}
                />
            )) }
        </Carousel> 
    </div>
}

export default ProductsCarousel