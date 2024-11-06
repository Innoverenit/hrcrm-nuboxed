
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { MultiAvatar, MultiAvatar2, SubTitle } from "../../Components/UI/Elements";
import "jspdf-autotable";
import {
    getDeletedDeal
} from "./DealAction";
import { Button, Tooltip, Dropdown, Menu, Progress } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { BundleLoader } from "../../Components/Placeholder";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { CurrencySymbol } from "../../Components/Common";
import EmptyPage from "../Main/EmptyPage";
const ButtonGroup = Button.Group;

const DealDeletedCard = (props) => {
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
          "76",//6 Sales Rep
          "77",//7 Owner
         
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
    props.getDeletedDeal(page);
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
    props.getDeletedDeal( page);
    setPage(page + 1);
  }
  function handleSetCurrentLeadsId(item) {
    setCurrentLeadsId(item);
  }
  const { user, deleteLeadsData, handleUpdateLeadsModal, updateLeadsModal, fetchingDeletedDeal, leadsAllData } = props;

  if (fetchingDeletedDeal) {
    return <BundleLoader />;
  }
  if (loading) {
    return <div><BundleLoader/></div>;
  }
  return (
    <>
      <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex  w-[100%]  justify-between p-1 bg-transparent font-bold sticky  z-10 max-sm:hidden">
        <div className=" flex justify-between w-[95%]">
          <div className=" font-bold font-poppins text-xs w-[15.5rem] md:w-[11.5rem]">
          {translatedMenuItems[0]} </div>
          {/* Name */}
          <div className=" font-bold font-poppins text-xs w-[9.1rem] md:w-[7.1rem]">  {translatedMenuItems[1]} </div>
          {/* investor */}
          <div className="  font-bold font-poppins text-xs w-[15.2rem] md:w-[7.2rem] ">  {translatedMenuItems[2]}</div>
          {/* Sponsor */}
          <div className=" font-bold font-poppins text-xs w-[11.1rem] md:w-[8.1rem]">  {translatedMenuItems[3]}</div>
          {/* startDate */}
          <div className=" font-bold font-poppins text-xs w-[7.5rem] md:w-[6.5rem]">  {translatedMenuItems[4]}</div>
          {/* Value */}
          <div className=" font-bold font-poppins text-xs md:w-[4.2rem]">  {translatedMenuItems[5]}</div>
          {/* Stages */}
          <div className=" font-bold font-poppins text-xs md:w-[7.1rem]">  {translatedMenuItems[6]}</div>
          {/* assignedTo */}
          <div className=" font-bold font-poppins text-xs md:w-[3rem]">  {translatedMenuItems[7]}</div>
            {/* owner  */}
        </div>
        </div>
        <InfiniteScroll
          dataLength={props.deletedDeal.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={fetchingDeletedDeal ? <div class="flex justify-center">Loading...</div> : null}
          height={"83vh"}
          style={{scrollbarWidth:"thin"}}
        >
          {!fetchingDeletedDeal && props.deletedDeal.length === 0 ? <EmptyPage/> : props.deletedDeal.map((item, index) => {
            var findProbability = item.probability;
            item.stageList.forEach((element) => {
              if (element.oppStage === item.oppStage) {
                findProbability = element.probability;
              }
            });
            const currentdate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");

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
                <div className="flex justify-between rounded  mt-2 bg-white h-8 items-center p-1  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
          
                >
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                  <div class="flex justify-between">
                    <div className=" flex  w-[12rem]  border-l-2 border-green-500 bg-[#eef2f9] max-sm:w-full">
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
                        <div>
                        </div>
                        <div class="max-sm:w-full" >
                          <Tooltip>
                            <div class=" ml-3 max-sm:w-full max-sm:justify-between flex md:">                           
                                            {/* Name */}
                                       
                              <div class=" text-[0.82rem] flex text-blue-500  font-poppins font-semibold  ">
                                            {/* link */}                          
                                {item.opportunityName}
                                {/* </Link> */}
                                &nbsp;&nbsp;
                                {date === currentdate ? (
                                  <span class="text-[tomato] mt-[0.4rem] text-[0.65rem] font-bold"
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
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                    <div className=" flex   md:w-44 max-sm:flex-row w-full max-sm:justify-between items-center justify-center h-8 ml-gap bg-[#eef2f9] ">
                      <div class="text-xs  font-poppins">
                        <Link to="/investor">
                          {item.investor}
                        </Link>
                      </div>
                    
</div>
                    <div className=" flex  md:w-44 max-sm:flex-row w-full max-sm:justify-between items-center justify-center h-8 ml-gap bg-[#eef2f9] ">
                      <div class="text-xs  font-poppins">
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
                             
                    <div className=" flex  md:w-36 max-sm:flex-row w-full max-sm:justify-between items-center justify-center h-8 ml-gap bg-[#eef2f9] ">
                      <div class="text-xs justify-center  font-poppins">
                        {dayjs(item.startDate).format("DD/MM/YYYY")}
                      </div>
                    </div>
</div>
             <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                    <div className=" flex md:w-36 max-sm:flex-row w-full max-sm:justify-between items-center justify-center h-8 ml-gap bg-[#eef2f9] ">
                      <div class="text-xs  font-poppins text-center">
                        <CurrencySymbol currencyType={item.currency} />
                        &nbsp;
                        {item.proposalAmount}
                      </div>
                    </div>
                    <div className=" flex  md:w-36 max-sm:flex-row w-full max-sm:justify-between  items-center justify-center h-8 ml-gap bg-[#eef2f9]">
                      <div class="text-xs  font-poppins text-center">
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
                    <div className=" flex  md:w-32 max-sm:flex-row w-full max-sm:justify-between items-center justify-center h-8 ml-gap bg-[#eef2f9] ">
                      <div class="text-xs  font-poppins">
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
                    </div>
                    <div className=" flex md:w-20 max-sm:flex-row w-full mb-1 max-sm:justify-between items-center justify-center h-8 ml-gap bg-[#eef2f9]">
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
            )
          })}
        </InfiniteScroll>
      </div>    
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
  deletedDeal:deal.deletedDeal,
  fetchingDeletedDeal:deal.fetchingDeletedDeal,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getDeletedDeal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DealDeletedCard);
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