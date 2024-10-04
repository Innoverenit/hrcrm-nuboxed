// import React, { useState, useEffect,lazy } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { FormattedMessage } from 'react-intl';
// import InfiniteScroll from "react-infinite-scroll-component";
// import {getProcureOrderDetails} from "./OrderAction";
// import {  Button } from "antd";

// function CBMTable (props) {
  
// const [pageNo, setPageNo] = useState(0);
// const [hasMore, setHasMore] = useState(true);


// useEffect(()=>{
//     //props.getProcureOrderDetails(props.rowDatas.orderId);
// },[]);


// const [RowData, setRowData] = useState("");

// function handleSetRowData(item) {
//     setRowData(item);
// }


//     return (
//         <>
//              <div> 
             
// <div className=' flex justify-end sticky flex-col z-auto'>
// <div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
// <div className=" flex rounded  max-sm:hidden w-[99%] mt-1 p-1 bg-transparent font-bold sticky top-0 z-10">
//                                     <div className=" md:w-[10rem]"><FormattedMessage
//                                         id="app.name"
//                                         defaultMessage="Name"
//                                     /></div>
//                                     <div className=" md:w-[4.5rem]"><FormattedMessage
//                                         id="app.model"
//                                         defaultMessage="Model"
//                                     /></div>
//                                     <div className="md:w-[6.2rem]"><FormattedMessage
//                                         id="app.brand"
//                                         defaultMessage="Brand"
//                                     /></div>
//                                     <div className=" md:w-[5rem]"><FormattedMessage
//                                         id="app.category"
//                                         defaultMessage="Category"
//                                     /></div>
//                                     <div className=" md:w-[5.1rem]"><FormattedMessage
//                                         id="app.attribute"
//                                         defaultMessage="Attribute"
//                                     /></div>
        
//                                     <div className=" md:w-[6.5rem]"><FormattedMessage
//                                         id="app.price"
//                                         defaultMessage="Price"
//                                     /></div>
//                          <div className=" md:w-[6.5rem]"><FormattedMessage
//                                         id="app.units"
//                                         defaultMessage="Units"
//                                     /></div>
                                   
//                                     <div className=" md:w-[5rem]">Lenghth</div>
//                                     <div className=" md:w-[5rem]">Height</div>
//                                     <div className=" md:w-[5rem]">Width</div>
//                                 </div>
                              
//                                     {/* <InfiniteScroll
//                                         dataLength={props.orderProcureDetails.length}
//                                         loader={props.fetchingProcureOrderDetails ? <div class="flex justify-center">Loading...</div> : null}
                                  
//                                         hasMore={hasMore}
     
//                                         height={"65vh"}
//                                     >
//                                         {props.orderProcureDetails.map((item) => {
//                                             return (
//                                                 <div>
//                                                    <div
//                 className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[6rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
//                                                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
//                                                             <div className="font-medium   md:w-[10rem] max-sm:flex-row  max-sm:justify-between  ">
//                                                                 <div class=" text-xs text-cardBody font-poppins">
//                                                                     {item.productFullName}
//                                                                 </div>
//                                                             </div>

//                                                             <div className=" flex font-medium   md:w-[4.5rem] max-sm:flex-row  max-sm:justify-between  ">
//                                                                 <div class=" text-xs text-cardBody font-poppins">
//                                                                     {item.model}
//                                                                 </div>

//                                                             </div>
//                                                             </div>
//                                                             <div class="flex max-sm:justify-between max-sm:w-wk items-center">
//                                                             <div className=" flex font-medium   md:w-[4.5rem] max-sm:flex-row  max-sm:justify-between  ">
//                                                                 <div class=" text-xs text-cardBody font-poppins">
//                                                                     {item.brand}
//                                                                 </div>
//                                                             </div>
                                                            
//                                                             <div className=" flex font-medium   md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
//                                                                 <div class=" text-xs text-cardBody font-poppins">
//                                                                     {item.category}
//                                                                 </div>
//                                                             </div>
//                                                             </div>
//                                                             <div class="flex max-sm:justify-between max-sm:w-wk items-center">
//                                                             <div className=" flex font-medium   md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
//                                                                 <div class=" text-xs text-cardBody font-poppins">
//                                                                     {item.attribute} 
//                                                                 </div>
//                                                             </div>
                                                    
//                                                             <div className=" flex font-medium   md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
//                                                                 <div class=" text-xs text-cardBody font-poppins">
//                                                                     {item.price} 
//                                                                 </div>
//                                                             </div>     
//                                                             <div className=" flex font-medium   md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
//                                                                 <div class=" text-xs text-cardBody font-poppins">
//                                                                     {item.unit} 
//                                                                 </div>
//                                                             </div>   

//                                                             <Button
//                                                 type='primary'
//                                             //   onClick={() => {
//                                             //             props.repeatOrder({ordreId:item.orderId});
//                                             //             handleRowData(item);
//                                             //         }}
//                                                 >
//                                                     Cancel Order
//                                                     </Button>  
//                                                         </div>

