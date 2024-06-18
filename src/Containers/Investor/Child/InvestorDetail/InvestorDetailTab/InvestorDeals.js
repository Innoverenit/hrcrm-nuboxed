
import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { MultiAvatar,MultiAvatar2, SubTitle } from "../../../../../Components/UI/Elements";
import "jspdf-autotable";
import {getInvestorDeals
  } from "../../../InvestorAction";
import { CurrencySymbol } from "../../../../../Components/Common"; 
import { Button, Tooltip,Dropdown ,Menu,Progress} from "antd";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { Link } from "react-router-dom/cjs/react-router-dom";
import NodataFoundPage from "../../../../../Helpers/ErrorBoundary/NodataFoundPage";

const ButtonGroup = Button.Group;

const InvestorDeals = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    props.getInvestorDeals(props.investorDetails.investorId);
  
 }, []);

  const [currentLeadsId, setCurrentLeadsId] = useState("");
  const [rowdata, setrowData] = useState({});

  const handleRowData = (data) => {
    setrowData(data);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getAllDeals("all",page);
      setPage(page + 1);
}
  function handleSetCurrentLeadsId(item) {
    setCurrentLeadsId(item);
  }
   const { user,deleteLeadsData, handleUpdateLeadsModal, updateLeadsModal,fetchingAllDealsData,leadsAllData,fetchingInvestorDealsData  } = props;

//   if (fetchingAllDealsData) {
//     return <BundleLoader />;
//   }
console.log("investorDetails",props.investorDetails)
  return (
    <>
  <div class="rounded-lg m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
    <div className=" flex  w-[98%] justify-between p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[15rem]"><FormattedMessage
                  id="app.name"
                  defaultMessage="name"
                /></div>
        <div className=" md:w-[13.2rem] "><FormattedMessage
                  id="app.sponsor"
                  defaultMessage="sponsor"
                /></div>
        <div className="md:w-[8.1rem]"><FormattedMessage
                  id="app.startdate"
                  defaultMessage="startdate"
                /></div>
        <div className="md:w-[5.5rem]"><FormattedMessage
                  id="app.value"
                  defaultMessage="Value"
                /></div>
        <div className="md:w-[4.2rem]"><FormattedMessage
                  id="app.stages"
                  defaultMessage="stages"
                /></div> 
        <div className="md:w-[4.2rem]"><FormattedMessage
                  id="app.status"
                  defaultMessage=""
                /></div> 
        <div className="md:w-[7.1rem]"><FormattedMessage
                  id="app.assignto"
                  defaultMessage="Assign To"
                /></div>
        <div className="md:w-[5.2rem]"><FormattedMessage
                  id="app.owner"
                  defaultMessage="owner"
                /></div>

      </div>
      {/* <InfiniteScroll
        dataLength={props.allDealsData.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllDealsData?<div  class="flex justify-center">Loading...</div>:null}
        height={"75vh"}
      > */}
  { !fetchingInvestorDealsData && props.investorDealsData.length === 0 ?<NodataFoundPage />:props.investorDealsData.map((item,index) =>  {
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
          const dataLoc = ` Address : ${
            item.address && item.address.length && item.address[0].address1
          } 
               Street : ${
                 item.address && item.address.length && item.address[0].street
               }   
              State : ${
                item.address && item.address.length && item.address[0].state
              }
             Country : ${
               (item.address && item.address.length && item.address[0].country) ||
               ""
             } 
               PostalCode : ${
                 item.address && item.address.length && item.address[0].postalCode
               } `;
                    return (
                        <div>
                            <div
              className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col"
            >
                                     
                                <div className=" flex font-medium flex-col w-[12rem]   max-sm:w-full">
                                <div className="flex max-sm:w-full items-center"> 
<div>

            <MultiAvatar
              primaryTitle={item.opportunityName}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"1.8em"}
              imgHeight={"1.8em"}
            />
         
</div>
                                   <div class="w-[4%]">

                                   </div>

                                        <div class="max-sm:w-full" >
                                        <Tooltip>
                                          <div class="max-sm:w-full max-sm:justify-between flex md:flex-col">
                                            
                                            <div class=" text-[0.82rem] flex text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                
                                                
                                              {item.opportunityName}
                                              
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
                                <div className=" flex font-medium flex-col  md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between ">

<div class=" text-sm text-cardBody font-poppins">   
<Link to ="/investor">
{item.investor}
</Link>
</div>
</div>

<div className=" flex font-medium flex-col md:w-[9.2rem] max-sm:flex-row w-full max-sm:justify-between ">


<div class=" text-sm text-cardBody font-poppins">
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


<div className=" flex font-medium flex-col md:w-[5.3rem] max-sm:flex-row w-full max-sm:justify-between ">


<div class=" text-sm justify-center text-cardBody font-poppins">
{dayjs(item.startDate).format("DD/MM/YYYY")}
</div>
</div>

<div className=" flex font-medium flex-col md:w-[4.1rem] max-sm:flex-row w-full max-sm:justify-between ">


<div class=" text-sm text-cardBody font-poppins text-center">
<CurrencySymbol currencyType={item.currency} />
&nbsp;
{item.proposalAmount}

</div>
</div>
<div className=" flex font-medium flex-col md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between ">


<div class=" text-sm text-cardBody font-poppins text-center">
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
style={{ cursor: "pointer", color: "red",fontSize:"1.25rem" }}
percent={findProbability}
width={30}
strokeColor={"#005075"}
/>
</Tooltip>
</Dropdown>

</div>
</div>
<div className=" flex font-medium flex-col md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">


<div class=" text-sm text-cardBody font-poppins">

<span>
{item.assignedTo === null ? (
                "No Data"
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
<div className=" flex font-medium flex-col md:w-[5.1rem] max-sm:flex-row w-full mb-1 max-sm:justify-between ">



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
                         


                    )
                })}
                  {/* </InfiniteScroll> */}
      </div>
      
    </>
  );
};

const mapStateToProps = ({ auth, leads,investor, sector,pitch }) => ({
investorDealsData:investor.investorDealsData,
user: auth.userDetails,
fetchingInvestorDealsData:investor.fetchingInvestorDealsData,
userId: auth.userDetails.userId,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getInvestorDeals,
       
 
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InvestorDeals);
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