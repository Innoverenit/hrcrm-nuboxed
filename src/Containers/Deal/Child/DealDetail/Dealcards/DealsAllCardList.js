
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { MultiAvatar, MultiAvatar2, SubTitle } from "../../../../../Components/UI/Elements";
import "jspdf-autotable";
import { OnlyWrapCard } from '../../../../../Components/UI/Layout'
import {
  getAllDeals
} from "../../../DealAction";
import { CurrencySymbol } from "../../../../../Components/Common";
import { Button, Tooltip, Dropdown, Menu, Progress } from "antd";
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { Link } from "react-router-dom/cjs/react-router-dom";
import NodataFoundPage from "../../../../../Helpers/ErrorBoundary/NodataFoundPage";

const ButtonGroup = Button.Group;

const DealsAllCardList = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
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

  

  return (
    <>
     <div class="rounded-lg m-5 max-sm:m-1 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
     <div className=" flex max-sm:hidden justify-between w-[99%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" w-[13.12rem] max-xl:w-[11.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                  id="app.name"
                  defaultMessage="name"
                /></div>
        <div className=" w-[6.21rem] max-xl:w-[7.21rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                  id="app.investor"
                  defaultMessage="investor"
                /></div>
        <div className=" w-[9.21rem] max-xl:w-[6.21rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] "><FormattedMessage
                  id="app.sponsor"
                  defaultMessage="sponsor"
                /></div>
        <div className="w-[7.11rem] max-xl:w-[7.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                  id="app.startdate"
                  defaultMessage="startdate"
                /></div>
        <div className="w-[11.16rem] max-xl:w-[9.16rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                  id="app.proposalamt"
                  defaultMessage="proposalamt"
                /></div>
        <div className="w-[5.14rem] max-xl:w-[6.14rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                  id="app.stages"
                  defaultMessage="stages"
                /></div> 
        <div className="w-[7.1rem] max-xl:w-[7.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                  id="app.salesRep"
                  defaultMessage="salesRep"
                /></div>
        <div className="w-[3.22rem] max-xl:w-[5.21rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                  id="app.owner"
                  defaultMessage="owner"
                /></div>
        <div className="w-[3.71rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"></div>
       
      </div>
        <InfiniteScroll
          dataLength={props.allDealsData.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={fetchingAllDealsData ? <div class="flex justify-center">Loading...</div> : null}
          height={"75vh"}
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
                      className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3 max-sm:h-[9rem] max-sm:flex-col"
                      
                    >
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex font-medium  w-[13.1rem] max-xl:w-[8.1rem] max-lg:w-[6.1rem] max-sm:flex-row max-sm:w-auto  items-center">
                                <div>
            <MultiAvatar
              primaryTitle={item.opportunityName}
              imageId={item.imageId}
              // imageURL={imageURL}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
</div>
                                   <div class="w-[4%]">

                                   </div>
                                   
                                        <Tooltip>
                                        <div class=" flex max-sm:w-full  flex-row md:flex-col">
                                            {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">
                                            Name
                                            </div> */}
                                            <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold cursor-pointer">
                                            <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm cursor-pointer"  to={`dealDetails/${item.invOpportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
    </Link> 
                                            {/* <Link
                        toUrl={`dealDetails/${item.invOpportunityId}`}
                        title={`${item.opportunityName}`}
                      >
                        {item.opportunityName}
                      </Link> */}
                      &nbsp;&nbsp;
        {/* {date === currentdate ? (
          <span
            style={{
              color: "tomato",
              fontWeight: "bold",
            }}
          >
            New
          </span>
        ) : null} */}
       
                                            </div>
</div>
                                        </Tooltip>
                              
                                </div>

                                <div className=" flex font-medium flex-col  w-[8.1rem] max-xl:w-[5.8rem] max-lg:w-[4.8rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                           
                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                                    <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">   
                                    <Link to ="/investor">
                        {item.investor}
                        </Link>
                                    </div>
                                </div>
                                </div>
                               
                               
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex font-medium flex-col w-[9.4rem] max-xl:w-[4.4rem] max-lg:w-[3.4rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  

                                  {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Country</div> */}
                                  <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                 
          {item.contactName === null ? "None" :
            <MultiAvatar2
              primaryTitle={item.contactName}
              imageId={item.imageId}
               imageURL={item.imageURL}
              imgWidth={"1.8em"}
              imgHeight={"1.8em"}
            />
          }
        
                                  </div>
                              </div>
                                <div className=" flex font-medium flex-col w-[7.2rem] max-xl:w-[5.2rem] max-lg:w-[4.21rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    {dayjs(item.startDate).format("DD/MM/YYYY")}
                                    </div>
                                </div>
                             
                                <div className=" flex font-medium flex-col w-[8.2rem] max-xl:w-[4.2rem] max-lg:w-[4.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-sm text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    <CurrencySymbol currencyType={item.currency} />
            &nbsp;
            {item.proposalAmount}

                                    </div>
                                </div>
                                </div>
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex font-medium flex-col w-[11.1rem] max-xl:w-[8.11rem] max-lg:w-[6.11rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-sm text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
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
                  style={{ cursor: "pointer", color: "red",fontSize:"0.8rem" }}
                  percent={findProbability}
                  width={30}
                  strokeColor={"#005075"}
                />
              </Tooltip>
            </Dropdown>

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col w-[8.1rem] max-xl:w-[5.8rem] max-lg:w-[4.8rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Assigned to</div> */}

                                    <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    
                                    <span>
                                    <MultiAvatar2
              primaryTitle={item.assignedTo}
              imgWidth={"1.8em"}
              imgHeight={"1.8em"}
            />
            </span>
             
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col w-[7.5rem] max-xl:w-[7.5rem] max-lg:w-[4.5rem] max-sm:flex-row max-sm:w-auto mb-1 max-sm:justify-between ">
                       
                       {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Owner</div> */}

              <Tooltip title={item.ownerName}>
          <span>
            <MultiAvatar2
              primaryTitle={item.ownerName}
              imageId={item.ownerImageId}
                imageURL={item.imageURL}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
            </span>
            </Tooltip>
                   </div>
                   </div>
                  
                            </div>
                        </div>


            )
          })}
        </InfiniteScroll>
      </div>
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
  allDealsData: deal.allDealsData
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllDeals,
      // deletePitchData,
      // handleUpdatePitchModal,
      // setEditPitch,
      // updateTypeForPitch,
      // handlePitchNotesDrawerModal,
      // handleAssimodal

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