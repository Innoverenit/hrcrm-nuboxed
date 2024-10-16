import React, { useEffect, useState, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import InfiniteScroll from "react-infinite-scroll-component";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Tooltip,  Menu, Dropdown, Progress } from "antd"; 
import { CurrencySymbol, } from "../../../../Components/Common";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LockIcon from "@mui/icons-material/Lock";
import { DeleteOutlined } from "@ant-design/icons";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  MultiAvatar,
  MultiAvatar2,
} from "../../../../Components/UI/Elements";
import {
  getRecruiterList,
  handleUpdateOpportunityModal,
  setEditOpportunity,
  deleteOpportunityData,
  updateOwneroppById,
  handleOpportunityNotesDrawerModal,
      handleOpportunityDrawerModal,
      getAllRecruitmentByOppId,
        getAllRecruitmentPositionByOppId,
          getAllRecruitmentAvgTimeByOppId,
         getAllRecruitmentPositionFilledByOppId,
         getAllRecruitmentDetailsByOppId,
         getOpportunitySKill,
         getlostOpportunity,
         LinklostdOpportunity,
         deleteLostOpportunity,
} from "../../OpportunityAction";
import AddOpportunityDrawerModal from "./AddOpportunityDrawerModal";
import UpdateOpportunityModal from "../UpdateOpportunity/UpdateOpportunityModal";
import ReinstateToggleForLost from "../../Child/OpportunityTable/ReinstateToggleForLost"
import AddOpportunityNotesDrawerModal from "./AddOpportunityNotesDrawerModal";
import { BundleLoader } from "../../../../Components/Placeholder";

