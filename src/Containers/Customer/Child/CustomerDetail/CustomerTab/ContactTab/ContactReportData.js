import React,{useEffect,useState} from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
// import { getItemHistoryDataInstock } from "../../../InventoryAction"
import { BundleLoader } from '../../../../../../Components/Placeholder';

function ItemHistoryInStockData(props) {

    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
    
                "110", //  "Name ",//0
                "140", //   "Email",//1
                "546", //   "Mobile",//2      
                "326", //   "Department",//3
                "325", //   "Designation",//4

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

    // useEffect(() => {
    //     props.getItemHistoryDataInstock(props.inventory.locationDetailsId,props.row.suppliesId);
    // }, [])
    if (loading) {
        return <div><BundleLoader/></div>;
      }

  return (
    <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between  w-[100%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className="w-[2.5rem]"></div>
                        <div className=" md:w-[4.5rem]"> 
                             {translatedMenuItems[0]}
                        </div>
                        <div className=" md:w-[9.21rem]">     
                               {translatedMenuItems[1]}
                            
                             </div>
                
                        <div className=" md:w-[4.25rem]">
                      
                        {translatedMenuItems[2]}
                               </div>

                        <div className=" md:w-[6.10rem]">  
                        {translatedMenuItems[3]}
                           
                              </div>

                        <div className=" md:w-[4.42rem]">  
                          
                        {translatedMenuItems[4]}
                              </div>

                       
                    </div>
                   
                        {/* {props.itemHistoryDataInStock.map((item, index) => {
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
                        })} */}
                   
                </div>
            </div>
  )
}


const mapStateToProps = ({ inventory, auth }) => ({
    itemHistoryDataInStock:inventory.itemHistoryDataInStock,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            // getItemHistoryDataInstock
            
        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ItemHistoryInStockData)
);


