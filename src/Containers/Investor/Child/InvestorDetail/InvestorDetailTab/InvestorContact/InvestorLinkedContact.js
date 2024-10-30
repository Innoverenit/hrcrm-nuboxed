import React, { useState, useEffect, lazy } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { Tooltip, Button, Input } from "antd";
import { getDepartments } from "../../../../../Settings/Department/DepartmentAction";
import { getDesignations } from "../../../../../Settings/Designation/DesignationAction";
import {
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { ActionIcon } from "../../../../../../Components/Utils";
import {getContactListByInvestorId,handleUpdateInvestorContactModal,
  handleInvestorAddressDrawerModal
} from "../../../../InvestorAction";
import { MultiAvatar2, SubTitle } from "../../../../../../Components/UI/Elements";
import dayjs from "dayjs";
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import AddInvestorAdressModal from "../../../InvestorTable/AddInvestorAdressModal";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import ApartmentIcon from '@mui/icons-material/Apartment';

const InvestorUpdateContactModal = lazy(() =>
  import("../InvestorContact/InvestorUpdateContactModal")
);

const InvestorLinkedContact = (props) => {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [currentRowData, setCurrentRowData] = useState("");

  useEffect(() => {
    props.getContactListByInvestorId(props.investorDetails.investorId);
    props.getDesignations();
    props.getDepartments();
  }, []);


  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
        "110", "140", "546", "326", "325"
         
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


  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
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
          Filter
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
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
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleRowData = (item) => {
    setCurrentRowData(item);
   // props.handleUpdateInvestorContactModal(true);
  };

  const { fetchingsInvestorContact, contactsbyInvestorId, invstrContactUpdateModal } = props;

  if (loading) return <BundleLoader />;
  // if (fetchingsInvestorContact) return <BundleLoader />;

  return (
    <>
      <div class="rounded m-1 p-1 w-[99%]   overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between w-[99%]  p-1 bg-transparent font-bold sticky items-end z-10">
        <div className="text-[#00A2E8] text-base md:w-[16.1rem]">
        <LocationCityIcon className='!text-icon  '  /> {translatedMenuItems[0]}     
        {/* Name      */}
              </div>
      <div className="font-poppins font-bold text-xs md:w-[12.1rem]">
      <MarkEmailUnreadIcon className='!text-icon text-[#ff9f1c] '  />  {translatedMenuItems[1]}  
       {/* Email */}
   
              </div>
      <div className="font-poppins font-bold text-xs md:w-[8.1rem]">
       <MobileFriendlyIcon className='!text-icon text-[#41ead4] '  /> {translatedMenuItems[2]}  
        {/* Mobile #" */}
           </div>
      <div className="font-poppins font-bold text-xs md:w-[8.2rem]">
      <ApartmentIcon className='!text-icon text-[#f0386b] '  /> {translatedMenuItems[3]}  
        {/* Department" */}
              </div>
                   <div className="font-poppins font-bold text-xs md:w-[9.2rem]">
                   <i className=" fab fa-artstation text-[#b744b8]"></i> {translatedMenuItems[4]}  
                                 {/* Designation" */}            
              </div>      
      <div className="w-[5.2rem]"></div>
    </div>         
    { !fetchingsInvestorContact && contactsbyInvestorId.length === 0 ?<NodataFoundPage />:contactsbyInvestorId.map((item,index) =>  {
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
       const currentdate = dayjs().format("DD/MM/YYYY");
       const date = dayjs(item.creationDate).format("DD/MM/YYYY");
       const diff = Math.abs(
        dayjs().diff(dayjs(item.lastRequirementOn), "days")
        );   
                  return (
                      <div class="">
                           <div className="flex rounded justify-between  bg-white mt-1  items-center py-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99]
                            hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
          >
             <div className=" flex h-8 border-l-2 border-green-500 bg-[#eef2f9]  md:w-[14rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 
<div>
                              <SubTitle>
          <MultiAvatar2
            primaryTitle={item.fullName}
            imageId={item.imageId}
            imageURL={item.imageURL}
            imgWidth={"1.8em"}
            imgHeight={"1.8em"}
          />
        </SubTitle></div>
        &nbsp;
        <div class="max-sm:w-full">
                                      <Tooltip>
                                        <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[12rem]">                                    
                                          <div class="text-xs text-blue-500  font-poppins cursor-pointer">
                                          <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] cursor-pointer"  to={`/contact/${item.contactId}`} title={item.fullName}>
    {item.fullName}
</Link>                                               
       {/* <Link
        toUrl={`contact/${item.contactId}`}
        title={`${item.fullName}`}
      >{item.fullName}</Link> */}
      &nbsp;&nbsp;
      {date === currentdate ? (
        <span class="text-[0.65rem] font-bold text-[tomato]"        
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
                              <div className=" flex  ml-gap bg-[#eef2f9]  justify-start md:w-[13.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                 
                                  <div class="flex text-xs h-8 items-center ml-gap font-poppins">
                                       {item.emailId}
                                  </div>
                              </div>
                              <div className=" flex  md:w-[7.3rem] h-8 ml-gap bg-[#eef2f9] items-center max-sm:flex-row w-full max-sm:justify-between">                                
                                <div class="text-xs  font-poppins">
                                {item.countryDialCode} {item.mobileNumber}
                                </div>
                            </div>
                            </div>
                            <div className="flex md:w-[8.01rem] h-8 ml-gap bg-[#eef2f9] items-center max-sm:flex-row w-full max-sm:justify-between ">

<div className="text-xs font-poppins text-center">
  {item.department}
</div>
</div>
<div className=" flex h-8 ml-gap bg-[#eef2f9] items-center justify-center md:w-[9.01rem] max-sm:flex-row w-full max-sm:justify-between ">                                
                                  <div class=" text-xs  font-poppins text-center">
                                  {item.designation}

                                  </div>
                              </div>
                              <div className=" flex h-8 ml-gap bg-[#eef2f9] items-center justify-center md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                  

                                  <div class=" text-xs  font-poppins text-center">
                                  < Tooltip title="Address" >
                          <AddLocationAltIcon
                            className=" !text-icon cursor-pointer text-[#8e4bc0] max-sm:!text-xl"
                            onClick={() => {
                              props.handleInvestorAddressDrawerModal(true);
                              handleRowData(item);
                            }}
                             />   
                                  </Tooltip>             

                                  </div>
                              </div>
                              <div className=" flex h-8 ml-gap bg-[#eef2f9] items-center justify-center md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">                                 
                                  <div class=" text-xs  font-poppins text-center">
                                  <Tooltip title="LinkedIn">
            <span
              //type="edit"
              className="!text-icon cursor-pointer"
              onClick={() => {}}
            >
              {" "}
              <a href={`https://www.linkedin.com`} target="_blank">
                <i class="fab fa-linkedin"></i>
              </a>
            </span>
          </Tooltip>
                                  </div>
                              </div>
                              <div className=" flex h-8 ml-gap bg-[#eef2f9] items-center justify-center md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                  

                                  <div class=" !text-icon  font-poppins text-center">
                                  <Tooltip title="Edit">
            <span
              
              onClick={() => {
                handleRowData(item);
               props.handleUpdateInvestorContactModal(true);
              }}
            >
              <BorderColorIcon className="!text-icon cursor-pointer text-[tomato] " />
            </span>
          </Tooltip>

                                  </div>
                                  <div class=" text-xs  font-poppins text-center">
                                  <StyledPopconfirm
            placement="bottom"
            //title="Do you wish to detach?"
            title={
              <FormattedMessage
                id="app.doyouwishtodetach?"
                defaultMessage="Do you wish to detach?"
              />
            }         
          >
            <ActionIcon
              //tooltipTitle="Detach Contact"
              tooltiptitle={
                <FormattedMessage
                  id="app.detachcontact"
                  defaultMessage="Detach Contact"
                />
              }
              iconType="api"
              onClick={null}
              size="1em"
              style={{ color: "#fb8500",cursor:"pointer",fontSize:"1.25rem" }}
            />
          </StyledPopconfirm>
                                  </div>                                  
                              </div>                            
                          </div>
                      </div>
                  )
              })}                    
    </div>
      <InvestorUpdateContactModal
         currentRowData={currentRowData}
        invstrContactUpdateModal={invstrContactUpdateModal}
        handleUpdateInvestorContactModal={props.handleUpdateInvestorContactModal}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      />
       <AddInvestorAdressModal   
        item={props.investorDetails}
         type="investor"
         addInvestorAddressModal={props.addInvestorAddressModal}
         handleInvestorAddressDrawerModal={props.handleInvestorAddressDrawerModal}
         translateText={props.translateText}
         selectedLanguage={props.selectedLanguage}
      /> 
    </>
  );
};

const mapStateToProps = ({ customer, investor,designations, departments, contact }) => ({
  fetchingsInvestorContact: investor.fetchingsInvestorContact,
  fetchingsInvestorContactError: investor.fetchingsInvestorContactError,
  designations: designations.designations,
  departments: departments.departments,
  addInvestorAddressModal: investor.addInvestorAddressModal,
  invstrContactUpdateModal: investor.invstrContactUpdateModal,
  contactsbyInvestorId:investor.contactsbyInvestorId,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactListByInvestorId,
      getDesignations,
      getDepartments,
      handleUpdateInvestorContactModal,
      handleInvestorAddressDrawerModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InvestorLinkedContact);

