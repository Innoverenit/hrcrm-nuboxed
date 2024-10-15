import React, { lazy, Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MultiAvatar } from "../../../Components/UI/Elements";
import { DistributorCollectionArchiveToday } from "../CollectionAction";
import dayjs from "dayjs";
import { BundleLoader } from "../../../Components/Placeholder";

const DistributorColletcionArchiveForm = lazy(() => import("./DistributorColletcionArchiveForm"));

function DistributorColletcionArchive(props) {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
   
        
          "248" , // "Customer",//0
           "660" ,// "Order #,//1
          "1169" , // " Invoice",//2
           "926", // "Transaction ",//3
          "71" , // "Type",//4
          "74" , // Date",//5
           "929" ,// "Amount",6
           "86", // "Mode"7
        
         "1681", //  Paid by"8
           
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
  return (
    <>
      <Suspense fallback={<BundleLoader />}>
        <DistributorColletcionArchiveForm />
      </Suspense>

      <div className=' flex  sticky  z-auto'>
      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
            <div className="font-bold font-poppins text-xs w-[9.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            {translatedMenuItems[0]}   {/* customer" /> */}
              </div>
            <div className="font-bold font-poppins text-xs w-[8.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> {translatedMenuItems[1]} #
              {/*Order #" /> */}
              </div>
            <div className="font-bold font-poppins text-xs w-[8.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Invoice */} {translatedMenuItems[2]}
              </div>
            <div className="font-bold font-poppins text-xs w-[7.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">  {translatedMenuItems[3]} ID
              {/* Transaction ID" /> */}
              </div>
            <div className="font-bold font-poppins text-xs w-[6.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Type" /> */} {translatedMenuItems[4]}
              </div>
            <div className="font-bold font-poppins text-xs w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* "Date" /> */} {translatedMenuItems[5]}
              </div>
            <div className="font-bold font-poppins text-xs w-[7.21rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Amount" /> */} {translatedMenuItems[6]}
              </div>
            <div className="font-bold font-poppins text-xs w-[7.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/*"Mode" /> */} {translatedMenuItems[7]}
              </div>

            <div className="font-bold font-poppins text-xs w-[6.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/*"Owner" /> */} {translatedMenuItems[8]}
              </div>
          </div>


          {props.todayDisArchive.map((item) => {
            return (
              <div>
                <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[7rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex font-medium   w-[12.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        {item.orderSourceName}
                      </div>

                    </div>

                    <div className=" flex font-medium   w-[10.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        {item.newOrderNo}
                      </div>

                    </div>

                  </div>
                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex font-medium  w-[10.11rem] max-xl:w-[5.11rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">


                      <div class=" text-xs  font-poppins text-center">
                        {item.invoiceId}

                      </div>
                    </div>
                    <div className=" flex font-medium  w-[9.02rem] max-xl:w-[5.02rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                      <div class=" text-xs  font-poppins text-center">
                        {item.transactionNumber}

                      </div>
                    </div>
                    <div className=" flex font-medium  w-[8.01rem]  max-xl:w-[6.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                    <div class=" text-xs  font-poppins text-center">
                      {` ${dayjs(item.date).format("DD-MM-YY")}`}

                    </div>
                  </div>
                  </div>
                 

                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                   
                      <div className=" flex font-medium   w-[10.03rem] max-xl:w-[4.03rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins">
                          {item.paymentAmount} &nbsp; {item.orderCurrencyName}
                        </div>

                      </div>
                      <div className=" flex font-medium   w-[11.04rem] max-xl:w-[8.54rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins">
                          {item.paymentModeName}
                        </div>

                      </div>
                   

                    
                      <div className=" flex font-medium   w-[7.05rem] max-xl:w-[3.85rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">


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
const mapStateToProps = ({ collection, leads }) => ({
  todayDisArchive: collection.todayDisArchive,
  DistributorCollectionArchive: collection.DistributorCollectionArchive,
  allSalesUsers: leads.allSalesUsers,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      DistributorCollectionArchiveToday,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributorColletcionArchive);