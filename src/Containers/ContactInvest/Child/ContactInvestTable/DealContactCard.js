
import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { MultiAvatar, MultiAvatar2 } from "../../../../Components/UI/Elements";
import "jspdf-autotable";
import {getContactDeal} from "../../ContactInvestAction";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { Button, Tooltip, Dropdown, Menu, Progress } from "antd";
//import { Link } from "react-router-dom/cjs/react-router-dom";
import { CurrencySymbol } from "../../../../Components/Common";
import { BundleLoader } from "../../../../Components/Placeholder";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency'
import EmptyPage from "../../../Main/EmptyPage";
import StairsIcon from '@mui/icons-material/Stairs';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import LocationCityIcon from '@mui/icons-material/LocationCity'; 
import DateRangeIcon from '@mui/icons-material/DateRange';

const ButtonGroup = Button.Group;

const DealContactCard = (props) => {
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
          "218",//4 Values
          "1050",//5 Stage
          "76",//6 Asigned
          "77",//7 Owner
          "9",//8 Action
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
    props.getContactDeal(props.contactiData.contactId);
  }, [props.contactiData.contactId]);
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
    const callPageMapd = props.contactdealAllList && props.contactdealAllList.length &&props.contactdealAllList[0].pageCount
    setTimeout(() => {
      const {
        getContactDeal,

      } = props;
      if  (props.contactdealAllList)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getContactDeal(
            props.userId,page
          );
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };

  function handleSetCurrentLeadsId(item) {
    setCurrentLeadsId(item);
  }
  const { user, deleteLeadsData, handleUpdateLeadsModal, updateLeadsModal, fetchingContactDealList, leadsAllData } = props;

  if (fetchingContactDealList) {
    return <BundleLoader />;
  }

  if (loading) {
    return <div><BundleLoader/></div>;
  }
  return (
    <>
      {/* {props.dealSerachedData.length > 0 ? (
     <Suspense fallback={<BundleLoader />}>
   <SearchedDataDeal
    dealSerachedData={props.dealSerachedData}
    /></Suspense>
  ) : ( */}
      <div class="rounded m-1 p-1 w-[99%] h-[90vh]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className=" flex  w-[100%]  justify-between p-1 bg-transparent font-bold font-poppins !text-lm sticky items-end z-10 max-sm:hidden">
          <div className=" w-[19.5rem] text-[#00A2E8] text-sm  truncate   max-md:w-[14.5rem]">
          <ContactEmergencyIcon className='!text-icon mr-1  '
              />  {translatedMenuItems[0]}
           {/* "name" */}    
          </div>
          <div className="  w-[17.13rem]   truncate   max-md:w-[13.13rem]">
          <LocationCityIcon className='!text-icon  text-[#e4eb2f]'  /> {translatedMenuItems[1]}
         {/* investor" */}     
          </div>
          {/* <div className=" md:w-[9.2rem] font-bold font-poppins text-xs">
          {translatedMenuItems[2]}
                    sponsor     
          </div> */}
          <div className="w-[7.12rem] truncate   max-md:w-[6.12rem] ">
          <DateRangeIcon className="!text-icon "/>  {translatedMenuItems[3]}
                {/* startdate" */}
          </div>
          <div className="w-[6.2rem] truncate   max-md:w-[7.2rem] ">
          <CurrencyExchangeIcon className='!text-icon text-[#4c0827]' />{translatedMenuItems[4]}
         {/* Value */} 
          </div>
          <div className="w-[5.2rem] truncate   max-md:w-[4.2rem] ">
          <StairsIcon className='!text-icon text-[#f19953] '  />  {translatedMenuItems[5]}
          {/* "stage" */}
          </div>
          <div className="w-[6.26rem] truncate   max-md:w-[5.26rem] ">
          <AccountCircleIcon className="!text-icon   text-[#d64933]"/> {translatedMenuItems[6]}
            {/*Assign To */}
            </div>
          <div className="w-[6.21rem] truncate   max-md:w-[7.21rem] ">
          <AccountCircleIcon className="!text-icon   text-[#d64933]"/> {translatedMenuItems[7]}
          {/* Owner */}  
          </div>
       
        </div>
        {/* <InfiniteScroll
          dataLength={props.contactdealAllList.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={fetchingContactDealList ? <div class="flex justify-center">Loading...</div> : null}
          height={"77vh"}
          endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
          style={{scrollbarWidth:"thin"}}
        > */}
          {!fetchingContactDealList && props.contactdealAllList.length === 0 ? <EmptyPage />: props.contactdealAllList.map((item, index) => {
            var findProbability = item.probability;
            item.stageList.forEach((element) => {
              if (element.oppStage === item.oppStage) {
                findProbability = element.probability;
              }
            });
            const currentdate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
           const myIndicator = (item.wonInd) ? <CheckCircleOutlineIcon/> : (item.lostInd ? <DoDisturbIcon/> : null);
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
                className="flex rounded justify-between  bg-white mt-1 items-center py-ygap max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                  <div class="flex max-sm:justify-start max-sm:w-wk max-sm:items-center">
                  <div class="flex justify-between">
                    <div className=" flex font-medium  w-[16rem] border-l-2 border-green-500 bg-[#eef2f9]  max-md:w-[15rem]  max-sm:w-full">
                      <div className="flex max-sm:w-full items-center">
                        <div>
                          <div>
                            <MultiAvatar
                              primaryTitle={item.opportunityName}
                              imageId={item.imageId}
                              imageURL={item.imageURL}
                              imgWidth={"1.8em"}
                              imgHeight={"1.8em"}
                            />
                          </div>
                        </div>
                        <div>

                        </div>
                      
                        <div class="max-sm:w-full w-52" >
                          <Tooltip>
                            <div class="max-sm:w-full max-sm:justify-start flex md:flex-col ml-1">
                            {/* Name */}                                                                      
                              <div class=" text-xs flex text-blue-500  font-poppins font-semibold  cursor-pointer">
                             
                                {item.opportunityName}
                                {/* </Link> */}
                                &nbsp;&nbsp;
                                {date === currentdate ? (
                                  <span class="text-[tomato] text-[0.65rem] mt-[0.4rem] font-bold"
                                  >
                                    New
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
                    <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center">
                    <div className=" flex  items-center justify-start h-8 ml-gap bg-[#eef2f9] w-[14.1rem] max-md:w-[14.1rem] max-sm:flex-row  max-sm:justify-between ">

                      <div class=" text-xs  font-poppins">
                       
                        {item.investor}
                      </div>
                    </div>
                  
                  
                    <div className=" flex  items-center justify-start h-8 ml-gap bg-[#eef2f9] w-[5.01rem] max-md:w-[7.01rem] max-sm:flex-row  max-sm:justify-between ">
                      <div class=" text-xs justify-center  font-poppins">
                        {dayjs(item.startDate).format("DD/MM/YYYY")}
                      </div>
                    </div>
                    </div>

                <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center">
                    <div className=" flex  items-center justify-start h-8 ml-gap bg-[#eef2f9] w-[5.1rem] max-md:w-[8.1rem] max-sm:flex-row  max-sm:justify-between ">
                      <div class=" text-xs font-poppins text-center">
                        <CurrencySymbol currencyType={item.currency} />
                        &nbsp;
                        {item.proposalAmount}
                      </div>
                    </div>

                    <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[4.02rem] max-md:w-[5.02rem] max-sm:flex-row  max-sm:justify-between ">
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
                    <div className=" flex  items-center justify-start h-8 ml-gap bg-[#eef2f9] w-[5.051rem] max-md:w-[5.051rem] max-sm:flex-row  max-sm:justify-between ">
                    {myIndicator}
                    </div>
</div>
<div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                    <div className=" flex  items-center justify-start h-8 ml-gap bg-[#eef2f9] w-[5.01rem] max-md:w-[8.01rem] max-sm:flex-row  max-sm:justify-between ">


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
                    <div className=" flex items-center justify-start h-8 ml-gap bg-[#eef2f9] w-[0rem] max-md:w-20 max-sm:flex-row  mb-1 max-sm:justify-between ">

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
        {/* </InfiniteScroll> */}
      </div>
       {/* )}  */}
    </>
  );
};
const mapStateToProps = ({ auth, leads, deal, sector,contactinvest, pitch }) => ({
  //   leadsAllData: leads.leadsAllData,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  fetchingAllDealsData: deal.fetchingAllDealsData,
  addDrawerPitchNotesModal: pitch.addDrawerPitchNotesModal,
  updatePitchModal: pitch.updatePitchModal,
  openASSImodal: pitch.openASSImodal,
  allDealsData: deal.allDealsData,
  contactdealAllList:contactinvest.contactdealAllList,
  fetchingContactDealList:contactinvest.fetchingContactDealList,
  dealSerachedData: deal.dealSerachedData
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getContactDeal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DealContactCard );
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