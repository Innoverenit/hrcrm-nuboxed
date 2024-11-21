import React, { useEffect, useState,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getMaterialBestBefore,
    addToWaste,
    addAsileInbest
  
} from "../Inventory/InventoryAction";
import TermsnConditionModal from "../Suppliers/Child/SupplierDetails/SupplierDetailTab/TermsnConditionModal"
import { TerminalSharp } from "@mui/icons-material";
import {handleTermsnConditionModal} from "../Suppliers/SuppliersAction"
import dayjs from "dayjs";
import { withRouter } from "react-router";

import { Tooltip, Select, Button,Input } from "antd";
import { base_url2 } from "../../../Config/Auth";
import CategoryIcon from '@mui/icons-material/Category'
import FactoryIcon from '@mui/icons-material/Factory';

const { Option } = Select;

const InventoryMaterialBestBefore = (props) => {
  const [rowsBest, setRowBest] = useState(props.materialBestBefore)
  const [selectedZones, setSelectedZones] = useState(null);
  const [asile, setAsile] = useState("");
  const [rowDetails, setRowDetails] = useState({}); 
    const [zone, setZone] = useState([]);
    const [rack, setRack] = useState([]);
    const [isLoadingZone, setIsLoadingZone] = useState(false);
    const [isLoadingRack, setIsLoadingRack] = useState(false);
    const[selectedAisle,setSelectedAisle]= useState(false)
    const [selectedRack, setSelectedRack] = useState(null);
    const [selectedZone, setSelectedZone] = useState(null);
    const [touchedZone, setTouchedZone] = useState(false)
    const [row, setRow] = useState({})



    const [aisle, setAisle] = useState([]);
    const [isLoadingAisle, setIsLoadingAisle] = useState(false);
    
    useEffect(() => {
        props.getMaterialBestBefore(props.locationId);
        //props.getRoomRackByLocId(props.locationId, props.orgId);
    }, [])


    useEffect(() => {
      // Check if data is available
      if (props.materialBestBefore.length > 0) {
        // Update activeTab when data is available
        setRowBest(props.materialBestBefore);
      }
    }, [props.materialBestBefore]);



    const handleRow = (item) => {
        setRow(item)
    }


    // const handleZoneChange = (value) => {
    //   console.log(zone)
    //   console.log(value)
    //   const selectedZoneData = zone.find(zone => zone.roomRackId === value);
    //   console.log(selectedZoneData)
    //   if (selectedZoneData) {
    //     setAsile(selectedZoneData.aisle);
    //     setSelectedZones(value);
    //   } else {
    //     setAsile("");
    //   }
    //     // setSelectedZone(roomRackId);
    //     fetchRack(value);
    //   };
    const handleZoneChange = (value, index) => {
      const selectedZone = value;
  
      // Find the corresponding aisle for the selected zone
      const selectedZoneData = zone.find((zone) => zone.roomRackId === selectedZone);
      fetchAisle(value)
      fetchRack(value)
      // Update the rows state for the specific row at index
      const updatedRows = rowsBest.map((row, i) => {
        console.log(row)
        if (i === index) {
          const updatedRow = {
            ...row,
            zone: selectedZone,
            aisle: selectedZoneData ? selectedZoneData.aisle : '',
            roomRackId:selectedZoneData ? selectedZoneData.roomRackId : '',
          };

          setRowDetails((prevDetails) => ({
            ...prevDetails,
            
              roomRackId: updatedRow.roomRackId,
              aisle: updatedRow.aisle,
            
          }));
          return updatedRow;
        }
        
        return row;
      });
  
      setRowBest(updatedRows);
    };
      const handleSelectZoneFocus = () => {
        if (!touchedZone) {
          fetchZone();
          // fetchSector();
    
          setTouchedZone(true);
        }
      };
      const fetchZone = async () => {
        setIsLoadingZone(true);
        try {
       
          const apiEndpoint = `${base_url2}/roomrack/notUsed/roomAndRackDetails/${props.locationId}/${props.orgId}`;
          const response = await fetch(apiEndpoint,{
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${props.token}`,
              'Content-Type': 'application/json',
              // Add any other headers if needed
            },
          });
          const data = await response.json();
          setZone(data);
        } catch (error) {
          console.error('Error fetching customers:', error);
        } finally {
          setIsLoadingZone(false);
        }
      };



      const handleAisleChange=(value,poSupplierSuppliesId)=>{
        setSelectedAisle(value);
        console.log(rowsBest)
        console.log(rowDetails)
        // let data={
        //   roomRackId:rowDetails.roomRackId,
        //   roomRackChamberLinkId:value
        // }
        // props.addAsileInbest(data,poSupplierSuppliesId)
      }


      const handleRackChange=(value,poSupplierSuppliesId)=>{
        setSelectedRack(value);
        console.log(rowsBest)
        console.log(rowDetails)
        let data={
          roomRackId:rowDetails.roomRackId,
          roomRackChamberLinkId:value
        }
        props.addAsileInbest(data,poSupplierSuppliesId)
      }
console.log(aisle)
      const fetchAisle = async (roomRackId) => {
        //setIsLoadingAisle(true);
        try {
         
          const apiEndpoint = `${base_url2}/roomrack/notUesedAisle/${roomRackId}`;
          const response = await fetch(apiEndpoint,{
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${props.token}`,
              'Content-Type': 'application/json',
              // Add any other headers if needed
            },
          });
          const data = await response.json();
          setAisle(data);
        } catch (error) {
          console.error('Error fetching contacts:', error);
        } finally {
          //setIsLoadingAisle(false);
        }
      };




      const fetchRack = async (roomRackId) => {
        setIsLoadingRack(true);
        try {
         
          const apiEndpoint = `${base_url2}/roomrack/notUesedChamber/${roomRackId}`;
          const response = await fetch(apiEndpoint,{
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${props.token}`,
              'Content-Type': 'application/json',
              // Add any other headers if needed
            },
          });
          const data = await response.json();
          setRack(data);
        } catch (error) {
          console.error('Error fetching contacts:', error);
        } finally {
          setIsLoadingRack(false);
        }
      };
   
console.log(selectedZones)

   
    return (
        <>
            <div className=' flex sticky  z-auto h-[79vh]'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex  w-[100%]  p-1 bg-transparent font-bold font-poppins text-xs items-end sticky z-10">
                        <div className=""></div>
                        
                        <div className="text-[#00A2E8] text-base w-[11.52rem]" >
                        {props.translatedMenuItems[38]}   {/* Item  */}
                        </div>
             
                       
               
                        <div className=" w-[12.122rem]" >       
                        <FactoryIcon className='!text-base  text-[#e4eb2f]' /> {props.translatedMenuItems[36]} {props.translatedMenuItems[0]}  
                         {/* Supplier Name */}
                        </div>

                        <div className=" w-[4.122rem]">       
                      HSN
                        </div>

                        <div className=" w-[8.12rem]">       
                        <CategoryIcon className='!text-base  text-[#e4eb2f]'/> {props.translatedMenuItems[36]} Id

                        </div>   
                        <div className=" w-[5.12rem]" >       
                   {/* Country */} {props.translatedMenuItems[1]} 

                        </div>
                        <div className=" w-[8.12rem]" >       
                   Best Use Date
                   {/* {props.translatedMenuItems[1]}  */}

                        </div>               
                        <div className=" w-[5.12rem]" >       
                    {/* Units */}{props.translatedMenuItems[26]} 

                        </div>
                        <div className=" w-[9.2rem]" >       
                    {/* Zone */}{props.translatedMenuItems[32]} 

                        </div>
                        <div className=" w-[13.2rem]">       
                    Aisle

                        </div>
                        <div className=" w-[7.12rem]">       
                    {/* Rack */}{props.translatedMenuItems[33]} 

                        </div>
                   

                        <div className=" w-[3.22rem]">Discount</div>
                    </div>
                    {/* <InfiniteScroll
                        dataLength={props.materialReceiveData.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingMaterialReceiveData ? <div class="text-center font-semibold text-xs">{props.translatedMenuItems[10]} ...</div> : null}
                        height={"67vh"}
                        style={{ scrollbarWidth:"thin"}}
                    > */}
                         {rowsBest.map((item,index) => {
                            const currentdate = dayjs().format("DD/MM/YYYY");
                            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                            return (
                                <div>
                                    <div className="flex rounded py-1 mt-1 bg-white  items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                      

                                            {/* <div className=" flex items-center  w-[10.1rem] max-sm:w-full ">
                                                <div class="flex ml-gap text-xs font-bold  font-poppins cursor-pointer underline text-blue-600 border-l-2 border-green-500 bg-[#eef2f9]">
                                                    <div
                                                     
                                                    >
                                                        {item.newPoNumber}
                                                    </div>
                                                  
                                                </div>
                                            </div> */}
                                     

                                        <div className=" flex w-[18.12rem] items-center border-l-2  h-8 border-green-500 bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">

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
                                        <div className=" flex  md:w-[3.8rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins">
                                        {item.remainingCorrectUnit}
                                            </div>
                                       
                                        </div>

                                        <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[5.6rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <Button
                                        onClick={() => {
                                          props.addToWaste({
                                            poSupplierSuppliesId:item.poSupplierSuppliesId,
                                            poSupplierDetailsId:item.poSupplierDetailsId,
                                            suppliesId:item.suppliesId,
                                            userId:item.userId,
                                            locationId:item.locationId,
                                            orgId:props.orgId,
                                            moveToWasteInd:true
                                          },
                                          item.poSupplierSuppliesId
                                        );
                                          
                                        }}
                         
                                        >To Waste</Button>
                                        </div>
                                        <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[24.023rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class="flex text-xs  font-semibold  font-poppins" >
                                                        
                                                    <Select placeholder="Select zone" 
                                                    style={{ width: 119 }}
                                                    loading={isLoadingZone}
                                                    value={item.zone}
                                                    onFocus={handleSelectZoneFocus}
                                                    onChange={(value) => handleZoneChange(value, index)}
                                                    >
      
        {zone.map((zone) => (
          <Option key={zone.roomRackId} value={zone.roomRackId}>
            {zone.zone}
          </Option>
        ))}
      </Select>

    {/* <Input
        placeholder="Aisle"
        style={{ width: 100 }}
        value={item.aisle}
        disabled
      /> */}


<Select placeholder="Select zone" 
                                                    style={{ width: 119 }}
                                                    //loading={isLoadingAisle}
                                                    value={item.aisle}
                                                   
                                                   onChange={(value) => handleAisleChange( value, item.poSupplierSuppliesId)}
                                                    >
      
        {aisle.map((aisle) => (
          <Option key={aisle.roomRackChamberLinkId} value={aisle.roomRackChamberLinkId}>
            {aisle.chamber}
          </Option>
        ))}
      </Select>

    <Select placeholder="Select rack" 
      style={{ width: 119 }}
      loading={isLoadingRack}
   value={item.chamber}
      onChange={(value) => handleRackChange(value, item.poSupplierSuppliesId)}
      // disabled={!selectedZone} 
      >
      
      {rack.map((rack) => (
        <Option key={rack.roomRackChamberLinkId} value={rack.roomRackChamberLinkId}>
          {rack.chamber}
        </Option>
      ))}
    </Select>
                                                    </div>
                                                </div>
                                        <div className=" flex  items-center justify-end h-8 ml-gap bg-[#eef2f9] w-[1.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" cursor-pointer max-xl:text-[0.65rem] font-xl text-xs items-center font-poppins">
                                                            <Tooltip title="Terms and conditions">
                                                                <TerminalSharp className="!text-icon text-[#c3b20b]"
                                                                    onClick={() => {
                                                                    handleRow(item)
                                                                        props.handleTermsnConditionModal(true)
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        </div>
                                                    </div>                                  
                                    </div>

                                </div>
                            );
                        })} 
                    {/* </InfiniteScroll> */}
                </div>
            </div>
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
    materialBestBefore:inventory.materialBestBefore,
    addTermsnCondition: suppliers.addTermsnCondition,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getMaterialBestBefore,
            handleTermsnConditionModal,
            addToWaste,
            addAsileInbest
            
            // getMaterialReceiveData,
            // handleMaterialReceived,
            // handlegrnlistmodal,
            // getRackList,
            // getRoomRackByLocId,
        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(InventoryMaterialBestBefore)
);
