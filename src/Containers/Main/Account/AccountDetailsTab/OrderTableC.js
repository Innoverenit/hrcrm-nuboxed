import React, {  useEffect, useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getCustomerOrder,handleStatuShowDrawer} from "../AccountAction"
import { Tooltip,Button,Input ,Popconfirm} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { MultiAvatar2 } from "../../../../Components/UI/Elements";
import ProcureStatusShowDrawer from "./AccountOrderTab/ProcureStatusShowDrawer";

function OrderTableC(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [editedFields, setEditedFields] = useState({});
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [data, setData] = useState([]);

//   useEffect(() => {
//     setData(props.ecomList.map((item, index) => ({ ...item, key: String(index) })));
//   }, [props.ecomList]);

  useEffect(() => {
    props.getCustomerOrder(props.distributorId, page);
    setPage(page + 1);
  }, []);
  const [openInvoiceModal,setopenInvoiceModal] = useState(false);
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
        "71",// 'Type',//0
       "660", //  'Order', 1
       "679",  // 'Created',//2
       "73",// 'Contact',3
        "1171",  // 'Payment',//4
       "142", // 'Status',//5
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



 
  const handleLoadMore = () => {
    const callPageMapd = props.orderCustomerList && props.orderCustomerList.length &&props.orderCustomerList[0].pageCount
    setTimeout(() => {
      const {
        getCustomerOrder,
       // userDetails: { employeeId },
      } = props;
      if  (props.orderCustomerList)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getCustomerOrder(props.distributorId, page, );
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  

const {handleProcureNotesDrawerModal,
  addDrawerProcureNotesModal
} = props;
  return (
    <div>
  
    <>
    <div class="rounded m-1 max-sm:m-1 p-1 w-[99%]  overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1] max-sm:hidden">
        <div className=" flex justify-between w-[90%]  p-1 bg-transparent font-bold sticky  z-10">

                        <div className="font-bold w-[17rem] font-poppins text-xs md:w-[10rem]">{translatedMenuItems[0]} </div>
                        <div className="font-bold w-[23rem] font-poppins text-xs md:w-[5.4rem]">{translatedMenuItems[1]} ID</div>
                        <div className="font-bold  w-[21rem] font-poppins text-xs md:w-[6.4rem]">{translatedMenuItems[2]}</div>
                        <div className="font-bold  w-[10rem] font-poppins text-xs md:w-[8.4rem]">{translatedMenuItems[3]}</div>
                        <div className="font-bold w-[10rem] font-poppins text-xs md:w-[8.4rem]">{translatedMenuItems[4]}</div>
                        <div className="font-bold  w-[23rem] font-poppins text-xs md:w-[5.4rem]">{translatedMenuItems[5]}</div>
                      
        </div>
        <InfiniteScroll
            hasMore={hasMore}
          dataLength={props.orderCustomerList.length}
          next={handleLoadMore}
          loader={props.fetchingOrderCustomer?<div class="flex justify-center" >Loading...</div>:null}
          height={"79vh"}
          style={{ scrollbarWidth:"thin"}}
          endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
        >
          {props.orderCustomerList.map((item) => {
            const currentDate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
           
           
            return (
                <div>
                <div
className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200
                                     max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-24 max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
                     <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                        <div className=" flex   md:w-[4rem] max-sm:flex-row max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins">
                                {item.orderType}
                            </div>
                            {date === currentDate ? (
                                <span className=" text-[0.65rem] text-[tomato] font-bold" >
                                 {translatedMenuItems[9]} 
                                </span>
                              ) : null}
                        </div>
                      
                        </div>
                        <div className=" flex  items-center md:w-[12rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs  items-center font-poppins">
                             {item.newOrderNo}
                            </div>
                    
                        </div>



                        <div className=" flex items-center  md:w-[12rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                            {date}
                            </div>

                        </div>


                        <div className=" flex items-center  md:w-[12rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                
                                <MultiAvatar2
                    primaryTitle={item.contactPersonName}
                    imageURL={item.imageURL}
                    imgWidth={"1.8em"}
                    imgHeight={"1.8em"}
                  />
                            </div>

                        </div>
                        <div className=" flex items-center  md:w-[12rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                {item.paymentAmount}
                            </div>

                        </div>
                        <div style={{ filter: "drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))" }} class="rounded-full bg-white md:w-5 h-5 cursor-pointer">
                                            <Tooltip title={translatedMenuItems[5]}>
                                             
                                                                <EventRepeatIcon

                                                                    className="!text-base cursor-pointer"
                                                                    onClick={() => {
                                                                        props.handleStatuShowDrawer(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                />
                                                            </Tooltip>
                                            </div> 

                       
                       

                </div>
            </div>
            );
          })}
        </InfiniteScroll>
      </div>
    
    </>
    <ProcureStatusShowDrawer
selectedLanguage={props.selectedLanguage}
translateText={props.translateText} 
           particularRowData={particularRowData}
           showStatusDrwr={props.showStatusDrwr}
           handleStatuShowDrawer={props.handleStatuShowDrawer}
           />
  </div>
  );



}

const mapStateToProps = ({ distributor,procre,auth }) => ({
  orderCustomerList: distributor.orderCustomerList,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  showStatusDrwr:distributor.showStatusDrwr,
  fetchingOrderCustomer:distributor.fetchingOrderCustomer
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(

    {

      getCustomerOrder,
      handleStatuShowDrawer
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderTableC);
