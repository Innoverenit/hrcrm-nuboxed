import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import { getAllSalesList } from "../../../Opportunity/OpportunityAction";
import PartnerDetailView from "./PartnerDetailView";
import { StyledTable } from "../../../../Components/UI/Antd";
import { Button, Select, Tooltip, Input } from "antd";
import {
  MultiAvatar,
  MultiAvatar2,
  SubTitle,
} from "../../../../Components/UI/Elements";
import { getContactPartnerListByUserId } from "../../ContactAction";
import { BundleLoader } from "../../../../Components/Placeholder";
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
import { getSectors } from "../../../Settings/Sectors/SectorsAction";
import { getDesignations } from "../../../Settings/Designation/DesignationAction";
import ReactPartnerSpeechModal from "../../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/Child/ReactPartnerSpeechModal";
import {
  handlePartnerReactSpeechModal,
  handleDonotCallModal,
} from "../../../Partner/PartnerAction";
const Option = Select;

function ContactTable(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [visibleselect, setvisibleselect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPartnerId, setCurrentPartnerId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedValue, setselectedValue] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    props.getContactPartnerListByUserId(props.userId, page);
    setPage(page + 1);
    props.getAllSalesList();
  }, []);

  function handleSelected(value) {
    setselectedValue(value);
    console.log(value);
  }

  const handleLoadMore = () => {
    setTimeout(() => {
      setPage(page + 1);
      props.getContactPartnerListByUserId(
        props.currentPartnerUser ? props.currentPartnerUser : props.userId,
        page
      );
    }, 100);
  };
  function handleSend() {
    let data = {
      // userId:selectedValue,
      candidateIds: selectedRowKeys,
    };
    setselectedValue(props.updateOwnershipById(selectedValue, data));
    console.log(selectedValue, selectedRowKeys);
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

  function handleSetCurrentPartnerId(partnerId) {
    setCurrentPartnerId(partnerId);
    console.log(partnerId);
  }
  const salelist = props.sales.map((item) => {
    return { label: item.fullName, value: item.employeeId };
  });
  const recruiterlist = props.recruiterName.map((item) => {
    return { label: item.fullName, value: item.employeeId };
  });
  const mergedlist = salelist.concat(recruiterlist);

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
            // ref={node => {
            //   this.searchInput = node;
            // }}
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
            icon={<SearchOutlined />}
            //icon="search"
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          &nbsp;
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          &nbsp;
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
          style={{ color: filtered ? "tomato" : "1890ff" }}
        />
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

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }

  const sectorNameOption = useMemo(() => {
    if (!props.sectors) return [];
    return (
      props.sectors.length &&
      props.sectors.map((sectors) => {
        return {
          text: sectors.sectorName || "",
          value: sectors.sectorName,
        };
      })
    );
  }, [props.sectors]);

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
    fetchingContactPartners,
    fetchingContactPartnersError,
    contactPartnerByUserId,
    handlePartnerReactSpeechModal,
    addPartnerSpeechModal,
    handleUpdateContactModal,
    updateContactModal,
  } = props;
  if (fetchingContactPartners) {
    return <BundleLoader />;
  }
  const { imgRadius } = props;
  const columns = [
    {
      title: "",
      dataIndex: "imageId",
      width: "5%",
      render: (name, item, i) => {
        return (
          <SubTitle>
            <MultiAvatar2
              primaryTitle={item.firstName}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"2.5em"}
              imgHeight={"2.5em"}
            />
          </SubTitle>
        );
      },
    },
    {
      //title: "Name",
      title: <FormattedMessage id="app.name" defaultMessage="Name" />,
      dataIndex: "firstName",
      ...getColumnSearchProps("firstName"),
      width: "15%",
      defaultSortOrder: "descend",
      render: (name, item, i) => {
        const fullName = `${item.salutation || ""} ${item.firstName || ""} ${
          item.middleName || ""
        } ${item.lastName || ""} `;
        const currentdate = dayjs().format("DD/MM/YYYY");
        const date = dayjs(item.creationDate).format("DD/MM/YYYY");
        console.log(date, currentdate, currentdate === date);
        return (
          <>
            <PartnerDetailView
              contactId={item.contactId}
              contactName={fullName}
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
    {
      //title: "Company",
      title: <FormattedMessage id="app.company" defaultMessage="Company" />,
      dataIndex: "tagWithCompany",
      ...getColumnSearchProps("tagWithCompany"),
      width: "15%",
    },
    {
      //title: "Designation",
      title: (
        <FormattedMessage id="app.designation" defaultMessage="Designation" />
      ),
      dataIndex: "designation",
      width: "15%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.designation - b.designation,
      filters: designationTypeOption,

      onFilter: (value, record) => {
        return record.designation === value;
      },
    },
    {
      //title: "Department",
      title: <FormattedMessage id="app.sector" defaultMessage="Sector" />,
      width: "15%",
      dataIndex: "department",
      // dataIndex:"secor",
      filters: sectorNameOption,

      onFilter: (value, record) => {
        return record.sector === value;
      },
    },

    {
      title: (
        <FormattedMessage id="app.Portal Acess" defaultMessage="Portal Acess" />
      ),
      width: "8%",
    },

    {
      //title: "Email",
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
          // <Tooltip title= {item.countryDialCode.concat(item.mobileNumber)}>
          <Tooltip>
            {item.doNotCallInd !== true && (
              <span class=" text-xs cursor-pointer"
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleSetCurrentPartnerId(item.partnerId);
                }}
              >
                <PhoneInTalkIcon style={{ fontSize:"0.8rem" }} />
              </span>
            )}
            {item.doNotCallInd === true && (
              <span class=" text-base cursor-pointer"
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleSetCurrentPartnerId(item.partnerId);
                }}
                style={{
                  color: item.doNotCallInd === true && "red",
                }}
              >
                <PhoneDisabledIcon style={{fontSize:"0.8rem"}} />
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
            {/* {user.talentUpdateInd === true && ( */}
            <MailOutlineIcon
              type="mail"
              style={{ cursor: "pointer",fontSize:"0.8rem" }}
              onClick={() => {
                props.handleCandidateRowEmailModal(true);
              }}
            />
            {/* )} */}
          </>
        );
      },
    },

    {
      title: "",
      width: "2%",
      render: (name, item, i) => {
        const dataLoc = ` Address : ${
          item.address && item.address.length && item.address[0].address1
        } 
        Address2 : ${
          item.address && item.address.length && item.address[0].address2
        } 
         Street : ${
           item.address && item.address.length && item.address[0].street
         }   
        State : ${item.address && item.address.length && item.address[0].state}
        City : ${item.address && item.address.length && item.address[0].city}
       Country : ${
         (item.address && item.address.length && item.address[0].country) || ""
       } 
         PostalCode : ${
           item.address && item.address.length && item.address[0].postalCode
         } `;
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
  ];

  if (fetchingContactPartnersError) {
    return <APIFailed />;
  }

  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;
  return (
    <>
      {/* <Spin tip="Loading..." spinning={!fetchingContactPartnersLazyLoading}> */}
      {visibleselect && hasSelected && (
        <>
          <Select style={{ width: 120 }} onChange={handleSelected}>
            {mergedlist.map((item) => {
              return <Option value={item.value}>{item.label}</Option>;
            })}
          </Select>
        </>
      )}
      <InfiniteScroll
        dataLength={props.contactPartnerByUserId.length}
        next={handleLoadMore}
        hasMore={true}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        height={600}
      >
        <StyledTable
          rowKey="contactId"
          columns={columns}
          loading={fetchingContactPartners}
          dataSource={contactPartnerByUserId}
          pagination={false}
        />
      </InfiniteScroll>

      <ReactPartnerSpeechModal
        //partnerId={partnerId}
        handlePartnerReactSpeechModal={handlePartnerReactSpeechModal}
        addPartnerSpeechModal={addPartnerSpeechModal}
      />
    </>
  );
}
const mapStateToProps = ({
  auth,
  partner,
  contact,
  account,
  sector,
  designations,
  opportunity,
}) => ({
  userId: auth.userDetails.userId,
  sales: opportunity.sales,
  recruiterName: opportunity.recruiterName,
  contactPartnerByUserId: contact.contactPartnerByUserId,
  fetchingContactPartners: contact.fetchingContactPartners,
  fetchingContactPartnersError: contact.fetchingContactPartnersError,
  sectors: sector.sectors,
  designations: designations.designations,
  partnerId: partner.partnerId,
  addPartnerSpeechModal: partner.addPartnerSpeechModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactPartnerListByUserId,
      getSectors,
      handleDonotCallModal,
      getDesignations,
      getAllSalesList,
      handlePartnerReactSpeechModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContactTable);
