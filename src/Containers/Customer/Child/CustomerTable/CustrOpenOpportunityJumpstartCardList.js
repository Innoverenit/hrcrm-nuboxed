import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,} from "antd";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import {
  MultiAvatar,
  MultiAvatar2,
} from "../../../../Components/UI/Elements";
import {getOpenOppListOfJumpstart} from "../../CustomerAction"
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../Components/Placeholder";


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
          "216",//1 Sponsor
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
  <div class="flex flex-wrap w-1/2">
  <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex max-sm:hidden  w-[100%]  max-xl:w-[82%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className="text-xs font-bold font-poppins  w-[13.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[31.8rem] max-lg:w-[29.8rem]">{translatedMenuItems[0]} ID</div>
        {/* Quotation ID  */}
        <div className="text-xs font-bold font-poppins  w-[12.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[13.2rem] max-lg:w-[11.2rem]">{translatedMenuItems[1]}</div>
        {/* Sponsor */}
        <div className="text-xs font-bold font-poppins  w-[8.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[2]}</div>
        {/* Start Date */}
        <div className="text-xs font-bold font-poppins  w-[9.3rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[13.3rem]">{translatedMenuItems[3]}</div>
        {/* Value */}
        <div className="text-xs font-bold font-poppins  w-[8.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.1rem]">{translatedMenuItems[4]}</div>
        {/* Assigned */}
        <div className="text-xs font-bold font-poppins  w-[2.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.2rem]">{translatedMenuItems[5]}</div>
        {/* Owner */}
        <div className="w-12"></div>
      </div>
 
{ !fetchingCustOpenOppJumpstart && openOppOfCustJumpstart.length === 0 ?<NodataFoundPage />:openOppOfCustJumpstart.map((item,index) =>  {
                 
                 var findProbability = item.probability;
                 item.stageList.forEach((element) => {
                   if (element.oppStage === item.oppStage) {
                     findProbability = element.probability;
                   }
                 });
                 return (
                    <div>
                    <div
                      className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col"
                      
                    >
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex font-medium  w-[16rem] max-lg:w-[10rem] max-sm:flex-row  max-sm:w-auto ">
                                <div>

            <MultiAvatar
              primaryTitle={item.opportunityName}
              imageId={item.imageId}
              // imageURL={imageURL}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
          
</div>
                                   <div class="w-[4%]">

                                   </div>
                                   
                                        <Tooltip>
                                        <div class=" flex max-sm:w-full  flex-row md:flex-col">
                                            {/* <div class=" text-xs  font-poppins max-sm:hidden">
                                            Name
                                            </div> */}
                                            <div class=" text-sm text-blue-500  font-poppins font-semibold cursor-pointer">
                                                
                                            <Link class="overflow-ellipsis whitespace-nowrap max-sm:text-sm h-8 text-sm p-1 max-xl:text-[0.65rem] max-lg:text-[0.45rem] text-[#042E8A] cursor-pointer"  to={`opportunity/${item.opportunityId}`} title={item.opportunityName}>
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
                                <div className=" flex font-medium flex-col w-[7rem] max-xl:w-[4rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  

                                  {/* <div class=" text-xs  font-poppins max-sm:hidden">Country</div> */}
                                  <div class=" text-sm  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                  
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
                                <div className=" flex font-medium flex-col w-[9.1rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto  max-sm:flex-row  max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                    {dayjs(item.startDate).format("ll")}
                                    </div>
                                </div>
                             
                                <div className=" flex font-medium flex-col w-[10.1rem] max-xl:w-[5.1rem] max-sm:w-auto  max-sm:flex-row  max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-sm  font-poppins text-center max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                    
                                    {item.currency}  {item.proposalAmount}
           

                                    </div>
                                </div>
                                                                                           
                                <div className=" flex font-medium flex-col w-32 max-xl:w-[5.12rem] max-lg:w-[3.12rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Assigned</div> */}

                                    <div class=" text-sm  font-poppins max-sm:text-sm">
                                    
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
                                <div className=" flex font-medium flex-col w-20 max-xl:w-[2rem] max-lg:w-[4rem] max-sm:w-auto max-sm:flex-row  mb-1 max-sm:justify-between ">
                       
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
