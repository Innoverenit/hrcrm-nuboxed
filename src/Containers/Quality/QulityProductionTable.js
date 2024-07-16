import React,{useEffect,useState} from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from "react-intl";
import ButtonGroup from "antd/lib/button/button-group";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';  
 import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import { Tooltip, Button, Popconfirm, Select,Switch } from "antd";
import { bindActionCreators } from "redux";
import AddQualityManufactureDrawerModal from "../Quality/AddQualityManufactureDrawerModal"
import InfiniteScroll from "react-infinite-scroll-component";
import { getProductionQualityData,updateQualityStatus,handleQualityManufactureModal } from "../Main/Inventory/InventoryAction";
import MoveToggleQuality from "../Quality/MoveToggleQuality"
import dayjs from "dayjs";
import { base_url2 } from "../../Config/Auth";



const { Option } = Select;

export const QulityProductionTable = (props) => {
  const [page, setPage] = useState(0);
  const [zone, setZone] = useState([]);
  const [rack, setRack] = useState([]);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [isLoadingZone, setIsLoadingZone] = useState(false);
  const [isLoadingRack, setIsLoadingRack] = useState(false);
  const [selectedRack, setSelectedRack] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [touchedZone, setTouchedZone] = useState(false);
  const [currentManufacture,setCurrentManufacture] = useState("");
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
      props.getProductionQualityData(props.locationId, page);
      setPage(page + 1);
  }, []);





  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
         "Manufacture ID",//0
          "Name",//1
          "Date",//2
          "Status",//3
          "To Dispatch",//5
          "Assignedto",//6
          "Manufacture",//7
          "Step",//8
          
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);



  const handleSetCurrentManufacture=(item)=>{
    setCurrentManufacture(item)
  }

  const handleLoadMore = () => {
    const proPag = props.productionQualityData && props.productionQualityData.length && props.productionQualityData[0].pageCount
    setTimeout(() => {
        if (props.productionQualityData) {
            if (page < proPag) {
                setPage(page + 1);
                props.getProductionQualityData(props.locationId, page);
            }
            if (page === proPag) {
                setHasMore(false)
            }
        }
    }, 100);
};


