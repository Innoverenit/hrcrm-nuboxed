import React, { useEffect, useState,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getMaterialBestBefore,
    addToWaste,
    addAsileInbest
    // handleMaterialReceived,
    // handlegrnlistmodal
} from "../Inventory/InventoryAction";
import TermsnConditionModal from "../Suppliers/Child/SupplierDetails/SupplierDetailTab/TermsnConditionModal"
import { TerminalSharp } from "@mui/icons-material";
import {handleTermsnConditionModal} from "../Suppliers/SuppliersAction"
// import {
//     getMaterialReceiveData,
//     handleMaterialReceived,
//     handlegrnlistmodal
// } from "../../../InventoryAction";
import dayjs from "dayjs";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import { MultiAvatar } from "../../../Components/UI/Elements";
// import ReceivedDetailModal from "./ReceivedDetailModal";
// import GrnListOfPOModal from "./GrnListOfPOModal";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip, Select, Button,Input } from "antd";
import { base_url2 } from "../../../Config/Auth";
//import { getRoomRackByLocId, getRackList } from "../../../../Inventory/InventoryAction";

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
    const [selectedRack, setSelectedRack] = useState(null);
    const [selectedZone, setSelectedZone] = useState(null);
    const [touchedZone, setTouchedZone] = useState(false)
    const [row, setRow] = useState({})
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
       
          const apiEndpoint = `${base_url2}/roomrack/roomAndRackDetails/${props.locationId}/${props.orgId}`;
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

      const fetchRack = async (roomRackId) => {
        setIsLoadingRack(true);
        try {
         
          const apiEndpoint = `${base_url2}/roomrack/${roomRackId}`;
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
                    <div className=" flex  w-[100%]  p-1 bg-transparent font-bold sticky z-10">
                        <div className=""></div>
                        <div className=" w-[13.52rem]" style={{marginLeft:"-132px"}}>
                            {/* <FormattedMessage id="app.created" defaultMessage="Created" /> */}
                         Item 
                        </div>
                        <div className=" w-[15.5rem]"><FormattedMessage id="app.po" defaultMessage="PO ID" /></div>
                       
               
                        <div className=" w-[11.122rem]" style={{marginLeft:"-104px"}}>       
                       Supplier Name

                        </div>

                        <div className=" w-[11.122rem]">       
                      HSN

                        </div>

                        <div className=" w-[11.122rem]">       
                      Supplies Id

                        </div>
                        {/* <div className=" w-[11.122rem]">       
                      Repacked

                        </div>
                        <div className=" w-[11.122rem]">       
                     Credit Note

                        </div> */}
                        <div className=" w-[11.122rem]" style={{marginLeft:"-52px"}}>       
                    Units

                        </div>
                        <div className=" w-[11.122rem]" style={{marginLeft:"-52px"}}>       
                    Zone

                        </div>
                        <div className=" w-[11.122rem]" style={{marginLeft:"-52px"}}>       
                    Aisle

                        </div>
                        <div className=" w-[11.122rem]" style={{marginLeft:"-52px"}}>       
                    Rack

                        </div>
                   

                        <div className=" w-[11.322rem]"></div>
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
                                    <div className="flex rounded  mt-1 bg-white  items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                      

                                            <div className=" flex  border-l-2  h-8 border-green-500 bg-[#eef2f9] w-[10.1rem] max-sm:w-full ">
                                                <div class="flex justify-between text-xs font-bold  font-poppins cursor-pointer underline text-blue-600 border-l-2 border-green-500 bg-[#eef2f9]">
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
                                     

                                        <div className=" flex w-[18.12rem] items-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">

                                            <div class=" text-xs  ml-gap font-poppins" >
                                               
                                                {item.suppliesFullName}  
                                            </div>

                                        </div>

                                       
                                        <div className=" flex w-[14.02rem] items-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">
                                        <div className="  text-xs  ml-gap font-poppins " >

                                            {item.supplierName}

                                        </div>
                                        </div>
                                        <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[6.25rem] max-sm:flex-row  max-sm:justify-between  ">

                                            <div class=" text-xs  font-poppins">
                                                {item.hsn}
                                            </div>
                                        </div>
                                      
                                        <div className=" flex  md:w-[10.4rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins">
                                        {item.newSuppliesNo}
                                            </div>
                                          
                                        </div>
                                        <div className=" flex  md:w-[8.8rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins">
                                        {item.remainingCorrectUnit}
                                            </div>
                                       
                                        </div>

                                        <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[4.6rem] max-sm:flex-row w-full max-sm:justify-between ">
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
                                        <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[4.023rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-semibold  font-poppins" style={{display:"flex",marginLeft:"-29rem"}} >
                                                        
                                                    <Select placeholder="Select zone" 
                                                    style={{ width: 146 }}
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
                                                    

    



    {/* <Select placeholder="Select aisle" 
      style={{ width: 146,marginLeft:"1em" }}
      loading={isLoadingRack}
      onChange={handleRackChange}
      disabled={!selectedZone} 
      >
      
      {rack.map((rack) => (
        <Option key={rack.roomRackChamberLinkId} value={rack.roomRackChamberLinkId}>
          {rack.chamber}
        </Option>
      ))}
    </Select> */}
    <Input
        placeholder="Aisle"
        style={{ width: 200 }}
        value={item.aisle}
        disabled
      />

    <Select placeholder="Select rack" 
      style={{ width: 146,marginLeft:"1em" }}
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


                                        <div className=" flex  items-center justify-end h-8 ml-gap bg-[#eef2f9] w-[4.25rem] max-sm:justify-between  max-sm:flex-row ">
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
