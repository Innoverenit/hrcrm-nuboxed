import React,{Suspense} from 'react'



import FWLogo1 from "../../Assets/Images/smallLogoImg.webp";

const BundleLoader = () => {
  return (
    <>
 

<div className="flex justify-center items-center h-[83vh] w-full max-md:h-[23vh] max-sm:h[34vh]">
      <div className="relative w-16 h-16">
       
        <div style={{ borderStyle: 'inset' }} className="absolute w-full h-full border-4 border-t-4 border-blue-300  rounded-full animate-spin"></div>
      
        
        <img 
          src={FWLogo1} // Use your image URL
          alt="Loading"
             width="48"
            height="48"
            loading="lazy"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12"
        />
              

      </div>
    </div>
    </>

  )
}

export default BundleLoader
