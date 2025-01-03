import React, { lazy, Suspense,useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MultiAvatar } from "../../../Components/UI/Elements";
import dayjs from "dayjs";
import {getCloseCollection} from "../CollectionAction"


function CloseCreditMemoList(props) {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
   
        "672",  // Order Id 0
          "1169",// Invoice  1
          "248" , // "Customer",//2
           "218" ,//   Value,//3
          "1365" , // "Generated",//4         
          "1366" , // "Set Up",//5
          "74" , // Date",//6
          "1507" ,// "User Id",7
           "1368", // "Applied"8
        
           
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
    props.getCloseCollection(props.orgId);
  }, []);

  return (
    <>
 

      <div className=' flex  sticky  z-auto'>
      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
            <div className=" w-[9.1rem] max-md:w-[9.1rem]">
            {translatedMenuItems[0]}  {/* Order Id */}
               
                </div>
                <div className="w-[6.12rem] max-md:w-[6.12rem]">
                {translatedMenuItems[1]} ID{/* Invoice Id */}

                </div>
            <div className=" w-[8.2rem] max-md:w-[8.2rem]">
            {translatedMenuItems[2]}  {/* Customer */}
              
                </div>
            <div className=" w-[8.2rem] max-md:w-[8.2rem] ">
            {translatedMenuItems[3]}  {/* Value */}
                </div>
            <div className=" w-[7.32rem] max-md:w-[7.32rem] ">
            {translatedMenuItems[4]} {/* Generated */}
               
                </div>
                <div className=" w-[7.32rem] max-md:w-[7.32rem] ">
                {translatedMenuItems[5]}   {/* Set Up */}
               
                </div>
                <div className=" w-[7.32rem] max-md:w-[7.32rem] ">
                {translatedMenuItems[6]} {/* Date */}
               
                </div>
                <div className=" w-[7.32rem] max-md:w-[7.32rem] ">
                {/* UserId */}
                {translatedMenuItems[7]} ID
                </div>
            <div className="w-[6.023rem] max-md:w-[6.023rem]">
            {translatedMenuItems[8]}  {/* Applied */}
             
                </div>
            
         
          </div>


          {props.closeCreditMemo.map((item) => {
            return (
              <div>
                <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[7rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex   border-l-2 h-8 border-green-500 bg-[#eef2f9] w-[12.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        {item.orderSourceName}
                      </div>

                    </div>

                    <div className=" flex   items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[10.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        {item.orderId}
                      </div>

                    </div>

                  </div>
                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[10.11rem] max-xl:w-[5.11rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">


                      <div class=" text-xs  font-poppins text-center">
                        {item.transactionNumber}

                      </div>
                    </div>
                    <div className=" flex   items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[9.02rem] max-xl:w-[5.02rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                      <div class=" text-xs  font-poppins text-center">
                        {item.paymentType}

                      </div>
                    </div>
                    <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[8.01rem]  max-xl:w-[6.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                    <div class=" text-xs  font-poppins text-center">
                      {` ${dayjs(item.date).format("DD-MM-YY")}`}

                    </div>
                  </div>
                  </div>
                 

                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                   
                      <div className=" flex   items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[10.03rem] max-xl:w-[4.03rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins">
                          {item.paymentAmount} &nbsp; {item.orderCurrencyName}
                        </div>

                      </div>
                      <div className=" flex    items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[11.04rem] max-xl:w-[8.54rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins">
                          {item.paymentModeName}
                        </div>

                      </div>
                   

                    
                      <div className=" flex    items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[7.05rem] max-xl:w-[3.85rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">


                        <div class=" text-xs  font-poppins">
                          <span>
                            <MultiAvatar
                              primaryTitle={item.salesExecutive}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                          </span>
                        </div>

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
  closeCreditMemo:collection.closeCreditMemo,
  orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCloseCollection
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CloseCreditMemoList);

