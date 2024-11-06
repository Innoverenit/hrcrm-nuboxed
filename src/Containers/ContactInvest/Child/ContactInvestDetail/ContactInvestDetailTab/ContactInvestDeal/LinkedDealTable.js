

import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import { bindActionCreators } from "redux";
import {
  MultiAvatar,
} from "../../../../../../Components/UI/Elements";
import relativeTime from 'dayjs/plugin/relativeTime';
import { getOpportunityListByContactId } from "../../../../../Contact/ContactAction";
import {getDeallist} from "../../../../ContactInvestAction"
import { Progress, Tooltip } from "antd";
import { CurrencySymbol } from "../../../../../../Components/Common";
import InfoIcon from '@mui/icons-material/Info';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { BundleLoader } from "../../../../../../Components/Placeholder";
import ContactsIcon from '@mui/icons-material/Contacts';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import UpdateIcon from '@mui/icons-material/Update';
import EmptyPage from "../../../../../Main/EmptyPage";
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

dayjs.extend(relativeTime);

const getRelativeTime = (creationDate) => {
    const now = dayjs();
    const creationDay = dayjs(creationDate);

    if (creationDay.isSame(now, 'day')) {
        return 'Today';
    } else {
        return creationDay.from(now); 
    }
};
function LinkedDealTable(props) { 

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
        "110",  // "Name",//0
         "176", // "Start Date",//1
         "126", // "End Date",//2
         "218", // "Value",//3
        "142",// "Status",//4
        "216",  // "Sponsor",//5     
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
    // props.getOpportunityListByContactId(props.contactInVestDetail.contactId);
     props.getDeallist(props.contactInVestDetail.contactId)
  }, []); 
  const { fetchingDealList, dealAllList } = props;
  
console.log(props.contactInVestDetail.contactId)
if (fetchingDealList) return <BundleLoader/>;

  return (
    <>
    <div className=' flex sticky z-auto h-[77vh]'>
    <div class="rounded m-1 p-1 w-[100%]  overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex justify-between w-[93%]  p-1 bg-transparent text-xs items-end font-bold sticky z-10">
        <div className="text-[#00A2E8] text-base w-[24rem] md:w-[23rem]">
        <LocationCityIcon className='!text-icon  '  /> {translatedMenuItems[0]}  
        {/* Name */}

        </div>
        <div className="font-poppins font-bold text-xs md:w-[11.2rem] w-[5.2rem]">
        <DateRangeIcon className='!text-icon mr-1 '  /> 
        {translatedMenuItems[2]}  
        {/* End Date */}
          </div>
          <div className="font-poppins font-bold text-xs md:w-[5.02rem] w-[5.02rem]">
          <CurrencyExchangeIcon className='!text-icon mr-1 text-[#e4eb2f]' />
        {translatedMenuItems[3]}</div>

        <div className="font-poppins font-bold text-xs md:w-[4.5rem] w-[4.5rem]">
           <UpdateIcon className='!text-icon mr-1 text-[#ff66b3]' />
        {translatedMenuItems[4]}  
        {/* Status */}
          </div>
        <div className="font-poppins font-bold text-xs w-[3.8rem] md:w-[5.8rem]">
        <ContactsIcon className="!text-icon text-[#4f7cac] "/>{translatedMenuItems[5]}  
        {/*Sponser */}
          </div> 
     

      </div>

      { !fetchingDealList && dealAllList.length === 0 ?<EmptyPage/>:dealAllList.map((item,index) =>  {
              var findProbability = item.probability;
              item.stageList.forEach((element) => {
                if (element.oppStage === item.oppStage) {
                  findProbability = element.probability;}
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
               (item.address &&
                 item.address.length &&
                 item.address[0].country) ||
               ""
             } 
               PostalCode : ${
                 item.address &&
                 item.address.length &&
                 item.address[0].postalCode
               } `;
          return (
            <div>
              <div
                className="flex rounded justify-between bg-white mt-[0.5rem]  items-center py-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                <div class="flex ">
                <div className=" flex h-8 border-l-2 border-green-500 bg-[#eef2f9]  md:w-[22rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 
          &nbsp;
          <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md:max-sm:w-full ">
                                          
                                            <div class="text-xs flex text-blue-500  font-poppins font-bold  cursor-pointer">
                                            <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] cursor-pointer"  to={`/opportunity/${item.opportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
    </Link>                                     
        &nbsp;&nbsp;
        {date === currentdate ? (
          <div class="text-[0.65rem] mt-[0.4rem]"
            style={{
              color: "tomato",
              fontWeight: "bold",
            }}
          >
            New
          </div>
        ) : null}    
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                </div>
                <div class="flex">
                
                  <div className=" flex md:w-[11rem] h-8 ml-gap bg-[#eef2f9] items-center justify-center max-sm:flex-row w-full max-sm:justify-between ">       
         <div class=" text-xs  font-poppins">
         {dayjs(item.endDate).format("DD/MM/YYYY")}
                
         </div>
       </div>
                </div>
                <div class="flex">
                  <div className=" flex h-8 ml-gap bg-[#eef2f9] items-center  justify-center max-sm:w-full  md:w-[9.5rem] max-sm:flex-row w-full max-sm:justify-between ">
         
                    <div class=" text-xs  font-poppins">
                    <div>
            <CurrencySymbol currencyType={item.currency} />
            &nbsp;&nbsp;{item.proposalAmount}
          </div>                 
                    </div>
                  </div>
                  <div className=" flex  h-8 ml-gap bg-[#eef2f9] items-center justify-center md:w-[5.5rem] max-sm:flex-row w-full max-sm:justify-between ">
         
         <div class=" text-xs  font-poppins">
         <Tooltip title={item.oppStage}>
{" "}
<Progress
type="circle"
style={{ cursor: "pointer",color:"red" }}
percent={findProbability}
//disable={true}
width={30}
 strokeColor={"#005075"}
/>
</Tooltip>
      
         </div>
       </div>
                </div>
                <div class="flex">
                <div class=" flex w-[2rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] basis-[15%]">
                    <MultiAvatar
                      primaryTitle={item.opportunityName}
                      imageId={item.imageId}
                      // imageURL={imageURL}
                      imgWidth={"1.8rem"}
                      imgHeight={"1.8rem"}
                    />
                  </div>            
                </div>
              
                <div className=" flex  w-[8rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                      <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[6rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{getRelativeTime(item.creationDate)}
</span></div>

                <div class="flex h-8 ml-gap bg-[#eef2f9] items-center justify-end ">
                  <div className=" flex  max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">
                      <Tooltip title={item.description}>
           
          <InfoIcon className=" !text-icon cursor-pointer"
          
            />
          
          </Tooltip>
                    </div>
                  </div>
                  <div className=" flex   max-sm:flex-row w-full max-sm:justify-between">
                  <Tooltip title="Edit">       
          <BorderColorIcon 
          
              type="edit"
              style={{ cursor: "pointer",fontSize:"1.25rem" }}
              onClick={() => {
                props.setEditCustomerOpportunity(item);           
              }}
            />      
          </Tooltip>
                  </div>                                      
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </>
  );
}

const mapStateToProps = ({ auth,contact,contactinvest }) => ({
  userId: auth.userDetails.userId,
  dealAllList:contactinvest.dealAllList,
  fetchingDealList:contactinvest.fetchingDealList,
  fetchingContactOpportunity: contact.fetchingContactOpportunity,
  opportunityByContactId: contact.opportunityByContactId,
  contactId: contact.contact.contactId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       getOpportunityListByContactId,
       getDeallist
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(LinkedDealTable);
