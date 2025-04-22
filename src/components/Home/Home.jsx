import React from 'react';

const Home = () => {
    return (
        <div>
               <div className="carousel w-full">
  <div id="item1" className="carousel-item w-full">
    <img
      src="https://i.ibb.co.com/8ZNctYR/pexels-changerstudio-140831.jpg"
      className="w-full" />
  </div>
  <div id="item2" className="carousel-item w-full">
    <img
      src="https://i.ibb.co.com/8ZNctYR/pexels-changerstudio-140831.jpg"
      className="w-full" />
  </div>
  <div id="item3" className=" w-full">
    <img
      src="https://i.ibb.co.com/8ZNctYR/pexels-changerstudio-140831.jpg"
      className="w-full h-2/3" />
  </div>
  <div id="item4" className="carousel-item w-full">
    <img
      src="https://i.ibb.co.com/8ZNctYR/pexels-changerstudio-140831.jpg"
      className="w-full" />
  </div>
</div>
<div className="flex w-full justify-center gap-2 py-2">
  <a href="#item1" className="btn btn-xs">1</a>
  <a href="#item2" className="btn btn-xs">2</a>
  <a href="#item3" className="btn btn-xs">3</a>
  <a href="#item4" className="btn btn-xs">4</a>
</div> 
        </div>
    );
};

export default Home;