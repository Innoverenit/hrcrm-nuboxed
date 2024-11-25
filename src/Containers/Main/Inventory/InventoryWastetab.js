import React, { useEffect, useState,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getWasteMaterial,
    getWasteMaterialLocation,getInventory
} from "../Inventory/InventoryAction";
import TermsnConditionModal from "../Suppliers/Child/SupplierDetails/SupplierDetailTab/TermsnConditionModal"
import dayjs from "dayjs";
import { withRouter } from "react-router";

import { Tooltip, Select, Button,Input } from "antd";
import CategoryIcon from '@mui/icons-material/Category'
import FactoryIcon from '@mui/icons-material/Factory';

const { Option } = Select;

const InvenoryWastetab = (props) => {
  const [selectedZones, setSelectedZones] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState();
    const [row, setRow] = useState({})
    useEffect(() => {
        props.getWasteMaterial(props.orgId);
        props.getInventory(props.orgId)
    }, [])



    const handleLocationChange = (locationDetailsId) => {
        setSelectedLocation(locationDetailsId); 
    
        props.getWasteMaterialLocation(locationDetailsId); 
      };

    const handleRow = (item) => {
        setRow(item)
    }
    
 

   
console.log(selectedLocation)

   
    return (
        <>
         <div className=" flex  md:w-[13.8rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins">
                                        <Select
                    style={{ width: "12rem" }}
                    onChange={handleLocationChange}
                    placeholder="Select Location"
                  >
                    {props.inventory.map((shipper) => (
                      <Option key={shipper.locationDetailsId} value={shipper.locationDetailsId}>
                        {shipper.locationName}
                      </Option>
                    ))}
                  </Select>
                                            </div>
                                       
                                        </div>
 {selectedLocation ?
 <>
 
  <div className=' flex sticky  z-auto h-[79vh]'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                <div className=" flex  w-[100%]  p-1 bg-transparent font-bold font-poppins !text-lm items-end sticky z-10">
                        <div className=""></div>
                        <div className="text-[#00A2E8] text-base w-[19.5rem]">PO ID</div>
                        <div className=" w-[11.52rem]" >
 Item 
                        </div>
             
                       
               
                        <div className=" w-[12.122rem]" >       
                        <FactoryIcon className='!text-base  text-[#e4eb2f]' />   Supplier Name
                        </div>

                        <div className=" w-[4.122rem]">       
                      HSN
                        </div>

                        <div className=" w-[8.12rem]">       
                        <CategoryIcon className='!text-base  text-[#e4eb2f]'/> Supplies Id

                        </div>    
                        <div className=" w-[5.12rem]" >       
                   Country

                        </div>
                        <div className=" w-[8.12rem]" >       
                   Best Use Date

                        </div>

                        <div className=" w-[5.12rem]" >       
                    Units

                        </div>
                        <div className=" w-[9.2rem]" >       
                 Unit Price

                        </div>
                        <div className=" w-[13.2rem]">       
                    Batch No

                        </div>
            
                        <div className=" w-[7.12rem]">       
                    Country

                        </div>
                        <div className=" w-[7.12rem]">       
                  Total Value

                        </div>
                   

                        <div className=" w-[3.22rem]"></div>
                    </div>
                  
                         {props.westMaterialLocation.map((item,index) => {
                            const currentdate = dayjs().format("DD/MM/YYYY");
                            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                            return (
                                <div>
                                    <div className="flex rounded py-1 mt-1 bg-white  items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                      

                                            <div className=" flex items-center border-l-2  h-8 border-green-500 bg-[#eef2f9] w-[10.1rem] max-sm:w-full ">
                                                <div class="flex ml-gap text-xs font-bold  font-poppins cursor-pointer underline text-blue-600 border-l-2 border-green-500 bg-[#eef2f9]">
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
                                       

                                                              
                                    </div>

                                </div>
                            );
                        })} 
                 
                </div>
            </div>
 </>
:
            <div className=' flex sticky  z-auto h-[79vh]'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                <div className=" flex  w-[100%]  p-1 bg-transparent font-bold font-poppins !text-lm items-end sticky z-10">
                        <div className=""></div>
                        <div className="text-[#00A2E8] text-base w-[19.5rem]">PO ID</div>
                        <div className=" w-[11.52rem]" >

                         Item 
                        </div>
             
                       
               
                        <div className=" w-[12.122rem]" >       
                        <FactoryIcon className='!text-base  text-[#e4eb2f]' />  {props.translatedMenuItems[36]} {props.translatedMenuItems[0]}  
                        </div>

                        <div className=" w-[4.122rem]">       
                      HSN
                        </div>

                        <div className=" w-[8.12rem]">       
                        <CategoryIcon className='!text-base  text-[#e4eb2f]'/> {props.translatedMenuItems[36]} Id

                        </div>    
                        <div className=" w-[5.12rem]" >       
                        {props.translatedMenuItems[1]} 


                        </div>
                        <div className=" w-[8.12rem]" >       
                   Best Use Date

                        </div>
                        
                        <div className=" w-[9.2rem]" >       
                 Unit 

                        </div>

                        <div className=" w-[9.2rem]" >       
                 Unit Price

                        </div>
                        <div className=" w-[13.2rem]">       
                    Batch No

                        </div>
            
                        <div className=" w-[7.12rem]">       
                    Country

                        </div>
                        <div className=" w-[7.12rem]">       
                  Total Value

                        </div> 
                        
                     
                       
                   

                        <div className=" w-[3.22rem]"></div>
                    </div>
                    {/*   <div className=" w-[9.2rem]" >       
                 Unit Price

                        </div>
                        <div className=" w-[13.2rem]">       
                    Batch No

                        </div>
            
                        <div className=" w-[7.12rem]">       
                    Country

                        </div>
                        <div className=" w-[7.12rem]">       
                  Total Value

                        </div> <InfiniteScroll
                        dataLength={props.materialReceiveData.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingMaterialReceiveData ? <div class="text-center font-semibold text-xs">{props.translatedMenuItems[10]} ...</div> : null}
                        height={"67vh"}
                        style={{ scrollbarWidth:"thin"}}
                    > */}
                         {props.westMaterial.map((item,index) => {
                            const currentdate = dayjs().format("DD/MM/YYYY");
                            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                            return (
                                <div>
                                    <div className="flex rounded py-1 mt-1 bg-white  items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                      

                                            <div className=" flex items-center border-l-2  h-8 border-green-500 bg-[#eef2f9] w-[10.1rem] max-sm:w-full ">
                                                <div class="flex ml-gap text-xs font-bold  font-poppins cursor-pointer underline text-blue-600 border-l-2 border-green-500 bg-[#eef2f9]">
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
                                       

                                                              
                                    </div>

                                </div>
                            );
                        })} 
                    {/* </InfiniteScroll> */}
                </div>
            </div>
        }

            <TermsnConditionModal
                rowData={row}
                addTermsnCondition={props.addTermsnCondition}
                handleTermsnConditionModal={props.handleTermsnConditionModal}
                translateText={props.translateText}
                selectedLanguage={props.selectedLanguage}
            />
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
            getWasteMaterial,
            getWasteMaterialLocation,
            getInventory
        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(InvenoryWastetab)
);
