import React, { useState, useEffect} from 'react';
function ProductDetailsCardViewId (props) {
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          setLoading(true); 
          const itemsToTranslate = [
     
      
              "799",//5Hsn
              "1241",//5 Weight
              "259",//6Attribute
              "14", //7 Category
              "1256",//8 Warranty
          ];
  
          const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
          setTranslatedMenuItems(translations);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error('Error translating menu items:', error);
        }
      };
  
      fetchMenuTranslations();
    }, [props.selectedLanguage]);
    
  const data = {
        "Completed puzzle dimension": '24x18 inch / 60x45 cm',
        "Piece count": "500pc",
        "Packaging":"Set-Up Box",
        "Age group": '6+',
        "Package dimension": '12x8x2 inch / 30x20x5 cm',
        "Weight": '0.56lb'
    }

  return (
    <table className="min-w-full border-collapse border border-gray-200 font-poppins text-xs">
      <tbody>
        {/* {Object.keys(props.productsByproductId).map((key) => (
          <tr key={key} className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left  text-gray-600 border border-gray-200">{key}</th>
            <td className="p-2 border border-gray-200">{data[key]}</td>
          </tr>
        ))} */}
         <tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left  text-gray-600 border border-gray-200">{translatedMenuItems[0]}</th>
            <td className="p-2 border border-gray-200">
              {/* {props.productsByproductId.hsn} */}
              24x18 inch / 60x45 cm
            </td>
          </tr>
          <tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left  text-gray-600 border border-gray-200">{translatedMenuItems[1]}</th>
            <td className="p-2 border border-gray-200">
              {/* {props.productsByproductId.hsn} */}
              500pc
            </td>
          </tr>
          <tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left  text-gray-600 border border-gray-200">{translatedMenuItems[2]}</th>
            <td className="p-2 border border-gray-200">
              {/* {props.productsByproductId.hsn}  */} 6+
              </td>
          </tr>
          <tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left  text-gray-600 border border-gray-200">{translatedMenuItems[3]}</th>
            <td className="p-2 border border-gray-200">
                {props.productsByproductId.hsn}
                </td>
          </tr>
<tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left  text-gray-600 border border-gray-200">{translatedMenuItems[4]}</th>
            <td className="p-2 border border-gray-200">
                {props.productsByproductId.hsn}
                </td>
          </tr>
          <tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left  text-gray-600 border border-gray-200">{translatedMenuItems[5]}</th>
            <td className="p-2 border border-gray-200">
                {props.productsByproductId.netWeight}
                </td>
          </tr>
          <tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left  text-gray-600 border border-gray-200">{translatedMenuItems[6]}</th>
            <td className="p-2 border border-gray-200">
                {props.productsByproductId.attributeName} {props.productsByproductId.subAttributeName}
                </td>
          </tr>
          <tr  className="bg-gray-50 odd:bg-white">
            <th className="p-2 text-left  text-gray-600 border border-gray-200">{translatedMenuItems[7]}</th>
            <td className="p-2 border border-gray-200">
                {props.productsByproductId.categoryName} {props.productsByproductId.subCategoryName}
                </td>
          </tr>
      </tbody>
    </table>
  );
};

export default ProductDetailsCardViewId;