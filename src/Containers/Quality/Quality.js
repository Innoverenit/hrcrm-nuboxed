// import React,{useEffect,useState} from 'react'
// import { connect } from 'react-redux'
// import { FormattedMessage } from "react-intl";
// import ButtonGroup from "antd/lib/button/button-group";
// import HourglassTopIcon from '@mui/icons-material/HourglassTop';  
//  import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
// import { Tooltip, Button, Popconfirm, Switch } from "antd";
// import { bindActionCreators } from "redux";
// import AddQualityManufactureDrawerModal from "../Quality/AddQualityManufactureDrawerModal"
// import InfiniteScroll from "react-infinite-scroll-component";
// import { getProductionQualityData,updateQualityStatus,handleQualityManufactureModal } from "../Main/Inventory/InventoryAction";
// import MoveToggleQuality from "../Quality/MoveToggleQuality"
// import dayjs from "dayjs";

// export const Quality = (props) => {
//   const [page, setPage] = useState(0);
//   const [currentManufacture,setCurrentManufacture] = useState("");
//     const [hasMore, setHasMore] = useState(true);
//     useEffect(() => {
//       props.getProductionQualityData(props.locationId, page);
//       setPage(page + 1);
//   }, []);



//   const handleSetCurrentManufacture=(item)=>{
//     setCurrentManufacture(item)
//   }

//   const handleLoadMore = () => {
//     const proPag = props.productionQualityData && props.productionQualityData.length && props.productionQualityData[0].pageCount
//     setTimeout(() => {
//         if (props.productionQualityData) {
//             if (page < proPag) {
//                 setPage(page + 1);
//                 props.getProductionQualityData(props.locationId, page);
//             }
//             if (page === proPag) {
//                 setHasMore(false)
//             }
//         }
//     }, 100);
// };
// function StatusIcon({ type, role, iconType, tooltip, size, status, id, onClick, productId, indStatus }) {

//   if (role === type) {
//       size = "30px";
//   } else {
//       size = "16px";
//   }
//   return (
//       <Tooltip title={tooltip}>
//           <Button
//               className="p-[6px] border-transparent"
//               ghost={role !== type}
//               style={{
//                   color: role === type ? "orange" : "grey",
//               }}
//               onClick={onClick}
//           >
//                {iconType}
//               {/* <i className={`fas ${iconType}`} style={{ fontSize: "22px" }}></i> */}
//           </Button>
//       </Tooltip>
//   );
// }
//   return (
//     <>
//     <div className='flex sticky z-auto'>
//             <div className="rounded m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
//                 <div className="flex w-[99%] p-1 bg-transparent font-bold sticky  z-10">
//                     <div className=""></div>
//                     <div className="md:w-[22.12rem]"><FormattedMessage id="app.manufactureid" defaultMessage="Manufacture ID" /></div>
//                     <div className="md:w-[22.12rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
//                     <div className="md:w-[15.5rem]"><FormattedMessage id="app.date" defaultMessage="Date" /></div>
//                     <div className="md:w-[15.5rem]"><FormattedMessage id="app.status" defaultMessage="Status" /></div>
//                     <div className=""></div>
//                     <div className="md:w-[15.5rem]"><FormattedMessage id="app.todispatch" defaultMessage="To Dispatch" /></div>
                
//                 </div>
//                 <InfiniteScroll
//                 dataLength={props.productionQualityData.length}
//             next={handleLoadMore}
//             hasMore={hasMore}
//             loader={props.fetchingProductionQualityData ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
//             height={"85vh"}
//             endMessage={<div class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
//           >
//                 {props.productionQualityData.map((item, index) => {
//                     return (
//                         <div key={index}>
//                             <div className="flex rounded mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
//                                 <div className="flex font-medium flex-col md:w-[36.1rem] max-sm:w-full">
//                                     <div 
//                                     className="flex justify-between text-sm  font-semibold font-poppins"
//                                     onClick={() => {
//                                         props.handleQualityManufactureModal(true);
//                                     handleSetCurrentManufacture(item);
//                                       }}
//                                     >
//                                         {item.manufactureId}
//                                     </div>
//                                 </div>

//                                 <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
//                                     <div className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
//                                    {item.categoryName} {item.subCategoryName} {item.attributeName} {item.subAttributeName}
//                                     </div>
//                                 </div>

//                                 <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
//                                     <div className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
//                                     {`  ${dayjs(item.creationDate).format("DD-MM-YYYY")}`}
//                                     </div>
//                                 </div>


//                                 <div className=" flex font-medium items-center md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
//                                                     <div class=" text-xs  font-semibold  font-poppins">
                                     
//                                                         <ButtonGroup>
//                                                         {item.qualityStatus === "To Start" ||item.qualityStatus===null&& (
//                                                                 <StatusIcon
//                                                                     type="In Progress"
//                                                                     tooltip="To Start"
//                                                                     role={item.qualityStatus}
//                                                                     iconType={<HourglassTopIcon className=' !text-icon text-orange-600'/>}
//                                                                     // onClick={() => {
//                                                                     //     props.updateProStatus({
//                                                                     //         type: "In Progress",
//                                                                     //     }, item.productionProductId);
//                                                                     // }}
//                                                                     onClick={() => {
//                                                                         props.updateQualityStatus(item.productionProductId,"In Progress")
                                                                       
                                                                       
//                                                                     }}
                                                                   
