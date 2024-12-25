
import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { MultiAvatar,MultiAvatar2 } from "../../../../../Components/UI/Elements";
import "jspdf-autotable";
import {getInvestorDeals
  } from "../../../InvestorAction";
import { CurrencySymbol } from "../../../../../Components/Common"; 
import { Button, Tooltip,Dropdown ,Menu,Progress} from "antd";
// import { Link } from "react-router-dom/cjs/react-router-dom";
import { BundleLoader } from "../../../../../Components/Placeholder";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import StairsIcon from '@mui/icons-material/Stairs';
import DateRangeIcon from '@mui/icons-material/DateRange';
import UpdateIcon from '@mui/icons-material/Update';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmptyPage from "../../../../Main/EmptyPage";
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
          "110",   //        'Name', // 0
          "216", // 'Sponsor', // 1
          "126", // 'Start Date', // 2
         "218",  // 'Value', // 3
        "219",   // 'Stages', // 4
        "142",   // 'Status', // 5
         "76",  // 'Assign ', // 6
          "77", // 'Owner'//7
         
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
  <div class="rounded m-1 p-1 w-[99%] h-[77vh]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
    <div className=" flex  w-[100%]  justify-between truncate p-1 bg-transparent font-bold font-poppins !text-lm sticky items-end  z-10">
        <div className="text-[#00A2E8] text-sm w-[12rem] truncate max-md:w-[15rem]">
        <LocationCityIcon className='!text-icon  '  />   {translatedMenuItems[0]} 
       {/* name */}             
                </div>
        <div className="w-[9.9rem] max-md:w-[13.2rem] truncate ">
        <ContactPageIcon className='!text-icon text-[#ffb400] '  />    {translatedMenuItems[1]} 
         {/* sponsor */}               
                </div>
        <div className=" w-[7.8rem] max-md:w-[8.1rem] truncate ">
        <DateRangeIcon className='!text-icon  '  /> {translatedMenuItems[2]} 
               {/* enddate */}
                </div>
        <div className=" w-[7.1rem] max-md:w-[5.5rem] truncate ">     
        <CurrencyExchangeIcon className='!text-icon    text-[#e4eb2f]' /> {translatedMenuItems[3]}   
               {/* Value */}            
                </div>
        <div className=" w-[6.2rem] max-md:w-[4.2rem] truncate">
        <StairsIcon className='!text-icon  '  />   {translatedMenuItems[4]} 
         {/* stages               */}
                </div> 
        <div className=" w-[6.2rem] max-md:w-[4.2rem] truncate ">
        <UpdateIcon className='!text-icon text-[#e4eb2f]' />  {translatedMenuItems[5]} 
       {/* status */}                           
                </div> 
        <div className=" w-[5.1rem] max-md:w-[7.1rem] truncate ">
        <AccountCircleIcon className="!text-icon   text-[#d64933]"/>  {translatedMenuItems[6]} 
       {/* Assign To */}
              
                </div>
        <div className=" w-[5.2rem] max-md:w-[5.2rem] truncate ">
        <AccountCircleIcon className="!text-icon   text-[#d64933]"/> {translatedMenuItems[7]}
        {/* owner  */}
                </div>

      </div>
      {/* <InfiniteScroll
        dataLength={props.allDealsData.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllDealsData?<div  class="flex justify-center">Loading...</div>:null}
      
      > */}
  { !fetchingInvestorDealsData && props.investorDealsData.length === 0 ?<EmptyPage/>:props.investorDealsData.map((item,index) =>  {
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
              className="flex rounded justify-between  bg-white mt-1 items-center  max-sm:h-[9rem]  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
            >
                                     
                                <div className=" flex h-8 border-l-2 border-green-500 bg-[#eef2f9]  w-[12rem]   max-sm:w-full">
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
                                          <div class="max-sm:w-full max-sm:justify-between flex md:">
                                            
                                            <div class=" text-[0.82rem] flex text-blue-500 ml-gap font-poppins font-semibold  cursor-pointer">
                                                                                      
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
                                <div className=" flex  h-8 ml-gap bg-[#eef2f9] items-center justify-start  md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between ">

<div class=" text-sm  font-poppins">   
{/* <Link to ="/investor"> */}
{item.investor}
{/* </Link> */}
</div>
</div>

<div className=" flex  h-8 ml-gap bg-[#eef2f9] items-center justify-center md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">


<div class=" text-sm  font-poppins">
<div >
{item.contactName === null ? "None" :
<MultiAvatar2
primaryTitle={item.contactName}
imageId={item.imageId}
imageURL={item.imageURL}
imgWidth={"1.8em"}
imgHeight={"1.8em"}
/>
}
</div >
</div>
</div>


<div className=" flex h-8 ml-gap bg-[#eef2f9] items-center justify-center md:w-[7.3rem] max-sm:flex-row w-full max-sm:justify-between ">


<div class=" text-xs justify-center  font-poppins">
{dayjs(item.startDate).format("DD/MM/YYYY")}
</div>
</div>

<div className=" flex h-8 ml-gap bg-[#eef2f9] items-center justify-center md:w-[6.1rem] max-sm:flex-row w-full max-sm:justify-between ">


<div class=" text-xs  font-poppins text-center">
<CurrencySymbol currencyType={item.currency} />
&nbsp;
{item.proposalAmount}

</div>
</div>
<div className=" flex h-8 ml-gap bg-[#eef2f9] items-center justify-center md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">


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
<div className=" flex h-8 ml-gap bg-[#eef2f9] items-center justify-center md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">


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
<div className=" flex h-8 ml-gap bg-[#eef2f9] items-center justify-center md:w-[5.1rem] max-sm:flex-row w-full mb-1 max-sm:justify-between ">



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