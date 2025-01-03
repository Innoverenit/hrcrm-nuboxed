import React, { useState,useEffect,useRef, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QRCode from "qrcode.react";
import ReactToPrint from "react-to-print";
import SchemaIcon from '@mui/icons-material/Schema';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import StairsIcon from '@mui/icons-material/Stairs';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import TokenIcon from '@mui/icons-material/Token';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AttractionsIcon from '@mui/icons-material/Attractions';
import SourceIcon from '@mui/icons-material/Source';
import StoreIcon from '@mui/icons-material/Store';
import QrCodeIcon from '@mui/icons-material/QrCode';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';  
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import { Tooltip, Button, Select } from "antd";
import dayjs from "dayjs";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ButtonGroup from "antd/lib/button/button-group";
import {updateProStatus,handleProductionQuality,updateProductionPauseStatus} from "../ProductionAction"
import {  PauseCircleFilled, PlayCircleFilledSharp } from "@mui/icons-material";
import { MultiAvatar } from "../../../Components/UI/Elements";
import { base_url2 } from "../../../Config/Auth";

const OnboardingProduction=lazy(()=>import("../Child/OnboardingProduction.js"));
const InpectProductionToggle=lazy(()=>import("./InpectProductionToggle.js"));
const AddProductionQualityModal=lazy(()=>import("../Child/AddProductionQualityModal.js"));
const MoveToggleProduction=lazy(()=>import("../Child/MoveToggleProduction.js"));

const { Option } = Select;

function ProductionTableView(props) {
    const [zone, setZone] = useState([]);
  const [rack, setRack] = useState([]);
  const componentRefs = useRef([]);

  
  const [particularDiscountData, setParticularDiscountData] = useState({});
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
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

    function handleParticularRowData(item) {
        setParticularDiscountData(item);
      }

      const handlePrint = () => {
        window.print();
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


      const handleSelectZoneFocus = () => {
        if (!touchedZone) {
          fetchZone();
          // fetchSector();
    
          setTouchedZone(true);
        }
      };


      useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            const itemsToTranslate = [
           "774" ,//  "Manufacture ID",//0
           "744", //   "Cell",//1
           "679", //   "Created",//2
           "1044", //   "Item",//3
            "14",//   "Category",//4
              "259",//5
           "142", //   "Status",//6
           "141", //   "Workflow",//7
           "1050" ,//   "Stage",//8
            "1051",//   "Inspected",//8
           "1052", //   "Store",//8
            "1053",//   "To Quality",//8
            "1043",
            "1624"
              
            ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
          } catch (error) {
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);



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



      const handleZoneChange = (roomRackId) => {
        setSelectedZone(roomRackId);
        fetchRack(roomRackId);
      };


      const handleRackChange=(value)=>{
        setSelectedRack(value);
      }

    return (
        <>
            <div className=' flex  sticky  z-auto'>
                <div class="rounded m-1   p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex justify-between w-[100%]  font-poppins !text-lm p-1 bg-transparent font-bold sticky  z-10">
                        <div className=""></div>
                        <div className=" max-md:w-[9.5rem] w-[9.5rem] text-[#00A2E8] text-sm truncate "> 
                            {/* MFG ID */}
                            <PrecisionManufacturingIcon className="!text-icon  "/> {translatedMenuItems[0]}
                            </div>
                        <div className=" max-md:w-[5.01rem] w-[5.01rem]">
                            {/* Cell */}
                            <TokenIcon className="!text-icon  text-[#1E213D]"/> {translatedMenuItems[1]}
                            </div>
                        <div className=" max-md:w-[13rem] w-[13rem]">
                            {/* Created */}
                            <DateRangeIcon className="!text-icon  text-[#006600]"/>{translatedMenuItems[2]}
                            </div>
                        <div className="max-md:w-[2rem] w-[2rem]"></div>
                        <div className=" md:w-[5.3rem]">
                            {/* Item */}
                            <AddShoppingCartIcon className="!text-icon  text-[#D64045]"/>{translatedMenuItems[3]}
                            </div>
                        <div className="max-md:w-[8.4rem] w-[8.4rem]">
                            {/* Category */}
                            <WidgetsIcon className="!text-icon  text-[#4B2206]"/> {translatedMenuItems[4]}
                            </div>
                        <div className="max-md:w-[8.5rem] w-[8.5rem]">
                            {/* Attribute */}
                            <AttractionsIcon className="!text-icon  text-[teal]"/>{translatedMenuItems[5]}
                            </div>
                            <div className=" max-md:w-[5.51rem] w-[5.51rem] ">
                          
                            </div>
                        <div className=" max-md:w-[5.51rem] w-[5.51rem] ">
                            {/* Status */}
                            <SourceIcon className="!text-icon  text-[#4b5043]"/>  {translatedMenuItems[6]}
                            </div>
   
 
                        
                    </div>
                    
                 {/* {productionByLocsId.length ?
                            <> */}
                                {props.productionTableData.map((item, index) => {
                                    return (
                            
                                        <div key={item.productId} >
                                            <div className="flex rounded justify-between mt-1 bg-white py-ygap items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                                <div class="flex">
                                                    <div className=" flex  h-8 border-l-2 border-green-500 bg-[#eef2f9]   items-center  md:w-[9.01rem] max-sm:flex-row w-full max-sm:justify-between  ">

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

                                                    <div class=" text-xs  ml-gap bg-[#eef2f9]  font-poppins flex items-center w-[5rem]">

                                                   {item.cellChamberName}
                                                           </div>

                                                    
                                                    <div className=" flex  h-8 ml-gap bg-[#eef2f9] items-center justify-center    md:w-[10.01rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" text-xs  font-poppins">
                                                            {/* {props.productionTableData.createdBy} */}
                                                            <MultiAvatar
                  primaryTitle={item.createdBy}
                  // imageId={item.ownerImageId}
                  // imageURL={item.imageURL}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                                                        </div>
                                                        <div class=" text-xs  font-poppins ml-1">
    {/* {props.productionTableData.createdBy} */}
    {`  ${dayjs(item.creationDate).format("DD-MM-YYYY")}`}
</div>

                                                    </div>

                                                    <div className=" flex h-8 ml-gap bg-[#eef2f9] items-center justify-center    md:w-[4.02rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins">

</div>

</div>
                                                    <div className=" flex  h-8 ml-gap bg-[#eef2f9] items-center justify-center     md:w-[6.04rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" text-xs  font-poppins">
                                                            {item.categoryName} {item.subCategoryName}
                                                        </div>

                                                    </div>

                                                </div>

                                                <div className=" flex  h-8 ml-gap bg-[#eef2f9] items-center justify-center    md:w-[8.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins">

                                                        {item.attributeName}  {item.subAttributeName} 
                                                    </div>
                                                </div>



                                                <div className=" flex  h-8 ml-gap bg-[#eef2f9] items-center justify-center    md:w-[8.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins">
                                                    {item.qualityCheckRejectInd === true && (
                                                    <Tooltip title="Quality">
                          <VerifiedUserIcon
                            className="!text-icon cursor-pointer text-[blue]"
                            onClick={() => {
                              props.handleProductionQuality(true);
                            handleParticularRowData(item);
                            }}
                          />
                        </Tooltip>
                                                    )}
                                                    </div>
                                                </div>
                                                

                                                <div className=" flex  h-8 ml-gap bg-[#eef2f9] items-center justify-center    md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs    font-poppins">
                                     
                                                        <ButtonGroup>
                                                            {item.type === "To Start" && (
                                                                <StatusIcon
                                                                    type="In Progress"
                                                                    //iconType="fa-hourglass-half"
                                                                    tooltip="In Progress"
                                                                    iconType={<HourglassTopIcon className="!text-icon text-orange-600 cursor-pointer"/>}
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
                                                                    iconType={<HourglassBottomIcon className="!text-icon text-orange-600 cursor-pointer"/>}
                                                                    tooltip="Complete"
                                                                    role={item.type}
                                                                    onClick={() => {
                                                                        props.updateProStatus({
                                                                            type: "Complete",
                                                                        }, item.productionProductId);
                                                                    }}
                                                                /> : null}
                                                        </ButtonGroup>
                                                        {item.type === "In Progress" && item.startInd === false &&

<PlayCircleFilledSharp className="!text-icon cursor-pointer "
    // class=" cursor-pointer"
    onClick={() => {
        let data = {
            // userId: item.userId,
            // phoneId: item.productionTableData.manufactureId,
            // pauseInd: false
            manufactureId:item.manufactureId,
            productionProductId:item.productionProductId,
            userId:props.userId,
            startInd:true,
            orgId:props.orgId,
        }
        props.updateProductionPauseStatus(data)
    }} />
}
{item.type === "In Progress" && item.startInd === true &&

<PauseCircleFilled
    className="!text-icon text-orange-600 cursor-pointer"
    onClick={() => {
        let data = {
            manufactureId:item.manufactureId,
            productionProductId:item.productionProductId,
            userId:props.userId,
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
                                                    </div>
                                                </div>
                                               
                                                <div className=" flex  h-8 ml-gap bg-[#eef2f9] items-center justify-center    w-[4.01rem] max-xl:w-[3.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        <Tooltip title="Print"
                                                       
                                                        >
                                                           
                                                            <ReactToPrint
                                                              trigger={() => <Button style={{cursor:"pointer", width:"-webkit-fill-available" }} onClick={handlePrint}>
                                                               Print 
                                                                <QrCodeIcon className="!text-icon"/></Button>}
                                                                content={() => componentRefs.current[index]}
                                                            />
                                                        </Tooltip>

                                                    </div>
                                                </div>

                                                <div style={{ display: "none", textAlign: "center" }}>

<div className=" flex flex-col mt-5 text-sm items-center"
    ref={(el) => (componentRefs.current[index] = el)}>
   
    <div   className=" text-5xl mt-8">
        <QRCode size={150} value={`production/${item.manufactureId}`} />
    </div>
    <div style={{ fontSize: "1.5rem" }}><span style={{ fontWeight: "bold" }}>Manufacture Id:</span> {item.manufactureId}</div>
</div>
</div>
                                               
                                            </div>
                                            
                                        </div>
                                        
                                    );
                                })}
                                    
                                    
                            
                           
                </div>
            </div>


            <div className=' flex  sticky z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex justify-between w-[100%]  p-1 bg-transparent sticky   font-poppins font-bold !text-lm max-xl:text-[0.65rem] max-lg:text-[0.45rem] z-10">                       
                        <div className=" md:w-[6.5rem] text-[#00A2E8] text-sm">
                            {/* Workflow */}
                            <SchemaIcon className="!text-icon text-[#00A2E8] "/>  {translatedMenuItems[7]}
                            </div>
                        <div className=" md:w-[5.06rem] w-[5.06rem]">
                            {/* Stage */}
                            <StairsIcon className="!text-icon  text-[#1E213D]"/> {translatedMenuItems[8]}
                            </div>
                        <div className="md:w-[5rem] w-[5rem]">
                            {/* Inspected */}
                            <InsertChartIcon className="!text-icon  text-[#006600]"/> {translatedMenuItems[9]}
                            </div>
                        <div className=" md:w-[6.07rem] w-[6.07rem]">
                            {/* Store */}
                            <StoreIcon className="!text-icon  text-[#4B2206]"/>  {translatedMenuItems[10]}
                            </div>
                        <div className="md:w-[2.08rem] w-[2.08rem]"></div>
                        <div className="md:w-[5.07rem] [5.07rem]">
                            {/* To Quality */}
                           <VerifiedUserIcon className="!text-icon  text-[#D64045]"/> {translatedMenuItems[11]}
                            </div>
                        
                    </div>

                  {props.productionTableData.map((item, index) => {
                                    return (
                    <div key={item.productId} >
                                           
                    <div className="flex rounded justify-between mt-1 bg-white  items-center py-ygap scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                                 <div className=" flex  h-8 border-l-2 border-green-500 bg-[#eef2f9]  items-center md:w-[13rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs    font-poppins" >
                                                        {/* {stage} */}
                                                        {item.workflowName}
                                                    </div>
                                                </div>
                                              

                                                <div className=" flex items-center md:w-[9.54rem] h-8 ml-gap bg-[#eef2f9]  justify-center    max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs    font-poppins">
                                                        {/* {stage} */}

                                                        {item.stage}
                                                    </div>
                                                </div>

                                                <div className=" flex  items-center md:w-[14.081rem] h-8 ml-gap bg-[#eef2f9]  justify-center    max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class="flex flex-row text-xs    font-poppins">
                                                        {/* {stage} */}
                                                        {item.type === "Complete" && (
                                                        <InpectProductionToggle item={item} />
                                                        )}
                                                            {item.inspectedInd ?
                                                                <MultiAvatar
                                                                    primaryTitle={item.inspectedUserName}
                                                                    imgWidth={"1.8rem"}
                                                                    imgHeight={"1.8rem"}
                                                                /> : null}
                                                    </div>
                                                </div>




                                                <div className=" flex  h-8 ml-gap bg-[#eef2f9] items-center justify-center    md:w-[21.023rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs    font-poppins" style={{display:"flex",marginLeft:"-13em"}} >
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



                                                <div className=" flex h-8 ml-gap bg-[#eef2f9] items-center justify-center    md:w-[5.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs    font-poppins">
                                                    <Suspense>
                                                        {selectedRack &&  
                                                        <MoveToggleProduction 
                                                        item={item} 
                                                        selectedZone={selectedZone}
                                                        selectedRack={selectedRack}

                                                        />
                                                        }</Suspense>
                                                    </div>
                                                </div>
                                               
                                               
                                               
                                               
                                            </div>          
                                        </div>
                                                 
                                    );
                                })}
                                      
                                    
                            
                           
                </div>
 
            </div>

<Suspense>
           <AddProductionQualityModal
           particularDiscountData={particularDiscountData}
           handleProductionQuality={props.handleProductionQuality}
           productionQualityModal={props.productionQualityModal}
           translateText={props.translateText}
                        selectedLanguage={props.selectedLanguage}
                        translatedMenuItems={translatedMenuItems}
           />
            <OnboardingProduction
            productionTableData={props.productionTableData}
            translateText={props.translateText}
                        selectedLanguage={props.selectedLanguage}
                        translatedMenuItems={translatedMenuItems}
            />
</Suspense>
       
        </>
    );
}


const mapStateToProps = ({ production, auth, inventory }) => ({
    token: auth.token,
    locationId: auth.userDetails.locationId,
    productionQualityModal:production.productionQualityModal,
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            updateProStatus,
            updateProductionPauseStatus,
            handleProductionQuality
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionTableView);