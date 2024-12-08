
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BundleLoader } from '../../../../../../Components/Placeholder';
import { getPhonelistByOrderId } from "../../../InventoryAction"
import InfiniteScroll from 'react-infinite-scroll-component';
import AddBoxIcon from '@mui/icons-material/AddBox';

const ReceivedMismatchPhoneList = (props) => {
    useEffect(() => {
        props.getPhonelistByOrderId(props.rowData.orderPhoneId)
    }, [props.rowData.orderPhoneId])

    const [show, setShow] = useState(false);
    const handleMismatchItem = () => {
        setShow(!show)
    };

    const [particularRowData, setParticularRowData] = useState({});
    function handleSetParticularOrderData(item) {
        setParticularRowData(item);
    }
    return (
        <>
            {props.fetchingPhoneListById ?
                <BundleLoader /> :
                <div className='flex justify-end sticky ticky top-0 z-10 '>
                    <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                        <div className=" flex  w-[95%] p-2 bg-transparent font-bold sticky top-0 z-10">
                            <div className=" md:w-[2rem]"></div>
                            <div className=" md:w-[8.1rem]">OEM</div>
                            <div className=" md:w-[8.1rem]">model</div>
                            <div className=" md:w-[7.8rem] ">imei
                            </div>
                            <div className="md:w-[4.6rem]">os
                           </div>
                            <div className="md:w-[5.8rem]">GB</div>
                            <div className="md:w-[7.7rem]">Color</div>
                            <div className="md:w-[5.9rem]">conditions
                          </div>

                        </div>
                        <div class="overflow-y-auto h-[65vh]">
                            <InfiniteScroll
                                dataLength={props.phoneListById.length}
                                height={"65vh"}
                            >
                                {props.phoneListById.filter((opt) => opt.mismatchInd === true).
                                    map((item) => {
                                        return (
                                            <div>
                                                <div className="flex rounded-xl  mt-4 bg-white h-12 items-center p-3 " >
                                                    <div class="flex">
                                                        <div className=" flex font-medium   md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                            <div class=" text-xs  font-poppins">
                                                                 <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]" onClick={() => {
                                                                    handleMismatchItem();
                                                                    handleSetParticularOrderData(item);
                                                                }
                                                                } />
                                                            </div>
                                                        </div>
                                                        <div className=" flex font-medium  md:w-[7.6rem] max-sm:w-full  ">
                                                            {item.company}
                                                        </div>

                                                        <div className=" flex font-medium   md:w-[5.7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                            <div class=" text-xs  font-poppins">
                                                                {item.model}
                                                            </div>

                                                        </div>
                                                        <div className=" flex font-medium  md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                            <div class=" text-sm  font-poppins">

                                                                {item.imei}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className=" flex font-medium  md:w-[4.52rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs  font-poppins text-center">
                                                            {item.os}
                                                        </div>
                                                    </div>

                                                    <div className=" flex font-medium  md:w-[6.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs  font-poppins text-center">
                                                            {item.gb}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs  font-poppins text-center">
                                                            {item.color}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs  font-poppins text-center">
                                                            {item.conditions}
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* 2nd part */}
                                                {(show && particularRowData.phoneId === item.phoneId) &&
                                                    <div className="flex rounded-xl  mt-4 bg-slate-200 h-8 items-center p-3 " >
                                                        <div class="flex">
                                                            <div className=" flex font-medium  md:w-[7.6rem] max-sm:w-full text-red-500  ">
                                                                {item.receiveCompany}
                                                            </div>

                                                            <div className=" flex font-medium   md:w-[5.7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins text-red-500">
                                                                    {item.receiveModel}
                                                                </div>

                                                            </div>
                                                            <div className=" flex font-medium  md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                                <div class=" text-sm  font-poppins text-red-500">

                                                                    {item.receiveIMEI}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className=" flex font-medium  md:w-[4.52rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                            <div class=" text-xs  font-poppins text-center text-red-500">

                                                                {item.receiveOS}
                                                            </div>
                                                        </div>

                                                        <div className=" flex font-medium  md:w-[6.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                            <div class=" text-xs  font-poppins text-center text-red-500">
                                                                {item.receiveGB}
                                                            </div>
                                                        </div>
                                                        <div className=" flex font-medium  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                            <div class=" text-xs  font-poppins text-center text-red-500">
                                                                {item.receiveColor}
                                                            </div>
                                                        </div>
                                                        <div className=" flex font-medium  md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                            <div class=" text-xs  font-poppins text-center text-red-500">
                                                                {item.receiveCondition}
                                                            </div>
                                                        </div>
                                                    </div>}
                                            </div>
                                        )
                                    })}
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
const mapStateToProps = ({ inventory }) => ({
    phoneListById: inventory.phoneListById,
    fetchingPhoneListById: inventory.fetchingPhoneListById,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPhonelistByOrderId,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ReceivedMismatchPhoneList);

