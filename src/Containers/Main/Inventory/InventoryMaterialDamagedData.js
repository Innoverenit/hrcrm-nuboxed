import React, { useEffect, useState,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getMaterialDamagedData,
    addRepairData,
    addDamagedCredit
} from "../Inventory/InventoryAction";
import dayjs from "dayjs";
import {  Switch, Input, message } from 'antd';

import {  Select, Button } from "antd";
import CategoryIcon from '@mui/icons-material/Category'
import FactoryIcon from '@mui/icons-material/Factory';
import PinIcon from '@mui/icons-material/Pin';

const { Option } = Select;

const InventoryMaterialDamagedData = (props) => {
    const [materialDamage, setMaterialDamage] = useState(props.materialDamageData);
    console.log(props.locationDetailsId)
    useEffect(() => {
        props.getMaterialDamagedData(props.locationId);
    }, [])


    useEffect(() => {
        // Check if data is available
        if (props.materialDamageData.length > 0) {
          // Update activeTab when data is available
          setMaterialDamage(props.materialDamageData);
        }
      }, [props.materialDamageData]);


      const handleSwitchChange = (checked, index) => {
        const newData = [...materialDamage];
        newData[index].repackedInd = checked; // Update the repackedInd value
        setMaterialDamage(newData);
      };

      const handleInputChange = (e, index, unitDamaged) => {
        const value = e.target.value;
        // Ensure input value is within the limit
        if (value <= unitDamaged) {
          const newData = [...materialDamage];
          newData[index].repackedUnit = value; // Update the unitData value
          setMaterialDamage(newData);
        } else {
          message.error(`Value exceeds the limit of ${unitDamaged}`);
        }
      };
   

      const handleKeyPress = (e, index,poSupplierSuppliesId) => {
        if (e.key === 'Enter') {
            let data={
                repackedUnit:materialDamage[index].repackedUnit,
                repackedInd:materialDamage[index].repackedInd
            }
            props.addRepairData(data,poSupplierSuppliesId)
          console.log(`Unit data for ${materialDamage[index].name}: ${materialDamage[index].repackedUnit}`);
        }
      };
   
    return (
        <>
            <div className=' flex sticky  z-auto h-[79vh]'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex  w-[100%]  p-1 bg-transparent font-bold sticky items-end font-poppins !text-lm z-10">
                        <div className=""></div>
                        <div className="text-[#00A2E8] text-sm w-[17.5rem] truncate max-md:w-[17.5rem]">PO ID</div>
                      

                        <div className=" w-[11.12rem] truncate max-md:w-[11.12rem]">       
                        <FactoryIcon className='!text-icon  text-[#e4eb2f]' />{props.translatedMenuItems[36]} {props.translatedMenuItems[0]} 
                        {/* Supplier Name */}

                        </div>

                        <div className=" w-[6.13rem] truncate max-md:w-[6.13rem]">       
                        < PinIcon className=" !text-icon"/> HSN

                        </div>

                        <div className=" w-[9.14rem] truncate max-md:w-[9.14rem]">       
                        <CategoryIcon
              className='!text-icon  text-[#e4eb2f]'
              /> {props.translatedMenuItems[36]} Id

                        </div>
                        <div className=" w-[9.14rem] truncate max-md:w-[9.14rem]">       
              {/* Received */}{props.translatedMenuItems[17]}

                        </div>
                        <div className=" w-[9.14rem] truncate max-md:w-[9.14rem]">       
              {/* Damaged */}{props.translatedMenuItems[27]}

                        </div>
                        <div className=" w-[15.15rem] truncate max-md:w-[15.15rem]">       
                      Repacked

                        </div>
                        <div className=" w-[7.16rem] truncate max-md:w-[7.16rem]">       
                   

                        </div>
                        <div className=" w-[4.17rem] truncate max-md:w-[4.17rem]">       
                  {/* Final */}{props.translatedMenuItems[37]}

                        </div>                                 
                    </div>
                    {/* <InfiniteScroll
                        dataLength={props.materialReceiveData.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingMaterialReceiveData ? <div class="text-center font-semibold text-xs">{props.translatedMenuItems[10]} ...</div> : null}
                        height={"67vh"}
                        style={{ scrollbarWidth:"thin"}}
                    > */}
                     {materialDamage.map((item,index) => {
                            const currentdate = dayjs().format("DD/MM/YYYY");
                            // const date= dayjs(item.creationDate).format("DD/MM/YYYY");
                            return (
                                <div>
                                    <div className="flex rounded  mt-1 bg-white py-ygap items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
                                        <div class="flex">

                                            <div className=" flex  border-l-2 items-center h-8 border-green-500 bg-[#eef2f9] justify-start w-[9.1rem] max-sm:w-full  ">
                                                <div class="flex ml-gap text-xs font-bold  font-poppins cursor-pointer underline text-blue-600">
                                                    <div
                                                        // onClick={() => {
                                                        //     handleRow(item);
                                                        //     props.handleMaterialReceived(true);
                                                        // }}
                                                    >
                                                        {item.newPoNumber}
                                                    </div>
                                                    {/* {date === currentdate ? (
                                                        <div class="text-xs font-poppins font-bold text-[tomato]">
                                                          {props.translatedMenuItems[13]}  
                                                         
                                                        </div>
                                                    ) : null} */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" flex w-[33.12rem] items-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">

                                            <div class=" text-xs   ml-gap font-poppins">
                                              {item.suppliesFullName}
                                            </div>

                                        </div>
                                        <div className=" flex  items-center h-8 ml-gap bg-[#eef2f9] w-[19.32rem] max-sm:flex-row  max-sm:justify-between  ">
                                        <div class=" text-xs   ml-gap font-poppins">
                                            {item.supplierName}
</div>
                                        </div>
                                        <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[10.24rem] max-sm:flex-row  max-sm:justify-between  ">

                                            <div class=" text-xs  font-poppins">
                                              {item.hsn}
                                            </div>
                                        </div>
                                      
                                        <div className=" flex  items-center justify-start font-poppins  h-8 ml-gap bg-[#eef2f9] w-[28.2rem] md:w-[19.2rem] max-sm:flex-row max-sm:justify-between ">
                                        <div class=" text-xs   ml-gap font-poppins">
                                          {item.suppliesId}
                                          </div>
                                        </div>
                                        <div className=" flex  items-center justify-start font-poppins  h-8 ml-gap bg-[#eef2f9] w-[28.2rem] md:w-[19.2rem] max-sm:flex-row  max-sm:justify-between ">
                                        <div class=" text-xs   ml-gap font-poppins">
                                          {item.unitReceived}
                                          </div>
                                        </div>
                                        <div className=" flex  items-center justify-start font-poppins  h-8 ml-gap bg-[#eef2f9] w-[28.2rem] md:w-[19.2rem] max-sm:flex-row  max-sm:justify-between ">
                                        <div class=" text-xs   ml-gap font-poppins">
                                          {item.unitDamaged}
                                          </div>
                                        </div>
                                        <div className=" flex  items-center justify-center ml-gap  h-8  bg-[#eef2f9] w-[17.01rem] md:w-[13.01rem] max-sm:flex-row  max-sm:justify-between ">
                                          {item.unitDamaged != 0 &&(
                                        <Switch
                                           checkedChildren="Yes"  
                        unCheckedChildren="No"
             checked={item.repackedInd} 
            onChange={(checked) => handleSwitchChange(checked, index)}
          />
                                          )}
           {item.repackedInd && (
            <Input
              placeholder={`Enter value (limit: ${item.unitDamaged})`}
              value={item.repackedUnit} // Display unitData as the input value
              onChange={(e) => handleInputChange(e, index, item.unitDamaged)}
              onKeyPress={(e) => handleKeyPress(e, index,item.poSupplierSuppliesId)}
           
              type="number"
            />
         )} 
                                        </div>

 
                                        <div className=" flex  w-[25.02rem] items-center h-8 ml-gap bg-[#eef2f9] md:w-[13.01rem] max-sm:flex-row max-sm:justify-between ">
                                         
                                         </div>
                                         <div className=" flex w-[18.1rem] justify-center items-center h-8 ml-gap bg-[#eef2f9] md:w-[14.1rem] max-sm:flex-row max-sm:justify-between ">
                                         {item.unitCorrect}
                                         </div>


                                         <div className=" flex w-[7.22rem]  justify-center items-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">

<div class=" text-xs   font-poppins">
  <Button
   disabled={item.creditNoteInd === true || item.unitDamaged === 0}
    onClick={() => {
        props.addDamagedCredit({
            creditNoteInd:true
        },
        item.poSupplierSuppliesId
    );
  
      
      }}
      style={{backgroundColor:item.creditNoteInd===true?"green":"tomato",color:"white"}}
  >Credit Note</Button>
</div>

</div>
                                       
                                    </div>

                                </div>
                            );
                        })}
                    {/* </InfiniteScroll> */}
                </div>
            </div>
           
        </>
    );
}


const mapStateToProps = ({ inventory, auth }) => ({
    userId: auth.userDetails.userId,
    locationId: auth.userDetails.locationId,
    orgId: auth.userDetails.organizationId,
    locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
    materialReceiveData: inventory.materialReceiveData,
    addMaterialReceived: inventory.addMaterialReceived,
    showGrnListOfPo: inventory.showGrnListOfPo,
    fetchingMaterialReceiveData: inventory.fetchingMaterialReceiveData,
    roomRackbyLoc: inventory.roomRackbyLoc,
    rackList: inventory.rackList,
    materialDamageData:inventory.materialDamageData
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getMaterialDamagedData,
            addRepairData,
            addDamagedCredit
            // getMaterialReceiveData,
            // handleMaterialReceived,
            // handlegrnlistmodal,
            // getRackList,
            // getRoomRackByLocId,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(InventoryMaterialDamagedData)

