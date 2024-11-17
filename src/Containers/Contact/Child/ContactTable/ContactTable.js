import React, { Component, useEffect, useState, useMemo, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import {
  SearchOutlined, MailOutlined
} from "@ant-design/icons";
import EditIcon from '@mui/icons-material/Edit';
import styled from "styled-components";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import { StyledTable, } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import { Button, Tooltip, Input, Select } from "antd";
import Highlighter from "react-highlight-words";
import { MultiAvatar, MultiAvatar2, SubTitle } from "../../../../Components/UI/Elements";
import {
  getContactListByUserId,
  handleUpdateContactModal,
  handleContactReactSpeechModal,
  setEditContact,
  updateOwnercontactById,
  getContactById,
  handleDonotCallModal,
  handleContactDrawerModal,
  handleContactEmailDrawerModal,
  emptyContact
} from "../../ContactAction";
import {
  getAllSalesList,
  getRecruiterName,
} from "../../../Opportunity/OpportunityAction";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { getDesignations } from "../../../Settings/Designation/DesignationAction";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ContactDetailView from "./ContactDetailView";
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
import ReactContactSpeechModal from "../ContactDetail/ReactContactSpeechModal";
import AddContactDrawerModal from "../UpdateContact/AddContactDrawerModal";
import AddContactEmailDrawerModal from "../UpdateContact/AddContactEmailDrawerModal";
import BorderColorIcon from '@mui/icons-material/BorderColor';

const Option = Select;
const UpdateContactModal = lazy(() =>
  import("../UpdateContact/UpdateContactModal")
);

function ContactTable(props) {
  const [page, setPage] = useState(0);
  useEffect(() => {
    window.addEventListener('error', e => {
      if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'Script error.') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        )
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        )
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    })
    props.getContactListByUserId(props.userId,page);
    setPage(page + 1);
    props.getAllSalesList();
    props.getRecruiterName();
  }, []);

  useEffect(()=>{
    return()=>props.emptyContact();
  },[] );
  const [currentCandidateId, setCurrentCandidateId] = useState("");

  function handleSetCurrentContactId(contactId) {
    setCurrentContactId(contactId);
    console.log(contactId);
  }

  const handleLoadMore = () => {
    setTimeout(() => {
            setPage(page + 1);
            props.getContactListByUserId(props.currentUser?props.currentUser:props.userId,page);
    }, 100);
  
  }
  const salelist = props.sales.map((item) => {
    return { label: item.fullName, value: item.employeeId };
  });
  const recruiterlist = props.recruiterName.map((item) => {
    return { label: item.fullName, value: item.employeeId };
  });

  const mergedlist = salelist.concat(recruiterlist);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentOpportunityId, setCurrentOpportunityId] = useState("");
  const [visibleselect, setvisibleselect] = useState(false);
  const [selectedValue, setselectedValue] = useState("");
  const [loading, setLoading] = useState(false);

  function handleTransferClick() {
    setvisibleselect(true);
  }

  const start = () => {
    setLoading(true); // ajax request after empty completing

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  function handleSelected(value) {
    setselectedValue(value);
    console.log(value);
  }

  function handleSend() {
    let data = {
      // userId:props.userId,
      contactIds: selectedRowKeys,
    };
    setselectedValue(props.updateOwnercontactById(selectedValue, data));
    console.log(selectedValue, selectedRowKeys);
  }

  const [currentContactId, setCurrentContactId] = useState("");
  console.log(
    "Current",
    props.contactByUserId.length && props.contactByUserId.contactId
  );
  console.log("Current1", props.contactByUserId);

  function handleSetCurrentContactId(item) {
    setCurrentContactId(item);
    // console.log("Current2", item);
  }

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
            // icon="search"
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
        <SearchOutlined
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

  const ownerlistType = useMemo(() => {
    if (!props.sales) return [];
    return (
      props.sales.length &&
      props.sales.map((sales) => {
        return {
          text: sales.fullName || "",
          value: sales.fullName,
        };
      })
    );
  }, [props.sales]);
  const departmentNameOption = useMemo(() => {
    if (!props.departments) return [];
    return (
      props.departments.length &&
      props.departments.map((departments) => {
        return {
          text: departments.departmentName || "",
          value: departments.departmentName,
        };
      })
    );
  }, [props.departments]);

  const designationTypeOption = useMemo(() => {
    if (!props.designations) return [];
    return (
      props.designations.length &&
      props.designations.map((designations) => {
        return {
          text: designations.designationType || "",
          value: designations.designationType,
        };
      })
    );
  }, [props.designations]);

  const {
    user,
    fetchingContacts,
    fetchingContactsError,
    contactByUserId,
    handleUpdateContactModal,
    handleContactReactSpeechModal,
    addContactSpeechModal,
    updateContactModal,
  } = props;
  const { imgRadius } = props;
  const columns = [
    {
      title: "",
      dataIndex: "imageId",
      width: "3%",
      render: (name, item, i) => {
        return (
          <SubTitle>
            <MultiAvatar2
              primaryTitle={item.firstName}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"1.8em"}
              imgHeight={"1.8em"}
            />
          </SubTitle>
        );
      },
    },
    {
      //title: "Name",
      title: <FormattedMessage id="app.name" defaultMessage="Name" />,
      dataIndex: "fullName",
      ...getColumnSearchProps("fullName"),
      width: "15%",
      defaultSortOrder: "descend",
      render: (name, item, i) => {
        const fullName = `${item.salutation || ""} ${item.firstName ||
          ""} ${item.middleName || ""} ${item.lastName || ""} `;
        const currentdate = dayjs().format("DD/MM/YYYY");
        const date = dayjs(item.creationDate).format("DD/MM/YYYY");
        console.log(date, currentdate, currentdate === date);
        return (
          <>
            <ContactDetailView
              contactId={item.contactId}
              contactName={fullName}
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}
            translatedMenuItems={props.translatedMenuItems}
            />
            &nbsp;&nbsp;
            {date === currentdate ? (
              <span
                style={{
                  color: "tomato",
                  fontWeight: "bold",
                }}
              >
                New
              </span>
            ) : null}
          </>
        );
      },
    },

    // {
    //   //title: "Type",
    //   title: <FormattedMessage id="app.contactType" defaultMessage="Type" />,
    //   dataIndex: "contactType",
    //   // width: "15%",
    // },
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    {
      title: <FormattedMessage id="app.company" defaultMessage="Company" />,
      dataIndex: "tagWithCompany",
      width: "12%",
      ...getColumnSearchProps("tagWithCompany"),
    },
    {
      //title: "Designation",
      title: (
        <FormattedMessage id="app.designation" defaultMessage="Designation" />
      ),
      dataIndex: "designation",
      width: "12%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.designation - b.designation,
      filters: designationTypeOption,

      onFilter: (value, record) => {
        return record.designation === value;
      },
    },
    {
      //title: "Department",
      title: (
        <FormattedMessage id="app.department" defaultMessage="Department" />
      ),
      width: "12%",
      dataIndex: "department",
      filters: departmentNameOption,
      onFilter: (value, record) => {
        return record.department === value;
      },
    },
    {
      title: <FormattedMessage id="app.lastPost" defaultMessage="Last Posted on" />,
      dataIndex: "lastRequirementOn",
      width: "19%",
      sorter: (a, b) => a.lastRequirementOn - b.lastRequirementOn,
      render: (text, item) => {
        // const lastRequirementOn = dayjs(item.lastRequirementOn ).format("ll");
        const diff = Math.abs(dayjs().diff(dayjs(item.lastRequirementOn), 'days'));
        const date = diff + 1
        return <>
          {item.lastRequirementOn === null ? "None" :
            <span class=" mr-2 text-xs cursor-pointer">
              {date} days ago
            </span>
          }
        </>
      },
    },

    {
      title: <FormattedMessage id="app.Portal Acess" defaultMessage="Portal Acess" />,
      width: "8%",
    },


    {
      title: <FormattedMessage id="app.owner" defaultMessage="Owner" />,
      dataIndex: "ownerName",
      // ...getColumnSearchProps('ownerName'),
      width: "7%",

      filters: ownerlistType,

      onFilter: (value, record) => {
        return record.fullName === value;
      },
      render: (name, item, i) => {
        return (
          <Tooltip title={item.ownerName}>
            <SubTitle>
              <MultiAvatar
                primaryTitle={item.ownerName}
                imageId={item.ownerImageId}
                imageURL={item.imageURL}
                imgWidth={"2.1em"}
                imgHeight={"2.1em"}
              />
            </SubTitle>
          </Tooltip>
        );
      },
    },
    {
      title: "",
      dataIndex: "id",
      width: "2%",
      render: (name, item, i) => {
        return (
          <Tooltip title={item.mobileNo} >
            {item.doNotCallInd !== true && (
              <span class=" mr-2 text-xs cursor-pointer"
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleSetCurrentContactId(item);
                }}
              >
               <PhoneInTalkIcon style={{fontSize:"0.8rem"}}/>
              </span>
            )}
            {item.doNotCallInd === true && (
              <span class=" mr-2 text-xs cursor-pointer"
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleSetCurrentContactId(item);
                }}
              >
                <PhoneDisabledIcon/>
              </span>
            )}
          </Tooltip>
        );
      },
    },
    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, i) => {
        //debugger
        return (
          <>
          <Tooltip title={item.emailId}>
            {/* {user.talentUpdateInd === true && ( */}
            <MailOutlineIcon
              type="mail"
              style={{ cursor: "pointer",fontSize:"0.8rem" }}
              onClick={() => {
                props.getContactById(item.contactId);
                props.handleContactEmailDrawerModal(true);
              }}
            />
            {/* )} */}</Tooltip>
          </>
        );
      },
    },

    {
      title: "",
      width: "2%",
      render: (name, item, i) => {
        const dataLoc = ` Address : ${item.address &&
          item.address.length &&
          item.address[0].address1} 
         Street : ${item.address &&
          item.address.length &&
          item.address[0].street}   
        State : ${item.address && item.address.length && item.address[0].state}
        City : ${item.address && item.address.length && item.address[0].city}
       Country : ${(item.address &&
            item.address.length &&
            item.address[0].country) ||
          ""} 
         PostalCode : ${item.address &&
          item.address.length &&
          item.address[0].postalCode} `;
        return (
          <Tooltip
            overlayStyle={{ maxWidth: "300px" }}
            title={dataLoc}
          >
            <span class=" cursor-pointer"
            >
                         <LocationOnIcon   style={{
                cursor: "pointer",
                fontSize: "0.8rem"
              }}/>
            </span>
          </Tooltip>
        );
      },
    },

    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, i) => {
        //debugger

        return (
          <>
            {/* {user.talentUpdateInd ===true && ( */}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleSetCurrentContactId(item);
                props.handleContactDrawerModal(true);
              }}
            >{user.pulseAccessInd === true && (
              <MonitorHeartIcon style={{fontSize:"0.8rem" ,color: "#df9697"}}/>
            )}
            </span>
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, i) => {
        return (
          <Tooltip
            title="Edit"
          >
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                props.setEditContact(item);
                handleUpdateContactModal(true);
                handleSetCurrentContactId(item);
              }}
            >
              <BorderColorIcon style={{fontSize:"0.8rem"}}/>
            </span>
          </Tooltip>
        );
      },
    },


  ];

  if (fetchingContactsError) {
    return <APIFailed />;
  }
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;
  return (
    <>
      {/* <Spin tip="Loading..." spinning={!fetchingContactsLazyLoading}> */}
      <Button
        type="primary"
        onClick={start}
        disabled={!hasSelected}
        loading={loading}
      >
        Clear
      </Button>
      <span
        style={{
          marginLeft: 8,
        }}
      >
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
      </span>
      <Button
        type="primary"
        onClick={handleTransferClick}
        disabled={!hasSelected}
      >
        Select
      </Button>
      {visibleselect && hasSelected && (
        <>
          <Select style={{ width: 120 }} onChange={handleSelected}>
            {mergedlist.map((item) => {
              return <Option value={item.value}>{item.label}</Option>;
            })}
          </Select>
          <Button type="primary" onClick={handleSend}>
            Transfer
          </Button>
        </>
      )}
         <InfiniteScroll
                dataLength={props.contactByUserId.length}
                next={handleLoadMore}
                hasMore={true}
                // loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                height={600}
            >
      <StyledTable
        // rowKey="contactId"
        rowSelection={rowSelection}
        rowKey={(record) => record.contactId}
        columns={columns}
        loading={fetchingContacts}
        pagination={false}
        dataSource={props.contactByUserId}
      />
      </InfiniteScroll>
      <Suspense fallback={<BundleLoader />}>      
      <UpdateContactModal
        contactData={currentContactId}
        // fullName={currentContactId}
        updateContactModal={updateContactModal}
        handleUpdateContactModal={handleUpdateContactModal}
        handleSetCurrentContactId={handleSetCurrentContactId}
      />
      <AddContactEmailDrawerModal
        // item={currentContactId}
        contactData={currentContactId}
        addDrawerContactEmailModal={props.addDrawerContactEmailModal}
        handleContactEmailDrawerModal={props.handleContactEmailDrawerModal}
      />
      <ReactContactSpeechModal
        // item={currentContactId}
        contactData={currentContactId}
        handleContactReactSpeechModal={handleContactReactSpeechModal}
        addContactSpeechModal={addContactSpeechModal}
        handleSetCurrentContactId={handleSetCurrentContactId}
      />
      {/* <AddDonotCallModal
        addDonotCallModal={props.addDonotCallModal}
        contactId={currentContactId}
        handleDonotCallModal={props.handleDonotCallModal}
      /> */}
      <AddContactDrawerModal
        item={currentContactId}
        addDrawerContactModal={props.addDrawerContactModal}
        handleContactDrawerModal={props.handleContactDrawerModal}
      />
      </Suspense>
    </>
  );
}
const mapStateToProps = ({
  auth,
  contact,
  account,
  designations,
  departments,
  opportunity,
}) => ({
  userId: auth.userDetails.userId,
  contactByUserId: contact.contactByUserId,
  sales: opportunity.sales,
  user: auth.userDetails,
  recruiterName: opportunity.recruiterName,
  fetchingContacts: contact.fetchingContacts,
  fetchingContactsError: contact.fetchingContactsError,
  updateContactModal: contact.updateContactModal,
  designations: designations.designations,
  departments: departments.departments,
  addDrawerContactEmailModal: contact.addDrawerContactEmailModal,
  addContactSpeechModal: contact.addContactSpeechModal,
  addDrawerContactModal: contact.addDrawerContactModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactListByUserId,
      handleUpdateContactModal,
      handleDonotCallModal,
      setEditContact,
      getDesignations,
      updateOwnercontactById,
      getRecruiterName,
      getAllSalesList,
      handleContactReactSpeechModal,
      handleContactDrawerModal,
      getContactById,
      handleContactEmailDrawerModal,
      emptyContact
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContactTable);
