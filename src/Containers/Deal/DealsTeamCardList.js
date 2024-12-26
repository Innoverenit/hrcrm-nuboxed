
import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { MultiAvatar, MultiAvatar2,  } from "../../Components/UI/Elements";
import "jspdf-autotable";
import {getTeamsDeals,updateDeal} from "./DealAction";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { Button, Tooltip, Dropdown, Menu, Progress ,Input} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { BundleLoader } from "../../Components/Placeholder";
// import { Link } from "react-router-dom/cjs/react-router-dom";
import { CurrencySymbol } from "../../Components/Common";
import DateRangeIcon from '@mui/icons-material/DateRange';
import RepartitionIcon from '@mui/icons-material/Repartition';
import CategoryIcon from '@mui/icons-material/Category';
import StairsIcon from '@mui/icons-material/Stairs';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'; 
import { getSources } from "../Settings/Category/Source/SourceAction";
import {getSectors} from "../../Containers/Settings/Sectors/SectorsAction"
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
         getTeamUserList
} from "../Opportunity/OpportunityAction";
const SearchedDataDeal=lazy(()=>import ("./SearchedDataDeal"));
const EmptyPage=lazy(()=>import ("../Main/EmptyPage"));
const ButtonGroup = Button.Group;
const DealsTeamCardList = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
    const [editableField, setEditableField] = useState(null); 
    const [editingValue, setEditingValue] = useState(""); 
    const [touchedSector, setTouchedSector] = useState(false);
    const [touchedSource, setTouchedSource] = useState(false);


  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
   
          "110",//0  Name
          "511",//1 Investor
          "73",//2 Contact
          "176",//3 Start Date
          "1159",//4 Values
          "219",//5 Stages
          "76",//6 Assigned
          "77",//7 Owner
          "9",//8 Action
         "100" // New
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
    props.getTeamsDeals(props.userId,page);
    setPage(page + 1);
     props.getTeamUserList(props.userId)
    // props.getSectors();
    // props.getCountries();
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
  const [currentLeadsId, setCurrentLeadsId] = useState("");
  const [rowdata, setrowData] = useState({});

  const handleRowData = (data) => {
    setrowData(data);
  };
  const handleLoadMore = () => {
    const callPageMapd = props.teamsDealsData && props.teamsDealsData.length &&props.teamsDealsData[0].pageCount
    setTimeout(() => {
      const {
        getTeamsDeals,

      } = props;
      if  (props.teamsDealsData)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getTeamsDeals(
            props.userId,page
          );
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };

  function handleSetCurrentLeadsId(item) {
    setCurrentLeadsId(item);
  }
  const { user, deleteLeadsData, handleUpdateLeadsModal, updateLeadsModal, fetchingTeamsDealsData, leadsAllData } = props;

  if (fetchingTeamsDealsData) {
    return <BundleLoader />;
  }

      const handleEditRowField = (investorId, field, currentValue) => {
        setEditableField({ investorId, field });  
        setEditingValue(currentValue);  
      };
      const handleChangeRowItem = (e) => {
        setEditingValue(e.target.value);
      };
      const handleUpdateSubmit = async () => {
        const { investorId, field } = editableField;
        const updatedData = {};
        let mappedField = field;
        if (field === 'name') {
          mappedField = 'name'; 
        } else if (field === 'sector') {
          mappedField = 'sectorId';
        } else if (field === 'source') {
          mappedField = 'source';
        } else if (field === 'department') {
          mappedField = 'departmentId';
        }
        updatedData[mappedField] = editingValue;
        props.updateDeal (updatedData,investorId)
        setEditableField(null);
          setEditingValue("");
      };
      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleUpdateSubmit(); 
        }
      };
      const handleChangeRowSelectItem = async (value) => {
        setEditingValue(value);
    
          const { investorId, field } = editableField;
          const updatedData = {};
          let mappedField = field;
        
         // Map the field to the correct key if needed
         if (field === 'name') {
          mappedField = 'name'; 
        } else if (field === 'sector') {
          mappedField = 'sectorId';
          } else if (field === 'source') {
            mappedField = 'source';
          } else if (field === 'department') {
            mappedField = 'departmentId';
          }
          updatedData[mappedField] = value; // Update the value with selected option
          props.updateDeal (updatedData,investorId)
          setEditableField(null);
          setEditingValue("");
        
      };
    
      const handleContract = async (checked, investorId) => {
        const newCategory = checked ? "Institutional" : "Private";
      
        // Map the field to the correct key
        //  if (field === 'name') {
        //   mappedField = 'name'; 
        const mappedField = "pvtAndIntunlInd";
        const updatedData = { [mappedField]: newCategory }; // Update the value with toggle state
      
        // Call the prop function to update the data
        props.updateDeal (updatedData, investorId);
      
        // Optionally reset any temporary state (if required)
        setEditableField(null);
      };
      const handleSelectSectorFocus = () => {
        if (!touchedSector) {
          props.getSectors();
          setTouchedSector(true);
        }
      };
      const handleSelectSourceFocus = () => {
        if (!touchedSource) {
          props.getSources(props.orgId);
          setTouchedSource(true);
        }
      };
  if (loading) {
    return <div><BundleLoader/></div>;
  }
  return (
    <>
      {props.dealSerachedData.length > 0 ? (
     <Suspense fallback={<BundleLoader />}>
   <SearchedDataDeal
    dealSerachedData={props.dealSerachedData}
    /></Suspense>
  ) : (
    <div  className=" flex">
       <div className=' flex rounded w-[15%] h-[85vh] flex-col border border-[#0000001f] items-center justify-center  '>
      <div class="flex rounded w-[92%] m-1 p-1 box-content border border-[#0000001f] h-6 bg-[white] mt-1  items-center shadow-[#a3abb980] ">
       <div> Search team Member</div>
        </div>
        <div class="flex rounded w-[92%]  p-1 h-[73vh] box-content border bg-[white] mt-1 border-[#0000001f]   shadow-[#a3abb980]">
         <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[4.8rem] 
                  text-[#444444] m-1 w-[11.5vw] max-sm:w-wk flex flex-col scale-[0.99] hover:scale-100 ease-in duration-100   border-solid  p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
        <div class="flex items-center flex-no-wrap h-16">
          <div class=" flex basis-[15%] mr-[0.2rem] h-15" >
            <MultiAvatar
              // primaryTitle={item.opportunityName}
              // imageId={item.imageId}
              imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
            />
          </div>    
          <div class="flex basis-[100%] overflow-hidden">       
          <div class="font-semibold text-[#337df4] cursor-pointer text-xs " >    
                   Itisri Chaudhury
        </div> 
        </div>         
        </div>
        <div className="flex flex-col max-sm:justify-between ">
          
              <div class="overflow-hidden text-ellipsis cursor-pointer text-xs flex items-center">
                97886556738   
                   </div>           
             <div>
          <div class="font-medium text-xs ">
       
              <div class="overflow-hidden  text-ellipsis cursor-pointer text-xs flex items-center">
               itisrichudhuryiti@gmail.com
              </div>       
          </div>
          </div>
          </div>     
      </div>
        </div>
        </div>
      <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className=" flex  w-[100%]  justify-between p-1 bg-transparent font-bold font-poppins !text-lm sticky  z-10 max-sm:hidden">
        <div className=" flex justify-between w-[100%]">
          <div className=" w-[15.1rem] text-blue-500 truncate text-sm max-md:w-[12.5rem]  ">
          <CategoryIcon className='!text-icon text-blue-500' />
          {translatedMenuItems[0]}
           {/* "name" */}    
          </div>
          <div className="w-[14.13rem] truncate max-md:w-[11.13rem]  ">
          
          <RepartitionIcon className='!text-icon text-[#BBE6E4]' />
          {translatedMenuItems[1]}
         {/* investor" */}     
          </div>
          <div className="w-[4.9rem] truncate max-md:w-[3.5rem]  ">
          
          <ContactPageIcon className='!text-icon text-[#4F5D75]' />
          {translatedMenuItems[2]}
                    {/* Contact */}     
          </div>
          <div className=" w-[6.9rem] truncate max-md:w-[4.12rem]  ">
          <DateRangeIcon className="!text-icon text-[#1b263b]"/>
          {translatedMenuItems[3]}
                {/* startdate" */}
          </div>
          <div className=" w-[8.5rem] truncate max-md:w-[3.5rem]  ">
          <CurrencyExchangeIcon className="!text-icon mr-1 text-[#ffbe0b]"/>
          {translatedMenuItems[4]}
         {/* Value */} 
          </div>
          <div className="w-[10.2rem] truncate max-md:w-[4.2rem] ">
          <StairsIcon className='!text-icon mr-1 text-[#2f3e46]' />
          {translatedMenuItems[5]}
          {/* "stages" */}
          </div>
          <div className=" w-[5.26rem] truncate max-md:w-[5.26rem] ">
         
          <AccountCircleIcon className="!text-icon mr-1 text-[#d64933]"/> 
          {translatedMenuItems[6]}
            {/* Status */}
            </div>
          <div className=" w-[6.21rem] truncate max-md:w-[7.21rem] ">
          <AccountCircleIcon className="!text-icon mr-1 text-[#d64933]"/> 
          {translatedMenuItems[7]}
          {/* Assign To" */}  
          </div>
          </div>
        </div>
        <InfiniteScroll
          dataLength={props.teamsDealsData.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={fetchingTeamsDealsData ? <div><BundleLoader/></div> : null}
          height={"83vh"}
          endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
          style={{scrollbarWidth:"thin"}}
        >
          {!fetchingTeamsDealsData && props.teamsDealsData.length === 0 ?<Suspense >  <EmptyPage /> </ Suspense> : props.teamsDealsData.map((item, index) => {
            var findProbability = item.probability;
            item.stageList.forEach((element) => {
              if (element.oppStage === item.oppStage) {
                findProbability = element.probability;
              }
            });
            const currentdate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
           const myIndicator = (item.wonInd) ? <CheckCircleOutlineIcon/> : (item.lostInd ? <DoDisturbIcon/> : null);
            const diff = Math.abs(
              dayjs().diff(dayjs(item.lastRequirementOn), "days")
            );
            const dataLoc = ` Address : ${item.address && item.address.length && item.address[0].address1
              } 
               Street : ${item.address && item.address.length && item.address[0].street
              }   
              State : ${item.address && item.address.length && item.address[0].state
              }
             Country : ${(item.address && item.address.length && item.address[0].country) ||
              ""
              } 
               PostalCode : ${item.address && item.address.length && item.address[0].postalCode
              } `;
            return (
              <div>
                 <div
                className="flex rounded justify-between  bg-white   items-center py-ygap max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                  <div class="flex max-sm:justify-start max-sm:w-wk max-sm:items-center">
              
                    <div className=" flex font-medium h-8 w-[15rem] border-l-2 border-green-500 bg-[#eef2f9]  max-sm:w-full">
                 
                          <div>
                            <MultiAvatar
                              primaryTitle={item.opportunityName}
                              imageId={item.imageId}
                              imageURL={item.imageURL}
                              imgWidth={"1.8em"}
                              imgHeight={"1.8em"}
                            />
                          </div>                            
                          <Tooltip>
                            <div class="max-sm:w-full w-[100%] flex  items-center justify-between max-md:flex-col ml-1">
                            {/* Name */}                                                                      
                              <div class=" text-xs flex w-[100%] items-center justify-between  text-blue-500  font-poppins font-semibold  ">
                             
                                {item.opportunityName}
                                {/* </Link> */}
                                &nbsp;&nbsp;
                                {date === currentdate ? (
                                  <span class="text-[tomato] text-[0.65rem] mt-[0.4rem] font-bold"
                                  >
                                   {translatedMenuItems[9]}  {/* New */}
                                  </span>
                                ) : null}
                                    
                                   <div>
                      {editableField?.investorId === item.investorId &&
   editableField?.field === 'name' ? (
<Input
  type="text"
  className="h-7 w-[4rem] text-xs"
  value={editingValue}
  onChange={handleChangeRowItem}
  onMouseDown={handleUpdateSubmit}
  onKeyDown={handleKeyDown} 
  onBlur={() => handleEditRowField(null, null, null)}
  autoFocus
/>
) : (
<div onClick={() => 
    handleEditRowField(item.investorId, 'name', item.name)} 
    className="cursor-pointer text-xs font-poppins flex items-center opacity-0 hover:opacity-100">
   <BorderColorIcon  className=" !text-icon cursor-pointer"/>
    
    </div> 
)}                 
                      </div> 
                      </div>
                              </div>
                       
                          </Tooltip>                  
                        </div>                 
                    </div>
                    <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center">
                    <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 md:w-[14.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" text-xs  font-poppins">
                        {/* <Link to="/investor"> */}
                          {item.investor}
                        {/* </Link> */}
                      </div>
                    </div>
                    <div className=" flex   items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 md:w-[5.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" text-xs  font-poppins">
                        <div>
                          {item.contactName === null ? "None" :
                            <MultiAvatar2
                              primaryTitle={item.contactName}
                              imageId={item.imageId}
                              imageURL={item.imageURL}
                              imgWidth={"1.8em"}
                              imgHeight={"1.8em"}
                            />
                          }
                        </div>
                      </div>
                    </div>                       
                    <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1  md:w-[7.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" text-xs justify-center  font-poppins">
                        {dayjs(item.startDate).format("DD/MM/YYYY")}
                      </div>
                    </div>
                    </div>
                <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center">
                    <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1  md:w-[8.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" text-xs font-poppins text-center">
                        <CurrencySymbol currencyType={item.currency} />
                        &nbsp;
                        {item.proposalAmount}
                      </div>
                    </div>

                    <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  mt-1 md:w-[5.02rem] max-sm:flex-row w-full max-sm:justify-between ">
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
                          <Tooltip title={item.oppStage}>
                            {" "}
                            <Progress
                              type="circle"
                              style={{ cursor: "pointer", color: "red", fontSize: "0.8rem" }}
                              percent={findProbability}
                              width={30}
                              strokeColor={"#005075"}
                            />
                          </Tooltip>
                        </Dropdown>

                      </div>
                    </div>
                    <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1  md:w-[5.051rem] max-sm:flex-row w-full max-sm:justify-between ">
                    {myIndicator}
                    </div>
</div>
<div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                    <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1  md:w-[9.01rem] max-sm:flex-row w-full max-sm:justify-between ">


                      <div class=" text-xs  font-poppins">

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
                    <div className=" flex  items-center justify-center h-8  ml-gap bg-[#eef2f9] w-[5rem]  max-md:w-20 max-sm:flex-row mt-1 max-sm:justify-between ">

                      <span>
                        <MultiAvatar2
                          primaryTitle={item.ownerName}
                          imageId={item.ownerImageId}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />
                      </span>
                    </div>
                  </div>             
              </div>
              </div>
            )
          })}
        </InfiniteScroll>
      </div>
      </div>
       )} 
    </>
  );
};
const mapStateToProps = ({ auth, leads, deal, sector, pitch }) => ({
  //   leadsAllData: leads.leadsAllData,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  fetchingAllDealsData: deal.fetchingAllDealsData,
  addDrawerPitchNotesModal: pitch.addDrawerPitchNotesModal,
  updatePitchModal: pitch.updatePitchModal,
  openASSImodal: pitch.openASSImodal,
  allDealsData: deal.allDealsData,
  teamsDealsData:deal.teamsDealsData,
  fetchingTeamsDealsData:deal.fetchingTeamsDealsData,
  dealSerachedData: deal.dealSerachedData
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getTeamsDeals,
        updateDeal ,
        getSectors,
        getSources,
        getTeamUserList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DealsTeamCardList);
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