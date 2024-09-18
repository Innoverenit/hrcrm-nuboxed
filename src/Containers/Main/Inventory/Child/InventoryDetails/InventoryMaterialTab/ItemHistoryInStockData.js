import React,{useEffect,useState} from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { getItemHistoryDataInstock } from "../../../InventoryAction"
import { BundleLoader } from '../../../../../../Components/Placeholder';

function ItemHistoryInStockData(props) {

    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
    
       "110", // 'Name', // 0
       "378",// 'Work', // 1
       "278",// 'Sector', // 2
       "279",// 'Source', // 3
       "213",// 'Quotation', // 4
       "328",// 'PipeLine', // 5
       "76",// 'Assigned', // 6 
       "248",// 'Customer', // 7
        "100",   // new 8
        "1300" , //  Change status to Customer?"9
        "213" ,  // "Opportunity"10
        "392" ,  // Pulse 11
        "316" ,  // "Notes"12
        "170" ,  // "Edit" 13
       "73", // Contact 14
       "144" ,//In Progress 15
       "387",//  Convert 16
       "389",//   Converted 17    
       "1092", //Order 18
       "1085", //received 19
       "1086",//damaged 20
       "1093",//balance 21
       "1087",//remark22

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
        props.getItemHistoryDataInstock(props.inventory.locationDetailsId,props.row.suppliesId);
    }, [])
    if (loading) {
        return <div><BundleLoader/></div>;
      }

  return (
    <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between  w-[100%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className="w-[2.5rem]"></div>
                        <div className=" md:w-[4.5rem]">  PO ID
                            {/* po */}
                        </div>
                        <div className=" md:w-[9.21rem]">    {translatedMenuItems[0]}</div>
                        {/* Name */}
                        <div className=" md:w-[4.25rem]">    {translatedMenuItems[18]}</div>
{/* ordered */}
                        <div className=" md:w-[6.10rem]">    {translatedMenuItems[19]}</div>
{/* received */}
                        <div className=" md:w-[4.42rem]">    {translatedMenuItems[20]}</div>
{/* damaged */}
                        <div className=" md:w-[5.01rem]">    {translatedMenuItems[21]}</div>
{/* balance */}
                        <div className=" md:w-[5.01rem]">    {translatedMenuItems[22]}</div>
            {/* remark */}
                        <div className=""></div>
                    </div>
                   
                        {props.itemHistoryDataInStock.map((item, index) => {
                            return (
                                <div>
                                    <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 ">
                                     

                                        <div class="flex">
                                            <div className=" flex font-medium flex-col md:w-[9.1rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-sm  font-semibold  font-poppins ">
                                                    {item.newPoNumber}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="flex">
                                            <div className=" flex font-medium flex-col md:w-[11.12rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-sm  font-semibold font-poppins cursor-pointer underline text-blue-600">
                                                    <span                                                 
                                                    >
                                                        {item.suppliesFullName.substring(0, 20)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                     
                                        <div className=" flex font-medium flex-col  md:w-[9.01rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.unit}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[11.012rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.unitReceived}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[7.03rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.unitDamaged}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[8.05rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.remainingCorrectUnit}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[8.05rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.remark}
                                            </div>
                                        </div>
                                     
                                     
                                      

                                    </div>
                                   
                                </div>
                            );
                        })}
                    {/* </InfiniteScroll> */}
                </div>
            </div>
  )
}


const mapStateToProps = ({ inventory, auth }) => ({
    itemHistoryDataInStock:inventory.itemHistoryDataInStock,
    // fetchingItemHistoryInStock: inventory.fetchingItemHistoryInStock,
    // locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
    // itemHistoryInStock: inventory.itemHistoryInStock
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getItemHistoryDataInstock
            // getItemHistoryInstock
        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ItemHistoryInStockData)
);


