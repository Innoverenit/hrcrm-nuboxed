import React,{useEffect,useState} from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from "react-intl";
import ButtonGroup from "antd/lib/button/button-group";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';  
 import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import { Tooltip, Button, Popconfirm, Switch, Select } from "antd";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getProductionQualityData } from "../Main/Inventory/InventoryAction";
import MoveToggleQuality from "../Quality/MoveToggleQuality"
import moment from "moment";

export const Quality = (props) => {
  const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
      props.getProductionQualityData(props.locationId, page);
      setPage(page + 1);
  }, []);

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
    <div className='flex justify-end sticky z-auto'>
            <div className="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                <div className="flex w-[95%] px-2 bg-transparent font-bold sticky top-0 z-10">
                    <div className=""></div>
                    <div className="md:w-[22.12rem]"><FormattedMessage id="app.manufactureid" defaultMessage="Manufacture ID" /></div>
                    <div className="md:w-[22.12rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
                    <div className="md:w-[15.5rem]"><FormattedMessage id="app.date" defaultMessage="Date" /></div>
                    <div className="md:w-[15.5rem]"><FormattedMessage id="app.status" defaultMessage="Status" /></div>
                    <div className=""></div>
                    <div className="md:w-[15.5rem]"><FormattedMessage id="app.todispatch" defaultMessage="To Dispatch" /></div>
                
                </div>
                <InfiniteScroll
                dataLength={props.productionQualityData.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingProductionQualityData ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
            height={"79vh"}
            endMessage={<div class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
          >
                {props.productionQualityData.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="flex rounded-xl mt-2 bg-white h-12 items-center p-3">
                                <div className="flex font-medium flex-col md:w-[36.1rem] max-sm:w-full">
                                    <div className="flex justify-between text-sm  font-semibold font-poppins">
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
                                    {`  ${moment.utc(item.creationDate).format("DD-MM-YYYY")}`}
                                    </div>
                                </div>


                                <div className=" flex font-medium items-center md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-semibold  font-poppins">
                                     
                                                        <ButtonGroup>
                                                          
                                                                <StatusIcon
                                                                    type="In Progress"
                                                                    //iconType="fa-hourglass-half"
                                                                    tooltip="In Progress"
                                                                    iconType={<HourglassTopIcon/>}
                                                                    // role={item.type}
                                                                    // onClick={() => {
                                                                    //     props.updateProStatus({
                                                                    //         type: "In Progress",
                                                                    //     }, item.productionProductId);
                                                                    // }}
                                                                />
                                                               

                                                         
                                                                <StatusIcon
                                                                    type="Complete"
                                                                    //iconType="fa-hourglass"
                                                                    iconType={<HourglassBottomIcon/>}
                                                                    tooltip="Complete"
                                                                    // role={item.type}
                                                                    // onClick={() => {
                                                                    //     props.updateProStatus({
                                                                    //         type: "Complete",
                                                                    //     }, item.productionProductId);
                                                                    // }}
                                                                /> 
                                                        </ButtonGroup>
                                                      



                                                    </div>
                                                </div>

                                <div className=" flex font-medium items-center md:w-[5.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-semibold  font-poppins">
                                                       
                                                        <MoveToggleQuality 
                                                        item={item} 
                                                        // selectedZone={selectedZone}
                                                        // selectedRack={selectedRack}

                                                        />
                                                    
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
  )
}

// const mapStateToProps = (auth,inventory) => ({
//   locationId: auth.userDetails.locationId,
//   productionQualityData:inventory.productionQualityData,
// })
const mapStateToProps = ({ inventory, auth,production }) => ({
  locationId: auth.userDetails.locationId,
  fetchingProductionQualityData:inventory.fetchingProductionQualityData,
   productionQualityData:inventory.productionQualityData,

});
const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
    getProductionQualityData
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Quality)