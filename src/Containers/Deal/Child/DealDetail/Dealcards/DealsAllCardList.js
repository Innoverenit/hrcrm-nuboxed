
import React, { useEffect, useState,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { MultiAvatar, MultiAvatar2, SubTitle } from "../../../../../Components/UI/Elements";
import "jspdf-autotable";
import { CheckCircleTwoTone, StopTwoTone } from "@ant-design/icons";
import {
  getAllDeals
} from "../../../DealAction";
import { CurrencySymbol } from "../../../../../Components/Common";
import { Button, Tooltip, Dropdown, Menu, Progress } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { Link } from "react-router-dom/cjs/react-router-dom";
import NodataFoundPage from "../../../../../Helpers/ErrorBoundary/NodataFoundPage";
const SearchedDataDeal =lazy(()=>import("../../../SearchedDataDeal"));
const ButtonGroup = Button.Group;

const DealsAllCardList = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [  
          "110",//0  Name
          "511",//1 Investor
          "216",//2 Sponsor
          "176",//3 Start Date
          "1159",//4 Values
          "219",//5 Stages
          "76",//6 assigned
          "77",//7 Owner
          "9",//8 Action
         "100" // New
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
    props.getAllDeals("all", page);
    setPage(page + 1);
    // props.getSectors();
    // props.getCountries();
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
  const [currentLeadsId, setCurrentLeadsId] = useState("");
  const [rowdata, setrowData] = useState({});

  const handleRowData = (data) => {
    setrowData(data);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getAllDeals("all", page);
    setPage(page + 1);
  }
  function handleSetCurrentLeadsId(item) {
    setCurrentLeadsId(item);
  }
  const { user, deleteLeadsData, handleUpdateLeadsModal, updateLeadsModal, fetchingAllDealsData, leadsAllData } = props;

  if (fetchingAllDealsData) {
    return <BundleLoader />;
  }
  if (loading) {
    return <div><BundleLoader/></div>;
  }
  return (
    <>
      {props.dealSerachedData.length > 0 ? (
    <SearchedDataDeal
    dealSerachedData={props.dealSerachedData}
    />
  ) : (
      <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex  w-[100%]  justify-between p-1 bg-transparent font-bold sticky  z-10 max-sm:hidden">
      <div className=" flex justify-between w-[100%]">
          <div className=" font-bold font-poppins text-xs md:w-[14.5rem]">
          {translatedMenuItems[0]}
          {/* name */}
          </div>
          <div className=" font-bold font-poppins text-xs md:w-[13.13rem]">
          {translatedMenuItems[1]}
           {/* investor */}
          </div>
          <div className="font-bold font-poppins text-xs md:w-[9.2rem] ">
          {translatedMenuItems[2]}
          {/* sponsor */}
         
          </div>
          <div className=" font-bold font-poppins text-xs md:w-[6.12rem]">
          {translatedMenuItems[3]}
                     {/* startdate   */}
          </div>
          <div className="font-bold font-poppins text-xs md:w-[7.2rem]">
          {translatedMenuItems[4]}
           {/* Value */}       
          </div>
          <div className="font-bold font-poppins text-xs md:w-[4.2rem]">
          {translatedMenuItems[5]}
          {/* stages" */}
         
          </div>
          <div className="font-bold font-poppins text-xs md:w-[5.26rem]">
          {translatedMenuItems[6]}
            {/* Status */}
            </div>
          <div className="font-bold font-poppins text-xs md:w-[7.21rem]">
          {translatedMenuItems[7]}
          {/* Assign To" */}
       
          </div>
          {/* <div className=" font-bold font-poppins text-xs md:w-[3rem]">
          {translatedMenuItems[8]} */}
              {/* owner" */}
 </div>
        </div>
        <InfiniteScroll
          dataLength={props.allDealsData.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={fetchingAllDealsData ? <div class="flex justify-center">Loading...</div> : null}
          height={"80vh"}
          style={{ scrollbarWidth: "thin"}}
        >
          {!fetchingAllDealsData && props.allDealsData.length === 0 ? <NodataFoundPage /> : props.allDealsData.map((item, index) => {
            var findProbability = item.probability;
            item.stageList.forEach((element) => {
              if (element.oppStage === item.oppStage) {
                findProbability = element.probability;
              }
            });
            const currentdate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
            const myIndicator = (item.wonInd) ? <CheckCircleTwoTone/> : (item.lostInd ? <StopTwoTone/> : null);
            const diff = Math.abs(
              dayjs().diff(dayjs(item.lastRequirementOn), "days")
            );
            const dataLoc = ` Address : ${item.address && item.address.length && item.address[0].address1
              } 
               Street : ${item.address && item.address.length && item.address[0].street
              }   
              State : ${item.address && item.address.length && item.address[0].state
              }
             Country : ${(item.address && item.address.length && item.address[0].country) ||
              ""
              } 
               PostalCode : ${item.address && item.address.length && item.address[0].postalCode
              } `;
            return (
              <div>
              <div
             className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
           >
               <div class="flex max-sm:justify-start max-sm:w-wk max-sm:items-center">
               <div class="flex justify-between">
                 <div className=" flex  w-[15rem]   max-sm:w-full">
                   <div className="flex max-sm:w-full items-center">
                     <div>
                       <SubTitle>
                         <MultiAvatar
                           primaryTitle={item.opportunityName}
                           imageId={item.imageId}
                           imageURL={item.imageURL}
                           imgWidth={"1.8rem"}
                           imgHeight={"1.8rem"}
                         />
                       </SubTitle>
                     </div>
                     <div >

                     </div>

                     <div class="max-sm:w-full w-52" >
                       <Tooltip>
                         <div class="max-sm:w-full max-sm:justify-start flex md:flex-col">
                                    {/* Name */}
                                    
                           <div class="text-xs flex text-blue-500  font-poppins font-semibold  ">                            
                             {item.opportunityName}
                             {/* </Link> */}
                             &nbsp;&nbsp;
                             {date === currentdate ? (
                               <span class="text-[tomato]  text-[0.65rem] mt-[0.4rem] font-bold"

                               >
                                {translatedMenuItems[9]} {/* New */}
                               </span>
                             ) : null}

                           </div>
                         </div>
                       </Tooltip>
                     </div>
                     </div>
                   </div>
                 </div>
                 </div>
                 <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                 <div className=" flex  items-center  md:w-[14.1rem] max-sm:flex-row w-full max-sm:justify-between ">

                   <div class=" text-xs  font-poppins">
                     <Link to="/investor">
                       {item.investor}
                     </Link>
                   </div>
                 </div>

                 <div className=" flex  items-center md:w-[5.01rem] max-sm:flex-row w-full max-sm:justify-between ">

                   <div class=" text-xs font-poppins">
                     <SubTitle>
                       {item.contactName === null ? "None" :
                         <MultiAvatar2
                           primaryTitle={item.contactName}
                           imageId={item.imageId}
                           imageURL={item.imageURL}
                           imgWidth={"1.8rem"}
                           imgHeight={"1.8rem"}
                         />
                       }
                     </SubTitle>
                   </div>
                 </div>
              
             
                 <div className=" flex  items-center  md:w-[7.01rem] max-sm:flex-row w-full max-sm:justify-between ">

                   <div class=" text-xs justify-center  font-poppins">
                     {dayjs(item.startDate).format("DD/MM/YYYY")}
                   </div>
                 </div>
</div>
                 <div className=" flex  items-center  md:w-[8.1rem] max-sm:flex-row  max-sm:justify-evenly w-wk ">

                   <div class=" text-xs  font-poppins text-center">
                     <CurrencySymbol currencyType={item.currency} />
                     &nbsp;
                     {item.proposalAmount}

                   </div>
                
                 <div className=" flex items-center  md:w-[5.02rem] max-sm:flex-row w-full max-sm:justify-evenly  ">

                   <div class=" text-xs  font-poppins text-center">
                     <Dropdown
                       overlay={
                         <div>
                           <Menu mode="horizontal">
                             <Menu.Item
                               style={{
                                 paddingLeft: 5,
                                 paddingRight: 5,
                                 backgroundColor: "#F5F5F5",
                               }}
                             >
                             </Menu.Item>
                           </Menu>
                         </div>
                       }
                       trigger={["click"]}
                     >
                       <Tooltip title={item.stageName}>
                         {" "}
                         <Progress
                           type="circle"
                           style={{ cursor: "pointer", color: "red", fontSize: "0.8rem" }}
                           percent={findProbability}
                           width={30}
                           strokeColor={"#005075"}
                         />
                       </Tooltip>
                     </Dropdown>
                   </div>
                 </div>
                 </div>
                 <div className=" flex items-center  md:w-[5.051rem] max-sm:flex-row w-full max-sm:justify-between ">
                 {myIndicator}
                 </div>
                 
                 <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center">
                 <div className=" flex  items-center  md:w-[8.01rem] max-sm:flex-row w-full max-sm:justify-between ">

                   <div class=" text-xs  font-poppins">

                     <span>
                       {item.assignedTo === null ? (
                         "None"
                       ) : (
                         <>
                           {item.assignedTo === item.ownerName ? (

                             null
                           ) : (
                             <MultiAvatar2
                               primaryTitle={item.assignedTo}
                               imgWidth={"1.8rem"}
                               imgHeight={"1.8rem"}
                             />
                           )}
                         </>
                       )}
                     </span>

                   </div>
                 </div>
                 <div className=" flex  items-center  md:w-20 max-sm:flex-row w-full mb-1 max-sm:justify-between ">

                   <span>
                     <MultiAvatar2
                       primaryTitle={item.ownerName}
                       imageId={item.ownerImageId}
                       imgWidth={"1.8rem"}
                       imgHeight={"1.8rem"}
                     />
                   </span>
                 </div>
            </div>
             </div>
           </div>
            )
          })}
        </InfiniteScroll>
      </div>
        )} 
      {/* <UpdateLPitchModal
        item={currentLeadsId}
        updatePitchModal={props.updatePitchModal}
        // updateLeadsModal={updateLeadsModal}
        handleUpdatePitchModal={props.handleUpdatePitchModal}
        // handleSetCurrentLeadsId={handleSetCurrentLeadsId}
      /> */}
      {/* <AddLeadsEmailDrawerModal
        item={currentLeadsId}
        handleSetCurrentLeadsId={handleSetCurrentLeadsId}
        addDrawerLeadsEmailModal={props.addDrawerLeadsEmailModal}
        handleLeadsEmailDrawerModal={props.handleLeadsEmailDrawerModal}
      /> */}
      {/* <OpenASSimodal 
        rowdata={rowdata}
        openASSImodal={props.openASSImodal}
      handleAssimodal={props.handleAssimodal}
      />
         <AddPitchNotesDrawerModal 
       item={currentLeadsId}
        addDrawerPitchNotesModal={props.addDrawerPitchNotesModal}
        handlePitchNotesDrawerModal={props.handlePitchNotesDrawerModal}
      /> */}
    </>
  );
};

const mapStateToProps = ({ auth, leads, deal, sector, pitch }) => ({
  //   leadsAllData: leads.leadsAllData,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  fetchingAllDealsData: deal.fetchingAllDealsData,
  addDrawerPitchNotesModal: pitch.addDrawerPitchNotesModal,
  updatePitchModal: pitch.updatePitchModal,
  openASSImodal: pitch.openASSImodal,
  allDealsData: deal.allDealsData,
  dealSerachedData: deal.dealSerachedData
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllDeals,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DealsAllCardList);
function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
  if (role === type) {
    size = "1.37em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.37em",
          borderColor: "transparent",
          color: role === type ? "#1890ff" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        <i className={`${iconType}`} style={{ fontSize: "1.1rem" }}></i>
      </Button>
    </Tooltip>
  );
}