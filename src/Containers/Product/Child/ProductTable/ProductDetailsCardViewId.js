import React from 'react';
function ProductDetailsCardViewId (props) {
    
  const data = {
        "Completed puzzle dimension": '24x18 inch / 60x45 cm',
        "Piece count": "500pc",
        "Packaging":"Set-Up Box",
        "Age group": '6+',
        "Package dimension": '12x8x2 inch / 30x20x5 cm',
        "Weight": '0.56lb'
    }

  return (
    <table className="min-w-full border-collapse border border-gray-200">
      <tbody>
        {/* {Object.keys(props.productsByproductId).map((key) => (
          <tr key={key} className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">{key}</th>
            <td className="p-2 border border-gray-200">{data[key]}</td>
          </tr>
        ))} */}
         <tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Completed puzzle dimension</th>
            <td className="p-2 border border-gray-200">
              {/* {props.productsByproductId.hsn} */}
              24x18 inch / 60x45 cm
            </td>
          </tr>
          <tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Piece count</th>
            <td className="p-2 border border-gray-200">
              {/* {props.productsByproductId.hsn} */}
              500pc
            </td>
          </tr>
          <tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Age group</th>
            <td className="p-2 border border-gray-200">
              {/* {props.productsByproductId.hsn}  */} 6+
              </td>
          </tr>
          <tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Package dimension</th>
            <td className="p-2 border border-gray-200">
                {props.productsByproductId.hsn}
                </td>
          </tr>
<tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Hsn</th>
            <td className="p-2 border border-gray-200">
                {props.productsByproductId.hsn}
                </td>
          </tr>
          <tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Weight</th>
            <td className="p-2 border border-gray-200">
                {props.productsByproductId.netWeight}
                </td>
          </tr>
          <tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Attribute</th>
            <td className="p-2 border border-gray-200">
                {props.productsByproductId.attributeName} {props.productsByproductId.subAttributeName}
                </td>
          </tr>
          <tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left font-medium text-gray-600 border border-gray-200">Category</th>
            <td className="p-2 border border-gray-200">
                {props.productsByproductId.categoryName} {props.productsByproductId.subCategoryName}
                </td>
          </tr>
      </tbody>
    </table>
  );
};

export default ProductDetailsCardViewId;