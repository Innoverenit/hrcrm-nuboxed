import React, {  useEffect, useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button,Input ,Popconfirm} from "antd";
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
import dayjs from "dayjs";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { MultiAvatar } from "../../../Components/UI/Elements";
import ProcureOrderModal from "./Child/ProcureOrderModal";
import AddProcureNotesDrawerModal from "./AddProcureNotesDrawerModal";

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

        'Item', 
        ' Price/Unit', 
        'Unit', 
        'Procure', 
        'Delivery', 
        'Location',
        'Created',
        "Owner",
        "Trade",
        "Submitted By"
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
        // hsn: key.hsn,
        // suppliesName:key.suppliesName,
        // attributeName:key.attributeName,
        // subAttributeName:key.subAttributeName,
        //       categoryName:key.categoryName,
        //       subCategoryName:key.subCategoryName,
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
  return (
    <>
    <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
        <div className=" md:w-[0.5rem]"></div>
                        <div className=" md:w-[11rem]">{translatedMenuItems[0]}</div>
                        <div className=" md:w-[5.4rem]">{translatedMenuItems[1]}</div>
                        <div className=" md:w-[5.4rem]">{translatedMenuItems[2]}</div>
                        <div className=" md:w-[12rem]">{translatedMenuItems[3]}ID</div>
                        <div className=" md:w-[6rem]">{translatedMenuItems[4]}</div>
                        <div className=" md:w-[5rem]">{translatedMenuItems[5]}</div>
                        <div className=" md:w-[6.01rem]">{translatedMenuItems[6]}</div>
                        <div className=" md:w-[3.8rem] ">{translatedMenuItems[7]}</div>
                        <div className=" md:w-[5rem]">{translatedMenuItems[8]}ID</div>
                        <div className=" md:w-[5.4rem]">{translatedMenuItems[1]}</div>
                        <div className=" md:w-[5.4rem]">{translatedMenuItems[2]}</div>
                        <div className=" md:w-[5.8rem]">{translatedMenuItems[9]}</div>
                        <div className="md:w-[1rem]"></div>
        </div>
        <InfiniteScroll
            hasMore={hasMore}
          dataLength={props.allProcure.length}
          next={handleLoadMore}
          loader={props.fetchingAllProcure?<div class="flex justify-center" >Loading...</div>:null}
          height={"79vh"}
          style={{ scrollbarWidth:"thin"}}
          endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
        >
          {data.map((item) => {
            const currentDate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
            const diff = Math.abs(
              dayjs().diff(dayjs(item.lastRequirementOn), "days")
            );
           
            return (
              <div key={item.iteamId}>
              <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
<div>
{/* <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full ">
                                                                <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

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
                                                        </Tooltip> */}
</div>
                  <div class="flex">
                  <div className=" flex flex-col w-wk items-center   max-sm:w-full">
                  <div className="flex items-center max-sm:w-full">
                      <div className=" flex items-center  md:w-[12rem] max-sm:w-full  ">
                                                      {item.category} {item.brand} {item.model} {item.attribute}
                                                    </div>
                                                    <div className=" flex   md:w-[4.22rem] max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs  font-semibold  font-poppins">
 
                      <div className="font-normal text-xs  font-poppins">
                        <div> {item.price}</div>
                      </div>
                    </div>
  </div>
  <div className=" flex   md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs  font-semibold  font-poppins">
                      <div className=" text-xs  font-poppins">
                        <div> {item.unit}</div>
                      </div>
                    </div>
  </div> 
                        <div class="max-sm:w-full  items-center md:w-[12.02rem]">
                          <Tooltip>
                          <div class="max-sm:w-full  justify-between md: flex flex-row text-xs">                      
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
                                                                    New
                                                                  </span>
                                                                ) : null} </span>
                            
                            
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row items-center md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between">
                  
                      
                  <div class="max-sm:w-full justify-between flex md:flex-col text-xs">
                  {dayjs(item.deliveryDate).format("DD/MM/YYYY")}

                        </div>
                         </div>
                  </div>
                  <div class="flex items-center">
                    <div className=" flex   md:w-[10.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" font-poppins text-xs">

                      {`${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].city) || ""}, ${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].country) || ""}
         
        `}
                      </div>
                    </div>
                    <div className=" flex  md:w-[10.051rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" font-poppins text-xs">

                     {date}
                      </div>
                    </div>
                    
                  <div class="flex items-center md:w-[4.03rem] max-sm:flex-row w-full max-sm:justify-between">
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
                        <Popconfirm
                          title="Change status to Accepted?"
                          onConfirm={() => props.procureToAccept(item.iteamId,data,props.orgId)}
                          okText="Yes"
                          cancelText="No"
                        >
                         
                            <Button type="primary"
                              style={{ width: "6.5rem", background: "linear-gradient(to right, #2BBCCF, #38C98D)" }}
                              disabled={item.acceptedInd || props.fetchingAllProcure}
                              loading={props.fetchingAllProcure}
                              >
                              <div class="text-xs max-xl:text-[0.65rem] text-white  max-lg:text-[0.45rem] flex justify-between items-center " >
                                   {item.acceptedInd? "Accepted": "Accept"}           
                                {/* Accept */}
                                <NextPlanIcon className=" !text-icon" />
                              </div>
                            </Button>
                         
                        </Popconfirm>
                      </div>
          )}
                  <div class="flex flex-row items-center md:w-[8.03rem] max-sm:flex-row w-full max-sm:justify-between">
                    <div>
                    {editsuppliesId === item.iteamId ? (
                       <Input
                       style={{ width: "7rem" }}
                       value={item.tradeId}
                       onChange={(e) => handleInputChange(e.target.value, item.key, 'tradeId')}
                     />
                       
                    ) : (
                      <div className="font-normal text-xs  font-poppins">
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
                      <div className="font-normal text-xs  font-poppins">
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
                      <div className="font-normal text-xs  font-poppins">
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
                  <div >
                      <Tooltip title="Notes">
                        <NoteAltIcon
                         className=" !text-icon cursor-pointer text-green-800"
                          onClick={() => {
                            handleSetParticularOrderData(item);
                            handleProcureNotesDrawerModal(true);
                         
                          }}
                         
                        />
                      </Tooltip>
                    </div>
  <div className=" flex   md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
    {editsuppliesId === item.iteamId ? (
                        <>
                      <Button 
                      type="primary"
                      loading={props.updatingProcures}
                      onClick={() => handleSave(item)}>
                        Save
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.iteamId)} className="ml-[0.5rem]">
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <>
                       {!item.acceptedInd && (
                     
                      <BorderColorIcon
                      className="!text-icon cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.iteamId)}
                      />
                       )}
                      </>
                    )}
    </div>
                </div>
              </div>
              // </div>
            );
          })}
        </InfiniteScroll>
      </div>

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
      />
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
  updatingProcures:procre.updatingProcures,
  userId: auth.userDetails.userId,
  addDrawerProcureNotesModal: procre.addDrawerProcureNotesModal
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
