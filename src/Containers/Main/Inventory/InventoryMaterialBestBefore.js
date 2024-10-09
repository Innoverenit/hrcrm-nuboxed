import React, { useEffect, useState,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getMaterialBestBefore,
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
import { Tooltip, Select, Button } from "antd";
import { base_url2 } from "../../../Config/Auth";
//import { getRoomRackByLocId, getRackList } from "../../../../Inventory/InventoryAction";

const { Option } = Select;

const InventoryMaterialBestBefore = (props) => {
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



    const handleRow = (item) => {
        setRow(item)
    }


    const handleZoneChange = (roomRackId) => {
        setSelectedZone(roomRackId);
        fetchRack(roomRackId);
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
       
          const apiEndpoint = `${base_url2}/roomrack/roomAndRackDetails/quality/${props.locationId}/${props.orgId}`;
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


      const handleRackChange=(value)=>{
        setSelectedRack(value);
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
   


   
    return (
        <>
            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex  w-[100%]  p-1 bg-transparent font-bold sticky z-10">
                        <div className=""></div>
                        <div className=" w-[15.5rem]"><FormattedMessage id="app.po" defaultMessage="PO ID" /></div>
                        <div className=" w-[13.52rem]">
                            {/* <FormattedMessage id="app.created" defaultMessage="Created" /> */}
                         Item Name
                        </div>
               
                        <div className=" w-[11.122rem]">       
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
                        <div className=" w-[11.122rem]">       
                    Units

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
                         {props.materialBestBefore.map((item) => {
                            const currentdate = dayjs().format("DD/MM/YYYY");
                            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                            return (
                                <div>
                                    <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 ">
                                        <div class="flex">

                                            <div className=" flex  w-[16.1rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-xs font-bold  font-poppins cursor-pointer underline text-blue-600">
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
                                        <div className=" flex w-[4.12rem] max-sm:flex-row  max-sm:justify-between  ">

                                            <div class=" text-xs  font-poppins">
                                                {/* <MultiAvatar
                                                    primaryTitle={item.userName}
                                                    imgWidth={"1.8rem"}
                                                    imgHeight={"1.8rem"}
                                                /> */}
                                                {item.suppliesFullName}
                                            </div>

                                        </div>
                                        <div className=" flex  w-[8.32rem] max-sm:flex-row  max-sm:justify-between  ">

                                            {/* {item.suppliesFullName} */}

                                        </div>
                                        <div className=" flex   w-[10.22rem] max-sm:flex-row  max-sm:justify-between  ">

                                            <div class=" text-xs  font-poppins">
                                                {/* {item.supplierName} */}
                                            </div>
                                        </div>
                                      
                                        <div className=" flex  md:w-[20rem] max-sm:flex-row w-full max-sm:justify-between ">
                                          {/* {item.supplierId} */}
                                        </div>
                                        <div className=" flex  md:w-[20rem] max-sm:flex-row w-full max-sm:justify-between ">
                                          {item.remainingCorrectUnit}
                                        </div>

                                        <div className=" flex  md:w-[20rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <Button>To Waste</Button>
                                        </div>
                                        <div className=" flex font-medium  items-center md:w-[7.023rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-semibold  font-poppins" style={{display:"flex",marginLeft:"-13em"}} >
                                                        
                                                    <Select placeholder="Select zone" 
                                                    style={{ width: 146 }}
                                                    loading={isLoadingZone}
                                                    onFocus={handleSelectZoneFocus}
                                                    onChange={handleZoneChange}
                                                    >
      
        {zone.map((zone) => (
          <Option key={zone.roomRackId} value={zone.roomRackId}>
            {zone.zone}
          </Option>
        ))}
      </Select>
                                                    

      <Select placeholder="Select rack" 
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
    </Select>

                                                    </div>
                                                </div>


                                        <div className=" flex ml-4  w-[1.25rem] max-sm:justify-between  max-sm:flex-row ">
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
    locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
    materialBestBefore:inventory.materialBestBefore,
    addTermsnCondition: suppliers.addTermsnCondition,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getMaterialBestBefore,
            handleTermsnConditionModal
            
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