//                                                     </div>
//                                                 </div>
//                                             )
//                                         })}
//                                     </InfiniteScroll> */}
                               
//                             </div>

//                         </div>
               
        
                
//             </div>
            
//         </>
//     );
// }
// const mapStateToProps = ({ order}) => ({
//     // phonListNoteModal: myorder.phonListNoteModal,
//     orderProcureDetails:order.orderProcureDetails,
//     // openFeedbackpHnOrDrawer:myorder.openFeedbackpHnOrDrawer,
//     fetchingProcureOrderDetails:order.fetchingProcureOrderDetails
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getProcureOrderDetails,
//             // handlePhoneListOrderNoteModal,
//             // handleFeedbackPhoneOrderDrawer,

//         },
//         dispatch
//     );

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(CBMTable);


import React, { useState } from "react";
import axios from "axios";
import { base_url2 } from "../../../Config/Auth";

const CbmCalculator = () => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lengthUnit, setLengthUnit] = useState("cm");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("Kg");
  const [quantity, setQuantity] = useState("");
  const [pkgEfficiency, setPkgEfficiency] = useState("100");
  const [results, setResults] = useState({
    volumeM3: 0,
    volumeFt3: 0,
    grossWeight: 0,
    weightLb: 0,
    volumetricWeightSea: 0,
    volumetricWeightAir: 0,
    volumeWeightAir:0,
    volumeWeightAirlb:0,
    volumeWeightSealb:0,
    volumeWeightSea:0,
    volumeCubicMeter:0,
    volumeCubicFeet:0,
    totalWeightKg:0,
    totalWeightLb:0,
    container20Ft:0,
    container40Ft:0,
    container40FtHc:0
  });

  const handleSubmit = async () => {
    const payload = {
      length: parseFloat(length),
      width: parseFloat(width),
      height: parseFloat(height),
      lengthUnit,
      weight: parseFloat(weight),
      weightUnit,
      quantity: parseInt(quantity, 10),
      pkgEfficiency: parseInt(pkgEfficiency, 10),
    };

    try {
        const response = await axios.post(`${base_url2}/calculator/calculate`, payload);
      setResults(response.data); // Assuming response data has the required structure
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  const handlePkgEfficiencyChange = (e) => {
    const value = e.target.value;
    if (value <= 100) {
      setPkgEfficiency(value);
    } else {
      setPkgEfficiency("100"); // Set to 100 if the input exceeds 100
      // Optionally, you can add an alert or message here to inform the user
      alert("Package Efficiency cannot exceed 100%");
    }
  };
  return (
    <div className="p-6 bg-gray-100 rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">CBM Calculator</h2>
      <div className="flex flex-col gap-4">
        {/* Input Fields */}
        <div className="w-wk flex  items-center" >
        <label className="block text-sm font-medium text-gray-700 w-[23%]">Unit of measurement</label>
        <div className="w-[77%]">
        <select
            value={lengthUnit}
            onChange={(e) => setLengthUnit(e.target.value)}
            className="p-2 border rounded w-full shadow-[0_0.15em_0.3em] shadow-[#aaa]"
          >
            <option value="cm">cm</option>
            <option value="mm">mm</option>
            <option value="meter">meter</option>
            <option value="yard">yard</option>
            <option value="ft">ft</option>
            <option value="inch">inch</option>
          </select>
          </div>
          </div>
          <div className="w-wk flex  items-center" >
          <label className="block text-sm font-medium text-gray-700  w-[23%]">Length</label>
          <div className="w-[77%]">
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            onKeyPress={handleKeyPress}
            className="mt-1 p-2 border rounded w-full shadow-[0_0.15em_0.3em] shadow-[#aaa]"
            placeholder="Enter Length"
          />
        </div>
        </div>

        <div className="w-wk flex  items-center" >
          <label className="block text-sm font-medium text-gray-700 w-[23%]">Width</label>
          <div className="w-[77%]">
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            onKeyPress={handleKeyPress}
            className="mt-1 p-2 border rounded w-full shadow-[0_0.15em_0.3em] shadow-[#aaa]"
            placeholder="Enter Width"
          />
          </div>
        </div>

        <div className="w-wk flex  items-center" >
          <label className="block text-sm font-medium text-gray-700 w-[23%]">Height</label>
          <div className="w-[77%]">
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            onKeyPress={handleKeyPress}
            className="mt-1 p-2 border rounded w-full shadow-[0_0.15em_0.3em] shadow-[#aaa]"
            placeholder="Enter Height"
          />
          </div>
        </div>

        <div className="flex w-wk items-center">
        <label className="block text-sm font-medium text-gray-700 w-[30%]">Gross Weight</label>
        <div className="flex justify-between w-wk">
            <div className="flex flex-col w-w47.5">
         
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            onKeyPress={handleKeyPress}
            className="mt-1 p-2 border rounded w-full shadow-[0_0.15em_0.3em] shadow-[#aaa]"
            placeholder="Enter Gross Weight"
          />
          </div>
          <div className="flex flex-col w-w47.5">
          <select
            value={weightUnit}
            onChange={(e) => setWeightUnit(e.target.value)}
            className="mt-1 p-2 border rounded w-full shadow-[0_0.15em_0.3em] shadow-[#aaa]"
          >
            <option value="Kg">Kg</option>
            <option value="gm">gm</option>
          </select>
          </div>
          </div>
        </div>

        <div className="w-wk flex  items-center" >
          <label className="block text-sm font-medium text-gray-700 w-[23%]">Quantity</label>
          <div className="w-[77%]">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            onKeyPress={handleKeyPress}
            className="mt-1 p-2 border rounded w-full shadow-[0_0.15em_0.3em] shadow-[#aaa]"
            placeholder="Enter Quantity"
          />
          </div>
        </div>

        <div className="w-wk flex  items-center" >
          <label className="block text-sm font-medium text-gray-700 w-[23%]">Package Efficiency %</label>
          <div className="w-[77%]">
          <input
            type="number"
            value={pkgEfficiency}
            onChange={handlePkgEfficiencyChange}
            onKeyPress={handleKeyPress}
            className="mt-1 p-2 border rounded w-full shadow-[0_0.15em_0.3em] shadow-[#aaa]"
            placeholder="Enter Package Efficiency"
          />
        </div>
        </div>
      </div>

      {/* Result Display */}
      <div className="mt-6 flex flex-col gap-4">
        {/* Volume Cubic Meter */}
        <div className="flex justify-between">
        <div className="w-wk flex flex-col items-center" >
          <h4 className="text-lg font-semibold text-center w-[98%]">Volume (Cubic Meter) m<sup>3</sup></h4>
          <div className="text-2xl bg-white font-bold text-center py-2  rounded-md w-[98%]">{results.volumeCubicMeter}</div>
        </div>

        {/* Volume Cubic Feet */}
        <div className="w-wk flex flex-col items-center" >
          <h4 className="text-lg font-semibold text-center w-[98%]">Volume (Cubic Feet) ft<sup>3</sup></h4>
          <div className="text-2xl font-bold text-center py-2 bg-white rounded-md w-[98%]">{results.volumeCubicFeet}</div>
        </div>
        </div>
        {/* Weight (Kg) */}
        <div className="flex w-wk items-center">
          <h4 className="text-lg font-semibold  w-[23%]">Weight (Kg)</h4>
          <div className="text-2xl font-bold text-center py-2 bg-white rounded-md w-[77%]">{results.totalWeightKg}</div>
        </div>

        {/* Weight (lb) */}
        <div className="flex w-wk items-center">
          <h4 className="text-lg font-semibold  w-[23%]">Weight (lb)</h4>
          <div className="text-2xl font-bold text-center py-2 bg-white rounded-md  w-[77%]">{results.totalWeightLb}</div>
        </div>

        {/* Volumetric Weight Sea */}
        <div className="flex w-wk items-center">
          <h4 className="text-lg font-semibold  w-[30%]">Volumetric Weight Sea</h4>
          <div className="flex justify-between w-wk">
          <div className="text-2xl font-bold text-center py-2 bg-white rounded-md w-w47.5">{results.volumeWeightSea} kg</div>
          <div className="text-2xl font-bold text-center py-2 bg-white rounded-md w-w47.5">{results.volumeWeightSealb} lb</div>
          </div>
        </div>

        {/* Volumetric Weight Air */}
        <div className="flex w-wk items-center">
          <h4 className="text-lg font-semibold  w-[30%]">Volumetric Weight Air</h4>
          <div className="flex justify-between w-wk">
          <div className="text-2xl font-bold text-center py-2 bg-white rounded-md w-w47.5">{results.volumeWeightAir} kg</div>
          <div className="text-2xl font-bold text-center py-2 bg-white rounded-md w-w47.5">{results.volumeWeightAirlb} lb</div>
          </div>
        </div>
        <div className="flex w-wk items-center">
          <h4 className="text-lg font-semibold  w-[23%]">20 Feet Container</h4>
          <div className="text-2xl font-bold text-center py-2 bg-white rounded-md w-[77%]">{results.container20Ft} </div>
        </div>
        <div className="flex w-wk items-center">
          <h4 className="text-lg font-semibold  w-[23%]">40 Feet Container</h4>
          <div className="text-2xl font-bold text-center py-2 bg-white rounded-md w-[77%]">{results.container40Ft} </div>
        </div>
        <div className="flex w-wk items-center">
          <h4 className="text-lg font-semibold  w-[23%]">40 Feet HC Container</h4>
          <div className="text-2xl font-bold text-center py-2 bg-white rounded-md w-[77%]">{results.container40FtHc} </div>
        </div>
      </div>
    </div>
  );
};

export default CbmCalculator;
