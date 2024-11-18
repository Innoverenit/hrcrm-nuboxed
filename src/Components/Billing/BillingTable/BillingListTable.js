import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../Components/UI/Antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MultiAvatar } from "../../../Components/UI/Elements";
import SearchIcon from '@mui/icons-material/Search';
import { CurrencySymbol } from "../../../Components/Common";
import { getCustomerTask } from "../../../Containers/Task/TaskAction"
import { Tooltip, Button, Input, Space } from "antd";
import Highlighter from 'react-highlight-words';
import "jspdf-autotable";
import { BundleLoader } from '../../../Components/Placeholder';
import { getDesignationWiseBilling } from "../BillingAction";

function BillingListTable(props) {

  const type = props.departmentType === "Management" ? "Management" : props.departmentType === "Recruit" ? "RecruitWoner" : "SalesWoner";
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
    const { userId, startDate, endDate, organizationId } = props;
    if (props.departmentType === "Management") {
      props.getDesignationWiseBilling(organizationId, startDate, endDate, type);
      props.getCustomerTask(props.orgId);
    } else {
      props.getDesignationWiseBilling(userId, startDate, endDate, type);
      props.getCustomerTask(props.orgId);
    }

  }, [props.userId, props.endDate,props.startDate, type])

  const [rowdata, setrowData] = useState({});

  const handleRowData = (data) => {
    setrowData(data);
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters, b
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            // ref={node => {
            //   searchInput = node;
            // }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 240, marginBottom: 8, display: "block" }}
          />
          <Space>
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
          </Space>
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
          // setTimeout(() => searchInput.select());
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
  const customerlistType = props.customerTaskList.map((item) => {
    return {
      text: item.name || "",
      value: item.name,
    };
  });



  const columns = [
    {
      title: "",
      //dataIndex: "logo",
      width: "2%",
    },
    {
      title: "Talent",
      dataIndex: "candidateName",
      width: "10%",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      width: "10%",
      filters: customerlistType,
      onFilter: (value, record) => {
        return record.customerName === value;
      },
      render: (name, item, i) => {
        return (
          <>
            <Tooltip title={item.customerName}>
              <span>
                <MultiAvatar
                  primaryTitle={item.customerName}
                  // imageId={item.ownerImageId}
                  // imageURL={item.imageURL}
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
      title: "Project",
      dataIndex: "projectName",
      width: "10%",
      render: (name, item, i) => {
        return (
          <>
            <Tooltip title={item.projectName}>
              <span>
                <MultiAvatar
                  primaryTitle={item.projectName}
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
      title: "Billing",
      dataIndex: "billingAmount",
      render: (text, item) => {
        return (
          <>
            <span>
              <CurrencySymbol currencyType={item.billableCurency} />
              &nbsp;
              {`${Number(item.billingAmount).toFixed(2)}`}
            </span>
          </>
        )
      },
      width: "10%",
    },
    {
      title: "Billable Hour",
      dataIndex: "hour",
      width: "10%",
    },
    {
      title: "Actual Hour (Total)",
      dataIndex: "finalBillableHour",
      width: "10%",
    },
    {
      title: "Actual Amount (Total)",
      render: (text, item) => {
        return (
          <>
            <span>
              <CurrencySymbol currencyType={item.billableCurency} />
              &nbsp;
              {`${Number(item.finalBillableAmount).toFixed(2)} `}
            </span>
          </>
        )
      },
      dataIndex: "finalBillableAmount",
      width: "10%",
    },
    {
      title: "Projected Hour (Total)",
      dataIndex: "actualBillableHour",
      width: "10%",
    },
    {
      title: "Projected Amount(Total)",
      dataIndex: "actualBillableAmount",
      render: (text, item) => {
        return (
          <>
            <span>
              <CurrencySymbol currencyType={item.billableCurency} />
              &nbsp;
              {`${Number(item.actualBillableAmount).toFixed(2)}  `}
            </span>
          </>
        )
      },
      width: "10%",
    },
    {
      title: "Deviation Hour (Total)",
      width: "10%",
      dataIndex: "deviationBillableHour",
      render: (text, item) => {
        const deviationBillableHr = Number(item.deviationBillableHour)
        // const amt = item.actualBillableAmount - item.finalBillableAmount
        // const devAmt=Number(amt).toFixed(2)
        return (
          <>
            <div
              style={{
                color:
                  deviationBillableHr < 0
                    ? "green"
                    : "red"

              }}
            >

              {deviationBillableHr}
            </div>
          </>
        )
      },
    },
    {
      title: "Deviation Amount(Total)",
      dataIndex: "deviationBillableAmount",
      render: (text, item) => {
        return (
          <>
            <div
              style={{
                color:
                  item.deviationBillableAmount < 0
                    ? "green"
                    : "red"

              }}
            >
              <CurrencySymbol currencyType={item.billableCurency} />
              &nbsp;
              {`${Number(item.deviationBillableAmount).toFixed(2)}  `}
            </div>
          </>
        )
      },
      width: "10%",
    },

  ]

  if (props.fetchingLeadsTabData) {
    return <BundleLoader />;
  }
  return (
    <>
      <StyledTable
        columns={columns}
        dataSource={props.billingByDesignation}
        pagination={false}
        scroll={{ y: 600 }}
      />
    </>
  )
}

const mapStateToProps = ({ billings, auth, task }) => ({
  billingByDesignation: billings.billingByDesignation,
  startDate: billings.startDate,
  endDate: billings.endDate,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  customerTaskList: task.customerTaskList,
  organizationId: auth.userDetails.organizationId,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getDesignationWiseBilling,
    getCustomerTask,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BillingListTable);