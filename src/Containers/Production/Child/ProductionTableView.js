import React, { useState, useEffect, lazy, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import HourglassTopIcon from '@mui/icons-material/HourglassTop';  
 import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import { Tooltip, Button, Popconfirm, Switch, Select } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import OnboardingProduction from "../Child/OnboardingProduction.js"
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import QRCode from "qrcode.react";
import ReactToPrint from "react-to-print";

import ButtonGroup from "antd/lib/button/button-group";
import {updateProStatus,updateProductionPauseStatus} from "../ProductionAction"
// import { getProductionsbyLocId, updateProStatus, handleBuilderProduction, handleProductionIDrawer, updateRoomRackProduction } from "../ProductionAction"
import { DeleteOutlined } from "@ant-design/icons";
//import { updatePauseStatus } from "../../Main/Refurbish/RefurbishAction.js"
import { BorderColorOutlined, PauseCircleFilled, PlayCircleFilledSharp } from "@mui/icons-material";
import { MultiAvatar } from "../../../Components/UI/Elements";
import InpectProductionToggle from "./InpectProductionToggle.js";
import MoveToggleProduction from "../Child/MoveToggleProduction.js"
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage.js";
// import { updatePauseStatus } from "../../Main/Refurbish/RefurbishAction.js"
// import { getRoomRackByLocId, getRackList } from "../../Main/Inventory/InventoryAction";
// import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
// import InpectProductionToggle from "./InpectProductionToggle";
// import { MultiAvatar } from "../../../Components/UI/Elements";
// const BuilderProductionDrawer = lazy(() => import("./BuilderProductionDrawer"));
// const ProductionIDrawer = lazy(() => import("./ProductionIDrawer"));

const { Option } = Select;

function ProductionTableView(props) {
    const [zone, setZone] = useState([]);
  const [rack, setRack] = useState([]);
  const [isLoadingZone, setIsLoadingZone] = useState(false);
  const [isLoadingRack, setIsLoadingRack] = useState(false);
  const [selectedRack, setSelectedRack] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [touchedZone, setTouchedZone] = useState(false);
    const fruitOptions = [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'orange', label: 'Orange' },
        { value: 'mango', label: 'Mango' },
        { value: 'strawberry', label: 'Strawberry' },
      ];

  
    // useEffect(() => {
    //     props.getProductionTable(props.userId);
    //     // setPage(page + 1);
    //     // props.getRoomRackByLocId(props.locationId, props.orgId);
    // }, []);

    function StatusIcon({ type, role, iconType, tooltip, size, status, id, onClick, productId, indStatus }) {

        if (role === type) {
            size = "30px";
        } else {
            size = "16px";
        }
        return (
            <Tooltip title={tooltip}>
                <Button
                    className="p-[6px] border-transparent"
                    ghost={role !== type}
                    style={{
                        color: role === type ? "orange" : "grey",
                    }}
                    onClick={onClick}
                >
                     {iconType}
                    {/* <i className={`fas ${iconType}`} style={{ fontSize: "22px" }}></i> */}
                </Button>
            </Tooltip>
        );
    }

    // const {
    //     fetchingProductionLocId,
    //     productionByLocsId,
    //     user,
    //     openbUILDERProductiondrawer, handleBuilderProduction, clickedProductionIdrwr, handleProductionIDrawer
    // } = props;



    const fetchZone = async () => {
        setIsLoadingZone(true);
        try {
          // const response = await axios.get('https://develop.tekorero.com/employeePortal/api/v1/customer/user/${props.userId}');
          // setCustomers(response.data);
          const apiEndpoint = `https://erp.celltechnologies.nl/roomrack/exit/roomAndRackDetails/${props.orgId}`;
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


      const handleSelectZoneFocus = () => {
        if (!touchedZone) {
          fetchZone();
          // fetchSector();
    
          setTouchedZone(true);
        }
      };



      const fetchRack = async (roomRackId) => {
        setIsLoadingRack(true);
        try {
          // const response = await axios.get(`https://develop.tekorero.com/employeePortal/api/v1/customer/contact/drop/${customerId}`);
          // setContacts(response.data);
          const apiEndpoint = `https://erp.celltechnologies.nl/roomrack/${roomRackId}`;
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



      const handleZoneChange = (roomRackId) => {
        setSelectedZone(roomRackId);
        fetchRack(roomRackId);
      };


      const handleRackChange=(value)=>{
        setSelectedRack(value);
      }

    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=""></div>
                        <div className=" md:w-[9rem]">ID</div>
                        <div className=" md:w-[6.01rem]">Cell</div>
                        <div className=" md:w-[6rem]">Created</div>
                        <div className="md:w-[2rem]"></div>
                        <div className=" md:w-[4.3rem]">Item</div>
                        <div className="md:w-[8.4rem]">Category</div>
                        <div className="md:w-[8.5rem]">Attribute</div>
                        <div className=" md:w-[5.51rem] ">Status</div>
   
 
                        
                    </div>
                    
                 {/* {productionByLocsId.length ?
                            <> */}
                                {props.productionTableData.map((item, index) => {
                                    // const currentdate = dayjs().format("DD/MM/YYYY");
                                    // const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                            
                                        <div key={item.productId} >
                                            <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 ">
                                                <div class="flex">
                                                    <div className=" flex font-medium  items-center  md:w-[9.01rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" text-[#1890ff] cursor-pointer w-[8rem] flex text-xs  font-poppins"
                                                            // onClick={() => {
                                                            //     handleParticularRowData(item);
                                                            //     props.handleProductionIDrawer(true)
                                                            // }}
                                                        >
                                                            {item.manufactureId}
                                                            &nbsp;&nbsp;
                                                            {/* {date === currentdate ? (
                                                                <div class="text-xs text-[tomato] mt-[0.4rem] font-bold"
                                                                >
                                                                    New
                                                                </div>
                                                            ) : null} */}
                                                        </div>

                                                    </div>

                                                    <div class=" text-xs text-cardBody font-poppins flex items-center w-[3rem]">

                                                   {item.cellChamberName}
                                                           </div>

                                                    
                                                    <div className=" flex font-medium items-center  md:w-[10.01rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            {/* {props.productionTableData.createdBy} */}
                                                            <MultiAvatar
                  primaryTitle={item.createdBy}
                  // imageId={item.ownerImageId}
                  // imageURL={item.imageURL}
                  imgWidth={"2.1em"}
                  imgHeight={"2.1em"}
                />
                                                        </div>
                                                        <div class=" text-xs text-cardBody font-poppins ml-1">
    {/* {props.productionTableData.createdBy} */}
    {`  ${moment.utc(item.creationDate).format("DD-MM-YYYY")}`}
</div>

                                                    </div>

                                                    <div className=" flex font-medium items-center  md:w-[4.02rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">

</div>

</div>
                                                    <div className=" flex font-medium items-center  md:w-[6.04rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            {item.categoryName} {item.subCategoryName}
                                                        </div>

                                                    </div>

                                                </div>

                                                <div className=" flex font-medium items-center md:w-[8.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins">

                                                        {item.attributeName}  {item.subAttributeName} 
                                                    </div>
                                                </div>
                                                

                                                <div className=" flex font-medium items-center md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {item.type === "In Progress" && item.startInd === false &&

                                                            <PlayCircleFilledSharp
                                                                // class=" cursor-pointer"
                                                                onClick={() => {
                                                                    let data = {
                                                                        // userId: item.userId,
                                                                        // phoneId: item.productionTableData.manufactureId,
                                                                        // pauseInd: false
                                                                        manufactureId:item.manufactureId,
                                                                        productionProductId:item.productionProductId,
                                                                        userId:item.userId,
                                                                        startInd:true,
                                                                        orgId:props.orgId,
                                                                    }
                                                                    props.updateProductionPauseStatus(data)
                                                                }} />
                                                        }
                                                        {item.type === "In Progress" && item.startInd === true &&

                                                            <PauseCircleFilled
                                                                class=" cursor-pointer text-orange-400"
                                                                onClick={() => {
                                                                    let data = {
                                                                        manufactureId:item.manufactureId,
                                                                        productionProductId:item.productionProductId,
                                                                        userId:item.userId,
                                                                        startInd:false,
                                                                        orgId:props.orgId,
                                                                        // userId: props.userId,
                                                                        // phoneId:item.manufactureId,
                                                                        // pauseInd: true
                                                                    }
                                                                    props.updateProductionPauseStatus(data)
                                                                }}
                                                            />
                                                        }
                                                        <ButtonGroup>
                                                            {item.type === "null" && (
                                                                <StatusIcon
                                                                    type="In Progress"
                                                                    //iconType="fa-hourglass-half"
                                                                    tooltip="In Progress"
                                                                    iconType={<HourglassTopIcon/>}
                                                                    role={item.type}
                                                                    onClick={() => {
                                                                        props.updateProStatus({
                                                                            type: "In Progress",
                                                                        }, item.productionProductId);
                                                                    }}
                                                                />)}

                                                            {item.type === "In Progress" ?
                                                                <StatusIcon
                                                                    type="Complete"
                                                                    //iconType="fa-hourglass"
                                                                    iconType={<HourglassBottomIcon/>}
                                                                    tooltip="Complete"
                                                                    role={item.type}
                                                                    onClick={() => {
                                                                        props.updateProStatus({
                                                                            type: "Complete",
                                                                        }, item.productionProductId);
                                                                    }}
                                                                /> : null}
                                                        </ButtonGroup>
                                                    </div>
                                                </div>
                                               
                                               
                                               
                                            </div>
                                            
                                        </div>
                                        
                                    );
                                })}
                                    
                                    
                            
                           
                </div>
            </div>


            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">                       
                        <div className=" md:w-[9rem]">Workflow</div>
                        <div className=" md:w-[6.06rem]">Stage</div>
                        <div className="md:w-[5rem]">Inspected</div>
                        <div className=" md:w-[6.07rem]">Store</div>
                        <div className="md:w-[1.08rem]"></div>
                        <div className="md:w-[5.07rem]">To Dispatch</div>
                        {/* <div className=" md:w-[5rem] ">Status</div> */}
   
 
                        {/* <div className="md:w-[3rem]"></div>
                        <div className="md:w-[2rem]"></div> */}
                    </div>

                  {props.productionTableData.map((item, index) => {
                                    // const currentdate = dayjs().format("DD/MM/YYYY");
                                    // const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                    <div key={item.productId} >
                                           
                    <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 ">
                                                

                                                
                                                


                                                
                                                
                                                <div className=" flex font-medium  items-center md:w-[10.023rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins" >
                                                        {/* {stage} */}
                                                        {item.workflowName}
                                                    </div>
                                                </div>
                                              

                                                <div className=" flex font-medium items-center md:w-[9.54rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {/* {stage} */}

                                                        {item.stage}
                                                    </div>
                                                </div>

                                                <div className=" flex font-medium items-center md:w-[14.081rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {/* {stage} */}

                                                        <InpectProductionToggle item={item} />
                                                            {item.inspectedInd ?
                                                                <MultiAvatar
                                                                    primaryTitle={item.inspectedUserName}
                                                                    imgWidth={"1.8rem"}
                                                                    imgHeight={"1.8rem"}
                                                                /> : null}
                                                    </div>
                                                </div>




                                                <div className=" flex font-medium  items-center md:w-[7.023rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins" style={{display:"flex",marginLeft:"-13em"}} >
                                                        {item.inspectedInd===true&&(
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
                                                        )}
{item.inspectedInd===true&&(
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
)}
                                                    </div>
                                                </div>



                                                <div className=" flex font-medium items-center md:w-[5.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {selectedRack &&  
                                                        <MoveToggleProduction 
                                                        item={item} 
                                                        selectedZone={selectedZone}
                                                        selectedRack={selectedRack}

                                                        />
                                                        }
                                                    </div>
                                                </div>
                                               
                                               
                                               
                                               
                                            </div>          
                                        </div>
                                                 
                                    );
                                })}
                                      
                                    
                            
                           
                </div>
 
            </div>


           
            <OnboardingProduction
            productionTableData={props.productionTableData}
            />

       
        </>
    );
}


const mapStateToProps = ({ production, auth, inventory }) => ({
    token: auth.token,
    // productionByLocsId: production.productionByLocsId,
    // fetchingProductionLocId: production.fetchingProductionLocId,
    // locationId: auth.userDetails.locationId,
    // orgId: auth.userDetails.organizationId,
    // user: auth.userDetails,
    
    //productionTableData:production.productionTableData,
    // openbUILDERProductiondrawer: production.openbUILDERProductiondrawer,
    // clickedProductionIdrwr: production.clickedProductionIdrwr,
    // organizationId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    // roomRackbyLoc: inventory.roomRackbyLoc,
    // rackList: inventory.rackList,
    // orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            updateProStatus,
            updateProductionPauseStatus
            //getProductionTable,
            // getProductionsbyLocId,
            // handleBuilderProduction,
            // updatePauseStatus,
            // handleProductionIDrawer,
            // updateProStatus,
            // getRoomRackByLocId,
            // updateRoomRackProduction,
            // getRackList
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionTableView);