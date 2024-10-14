import React from 'react';
import ImageGallery from 'react-image-gallery';
import Carousel from "react-elastic-carousel";

import { base_url } from '../../../../Config/Auth';
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

    const CartTable = (props) => {
      const data = {
        Length: {
          retail: props.materialsBySuppliesId.length
            ? props.materialsBySuppliesId.length.toFixed(2)
            : '0',
          inner: props.materialsBySuppliesId.innerLength
            ? props.materialsBySuppliesId.innerLength.toFixed(2)
            : '0',
          master: props.materialsBySuppliesId.masterLength
            ? props.materialsBySuppliesId.masterLength.toFixed(2)
            : '0'
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
            : '0'
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
            : '0'
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
            : '0'
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
            : '0'
        },
        Category: {
          retail: props.materialsBySuppliesId.categoryName || 'No Data',
          inner: props.materialsBySuppliesId.categoryName || 'No Data',
          master: props.materialsBySuppliesId.categoryName || 'No Data'
        }
      };
  
      return (
        <table className="min-w-[70%] border-collapse border border-gray-200">
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
                <td className="p-2 border border-gray-200">{data[key].retail}</td>
                <td className="p-2 border border-gray-200">{data[key].inner}</td>
                <td className="p-2 border border-gray-200">{data[key].master}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    };    
 

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
    <div className='mt-8'>
    <CartTable materialsBySuppliesId={props.materialsBySuppliesId} />
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

export default MaterialsDetailsCardViewId;

