import React, {  useEffect, useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button,Input ,Popconfirm} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';

function OrderTableC(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [editedFields, setEditedFields] = useState({});
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [data, setData] = useState([]);

//   useEffect(() => {
//     setData(props.ecomList.map((item, index) => ({ ...item, key: String(index) })));
//   }, [props.ecomList]);

//   useEffect(() => {
//     props.getEcomList(props.orgId, page);
//     setPage(page + 1);
//   }, []);
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
    <div>
  
    <>
    <div class="rounded m-1 max-sm:m-1 p-1 w-[99%]  overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1] max-sm:hidden">
        <div className=" flex justify-between w-[90%]  p-1 bg-transparent font-bold sticky  z-10">
        <div className=" md:w-[0.5rem]"></div>
                        <div className="font-bold font-poppins text-xs md:w-[10rem]">{translatedMenuItems[0]} </div>
                        <div className="font-bold font-poppins text-xs md:w-[5.4rem]">{translatedMenuItems[1]} ID</div>
                        <div className="font-bold font-poppins text-xs md:w-[6.4rem]">{translatedMenuItems[2]}</div>
                        <div className="font-bold font-poppins text-xs md:w-[8.4rem]">{translatedMenuItems[3]}</div>
                        <div className="font-bold font-poppins text-xs md:w-[8.4rem]">{translatedMenuItems[4]}</div>
                        <div className="font-bold font-poppins text-xs md:w-[5.4rem]">{translatedMenuItems[5]}</div>
                        <div className="md:w-[1rem]"></div>
        </div>
        {/* <InfiniteScroll
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
className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200
                                     max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-24 max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
                     <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                        <div className=" flex   md:w-[4rem] max-sm:flex-row max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins">
                                {item.newOrderNo}
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
                            {date}
                            </div>
                    
                        </div>



                        <div className=" flex items-center  md:w-[12rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                {item.category}  {item.attribute}
                            </div>

                        </div>


                        <div className=" flex items-center  md:w-[12rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                {item.itemCount}
                            </div>

                        </div>
                        <div className=" flex items-center  md:w-[12rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                {item.status}
                            </div>

                        </div>


                        <div className=" flex   md:w-[7rem] max-sm:flex-row  max-sm:justify-between  ">
                        <Button type="primary" onClick={()=>{setopenInvoiceModal(true);
                     handleSetParticularOrderData(item);
                  }}>{translatedMenuItems[7]}</Button>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">                                                 
                        <div>
                        <Tooltip title={translatedMenuItems[6]}
                        
                                                                
                                                            >
                                                                <EventRepeatIcon

                                                                    className="!text-base cursor-pointer text-[green]"
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
        </InfiniteScroll> */}
      </div>
    
    </>

  </div>
  );



}

const mapStateToProps = ({ order,procre,auth }) => ({
  ecomList: order.ecomList,
  fetchingEcomList: order.fetchingEcomList,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  orderSearch:order.orderSearch
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(

    {


    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderTableC);
