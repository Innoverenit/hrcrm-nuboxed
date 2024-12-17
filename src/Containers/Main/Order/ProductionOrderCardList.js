import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { Tooltip, } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import PaidIcon from '@mui/icons-material/Paid';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import "jspdf-autotable";
import {
    getProductionOrder,
    handleNotesModalInOrder,
  handlePaidModal
} from "../Order/OrderAction";
import { handleOrderDetailsModal } from "../Account/AccountAction";
import { base_url2 } from "../../../Config/Auth";
import axios from "axios";

const AddNotesOrderDrawer=lazy(()=>import("./AddNotesOrderDrawer"));
const AccountOrderDetailsModal = lazy(() => import("../Account/AccountDetailsTab/AccountOrderTab/AccountOrderDetailsModal"));
const NodataFoundPage=lazy(()=>import("../../../Helpers/ErrorBoundary/NodataFoundPage"));
const PaidButtonModal = lazy(() => import("../Account/AccountDetailsTab/AccountOrderTab/PaidButtonModal"));

function ProductionOrderCardList(props) {
  const [particularRowData, setParticularRowData] = useState({});
    const [page, setPage] = useState(0);
    const [show, setshow] = useState(false);
    const [orderId, setorderId] = useState("");
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          '660', // 0  Order#
          '679', // 1  Created(Name ANd Date)
          '142', // 2Status
          
         
 ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
    useEffect(() => {
      props.getProductionOrder(props.userId, page);
      setPage(page + 1);
    }, []);

    function handleSetParticularOrderData(item, data) {
      console.log(item);
      setParticularRowData(item);
    }
    function handleOrder(orderId) {
      setshow(true);
      setorderId(orderId);
    }
    const [hasMore, setHasMore] = useState(true);

    const handleLoadMore = () => {
        setPage(page + 1);
        props.getProductionOrder(props.currentUser ? props.currentUser : props.userId, page,
    
    
        );
      }

      const viewAnDownloadPdf= async (item) => {  
        try {
          const response = await axios.get(`${base_url2}/quotation/customer/pdf/${`order`}/${item.orderId}`, {
            responseType: 'blob',
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
          });
      
          const blob = response.data;
          const url = window.URL.createObjectURL(blob);
          const filename = 'custom-pdf-name.pdf';
      
          window.open(url, '_blank');
          const downloadLink = document.createElement('a');
          downloadLink.href = url;
          downloadLink.download = filename; 
          downloadLink.click(); 
        } catch (error) {
          console.error('Error fetching PDF:', error);
        }  
      
      }; 
  const {
    fetchingProductionOrder,
    productionOrder,
    fetchingCustomerPagination,
  
  } = props;
  console.log("ee");

//   if (fetchingProductionOrder) {
//     return <BundleLoader />;
//   }
console.log(page)
  return (
    <>
      <div className=' flex sticky z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex max-sm:hidden  w-[100%] font-poppins text-xs  justify-between p-1 bg-transparent font-bold sticky max-xl:text-[0.65rem] max-lg:text-[0.45rem]  z-10">
            <div className=" w-[8.7rem] max-md:w-[8.7rem]  max-xl:w-[8.7rem] max-lg:w-[9.31rem]">
              {/* Order */}
              {translatedMenuItems[0]}
            </div>
            <div className=" w-[1.5rem] max-md:w-[1.5rem]  max-xl:w-[4.5rem] max-lg:w-[3.32rem] ">
              {/* Created(Name & Date) */}
              {translatedMenuItems[1]}

            </div>
            <div className=" w-[34.1rem] max-md:w-[34.1rem]  max-xl:w-[4.1rem] max-lg:w-[3.33rem]">
           {/* Status */}
           {translatedMenuItems[2]}

            </div>
            <div className="w-[3.8rem] max-md:w-[3.8rem]"></div>

          </div>
          <InfiniteScroll
            dataLength={productionOrder.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={fetchingProductionOrder || fetchingCustomerPagination ? <div class="flex justify-center">Loading...</div> : null}
            height={"80vh"}
          >

            {!fetchingProductionOrder && productionOrder.length === 0 ? <NodataFoundPage /> : productionOrder.map((item, index) => {
              const currentdate = dayjs().format("DD/MM/YYYY");
              const date = dayjs(item.creationDate).format("DD/MM/YYYY");
             
              const diff = Math.abs(
                dayjs().diff(dayjs(item.lastRequirementOn), "days")
              );
              const dataLoc = ` Address : ${item.address && item.address.length && item.address[0].address1
                } 
           Street : ${item.address && item.address.length && item.address[0].street
                }   
          State : ${item.address && item.address.length && item.address[0].state}
         Country : ${(item.address && item.address.length && item.address[0].country) || ""
                } 
           PostalCode : ${item.address && item.address.length && item.address[0].postalCode
                } `;
              return (
                <div>
                  <div className="flex rounded justify-between max-sm:flex-col  bg-white mt-[0.5rem] h-8 max-sm:h-[9rem] items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"

                  >
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex w-[16rem] max-xl:w-[8rem] max-lg:w-[6rem]   max-sm:w-auto">
                        <div className="flex max-sm:w-auto">
                    
                          <div class="w-[4%] max-md:w-[4%"></div>

                          <div class="max-sm:w-full md:flex items-center">
                            <Tooltip>
                              <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                <div class="flex text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

                                <span
                              class="underline cursor-pointer text-[#1890ff] font-bold"
                              onClick={() => {
                                handleOrder(item.orderId);
                                handleSetParticularOrderData(item);
                                props.handleOrderDetailsModal(true);
                              }}

                            >{`${item.newOrderNo} `}

                              &nbsp;&nbsp;
                              {date === currentdate ? (
                                <span  className=" font-bold text-[tomato] text-[0.65rem]"
                                  style={{
                                    color: "tomato",
                                    fontWeight: "bold",
                                  }}
                                >
                                  New
                                </span>
                              ) : null}
                            </span>

                                  &nbsp;&nbsp;
                                  {date === currentdate ? (
                                    <div class="text-[0.65rem] mt-[0.4rem] text-[tomato] font-bold"
                                    >
                                      New
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                      <div className=" flex  items-center max-sm:w-auto  w-[18.24rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">


                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {` ${item.userName} ${dayjs(item.creationDate).format('DD/MM/YYYY')}`}
                        </div>

                      </div>
                      <div className=" flex  items-center max-sm:w-auto  w-[6.21rem] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">

                        {/* <div class=" text-sm  font-poppins max-sm:hidden"> Sector </div> */}
                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.status}
                        </div>

                      </div>
                    </div>
                  <div class=" flex">
                  <div class="w-6">
                  <PictureAsPdfIcon className="!text-icon text-[red] cursor-pointer" 
    onClick={()=> viewAnDownloadPdf(item)}
    />
          </div>          
                    <div className=" flex w-[2rem] md:w-[1rem] max-sm:flex-row  max-sm:justify-between  ">

                          {/* <div class=" text-sm  font-poppins max-sm:hidden"> Sector </div> */}
                          <div class=" text-xs  font-poppins">
                            <Tooltip title="Notes">
                              <NoteAltIcon
                                style={{ cursor: "pointer", color: "green", fontSize: "1rem" }}
                                onClick={() => {

                                  props.handleNotesModalInOrder(true);
                                  handleSetParticularOrderData(item);
                                }}
                              />

                            </Tooltip>
                          </div>


                        </div>


                        {/* <div className=" flex w-[2rem] md:w-[1rem] max-sm:flex-row  max-sm:justify-between  ">
                          <div class=" text-xs  font-poppins">
                            <Tooltip title="Status">
                              <EventRepeatIcon
                                style={{ cursor: "pointer", fontSize: "1rem", }}
                                onClick={() => {
                                  props.handleStatusOfOrder(true);
                                  handleSetParticularOrderData(item);
                                }}
                              />
                            </Tooltip>
                          </div>
                        


                        </div> */}
                        <div className=" flex w-[2rem] max-md:w-[2rem] max-sm:flex-row  max-sm:justify-between  ">
                          <div class=" text-xs  font-poppins">
                            <Tooltip title="Collection">
                              <PaidIcon className=" cursor-pointer !text-icon text-[#e5625e]"
                                
                                onClick={() => {
                                  props.handlePaidModal(true);
                                  handleSetParticularOrderData(item);
                                }}
                              // style={{ color: "blue" }}
                              />
                            </Tooltip>

                          </div>
                          {/* <div class=" text-sm  font-poppins max-sm:hidden"> Sector </div> */}


                        </div>
                        </div>
                  </div>
                </div>


              )
            })}
          </InfiniteScroll>
        </div>
      </div>
<Suspense>
      <AddNotesOrderDrawer
        particularRowData={particularRowData}
        addNotesInOrder={props.addNotesInOrder}
        handleNotesModalInOrder={props.handleNotesModalInOrder}
      />
       <PaidButtonModal
                    type={props.type}
                    addPaidButtonModal={props.addPaidButtonModal}
                    handlePaidModal={props.handlePaidModal}
                    particularRowData={particularRowData}
                />
                      <AccountOrderDetailsModal
        particularRowData={particularRowData}
        handleOrderDetailsModal={props.handleOrderDetailsModal}
        addOrderDetailsModal={props.addOrderDetailsModal} />
  </Suspense>
    </>
  );
}
// }
const mapStateToProps = ({
  auth,
  order,
  distributor,
  sector,
  opportunity,
  employee,
}) => ({
    productionOrder:order.productionOrder,
    userId: auth.userDetails.userId,
    fetchingProductionOrder:order.fetchingProductionOrder,
    allOrderList: order.allOrderList,
    addPaidButtonModal: order.addPaidButtonModal,
    addStatusOfOrder: order.addStatusOfOrder,
    addNotesInOrder: order.addNotesInOrder,
    fetchingOrderByIdError: order.fetchingOrderByIdError,
    fetchingOrderById: order.fetchingOrderById,
    userId: auth.userDetails.userId,
    addOrderDetailsModal: distributor.addOrderDetailsModal,
    orderShowById: order.orderShowById,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getProductionOrder,
        handleNotesModalInOrder,
        handlePaidModal,
        handleOrderDetailsModal
    
     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ProductionOrderCardList);

