

import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import { bindActionCreators } from "redux";
import {
  MultiAvatar,
} from "../../../../../../Components/UI/Elements";
import { getOpportunityListByContactId } from "../../../../../Contact/ContactAction";
import { Progress, Tooltip } from "antd";
import { CurrencySymbol } from "../../../../../../Components/Common";
import InfoIcon from '@mui/icons-material/Info';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../../../Components/Placeholder";

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

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
     props.getOpportunityListByContactId(props.contactInVestDetail.contactId);
  }, []); 
  const { fetchingContactOpportunity, opportunityByContactId } = props;
  
console.log(props.contactInVestDetail.contactId)
if (fetchingContactOpportunity) return <BundleLoader/>;

  return (
    <>
    <div className=' flex sticky z-auto h-[72vh]'>
    <div class="rounded m-1 p-1 w-[100%]  overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky z-10">
        <div className=" md:w-[3rem]">
        {translatedMenuItems[0]}  
        {/* Name */}

        </div>
        <div className=" md:w-[4.1rem]">
        {translatedMenuItems[1]}  
        {/* Start Date */}

        </div>
        <div className=" md:w-[4.2rem] ">
        {translatedMenuItems[2]}  
        {/* End Date */}
          </div>
        <div className="md:w-[4.2rem]">
        {translatedMenuItems[3]}</div>
        <div className="md:w-[4.5rem]">
        {translatedMenuItems[4]}  
        {/* Status */}
          </div>
        <div className="md:w-[3.8rem]">
        {translatedMenuItems[5]}  
        {/*Sponser */}
          </div> 
        <div className="w-[9rem]"></div>

      </div>

      { !fetchingContactOpportunity && opportunityByContactId.length === 0 ?<NodataFoundPage />:opportunityByContactId.map((item,index) =>  {
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
                className="flex rounded justify-between bg-white mt-[0.5rem] h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                <div class="flex ">
                <div className=" flex font-medium flex-col md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 
          &nbsp;
          <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md:flex-col ">
                                          
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
                  <div className=" flex   md:w-[9rem] max-sm:flex-row w-full max-sm:justify-between ">
         
                    <h4 class=" text-xs  font-poppins">
                    {dayjs(item.startDate).format("DD/MM/YYYY")}
                 
                    </h4>
                  </div>
                  <div className=" flex md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">       
         <h4 class=" text-xs  font-poppins">
         {dayjs(item.endDate).format("DD/MM/YYYY")}
                
         </h4>
       </div>
                </div>
                <div class="flex">
                  <div className=" flex  justify-center flex-col  md:w-[8.5rem] max-sm:flex-row w-full max-sm:justify-between ">
         
                    <h4 class=" text-xs  font-poppins">
                    <div>
            <CurrencySymbol currencyType={item.currency} />
            &nbsp;&nbsp;{item.proposalAmount}
          </div>                 
                    </h4>
                  </div>
                  <div className=" flex   md:w-[10.5rem] max-sm:flex-row w-full max-sm:justify-between ">
         
         <h4 class=" text-xs  font-poppins">
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
      
         </h4>
       </div>
                </div>
                <div class="flex">
                  <div className=" flex   md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
         
                    <h4 class=" text-xs  font-poppins">
                    <Tooltip title={item.contactName}>
              <div>
                <MultiAvatar
                  primaryTitle={item.contactName}
                  imageId={item.imageId}
                  imageURL={item.imageURL}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
              </div>
            </Tooltip>
                 
                    </h4>
                  </div>
      
                </div>
              
                <div class="flex md:items-center ">
                  <div className=" flex  md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">
                      <Tooltip title={item.description}>
           
          <InfoIcon 
          
              // type="edit"
              style={{ cursor: "pointer",fontSize:"1.25rem" }}
             
            />
          
          </Tooltip>
                    </div>
                  </div>
                  <div className=" flex  md:w-[5rem]  max-sm:flex-row w-full max-sm:justify-between">
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

const mapStateToProps = ({ auth,contact }) => ({
  userId: auth.userDetails.userId,
  fetchingContactOpportunity: contact.fetchingContactOpportunity,
  opportunityByContactId: contact.opportunityByContactId,
  contactId: contact.contact.contactId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       getOpportunityListByContactId,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(LinkedDealTable);
