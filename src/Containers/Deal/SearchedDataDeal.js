
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { MultiAvatar, MultiAvatar2 } from "../../Components/UI/Elements";
import "jspdf-autotable";
import {
  getTeamsDeals
} from "./DealAction";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { Button, Tooltip, Dropdown, Menu, Progress } from "antd";
// import { Link } from "react-router-dom/cjs/react-router-dom";
import { CurrencySymbol } from "../../Components/Common";

const ButtonGroup = Button.Group;

const DealsTeamCardList = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  // useEffect(() => {
  //   props.getTeamsDeals(props.userId,page);
  //   setPage(page + 1);
  //   // props.getSectors();
  //   // props.getCountries();
  // }, []);
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
  // const handleLoadMore = () => {
  //   setPage(page + 1);
  //   props.getTeamsDeals(props.userId,page);
  //  // props.getTeamsDeals("all", page);
  
  // }
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

  // if (fetchingTeamsDealsData) {
  //   return <BundleLoader />;
  // }

  

  return (
    <>
  
      <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className=" flex  w-[100%]  justify-between p-1 bg-transparent font-bold sticky  z-10">
          <div className=" md:w-[14.5rem]">name</div>
          <div className=" md:w-[13.13rem]">investor</div>
          <div className=" md:w-[9.2rem] ">sponsor</div>
          <div className="md:w-[6.12rem]">startdate</div>
          <div className="md:w-[7.2rem]">Value</div>
          <div className="md:w-[4.2rem]">stages</div>
          <div className="md:w-[5.26rem]">Status</div>
          <div className="md:w-[7.21rem]">Assign To</div>
          <div className="md:w-[3rem]">owner</div>

        </div>
       
          {props.dealSerachedData.map((item, index) => {
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
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                  <div class="flex justify-between">
                    <div className=" flex   w-[15rem]   max-sm:w-full">
                      <div className="flex max-sm:w-full items-center">
                        <div>
                          <div>
                            <MultiAvatar
                              primaryTitle={item.opportunityName}
                              imageId={item.imageId}
                              imageURL={item.imageURL}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                          </div>
                        </div>
                        <div class="w-[4%]">

                        </div>

                        <div class="max-sm:w-full w-52" >
                          <Tooltip>
                            <div class="max-sm:w-full max-sm:justify-between flex md:flex-col">
                              {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden">
                                            Name
                                            </div> */}
                              <div class=" text-[0.82rem] flex text-blue-500  font-poppins font-semibold  cursor-pointer">

                                {/* <Link
                                                 toUrl={`customer/${item.customerId}`}
                                                 title={`${item.name}`} 
                                               > */}
                                {item.opportunityName}
                                {/* </Link> */}
                                &nbsp;&nbsp;
                                {date === currentdate ? (
                                  <span class="text-[tomato] mt-[0.4rem] font-bold text-[0.65rem]"

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

                      <div class=" text-sm  font-poppins">
                        {/* <Link to="/investor"> */}
                          {item.investor}
                        {/* </Link> */}
                      </div>
                    </div>

                    <div className=" flex   items-center md:w-[5.01rem] max-sm:flex-row w-full max-sm:justify-between ">


                      <div class=" text-sm  font-poppins">
                        <div>
                          {item.contactName === null ? "None" :
                            <MultiAvatar2
                              primaryTitle={item.contactName}
                              imageId={item.imageId}
                              imageURL={item.imageURL}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex">
                    <div className=" flex  items-center  md:w-[7.01rem] max-sm:flex-row w-full max-sm:justify-between ">


                      <div class=" text-sm justify-center  font-poppins">
                        {dayjs(item.startDate).format("DD/MM/YYYY")}
                      </div>
                    </div>

                    <div className=" flex  items-center  md:w-[8.1rem] max-sm:flex-row w-full max-sm:justify-between ">


                      <div class=" text-sm  font-poppins text-center">
                        <CurrencySymbol currencyType={item.currency} />
                        &nbsp;
                        {item.proposalAmount}

                      </div>
                    </div>
                    <div className=" flex  items-center  md:w-[5.02rem] max-sm:flex-row w-full max-sm:justify-between ">


                      <div class=" text-sm  font-poppins text-center">
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


                      <div class=" text-sm  font-poppins">

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
  allDealsData: deal.allDealsData,
  teamsDealsData:deal.teamsDealsData,
  fetchingTeamsDealsData:deal.fetchingTeamsDealsData,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getTeamsDeals,
      // deletePitchData,
      // handleUpdatePitchModal,
      // setEditPitch,
      // updateTypeForPitch,
      // handlePitchNotesDrawerModal,
      // handleAssimodal

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