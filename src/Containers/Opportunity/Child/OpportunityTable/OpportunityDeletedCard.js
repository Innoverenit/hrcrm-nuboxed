import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import { Tooltip, Menu, Dropdown, Progress } from "antd";
import { CurrencySymbol, } from "../../../../Components/Common";
import { Link } from 'react-router-dom';
import moment from "moment";
import {
  MultiAvatar,
  SubTitle,
} from "../../../../Components/UI/Elements";
import {
  getDeletedOpportunity,
} from "../../OpportunityAction";
import ReinstateToggle from "../../Child/ReinstateToggle"
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

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
        loader={fetchingDeletedOpportunity?<div class="flex justify-center">Loading...</div>:null}
        height={"86vh"}
      >
<div class="flex  justify-center flex-wrap w-full max-sm:justify-between max-sm:flex-col max-sm:items-center">       
{ !fetchingDeletedOpportunity && deletedOpportunity.length === 0 ?<NodataFoundPage/>:deletedOpportunity.map((item,index) =>  {
                 
                 var findProbability = 0;
                 return (

                  <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[16rem] 
                  text-[#444444]  p-1 w-[20vw] flex flex-col max-sm:w-wk scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">

                      <div class="flex items-center justify-between ">
                      <div>Name</div>
                        <Header>
                        <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`opportunity/${item.opportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
    </Link>
                        </Header> 
                       
               
            
                          
            
          </div>                  
                 
                     
           
                        <div class="flex  justify-between">
                            <h3>Customer</h3>
                            <div>{item.customer}</div>
                        </div>
                        <div class="flex justify-between">
                            <div>
                    <div>Sponsor</div> 
                    </div>
                    <div>
                    <SubTitle>
            {item.contactName === null ? "None" :
              <MultiAvatar
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
                    <div class="flex justify-between">
                    <div>Start Date</div> 
            <div>{moment(item.startDate).format("ll")}</div>
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
              imgWidth={"1.8em"}
              imgHeight={"1.8em"}
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
              imgWidth={"2.1em"}
              imgHeight={"2.1em"}
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

const Header = styled.div`
  text-overflow: ellipsis;

  white-space: nowrap;
  overflow: hidden;
  height: 2em;
  font-size: 1em;
padding:4px;
  color:blue;
  cursor:pointer;
  // font-family: Poppins;
  //font-weight: 700;
  @media only screen and (max-width: 600px) {
    text-overflow: ellipsis;
display: flex;
    justify-content: flex-end;
white-space: nowrap;
overflow: hidden;
height: 2em;
font-size: 1.3em;
font-family: Poppins;
font-weight: 700;
width:100%

text-align:center
  }
`