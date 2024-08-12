
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
import { Link } from "react-router-dom/cjs/react-router-dom";
import NodataFoundPage from "../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../../Components/Placeholder";

const ButtonGroup = Button.Group;

const InvestorDeals = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          "Name",//0
          "Sponsor",//1
          "Start Date",//2
          "Value",//3
          "Stages",//4
          "Status",//5      
          "Assign To",//6  
           "Owner",//7
         
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
if (loading) {
  return <div><BundleLoader/></div>;
}

  return (
    <>
  <div class="rounded m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
    <div className=" flex  w-[99%] justify-between p-1 bg-transparent font-bold sticky  z-10">
        <div className=" md:w-[15rem]">
        {translatedMenuItems[0]} 
       {/* name */}             
                </div>
        <div className=" md:w-[13.2rem] ">
        {translatedMenuItems[1]} 
         {/* sponsor */}               
                </div>
        <div className="md:w-[8.1rem]">
        {translatedMenuItems[2]} 
               {/* startdate */}
                </div>
        <div className="md:w-[5.5rem]">     
        {translatedMenuItems[2]}   
               {/* Value */}            
                </div>
        <div className="md:w-[4.2rem]">
        {translatedMenuItems[3]} 
         {/* stages               */}
                </div> 
        <div className="md:w-[4.2rem]">
        {translatedMenuItems[4]} 
       {/* status */}                           
                </div> 
        <div className="md:w-[7.1rem]">
        {translatedMenuItems[5]} 
       {/* Assign To */}
              
                </div>
        <div className="md:w-[5.2rem]">
        {translatedMenuItems[6]}
        {/* owner  */}
                </div>

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
              className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
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
                                   <div>
                                   </div>
                                        <div class="max-sm:w-full" >
                                        <Tooltip>
                                          <div class="max-sm:w-full max-sm:justify-between flex md:flex-col">
                                            
                                            <div class=" text-[0.82rem] flex text-blue-500  font-poppins font-semibold  cursor-pointer">
                                                                                      
                                              {item.opportunityName}
                                              
                                               &nbsp;&nbsp;
                                               {date === currentdate ? (
                                                 <span class="text-[tomato] text-[0.65rem] mt-[0.4rem] font-bold"              
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

<div class=" text-sm  font-poppins">   
<Link to ="/investor">
{item.investor}
</Link>
</div>
</div>

<div className=" flex font-medium flex-col md:w-[9.2rem] max-sm:flex-row w-full max-sm:justify-between ">


<div class=" text-sm  font-poppins">
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


<div className=" flex md:w-[5.3rem] max-sm:flex-row w-full max-sm:justify-between ">


<div class=" text-xs justify-center  font-poppins">
{dayjs(item.startDate).format("DD/MM/YYYY")}
</div>
</div>

<div className=" flex  md:w-[4.1rem] max-sm:flex-row w-full max-sm:justify-between ">


<div class=" text-xs  font-poppins text-center">
<CurrencySymbol currencyType={item.currency} />
&nbsp;
{item.proposalAmount}

</div>
</div>
<div className=" flex md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between ">


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
style={{ cursor: "pointer", color: "red",fontSize:"1.25rem" }}
percent={findProbability}
width={30}
strokeColor={"#005075"}
/>
</Tooltip>
</Dropdown>

</div>
</div>
<div className=" flex  md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">


<div class=" text-xs font-poppins">

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
<div className=" flex  md:w-[5.1rem] max-sm:flex-row w-full mb-1 max-sm:justify-between ">



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