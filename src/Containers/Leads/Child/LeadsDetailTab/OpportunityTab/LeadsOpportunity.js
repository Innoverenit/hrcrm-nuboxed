import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import Highlighter from "react-highlight-words";
import { Link } from "../../../../../Components/Common";
import dayjs from "dayjs";
import { StyledTable } from "../../../../../Components/UI/Antd";
import {
  MultiAvatar,
  SubTitle,
} from "../../../../../Components/UI/Elements";
import {
  SearchOutlined,
} from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { CurrencySymbol } from "../../../../../Components/Common";
import { getOpportunityListByLeadsId,handleUpdateLeadsOpportunityModal,
  setEditLeadsOpportunity} from "../../../LeadsAction";
import { Tooltip,Button,Input } from "antd";
import AddLeadsUpdateOpportunityModal from "./AddLeadsUpdateOpportunityModal";

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function OpportunityTable(props) {
  useEffect(() => {
    props.getOpportunityListByLeadsId(props.leadsId);
  }, []);
  console.log(props.leadsId);
  const [currentLeadsId, setCurrentLeadsId] = useState("");

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
  
  function handleSetCurrentLeadsId(leadsId) {
    setCurrentLeadsId(leadsId);
    console.log(leadsId);
  }
  const {
    user,
    handleUpdateLeadsOpportunityModal,
    fetchingLeadsOpportunity,
    opportunityByLeadsId,
    fetchingLeadsOpportunityError,
    addUpdateLeadsOpportunityModal,
    setEditLeadsOpportunity,
  } = props;
  const columns = [
    {
      title: "",
      width: "2%",
    },
    {
      title: "",
      dataIndex: "imageId",
      width: "3%",
      render: (name, item, i) => {
        return (
          <SubTitle>
            <MultiAvatar
              primaryTitle={item.accountName}
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
      title: "",
      width: "1%",
    },
    { title: "Name",
       dataIndex:"opportunityName",
       width:"25%",
       ...getColumnSearchProps('opportunityName'),
       render(name, item, ) {
        return (
          <>
           <Link
              toUrl={`/opportunity/${item.opportunityId}`}
              title={`${item.opportunityName || ""} `}
            />
          </>
        );
      }
   },
    {
      //title: "Start Date",
      title: (
        <FormattedMessage id="app.startDate" defaultMessage="Start Date" />
      ),
      dataIndex: "startDate",
      width: "20%",
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        var startDateA = a.startDate; // ignore upper and lowercase
        var startDateB = b.startDate; // ignore upper and lowercase
        if (startDateA < startDateB) {
          return -1;
        }
        if (startDateA > startDateB) {
          return 1;
        }

        return 0;
      },
      render: (text, item) => {
        const startDate = dayjs(item.startDate).format("ll");
        return <span>{startDate}</span>;
      },
    },
    {
      //title: "End Date",
      title: <FormattedMessage id="app.endDate" defaultMessage="End Date" />,
      dataIndex: "endDate",
      width: "20%",
      defaultSortOrder: "descend",
      render: (text, item) => {
        const endDate = dayjs(item.endDate).format("ll");
        return <span>{endDate}</span>;
      },
      sorter: (a, b) => {
        var endDateA = a.endDate; // ignore upper and lowercase
        var endDateB = b.endDate; // ignore upper and lowercase
        if (endDateA < endDateB) {
          return -1;
        }
        if (endDateA > endDateB) {
          return 1;
        }

        return 0;
      },
    },
    {
      //title: "Value",
      title: (
        <FormattedMessage
          id="app.proposalAmount"
          defaultMessage="Value"
        />
      ),
      dataIndex: "proposalAmount",
      width: "20%",
      onFilter: (value, record) => record.proposalAmount.indexOf(value) === 0,
      render: (name, item, i) => {        
        return (
          <>
            {/* {item.proposalAmount} {item.currency} */}
            <span>
            <CurrencySymbol currencyType={item.currency} />
            {item.proposalAmount}
          </span>
          </>
        );
      },
    },


    {
      //title: "sponsor",
      title: (
        <FormattedMessage
          id="app.sponsor"
          defaultMessage="Sponsor"
        />
      ),
      dataIndex: "contactName",
      width: "10%",
      onFilter: (value, record) => record.contactName.indexOf(value) === 0,
      render: (name, item, i) => {        
        return (
          <>
            {item.contactName} 
          </>
        );
      },
      render: (name, item, i) => {
        return (
          <>
            <Tooltip title={item.contactName}>
              <span>
                <MultiAvatar
                  primaryTitle={item.contactName}
                  imageId={item.imageId}
                  imageURL={item.imageURL}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
              </span>
            </Tooltip>

          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "documentId",
      width:"2%",
      render: (name, item, i) => {
        return (
          <Tooltip title="Edit">
             {user.opportunityUpdateInd ===true && (
         <BorderColorIcon
        
              type="edit"
              style={{ cursor: "pointer",fontSize: "0.8rem", }}
              onClick={() => {
                props.setEditLeadsOpportunity(item);
                handleUpdateLeadsOpportunityModal(true);
                handleSetCurrentLeadsId(item.leadsId)
                
              }}
            />
            )}
          </Tooltip>
        );
      },
    },
    {
      title: "",
      width: "1%",
    },
  ];
  const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
  return (
    <>
      <StyledTable
        // rowSelection={rowSelection}
        rowKey="opportunityId"
        columns={columns}
        dataSource={
          !Array.isArray(opportunityByLeadsId) ? [] : opportunityByLeadsId
        }
        scroll={{ y: tableHeight }}
        pagination={false

        }
      />
      <AddLeadsUpdateOpportunityModal
      leadsId={currentLeadsId}
       addUpdateLeadsOpportunityModal={addUpdateLeadsOpportunityModal}
        handleUpdateLeadsOpportunityModal={handleUpdateLeadsOpportunityModal}
        handleSetCurrentLeadsId={handleSetCurrentLeadsId}
        
      />
    </>
  );
}
// }
const mapStateToProps = ({ leads,auth }) => ({
  user: auth.userDetails,
  fetchingLeadsOpportunity: leads.fetchingLeadsOpportunity,
  fetchingLeadsOpportunityError: leads.fetchingLeadsOpportunityError,
  leadsId: leads.lead.leadsId,
  opportunityByLeadsId: leads.opportunityByLeadsId,
  addUpdateLeadsOpportunityModal:leads.addUpdateLeadsOpportunityModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    getOpportunityListByLeadsId,
    handleUpdateLeadsOpportunityModal,
     setEditLeadsOpportunity,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityTable);
