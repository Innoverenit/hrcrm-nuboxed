import React, {  useEffect, useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import {
  getAllProcure,
  emptyProcre,
  handleProcureOrderModal
} from "../Procre/ProcreAction";
import dayjs from "dayjs";
import { MultiAvatar } from "../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
import ProcureOrderModal from "./Child/ProcureOrderModal";

function ProcreCardList(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    props.getAllProcure(props.orgId, page);
    setPage(page + 1);
  }, []);

  const [particularRowData, setParticularRowData] = useState({});

  function handleSetParticularOrderData(item) {
    setParticularRowData(item);
}
  useEffect(() => {
    return () => props.emptyProcre();
  }, []);

  const handleLoadMore = () => {
    setPage(page + 1);
    props.getAllProcure(props.currentUser ? props.currentUser : props.orgId, page,
    );
  }
// if (props.fetchingAllProcure) {
//     return <BundleLoader />;
//   }
  return (
    <>
    <div class="rounded-lg m-1 max-sm:m-1 p-1 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
        <div className=" flex justify-between w-full p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[0.5rem]"></div>
                        <div className=" md:w-[5.4rem]"><FormattedMessage id="app.item" defaultMessage="Item"/></div>
                         <div className=" md:w-[5.4rem]"><FormattedMessage id="app.priceunit" defaultMessage="Price/Unit"/></div>
                         <div className=" md:w-[5.4rem]"><FormattedMessage id="app.units" defaultMessage="Units"/></div>
                        <div className=" md:w-[5.4rem]"><FormattedMessage id="app.procreid#" defaultMessage="Procure ID"/></div>
                        <div className=" md:w-[7.1rem]"><FormattedMessage id="app.delivery" defaultMessage="Delivery"/></div>
                        <div className=" md:w-[8.1rem]"><FormattedMessage id="app.location" defaultMessage="Location"/></div>
                        <div className=" md:w-[7.8rem] "><FormattedMessage id="app.owner" defaultMessage="Owner"/></div>
                        <div className=" md:w-[5.4rem]"><FormattedMessage id="app.tradeid" defaultMessage="Trade ID"/></div>
                        <div className=" md:w-[5.4rem]"><FormattedMessage id="app.priceunit" defaultMessage="Price/Unit "/></div>
                        <div className=" md:w-[5.4rem]"><FormattedMessage id="app.unit" defaultMessage="Unit "/></div>
                        <div className=" md:w-[5.8rem]"><FormattedMessage id="app.Submittedby" defaultMessage="Submitted By"/></div>
                        

                        <div className="md:w-[3.12rem]"></div>
        </div>
        <InfiniteScroll
            hasMore={hasMore}
          dataLength={props.allProcure.length}
          next={handleLoadMore}
          loader={props.fetchingAllProcure?<div class="flex justify-center" >Loading...</div>:null}
          height={"75vh"}
        >
          {props.allProcure.map((item) => {
            const currentDate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
            const diff = Math.abs(
              dayjs().diff(dayjs(item.lastRequirementOn), "days")
            );
            const dataLoc = ` Address : ${item.address && item.address.length && item.address[0].address1
              } 
                   Street : ${item.address && item.address.length && item.address[0].street
              }   
                  State : ${item.address && item.address.length && item.address[0].state
              }
                 Country : ${(item.address &&
                item.address.length &&
                item.address[0].country) ||
              ""
              } 
                   PostalCode : ${item.address &&
              item.address.length &&
              item.address[0].postalCode
              } `;
            return (
              <div>
              <div className="flex rounded  mt-1 bg-white h-8 items-center p-1">
                  <div class="flex">
                  <div className=" flex font-medium flex-col w-wk items-center   max-sm:w-full">
                  <div className="flex items-center max-sm:w-full">
                      <div className=" flex font-medium items-center  md:w-[6.56rem] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full ">
                                                                <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">

                                                                    {item.priority === "High" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[red]"></div>
                                                                    )}
                                                                    {item.priority === "Medium" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[orange]"></div>)}
                                                                    {item.priority === "Low" && (
                                                                        <div class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[teal]"></div>)}
                                                                </div>
                                                            </div>
                                                        </Tooltip>
                                                    </div>

                        <div class="max-sm:w-full  items-center md:w-[10.02rem]">
                          <Tooltip>
                          <div class="max-sm:w-full  justify-between flex md: flex flex-row text-sm">                      
                                <span
                                                                    class="underline cursor-pointer text-[#1890ff]"
                                                                    onClick={() => {
                                                                        handleSetParticularOrderData(item);
                                                                        props.handleProcureOrderModal(true);
                                                                    }}
                                                                >{item.newOrderNo} 
                                                                </span>
                                                                <span> {currentDate === dayjs(item.creationDate).format("DD/MM/YYYY") ? (
                                                                  <span className="text-xs text-[tomato] font-bold">
                                                                    New
                                                                  </span>
                                                                ) : null} </span>
                            
                            
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row items-center md:w-[22rem] max-sm:flex-row w-full max-sm:justify-between">
                  
                      
                  <div class="max-sm:w-full justify-between flex md:flex-col text-sm">
                  {` ${dayjs(item.deliveryDate).format("ll")}`}
                        </div>

               
                </div>
                  </div>
                  <div class="flex">
                    <div className=" flex font-medium flex-col  md:w-[23.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <h4 class="text-cardBody font-poppins text-sm">

                      {`${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].city) || ""}, ${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].country) || ""}
         
        `}
                      </h4>
                    </div>
                  </div>
                  <div class="flex flex-row items-center md:w-[20.03rem] max-sm:flex-row w-full max-sm:justify-between">
                    <div>
                      <MultiAvatar
                        primaryTitle={item.userName}
                        imageURL={item.imageURL}
                        imgWidth={"1.8rem"}
                        imgHeight={"1.8rem"}
                      />
                    </div>
                  </div>
                 

                </div>
              </div>
              // </div>
            );
          })}
        </InfiniteScroll>
      </div>

      <ProcureOrderModal
                particularRowData={particularRowData}
                handleProcureOrderModal={props.handleProcureOrderModal}
                addProcureOrderModal={props.addProcureOrderModal} />
    </>
  );



}

const mapStateToProps = ({ shipper,procre,auth }) => ({
  allProcure: procre.allProcure,
  fetchingAllProcure: procre.fetchingAllProcure,
  updateEventModal: shipper.updateEventModal,
  updateCallModal: shipper.updateCallModal,
  updateTaskModal: shipper.updateTaskModal,
  orgId: auth.userDetails.organizationId,
  addProcureOrderModal:procre.addProcureOrderModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(

    {
getAllProcure,
emptyProcre,
handleProcureOrderModal
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProcreCardList);
