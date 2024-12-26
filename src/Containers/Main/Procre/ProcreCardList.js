import React, {  useEffect, useState, lazy, Suspense  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button,Input } from "antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getAllProcure,
  emptyProcre,
  handleProcureOrderModal,
  updateProcures,
  handleProcureNotesDrawerModal,
  procureToAccept
} from "../Procre/ProcreAction";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import "jspdf-autotable";
import dayjs from "dayjs";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { MultiAvatar } from "../../../Components/UI/Elements";
import { base_url2 } from "../../../Config/Auth";
import axios from "axios";
import { BundleLoader } from "../../../Components/Placeholder";


const ProcureOrderModal = lazy(() => import("./Child/ProcureOrderModal"));
const AddProcureNotesDrawerModal=lazy(()=>import("./AddProcureNotesDrawerModal"));
const ProcureSearchedData = lazy(() => import("./ProcureSearchedData"));
const EmptyPage = lazy(() => import("../EmptyPage")); //2
const NodataFoundPage = lazy(() => import("../../../Helpers/ErrorBoundary/NodataFoundPage"));

function ProcreCardList(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [editedFields, setEditedFields] = useState({});
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.allProcure.map((item, index) => ({ ...item, key: String(index) })));
  }, [props.allProcure]);

  useEffect(() => {
    props.getAllProcure(props.orgId, page);
    setPage(page + 1);
  }, []);

  const [particularRowData, setParticularRowData] = useState({});

  function handleSetParticularOrderData(item) {
    setParticularRowData(item);
}
const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [

        "1044", // 'Item', 0
        "788",// ' Price/Unit',1 
        "256",// 'Unit', 2
        "666",  // 'Procure', 3
        "772", // 'Delivery', 4
        "658",// 'Location',5
        "679", // 'Created',6
        "77", // "Owner",7
        "856",// "Trade",8
        "794",// "Submitted By"9
       "100", // New110
       "1533",  // Change status to Accepted?11
      "80",   // Yes12
       "81",  // No113
       "1534",  // Accepted14
     "1535",   // Accept15
      "316",   // "Notes"16
      "1078",   // Save17
      "1079",   // Cancel18
      "170",   // Edit19
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
    return () => props.emptyProcre();
  }, []);

 

  // const handleLoadMore = () => {
  //   setPage(page + 1);
  //   props.getAllProcure(props.currentUser ? props.currentUser : props.orgId, page,
  //   );
  // }
  const handleLoadMore = () => {
    const callPageMapd = props.allProcure && props.allProcure.length &&props.allProcure[0].pageCount
    setTimeout(() => {
      const {
        getAllProcure,
       // userDetails: { employeeId },
      } = props;
      if  (props.allProcure)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getAllProcure(props.currentUser ? props.currentUser : props.orgId, page, );
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };
  const viewAnDownloadPdf= async (item) => {  
    try {
      const response = await axios.get(`${base_url2}/quotation/customer/pdf/${`order`}/${item.iteamId}`, {
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

  const handleInputChange = (value, key, dataIndex) => {
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, [dataIndex]: value } : row
    );
    setData(updatedData);
  };
  const handleEditClick = (productionBuilderId) => {
    setEditsuppliesId(productionBuilderId);
  };
  const handleCancelClick = (productionBuilderId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [productionBuilderId]: undefined }));
    setEditsuppliesId(null);
  };
  const handleSave = (key) => {
    console.log(key)
  
      const result = [{
        iteamId:key.iteamId,
              tradeId:key.tradeId,
              suppliesId:key.suppliesId,
              tradePrice:key.tradePrice,
              tradeUnit:key.tradeUnit,
              procureId:key.procureId,
              userId:props.userId
            }];
      props.updateProcures(result)
    
  };
const {handleProcureNotesDrawerModal,
  addDrawerProcureNotesModal
} = props;
console.log(props.fetchingAllProcure)
  return (
    <div>
    {props.orderSearch.length > 0 ? (
      <ProcureSearchedData
      orderSearch={props.orderSearch}
      translateText={props.translateText}
      selectedLanguage={props.selectedLanguage}
    translatedMenuItems={props.translatedMenuItems}
      />
    ) : (
    <>
   {/* <div class="truncate max-w-[100px] " title={item.issue}>{item.issue}</div> */}
    <div class="rounded m-1 max-sm:m-1 p-1 w-[100%] shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]" >
        <div className=" flex justify-between w-[90%]  p-1 bg-transparent font-bold font-poppins  !text-lm sticky  z-10 max-sm:hidden">
        <div className=" md:w-[0.5rem]"></div>
                        <div className=" text-[#00A2E8] text-sm w-[11rem] truncate max-md:w-[11rem]">{translatedMenuItems[0]}</div>
                        <div className=" w-[5.4rem] truncate max-md:w-[5.4rem]">{translatedMenuItems[1]}</div>
                        <div className=" w-[5.4rem] truncate max-md:w-[5.4rem]">{translatedMenuItems[2]}</div>
                        <div className=" w-[12.4rem] truncate max-md:w-[12.4rem]">{translatedMenuItems[3]}ID</div>
                        <div className=" w-[6rem] truncate max-md:w-[6rem]">{translatedMenuItems[4]}</div>
                        <div className=" w-[5rem] truncate max-md:w-[5rem]">{translatedMenuItems[5]}</div>
                        <div className=" w-[6.01rem] truncate max-md:w-[6.01rem]">{translatedMenuItems[6]}</div>
                        <div className="w-[3.8rem] truncate max-md:w-[3.8rem] ">{translatedMenuItems[7]}</div>
                        <div className=" w-[5rem] truncate max-md:w-[5rem]">{translatedMenuItems[8]}ID</div>
                        <div className=" w-[5.4rem] truncate max-md:w-[5.4rem]">{translatedMenuItems[1]}</div>
                        <div className=" w-[5.4rem] truncate max-md:w-[5.4rem]">{translatedMenuItems[2]}</div>
                        <div className="  w-[5.8rem] truncate max-md:w-[5.8rem]">{translatedMenuItems[9]}</div>
                        <div className="w-[1rem] truncate max-md:w-[1rem]"></div>
        </div>
        <InfiniteScroll
            hasMore={hasMore}
          dataLength={props.allProcure.length}
          next={handleLoadMore}
          loader={props.fetchingAllProcure?<div><BundleLoader/></div>:null}
          height={"83vh"}
          style={{ scrollbarWidth:"thin"}}
          endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
        >
          {/* {data.map((item) => { */}
{props.fetchingAllProcure === false ? (
  <NodataFoundPage/>
) : !props.fetchingAllProcure && data.length === 0 ? (
  <EmptyPage />
) : (
  data.map((item, index) => {
            const currentDate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
            const diff = Math.abs(
              dayjs().diff(dayjs(item.lastRequirementOn), "days")
            );
           
            return (
              <div  key={item.iteamId}>
              <div className="flex rounded  mt-1 bg-white h-8 items-center  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col  p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
<div>
</div>
                  <div class="flex">
                  <div className=" flex  w-wk items-center   max-sm:w-full">
                  <div className="flex items-center border-l-2 border-green-500 bg-[#eef2f9] max-sm:w-full">
                  <div className=" flex   md:w-[4.22rem]   max-sm:flex-row w-full max-sm:justify-between ">
                  <div className="flex items-center truncate max-w-[100px] text-xs md:w-[12.8rem]  max-sm:w-full" 
  title={`${item.category} ${item.brand} ${item.model} ${item.attribute}`}>


                                                      {item.category} {item.brand} {item.model} {item.attribute}
                                                    </div>
                                                    </div>
                                                    <div className=" flex   md:w-[6.22rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9]  max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs  font-semibold  font-poppins">
 
                      <div className=" text-xs  font-poppins">
                        <div> {item.price}</div>
                      </div>
                    </div>
  </div>
  <div className=" flex   md:w-[4rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9]  max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs  font-semibold  font-poppins">
                      <div className=" text-xs  font-poppins">
                        <div> {item.unit}</div>
                      </div>
                    </div>
  </div> 
                        <div class="max-sm:w-full  items-center md:w-[7.52rem]  justify-center h-8 ml-gap  bg-[#eef2f9] ">
                          <Tooltip>
                          <div class="max-sm:w-full  justify-between md:flex text-xs">                      
                                <span
                                                                    class="underline cursor-pointer text-[#1890ff] font-bold"
                                                                    onClick={() => {
                                                                        handleSetParticularOrderData(item);
                                                                        props.handleProcureOrderModal(true);
                                                                    }}
                                                                >{item.procureId} 
                                                                </span>
                                                                <span> {date === currentDate ? (
                                                                  <span className="text-[0.65rem] text-[tomato] font-bold">
                                                                   {translatedMenuItems[10]} {/* New */}
                                                                  </span>
                                                                ) : null} </span>
                            
                            
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row items-center md:w-[8rem]  justify-center h-8 ml-gap  bg-[#eef2f9]  max-sm:flex-row w-full max-sm:justify-between">
                  
                      
                  <div class="max-sm:w-full justify-between flex md:flex-col text-xs">
                  {dayjs(item.deliveryDate).format("DD/MM/YYYY")}

                        </div>
                         </div>
                  </div>
                  <div class="flex items-center">
                    <div className=" flex   md:w-[10.01rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9]  max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" font-poppins text-xs">

                      {`${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].city) || ""}, ${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].country) || ""}
         
        `}
                      </div>
                    </div>
                    <div className=" flex  md:w-[10.051rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9]  max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" font-poppins text-xs">

                     {date}
                      </div>
                    </div>
                    
                  <div class="flex items-center md:w-[4.03rem]  justify-center h-8 ml-gap  bg-[#eef2f9]  max-sm:flex-row w-full max-sm:justify-between">
                    <div>
                      <MultiAvatar
                        primaryTitle={item.userName}
                        imageURL={item.imageURL}
                        imgWidth={"1.8rem"}
                        imgHeight={"1.8rem"}
                      />
                    </div>
                  </div>
                  {props.userId === item.userId && item.tradeId !== null && (
                  <div class=" text-xs  font-poppins">
                        <div
                          title={translatedMenuItems[11]}                    
                          onConfirm={() => props.procureToAccept(item.iteamId,data,props.orgId)}
                          okText={translatedMenuItems[12]}
                          // "Yes"
                          cancelText={translatedMenuItems[13]}
                          // "No"
                        >
                         
                            <Button type="primary"
                              style={{ width: "6.5rem", background: "linear-gradient(to right, #2BBCCF, #38C98D)" }}
                              disabled={item.acceptedInd || props.fetchingAllProcure}
                              loading={props.fetchingAllProcure}
                              >
                              <div class="text-xs max-xl:text-[0.65rem] text-white  max-lg:text-[0.45rem] flex justify-between items-center " >
                                   {item.acceptedInd? translatedMenuItems[14]: translatedMenuItems[15]}           
                                {/* Accept */}
                                <NextPlanIcon className=" !text-icon" />
                              </div>
                            </Button>
                         
                        </div>
                      </div>
          )}
                  <div class="flex flex-row items-center justify-center h-8 ml-gap  bg-[#eef2f9] md:w-[8.03rem] max-sm:flex-row w-full max-sm:justify-between">
                    <div>
                    {editsuppliesId === item.iteamId ? (
                       <Input
                       style={{ width: "7rem" }}
                       value={item.tradeId}
                       onChange={(e) => handleInputChange(e.target.value, item.key, 'tradeId')}
                     />
                       
                    ) : (
                      <div className=" text-xs  font-poppins">
                        <div> {item.tradeId}</div>
                      </div>
                    )}
                  
                    </div>
                  </div>
                  <div className=" flex   md:w-[3rem] max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs  font-semibold  font-poppins">
                   {editsuppliesId === item.iteamId ? (
                       <Input
                       style={{ width: "4rem" }}
                       value={item.tradePrice}
                       onChange={(e) => handleInputChange(e.target.value, item.key, 'tradePrice')}
                     />
                       
                    ) : (
                      <div className=" text-xs  font-poppins">
                        <div> {item.tradePrice}</div>
                      </div>
                    )}
                    </div>
                    <div className=" flex  md:w-[10.051rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" font-poppins text-xs">

                     {item.currencyName} {item.price}
                      </div>
                    </div>
                  </div>
  </div>
  <div className=" flex  md:w-[4.22rem] max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs  font-semibold  font-poppins">
                   {editsuppliesId === item.iteamId ? (
                       <Input
                       style={{ width: "4rem" }}
                       value={item.tradeUnit}
                       onChange={(e) => handleInputChange(e.target.value, item.key, 'tradeUnit')}
                     />
                       
                    ) : (
                      <div className=" text-xs  font-poppins">
                        <div> {item.tradeUnit}</div>
                      </div>
                    )}
                    </div>
  </div>
  <div class="flex  items-center md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between">
  <div>
                      <MultiAvatar
                        primaryTitle={item.userName}
                        imageURL={item.imageURL}
                        imgWidth={"1.8rem"}
                        imgHeight={"1.8rem"}
                      />
                    </div>
                  </div>
                  <div className=" flex   md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                  <div class="w-6 items-center justify-center h-8  bg-[#eef2f9] ">
                  <PictureAsPdfIcon className="!text-icon text-[red] cursor-pointer" 
    onClick={()=> viewAnDownloadPdf(item)}
    />
          </div>          
                  <div class="items-center justify-center h-8   bg-[#eef2f9] " >
                      <Tooltip title={translatedMenuItems[16]}>
                        <NoteAltIcon
                         className=" !text-icon cursor-pointer text-green-800 max-sm:!text-2xl"
                          onClick={() => {
                            handleSetParticularOrderData(item);
                            handleProcureNotesDrawerModal(true);
                         
                          }}
                         
                        />
                      </Tooltip>
                    </div>

    {editsuppliesId === item.iteamId ? (
                        <>
                      <Button 
                      type="primary"
                      loading={props.updatingProcures}
                      onClick={() => handleSave(item)}>
                       {translatedMenuItems[17]} {/* Save */}
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.iteamId)} className="ml-[0.5rem]">
                       {translatedMenuItems[18]} {/* Cancel */}
                      </Button>
                      </>
                      
                    ) : (
                      <>
                       {!item.acceptedInd && (
                     <div class="items-center justify-center h-8 ml-gap  bg-[#eef2f9] ">
                      <BorderColorIcon
                      className="!text-icon cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1 max-sm:!text-2xl"
                        tooltipTitle={translatedMenuItems[19]}
                        iconType="edit"
                        onClick={() => handleEditClick(item.iteamId)}
                      />
                      </div>
                       )}
                      </>
                    )}
    </div>
                </div>
              </div>
              // </div>
            );
})
        )}
        </InfiniteScroll>
      </div>
<Suspense>
      <ProcureOrderModal
       selectedLanguage={props.selectedLanguage}
       translateText={props.translateText}
                particularRowData={particularRowData}
                handleProcureOrderModal={props.handleProcureOrderModal}
                addProcureOrderModal={props.addProcureOrderModal} />

<AddProcureNotesDrawerModal
 selectedLanguage={props.selectedLanguage}
 translateText={props.translateText}
        particularRowData={particularRowData}
        addDrawerProcureNotesModal={props.addDrawerProcureNotesModal}
        handleProcureNotesDrawerModal={props.handleProcureNotesDrawerModal}
      /></Suspense>
    </>
      )}
  </div>
  );



}

const mapStateToProps = ({ shipper,procre,auth,order }) => ({
  allProcure: procre.allProcure,
  fetchingAllProcure: procre.fetchingAllProcure,
  updateEventModal: shipper.updateEventModal,
  updateCallModal: shipper.updateCallModal,
  updateTaskModal: shipper.updateTaskModal,
  orgId: auth.userDetails.organizationId,
  addProcureOrderModal:procre.addProcureOrderModal,
  updatingProcures:procre.updatingProcures,
  userId: auth.userDetails.userId,
  addDrawerProcureNotesModal: procre.addDrawerProcureNotesModal,
  orderSearch:order.orderSearch
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(

    {
getAllProcure,
emptyProcre,
handleProcureOrderModal,
updateProcures,
handleProcureNotesDrawerModal,
procureToAccept
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProcreCardList);
