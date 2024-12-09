import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {getAllRequirementTable,ClearReducerDataOfRequirement} from "../Requirement/RequirementAction"
import InfiniteScroll from "react-infinite-scroll-component";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import CategoryIcon from '@mui/icons-material/Category';
import EventIcon from '@mui/icons-material/Event';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import PortraitIcon from '@mui/icons-material/Portrait';
import ContactsIcon from '@mui/icons-material/Contacts';
import { BundleLoader } from "../../Components/Placeholder";
import NodataFoundPage from "../../Helpers/ErrorBoundary/NodataFoundPage";
import EmptyPage from "../Main/EmptyPage";


const RequirementTable = (props) => {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        props.getAllRequirementTable(props.userId,page)
        props.ClearReducerDataOfRequirement()
    }, []);
    const handleLoadMore = () => {
      const callPageMapd = props.requirementTable && props.requirementTable.length &&props.requirementTable[0].pageCount
      setTimeout(() => {
        const {
          getAllRequirementTable, 
        } = props;
        if  (props.requirementTable)
        {
          if (page < callPageMapd) {
            setPage(page + 1);
            getAllRequirementTable( "All", page,);
        }
        if (page === callPageMapd){
          setHasMore(false)
        }
      }
      }, 100);
    };


    return (
        <div className="flex flex-col w-full p-4">
            <div className="flex sticky z-auto">
                    <div className="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                        <div className="flex justify-between w-[99.5%] p-1 bg-transparent font-bold sticky z-10">
                           
                        <div className=" max-md:w-[8.1rem] w-[6.1rem] text-sm text-[#00A2E8]"> <WorkHistoryIcon className="!text-icon  "/> Job ID</div>
        <div className=" max-md:w-[4.2rem] w-[7.2rem]"> <RecentActorsIcon className="!text-icon  "/> Requirement</div>
        <div className="max-md:w-[5.8rem] w-[5.8rem]"> <CategoryIcon className="!text-icon text-[#42858c] "/> Category</div>
        <div className="max-md:w-[8.5rem] w-[6.5rem]"> <AcUnitIcon className="!text-icon  text-[#c42847]"/> Customer</div>
        <div className="max-md:w-[3.8rem] w-[4.8rem]"> <EventIcon className="!text-icon text-[#5A189A] "/> Created</div> 
        <div className="max-md:w-[5.2rem] w-[5.2rem]"> <RecentActorsIcon className="!text-icon text-[#84a59d] "/> Recruiter</div>
        <div className="max-md:w-[1.5rem] w-[1.5rem]"> On</div>
        <div className="max-md:w-[4.3rem] w-[4.3rem]"> <EventIcon className="!text-icon  "/> Start</div>
        <div className="max-md:w-[3.3rem] w-18"> <EventIcon className="!text-icon text-[#f42c04] "/> Duration</div>
        <div className="max-md:w-[3.3rem] w-16"> <AccessAlarmIcon className="!text-icon  text-[#c42847]"/> Billing</div>
        <div className="max-md:w-[3.3rem] w-16"> <PortraitIcon className="!text-icon  text-[#e4eb2f]"/> Talent</div>
        <div className="max-md:w-[3.3rem] w-20"> <ContactsIcon className="!text-icon text-[#d64933] "/> Contact</div>
                           
                        </div>
                        <InfiniteScroll
        dataLength={props.requirementTable.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingAllRequirementTable?<div  class="flex justify-center"><BundleLoader/></div>:null}
        height={"82vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex text-center font-poppins font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
                            {props.fetchingAllRequirementTable === false ? (
  <NodataFoundPage/>
) : !props.fetchingAllRequirementTable && props.requirementTable.length === 0 ? (
  <EmptyPage/>
) : (
    props.requirementTable.map((item) => {
                                const currentdate = dayjs().format("DD/MM/YYYY");
                                const date = dayjs(item.paymentDate).format("DD/MM/YYYY");
                         
                                return (
                                    <>
                                    <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1">
                                       
                                    <div className="flex  justify-between text-xs  font-poppins bg-white mt-1 py-ygap items-center  max-xl:p-1 max-sm:h-[9rem] max-sm:scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                              
                              <div class="flex">
                              <div className=" flex max-md:w-36 w-36 max-sm:flex-row border-l-2 border-green-500 bg-[#eef2f9]  max-sm:justify-between ">

                                  <div class=" text-sm justify-center  font-poppins">
                                  {item.jobOrder}
                                  </div>
                              </div>
                           
                              <div className=" flex max-md:w-36 w-36 max-sm:flex-row  max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">

                                  <div class="  text-center">
                                  {item.requirementName}

                                  </div>
                                  <div className=" flex max-md:w-36 w-36 max-sm:flex-row  max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">

                                  <div class="  text-center">
                                  {item.category}

                                  </div>
                              </div>
                              <div className=" flex max-md:w-36 w-36 max-sm:flex-row  max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">

                                  <div class="  text-center">
                                  {item.customerName}

                                  </div>
                              </div>
                              <div className=" flex max-md:w-36  max-sm:flex-row w-36 max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">

                                  <div class="  text-center">
                                  {item.recruitOwner}

                                  </div>
                              </div>
                              <div className=" flex max-md:w-36 w-36 max-sm:flex-row  max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">
                              

                                  <div class="  text-center">
                                  {item.creationDate}

                                  </div>
                              </div>
                              <div className=" flex max-md:w-36 w-36 max-sm:flex-row  max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">
                              

                                  <div class="  text-center">
                                  {/* {item.creationDate} */}

                                  </div>
                              </div>
                              <div className=" flex max-md:w-36 w-36 max-sm:flex-row  max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">
                              

                                  <div class="  text-center">
                                  {/* {item.creationDate} */}

                                  </div>
                              </div>
                              <div className=" flex max-md:w-36 w-36 max-sm:flex-row  max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">
                              

                                  <div class="  text-center">
                                  {/* {item.creationDate} */}

                                  </div>
                              </div>
                              <div className=" flex max-md:w-36 w-36 max-sm:flex-row  max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">
                              

                                  <div class="  text-center">
                                  {item.billing}

                                  </div>
                              </div>
                              <div className=" flex max-md:w-36 w-36 max-sm:flex-row  max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">
                              

                                  <div class="  text-center">
                                  {item.candidatetList}

                                  </div>
                              </div>
                              <div className=" flex max-md:w-36 w-36 max-sm:flex-row  max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">
                              

                                  <div class="  text-center">
                                  {item.candidatetList}

                                  </div>
                              </div>
       
                 </div>
           
                          </div>
                      </div>
                                    </div>
                                    </>
                                )
                               
                                
                            })
                        )}
                     </InfiniteScroll>
                    </div>
                </div>
        </div>
    );
};

const mapStateToProps = ({ auth, requirement }) => ({
  user: auth.userDetails,
  requirementTable:requirement.requirementTable,
  userId:auth.userDetails.userId,
  orgId:auth.userDetails.organizationId,
  fetchingAllRequirementTable:requirement.fetchingAllRequirementTable

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAllRequirementTable,
            ClearReducerDataOfRequirement
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RequirementTable);
