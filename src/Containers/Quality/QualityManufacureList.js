import React,{useEffect,useState} from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from "react-intl";

import { Tooltip, Button, Popconfirm, Switch } from "antd";
import { bindActionCreators } from "redux";
import QualityManufactureToggle from "./QualityManufactureToggle"

import InfiniteScroll from "react-infinite-scroll-component";
import { getQualityManufactureData,getQualityManufactureUserData, emptyQualityManufactureData} from "../Main/Inventory/InventoryAction";
// import MoveToggleQuality from "../Quality/MoveToggleQuality"
import dayjs from "dayjs";
import { MultiAvatar } from '../../Components/UI/Elements';

export const QualityManufactureList = (props) => {
  const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
      props.emptyQualityManufactureData()
      props.getQualityManufactureUserData(props.currentManufacture.cellChamberLinkId)
      props.getQualityManufactureData(props.currentManufacture.productId, props.currentManufacture.manufactureId);
    //   setPage(page + 1);
  }, []);

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
      
    <div>
   
    {props.qualityManufactureUserData.map((item, index) => {
      return(
        <div>
          {item.userName}

          {item.cellName}
          </div>
      )

})} 
      
    </div>
    <div className='flex sticky z-auto'>
            <div className="rounded m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                <div className="flex w-[99%] p-1 bg-transparent font-bold sticky  z-10">
                    <div className=""></div>
                    <div className="md:w-[22.12rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
                    <div className="md:w-[22.12rem]"><FormattedMessage id="app.step" defaultMessage="Step" /></div>
                    {/* <div className="md:w-[15.5rem]"><FormattedMessage id="app.date" defaultMessage="Date" /></div>
                    <div className="md:w-[15.5rem]"><FormattedMessage id="app.status" defaultMessage="Status" /></div> */}
                    <div className=""></div>
                    {/* <div className="md:w-[15.5rem]"><FormattedMessage id="app.todispatch" defaultMessage="To Dispatch" /></div> */}
                
                </div>
                {/* <InfiniteScroll
                dataLength={props.productionQualityData.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingProductionQualityData ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
            height={"85vh"}
            endMessage={<div class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
          > */}
                {props.qualityManufactureData.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="flex rounded mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                <div className="flex font-medium flex-col md:w-[36.1rem] max-sm:w-full">
                                    <div 
                                    className="flex justify-between text-sm  font-semibold font-poppins"
                                   
                                    >
                                        {item.qualityName}
                                    </div>
                                </div>

                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                   {item.steps} 
                                    </div>
                                </div>


                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                  <QualityManufactureToggle
                                  item={item}
                                  currentManufacture={props.currentManufacture}
                                  />
                                    </div>
                                </div>



                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                      {item.updatedBy!=null&&
                                    <MultiAvatar
                                                                    primaryTitle={item.updatedBy}
                                                                    imgWidth={"1.8rem"}
                                                                    imgHeight={"1.8rem"}
                                                                />

                                      }
                                        {item.updatedBy!=null&&
                                        <>
                                      {`  ${dayjs(item.creationDate).format("DD-MM-YYYY")}`}
                                      </>
                                        }
                                    </div>
                                </div>



       

                               
                            </div>
                        </div>
                    );
                })} 
                {/* </InfiniteScroll> */}
            </div>
        </div>
        {/* <AddQualityManufactureDrawerModal
        handleQualityManufactureModal={props.handleQualityManufactureModal}
        addQualityManufactureDrawerModal={props.addQualityManufactureDrawerModal}
        /> */}
        </>
  )
}

// const mapStateToProps = (auth,inventory) => ({
//   locationId: auth.userDetails.locationId,
//   productionQualityData:inventory.productionQualityData,
// })
const mapStateToProps = ({ inventory, auth,production }) => ({
  locationId: auth.userDetails.locationId,
  qualityManufactureData:inventory.qualityManufactureData,
  qualityManufactureUserData:inventory.qualityManufactureUserData,
//   addQualityManufactureDrawerModal:inventory.addQualityManufactureDrawerModal,
//   fetchingProductionQualityData:inventory.fetchingProductionQualityData,
//    productionQualityData:inventory.productionQualityData,

});
const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
    getQualityManufactureData,
    emptyQualityManufactureData,
    getQualityManufactureUserData
    // getProductionQualityData,
    // handleQualityManufactureModal
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(QualityManufactureList)