import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,} from "antd";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ContactsIcon from '@mui/icons-material/Contacts';
import {
  MultiAvatar,
  MultiAvatar2,
} from "../../../../Components/UI/Elements";
import {getOpenOppListOfJumpstart} from "../../CustomerAction"
import { BundleLoader } from "../../../../Components/Placeholder";
import EmptyPage from "../../../Main/EmptyPage";


function CustrOpenOpportunityJumpstartCardList(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    props.getOpenOppListOfJumpstart(props.customer.customerId,);
    // setPage(page + 1);
  }, []);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          "213",//0 Quotation ID 
          "73",//1 Sponsor
          "176",//2 Start Date
          "218",//3 value
          "76",//4 Assigned
          "77",//5 Owner  
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
    const [currentOpportunityId, setCurrentOpportunityId] = useState("");
    function handleSetCurrentOpportunityId(opportunityId,opportunityName) {
      setCurrentOpportunityId(opportunityId,opportunityName);
    }
    const {
        user,
        fetchingCustOpenOppJumpstart,
    handleUpdateOpportunityModal,
    updateOpportunityModal,
    addDrawerOpportunityNotesModal,
    handleOpportunityNotesDrawerModal,
    deleteOpportunityData,
     fetchingAllOpportunities,
     openOppOfCustJumpstart,
     
      } = props;

      if (fetchingCustOpenOppJumpstart) {
        return <BundleLoader />;
      }

      return (    
  <>
  <div class="flex flex-wrap">
  <div class="rounded m-1 max-sm:m-1 p-1   overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
      <div className=" flex max-sm:hidden  w-[100%]  max-xl:w-[82%] p-1 bg-transparent font-semibold items-end !text-lm font-poppins sticky  z-10">
        <div className=" w-[6.8rem] text-sm text-[#00A2E8]"><LightbulbIcon className="!text-icon"/>{translatedMenuItems[0]} ID</div>
        {/* Quotation ID  */}
        <div className=" w-[6.2rem] "><ContactsIcon className="!text-icon text-[#023E8A]"/>{translatedMenuItems[1]}</div>
        {/* Sponsor */}

        <div className=" w-[4.3rem] "><CurrencyExchangeIcon className="!text-icon text-[#588157]"/>{translatedMenuItems[3]}</div>
        {/* Value */}
        <div className=" w-[4.1rem] "><AccountCircleIcon className="!text-icon text-[#023047]"/>{translatedMenuItems[4]}</div>
        {/* Assigned */}
        <div className=" w-[3.2rem] "><AccountCircleIcon className="!text-icon text-[#FFB703]"/>{translatedMenuItems[5]}</div>
        {/* Owner */}
      
      </div>
 
{ !fetchingCustOpenOppJumpstart && openOppOfCustJumpstart.length === 0 ?<EmptyPage />:openOppOfCustJumpstart.map((item,index) =>  {
                 
                 var findProbability = item.probability;
                 item.stageList.forEach((element) => {
                   if (element.oppStage === item.oppStage) {
                     findProbability = element.probability;
                   }
                 });
                 return (
                    <div>
                    <div
                      className="flex rounded justify-between  bg-white mt-1  items-center py-gap max-sm:h-[9rem] max-sm:"
                      
                    >
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex   w-[16rem] max-lg:w-[10rem] max-sm:flex-row  max-sm:w-auto ">
                                <div>

            <MultiAvatar
              primaryTitle={item.opportunityName}
              imageId={item.imageId}
              // imageURL={imageURL}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
          
</div>
                                   
                                        <Tooltip>
                                        <div class=" flex max-sm:w-full  flex-row md:">
                                            {/* <div class=" text-xs  font-poppins max-sm:hidden">
                                            Name
                                            </div> */}
                                            <div class=" text-xs text-blue-500  font-poppins font-semibold cursor-pointer">
                                                
                                            <Link class="overflow-ellipsis whitespace-nowrap max-sm:text-xs h-8 text-xs p-1 max-xl:text-[0.65rem] max-lg:text-[0.45rem] text-[#042E8A] cursor-pointer"  to={`opportunity/${item.opportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
    </Link>
         &nbsp;&nbsp;
        {/* {date === currentdate ? (
          <span
            style={{
              color: "tomato",
              fontWeight: "bold",
            }}
          >
            New
          </span>
        ) : null} */}
       
                                            </div>
</div>
                                        </Tooltip>
                              
                                </div>

                               
                                </div>
                                
                               
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex   w-[7rem] max-xl:w-[4rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  

                                  {/* <div class=" text-xs  font-poppins max-sm:hidden">Country</div> */}
                                  <div class=" text-xs  font-poppins max-sm:text-xs max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                  
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
                                <div className=" flex   w-[9.1rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto  max-sm:flex-row  max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-xs justify-center  font-poppins max-sm:text-xs max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                    {dayjs(item.startDate).format("ll")}
                                    </div>
                                </div>
                             
                                <div className=" flex   w-[10.1rem] max-xl:w-[5.1rem] max-sm:w-auto  max-sm:flex-row  max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-xs  font-poppins text-center max-sm:text-xs max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                    
                                    {item.currency}  {item.proposalAmount}
           

                                    </div>
                                </div>
                                                                                           
                                <div className=" flex   w-32 max-xl:w-[5.12rem] max-lg:w-[3.12rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Assigned</div> */}

                                    <div class=" text-xs  font-poppins max-sm:text-xs">
                                    
                                    <span>
                                    <MultiAvatar2
              primaryTitle={item.assignedTo}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
            </span>
             
                                    </div>
                                </div>
                                </div>
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex   w-20 max-xl:w-[2rem] max-lg:w-[4rem] max-sm:w-auto max-sm:flex-row  mb-1 max-sm:justify-between ">
                       
                       {/* <div class=" text-xs  font-poppins max-sm:hidden">Owner</div> */}

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
                        </div>


                    )
                })}
      
    
      </div>

   
</div>

    </>
  );
}


const mapStateToProps = ({ auth, account, customer }) => ({
    openOppOfCustJumpstart:customer.openOppOfCustJumpstart,
    fetchingCustOpenOppJumpstart:customer.fetchingCustOpenOppJumpstart,

  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
     
        getOpenOppListOfJumpstart
    },
    dispatch
  );
export default connect(
mapStateToProps,
mapDispatchToProps
)(CustrOpenOpportunityJumpstartCardList);
