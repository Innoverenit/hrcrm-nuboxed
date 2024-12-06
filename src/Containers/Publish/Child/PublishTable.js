import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { FormattedMessage } from 'react-intl';
import SearchIcon from '@mui/icons-material/Search';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PublishStatusToggle from "../PublishStatusToggle";
import {
  Tooltip,
  Input,
  Button,
  Avatar,
} from "antd";
import Highlighter from "react-highlight-words";
import { StyledTable } from "../../../Components/UI/Antd";
import { MultiAvatar2 } from "../../../Components/UI/Elements";
import { getPublishTable } from "../PublishAction";


function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function PublishTable(props) {
  useEffect(() => {
    props.getPublishTable();
  }, []);
  const [currentOpportunityId,subTableVisible, setCurrentOpportunityId] = useState("");
  function handleClickCandidateName(recruitmentId) {
    this.setState({
      subTableVisible: !this.state.subTableVisible,
      recruitmentId: recruitmentId,
    });
  }
  function handleSetCurrentOpportunityId(opportunityId) {
    setCurrentOpportunityId(opportunityId);
    console.log(opportunityId);
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
          
            size="small"
            style={{ width: 90 }}
          >
            <SearchIcon ClassName="!text-icon" /> Search
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
        <SearchIcon ClassName="!text-icon"
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
  const columns = [
    {
      title: "",
      width: "2%",
    },
    {
      //title: "Currency",
      title: <FormattedMessage id="app.jobId" defaultMessage="Job ID" />,
      dataIndex: "jobOrder",
      width: "15%",
      ...getColumnSearchProps('jobOrder'),
    },
    {
      //title: "Name",
      title: (
        <FormattedMessage id="app.requirement" defaultMessage="Requirement" />
      ),
      width: "14%",

      dataIndex: "requirementName",
      ...getColumnSearchProps('requirementName'),
    },
    {
      //title: "Currency",
      title: <FormattedMessage id="app.customer" defaultMessage="Customer" />,

      dataIndex: "customerName",
      //   ...getColumnSearchProps('customer'),
      width: "10%",
      ...getColumnSearchProps('customerName'),
    },
    {
      //title: "Currency",
      title: (
        <FormattedMessage id="app.opprtunity" defaultMessage="Opprtunity" />
      ),

      dataIndex: "opprtunityName",
      //   ...getColumnSearchProps('customer'),
      width: "12%",
      ...getColumnSearchProps('opprtunityName'),
    },
    {
      //title: "Currency",
      title: <FormattedMessage id="app.sponsor" defaultMessage="Sponsor" />,
      dataIndex: "sponserName",
      width: "7%",
      ...getColumnSearchProps('sponserName'),
      render: (name, item, i) => {
        return (
          <>
        <span>
        {item.sponserName === null ? (
            ""
          ) : (
              <MultiAvatar2
                primaryTitle={item.sponserName}
                imgWidth={"1.8em"}
                imgHeight={"1.8em"}
              />
          )}
      </span>
          </>
        );
      },
    },
    {
      //title: "Start Date",
      title: (
        <FormattedMessage id="app.positions" defaultMessage="# Positions" /> 
      ),
      dataIndex: "number",
      width: "7%",
    },
    {
      //title: "Value",
      title: <FormattedMessage id="app.submitted" defaultMessage="Submitted" />,
      dataIndex: "offered",
      width: "8%",
      onFilter: (value, record) => record.proposalAmount.indexOf(value) === 0,
    },
    {
      //title: "Value",
      title: <FormattedMessage id="app.selected" defaultMessage="Selected" />,
      dataIndex: "closedPosition",
      width: "7%",
      onFilter: (value, record) => record.proposalAmount.indexOf(value) === 0,
    },
    {
      //title: "End Date",
      title: (
        <FormattedMessage id="app.onBoarded" defaultMessage="On Boarded" />
      ),
      dataIndex: "onBoardNo",
      width: "10%",
    },
    {
      title: "Recruiter",
      width: "11%",
      render: (name, item, i) => {
        return {

          children: (
            <>
              <Avatar.Group
                maxCount={2}
                maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
              >
                {item.recruiterList &&
                  item.recruiterList.map((item, i) => {
                    const data = item.fullName
                    .slice(0,2)
                    .split("")[0]
                    .toUpperCase();
                    console.log("datas", data);
                    return (
                      <Tooltip title={item.fullName}>
                        <Avatar style={{ backgroundColor: "#f56a00" }} >
                        {data}
                        </Avatar>
                      </Tooltip>
                    );
                  })}
              </Avatar.Group>
            </>
          ),
        };
      },
    },

    {
      title: "Pin to the top",
      width: "10%",
      render: (name, item, i) => {
        return (
          <span>
            <PublishStatusToggle
              recruitmentId={item.recruitmentId}
              pingInd={item.pingInd}
            />
          </span>
        );
      },
    },
    {
      title: "Status",
      width: "8%",                   
      render: (name, item, i) => {
        return (
          <Button 
          >
            {item.closeInd === true ? "Publish" : "Unpublish"}
            {/* Publish */}
          </Button>
        );
      },
    },
    {
      title: "",
      dataIndex: "id",
      width: "2%",
      render: (name, item, i) => {
        return (
          <Tooltip>
            <span class="mr-2 text-sm cursor-pointer"
              onClick={() => {
                this.props.LinkOpenedRequirement(
                  item.recruitmentId,
                  this.handleCallback
                );
              }}
            >
              <LockOpenIcon  style={{fontSize: "0.8rem",}} />
            </span>
          </Tooltip>
        );
      },
    },
  ];
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight - 100;
  return (
    <>
      <StyledTable
        columns={columns}
        dataSource={props.tablePublish}
        onChange={onChange}
        Loading={props.fetchingpublishTable || props.fetchingpublishTableError}
        scroll={{ y: tableHeight }}
        pagination={false}
      />
    </>
  );
}

// }
const mapStateToProps = ({
  auth,
  account,
  employee,
  publish,
  opportunity,
}) => ({
  tablePublish: publish.tablePublish,
  employee: employee.employee,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPublishTable,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(PublishTable);
