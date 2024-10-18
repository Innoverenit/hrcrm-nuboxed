import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Tooltip, Button,Input} from "antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
import {
  getContactListByOpportunityId,
     setContactRoleForOpportunity,
} from "../../../OpportunityAction";
import {
StyledPopconfirm,
} from "../../../../../Components/UI/Antd";
import { MultiAvatar} from "../../../../../Components/UI/Elements";
import { ActionIcon } from "../../../../../Components/Utils";
import Highlighter from "react-highlight-words";
import {SearchOutlined}  from '@ant-design/icons';
import NodataFoundPage from "../../../../../Helpers/ErrorBoundary/NodataFoundPage";

const ButtonGroup = Button.Group;
class LinkedContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      translatedMenuItems: [],
      loading: true
    };
  }

  componentDidMount() {
    this.props.getContactListByOpportunityId(
      this.props.opportunity.opportunityId
    );
  }

  componentDidMount() {
    this.fetchMenuTranslations();
 
  }

  async fetchMenuTranslations() {
    try {
      this.setState({ loading: true });
      const itemsToTranslate = [
       '110', // 0
'325', // 1
'1206', // 2
'140', // 3
'546'//4

      ];
      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations ,loading: false});
     
    } catch (error) {
      this.setState({ loading: false });
      console.error('Error translating menu items:', error);
    }
  }

  handleAddPlusClick = (contactId) => {
   
    let data = {
      
      contactRole: "DecisionMaker",
     
    };

    this.props.setContactRoleForOpportunity(data,contactId);
  };
  handleAddPlusClick1 = (contactId) => {
   
    let data = {
      
      contactRole: "Evaluator",
     
    };

    this.props.setContactRoleForOpportunity(data,contactId);
  };
  handleAddPlusClick2 = (contactId) => {
   
    let data = {
      
      contactRole: "Influencer",
     
    };

    this.props.setContactRoleForOpportunity(data,contactId);
  };
  handleAddPlusClick3 = (contactId) => {
   
    let data = {
      
      contactRole: "Sponsor",
     
    };

    this.props.setContactRoleForOpportunity(data,contactId);
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
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
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
             icon={<SearchOutlined />}
            //icon="search"
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
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
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
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
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };


  render() {
    const {
      opportunity: { opportunityId },
      fetchingContactListByOpportunityId,
      fetchingContactListByOpportunityIdError,
      contactListByOpportunityId,
      unlinkContactFromOpportunity,
      setContactRoleForOpportunity,
    } = this.props;
 

    if (fetchingContactListByOpportunityId) {
      return <BundleLoader />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    const {loading,translatedMenuItems } = this.state;
    if (loading) {
      return <div><BundleLoader/></div>;
    } 
    return (
      <>
        <div className=' flex  sticky  z-auto'>          
<div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                  <div className=" flex  w-[100%]  p-1 bg-trandivrent font-bold sticky  z-10">
                  <div className=" md:w-[5.12rem]"></div>
                      <div className=" md:w-[11.12rem]">  {translatedMenuItems[0]}    
                        {/* Name */}
                        </div>
                      <div className=" md:w-[9.5rem]">  {translatedMenuItems[1]}    
                        {/* Designation */}
                        </div>
                      <div className=" md:w-[9.8rem] ">  {translatedMenuItems[2]}    
                        {/* Function */}
                        </div>
                      <div className="md:w-[10.4rem]">  {translatedMenuItems[3]}    
                        {/* Email #" */}
                        </div>
                      <div className="md:w-[6.8rem]">  {translatedMenuItems[4]}    
                        {/* Mobile #" */}
                        </div>
                     
                  </div>
                  <div class="overflow-y-auto h-[64vh]">
                  { !fetchingContactListByOpportunityId && contactListByOpportunityId.length === 0 ?<NodataFoundPage />:contactListByOpportunityId.map((item,index) =>  {
                      
                      return (
                          <div >
                               <div
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                                  <div class="flex">
                                      <div className=" flex   md:w-[5.1rem] max-sm:w-full  ">
                                      <MultiAvatar
                primaryTitle={item.firstName}
                // imageId={item.imageId}
                // imageURL={item.imageURL}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
                                      </div>

                                      <div className=" flex   md:w-[11.5rem] max-sm:flex-row w-full max-sm:justify-between items-center  ">
                                          <div class=" text-xs  font-poppins">
                                             {item.fullName}
                                          </div>

                                      </div>
                                      <div className=" flex  md:w-[9.2rem] max-sm:flex-row w-full max-sm:justify-between items-center ">
                                          <div class=" text-xs  font-poppins">
                                              {item.designation}
                                          </div>
                                      </div>
                                  </div>
                                  <div className=" flex md:w-[9.5rem] max-sm:flex-row w-full max-sm:justify-between ">


                                      <div class=" text-xs  font-poppins text-center">
                                      {item.department}

                                      </div>
                                  </div>
                                  <div className=" flex  md:w-[10.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs  font-poppins text-center">
                                        {item.emailId}

                                      </div>
                                  </div>
                                  <div className=" flex md:w-[10.22rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs  font-poppins text-center">
                                      {item.countryDialCode} {item.mobileNumber}

                                      </div>
                                  </div>
                                  <div className=" flex  md:w-[10.23rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs  font-poppins text-center">
                                      <div class=" flex justify-evenly" >
              <ButtonGroup>
                <RoleButton
                  type="DecisionMaker"
                  iconType="fa-vote-yea"
                  tooltip="Decision Maker"
                  role={item.contactRole}
                    onClick={() =>
                     this.handleAddPlusClick(
                       
                        item.contactId,
                        
                      )
                    }
                />
                <RoleButton
                  type="Evaluator"
                  iconType="fa-address-card"
                  tooltip="Evaluator"
                  role={item.contactRole}
                    onClick={() =>
                      this.handleAddPlusClick1(
                     
                        item.contactId,
                      
                      )
                    }
                />
                <RoleButton
                  type="Influencer"
                  iconType="fa-hands-helping"
                  tooltip="Influencer"
                  role={item.contactRole}
                    onClick={() =>
                      this.handleAddPlusClick2(
                      
                        item.contactId,
                       
                      )
                    }
                />
                <RoleButton
                  type="Sponsor"
                  iconType="fa-user"
                  tooltip="Sponsor"
                  role={item.contactRole}
                    onClick={() =>
                      this.handleAddPlusClick3(
                      
                        item.contactId,
                       
                      )
                    }
                />
              </ButtonGroup>
            
            </div>

                                      </div>
                                  </div>
                                  <div className=" flex  md:w-[10.24rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs  font-poppins text-center">
                                      <StyledPopconfirm
              placement="bottom"
              //title="Do you wish to detach?"
              title={<FormattedMessage
                id="app.doyouwishtodetach"
                defaultMessage="Do you wish to detach?"
              />}
            //   onConfirm={() =>
            //     unlinkContactFromOpportunity(opportunityId, name)
            //   }
            >
              <ActionIcon
                tooltipTitle="Detach Contact"
                iconType="api"
                onClick={null}
                size="1em"
                style={{ color: "#fb8500" }}
              />
            </StyledPopconfirm>

                                      </div>
                                  </div>

                              </div>
                          </div>
                      )
                  })}
                  </div>
              </div>
             
              
          </div>
        {/* <StyledTable
          // rowSelection={rowSelection}
          rowKey="contactId"
          columns={columns}
           pagination={false}
          scroll={{ y: tableHeight }}
          dataSource={contactListByOpportunityId}
          onChange={console.log("contact onChangeHere...")}
        /> */}
      </>
    );
  }
}

const mapStateToProps = ({ opportunity }) => ({
  opportunity: opportunity.opportunity,
  contactListByOpportunityId: opportunity.contactListByOpportunityId,
  fetchingContactListByOpportunityId: opportunity.fetchingContactListByOpportunityId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactListByOpportunityId,
      //   unlinkContactFromOpportunity,
         setContactRoleForOpportunity,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedContact);

function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
  if (role === type) {
    size = "1.375em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.375em",
          borderColor: "transparent",
          color: role === type ? "#1890ff" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        <i className={`fas ${iconType}`} style={{ fontSize: "1.25em" }}></i>
      </Button>
    </Tooltip>
  );
}
