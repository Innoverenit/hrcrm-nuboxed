
import React, { useEffect, useState,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useDispatch } from 'react-redux';
import { getBarcodeViewer
 } from "./SuppliesAction";
 import { BundleLoader } from "../../../Components/Placeholder";
import EmptyPage from "../EmptyPage";




function BarCodeViewer(props) {
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    props.getBarcodeViewer(props.particularDiscountData.suppliesId)
  }, []);




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




  // const handleToggleChange = (checked) => {
  //   setIsBestSeller(checked);
  // };
  



  if (props.fetchingPriceFactor) {
    return <div><BundleLoader/></div>;
  }
  return (
    <div>
     
      <div className=' flex sticky z-auto'>
        <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">      
            <div className="font-poppins font-bold text-xs md:w-[6.3rem]"> Barcode No</div>
           
            <div className="w-12"></div>         
            </div>
            <div className="h-[73vh] overflow-x-auto">
          {props.barCodeViewer.length ? props.barCodeViewer.map((item) => {
            return (
           
                <div className="flex rounded justify-between mt-1 bg-white  items-center py-ygap  hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "
                >

                  <div className=" flex font-poppins items-center justify-start md:w-[6.2rem] border-l-2 h-8 border-green-500 bg-[#eef2f9] max-sm:w-full  ">
                    <div class="text-xs font-semibold  font-poppins cursor-pointer">
                    
                  <div className=" text-xs  font-poppins">
                      <div> {item.barCode}</div>
                    </div>
                    </div>
                  </div>
                </div>
             
            );
          }) : !props.barCodeViewer.length && !props.fetchingBarcodeViewer ? <EmptyPage /> : null}
          </div>

        </div>
      </div>
      
    </div>
  );


};

const mapStateToProps = ({ auth,supplies }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  barCodeViewer:supplies.barCodeViewer,
  fetchingBarcodeViewer:supplies.fetchingBarcodeViewer
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getBarcodeViewer,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BarCodeViewer);

