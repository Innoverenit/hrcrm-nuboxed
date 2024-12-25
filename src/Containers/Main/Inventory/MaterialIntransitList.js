import React, { useEffect, useState,lazy  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getMaterialReceiveData,
    handleMaterialReceived,
    handlegrnlistmodal,
    getRoomRackByLocId, getRackList
} from "./InventoryAction";
import dayjs from "dayjs";

import InfiniteScroll from "react-infinite-scroll-component";
import {  Select } from "antd";
import CategoryIcon from '@mui/icons-material/Category'

const EmptyPage = lazy(() =>import("../EmptyPage") );
const { Option } = Select;

const MaterialIntransitList = (props) => {
    useEffect(() => {
        props.getMaterialReceiveData(props.locationDetailsId);
    }, [])
    const [clickStore, setclickStore] = useState(false)
    const [selectedChamberId, setSelectedChamberId] = useState("");
    const [selectedRoomId, setSelectedRoomId] = useState("");


    const [row, setRow] = useState({})
    const handleRow = (item) => {
        setRow(item)
    }
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const handleLoadMore = () => {
        setPage(page + 1);
    };
  

    return (
        <>
            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex  w-[100%] font-poppins  text-xs !text-lm p-1 bg-transparent font-bold items-end sticky z-10">
                        <div className=""></div>
                        <div className="text-[#00A2E8] truncate text-sm w-[16.2rem] max-md:w-[15.5rem]">
                            Po ID
                            </div>
                        <div className="truncate w-[23.52rem] max-md:w-[23.52rem]">
                        <CategoryIcon className='!text-base  text-[#e4eb2f]'/> {props.translatedMenuItems[39]} </div>
                       

                        <div className=" w-[11.322rem]"></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.materialReceiveData.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingMaterialReceiveData ? <div class="text-center font-semibold text-xs">{props.translatedMenuItems[10]} ...</div> : null}
                        height={"73vh"}
                        style={{ scrollbarWidth:"thin"}}
                    >
                        {!props.fetchingMaterialReceiveData && props.materialReceiveData.length===  0 ? <EmptyPage/>: props.materialReceiveData.map((item) => {
                            const currentdate = dayjs().format("DD/MM/YYYY");
                            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                            return (
                                <div>
                                    <div className="flex rounded  mt-1 bg-white py-ygap items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                        <div class="flex">

                                            <div className=" flex  w-[16.1rem] h-8  border-l-2 border-green-500 bg-[#eef2f9] max-sm:w-full  ">
                                                <div class="flex ml-gap items-center text-xs font-bold  font-poppins cursor-pointer underline text-blue-600">
                                                    <div
                                                        onClick={() => {
                                                            handleRow(item);
                                                            props.handleMaterialReceived(true);
                                                        }}
                                                    >{item.newPoNumber}</div>
                                                    
                                                </div>
                                                {date === currentdate ? (
                                                        <div class="text-xs font-poppins font-bold text-[tomato] ml-1">
                                                          {props.translatedMenuItems[4]}  
                                                         
                                                        </div>
                                                    ) : null}
                                            </div>
                                        </div>
                                       
                                       
                                        <div className=" flex items-center justify-start h-8 ml-gap bg-[#eef2f9]  w-[21.22rem] max-sm:flex-row  max-sm:justify-between  ">

                                            <div class=" text-xs  items-center ml-gap font-poppins">
                                                {item.supplierName}
                                            </div>
                                        </div>
                                      
                                        <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[46rem] max-sm:flex-row w-full max-sm:justify-between ">
                                          
                                        </div>
                                       
                                    </div>

                                </div>
                            );
                        })}
                    </InfiniteScroll>
                </div>
            </div>
          
        </>
    );
}


const mapStateToProps = ({ inventory, auth,suppliers }) => ({
    userId: auth.userDetails.userId,
    locationId: auth.userDetails.locationId,
    orgId: auth.userDetails.organizationId,
    addTermsnCondition: suppliers.addTermsnCondition,
    materialReceiveData: inventory.materialReceiveData,
    addMaterialReceived: inventory.addMaterialReceived,
    showGrnListOfPo: inventory.showGrnListOfPo,
    fetchingMaterialReceiveData: inventory.fetchingMaterialReceiveData,
    roomRackbyLoc: inventory.roomRackbyLoc,
    rackList: inventory.rackList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getMaterialReceiveData,
            handleMaterialReceived,
            handlegrnlistmodal,
            getRackList,
            getRoomRackByLocId,
            //handleTermsnConditionModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(MaterialIntransitList)