//                                                                 />
//                                                         )}
//                                                         {item.qualityStatus === "In Progress" ?
//                                                                 <StatusIcon
//                                                                     type="Complete"
//                                                                     role={item.qualityStatus}
                                                                    
//                                                                     iconType={<HourglassBottomIcon  className=' !text-icon text-orange-600'/>}
//                                                                     tooltip={item.qualityStatus}
//                                                                     //  onClick={() => {
//                                                                     //     props.updatePQualityStatus({
//                                                                     //         type: "In Progress",
//                                                                     //     }, 
//                                                                     //     item.productionProductId);
//                                                                     // }}
//                                                                     onClick={() => {
//                                                                         props.updateQualityStatus(item.productionProductId,"Complete")
                                                                       
                                                                       
//                                                                     }}
                                                                   
//                                                                 /> :null}
//                                                                  {item.qualityStatus === "Complete" ?
//                                                                 <StatusIcon
//                                                                     type="Complete"
//                                                                     role={item.qualityStatus}
                                                                    
//                                                                     iconType={<HourglassBottomIcon  className=' !text-icon text-blue-600'/>}
//                                                                     tooltip={item.qualityStatus}
//                                                                     //  onClick={() => {
//                                                                     //     props.updatePQualityStatus({
//                                                                     //         type: "In Progress",
//                                                                     //     }, 
//                                                                     //     item.productionProductId);
//                                                                     // }}
                                                                 
                                                                   
//                                                                 /> :null}
//                                                         </ButtonGroup>
                                                      



//                                                     </div>
//                                                 </div>

//                                 <div className=" flex font-medium items-center md:w-[5.01rem] max-sm:flex-row w-full max-sm:justify-between ">
//                                                     <div class=" text-xs  font-semibold  font-poppins">
//                                                     {item.qualityStatus === "Complete"&&
//                                                         <MoveToggleQuality 
//                                                         item={item} 
//                                                         // selectedZone={selectedZone}
//                                                         // selectedRack={selectedRack}
//                                                     className=' !text-icon'
//                                                         />
//                                                     }
                                                    
//                                                     </div>
//                                                 </div>

//                                 {/* <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
//                                     <div className="md:w-[15.5rem]">
//                                     <Popconfirm
//                             title="Do you want to change the state?"
//                             onConfirm={() => confirmToggle(index,item)}
//                             okText="Yes"
//                             cancelText="No"
//                         >
//                                         <Switch 
//                                             checked={switchStates[index]} 
//                                             // onChange={() => handleToggle(item,index)} 
//                                             checkedChildren="Yes"
//                                             unCheckedChildren="No"
//                                         />
//                                         </Popconfirm>
//                                     </div>
//                                 </div>
//                                 {item.usedInd===true&&(
//                                 <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
//                                     <div className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
//                                        <Button>Damage</Button>
//                                     </div>
//                                 </div>
//                                 )} */}
//                             </div>
//                         </div>
//                     );
//                 })}
//                 </InfiniteScroll>
//             </div>
//         </div>
//         <AddQualityManufactureDrawerModal
//         currentManufacture={currentManufacture}
//         handleQualityManufactureModal={props.handleQualityManufactureModal}
//         addQualityManufactureDrawerModal={props.addQualityManufactureDrawerModal}
//         />
//         </>
//   )
// }

// // const mapStateToProps = (auth,inventory) => ({
// //   locationId: auth.userDetails.locationId,
// //   productionQualityData:inventory.productionQualityData,
// // })
// const mapStateToProps = ({ inventory, auth,production }) => ({
//   locationId: auth.userDetails.locationId,
//   addQualityManufactureDrawerModal:inventory.addQualityManufactureDrawerModal,
//   fetchingProductionQualityData:inventory.fetchingProductionQualityData,
//    productionQualityData:inventory.productionQualityData,

// });
// const mapDispatchToProps = (dispatch) =>
// bindActionCreators(
//   {
//     getProductionQualityData,
//     handleQualityManufactureModal,
//     updateQualityStatus
//   },
//   dispatch
// );

// export default connect(mapStateToProps, mapDispatchToProps)(Quality)

import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setQualityViewType } from "./QulityAction";
import QaCardList from "../Main/Refurbish/QaCardList";
import QulityHeader from "./QulityHeader";
import QulityProductionTable from "./QulityProductionTable";
import { BundleLoader } from "../../Components/Placeholder";





class Quality extends Component {
  state = { currentData: "" };

  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  render() {
    console.log(this.props.viewType === "production")
    const { setQualityViewType, viewType } = this.props;
    return (
      <React.Fragment>
        <QulityHeader
          setQualityViewType={setQualityViewType}
          viewType={viewType}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />

        <Suspense fallback={<BundleLoader />}>
          {this.props.viewType === "production" ? (
            <QulityProductionTable />
          )
          :this.props.viewType === "repair" ? (
            <QaCardList />
          )
          :null}
        </Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ qulity, auth }) => ({
  viewType: qulity.viewType,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setQualityViewType,
    
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Quality);
