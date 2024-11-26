
import React, { useEffect, useState,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { useDispatch } from 'react-redux';
import {  Select } from "antd";
import { getBarcodeViewer
} from "./SuppliesAction";
import { base_url2 } from "../../../Config/Auth";

import { BundleLoader } from "../../../Components/Placeholder";

const { Option } = Select;

function BarCodeInput(props) {

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

 
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState();

  




  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
     "85",   //  "Add ",//0
       "241", //   "Currency",//1
      "657",  //   "Price",//2
      "71",  //   "Type",
       "154", //   "Submit",//3
       "1078", //      " Save",
       "1079", //      "Cancel"  
     "14", //  Catagory
     "110", //name
      "771",//Final

        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);


 
  const sendInputPutRequest =  async (item) => {
    
    try {
        const response = await axios.post(`${base_url2}/supplies/multiBarcode`,item, {  
        
       });
        dispatch(getBarcodeViewer(props.particularDiscountData.suppliesId));
       if (response.data === 'Successfully !!!!') {
      } else {
        console.log(response.data);
      }
      } catch (error) {
        console.error("Error updating item:", error);
      }
  };

  const handleInputBlur = (e) => {
    const value = e.target.value === '' ? '0' : e.target.value; 
    setInputValue(value);
    sendInputPutRequest({ barCode: value,
userId:props.userId,
orgId:props.orgId,
suppliesId:props.particularDiscountData.suppliesId

     });
  };

//   if (props.fetchingPriceFactor) {
//     return <div><BundleLoader/></div>;
//   }
  return (
    <div>
<div>
  <div className="flex justify-between mt-2">
  <div class="text-base font-semibold w-40 ">Barcode Input</div>
  </div>
 
  <div className="flex justify-between mt-1">
<div className="w-36" >
                                           <input
            id="barCode"
            type="text"
            className="w-[12rem] h-[1.75rem] px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            defaultValue={inputValue}
            onBlur={(e) => handleInputBlur(e)}
            onChange={(e) => setInputValue(e.target.value)}
           placeholder="Enter barCode number"
          />
          </div> 
      
         
          </div>
               
</div>

    </div>
  );


};

const mapStateToProps = ({ auth,supplies }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getBarcodeViewer
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BarCodeInput);

