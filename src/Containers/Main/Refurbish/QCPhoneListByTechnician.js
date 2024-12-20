import React, { useState,useEffect, lazy } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNoOfPhoneInQCById } from "./RefurbishAction";
import InfiniteScroll from 'react-infinite-scroll-component';
const QRCodeModal = lazy(() => import('../../../Components/UI/Elements/QRCodeModal'));

const QCPhoneListByTechnician = (props) => {
    const [pageNo, setPageNo] = useState(0);
    useEffect(() => {
        setPageNo(pageNo + 1);
        props.getNoOfPhoneInQCById(props.orderPhoneId, props.row.technicianId,pageNo)
    }, [])
    const [hasMore, setHasMore] = useState(true);
    const handleLoadMore = () => {
        const callPageMapd = props.phoneByTechId && props.phoneByTechId.length &&props.phoneByTechId[0].pageCount
        setTimeout(() => {
          const {
            getNoOfPhoneInQCById,
           // userDetails: { employeeId },
          } = props;
          if  (props.phoneByTechId)
          {
            if (pageNo < callPageMapd) {
                setPageNo(pageNo + 1);
                getNoOfPhoneInQCById(props.orderPhoneId, props.row.technicianId,pageNo); 
          }
          if (pageNo === callPageMapd){
            setHasMore(false)
          }
        }
        }, 100);
      };
    return (
        <>
            <div className=' flex sticky z-10 h-60'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex  w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
                        <div className=" md:w-[8.1rem]">OEM</div>
                        <div className=" md:w-[8.1rem]">Model</div>
                        <div className=" md:w-[7.8rem] ">IMEI</div>
                        <div className="md:w-[5rem]">OS </div>
                        <div className="md:w-[4.8rem]">GB</div>
                        <div className="md:w-[7.7rem]">Color</div>
                        <div className="md:w-[5.9rem]">Condition</div>
                        <div className="md:w-[7.2rem]"></div>
                    </div>
                    <InfiniteScroll
                            dataLength={props.phoneByTechId.length}
                             next={handleLoadMore}
                             hasMore={hasMore}
                            loader={props.fetchingNoOfPhoneInQcById ? <div style={{ textAlign: 'center',scrollbarWidth:"thin" }}>Loading...</div> : null}
                            height={"65vh"}
                            endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
                        >
                    {props.phoneByTechId.map((item) => {
                        return (
                            <div>
                                <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 " >
                                    <div class="flex">
                                        <div className=" flex md:w-[7.6rem] max-sm:w-full  ">
                                            {item.company}
                                        </div>

                                        <div className=" flex  md:w-[5.7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.model}
                                            </div>

                                        </div>
                                        <div className=" flex md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between ">



                                            <div class=" text-sm  font-poppins">

                                                {item.imei}
                                            </div>
                                        </div>
                                    </div>

                                    <div className=" flex md:w-[5.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins text-center">

                                            {item.os}


                                        </div>
                                    </div>

                                    <div className=" flex md:w-[5.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins text-center">
                                            {item.gb}
                                        </div>
                                    </div>
                                    <div className=" flex md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins text-center">
                                            {item.color}
                                        </div>
                                    </div>
                                    <div className=" flex md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins text-center">
                                            {item.conditions}
                                        </div>
                                    </div>
                                    <div className=" flex md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins text-center">
                                            <div>
                                                {item.qrCodeId ? (
                                                    <QRCodeModal
                                                        qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
                                                        imgHeight={"1.8rem"}
                                                        imgWidth={"1.8rem"}
                                                        imgRadius={20}
                                                    />
                                                ) : (
                                                    <span class="text-[0.6em] font-bold">
                                                        No QR
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        )
                    })}
                    </InfiniteScroll>
                </div>

            </div>
        </>
    )
}


const mapStateToProps = ({ auth, refurbish }) => ({
    phoneByTechId: refurbish.phoneByTechId,
    fetchingNoOfPhoneInQcById: refurbish.fetchingNoOfPhoneInQcById
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getNoOfPhoneInQCById
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QCPhoneListByTechnician);

