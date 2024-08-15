import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Tooltip, Menu, Dropdown, Progress } from "antd";
import { CurrencySymbol } from "../../../../Components/Common";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LockIcon from "@mui/icons-material/Lock";
import { DeleteOutlined } from "@ant-design/icons";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import {
  MultiAvatar,
  MultiAvatar2,
} from "../../../../Components/UI/Elements";
import {getOpenOppListOfJumpstart} from "../../CustomerAction"

import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../Components/Placeholder";


function CustrOpenOpportunityJumpstartCardList(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    props.getOpenOppListOfJumpstart(props.customer.customerId,);
    // setPage(page + 1);
  }, []);
    const [currentOpportunityId, setCurrentOpportunityId] = useState("");
    function handleSetCurrentOpportunityId(opportunityId,opportunityName) {
      setCurrentOpportunityId(opportunityId,opportunityName);
    }
    const {
        user,
        fetchingCustOpenOppJumpstart,
    handleUpdateOpportunityModal,
    updateOpportunityModal,
    addDrawerOpportunityNotesModal,
    handleOpportunityNotesDrawerModal,
    deleteOpportunityData,
     fetchingAllOpportunities,
     openOppOfCustJumpstart,
     
      } = props;

      if (fetchingCustOpenOppJumpstart) {
        return <BundleLoader />;
      }

      return (    
  <>
  <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex max-sm:hidden  w-[100%]  max-xl:w-[82%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" w-[13.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[31.8rem] max-lg:w-[29.8rem]">Quotation ID</div>
        <div className=" w-[12.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[13.2rem] max-lg:w-[11.2rem]">Sponsor</div>
        <div className="w-[8.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Start Date</div>
        <div className="w-[9.3rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[13.3rem]">Value</div>
        <div className="w-[8.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.1rem]">Sales Rep</div>
        <div className="w-[2.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.2rem]">Owner</div>
    
        <div className="w-12"></div>
      </div>
 
{ !fetchingCustOpenOppJumpstart && openOppOfCustJumpstart.length === 0 ?<NodataFoundPage />:openOppOfCustJumpstart.map((item,index) =>  {
                 
                 var findProbability = item.probability;
                 item.stageList.forEach((element) => {
                   if (element.oppStage === item.oppStage) {
                     findProbability = element.probability;
                   }
                 });
                 return (
                    <div>
                    <div
                      className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col"
                      
                    >
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex font-medium  w-[16rem] max-lg:w-[10rem] max-sm:flex-row  max-sm:w-auto ">
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
                                            {/* <div class=" text-xs  font-poppins max-sm:hidden">
                                            Name
                                            </div> */}
                                            <div class=" text-sm text-blue-500  font-poppins font-semibold cursor-pointer">
                                                
                                            <Link class="overflow-ellipsis whitespace-nowrap max-sm:text-sm h-8 text-sm p-1 max-xl:text-[0.65rem] max-lg:text-[0.45rem] text-[#042E8A] cursor-pointer"  to={`opportunity/${item.opportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
    </Link>
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

                               
                                </div>
                                
                               
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex font-medium flex-col w-[7rem] max-xl:w-[4rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  

                                  {/* <div class=" text-xs  font-poppins max-sm:hidden">Country</div> */}
                                  <div class=" text-sm  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                  
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
                                <div className=" flex font-medium flex-col w-[9.1rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto  max-sm:flex-row  max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                    {dayjs(item.startDate).format("ll")}
                                    </div>
                                </div>
                             
                                <div className=" flex font-medium flex-col w-[10.1rem] max-xl:w-[5.1rem] max-sm:w-auto  max-sm:flex-row  max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-sm  font-poppins text-center max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                    
                                    {item.currency}  {item.proposalAmount}
           

                                    </div>
                                </div>
                                
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    {/* <div class=" text-sm  font-poppins text-center">
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
                  className=" !text-base cursor-pointer text-[red]"
                 
                  percent={findProbability}
                  width={30}
                  strokeColor={"#005075"}
                />
              </Tooltip>
            </Dropdown>

                                    </div> */}
                              
                                <div className=" flex font-medium flex-col w-32 max-xl:w-[5.12rem] max-lg:w-[3.12rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Assigned</div> */}

                                    <div class=" text-sm  font-poppins max-sm:text-sm">
                                    
                                    <span>
                                    <MultiAvatar2
              primaryTitle={item.assignedTo}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
            </span>
             
                                    </div>
                                </div>
                                </div>
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex font-medium flex-col w-20 max-xl:w-[2rem] max-lg:w-[4rem] max-sm:w-auto max-sm:flex-row  mb-1 max-sm:justify-between ">
                       
                       {/* <div class=" text-xs  font-poppins max-sm:hidden">Owner</div> */}

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
      
    
      </div>

   


    </>
  );
}


const mapStateToProps = ({ auth, account, customer }) => ({
    openOppOfCustJumpstart:customer.openOppOfCustJumpstart,
    fetchingCustOpenOppJumpstart:customer.fetchingCustOpenOppJumpstart,

  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
     
        getOpenOppListOfJumpstart
    },
    dispatch
  );
export default connect(
mapStateToProps,
mapDispatchToProps
)(CustrOpenOpportunityJumpstartCardList);