const fetchZone = async () => {
    setIsLoadingZone(true);
    try {
      // const response = await axios.get('https://develop.tekorero.com/employeePortal/api/v1/customer/user/${props.userId}');
      // setCustomers(response.data);
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



  const fetchRack = async (roomRackId) => {
    setIsLoadingRack(true);
    try {
      // const response = await axios.get(`https://develop.tekorero.com/employeePortal/api/v1/customer/contact/drop/${customerId}`);
      // setContacts(response.data);
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
  return (
    <>
    <div className='flex sticky z-auto'>
            <div className="rounded m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                <div className="flex w-[99%] p-1 bg-transparent font-bold sticky  z-10">
                    <div className=""></div>
                    <div className="md:w-[22.12rem]">
                    {translatedMenuItems[0]}
                      {/* <FormattedMessage id="app.manufactureid" defaultMessage="Manufacture ID" /> */}
                      </div>
                    <div className="md:w-[22.12rem]">
                    {translatedMenuItems[1]}
                      {/* <FormattedMessage id="app.name" defaultMessage="Name" /> */}
                      </div>
                    <div className="md:w-[15.5rem]">
                    {translatedMenuItems[2]}
                      {/* <FormattedMessage id="app.date" defaultMessage="Date" /> */}
                      </div>
                    <div className="md:w-[15.5rem]">
                    {translatedMenuItems[3]}
                      {/* <FormattedMessage id="app.status" defaultMessage="Status" /> */}
                      </div>
                    <div className=""></div>
                    <div className="md:w-[15.5rem]">
                    {translatedMenuItems[4]}
                      {/* <FormattedMessage id="app.todispatch" defaultMessage="To Dispatch" /> */}
                      </div>
                
                </div>
                <InfiniteScroll
                dataLength={props.productionQualityData.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingProductionQualityData ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
            height={"85vh"}
            endMessage={<div class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
          >
                {props.productionQualityData.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="flex rounded mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                <div className="flex font-medium flex-col md:w-[36.1rem] max-sm:w-full ">
                                    <div 
                                    className="flex justify-between text-sm text-[#1890ff] underline font-semibold font-poppins"
                                    onClick={() => {
                                        props.handleQualityManufactureModal(true);
                                    handleSetCurrentManufacture(item);
                                      }}
                                    >
                                        {item.manufactureId}
                                    </div>
                                </div>

                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                   {item.categoryName} {item.subCategoryName} {item.attributeName} {item.subAttributeName}
                                    </div>
                                </div>

                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                    {`  ${dayjs(item.creationDate).format("DD-MM-YYYY")}`}
                                    </div>
                                </div>


                                <div className=" flex font-medium items-center md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-semibold  font-poppins">
                                     
                                                        <ButtonGroup>
                                                        {(item.qualityStatus === "To Start" || item.qualityStatus === null) && (
    <StatusIcon
        type="In Progress"
        tooltip="To Start"
        role={item.qualityStatus}
        iconType={<HourglassTopIcon className=' !text-icon text-orange-600'/>}
        // onClick={() => {
        //     props.updateProStatus({
        //         type: "In Progress",
        //     }, item.productionProductId);
        // }}
        onClick={() => {
            props.updateQualityStatus(item.productionProductId, "In Progress")
        }}
    />
)}
                                                        {item.qualityStatus === "In Progress" ?
                                                                <StatusIcon
                                                                    type="Complete"
                                                                    role={item.qualityStatus}
                                                                    
                                                                    iconType={<HourglassBottomIcon  className=' !text-icon text-orange-600'/>}
                                                                    tooltip={item.qualityStatus}
                                                                    //  onClick={() => {
                                                                    //     props.updatePQualityStatus({
                                                                    //         type: "In Progress",
                                                                    //     }, 
                                                                    //     item.productionProductId);
                                                                    // }}
                                                                    onClick={() => {
                                                                        props.updateQualityStatus(item.productionProductId,"Complete")
                                                                       
                                                                       
                                                                    }}
                                                                   
                                                                /> :null}
                                                                 {item.qualityStatus === "Complete" ?
                                                                <StatusIcon
                                                                    type="Complete"
                                                                    role={item.qualityStatus}
                                                                    
                                                                    iconType={<HourglassBottomIcon  className=' !text-icon text-blue-600'/>}
                                                                    tooltip={item.qualityStatus}
                                                                    //  onClick={() => {
                                                                    //     props.updatePQualityStatus({
                                                                    //         type: "In Progress",
                                                                    //     }, 
                                                                    //     item.productionProductId);
                                                                    // }}
                                                                 
                                                                   
                                                                /> :null}
                                                        </ButtonGroup>
                                                      



                                                    </div>
                                                </div>

                                                <div className=" flex font-medium  items-center md:w-[7.023rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-semibold  font-poppins" style={{display:"flex",marginLeft:"-13em"}} >
                                                         {item.qualityStatus === "Complete"&&(
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
                                                    
{item.qualityStatus === "Complete"&&(
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
                                                    <div class=" text-xs  font-semibold  font-poppins">
                                                    {item.qualityStatus === "Complete"&&
                                                        <MoveToggleQuality 
                                                        selectedZone={selectedZone}
                                                        selectedRack={selectedRack}
                                                        item={item} 
                                                        // selectedZone={selectedZone}
                                                        // selectedRack={selectedRack}
                                                    className=' !text-icon'
                                                        />
                                                    }
                                                    
                                                    </div>
                                                </div>

                                {/* <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="md:w-[15.5rem]">
                                    <Popconfirm
                            title="Do you want to change the state?"
                            onConfirm={() => confirmToggle(index,item)}
                            okText="Yes"
                            cancelText="No"
                        >
                                        <Switch 
                                            checked={switchStates[index]} 
                                            // onChange={() => handleToggle(item,index)} 
                                            checkedChildren="Yes"
                                            unCheckedChildren="No"
                                        />
                                        </Popconfirm>
                                    </div>
                                </div>
                                {item.usedInd===true&&(
                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                       <Button>Damage</Button>
                                    </div>
                                </div>
                                )} */}
                            </div>
                        </div>
                    );
                })}
                </InfiniteScroll>
            </div>
        </div>
        <AddQualityManufactureDrawerModal
        translatedMenuItems={translatedMenuItems}
        currentManufacture={currentManufacture}
        handleQualityManufactureModal={props.handleQualityManufactureModal}
        addQualityManufactureDrawerModal={props.addQualityManufactureDrawerModal}
        />
        </>
  )
}

// const mapStateToProps = (auth,inventory) => ({
//   locationId: auth.userDetails.locationId,
//   productionQualityData:inventory.productionQualityData,
// })
const mapStateToProps = ({ inventory, auth,production }) => ({
  locationId: auth.userDetails.locationId,
  token: auth.token,
  orgId: auth.userDetails.organizationId,
  addQualityManufactureDrawerModal:inventory.addQualityManufactureDrawerModal,
  fetchingProductionQualityData:inventory.fetchingProductionQualityData,
   productionQualityData:inventory.productionQualityData,

});
const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
    getProductionQualityData,
    handleQualityManufactureModal,
    updateQualityStatus
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(QulityProductionTable)
