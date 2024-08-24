import React, {  useEffect, useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button,Input ,Popconfirm} from "antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import InfiniteScroll from "react-infinite-scroll-component";
import {
    getEcomList
} from "./OrderAction";
import dayjs from "dayjs";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { MultiAvatar } from "../../../Components/UI/Elements";
import EcomStatusCardDrawer from "./EcomStatusCardDrawer";
// import ProcureOrderModal from "./Child/ProcureOrderModal";
// import AddProcureNotesDrawerModal from "./AddProcureNotesDrawerModal";

function EcomCardList(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [editedFields, setEditedFields] = useState({});
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.ecomList.map((item, index) => ({ ...item, key: String(index) })));
  }, [props.ecomList]);

  useEffect(() => {
    props.getEcomList(props.orgId, page);
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
        'Order',//0
        'Created', 
        'Items',//2
        'Status',
        'Customer',//4
        'Shipping Address',
        'Billing Address',//6
        'Invoices',
        'Shipments',
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
    const callPageMapd = props.ecomList && props.ecomList.length &&props.ecomList[0].pageCount
    setTimeout(() => {
      const {
        getEcomList,
       // userDetails: { employeeId },
      } = props;
      if  (props.ecomList)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getEcomList(props.orgId, page, );
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
    <>
    <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
        <div className=" md:w-[0.5rem]"></div>
                        <div className=" md:w-[11rem]">{translatedMenuItems[0]} ID</div>
                        <div className=" md:w-[5.4rem]">{translatedMenuItems[1]}</div>
                        <div className=" md:w-[5.4rem]">{translatedMenuItems[2]}</div>
                        <div className=" md:w-[5.4rem]">{translatedMenuItems[7]}</div>
                        <div className=" md:w-[5.4rem]">{translatedMenuItems[8]}</div>
                        <div className=" md:w-[5.4rem]">{translatedMenuItems[4]}</div>
                        <div className=" md:w-[5.4rem]">{translatedMenuItems[5]}</div>
                        <div className=" md:w-[5.4rem]">{translatedMenuItems[6]}</div>
                        <div className=" md:w-[5.4rem]"></div>
                        <div className=" md:w-[12rem]"></div>
                       
                        <div className="md:w-[1rem]"></div>
        </div>
        <InfiniteScroll
            hasMore={hasMore}
          dataLength={props.ecomList.length}
          next={handleLoadMore}
          loader={props.fetchingEcomList?<div class="flex justify-center" >Loading...</div>:null}
          height={"79vh"}
          style={{ scrollbarWidth:"thin"}}
          endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
        >
          {data.map((item) => {
            const currentDate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
           
           
            return (
                <div>
                <div
className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[5rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
                     <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                        <div className=" flex   md:w-[6rem] max-sm:flex-row max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins">
                                {item.newOrderNo}
                            </div>
                            {date === currentDate ? (
                                <span className=" text-[0.65rem] text-[tomato] font-bold" >
                                  New
                                </span>
                              ) : null}
                        </div>
                      
                        </div>
                        <div className=" flex   md:w-[10rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins">
                            {date}
                            </div>
                    
                        </div>
                        <div className=" flex   md:w-[12rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins">
                                {item.category}  {item.attribute}
                            </div>

                        </div>
                        <div className=" flex   md:w-[10rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins">
                      
                            </div>
                    
                        </div>
                        <div className=" flex   md:w-[6rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins">
                       
                            </div>
                    
                        </div>
                        <div className=" flex   md:w-[6rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins">
                            
                            </div>
                    
                        </div>
                        <div className=" flex   md:w-[7rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins">
                              
                            </div>
                    
                        </div>
                        <div className=" flex   md:w-[7rem] max-sm:flex-row  max-sm:justify-between  ">
                        <Button type="primary" >{translatedMenuItems[7]}</Button>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">                                                 
                        <div>
                        <Tooltip title="Status"
                                                                
                                                            >
                                                                <EventRepeatIcon

                                                                    className="!text-base cursor-pointer"
                                                                    onClick={() => {
                                                                       openModal();
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                />
                                                            </Tooltip>
                        </div>
                    </div>

                </div>
            </div>
            );
          })}
        </InfiniteScroll>
      </div>

       <EcomStatusCardDrawer
       selectedLanguage={props.selectedLanguage}
       translateText={props.translateText}
                particularRowData={particularRowData}
                modalVisible={modalVisible}
                closeModal={closeModal} />

{/*<AddProcureNotesDrawerModal
 selectedLanguage={props.selectedLanguage}
 translateText={props.translateText}
        particularRowData={particularRowData}
        addDrawerProcureNotesModal={props.addDrawerProcureNotesModal}
        handleProcureNotesDrawerModal={props.handleProcureNotesDrawerModal}
      /> */}
    </>
  );



}

const mapStateToProps = ({ order,procre,auth }) => ({
  ecomList: order.ecomList,
  fetchingEcomList: order.fetchingEcomList,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(

    {
getEcomList,

    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EcomCardList);
