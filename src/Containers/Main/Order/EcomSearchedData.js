import React, {  useEffect, useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button} from "antd";
import {
    getEcomList
} from "./OrderAction";
import dayjs from "dayjs";
import UpdateIcon from '@mui/icons-material/Update';
import ContactsIcon from '@mui/icons-material/Contacts';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import EcomStatusCardDrawer from "./EcomStatusCardDrawer";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MergeTypeIcon from '@mui/icons-material/MergeType';

function EcomSearchedData(props) {
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
          "660",// 'Order',//0
          "73", //  'Created', 1
          "248",  // 'Customer',//2
          "1209",// 'Shipping Address',3
           "710",  // 'Billing Address',//4
          "253", // 'Items',//5
           "142",// 'Status',6    
         "1210",  // 'Invoices',7
          "1377",  // 'Ship',8
        "100", //  New 9
        "71" ,//Type 10
        "880",//Inventory 11
        "1169",// Invoice 12
        "1486",// Track 13
        "218",// Value 14
   
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
    <div className=" flex justify-between w-[79%]  p-1 bg-transparent font-poppins text-xs font-bold sticky items-end z-10">
                        <div className="w-[6rem] max-md:w-[6.02rem] text-[#00A2E8] text-sm truncate"> 
                          <DynamicFeedIcon className='!text-icon mr-1 '/>
                          {translatedMenuItems[0]} ID</div>
                        <div className="w-[5.14rem] max-md:w-[5.14rem] truncate">
                          <ContactsIcon className='!text-icon mr-1 text-[#e4eb2f]'/>
                          {translatedMenuItems[1]}</div>
                        <div className="w-[9.4rem] max-md:w-[9.4rem] flex truncate">
                          <ApartmentIcon className='!text-icon  text-[#606C38]'/>
                          {translatedMenuItems[2]}</div>
                        {/* Customer */}
                        <div className="w-[10.4rem] max-md:w-[10.4rem] truncate">
                        <LocationOnIcon className='!text-icon  text-[#2B2D42]'/>
                        {translatedMenuItems[3]}</div>
                        {/* Shipping */}
                        <div className="w-[11.04rem] max-md:w-[11.04rem] truncate">  
                          <TextSnippetIcon className='!text-icon  text-[#457B9D]'/>
                      {translatedMenuItems[4]}</div>
                        {/* Billing */}
                        <div className="w-[4.4rem] max-md:w-[4.4rem] truncate">
                          <AddShoppingCartIcon className='!text-icon  text-[#B23A48]'/>
                          {translatedMenuItems[5]}
                          </div>
                        {/* item */}              
                        <div className="w-[5.8rem] max-md:w-[5.8rem] truncate"> 
                          <UpdateIcon className='!text-icon text-[#ff66b3]' /> 
                          {translatedMenuItems[6]}
                          </div>                 
                        <div className="w-[5.4rem] max-md:w-[5.4rem] truncate"> 
                        < MergeTypeIcon className='!text-icon text-[#c42847] '  /> 
                          {translatedMenuItems[10]}                       
                          </div>                     
        </div>
       
          {props.orderSearch.map((item) => {
            const currentDate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
           
           
            return (
                <div>
                <div
className="flex rounded justify-between  bg-white mt-1 items-center p-1 max-sm:h-[5rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
                     <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                        <div className=" flex  h-8 items-center border-l-2 border-green-500 bg-[#eef2f9] truncate max-md:w-[6rem] w-[6rem] max-sm:flex-row max-sm:justify-between  ">
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
                        <div className=" flex   truncate max-md:w-[10rem] w-[10rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9]  max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins">
                            {date}
                            </div>
                    
                        </div>
                        <div className=" flex   items-center justify-center h-8 ml-gap  bg-[#eef2f9] truncate max-md:w-[12rem] w-[12rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins">
                                {item.category}  {item.attribute}
                            </div>

                        </div>
                        <div className=" flex   items-center justify-center h-8 ml-gap  bg-[#eef2f9] truncate max-md:w-[10rem] w-[10rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins">
                      
                            </div>
                    
                        </div>
                        <div className=" flex   items-center justify-center h-8 ml-gap  bg-[#eef2f9] truncate max-md:w-[6rem] w-[6rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins">
                       
                            </div>
                    
                        </div>
                        <div className=" flex  items-center justify-center h-8 ml-gap  bg-[#eef2f9]  truncate max-md:w-[6rem] w-[6rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins">
                            
                            </div>
                    
                        </div>
                        <div className=" flex  items-center justify-center h-8 ml-gap  bg-[#eef2f9]  truncate max-md:w-[7rem] w-[7rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins">
                              
                            </div>
                    
                        </div>
                        <div className=" flex  items-center justify-center h-8 ml-gap  bg-[#eef2f9]  truncate max-md:w-[7rem] w-[7rem] max-sm:flex-row  max-sm:justify-between  ">
                        <Button type="primary" >{translatedMenuItems[7]}</Button>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center justify-center h-8 ml-gap  bg-[#eef2f9]">                                                 
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
)(EcomSearchedData);
