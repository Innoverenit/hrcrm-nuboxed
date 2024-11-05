import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Select,Checkbox } from "antd";
import dayjs from "dayjs";
import {  DeleteOutlined } from "@ant-design/icons";
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import {getNewArrivalList,
  deleteNewArrival,
} from "./SuppliesAction";
import { BundleLoader } from "../../../Components/Placeholder";
import SuppliesListOfItemNewArrival from "./SuppliesListOfItemNewArrival";
import ContactListOfItemNewArrival from "./ContactListOfItemNewArrival";
import EmptyPage from "../EmptyPage";


function NewArrivalListData(props) {

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [contacrOpen,setcontactOpen] = useState(false);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [         
            "110",//0 Name
       
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
    props.getNewArrivalList(props.orgId);
  }, []);

  const [RowData, setRowData] = useState("");
  function handleCurrentRowData(datas) {
    setRowData(datas);
  }
  function handleOpen(item) {
    setOpen(item);
  }
  function handleContactOpen(item) {
    setcontactOpen(item);
  }
  const {
    newArrivalDataList,
    deleteNewArrival,
    fetchingNewArrivalList
  } = props;
 

 // const packingNumbers = newArrivalDataList.map(item => item.newArrivals);

  return (
    <>

  <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  max-sm:w-wk overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between max-sm:hidden  w-[89%]  p-1 bg-transparent font-bold text-xs font-poppins sticky  z-10">
          <div className="w-2">Date</div>
        
          <div className="w-12">Items</div>
          <div className="w-20">Contact #</div>
      </div>
      {!fetchingNewArrivalList && newArrivalDataList.length === 0 ?<EmptyPage />:newArrivalDataList.map((item,index) =>  {
         const date = dayjs(item.creationDate).format("DD/MM/YYYY");
     
         return (
                       
                        <div>
                            <div 
              className="flex rounded justify-between  bg-white mt-1  items-center  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:h-[10rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" 
            >
                                     <div class="flex max-sm:justify-between h-8 max-sm:w-wk max-sm:items-center">
                                     <div className=" flex items-center w-[32rem] max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  
                                   {date}
                                </div>
                                <div className=" flex items-center cursor-pointer text-blue-500 w-[35rem] max-xl:w-[5.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between "
                                onClick={() => {
                                  handleOpen(true);
                                  handleCurrentRowData(item);
                                }}
                                >
                                  
                                  {item.itmCnt}
                               </div>
                               <div className=" flex items-center w-[8rem] cursor-pointer text-blue-500 max-xl:w-[5.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between "
                                onClick={() => {
                                  handleContactOpen(true);
                                  handleCurrentRowData(item);
                                }}
                                >
                                  
                                  {item.usrCnt}
                               </div>
                               <div className=" flex items-center  max-xl:w-[5.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  
                               <div >
            <StyledPopconfirm
                        title="Do you want to delete?"
                        onConfirm={() =>
                          deleteNewArrival(props.orgId)
                        }
                      >
                         <Tooltip title="Delete" >
                       
                          <DeleteOutlined
                            type="delete"
                            className="!text-icon text-[red] cursor-pointer max-sm:!text-xl"
                          />
                       
                        </Tooltip>
                      </StyledPopconfirm>        
                  </div>
                               </div>
                                </div>
                               
                            </div>
                        </div>
                      
                         )
                  
                })}

     </div>
     

 
 <Suspense fallback={<BundleLoader />}>
 <SuppliesListOfItemNewArrival
     handleOpen={handleOpen}
     open={open}
     RowData={RowData}
     />
     <ContactListOfItemNewArrival
     handleContactOpen={handleContactOpen}
     contacrOpen={contacrOpen}
     RowData={RowData}
     />
      </Suspense>
    </>
  );
}

const mapStateToProps = ({
  auth,
  supplies
}) => ({
  userId: auth.userDetails.userId,
  newArrivalDataList:supplies.newArrivalDataList,
  orgId: auth.userDetails.organizationId,
  fetchingNewArrivalList:supplies.fetchingNewArrivalList
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getNewArrivalList,
      deleteNewArrival,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(NewArrivalListData);
