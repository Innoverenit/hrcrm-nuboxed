import React, { useEffect,useState,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Highlighter from "react-highlight-words";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import InfoIcon from '@mui/icons-material/Info';
import {
  MultiAvatar,
} from "../../../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';

import SearchIcon from '@mui/icons-material/Search';
import { CurrencySymbol } from "../../../../../../Components/Common";
import { getOpportunityListByCustomerId,handleUpdateCustomerOpportunityModal,
  setEditCustomerOpportunity} from "../../../../CustomerAction";
import { Tooltip,Button,Input,Progress } from "antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import UpdateIcon from '@mui/icons-material/Update';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import relativeTime from 'dayjs/plugin/relativeTime';

const EmptyPage =lazy(()=>import("../../../../../Main/EmptyPage")); 
const AddCustomerUpdateOpportunityModal =lazy(()=>import("./AddCustomerUpdateOpportunityModal")); 

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
function OpportunityTable(props) {
  const [loading, setLoading] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
              "213",  //  "Quotation",//0
              "176", //   "Start Date",//1
              "126",   //   "End Date",//2      
              "218", //   "Value",//3
              "142",//   "Status",//4
              "216",  //   "Sponsor",//5
                  "1305",    // Search
                  "1307",  // Reset
                  "1306",      // Filter
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  useEffect(() => {
    props.getOpportunityListByCustomerId(props.customer.customerId);
  }, []);
  console.log(props.customerId);
  const [currentOpportunityId, setCurrentOpportunityId] = useState("");

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div className="p-8">
          <Input 
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 240, marginBottom: 8, display: "block" }}
          />

          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            // icon="search"
            icon={<SearchIcon />}
            size="small"
            style={{ width: 90 }}
          >
          {translatedMenuItems[6]}  {/* Search */}
          </Button>
          <Button className="w-[90%]"
            onClick={() => handleReset(clearFilters)}
            size="small"
            
          >
          {translatedMenuItems[7]}  {/* Reset */}
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            {translatedMenuItems[8]}{/* Filter */}
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchIcon
          type="search"
          style={{ color: filtered ? "#1890ff" : undefined }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : "",
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    };
  }

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }
  
  function handleSetCurrentOpportunityId(opportunityId) {
    setCurrentOpportunityId(opportunityId);
    console.log(opportunityId);
  }
  const {
    customer: { customerId, name },
    user,
    handleUpdateCustomerOpportunityModal,
    fetchingCustomerOpportunity,
    opportunityByCustomerId,
    fetchingCustomerOpportunityError,
    addUpdateCustomerOpportunityModal,
    setEditCustomerOpportunity,
  } = props;

