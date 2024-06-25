import React, { Component, lazy, } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Input } from "antd";
import {  StyledPopconfirm,
} from "../../../../Components/UI/Antd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { ActionIcon } from "../../../../Components/Utils";
import styled from "styled-components";
import {getContactListByInvestorId,handleUpdateInvestorContactModal} from "../../InvestorAction";
import dayjs from "dayjs";
import { MultiAvatar2, SubTitle } from "../../../../Components/UI/Elements";

const InvestorUpdateContactModal = lazy(() =>
  import("../InvestorDetail/InvestorDetailTab/InvestorContact/InvestorUpdateContactModal")
);

const ButtonGroup = Button.Group;

class ContactInvestorCardList extends Component {
  componentDidMount() {
    this.props.getContactListByInvestorId(this.props.RowData.investorId);
  }

  state = {
    searchText: "",
    searchedColumn: "",
    currentRowData: "",
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
          // icon={<SearchOutlined />}
          icon="search"
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
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
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
  handleRowData = (items) => {
    debugger;
    this.setState({ currentRowData:items });

    // this.props.getContactDocument(contactId);
  };

  render() {
    const designationTypeOption = this.props.designations.map((item) => {
      return {
        text: item.designationType,
        value: item.designationType,
      };
    });

    const departmentNameOption = this.props.departments.map((item) => {
      return {
        text: item.departmentName,
        value: item.departmentName,
      };
    });
    const {
      //   opportunity: { opportunityId },
      fetchingsInvestorContact,
      fetchingsInvestorContactError,
      contactsbyInvestorId,
      unlinkContactFromOpportunity,
      setContactRoleForOpportunity,
      handleUpdateInvestorContactModal,
      invstrContactUpdateModal,
    } = this.props;

 

    // if (fetchingsInvestorContactError) {
    //   return <APIFailed />;
    // }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
      
      <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
          <div className=" md:w-[13.5rem]">
        <FormattedMessage
                  id="app.name"
                  defaultMessage="Name"
                /></div>
        <div className=" md:w-[8.1rem]"><FormattedMessage
                  id="app.Email"
                  defaultMessage="Email"
                /></div>
        <div className="md:w-[10.1rem]"><FormattedMessage
                  id="app.mobileNumber"
                  defaultMessage="Mobile Number"
                /></div>
        <div className="md:w-[7.2rem]"><FormattedMessage
                  id="app.Department"
                  defaultMessage="Department"
                /></div>
                     <div className="md:w-[3.2rem]"><FormattedMessage
                  id="app.Designation"
                  defaultMessage="Designation"
                /></div>
        
        <div className="w-[7.2rem]"></div>

      </div>
   
        
      {contactsbyInvestorId.map((item) => { 
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
                        <div>
                            <div className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
                                >
                                     
                                     <div className=" flex font-medium flex-col md:w-[14rem] max-sm:flex-row w-full max-sm:justify-between  ">
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
                                          <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                          
                                            <div class="text-sm flex text-blue-500  font-poppins font-semibold  cursor-pointer">
                                            <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`contact/${item.contactId}`} title={item.fullName}>
      {item.fullName}
    </Link>                                 
         {/* <Link
          toUrl={`contact/${item.contactId}`}
          title={`${item.fullName}`}
        >{item.fullName}</Link> */}
        &nbsp;&nbsp;
        {date === currentdate ? (
          <span class="text-xs mt-[0.4rem]"
            style={{
              color: "tomato",
              fontWeight: "bold",
            }}
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

                             
                                <div className=" flex font-medium flex-col md:w-[13.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                   
                                    <div class="text-sm  font-poppins">
                                         {item.emailId}
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-[6.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                  <div class="text-sm  font-poppins">
                                  {item.countryDialCode} {item.mobileNumber}
                                  </div>
                              </div>
                              </div>
                              <div className="flex font-medium flex-col md:w-32 max-sm:flex-row w-full max-sm:justify-between ">

  <div className="text-sm  font-poppins text-center">
    {item.department}
  </div>
</div>
<div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-sm  font-poppins text-center">
                                    {item.designation}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-sm  font-poppins text-center">
                                    <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
              <span
                style={{
                  cursor: "pointer",
                }}
              >
                <i class="fa fa-map-marker" aria-hidden="true"></i>
              </span>
            </Tooltip>

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-sm  font-poppins text-center">
                                    <Tooltip title="LinkedIn">
              <span
                //type="edit"
                style={{ cursor: "pointer" }}
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
                                <div className=" flex font-medium flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-sm  font-poppins text-center">
                                    <Tooltip title="Edit">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.handleRowData(item);
                 handleUpdateInvestorContactModal(true);
                }}
              >
                <BorderColorIcon style={{ fontSize: "0.8rem", }} />
              </span>
            </Tooltip>

                                    </div>
                                    <div class=" text-sm  font-poppins text-center">
                                    <StyledPopconfirm
              placement="bottom"
              //title="Do you wish to detach?"
              title={
                <FormattedMessage
                  id="app.doyouwishtodetach?"
                  defaultMessage="Do you wish to detach?"
                />
              }
              //   onConfirm={() =>
              //     unlinkContactFromOpportunity(opportunityId, name)
              //   }
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
       
        <InvestorUpdateContactModal
           currentRowData={this.state.currentRowData}
          invstrContactUpdateModal={invstrContactUpdateModal}
          handleUpdateInvestorContactModal={handleUpdateInvestorContactModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ customer, investor,designations, departments, contact }) => ({
  fetchingsInvestorContact: investor.fetchingsInvestorContact,
  fetchingsInvestorContactError: investor.fetchingsInvestorContactError,
  designations: designations.designations,
  departments: departments.departments,
  invstrContactUpdateModal: investor.invstrContactUpdateModal,
  contactsbyInvestorId:investor.contactsbyInvestorId,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactListByInvestorId,
      handleUpdateInvestorContactModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactInvestorCardList);

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

const AppIcon1 = (props) => (
  <BorderColorIcon
  />
);

const EditIcon1 = styled(AppIcon1)`
  color: black;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
