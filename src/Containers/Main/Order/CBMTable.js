import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {creatCBM} from "./OrderAction";
import axios from "axios";
import { base_url2 } from "../../../Config/Auth";

const CbmCalculator = (props) => {
  const [length, setLength] = useState("0");
  const [width, setWidth] = useState("0");
  const [height, setHeight] = useState("0");
  const [lengthUnit, setLengthUnit] = useState("cm");
  const [weight, setWeight] = useState("0");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [quantity, setQuantity] = useState("1");
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

//   const handleSubmit = async () => {
//     const payload = {
//       length: parseFloat(length),
//       width: parseFloat(width),
//       height: parseFloat(height),
//       lengthUnit,
//       weight: parseFloat(weight),
//       weightUnit,
//       quantity: parseInt(quantity, 10),
//       pkgEfficiency: parseInt(pkgEfficiency, 10),
//     };

    
//     props.creatCBM(payload)
//   };
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
            <div className="flex flex-col w-w47.5.5">
         
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            onKeyPress={handleKeyPress}
            className="mt-1 p-2 border rounded w-full shadow-[0_0.15em_0.3em] shadow-[#aaa]"
            placeholder="Enter Gross Weight"
          />
          </div>
          <div className="flex flex-col w-w47.5.5">
          <select
            value={weightUnit}
            onChange={(e) => setWeightUnit(e.target.value)}
            className="mt-1 p-2 border rounded w-full shadow-[0_0.15em_0.3em] shadow-[#aaa]"
          >
            <option value="kg">kg</option>
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
          <div className="text-2xl font-bold text-center py-2 bg-white rounded-md w-w47.5.5">{results.volumeWeightSea} kg</div>
          <div className="text-2xl font-bold text-center py-2 bg-white rounded-md w-w47.5.5">{results.volumeWeightSealb} lb</div>
          </div>
        </div>

        {/* Volumetric Weight Air */}
        <div className="flex w-wk items-center">
          <h4 className="text-lg font-semibold  w-[30%]">Volumetric Weight Air</h4>
          <div className="flex justify-between w-wk">
          <div className="text-2xl font-bold text-center py-2 bg-white rounded-md w-w47.5.5">{results.volumeWeightAir} kg</div>
          <div className="text-2xl font-bold text-center py-2 bg-white rounded-md w-w47.5.5">{results.volumeWeightAirlb} lb</div>
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


const mapStateToProps = ({order  }) => ({
    cBMData:order.cBMData 
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        creatCBM
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(CbmCalculator);
  