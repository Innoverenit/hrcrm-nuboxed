import React, {  useEffect, useState, useMemo, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import styled from "styled-components";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import SearchIcon from '@mui/icons-material/Search';
import { StyledTable, StyledPopconfirm } from "../../Components/UI/Antd";
import { Button, Select, Tooltip, Input } from "antd";
import { MultiAvatar } from "../../Components/UI/Elements";
import {
  handleUpdateCandidateModal,
  handleupdateCandidateResumeModal,
  handleChoiceCandidateModal,
  setEditCandidate,
  updateOwnershipById,
  getBlackListCandidate,
  handleCandidateEmailModal,
  handleDonotCallModal,
  getCandidateBlackList,
} from "../Candidate/CandidateAction";
import { getRoles } from "../Settings/Category/Role/RoleAction";
import { getDesignations } from "../Settings/Designation/DesignationAction";
import Highlighter from "react-highlight-words";
import {
  getAllSalesList,
  getRecruiterName,
} from "../Opportunity/OpportunityAction";

const Option = Select;

function CandidateBlackListTable(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleselect, setvisibleselect] = useState(false);
  const [selectedValue, setselectedValue] = useState("");

  function handleTransferClick() {
    setvisibleselect(true);
  }
  function handlePreview() {
    props.handleContactDrawer();
  }

  function handleSelected(value) {
    setselectedValue(value);
    console.log(value);
  }
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

  const [page, setPage] = useState(0);

  useEffect(() => {
    props.getDesignations();
    props.getRoles(props.organizationId);
    props.getAllSalesList();
    props.getRecruiterName();
    props.getCandidateBlackList(props.userId);
  }, []);

  const [currentCandidateId, setCurrentCandidateId] = useState("");
  const [isViewAll, setIsViewAll] = useState(false);

  function handleSetCurrentCandidateId(candidateId) {
    setCurrentCandidateId(candidateId);
    console.log(candidateId);
  }
  const newSkill =
    props.skillList &&
    props.skillList.map((item) => {
      return { skillName: item };
    });

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
        <SearchIcon
          type="search"
          style={{ color: filtered ? "#1890ff" : undefined }}
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

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }

  const salelist = props.sales.map((item) => {
    return { label: item.fullName, value: item.employeeId };
  });
  const recruiterlist = props.recruiterName.map((item) => {
    return { label: item.fullName, value: item.employeeId };
  });
  const mergedlist = salelist.concat(recruiterlist);

  console.log("SlR", salelist, recruiterlist);

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

  const roleTypeOption = useMemo(() => {
    if (!props.roles) return [];
    return (
      props.roles.length &&
      props.roles.map((roles) => {
        return {
          text: roles.roleType || "",
          value: roles.roleType,
        };
      })
    );
  }, [props.roles]);
  const { user } = props;
  const {
    fetchingContactsLazyLoading,
    contactsLazyLoading,
    fetchingCandidates,
    fetchingCandidatesError,
    setEditCandidate,
    handleUpdateCandidateModal,
    handleupdateCandidateResumeModal,
    candidateByUserId,
    updateCandidateModal,
    handleChoiceCandidateModal,
    updateCandidateResumeModal,
  } = props;
  // console.log(address)
  const { imgRadius } = props;
  const columns = [
    {
      title: "",
      dataIndex: "imageId",
      width: "3%",
      render: (name, item, i) => {
        return (
          <div >
            <MultiAvatar
              primaryTitle={item.firstName}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"2.1em"}
              imgHeight={"2.1em"}
            />
          </div >
        );
      },
    },
    {
      title: "Name",
      dataIndex: "fullName",
      width: "13%",
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "",
      width: "2%",
    },
    {
      title: "Category" ,
      dataIndex: "category",
      width: "6%",
    },

    {
      title: "Vendor" ,
      dataIndex: "partnerName",
      width: "10%",
      ...getColumnSearchProps("partnerName"),
    },
    {
      title:"Role" ,
      dataIndex: "roleType",
      width: "8%",
      filters: roleTypeOption,

      onFilter: (value, record) => {
        return record.roleType === value;
      },
    },

    {
      title: (
       "Mobile #" 
      ),
      dataIndex: "mobileNumber",
      width: "10%",
      render: (name, item, i) => {
        return (
          <span>
            {item.countryDialCode} {item.mobileNumber}
          </span>
        );
      },
    },
    {
      title: "Country" ,
      dataIndex: "country",
      align: "left",
      sorter: (a, b) => {
        var nameA = a.country; // ignore upper and lowercase
        var nameB = b.country; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      },
      width: "8%",
    },
    {
      title: "Skills" ,
      width: "18%",
      ...getColumnSearchProps("skillList"),
    },

    {
      title: "Cost" ,
      dataIndex: "billing",
      align: "left",
      width: "6%",
    },

    {
      title: "",
      dataIndex: "id",
      width: "2%",
    },

    {
      title: "Benefits" ,
      dataIndex: "benifit",
      width: "6%",
      render: (name, item, i) => {
        return (
          <>
            <span>
              {item.benifit} {item.currency}
            </span>
          </>
        );
      },
    },

    {
      title: "Available" ,
      dataIndex: "availableDate",
      width: "7%",
      render: (text, item) => {
        const availableDate = dayjs(item.availableDate).format("ll");
        return (
          <>
            {item.availableDate === null ? (
              "None"
            ) : (
              <span>{dayjs(item.availableDate).format("l")}</span>
            )}
          </>
        );
      },
    },

    {
      // title: "",
      title: "Owner" ,
      // dataIndex: "ownerName",
      width: "8%",
      filters: ownerlistType,

      onFilter: (value, record) => {
        return record.fullName === value;
      },
      render: (name, item, i) => {
        return (
          <>
            <Tooltip title={item.ownerName}>
              <span>
                <MultiAvatar
                  primaryTitle={item.ownerName}
                  imageId={item.ownerImageId}
                  imageURL={item.imageURL}
                  imgWidth={"2.1em"}
                  imgHeight={"2.1em"}
                />
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
      title: "Active" ,
      // dataIndex: "active",
      width: "5%",
    },
    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, i) => {
        //debugger

        return (
          <>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                props.getCandidateById(item.candidateId);
                props.getCandidateDocument(item.candidateId);
                props.getCandidateTreeMap(item.candidateId);

                props.handleCandidateDrawerModal(true);
              }}
            >
              {user.pulseAccessInd === true && <PulseIcon></PulseIcon>}
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
        //debugger
        return (
          <StyledPopconfirm
            title="Do you want to blacklist?"
            onConfirm={() => props.getBlackListCandidate(item.candidateId)}
          >
            <ArrowCircleUpIcon
              type="up-circle"
              theme="filled"
              // type="edit"
              style={{ cursor: "pointer" }}
            />
          </StyledPopconfirm>
        );
      },
    },
  ];

  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight - 100;

  return (
    <>
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
          <Button type="primary" onClick={props.handleChoiceCandidateModal}>
            Email
          </Button>
        </>
      )}
      <StyledTable
        rowKey={(record) => record.candidateId}
        rowSelection={rowSelection}
        columns={columns}
        scroll={{ y: tableHeight }}
        pagination={false}
        dataSource={props.blackList}
      />
    </>
  );
}
const mapStateToProps = ({
  auth,
  role,
  candidate,
  account,
  designations,
  opportunity,
}) => ({
  userId: auth.userDetails.userId,
  blackList: candidate.blackList,
  candidateId: candidate.candidateByUserId.candidateId,
  addDonotCallModal: candidate.addDonotCallModal,
  candidateByUserId: candidate.candidateByUserId,
  fetchingCandidates: candidate.fetchingCandidates,
  fetchingCandidatesError: candidate.fetchingCandidatesError,
  updateCandidateModal: candidate.updateCandidateModal,
  designations: designations.designations,
  addCandidateChoiceModal: candidate.addCandidateChoiceModal,
  roles: role.roles,
  updateCandidateResumeModal: candidate.updateCandidateResumeModal,
  organizationId: auth.userDetails.organizationId,
  sales: opportunity.sales,
  recruiterName: opportunity.recruiterName,
  user: auth.userDetails,
  addCandidateEmailModal: candidate.addCandidateEmailModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCandidateBlackList,
      handleDonotCallModal,
      handleupdateCandidateResumeModal,
      handleUpdateCandidateModal,
      getBlackListCandidate,
      setEditCandidate,
      handleChoiceCandidateModal,
      getDesignations,
      getRoles,
      getAllSalesList,
      getRecruiterName,
      updateOwnershipById,
      handleCandidateEmailModal,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateBlackListTable);
const AppIcon = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "123%" }}
  ></i>
);

const PulseIcon = styled(AppIcon)`
  color: #df9697;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
