import React, { lazy, Suspense,useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MultiAvatar } from "../../../Components/UI/Elements";
import dayjs from "dayjs";
import {getCollection} from "../CollectionAction"
import { BundleLoader } from "../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";

function CreditMemoList(props) {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
   
        "672",  // Order Id 0
          "1169",// Invoice Id 1
          "248" , // "Customer",//2
           "218" ,//   Value,//3
          "" , // "Generated",//4
          
          
           "", // "Applied"5
        
           
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
  useEffect(() => {
    props.getCollection(props.orgId);
  }, []);

  return (
    <>
 

      <div className=' flex  sticky  z-auto'>
      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
            <div className=" w-[9.1rem] max-xl:w-[13.1rem]">
            {translatedMenuItems[0]} {/* Order Id */}
               
                </div>
                <div className="w-[6.12rem]">
                {translatedMenuItems[1]} ID {/* Invoice Id */}

                </div>
            <div className=" w-[8.2rem] max-xl:w-[9.2rem]">
            {translatedMenuItems[2]} {/* Customer */}
              
                </div>
            <div className=" w-[8.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            {translatedMenuItems[3]}  {/* Value */}
                </div>
            <div className=" w-[7.32rem] max-xl:w-[6.32rem] ">
            {translatedMenuItems[4]}{/* Generated */}
               
                </div>
            <div className="w-[6.023rem]">
            {translatedMenuItems[5]}{/* Applied */}
             
                </div>
            
         
          </div>


          {props.CollectionCreditMemo.map((item) => {
            return (
              <div>
                <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[7rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex font-medium   w-[12.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        {item.newOrderNo}
                      </div>

                    </div>

                    <div className=" flex font-medium   w-[10.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        {item.invoiceNum}
                      </div>

                    </div>

                  </div>
                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex font-medium  w-[10.11rem] max-xl:w-[5.11rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">


                      <div class=" text-xs  font-poppins text-center">
                        {item.distributorName}

                      </div>
                    </div>
                    <div className=" flex font-medium  w-[9.02rem] max-xl:w-[5.02rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                      <div class=" text-xs  font-poppins text-center">
                        {item.creditMemo}

                      </div>
                    </div>
                    <div className=" flex font-medium  w-[8.01rem]  max-xl:w-[6.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                    <div class=" text-xs  font-poppins text-center">
                      {` ${dayjs(item.creationDate).format("DD-MM-YY")}`}

                    </div>
                  </div>
                  </div>
                 

                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                   
                      <div className=" flex font-medium   w-[7.05rem] max-xl:w-[3.85rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">

                        {/* <div class=" text-xs  font-poppins">
                          <span>
                            <MultiAvatar
                              primaryTitle={item.salesExecutive}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                          </span>
                        </div> */}

                      </div>

                   

                  </div>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </>
  );
}
const mapStateToProps = ({ collection, auth }) => ({
  CollectionCreditMemo:collection.CollectionCreditMemo,
  orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCollection
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreditMemoList);

