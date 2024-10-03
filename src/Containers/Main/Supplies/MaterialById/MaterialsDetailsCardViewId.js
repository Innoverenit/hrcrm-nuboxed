import React from 'react';
import ImageGallery from 'react-image-gallery';
import { base_url } from '../../../../Config/Auth';
function MaterialsDetailsCardViewId (props) {
  console.log(props.materialsBySuppliesId.imgIds)
    
 

    
    const imageGalleryItems = Array.isArray(props.materialsBySuppliesId.imgIds) ? 
    props.materialsBySuppliesId.imgIds.map(id => ({
      original: `${base_url}/image/${id}`,
      thumbnail: `${base_url}/image/${id}`  // Thumbnail URL
    })) 
    : [];

    console.log(imageGalleryItems)
 

  return (
    <table className="min-w-full border-collapse border border-gray-200">
      <tbody>
       
          <ImageGallery 
        items={imageGalleryItems}
        showThumbnails={true}
       
        
        width={"1.8rem"}
        height={"1.8rem"}
        ></ImageGallery>
          <tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Age group</th>
            <td className="p-2 border border-gray-200">
              {/* {props.materialsBySuppliesId.hsn}  */} 6+
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
    </table>
  );
};

export default MaterialsDetailsCardViewId;