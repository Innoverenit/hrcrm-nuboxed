import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip, Menu, Dropdown, Progress } from "antd";
import { CurrencySymbol, } from "../../../../Components/Common";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import {
  MultiAvatar,
} from "../../../../Components/UI/Elements";
import {
  getDeletedOpportunity,
} from "../../OpportunityAction";
import ReinstateToggle from "../../Child/ReinstateToggle"
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../Components/Placeholder";

function OpportunityDeletedCard(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    props.getDeletedOpportunity(page);
    setPage(page + 1);
  }, []);


  const handleLoadMore = () => {
    setPage(page + 1); 
      props.getDeletedOpportunity(page);
  }
    const [currentOpportunityId, setCurrentOpportunityId] = useState("");
    function handleSetCurrentOpportunityId(opportunityId,opportunityName) {
      setCurrentOpportunityId(opportunityId,opportunityName);
    }
    const {
      fetchingDeletedOpportunity,
      fetchingDeletedOpportunityError,
      deletedOpportunity,
      } = props;
      return (    
  <>

      <InfiniteScroll
        dataLength={deletedOpportunity.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingDeletedOpportunity?<div><BundleLoader/></div>:null}
        style={{ scrollbarWidth:"thin"}}
        height={"83vh"}
      >
<div class="flex  justify-center flex-wrap w-full max-sm:justify-between max-sm:flex-col max-sm:items-center">       
{ !fetchingDeletedOpportunity && deletedOpportunity.length === 0 ?<NodataFoundPage/>:deletedOpportunity.map((item,index) =>  {
                 
                 var findProbability = 0;
                 return (

                  <div class="rounded-md border-2 bg-[#ffffff]  shadow-[#aaa] h-[8.5rem] 
                  text-[#444444] m-3 p-1 w-[15.5vw] max-sm:w-wk flex flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                      <div class="flex items-center  flex-no-wrap h-[2.81em] ">
                      <div class=" flex basis-[15%] mr-[0.2rem]" >
                            <MultiAvatar
                              primaryTitle={item.opportunityName}
                              imageId={item.imageId}
                              imgWidth={"1.8rem"}
                                imgHeight={"1.8rem"}
                            />
                          </div>
                          <div class="flex flex-col basis-[100%] overflow-hidden">
          
                     <div class="font-semibold text-[#337df4] cursor-pointer text-xs " >     
                        <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xsp-1 text-[#042E8A] cursor-pointer"  to={`opportunity/${item.opportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
    </Link>
                     
    </div> 
    </div>      
               
            
                          
            
          </div>      
            <div class="flex  justify-between">
                          <div>{item.customer}</div>
                        </div>
                        <div class="flex justify-between">
                            <div>
                   
            </div>
                    </div>
                    <div class="flex justify-between">
                    <div>Start Date</div> 
            <div>{dayjs(item.startDate).format("ll")}</div>
                    </div>
                    <div class="flex justify-between">
                    <div>Value</div> 
            <div><span>
            <CurrencySymbol currencyType={item.currency} />
            &nbsp;
            {item.proposalAmount}
          </span></div>
                    </div>
                    <div class="flex justify-between">
                    <div>Stages</div> 
            <div><span>
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
              style={{ cursor: "pointer",color:"red" }}
              percent={findProbability}
              //disable={true}
              width={30}
               strokeColor={"#005075"}
             
            />
             {/* )}  */}
          </Tooltip>
        </Dropdown>
          </span></div>
                    </div>  
                    <div class="flex  justify-between" >
    <div>
    Sales Rep
    </div>
    <span>
            <MultiAvatar
              primaryTitle={item.assignedTo}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
            </span>
</div>
<div class="flex  justify-between" >
    <div>
    Owner
    </div>
    <Tooltip title={item.ownerName}>
          <span>
            <MultiAvatar
              primaryTitle={item.ownerName}
              imageId={item.ownerImageId}
               imageURL={item.imageURL}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
            </span>
           </Tooltip>
</div>
<div class="flex  justify-between" >
                          
<ReinstateToggle 
            opportunityId={item.opportunityId} 
            />
              </div>           
                   </div>
                 )  
            })}
              </div>
  

      </InfiniteScroll>
    </>
  );
}


const mapStateToProps = ({ auth, account, opportunity }) => ({
  fetchingDeletedOpportunity: opportunity.fetchingDeletedOpportunity,
  fetchingDeletedOpportunityError: opportunity.fetchingDeletedOpportunityError,
  deletedOpportunity: opportunity.deletedOpportunity,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDeletedOpportunity,
    },
    dispatch
  );
export default connect(
mapStateToProps,
mapDispatchToProps
)(OpportunityDeletedCard);
