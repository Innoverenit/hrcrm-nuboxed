import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import ExploreIcon from "@mui/icons-material/Explore";
import {  DeleteOutlined } from "@ant-design/icons";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ArticleIcon from '@mui/icons-material/Article';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import InfiniteScroll from "react-infinite-scroll-component"; 
import { Tooltip, Select,Checkbox } from "antd";
import dayjs from "dayjs";
import {
  MultiAvatar,
  MultiAvatar2,
} from "../../../Components/UI/Elements";
import { Link } from 'react-router-dom';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency'
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import ReactCountryFlag from 'react-country-flag';
import {getBestBeforeEmailList,
  deleteNewArrival,
} from "./SuppliesAction";
import { BundleLoader } from "../../../Components/Placeholder";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";

const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function BestbeforeEmailList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [         
            "110",//0 Name
            "278",//1Sector
            "490",//2Deals
            "144",//3In Progress
            "579",//4signed
            "14",//5 Category
            "279",//6Source
            "589",//7 First Meeting
            "1161",//8 Shares
            "218",//9Value
            "592",//10Club
            "76",//11 Assigned
            "77",//12 Owner
          "138",//  document     13  
          "392", // pulse14 
          "185", // 185ADDress 15
          "316", // notes 16
          "608",// investor contact 17 
          "170",// 170edit  18 
          "84", // 84delete 19
          "1581", //Score
       
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
    window.addEventListener('error', e => {
      if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'Script error.') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        )
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        )
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    })
    props.getBestBeforeEmailList(props.orgId);

  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const [RowData, setRowData] = useState("");

  function handleCurrentRowData(datas) {
    setRowData(datas);
  }


//   const handleLoadMore = () => {
//     const callPageMapd = props.newArrivalDataList && props.newArrivalDataList.length &&props.newArrivalDataList[0].pageCount
//     setTimeout(() => {
//       const {
//         getBestBeforeEmailList, 
//       } = props;
//       if  (props.newArrivalDataList)
//       {
//         if (page < callPageMapd) {
//           setPage(page + 1);
//           getBestBeforeEmailList(
//                   props.currentUser ? props.currentUser : props.userId,
//                   page,
//                   props.filter?props.filter:"creationdate"
//                 );
//       }
//       if (page === callPageMapd){
//         setHasMore(false)
//       }
//     }
//     }, 100);
//   };
  const {
    newArrivalDataList,
    deleteNewArrival,
  } = props;
  console.log("ee");
 
  if (loading) {
    return <div><BundleLoader/></div>;
  }
  const packingNumbers = newArrivalDataList.map(item => item.newArrivals);
  console.log(packingNumbers)
  return (
    <>

  <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  max-sm:w-wk overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between max-sm:hidden  w-[89%]  p-1 bg-transparent font-bold text-xs font-poppins sticky  z-10">
          <div className="w-2">Date</div>
        
          <div className="w-12">Item</div>
          <div className="w-20">Contact #</div>
      </div>
        {/* <InfiniteScroll
        dataLength={newArrivalDataList.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingInvestors?<div  class="flex justify-center">Loading...</div>:null}
        height={"83vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      > */}
   
        { newArrivalDataList.map((item,index) =>  {
         const date = dayjs(item.date).format("DD/MM/YYYY");
     
         return (
                       
                        <div>
                            <div 
              className="flex rounded justify-between  bg-white mt-1  items-center  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:h-[10rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" 
            >
                                     <div class="flex max-sm:justify-between h-8 max-sm:w-wk max-sm:items-center">
                                     <div className=" flex items-center  max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  
                                   {date}
                                </div>
                               
                                </div>
                               
                            </div>
                        </div>
                      
                         )
                  
                })}

     {/* </InfiniteScroll>  */}
     </div>
 
 <Suspense fallback={<BundleLoader />}>
     
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
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getBestBeforeEmailList,
      deleteNewArrival,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(BestbeforeEmailList);
