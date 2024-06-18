import React, {  useEffect, useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button,Input } from "antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getAllProcure,
  emptyProcre,
  handleProcureOrderModal,
  updateProcures
} from "../Procre/ProcreAction";
import dayjs from "dayjs";
import { MultiAvatar } from "../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import ProcureOrderModal from "./Child/ProcureOrderModal";

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
  useEffect(() => {
    return () => props.emptyProcre();
  }, []);

  const handleLoadMore = () => {
    setPage(page + 1);
    props.getAllProcure(props.currentUser ? props.currentUser : props.orgId, page,
    );
  }

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

  return (
    <>
    <div class="rounded m-1 max-sm:m-1 p-1 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
        <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky  z-10">
        <div className=" md:w-[0.5rem]"></div>
                        <div className=" md:w-[11rem]"><FormattedMessage id="app.item" defaultMessage="Item"/></div>
                        <div className=" md:w-[5.4rem]"><FormattedMessage id="app.priceunit" defaultMessage="Price/Unit "/></div>
                        <div className=" md:w-[5.4rem]"><FormattedMessage id="app.unit" defaultMessage="Unit "/></div>
                        <div className=" md:w-[12rem]"><FormattedMessage id="app.procreid#" defaultMessage="Procure ID"/></div>
                        <div className=" md:w-[6rem]"><FormattedMessage id="app.delivery" defaultMessage="Delivery"/></div>
                        <div className=" md:w-[5rem]"><FormattedMessage id="app.location" defaultMessage="Location"/></div>
                        <div className=" md:w-[3.8rem] "><FormattedMessage id="app.owner" defaultMessage="Owner"/></div>
                        <div className=" md:w-[5rem]"><FormattedMessage id="app.tradeid" defaultMessage="Trade ID"/></div>
                        <div className=" md:w-[5.4rem]"><FormattedMessage id="app.priceunit" defaultMessage="Price/Unit "/></div>
                        <div className=" md:w-[5.4rem]"><FormattedMessage id="app.unit" defaultMessage="Unit "/></div>
                        <div className=" md:w-[5.8rem]"><FormattedMessage id="app.Submittedby" defaultMessage="Submitted By"/></div>
                        <div className="md:w-[1rem]"></div>
        </div>
        <InfiniteScroll
            hasMore={hasMore}
          dataLength={props.allProcure.length}
          next={handleLoadMore}
          loader={props.fetchingAllProcure?<div class="flex justify-center" >Loading...</div>:null}
          height={"75vh"}
        >
          {data.map((item) => {
            const currentDate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
            const diff = Math.abs(
              dayjs().diff(dayjs(item.lastRequirementOn), "days")
            );
           
            return (
              <div key={item.iteamId}>
              <div className="flex rounded  mt-1 bg-white h-8 items-center p-1">
<div>
{/* <Tooltip>
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
                                                        </Tooltip> */}
</div>
                  <div class="flex">
                  <div className=" flex font-medium flex-col w-wk items-center   max-sm:w-full">
                  <div className="flex items-center max-sm:w-full">
                      <div className=" flex font-medium items-center  md:w-[12rem] max-sm:w-full  ">
                                                      {item.category} {item.brand} {item.model} {item.attribute}
                                                    </div>
                                                    <div className=" flex font-medium  md:w-[4.22rem] max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs text-cardBody font-semibold  font-poppins">
 
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.price}</div>
                      </div>
                    </div>
  </div>
  <div className=" flex font-medium  md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.unit}</div>
                      </div>
                    </div>
  </div>
                        <div class="max-sm:w-full  items-center md:w-[12.02rem]">
                          <Tooltip>
                          <div class="max-sm:w-full  justify-between md: flex flex-row text-sm">                      
                                <span
                                                                    class="underline cursor-pointer text-[#1890ff]"
                                                                    onClick={() => {
                                                                        handleSetParticularOrderData(item);
                                                                        props.handleProcureOrderModal(true);
                                                                    }}
                                                                >{item.iteamId} 
                                                                </span>
                                                                <span> {date === currentDate ? (
                                                                  <span className="text-xs text-[tomato] font-bold">
                                                                    New
                                                                  </span>
                                                                ) : null} </span>
                            
                            
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row items-center md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between">
                  
                      
                  <div class="max-sm:w-full justify-between flex md:flex-col text-sm">
                  {dayjs(item.deliveryDate).format("DD/MM/YYYY")}

                        </div>

               
                </div>
                  </div>
                  <div class="flex">
                    <div className=" flex font-medium flex-col  md:w-[10.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <h4 class="text-cardBody font-poppins text-sm">

                      {`${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].city) || ""}, ${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].country) || ""}
         
        `}
                      </h4>
                    </div>
                  </div>
                  <div class="flex flex-row items-center md:w-[4.03rem] max-sm:flex-row w-full max-sm:justify-between">
                    <div>
                      <MultiAvatar
                        primaryTitle={item.userName}
                        imageURL={item.imageURL}
                        imgWidth={"1.8rem"}
                        imgHeight={"1.8rem"}
                      />
                    </div>
                  </div>
                  <div class="flex flex-row items-center md:w-[8.03rem] max-sm:flex-row w-full max-sm:justify-between">
                    <div>
                    {editsuppliesId === item.iteamId ? (
                       <Input
                       style={{ width: "3rem" }}
                       value={item.tradeId}
                       onChange={(e) => handleInputChange(e.target.value, item.key, 'tradeId')}
                     />
                       
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.tradeId}</div>
                      </div>
                    )}
                  
                    </div>
                  </div>
                  <div className=" flex font-medium  md:w-[3rem] max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs text-cardBody font-semibold  font-poppins">
                   {editsuppliesId === item.iteamId ? (
                       <Input
                       style={{ width: "3rem" }}
                       value={item.tradePrice}
                       onChange={(e) => handleInputChange(e.target.value, item.key, 'tradePrice')}
                     />
                       
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.tradePrice}</div>
                      </div>
                    )}
                    </div>
  </div>
  <div className=" flex font-medium  md:w-[4.22rem] max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs text-cardBody font-semibold  font-poppins">
                   {editsuppliesId === item.iteamId ? (
                       <Input
                       style={{ width: "3rem" }}
                       value={item.tradeUnit}
                       onChange={(e) => handleInputChange(e.target.value, item.key, 'tradeUnit')}
                     />
                       
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.tradeUnit}</div>
                      </div>
                    )}
                    </div>
  </div>
  <div class="flex flex-row items-center md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between">
                    <div>
                      {item.userName} 
                    </div>
                  </div>
  <div className=" flex font-medium  md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
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
                      <BorderColorIcon
                      className="!text-icon cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.iteamId)}
                      />
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
  updatingProcures:procre.updatingProcures,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(

    {
getAllProcure,
emptyProcre,
handleProcureOrderModal,
updateProcures
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProcreCardList);
