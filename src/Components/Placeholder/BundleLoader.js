import React from 'react'
import FWLogo1 from "../../Assets/Images/smallLogo.png";

const BundleLoader = () => {
  return (
//     <div><div className=" flex items-center justify-center flex-col h-[65vh]">
//     <div className="loader !block "> </div>
// <div className="flex items-center justify-center flex-col" ><img src={FWLogo1}   className="w-12 -mt-[5.5rem]"  alt="Loading..."  /></div>
// </div></div>
<div className="flex justify-center items-center h-[83vh] w-full max-md:h-[23vh]">
      <div className="relative w-16 h-16">
        {/* Spinning border */}
        <div style={{ borderStyle: 'inset' }} className="absolute w-full h-full border-4 border-t-4 border-blue-300  rounded-full animate-spin"></div>
        
        {/* Image inside the loader */}
        <img 
          src={FWLogo1} // Use your image URL
          alt="Loading"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12"
        />
      </div>
    </div>

  )
}

export default BundleLoader
