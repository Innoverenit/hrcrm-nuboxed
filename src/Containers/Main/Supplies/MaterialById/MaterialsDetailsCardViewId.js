import React, { useEffect,useState } from "react";
import ImageGallery from 'react-image-gallery';
import axios from 'axios';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Input, Select } from "antd";
import Carousel from "react-elastic-carousel";
import { base_url, base_url2 } from '../../../../Config/Auth';
import LocationSuppliesList from '../LocationSuppliesList';
const { Option } = Select;
const initialFlow = {
  imgIds: [
    {
      image: "IMG1635367708032024",
      primaryInd: true,
    },
    {
      image: "IMG6749787594432024", 
      primaryInd: false,
    },
    {
      image: "IMG7200122279332024", 
      primaryInd: false,
    },
    {
      image: "IMG9994006204032024", 
      primaryInd: false,
    }
  ]
};

function MaterialsDetailsCardViewId (props) {
  console.log(props.materialsBySuppliesId.imgIds)

 

    
    const imageGalleryItems = Array.isArray(props.materialsBySuppliesId.imgIds) ? 
    props.materialsBySuppliesId.imgIds.map(imgObj => ({
      original: `${base_url}/image/${imgObj.imageId}`,
      thumbnail: `${base_url}/image/${imgObj.imageId}` , // Thumbnail URL
      primaryInd: imgObj.primaryInd,  // Include the primaryInd field for highlighting
    imageId:imgObj.imageId,
    })) 
    : [];

    // const imageGalleryItems = initialFlow.imgIds.map(imgObj => ({
    //   original: `${base_url}/image/${imgObj.image}`, // Original image URL
    //   thumbnail: `${base_url}/image/${imgObj.image}`, // Thumbnail image URL
    //   primaryInd: imgObj.primaryInd,  // Include the primaryInd field for highlighting
    //   imageId:imgObj.image
    // }));

    console.log(imageGalleryItems)


    const handleImageClick = (clickedIndex,item) => {
      console.log(clickedIndex)
      console.log(item)
      let data={
        imageId:item.imageId
      }
      props.UpdateMaterialIamge(data,props.materialsBySuppliesId.suppliesId)
    };


    const breakPoints = [
      { width: 1, itemsToShow: 1 },
      { width: 550, itemsToShow: 2, itemsToScroll: 2 },
      { width: 768, itemsToShow: 3 },
      { width: 1200, itemsToShow: 4 }
    ];

    // const CartTable = (props) => {
    //   const data = {
    //     Length: {
    //       retail: props.materialsBySuppliesId.length
    //         ? props.materialsBySuppliesId.length.toFixed(2)
    //         : '0',
    //       inner: props.materialsBySuppliesId.innerLength
    //         ? props.materialsBySuppliesId.innerLength.toFixed(2)
    //         : '0',
    //       master: props.materialsBySuppliesId.masterLength
    //         ? props.materialsBySuppliesId.masterLength.toFixed(2)
    //         : '0'
    //     },
    //     Depth: {
    //       retail: props.materialsBySuppliesId.width
    //         ? props.materialsBySuppliesId.width.toFixed(2)
    //         : '0',
    //       inner: props.materialsBySuppliesId.innerWidth
    //         ? props.materialsBySuppliesId.innerWidth.toFixed(2)
    //         : '0',
    //       master: props.materialsBySuppliesId.masterWidth
    //         ? props.materialsBySuppliesId.masterWidth.toFixed(2)
    //         : '0'
    //     },
    //     Height: {
    //       retail: props.materialsBySuppliesId.height
    //         ? props.materialsBySuppliesId.height.toFixed(2)
    //         : '0',
    //       inner: props.materialsBySuppliesId.innerHeight
    //         ? props.materialsBySuppliesId.innerHeight.toFixed(2)
    //         : '0',
    //       master: props.materialsBySuppliesId.masterHeight
    //         ? props.materialsBySuppliesId.masterHeight.toFixed(2)
    //         : '0'
    //     },
    //     Volume: {
    //       retail: props.materialsBySuppliesId.volume
    //         ? props.materialsBySuppliesId.volume.toFixed(2)
    //         : '0',
    //       inner: props.materialsBySuppliesId.innerVolume
    //         ? props.materialsBySuppliesId.innerVolume.toFixed(2)
    //         : '0',
    //       master: props.materialsBySuppliesId.masterVolume
    //         ? props.materialsBySuppliesId.masterVolume.toFixed(2)
    //         : '0'
    //     },
    //     Weight: {
    //       retail: props.materialsBySuppliesId.weight
    //         ? props.materialsBySuppliesId.weight.toFixed(2)
    //         : '0',
    //       inner: props.materialsBySuppliesId.innerWeight
    //         ? props.materialsBySuppliesId.innerWeight.toFixed(2)
    //         : '0',
    //       master: props.materialsBySuppliesId.masterWeight
    //         ? props.materialsBySuppliesId.masterWeight.toFixed(2)
    //         : '0'
    //     },
    //     Category: {
    //       retail: props.materialsBySuppliesId.categoryName || 'No Data',
    //       inner: props.materialsBySuppliesId.categoryName || 'No Data',
    //       master: props.materialsBySuppliesId.categoryName || 'No Data'
    //     }
    //   };
  
    //   return (
    //     <table className="w-[48%] border-collapse border border-gray-200">
    //       <thead>
    //         <tr className="bg-gray-50">
    //           <th className="p-2 text-left font-medium text-gray-600 border border-gray-200"></th>
    //           <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Retail</th>
    //           <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Inner</th>
    //           <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Master</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {Object.keys(data).map((key) => (
    //           <tr key={key} className="bg-gray-50 odd:bg-white">
    //             <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">{key}</th>
    //             <td className="p-2 border border-gray-200">{data[key].retail}</td>
    //             <td className="p-2 border border-gray-200">{data[key].inner}</td>
    //             <td className="p-2 border border-gray-200">{data[key].master}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   );
    // };    
 



  //   const CartTable = (props) => {
  //     const [data, setData] = useState({
  //       Length: {
  //         retail: props.materialsBySuppliesId.length
  //           ? props.materialsBySuppliesId.length.toFixed(2)
  //           : '0',
  //         inner: props.materialsBySuppliesId.innerLength
  //           ? props.materialsBySuppliesId.innerLength.toFixed(2)
  //           : '0',
  //         master: props.materialsBySuppliesId.masterLength
  //           ? props.materialsBySuppliesId.masterLength.toFixed(2)
  //           : '0'
  //       },
  //       Depth: {
  //         retail: props.materialsBySuppliesId.width
  //           ? props.materialsBySuppliesId.width.toFixed(2)
  //           : '0',
  //         inner: props.materialsBySuppliesId.innerWidth
  //           ? props.materialsBySuppliesId.innerWidth.toFixed(2)
  //           : '0',
  //         master: props.materialsBySuppliesId.masterWidth
  //           ? props.materialsBySuppliesId.masterWidth.toFixed(2)
  //           : '0'
  //       },
  //       Height: {
  //         retail: props.materialsBySuppliesId.height
  //           ? props.materialsBySuppliesId.height.toFixed(2)
  //           : '0',
  //         inner: props.materialsBySuppliesId.innerHeight
  //           ? props.materialsBySuppliesId.innerHeight.toFixed(2)
  //           : '0',
  //         master: props.materialsBySuppliesId.masterHeight
  //           ? props.materialsBySuppliesId.masterHeight.toFixed(2)
  //           : '0'
  //       },
  //       Volume: {
  //         retail: props.materialsBySuppliesId.volume
  //           ? props.materialsBySuppliesId.volume.toFixed(2)
  //           : '0',
  //         inner: props.materialsBySuppliesId.innerVolume
  //           ? props.materialsBySuppliesId.innerVolume.toFixed(2)
  //           : '0',
  //         master: props.materialsBySuppliesId.masterVolume
  //           ? props.materialsBySuppliesId.masterVolume.toFixed(2)
  //           : '0'
  //       },
  //       Weight: {
  //         retail: props.materialsBySuppliesId.weight
  //           ? props.materialsBySuppliesId.weight.toFixed(2)
  //           : '0',
  //         inner: props.materialsBySuppliesId.innerWeight
  //           ? props.materialsBySuppliesId.innerWeight.toFixed(2)
  //           : '0',
  //         master: props.materialsBySuppliesId.masterWeight
  //           ? props.materialsBySuppliesId.masterWeight.toFixed(2)
  //           : '0'
  //       },
  //     });
  //     const [selectedUom, setSelectedUom] = useState({});
  
  //     const handleBlur = async (key, type, value) => {
  //       try {
  //         const updatedData = { ...data, [key]: { ...data[key], [type]: parseFloat(value) || 0 } };
  //         setData(updatedData); // Update the local state with the new value
  //         const payload = {
  //           suppliesId: props.materialsBySuppliesId.suppliesId,
  //           length: updatedData.Length.retail,
  //           innerLength: updatedData.Length.inner,
  //           masterLength: updatedData.Length.master,
  //           width: updatedData.Depth.retail,
  //           innerWidth: updatedData.Depth.inner,
  //           masterWidth: updatedData.Depth.master,
  //           height: updatedData.Height.retail,
  //           innerHeight: updatedData.Height.inner,
  //           masterHeight: updatedData.Height.master,
  //           volume: updatedData.Volume.retail,
  //           innerVolume: updatedData.Volume.inner,
  //           masterVolume: updatedData.Volume.master,
  //           weight: updatedData.Weight.retail,
  //           innerWeight: updatedData.Weight.inner,
  //           masterWeight: updatedData.Weight.master,
  //         };
      
  //         // Perform PUT request to the dummy URL
  //         await axios.put(`${base_url2}/supplies/infoEdit`, payload);
      
  //         console.log('Payload sent:', payload);
  //       } catch (error) {
  //         console.error('Error updating data', error);
  //       }
  //     };
  //   const handleUomChange = async (uomId) => {

  //     try {
  //       const payload = {
  //         uom: uomId, // The selected UOM ID
  //       };
        
  //       // Perform the PUT request to the specified URL
  //       await axios.put(`${base_url2}/supplies/uomEdit`, payload);
        
  //       console.log('UOM Payload sent:', payload);
        
  //       // Optionally update selected UOM state
  //       setSelectedUom((prev) => ({ ...prev, uomId })); 
  //     } catch (error) {
  //       console.error('Error updating UOM', error);
  //     }
  //   };
  //     const handleInputChange = (key, type, e) => {
  //       const updatedData = { ...data, [key]: { ...data[key], [type]: e.target.value } };
  //       setData(updatedData);
  //     };
     
  //     return (
  //       <>
  //       <div className="flex flex-col w-[85%]">
  //       <table className="w-[95%] border-collapse border border-gray-200">
  //         <thead>
  //           <tr className="bg-gray-50">
  //             <th className="p-2 text-left font-medium text-gray-600 border border-gray-200"></th>
  //             <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Retail</th>
  //             <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Inner</th>
  //             <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Master</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {Object.keys(data).map((key) => (
  //             <tr key={key} className="bg-gray-50 odd:bg-white">
  //               <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">{key}</th>
  //               <td className="p-2 border border-gray-200">
  //                 <input
  //                   type="text"
  //                   value={data[key].retail}
  //                   onChange={(e) => handleInputChange(key, 'retail', e)}
  //                   onBlur={(e) => handleBlur(key, 'retail', e.target.value)}
  //                   className="w-full bg-transparent"
  //                 />
  //               </td>
  //               <td className="p-2 border border-gray-200">
  //                 <input
  //                   type="text"
  //                   value={data[key].inner}
  //                   onChange={(e) => handleInputChange(key, 'inner', e)}
  //                   onBlur={(e) => handleBlur(key, 'inner', e.target.value)}
  //                   className="w-full bg-transparent"
  //                 />
  //               </td>
  //               <td className="p-2 border border-gray-200">
  //                 <input
  //                   type="text"
  //                   value={data[key].master}
  //                   onChange={(e) => handleInputChange(key, 'master', e)}
  //                   onBlur={(e) => handleBlur(key, 'master', e.target.value)}
  //                   className="w-full bg-transparent"
  //                 />
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //       <table className="w-[95%] border-collapse border border-gray-200">
  //         <thead>
  //           <tr className="bg-gray-50">
  //             <th className="p-2 text-left font-medium text-gray-600 border border-gray-200"></th>
  //             <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">dimension Uom</th>
  //             <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">weight Uom</th>
             
  //           </tr>
  //         </thead>
  //         <tbody>
           
  //             <tr className="bg-gray-50 odd:bg-white">
  //               <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">UOM</th>
  //               <td className="p-2 border border-gray-200">
               
  //  {/* <Select
  //                                           style={{ width: "8rem" }}
  //                                           onChange={(uomId) => handleUomChange(uomId)}
  //                                       >
  //                                           {props.mydata.map((uom) => (
  //                                              <Option key={uom.uomId} value={uom.uomId}>
  //                                              {uom.unitName}
  //                                            </Option>
  //                                           ))}
  //                                       </Select> */}
  //                                        <Select style={{ width: "8rem" }}  onChange={(uomId) => handleUomChange(uomId)}>
  //                               {props.mydata.map((uom) => (
  //                                   <Option key={uom.uomId} value={uom.uomId}>
  //                                       {uom.unitName}
  //                                   </Option>
  //                               ))}
  //                           </Select>
  //               </td>
  //               <td className="p-2 border border-gray-200">
               
  //               </td>
               
  //             </tr>
  //           {/* // ))} */}
  //         </tbody>
  //       </table>
  //       </div>
  //       </>
  //     );
  //   };
    

  
  const CartTable = (props) => {
    const [data, setData] = useState({
      Length: {
        retail: props.materialsBySuppliesId.length
          ? props.materialsBySuppliesId.length.toFixed(2)
          : '0',
        inner: props.materialsBySuppliesId.innerLength
          ? props.materialsBySuppliesId.innerLength.toFixed(2)
          : '0',
        master: props.materialsBySuppliesId.masterLength
          ? props.materialsBySuppliesId.masterLength.toFixed(2)
          : '0',
      },
      Depth: {
        retail: props.materialsBySuppliesId.width
          ? props.materialsBySuppliesId.width.toFixed(2)
          : '0',
        inner: props.materialsBySuppliesId.innerWidth
          ? props.materialsBySuppliesId.innerWidth.toFixed(2)
          : '0',
        master: props.materialsBySuppliesId.masterWidth
          ? props.materialsBySuppliesId.masterWidth.toFixed(2)
          : '0',
      },
      Height: {
        retail: props.materialsBySuppliesId.height
          ? props.materialsBySuppliesId.height.toFixed(2)
          : '0',
        inner: props.materialsBySuppliesId.innerHeight
          ? props.materialsBySuppliesId.innerHeight.toFixed(2)
          : '0',
        master: props.materialsBySuppliesId.masterHeight
          ? props.materialsBySuppliesId.masterHeight.toFixed(2)
          : '0',
      },
      Volume: {
        retail: props.materialsBySuppliesId.volume
          ? props.materialsBySuppliesId.volume.toFixed(2)
          : '0',
        inner: props.materialsBySuppliesId.innerVolume
          ? props.materialsBySuppliesId.innerVolume.toFixed(2)
          : '0',
        master: props.materialsBySuppliesId.masterVolume
          ? props.materialsBySuppliesId.masterVolume.toFixed(2)
          : '0',
      },
      Weight: {
        retail: props.materialsBySuppliesId.weight
          ? props.materialsBySuppliesId.weight.toFixed(2)
          : '0',
        inner: props.materialsBySuppliesId.innerWeight
          ? props.materialsBySuppliesId.innerWeight.toFixed(2)
          : '0',
        master: props.materialsBySuppliesId.masterWeight
          ? props.materialsBySuppliesId.masterWeight.toFixed(2)
          : '0',
      },
    });
    
    // const [selectedUom, setSelectedUom] = useState({});
    const [selectedUom, setSelectedUom] = useState({
      uomId: props.materialsBySuppliesId.uomId || null, // Set initial UOM ID from props
      unitName: props.materialsBySuppliesId.uom || 'Select UOM', // Set initial UOM name from props
    });
    const [selectedWtUom, setSelectedWtUom] = useState({
      uomId: props.materialsBySuppliesId.uomId || null, 
      unitName: props.materialsBySuppliesId.wtUom || 'Select UOM', 
    });
    const [isUomDropdownVisible, setIsUomDropdownVisible] = useState(false);
    // Create a combined payload based on the current state
    const createPayload = () => {
      return {
        suppliesId: props.materialsBySuppliesId.suppliesId,
        length: data.Length.retail,
        innerLength: data.Length.inner,
        masterLength: data.Length.master,
        width: data.Depth.retail,
        innerWidth: data.Depth.inner,
        masterWidth: data.Depth.master,
        height: data.Height.retail,
        innerHeight: data.Height.inner,
        masterHeight: data.Height.master,
        volume: data.Volume.retail,
        innerVolume: data.Volume.inner,
        masterVolume: data.Volume.master,
        weight: data.Weight.retail,
        innerWeight: data.Weight.inner,
        masterWeight: data.Weight.master,
        uom: selectedUom.unitName || null, // Include UOM only if selected
        wtUom: selectedWtUom.unitName || null,
      };
    };
  
    // Handle blur event for input fields
    const handleBlur = async (key, type, value) => {
      try {
        const updatedData = { ...data, [key]: { ...data[key], [type]: parseFloat(value) || 0 } };
        setData(updatedData); // Update the local state with the new value
  
        const payload = createPayload(); // Create the combined payload
        await axios.put(`${base_url2}/supplies/infoEdit`, payload);
        console.log('Payload sent:', payload);
      } catch (error) {
        console.error('Error updating data', error);
      }
    };
  
    // Handle UOM change
    const handleUomChange = (unitName) => {
      setSelectedUom({ unitName }); // Update the selected UOM state
      // The UOM change will be sent in the next blur event of the inputs
    };
    const handleUomWtChange = (unitName) => {
      setSelectedWtUom({ unitName }); // Update the selected UOM state
      // The UOM change will be sent in the next blur event of the inputs
    };
    // Handle input field changes
    const handleInputChange = (key, type, e) => {
      const updatedData = { ...data, [key]: { ...data[key], [type]: e.target.value } };
      setData(updatedData);
    };
  
    return (
      <>
        <div className="flex flex-col w-[85%]">
          <table className="w-[95%] border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 text-left font-medium text-gray-600 border border-gray-200"></th>
                <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Retail</th>
                <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Inner</th>
                <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Master</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((key) => (
                <tr key={key} className="bg-gray-50 odd:bg-white">
                  <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">{key}</th>
                  <td className="p-2 border border-gray-200">
                    <input
                      type="text"
                      value={data[key].retail}
                      onChange={(e) => handleInputChange(key, 'retail', e)}
                      onBlur={(e) => handleBlur(key, 'retail', e.target.value)}
                      className="w-full bg-transparent"
                    />
                  </td>
                  <td className="p-2 border border-gray-200">
                    <input
                      type="text"
                      value={data[key].inner}
                      onChange={(e) => handleInputChange(key, 'inner', e)}
                      onBlur={(e) => handleBlur(key, 'inner', e.target.value)}
                      className="w-full bg-transparent"
                    />
                  </td>
                  <td className="p-2 border border-gray-200">
                    <input
                      type="text"
                      value={data[key].master}
                      onChange={(e) => handleInputChange(key, 'master', e)}
                      onBlur={(e) => handleBlur(key, 'master', e.target.value)}
                      className="w-full bg-transparent"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="w-[95%] border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 text-left font-medium text-gray-600 border border-gray-200"></th>
                <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Dimension UOM</th>
                <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Weight UOM</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50 odd:bg-white">
                <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">UOM</th>
                <td className="p-2 border border-gray-200">
                <div onClick={() => setIsUomDropdownVisible(!isUomDropdownVisible)} className="cursor-pointer">
              {selectedUom.unitName}
            </div>
            {isUomDropdownVisible && (
                  <Select
                    style={{ width: "8rem" }}
                    onChange={handleUomChange}
                    onBlur={() => handleBlur("UOM", "uom", selectedUom.unitName)} // Optionally trigger blur for UOM
                  >
                    {props.mydata.map((uom) => (
                      <Option key={uom.unitName} value={uom.unitName}>
                        {uom.unitName}
                      </Option>
                    ))}
                  </Select>
                   )}
                </td>
                <td className="p-2 border border-gray-200">
                <div onClick={() => setIsUomDropdownVisible(!isUomDropdownVisible)} className="cursor-pointer">
              {selectedWtUom.unitName}
            </div>
            {isUomDropdownVisible && (
                <Select
                    style={{ width: "8rem" }}
                    onChange={handleUomWtChange}
                    onBlur={() => handleBlur("wtUom", "wtUom", selectedWtUom.unitName)} // Optionally trigger blur for UOM
                  >
                    {props.mydata.map((uom) => (
                      <Option key={uom.unitName} value={uom.unitName}>
                        {uom.unitName}
                      </Option>
                    ))}
                  </Select>
                      )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  };
  

  

    console.log(props.materialsBySuppliesId)
  return (
  <>
       
      {/* <div className="custom-image-gallery">
      {imageGalleryItems.map((item, index) => (
        <div key={index} className="gallery-item">
          <img src={item.thumbnail} alt="gallery thumbnail" />
        </div>
      ))}
    </div> */}
     <div className="custom-image-gallery mt-8">
     <Carousel breakPoints={breakPoints}>

      {imageGalleryItems.map((item, index) => (
        <div 
          key={index} 
          onClick={() => handleImageClick(index,item)}
          className={`gallery-item ${item.primaryInd ? 'highlight' : ''}`} // Add 'highlight' class conditionally
        >
          <img src={item.thumbnail} alt={`Thumbnail-${index}`} 
         />
        </div>
      ))}
      </Carousel>   


     
     
    </div>
    <div className='mt-8 flex justify-between'>
    <CartTable materialsBySuppliesId={props.materialsBySuppliesId}
    mydata={props.mydata}
    />
    <LocationSuppliesList
          particularDiscountData={props.particularDiscountData}
          />
    </div>
      {/* <table className="min-w-full border-collapse border border-gray-200">
      <tbody>
          <tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Age group</th>
            <td className="p-2 border border-gray-200">
              {props.materialsBySuppliesId.hsn}  6+
              </td>
          </tr>
          <tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Package dimension</th>
            <td className="p-2 border border-gray-200">
                {props.materialsBySuppliesId.hsn}
                </td>
          </tr>
<tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Hsn</th>
            <td className="p-2 border border-gray-200">
                {props.materialsBySuppliesId.hsn}
                </td>
          </tr>
          <tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Weight</th>
            <td className="p-2 border border-gray-200">
                {props.materialsBySuppliesId.netWeight}
                </td>
          </tr>
          <tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Attribute</th>
            <td className="p-2 border border-gray-200">
                {props.materialsBySuppliesId.attributeName} {props.materialsBySuppliesId.subAttributeName}
                </td>
          </tr>
          <tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Category</th>
            <td className="p-2 border border-gray-200">
                {props.materialsBySuppliesId.categoryName} {props.materialsBySuppliesId.subCategoryName}
                </td>
          </tr>
      </tbody>
    </table> */}
    
    </>
  );
};
const mapStateToProps = ({ settings }) => ({

});

const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {

   
 
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(MaterialsDetailsCardViewId);