function OpportunityLostCard(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    if(props.role==="USER"&&user.department==="Recruiter"){
      props.getRecruiterList(props.recruiterId);     
    }else{
     
    } 
    props. getlostOpportunity(props.userId,page);
    setPage(page + 1);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          '110', // 0
          '97', // 1
          '216', // 2
          '176', // 3
          '218', // 4
          '219', // 5
          '76', // 6
          '77', // 7
          "232", // 'Click to Open'
"170", // "Edit"
 "1259",// "Do you want to delete?"
 "84",// notes"

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
  const handleLoadMore = () => {
    setPage(page + 1);
      props. getlostOpportunity(props.userId,page);
  }
    const [currentOpportunityId, setCurrentOpportunityId] = useState("");
    function handleSetCurrentOpportunityId(opportunityId,opportunityName) {
      setCurrentOpportunityId(opportunityId,opportunityName);
    }
    const exportPDFAnnexure = async () => {
      var doc = new jsPDF();
      // const {
      //   userDetails:
      //   {address},
      //     imageId
      // }=props
     
      // let cityd=`${address.city}`
      // let countryd=`${address.country}`
      // let addressde=`${address.state}`
      // let cityde=`${address.street}`
      // var imageUrl = `${base_url}/image/${imageId || ""}`;
      var name1 = `East Repair Inc `
      var name2 =`1912 Harvest Lane New York ,NY 12210`
      var name3 =`BILL TO`
      var name4 = `SHIP TO`
      var name5 = `QUOTE #`
    var name6 = `QUOTE DATE`
      var name7 = `P.O.#`
      var name8 = `Order Total`
      var name9 = `QTY`
      var name10 = `DESCRIPTION`
      var name11 = `UNIT PRICE`
      var name12 = `AMOUNT`
      var name13= `TERM & CONDITIONS`
      var name14= `Payement id due within 15 days`
      var name15= `Please make checks payble to: East repair Inc. `
    
    
      doc.setFont("Montserrat");
      doc.setFillColor(62, 115, 185);
      doc.rect(0, 0, 230, 13, 'F');
      doc.setFontSize(25);
      doc.setFontSize(14);
      doc.setDrawColor(0, 0, 0)
      // doc.addImage(imageUrl, 'JPEG', 20, 18, 165, 20);
      doc.text(name1, 8, 25);
      doc.setFontSize(10);
      let yPosition = 32;
    //   address.forEach(item => {
    //     doc.text(` ${item.city}  ${item.country}  ${item.state}  ${item.street}`, 8, yPosition);
    //     yPosition += 4
    // });
      // doc.text(name2, 8, 32);
      doc.setFontSize(12);
      doc.text(name3, 8, 50);
      doc.text(name4, 60, 50);
      doc.text(name5, 120, 50);
      doc.text(name6, 120, 58);
      doc.text(name7, 120, 66);
      doc.line(8, 80, 200, 80);
      doc.setFontSize(22);
      doc.text(name8, 8, 90);
      doc.line(8, 100, 200, 100);
      doc.setFontSize(10);
      doc.text(name9, 8, 110);
      doc.text(name10, 30, 110);
      doc.text(name11, 90, 110);
      doc.text(name12, 140, 110);
      doc.setFontSize(12);
      doc.text(name13, 8, 250);
      doc.setFontSize(9);
      doc.text(name14, 8, 260);
      doc.text(name15, 8, 270);
      //footer
      doc.setFillColor(62, 115, 185);
      doc.rect(0, 276, 230, 15, 'F');
    
      doc.save("Quotation.pdf")
    
    }
    const {
        user,
        fetchinglostOpportunity,
    fetchinglostOpportunityError,
    addDrawerOpportunityNotesModal,
    handleOpportunityNotesDrawerModal,
    deleteLostOpportunity,
    handleUpdateOpportunityModal,
    updateOpportunityModal,
    deleteOpportunityData,
     fetchingAllOpportunities,
     lostOpportunity,
     
      } = props;

      if (loading) {
        return <div><BundleLoader/></div>;
      }

      return (    
  <>
 <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
 <div className="flex max-sm:hidden  w-[100%]  max-xl:w-[87%] p-1 bg-transparent font-bold sticky  z-10">
 <div className="   flex justify-between w-[88%] font-bold font-poppins text-xs">
        <div className=" w-[18.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[16.8rem] "> {translatedMenuItems[0]}</div>
        <div className=" w-[11.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> {translatedMenuItems[1]}</div>
        <div className=" w-[7.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] "> {translatedMenuItems[2]}</div>
        <div className=" w-[13.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> {translatedMenuItems[3]}</div>
        <div className=" w-[9.3rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> {translatedMenuItems[4]}</div>
        <div className=" w-[11.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> {translatedMenuItems[5]}</div> 
        <div className=" w-[9.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> {translatedMenuItems[6]}</div>
        <div className=" w-[11.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:w-[0.2rem]"> {translatedMenuItems[7]}</div>  
     </div> </div>

      <InfiniteScroll
        dataLength={lostOpportunity.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchinglostOpportunity?<div class="flex justify-center">Loading...</div> :null}
        height={"83vh"}
        style={{overflowX:"hidden",scroll:"thin"}}
      >
    
              {lostOpportunity.map((item) => {
                 
                 var findProbability = item.probability;
                 item.stageList.forEach((element) => {
                   if (element.oppStage === item.oppStage) {
                     findProbability = element.probability;
                   }
                 });
                 return (

                  <div className="max-sm:w-wk">
                  <div
                className="flex  items-center rounded justify-between  bg-white mt-1 h-8  p-1 max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500   max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                     <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex font-medium w-[14.5rem] items-center  border-l-2 border-green-500 bg-[#eef2f9] max-xl:w-[9.5rem] max-lg:w-[6.5rem] max-sm:flex-row  ">
                              <div>
<div>
          <MultiAvatar
            primaryTitle={item.opportunityName}
            imageId={item.imageId}
            // imageURL={imageURL}
            imgWidth={"1.8rem"}
            imgHeight={"1.8rem"}
          />
        </div>
</div>
                                 
                                      <Tooltip>
                                      <div class=" flex  max-sm:w-full  flex-row md:flex-col">
                                          {/* <div class=" text-xs  font-poppins max-sm:hidden">
                                          Name
                                          </div> */}
                                          <div class=" text-xs flex text-blue-500  font-poppins font-semibold cursor-pointer">
                                              
                                          <Link class="overflow-ellipsis whitespace-nowrap max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem] h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`opportunity/${item.opportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
    </Link>&nbsp;&nbsp;
     
                                          </div>
</div>
                                      </Tooltip>
                            
                              </div>

                              <div className=" flex   w-[9.4rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.7rem]   max-sm:flex-row  max-sm:justify-between ">
                         
                                  {/* <div class=" text-xs  font-poppins max-sm:hidden"> Sector </div> */}
                                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">   
                                  
                                  {item.customer}
                  
                                  </div>
                              </div>
                              </div>
                             
                              
                              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                              <div className=" flex w-[6.9rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[5rem] max-lg:w-[4rem] max-sm:flex-row  max-sm:justify-between ">
                                

                                {/* <div class=" text-xs  font-poppins max-sm:hidden">Country</div> */}
                                <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm ">
                               
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
                              <div className=" flex  w-[11.01rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.91rem] max-sm:flex-row  max-sm:justify-between ">
                                  {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                  <div class=" text-xs justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                  {dayjs(item.startDate).format("ll")}
                                  </div>
                              </div>
                           
                              <div className=" flex items-center  w-[7rem]   h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.81rem] max-lg:w-[2.81rem] max-sm:flex-row  max-sm:justify-between ">
                                  {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                  <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                  <CurrencySymbol currencyType={item.currency} />
          &nbsp;
          {item.proposalAmount}

                                  </div>
                              </div>
                              </div>
                              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                              <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9]  w-[11rem] max-xl:w-[3.9rem] max-lg:w-[3.2rem] max-sm:flex-row  max-sm:justify-between ">
                                  {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                  <div class=" text-xs  font-poppins text-center max-sm:text-sm">
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
className=" !text-xl cursor-pointer text-[red]"
percent={findProbability}
width={30}
strokeColor={"#005075"}
/>
</Tooltip>
</Dropdown>

                                  </div>
                              </div>
                              <div className=" flex items-center   h-8 ml-gap bg-[#eef2f9] w-[7.01rem] max-xl:w-[4rem] max-lg:w-[3rem] max-sm:flex-row  max-sm:justify-between ">
                                  {/* <div class=" text-xs  font-poppins max-sm:hidden">Assigned</div> */}

                                  <div class=" text-xs font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                  
                                  <span>
                                  <MultiAvatar2
            primaryTitle={item.assignedTo}
            imgWidth={"1.8rem"}
            imgHeight={"1.8rem"}
          />
          </span>
           
                                  </div>
                              </div>
                              <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9] w-[7rem] max-sm:flex-row max-lg:w-[3rem]  mb-1 max-sm:justify-between ">
                     
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
                 <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                 <div className=" flex  w-[5.01rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[5rem] max-sm:justify-between max-lg:w-[4rem] max-sm:flex-row ">
          
                  <ReinstateToggleForLost 
          opportunityId={item.opportunityId} 
          
          
          />
                  </div>
                
                 <div class="flex w-[1rem] items-center  h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-[10%]">
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
       
                
                  <div className="items-center  h-8 ml-gap bg-[#eef2f9]">
                  <Tooltip title={translatedMenuItems[8]}><span
       onClick={() => {
        props.LinkClosedOpportunity(
          item.opportunityId,
          {
            closeInd:false,
          }
               
        );         
      }}         
     
       >
        <LockIcon className=" !text-icon cursor-pointer"
             
            />
          </span>
   </Tooltip> 
                  </div>
                  <div class="w-6 items-center  h-8 ml-gap bg-[#eef2f9]">
        <span onClick={() => exportPDFAnnexure()}>
            <PictureAsPdfIcon className="!text-icon text-red-600"/>
                           </span>
          </div> 
                  <div><Tooltip
          placement="right"
          title={translatedMenuItems[11]}
        >
         
              
            <span

              onClick={() => {
              
                handleOpportunityNotesDrawerModal(true);
                // handleSetCurrentOpportunityId(item);
              }}
            >
                 <NoteAltIcon className=" !text-icon cursor-pointer text-[green]" />
              </span>
        
          </Tooltip></div>
               
                
                
                 
                    <div>
                       <Tooltip
                      placement="right"
                      title={translatedMenuItems[9]}
                    >
                      {user.opportunityUpdateInd ===true && (
            
            <span 
            className=" !text-icon cursor-pointer text-[grey]"
              
              onClick={() => {
                props.setEditOpportunity(item);
                handleUpdateOpportunityModal(true);
                handleSetCurrentOpportunityId(item);
              }}
            >
                          <BorderColorIcon
                          className=" !text-icon cursor-pointer text-[tomato]"
                            
                          />
                        </span>
                      )}
                    </Tooltip>
                    </div>
                  
                  
                    <div>
                    <StyledPopconfirm
                      title={translatedMenuItems[10]}
                      onConfirm={() =>
                        deleteLostOpportunity(item.opportunityId)
                      }
                    >
                        {user.opportunityDeleteInd ===true && (
                      
                        <DeleteOutlined
                          type="delete"
                          className=" !text-icon cursor-pointer text-[red]"
                        />
                        )}
                        </StyledPopconfirm>
                    </div>
           
                      
                </div>         
                    
                          </div>
                      </div>

                 )  
            })}
           
  

      </InfiniteScroll>
      </div>
      <UpdateOpportunityModal
        opportunityId={currentOpportunityId}
        opportunityName={currentOpportunityId}
        opportunityData={currentOpportunityId}
        updateOpportunityModal={updateOpportunityModal}
        handleUpdateOpportunityModal={handleUpdateOpportunityModal}
        handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />
            <AddOpportunityNotesDrawerModal
        addDrawerOpportunityNotesModal={addDrawerOpportunityNotesModal}
        opportunityData={currentOpportunityId}
        handleOpportunityNotesDrawerModal={handleOpportunityNotesDrawerModal}
        handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />

<AddOpportunityDrawerModal
translateText={props.translateText}
selectedLanguage={props.selectedLanguage}
translatedMenuItems={props.translatedMenuItems}
 handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
 opportunityName={currentOpportunityId}
 opportunitySkills={props.opportunitySkills}
allRecruitmentDetailsByOppId={props.allRecruitmentDetailsByOppId}
             allRecruitmentByOppId={props.allRecruitmentByOppId}
             allRecruitmentPositionFilledByOppId={props.allRecruitmentPositionFilledByOppId}
             allRecruitmentAvgTimeByOppId={props.allRecruitmentAvgTimeByOppId}
             allRecruitmentPositionByOppId={props.allRecruitmentPositionByOppId}
               handleOpportunityDrawerModal={props.handleOpportunityDrawerModal}
               addDrawerOpportunityModal={props.addDrawerOpportunityModal}
             // candidateByUserId={this.props.candidateByUserId}
      />
    </>
  );
}


const mapStateToProps = ({ auth, account, opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  role: auth.userDetails.role,
  opportunitySkills:opportunity.opportunitySkills,
  sales: opportunity.sales,
  recruiterName: opportunity.recruiterName,
  recruiterList:opportunity.recruiterList,
  fetchinglostOpportunity:opportunity.fetchinglostOpportunity,
  fetchinglostOpportunityError:opportunity.fetchinglostOpportunityError,
  fetchingRecruiterList:opportunity.fetchingRecruiterList,
  fetchingRecruiterListError:opportunity.fetchingRecruiterListError,
  fetchingOpportunity: opportunity.fetchingOpportunity,
  fetchingOpportunityError: opportunity.fetchingOpportunityError,
  fetchingAllOpportunities:opportunity.fetchingAllOpportunities,
  opportunityByUserId: opportunity.opportunityByUserId,
  updateOpportunityModal: opportunity.updateOpportunityModal,
  recruiterId:auth.userDetails.userId,
  addDrawerOpportunityModal:opportunity.addDrawerOpportunityModal,
  allRecruitmentPositionByOppId: opportunity.allRecruitmentPositionByOppId,
  allRecruitmentAvgTimeByOppId: opportunity.allRecruitmentAvgTimeByOppId,
  allRecruitmentPositionFilledByOppId:
    opportunity.allRecruitmentPositionFilledByOppId,
    allRecruitmentByOppId: opportunity.allRecruitmentByOppId,
    allRecruitmentDetailsByOppId:opportunity.allRecruitmentDetailsByOppId,
    lostOpportunity:opportunity.lostOpportunity,
    addDrawerOpportunityNotesModal:opportunity.addDrawerOpportunityNotesModal,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRecruiterList,
      getOpportunitySKill,
      handleUpdateOpportunityModal,
      handleOpportunityDrawerModal,
      setEditOpportunity,
      deleteOpportunityData,
      handleOpportunityNotesDrawerModal,
      updateOwneroppById,
      getAllRecruitmentByOppId,
         getAllRecruitmentPositionByOppId,
          getAllRecruitmentAvgTimeByOppId,
         getAllRecruitmentPositionFilledByOppId,
         getAllRecruitmentDetailsByOppId,
         getlostOpportunity,
         LinklostdOpportunity,
         deleteLostOpportunity,
    },
    dispatch
  );
export default connect(
mapStateToProps,
mapDispatchToProps
)(OpportunityLostCard);
