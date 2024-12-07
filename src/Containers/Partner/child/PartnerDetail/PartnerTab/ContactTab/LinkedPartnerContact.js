import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button,Input, } from "antd";
import { 
  getContactListByPartnerId, 
  setEditPartnerContact,
  handleUpdatePartnerContactModal, 
} from "../../../../PartnerAction";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import UpdatePartnerContactModal from "../../../UpdatePartnerContact/UpdatePartnerContactModal";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import { Link } from "../../../../../../Components/Common";
import Highlighter from "react-highlight-words";
import ApiIcon from '@mui/icons-material/Api';
import SearchIcon from '@mui/icons-material/Search';
import PartnerContactActiveToggle from "./PartnerContactActiveToggle";

const ButtonGroup = Button.Group;
function LinkedContact(props) {
  useEffect(() =>{
    props.getContactListByPartnerId(props.partnerId);
  },[]);

  const [currentContactId, setCurrentContactId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  function handleSetCurrentContactId(contactId) {
    setCurrentContactId(contactId);
    console.log(contactId);
  }
  
  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
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
              icon={<SearchIcon />}
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
        <SearchIcon style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
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
            textToHighlight={text.toString()}
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
    const {
      //   opportunity: { opportunityId },
      fetchingPartnerContact,
      user,
      fetchingPartnerContactError,
      contactByPartnerId,
      handleUpdatePartnerContactModal,
      updatePartnerContactModal,
      unlinkContactFromOpportunity,
      setContactRoleForOpportunity,
    } = props;
    const columns = [
      {
        title: "",
        dataIndex: "",
        width: "2%",
        render: (name, item, i) => {
          console.log(item);

        },
      },
      {
        title: "Name",
        width: "20%",
        ...getColumnSearchProps("fullName"),
         dataIndex: "fullName",
        render: (name, item, i) => {
          const fullName = `${item.salutation || ""} ${item.firstName ||
            ""} ${item.middleName || ""} ${item.lastName || ""} `;
            return (
            //  fullName
            <Link
            toUrl={`/contact/${item.contactId}`}
            title={`${item.fullName}`}
          />
            );
          }
      },
      {
        title: "",
        dataIndex: "linkedinPublicUrl",
        width: "2%",
        render: (name, item, i) => {
          console.log(name);
          console.log(item);
          return (
            <Tooltip title="LinkedIn">
               
            <span
              //type="edit"
              style={{ cursor: "pointer" }}
              onClick={() => {
                
              }}
            >        <a
            href={`https://www.linkedin.com`}
          target="_blank"
          >   
              <i class ="fab fa-linkedin"></i>
              </a>
            </span>
           
          </Tooltip>
            );
          },
        },
      {
       
        title: "Role" ,
        width: "15%",
        dataIndex: "designation",
        onFilter: (value, record) => record.designation.indexOf(value) === 0,
        sorter: (a, b) => {
          const designationA = a.designation;
          const designationB = b.designation;
          if (designationA < designationB) {
            return -1;
          }
          if (designationA > designationB) {
            return 1;
          }

          // names must be equal
          return 0;
        },
      },
      {
        title:"Mobile No" ,
        width: "18%",
        dataIndex: "mobileNumber",
        render: (name, item, i) => {
          return (
            <>
              {item.countryDialCode} {item.mobileNumber}
            </>
          );
        },
      },
      {
        title: "Email" ,
        width: "27%",
        dataIndex: "emailId",

      },
      {
        title: "",
        dataIndex: "contactId",
        width: "15%",
        render: (name, item, i) => {
          console.log(name);
          console.log(item);
          return (
            <div class=" flex justify-evenly" >
              <ButtonGroup>
                <RoleButton
                  type="DecisionMaker"
                  iconType="fa-vote-yea"
                  tooltip="Decision Maker"
                  role={item.role && item.role.type}
                />
                <RoleButton
                  type="Sponsor"
                  iconType="fa-user"
                  tooltip="Sponsor"
                  role={item.role && item.role.type}
                />
              </ButtonGroup>
            </div>
          );
        },
        onFilter: (value, record) => record.department.indexOf(value) === 0,
      }, 
      {
        title: "Portal Access",
        width: "15%",
        render: (name, item, i) => {
          return (
            <PartnerContactActiveToggle
            accessInd={item.accessInd}
            contactId={item.contactId}
             thirdPartyAccessInd={item.thirdPartyAccessInd}
             emailId={item.emailId}
             partnerId={item.partnerId}
            />
          );
        },
      },
      {
        title: "",
        dataIndex: "contactId",
        width: "15%",
        render: (name, item, i) => {
          console.log(name);
          console.log(item);
          return (
            <div class=" flex justify-evenly" >
              <Tooltip title="Edit">
              {user.userType !== "USER" && user.department !== "Recruiter" && ( 
            <BorderColorIcon
            style={{fontSize: "0.8rem",}}
              type="edit"
              onClick={() => {
                props.setEditPartnerContact(item);
                handleUpdatePartnerContactModal(true);
                handleSetCurrentContactId(item.contactId);
              }}
            />
              )}
          </Tooltip>
            </div>
          );
        },
        onFilter: (value, record) => record.department.indexOf(value) === 0,
      }, 
      {
        title: "",
        dataIndex: "contactId",
        width: "7%",
        render: (name, item, i) => {
          console.log(name);
          console.log(item);
          return (
             <StyledPopconfirm
              placement="bottom"
              title="Do you wish to detach?"
            >
               {user.userType !== "USER" && user.department !== "Recruiter" && ( 
              <ApiIcon
                tooltipTitle="Detach Contact"
                //iconType="api"
                onClick={null}
                size="16px"
                style={{ color: "#fb8500" }}
              />
               )}
            </StyledPopconfirm>
           
          );
        },
      },
    ];
    
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        <StyledTable
          // rowSelection={rowSelection}
          rowKey="contactId"
          columns={columns}
          pagination={false}
          scroll={{ y: tableHeight }}
          dataSource={contactByPartnerId}
          Loading={fetchingPartnerContact || fetchingPartnerContactError}
          onChange={console.log("contact onChangeHere...")}
          expandedRowRender={(record) => {
          return (
            <>
              <div>
                <i class="fa fa-phone" aria-hidden="true"></i>
                {record.countryDialCode1 || ""} {record.mobileNumber || ""} 
                {record.phoneNumber || ""}
              </div>
            </>
          );
        }}
        />
        <UpdatePartnerContactModal
        contactId={currentContactId}
        updatePartnerContactModal={updatePartnerContactModal}
        handleUpdatePartnerContactModal={handleUpdatePartnerContactModal}
        handleSetCurrentContactId={handleSetCurrentContactId}
        />
      </>
    );
  }


const mapStateToProps = ({ partner,auth }) => ({
  fetchingPartnerContact: partner.fetchingPartnerContact,
  fetchingPartnerContactError: partner.fetchingPartnerContactError,
  partnerId: partner.partner.partnerId,
  user: auth.userDetails,
  contactByPartnerId: partner.contactByPartnerId,
  updatePartnerContactModal: partner.updatePartnerContactModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactListByPartnerId,
      handleUpdatePartnerContactModal,
      setEditPartnerContact,
      
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedContact);

function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
  if (role === type) {
    size = "22px";
  } else {
    size = "16px";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "6px",
          borderColor: "transparent",
          color: role === type ? "#1890ff" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        <i className={`fas ${iconType}`} style={{ fontSize: "10px" }}></i>
      </Button>
    </Tooltip>
  );
}
