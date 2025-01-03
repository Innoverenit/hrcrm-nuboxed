


import React, { useEffect, useState,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getWasteMaterialLocation,
} from "../Inventory/InventoryAction";
import dayjs from "dayjs";
import { withRouter } from "react-router";
import { Select } from "antd";
import CategoryIcon from '@mui/icons-material/Category'
import FactoryIcon from '@mui/icons-material/Factory';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PinIcon from '@mui/icons-material/Pin'; 
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

const { Option } = Select;

const InvenoryGlobaltab = (props) => {
  const [selectedZones, setSelectedZones] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState();
    const [row, setRow] = useState({})
    useEffect(() => {
      props.getWasteMaterialLocation(props.locationId); 
    }, [])
console.log(selectedLocation)
    return (
        <>
 <>
  <div className=' flex sticky  z-auto h-[79vh]'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                <div className=" flex  w-[100%]  p-1 bg-transparent font-bold font-poppins !text-lm items-end sticky z-10">
                        <div className=""></div>
                        <div className="text-[#00A2E8] text-sm w-[14.5rem] truncate max-md:w-[19.5rem]">PO ID</div>
                        <div className=" w-[25.52rem] truncate max-md:w-[11.52rem] " >
                        <AddShoppingCartIcon className="!text-icon "/> Item 
                           </div>
                           <div className=" w-[15.122rem] truncate max-md:w-[12.122rem]" >       
                        <FactoryIcon className='!text-base  text-[#e4eb2f]' />  {props.translatedMenuItems[36]} {props.translatedMenuItems[0]}  
                        </div>

                        <div className=" w-[6.122rem] truncate max-md:w-[4.122rem]">       
                        < PinIcon className=" !text-base"/>  HSN
                        </div>

                        <div className=" w-[9.12rem] truncate max-md:w-[8.12rem]">       
                        <CategoryIcon className='!text-base  text-[#e4eb2f]'/> {props.translatedMenuItems[36]} Id

                        </div>     
                        <div className=" w-[9.11rem] truncate max-md:w-[8.12rem]" >       
                        <DateRangeIcon className="!text-icon "/>  Best Use Date

                        </div>

                        <div className=" w-[5.12rem]" >       
                    Units

                        </div>
                        <div className=" w-[9.3rem] truncate max-md:w-[9.2rem]" >       
                        <CurrencyExchangeIcon className='!text-base  text-[#e4eb2f]'/>    Unit Price

                        </div>
                        <div className=" w-[13.2rem]">       
                    Batch No

                        </div>
            
                        <div className=" w-[7.12rem]">       
                    Country

                        </div>
                        <div className=" w-[7.12rem]">       
                        <CurrencyExchangeIcon className='!text-base  text-[#e4eb2f]'/> Total Value

                        </div>
                    </div>
                  
                         {props.westMaterialLocation.map((item,index) => {
                            const currentdate = dayjs().format("DD/MM/YYYY");
                            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                            return (
                                <div>
                                    <div className="flex rounded py-ygap mt-1 bg-white  items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                      

                                            <div className=" flex items-center border-l-2  h-8 border-green-500 bg-[#eef2f9] w-[10.1rem] max-sm:w-full ">
                                                <div class="flex ml-gap text-xs font-bold  font-poppins cursor-pointer underline text-blue-600 ">
                                                    <div
                                                      
                                                    >
                                                        {item.newPoNumber}
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                     

                                        <div className=" flex w-[18.12rem] items-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">

                                            <div class=" text-xs  ml-gap font-poppins" >
                                               
                                                {item.suppliesFullName}  
                                            </div>

                                        </div>

                                       
                                        <div className=" flex w-[11.02rem] items-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">
                                        <div className="  text-xs  ml-gap font-poppins " >

                                            {item.supplierName}

                                        </div>
                                        </div>
                                        <div className=" flex  items-center justify-start h-8 ml-gap bg-[#eef2f9] w-[4.25rem] max-sm:flex-row  max-sm:justify-between  ">

                                            <div class=" text-xs ml-gap font-poppins">
                                                {item.hsn}
                                            </div>
                                        </div>
                                      
                                        <div className=" flex  md:w-[6.4rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs ml-gap font-poppins">
                                        {item.newSuppliesNo}
                                            </div>
                                          
                                        </div>

                                        <div className=" flex  md:w-[6.4rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs ml-gap font-poppins">
                                       
                                        {dayjs(item.bestBeforeUse).format("DD/MM/YYYY")}
                                            </div>
                                          
                                        </div>


                                        <div className=" flex  md:w-[6.4rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs ml-gap font-poppins">
                                        {item.unitWasted}
                                            </div>
                                          
                                        </div>

                                       

                                        <div className=" flex  md:w-[6.4rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs ml-gap font-poppins">
                                        {item.price}
                                            </div>
                                          
                                        </div>

                                        <div className=" flex  md:w-[6.4rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs ml-gap font-poppins">
                                        {item.batchNo}
                                            </div>
                                          
                                        </div>
                                        <div className=" flex  md:w-[6.4rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs ml-gap font-poppins">
                                        {item.countryName}
                                            </div>
                                          
                                        </div>
                                        <div className=" flex  md:w-[6.4rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs ml-gap font-poppins">
                                        {item.totWstVal}
                                            </div>
                                          
                                        </div>              
                                    </div>

                                </div>
                            );
                        })} 
                 
                </div>
            </div>
 </>
        </>
    );
}


const mapStateToProps = ({ inventory,suppliers, auth }) => ({
    userId: auth.userDetails.userId,
    locationId: auth.userDetails.locationId,
    orgId: auth.userDetails.organizationId,
    token: auth.token,
    locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
    westMaterial:inventory.westMaterial,
    addTermsnCondition: suppliers.addTermsnCondition,
    inventory:inventory.inventory,
    westMaterialLocation: inventory.westMaterialLocation
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
          
            getWasteMaterialLocation,
        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(InvenoryGlobaltab)
);
