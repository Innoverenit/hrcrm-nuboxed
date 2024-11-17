import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
    getClubAlllist,
    clearInitialData
   
} from "./ClubAction";
import dayjs from "dayjs";
import ReactCountryFlag from 'react-country-flag';
import { Link } from 'react-router-dom';
import { Button, Select, Tooltip } from 'antd';
import { BorderColorRounded, TerminalSharp } from "@mui/icons-material";
import InfiniteScroll from "react-infinite-scroll-component";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { MultiAvatar, MultiAvatar2 } from "../../../Components/UI/Elements";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";

const { Option } = Select;

function ClubTableTeam(props) {
    const [pageNo, setPageNo] = useState(0);
    useEffect(() => {
        setPageNo(pageNo + 1);
        props.getClubAlllist("all",pageNo,props.clubId)
        return () => {
            props.clearInitialData();
        };
    }, [props.clubId]);
    const [rowData, setRowData] = useState({})
    const handleRowData = (item) => {
        setRowData(item)
    }
    const [currency, setCurrency] = useState("")
    const [showIcon, setShowIcon] = useState(false)
    const handleCurrencyField = () => {
        setShowIcon(!showIcon)

    }
    const handleChangeCurrency = (val) => {
        setCurrency(val)
    }
    const handleCallback = () => {
        setShowIcon(false)
        setCurrency("")
    }

    const [hasMore, setHasMore] = useState(true);
    
    const handleLoadMore = () => {
        const callPageMapd = props.clubAllData && props.clubAllData.length &&props.clubAllData[0].pageCount
        setTimeout(() => {
          const {
            getClubAlllist,
           // userDetails: { employeeId },
          } = props;
          if  (props.clubAllData)
          {
            if (pageNo < callPageMapd) {
                setPageNo(pageNo + 1);
                getClubAlllist("all",pageNo,props.clubId);
          }
          if (pageNo === callPageMapd){
            setHasMore(false)
          }
        }
        }, 100);
      };
      console.log(props.clubName)
    return (
        <>
             <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  max-sm:w-wk overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between max-sm:hidden  w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
        <div className=" w-[11.6rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[14.4rem] "><FormattedMessage
                  id="app.name"
                  defaultMessage="Name"
                /></div>
        <div className=" w-[10.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[16.1rem] max-lg:w-[18.1rem]"><FormattedMessage
                  id="app.sector"
                  defaultMessage="Sector"
                /></div>
        <div className=" w-[2.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.2rem] max-lg:w-[8.2rem] "></div>
        <div className="w-[3.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.12rem] max-lg:w-[8.12rem]"># <FormattedMessage
                  id="app.deals"
                  defaultMessage="Deals"
                /></div>
        <div className="w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
        <FormattedMessage
                  id="app.inprogress"
                  defaultMessage="In Progress"
                />
          </div>
          <div className="w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
        <FormattedMessage
                  id="app.Signed"
                  defaultMessage="Signed"
                />
          </div>
          <div className="w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
        <FormattedMessage
                  id="app.Category"
                  defaultMessage="Category"
                />
          </div>
          <div className="w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
      First Meeting
          </div>
          <div className="w-[4.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
       Shares #
          </div>
         
          <div className="w-[3.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
        Value
          </div>
          <div className="w-[3.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
        Club
          </div>
        <div className="w-[4.3rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[10.3rem]">
        <FormattedMessage
                  id="app.assigned"
                  defaultMessage="Assigned"
                />
         </div>
        <div className="w-[2.813rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.21rem]"><FormattedMessage
                  id="app.owner"
                  defaultMessage="owner"
                /></div>
        <div className="w-[5.34rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.34rem] max-lg:w-[12.34rem]">
        <FormattedMessage
                  id="app.source"
                  defaultMessage="Source"
                />
          </div>
        {/* <div className="w-12">Action</div> */}

      </div>
        <InfiniteScroll
        dataLength={props.clubAllData.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingClub?<div  class="flex justify-center">Loading...</div>:null}
        height={"80vh"}
      >
        
        { !props.fetchingClub && props.clubAllData.length === 0 ?<NodataFoundPage />:props.clubAllData.map((item,index) =>  {
         const currentdate = dayjs().format("DD/MM/YYYY");
         const date = dayjs(item.creationDate).format("DD/MM/YYYY");
         const diff = Math.abs(
          dayjs().diff(dayjs(item.lastRequirementOn), "days")
          );
          const dataLoc = ` Address : ${
            item.address && item.address.length && item.address[0].address1
          } 
           Street : ${
             item.address && item.address.length && item.address[0].street
           }   
          State : ${item.address && item.address.length && item.address[0].state}
         Country : ${
           (item.address && item.address.length && item.address[0].country) || ""
         } 
           PostalCode : ${
             item.address && item.address.length && item.address[0].postalCode
           } `;
                    return (
                        <div>
                            <div
              className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" 
            >
                                     <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                                <div className=" flex font-medium  w-[13.5rem] max-xl:w-[8.8rem] max-lg:w-[5.8rem] max-sm:flex-row max-sm:w-auto ">
                                <div>

                                                   <MultiAvatar
                                                      primaryTitle={item.name}
                                                      imageId={item.imageId}
                                                      imageURL={item.imageURL}
                                                      imgWidth={"1.8rem"}
                                                      imgHeight={"1.8rem"}
                                                    />
                                                  
                                        </div>
                                   <div class="w-[4%]">

                                   </div>
                                   
                                        <Tooltip>
                                        <div class=" flex max-sm:w-full  flex-row md:flex-col">
                                           
                                            <div class=" text-sm text-blue-500 flex  font-poppins font-semibold cursor-pointer">
                                            <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm"  to={`investor/${item.investorId}`} title={item.name}>
                                            {item.name}
                                        </Link>                                
                                             
                                              &nbsp;&nbsp;
                                              {date === currentdate ? (
                                                <span class="text-[tomato] mt-[0.4rem] font-bold">
                                                  New
                                                </span>
                                              ) : null}
       
                                            </div>
                                            </ div>
                                        </Tooltip>
                              
                                </div>

                                <div className=" flex font-medium items-center  w-[10.1rem] max-xl:w-[7.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                           
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"> Sector </div> */}
                                    <div class=" text-sm  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">   
                                    {item.sector}
                                    </div>
                                </div>
                                </div>
                               
                                
                                
                                <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                                <div className=" flex font-medium items-center w-8 max-xl:w-[6.21rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  

                                  {/* <div class=" text-xs  font-poppins max-sm:hidden">Country</div> */}
                                  <div class=" text-sm  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                              <ReactCountryFlag
                                    countryCode={item.countryAlpha2Code}
                                    svg
                                    style={{
                                      width: '1rem',
                                      height: '1rem',
                                    }}
                                  />
                                  &nbsp;
                                {item.countryAlpha2Code}
                                              </div>
                                          </div>
                                <div className=" flex font-medium items-center w-[3.11rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    {item.oppNo}
                                    </div>
                                </div>
                             
                                <div className=" flex font-medium items-center w-[6.124rem] max-xl:w-[6.124rem] max-lg:w-[5.124rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    {item.totalProposalValue && (
      <div class="text-xs  font-poppins max-sm:text-sm text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
        {`${item.userCurrency} ${Math.floor(item.totalProposalValue / 1000)}K`}
      </div>
    )}
                                </div>
                                <div className=" flex font-medium items-center w-[5.11rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    {item.signed}
                                    </div>
                                </div>
                                <div className=" flex font-medium items-center w-[6.11rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    {item.category}
                                    </div>
                                </div>
                                <div className=" flex font-medium items-center w-[5.181rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                   
                                    {item.firstMeetingDate ? dayjs(item.firstMeetingDate).format("DD/MM/YYYY") : "None"}
                                    </div>
                                </div>
                                <div className=" flex font-medium items-center w-[4.117rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm text-[blue] cursor-pointer justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                  <div 
                            //        onClick={() => {
                            //   props.handleInvestorPriceDrawer(true);
                            //   handleCurrentRowData(item);
                            // }}
                            >{item.allTotalQuantityOfShare}</div>
                                    </div>
                                </div>
                                <div className=" flex font-medium items-center w-[3.118rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                   {item.allTotalAmountOfShare}
                                    </div>
                                </div>
                                <div className=" flex font-medium items-center w-[3.118rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                   {item.club}
                                    </div>
                                </div>
                                <div className=" flex font-medium items-center w-[4.1rem] max-xl:w-[6.1rem] max-lg:w-[4.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Assigned</div> */}

                                    <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    
                                    <span>
              {item.assignedTo === null ? (
                "None"
              ) : (
                <>
                {item.assignedTo === item.ownerName ? (
                  
                  null
                ) : (
                  <Tooltip title={item.assignedTo}> 
                <MultiAvatar2
                  primaryTitle={item.assignedTo}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                   </Tooltip>
                )}
                </>
              )}
            </span>
             
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col w-[2.12rem] max-xl:w-[2.1rem] max-lg:w-[3.1rem] max-sm:flex-row max-sm:w-auto mb-1 max-sm:justify-between ">
                       
                       {/* <div class=" text-xs  font-poppins max-sm:hidden">Owner</div> */}

                       <span>
                       <Tooltip title={item.ownerName}>
                <div class="max-sm:flex justify-end">
                <Tooltip title={item.ownerName}>
              <MultiAvatar
                primaryTitle={item.ownerName}
                imageId={item.ownerImageId}
                imgWidth={"1.9rem"}
                imgHeight={"1.9rem"}
              />
            </Tooltip>
            </div>
          </Tooltip>
            </span>
                   </div>
                   </div>
                   <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                   <div className=" flex font-medium items-center  w-[8.211rem] max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Source</div> */}

                                    <div class=" text-sm  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    {item.source}
                                    </div>
                                </div>
                                
                      </div>   
                            </div>
                        </div>


                    )
                })}

     </InfiniteScroll> 
     </div>
           
        </>
    )
}
const mapStateToProps = ({ trade, auth,club }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    currencies: auth.currencies,
    fetchingClub:club.fetchingClub,
    clubAllData: club.clubAllData
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getClubAlllist,
            clearInitialData
            // getPurchaseSuppliersList,
            // handlePoLocationModal,
            // handlePoListModal,
            // handleTermsnConditionModal,
            // getCurrency,
            // addCurrencyInPo
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ClubTableTeam);