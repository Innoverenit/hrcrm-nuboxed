import React from 'react'
import FWLogo1 from "../../Assets/Images/smallLogo.png";

const BundleLoader = () => {
  return (
    <div><div className="custom-loader">
    <div className="loader !block"> </div>
<div className="custom-loader" ><img src={FWLogo1}   className="w-12 -mt-[5.5rem]"  alt="Loading..."  /></div>
</div></div>
  )
}

export default BundleLoader
