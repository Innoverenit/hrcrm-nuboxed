import React, { useEffect ,useState} from "react";
import { connect } from "react-redux";
import LockIcon from "@mui/icons-material/Lock";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import {  Menu, Dropdown, Progress } from "antd";
import { Link } from "../../../../../../Components/Common";
import { CurrencySymbol } from "../../../../../../Components/Common";
import { bindActionCreators } from "redux";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ApartmentIcon from '@mui/icons-material/Apartment';
import {
  MultiAvatar,
  MultiAvatar2,

} from "../../../../../../Components/UI/Elements";

import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import StairsIcon from '@mui/icons-material/Stairs';
import { getOpportunityListByContactId } from "../../../../ContactAction";
import { Tooltip } from "antd";
import EmptyPage from "../../../../../Main/EmptyPage";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function OpportunityTable(props) {
  const [loading, setLoading] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [currentOpportunityId, setCurrentOpportunityId] = useState("");
  useEffect(() => {
    props.getOpportunityListByContactId(props.contactId);
  }, []);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
         "213",//0 Quotation
          "97",//1 Prospect
          "216",//2 Sponsor
          "176",//3 Start Date
          "218",//4 Value
          "219",//5 Stages
          "76",//6 Assigned
          "77"//7Owner"
         
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  console.log(props.contactId);
  function handleSetCurrentOpportunityId(opportunityId,opportunityName) {
    setCurrentOpportunityId(opportunityId,opportunityName);
  }
  const { fetchingContactOpportunity, opportunityByContactId,user } = props;

 
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;

  return (
    <>
    <div class="rounded m-1 max-sm:m-1 p-1 w-[99%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
 <div className="flex max-sm:hidden  w-[99%]  max-xl:w-[100%]  p-1 bg-transparent font-bold font-poppins items-end !text-lm sticky max-xl:text-[0.65rem] max-lg:text-[0.45rem]  z-10">
        <div className=" w-[12.8rem] text-[#00A2E8] text-sm  truncate max-xl:w-[16.8rem] max-md:w-[15.8rem] "> 
           <LightbulbIcon className="!text-icon  text-[#84a59d]"/> {translatedMenuItems[0]} ID</div>
        {/* Quotation ID */}
        <div className=" w-[13.1rem] truncate max-md:w-[13.1rem]">
        <ApartmentIcon className='!text-icon mr-1  text-[#f0386b]'/>{translatedMenuItems[1]}</div>
        {/* Prospect */}
        <div className=" w-[11.12rem] truncate max-md:w-[10.12rem]"> <ContactPageIcon className='!text-icon  '  /> 
          {translatedMenuItems[2]}</div>
        {/* Sponsor */}
        <div className="w-[12.8rem] truncate max-md:w-[12.8rem]">
        <DateRangeIcon className='!text-icon  '  /> {translatedMenuItems[3]}</div>
        {/* Start Date */}
        <div className="w-[10.1rem] truncate max-md:w-[12.3rem]">
           <CurrencyExchangeIcon className='!text-icon mr-1 text-[#84a59d]' />{translatedMenuItems[4]}</div>
        {/* Value */}
        <div className="w-[10.7rem] truncate max-md:w-[10.02rem]">  
          <StairsIcon className='!text-icon  '  /> 
          {translatedMenuItems[5]}</div>
        {/* Stages */}
        <div className="w-[9.4rem] truncate max-md:w-[9.1rem]">    <AccountCircleIcon className="!text-icon mr-1 text-[#d64933]"/> {translatedMenuItems[6]}</div>
        {/* Sales Rep */}
        <div className="w-[10.2rem]  max-lg:w-[0.2rem] max-md:w-[10.2rem] ">
        <AccountCircleIcon className="!text-icon mr-1 text-[#d64933]"/> {translatedMenuItems[7]}</div>
        {/* Owner */}
        <div className="w-[2.8rem] truncate"></div>
        <div className="w-12"></div>
      </div>

      <InfiniteScroll
        dataLength={props.opportunityByContactId.length}
        //next={handleLoadMore}
        // hasMore={hasMore}
        loader={props.fetchingContactOpportunity?<div class="flex justify-center" >Loading...</div> :null}
        height={"77vh"}
        style={{ scrollbarWidth:"thin"}}
      >
     
 { !props.fetchingContactOpportunity && props.opportunityByContactId.length === 0 ?<EmptyPage />: props.opportunityByContactId.map((item,index) =>  {
                 
                 var findProbability = item.probability;
                 item.stageList.forEach((element) => {
                   if (element.oppStage === item.oppStage) {
                     findProbability = element.probability;
                   }
                 });
                 return (

                  <div className="max-sm:w-wk">
                   <div
                className="flex rounded justify-between  bg-white mt-1  items-center py-ygap max-sm:h-[9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                   <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex w-[8rem] border-l-2 border-green-500 bg-[#eef2f9] max-xl:w-[10rem] max-lg:w-[8rem] max-sm:flex-row max-sm:w-auto  ">
                              <div className="ml-gap">

          <MultiAvatar
            primaryTitle={item.opportunityName}
            imageId={item.imageId}
            imgWidth={"1.8rem"}
            imgHeight={"1.8rem"}
          />
        
</div>
                              
<div className="flex max-sm:w-full items-center"> 
                                      <Tooltip>
                                      <div class=" flex items-center max-sm:w-full  flex-row md:flex-col">
        
                                          <div class="flex text-xs text-blue-500 ml-gap font-poppins font-semibold cursor-pointer">
                                              
                                          <Link class="flex ml-gap overflow-ellipsis max-sm:text-sm whitespace-nowrap  h-8 text-xs p-1 text-[#042E8A] cursor-pointer"  to={`opportunity/${item.opportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
    </Link>&nbsp;&nbsp;
     
                                          </div>
</div>
                                      </Tooltip>
                            </div>
                              </div>

                              <div className=" flex  items-center justify-center  ml-gap bg-[#eef2f9] h-8 w-[8.01rem] max-xl:w-[5.5rem] max-lg:w-[3.9rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">

                                  <div class=" text-xs  font-poppins  max-sm:text-sm">   
                                  
                                  {item.customer}
                  
                                  </div>
                              </div>
                              </div>
                            
                              
                              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                              <div className=" flex w-[7rem] items-center justify-center  ml-gap bg-[#eef2f9] h-8 max-xl:w-[4rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                                

                                <div class=" text-xs  font-poppins  max-sm:text-sm">
                               
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
                              <div className=" flex items-center justify-start  ml-gap bg-[#eef2f9] h-8  w-[8rem] max-xl:w-[5.51rem] max-lg:w-[3.51rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">


                                  <div class=" text-xs ml-gap justify-center  font-poppins  max-sm:text-sm">
                                  {dayjs(item.startDate).format("DD/MM/YYYY")}
                                  </div>
                              </div>
                           
                              <div className=" flex items-center justify-start  ml-gap bg-[#eef2f9] h-8  w-[6.01rem] max-xl:w-[5rem] max-lg:w-[4rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
   

                                  <div class=" text-xs ml-gap font-poppins text-center  max-sm:text-sm">
                                  <CurrencySymbol currencyType={item.currency} />
          &nbsp;
          {item.proposalAmount}

                                  </div>
                              </div>
                              </div>
                              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                              <div className=" flex items-center justify-center  ml-gap bg-[#eef2f9] h-8  w-[7.02rem] max-xl:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
           

                                  <div class=" text-xs  font-poppins text-center  max-sm:text-sm">
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
className=" !text-icon cursor-pointer text-[red]"
percent={findProbability}
width={30}
strokeColor={"#005075"}
/>
</Tooltip>
</Dropdown>

                                  </div>
                              </div>
                              <div className=" flex items-center justify-center  ml-gap bg-[#eef2f9] h-8  w-[6.02rem] max-xl:w-[4.2rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                    

                                  <div class=" text-xs  font-poppins  max-sm:text-sm">
                                  
                                  <span>
                                  <MultiAvatar2
            primaryTitle={item.assignedTo}
            imgWidth={"1.8rem"}
            imgHeight={"1.8rem"}
          />
          </span>
           
                                  </div>
                              </div>
                              <div className=" flex items-center justify-center  ml-gap bg-[#eef2f9] h-8 w-[5rem] max-lg:w-[2rem] max-sm:w-auto max-sm:flex-row  mb-1 max-sm:justify-between ">
                     


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
                 <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                 <div>
                  {/* <ReinstateToggleForLost 
          opportunityId={item.opportunityId} 
          
          
          /> */}
                  </div>
               
                 <div class="flex items-center justify-center  ml-gap bg-[#eef2f9] h-8 w-6 max-lg:w-[1rem] max-sm:flex-row max-sm:w-auto">
                 <div>
                 <span
       
       className=" cursor-pointer"
onClick={() => {
props.getAllRecruitmentByOppId(item.opportunityId);
props.getAllRecruitmentPositionByOppId(item.opportunityId);
props.getAllRecruitmentAvgTimeByOppId(item.opportunityId);
props.getAllRecruitmentPositionFilledByOppId(
item.opportunityId
);
props.getAllRecruitmentDetailsByOppId(item.opportunityId);
props.handleOpportunityDrawerModal(true);
props.getOpportunitySKill(item.oppInnitiative);
handleSetCurrentOpportunityId(item.opportunityName);
}}
>
         {user.pulseAccessInd === true && (
           <MonitorHeartIcon
           className=" !text-icon cursor-pointer text-[#df9697]"
           />
         )}
       </span>
                      </div>
          </div>
        
                 <div class="flex items-center justify-center  ml-gap bg-[#eef2f9] h-8 w-6 max-lg:w-[1rem] max-sm:flex-row max-sm:w-auto">
                  <div>
                  <Tooltip title='Click to Open'><span
       onClick={() => {
        props.LinkClosedOpportunity(
          item.opportunityId,
          {
            closeInd:false,
          }
               
        );         
      }}         
     
       >
        <LockIcon
         className=" !text-icon cursor-pointer"
            />
          </span>
   </Tooltip> 
                  </div>
                
                </div>
                <div class="flex items-center justify-center  ml-gap bg-[#eef2f9] h-8 w-6 max-lg:w-[1rem] max-sm:flex-row max-sm:w-auto">
                
                </div>  
                </div>
                </div> 
                       </div>
                  

                 )  
            })}
             
  

      </InfiniteScroll>
      </div>
    </>
  );
}
// }
const mapStateToProps = ({ auth, contact, opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  role: auth.userDetails.role,
  fetchingContactOpportunity: contact.fetchingContactOpportunity,
  // accounts: accountSelector(account),
  opportunityByContactId: contact.opportunityByContactId,
  contactId: contact.contact.contactId,
  // opportunityId: opportunity.opportunityId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOpportunityListByContactId,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityTable);


