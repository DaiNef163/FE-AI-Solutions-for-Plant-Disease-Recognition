import { Carousel } from "antd";
import React from "react";

function SlideProductPage() {
  const handleNavigation = (targetId) => {
    document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className=" w-3/5 flex justify-center items-center mx-auto">
      <div className="h-full w-full items-center ">
        <Carousel autoplay autoplaySpeed={2000}>
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80"
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80"
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80"
            alt="image 1"
            className="h-full w-full object-cover"
          />
        </Carousel>
      </div>
    </div>
  );
}

export default SlideProductPage;