if (fetchingCustomerOpportunity) return <BundleLoader/>;
  const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
  return (
    <>
    <div className=' flex  sticky z-auto'>
    <div class="rounded m-1 p-1 w-[100%]  overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] h-[92vh] shadow-[#a3abb980] bg-[white]">
      <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold font-poppins !text-lm sticky items-end  z-10">
        <div className="w-[16rem] font-bold font-poppins truncate text-[#00A2E8] text-sm max-md:w-[16rem] ">
        <LightbulbIcon className="!text-icon text-[#84a59d] "/> {translatedMenuItems[0]} ID</div>
        <div className="w-[6.21rem] truncate max-md:w-[6.21rem]  ">
        <DateRangeIcon className='!text-icon  '  /> {translatedMenuItems[2]}</div>
        {/* End Date */}   
        <div className=" w-[6.2rem] truncate max-md:w-[6.2rem]">
        <CurrencyExchangeIcon className='!text-icon text-[#e4eb2f]' />  {translatedMenuItems[3]}</div>
        {/* Value */}  
        <div className="w-[5.51rem] truncate max-md:w-[5.51rem] ">
        <UpdateIcon className='!text-icon mr-1 text-[#ff66b3]' /> {translatedMenuItems[4]}</div>
          {/* Status */}      
        <div className="w-[8.8rem] truncate max-md:w-[8.8rem] ">
        <ContactPageIcon className='!text-icon  '  />
         {translatedMenuItems[5]}</div>
        {/* Sponsor */}       
        <div className="w-[7rem]"></div>
      </div>

      { !fetchingCustomerOpportunity && opportunityByCustomerId.length === 0 ?<EmptyPage/>:opportunityByCustomerId.map((item,index) =>  {
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
                className="flex rounded justify-between items-center bg-white mt-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                <div class="flex ">
                <div className=" flex font-medium flex-col border-l-2 border-green-500 bg-[#eef2f9] w-[16.2rem] max-md:w-[16.2rem] max-sm:flex-row max-sm:justify-between  ">
                        <div className="flex max-sm:items-center">   

                        <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] max-md:w-[8.5rem]  max-sm:flex-row max-sm:justify-between ">
                          <div class="font-bold font-poppins text-xs">
                        {item.newOppId} 
                        </div>
                       </div>
                      <Tooltip>
                                        <div class="flex max-sm:flex-row justify-between md:flex-col">                                       
                                          <div class="flex text-xs ml-gap text-blue-500  font-poppins font-semibold  cursor-pointer">
                                            <Link class="flex items-center overflow-ellipsis whitespace-nowrap h-8 text-xs text-[#042E8A] cursor-pointer"  to={`/opportunity/${item.newOppId}`} title={item.opportunityName}>
                                            {item.opportunityName} 
                                            {/* {item.newOppId} */}
    </Link>                                     
        {date === currentdate ? (
          <span class="flex items-center text-[0.65rem] text-[tomato] font-bold ml-1 "     
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
                <div class="flex">
                  <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] max-md:w-[10rem]  w-[10rem] max-sm:flex-row max-sm:justify-between ">
         
         <div class=" text-xs  font-poppins">
         {dayjs(item.endDate).format("DD/MM/YYYY")}
           {/* {item.endDate} */}    
         </div>
       </div>
                </div>
                <div class="flex">
                  <div className=" flex  items-center justify-start h-8 ml-gap bg-[#eef2f9]  max-md:w-[7.15rem] w-[7.15rem] max-sm:flex-row max-sm:justify-between ">      
                    <div class=" text-xs ml-gap font-poppins">
                    <span>
            <CurrencySymbol currencyType={item.currency} />
            &nbsp;&nbsp;{item.proposalAmount}
          </span>             
                    </div>
                  </div>
                  <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] max-md:w-[8.5rem] w-[8.5rem] max-sm:flex-row max-sm:justify-between ">       
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
                  <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] max-md:w-[6.75rem] w-[6.75rem] max-sm:flex-row max-sm:justify-between ">    
                    <div class=" text-xs  font-poppins">
                    <Tooltip title={item.contactName}>
              <span>
                <MultiAvatar
                  primaryTitle={item.contactName}
                  imageId={item.imageId}
                  imageURL={item.imageURL}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
              </span>
            </Tooltip>                
                    </div>
                  </div>
                  <div className=" flex items-center w-[8.30rem]   justify-center h-8 ml-gap bg-[#eef2f9] mr-1 max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                      <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[6rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{getRelativeTime(item.creationDate)}
</span></div>
                </div>             
                <div class="flex md:items-center ">
                  <div className=" flex items-center justify-center h-8 ml-gap w-[2rem] bg-[#eef2f9] max-md:w-[2rem] max-sm:flex-row max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">
                      <Tooltip title={item.description}>        
          <InfoIcon  // type="edit"
             className=" !text-icon cursor-pointer text-blue-600  "
              />
          </Tooltip>
                    </div>
                  </div>
                  <div className=" flex max-md:w-[2rem] w-[2rem] items-center justify-center h-8  bg-[#eef2f9] max-sm:flex-row max-sm:justify-between">
                  <Tooltip title="Edit">
             {user.opportunityUpdateInd ===true && (
          <BorderColorIcon 
          className=" !text-icon cursor-pointer text-[tomato]"
              onClick={() => {
                props.setEditCustomerOpportunity(item);
                handleUpdateCustomerOpportunityModal(true);
                handleSetCurrentOpportunityId(item.opportunityId)               
              }}
            />
            )}
          </Tooltip>
                  </div>              
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
      <AddCustomerUpdateOpportunityModal
      opportunityId={currentOpportunityId}
      defaultCustomers={[{ label: name, value: customerId }]}
      customerId={{ value: customerId }}
       addUpdateCustomerOpportunityModal={addUpdateCustomerOpportunityModal}
        handleUpdateCustomerOpportunityModal={handleUpdateCustomerOpportunityModal}
        handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
        
      />
    </>
  );
}
// }
const mapStateToProps = ({ customer,auth }) => ({
  user: auth.userDetails,
  fetchingCustomerOpportunity: customer.fetchingCustomerOpportunity,
  fetchingCustomerOpportunityError: customer.fetchingCustomerOpportunityError,
  //customerId: customer.customer.customerId,
  opportunityByCustomerId: customer.opportunityByCustomerId,
  addUpdateCustomerOpportunityModal:customer.addUpdateCustomerOpportunityModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOpportunityListByCustomerId,
      handleUpdateCustomerOpportunityModal,
      setEditCustomerOpportunity,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityTable);
