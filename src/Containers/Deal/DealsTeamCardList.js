
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { MultiAvatar, MultiAvatar2, SubTitle } from "../../Components/UI/Elements";
import "jspdf-autotable";
import {getTeamsDeals} from "./DealAction";
import { CheckCircleTwoTone, StopTwoTone } from "@ant-design/icons";
import { Button, Tooltip, Dropdown, Menu, Progress } from "antd";
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component";
import { BundleLoader } from "../../Components/Placeholder";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { CurrencySymbol } from "../../Components/Common";
import NodataFoundPage from "../../Helpers/ErrorBoundary/NodataFoundPage";
import SearchedDataDeal from "./SearchedDataDeal";

const ButtonGroup = Button.Group;

const DealsTeamCardList = (props) => {
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
   
         " Name",//0
          "Investor",//1
          "Sponsor",//2
          "Start Date",//3
          "Values",//4
          "Stages",//5
          "Sales Rep",//6
          "Owner",//7
          "Action",//8
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
    props.getTeamsDeals(props.userId,page);
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
    const callPageMapd = props.teamsDealsData && props.teamsDealsData.length &&props.teamsDealsData[0].pageCount
    setTimeout(() => {
      const {
        getTeamsDeals,

      } = props;
      if  (props.teamsDealsData)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getTeamsDeals(
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
  const { user, deleteLeadsData, handleUpdateLeadsModal, updateLeadsModal, fetchingTeamsDealsData, leadsAllData } = props;

  if (fetchingTeamsDealsData) {
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
      <div class="rounded m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex  w-[99%] justify-between p-1 bg-transparent font-bold sticky  z-10">
          <div className=" md:w-[14.5rem]">
          {translatedMenuItems[0]}
           {/* "name" */}    
          </div>
          <div className=" md:w-[13.13rem]">
          {translatedMenuItems[1]}
         {/* investor" */}     
          </div>
          <div className=" md:w-[9.2rem] ">
          {translatedMenuItems[2]}
                    {/* sponsor */}     
          </div>
          <div className="md:w-[6.12rem]">
          {translatedMenuItems[3]}
                {/* startdate" */}
          </div>
          <div className="md:w-[7.2rem]">
          {translatedMenuItems[4]}
         {/* Value */} 
          </div>
          <div className="md:w-[4.2rem]">
          {translatedMenuItems[5]}
          {/* "stages" */}
          </div>
          <div className="md:w-[5.26rem]">
          {translatedMenuItems[6]}
            {/* Status */}
            </div>
          <div className="md:w-[7.21rem]">
          {translatedMenuItems[7]}
          {/* Assign To" */}  
          </div>
          <div className="md:w-[3rem]">
          {translatedMenuItems[8]}
        {/* owner */}
          </div>
        </div>
        <InfiniteScroll
          dataLength={props.teamsDealsData.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={fetchingTeamsDealsData ? <div class="flex justify-center">Loading...</div> : null}
          height={"80vh"}
          endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
          style={{scrollbarWidth:"thin"}}
        >
          {!fetchingTeamsDealsData && props.teamsDealsData.length === 0 ? <NodataFoundPage /> : props.teamsDealsData.map((item, index) => {
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
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                  <div class="flex justify-between">
                    <div className=" flex font-medium  w-[15rem]   max-sm:w-full">
                      <div className="flex max-sm:w-full items-center">
                        <div>
                          <SubTitle>
                            <MultiAvatar
                              primaryTitle={item.opportunityName}
                              imageId={item.imageId}
                              imageURL={item.imageURL}
                              imgWidth={"1.8em"}
                              imgHeight={"1.8em"}
                            />
                          </SubTitle>
                        </div>
                        <div class="w-[4%]">

                        </div>

                        <div class="max-sm:w-full w-52" >
                          <Tooltip>
                            <div class="max-sm:w-full max-sm:justify-between flex md:flex-col">
                            {/* Name */}                                                                      
                              <div class=" text-xs flex text-blue-500  font-poppins font-semibold  cursor-pointer">
                             
                                {item.opportunityName}
                                {/* </Link> */}
                                &nbsp;&nbsp;
                                {date === currentdate ? (
                                  <span class="text-[tomato] mt-[0.4rem] font-bold"
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
                    <div className=" flex   items-center  md:w-[14.1rem] max-sm:flex-row w-full max-sm:justify-between ">

                      <div class=" text-xs  font-poppins">
                        <Link to="/investor">
                          {item.investor}
                        </Link>
                      </div>
                    </div>
                    <div className=" flex   items-center md:w-[5.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" text-xs  font-poppins">
                        <SubTitle>
                          {item.contactName === null ? "None" :
                            <MultiAvatar2
                              primaryTitle={item.contactName}
                              imageId={item.imageId}
                              imageURL={item.imageURL}
                              imgWidth={"1.8em"}
                              imgHeight={"1.8em"}
                            />
                          }
                        </SubTitle>
                      </div>
                    </div>
                  </div>
                  <div class="flex">
                    <div className=" flex  items-center  md:w-[7.01rem] max-sm:flex-row w-full max-sm:justify-between ">


                      <div class=" text-xs justify-center  font-poppins">
                        {dayjs(item.startDate).format("DD/MM/YYYY")}
                      </div>
                    </div>

                    <div className=" flex  items-center  md:w-[8.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" text-xs font-poppins text-center">
                        <CurrencySymbol currencyType={item.currency} />
                        &nbsp;
                        {item.proposalAmount}
                      </div>
                    </div>

                    <div className=" flex items-center  md:w-[5.02rem] max-sm:flex-row w-full max-sm:justify-between ">
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
                    <div className=" flex  items-center  md:w-[5.051rem] max-sm:flex-row w-full max-sm:justify-between ">
                    {myIndicator}
                    </div>
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
  teamsDealsData:deal.teamsDealsData,
  fetchingTeamsDealsData:deal.fetchingTeamsDealsData,
  dealSerachedData: deal.dealSerachedData
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getTeamsDeals,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DealsTeamCardList);
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