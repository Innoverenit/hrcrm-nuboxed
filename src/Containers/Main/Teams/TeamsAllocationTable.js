import React, { useState, useEffect,Suspense, lazy  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { BundleLoader } from "../../../Components/Placeholder";
import { StyledTable } from "../../../Components/UI/Antd";
import dayjs from "dayjs";
import { Tooltip, Button, Input, Space } from "antd";
import Highlighter from "react-highlight-words";
import SearchIcon from '@mui/icons-material/Search';;
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import {
  getProductionExecutiveAndManager,
  setEditTeamsAllocation,
  handleUpdateTeamsAllocationModal,
} from "./TeamsAction";
const  UpdateTeamsAllocationModal =lazy(()=> import('./UpdateTeamsAllocationModal'));

function TeamsAllocationTable({
  productionExecutiveAndManager,
  fetchingProductionExecutiveAndManager,
  fetchingProductionExecutiveAndManagerError,
  updateTeamsAllocationModal,
  getProductionExecutiveAndManager,
  setEditTeamsAllocation,
  handleUpdateTeamsAllocationModal,
}) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const getColumnSearchProps = (dataIndex) => ({
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
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
           
            size="small"
            style={{ width: 90 }}
          >
           <SearchIcon ClassName="!text-icon" /> Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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
      <SearchIcon ClassName="!text-icon" style={{ color: filtered ? "#1890ff" : undefined }} />
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

  useEffect(() => {
    getProductionExecutiveAndManager();
  }, []);

  const columns = [
    {
      title: "",
      dataIndex: "",
      width: "2%",
    },
    {
      title: "Name",
      width: "18%",
      ...getColumnSearchProps("firstName"),
      render: (name, item, i) => {
        return (
          <>
            {item.firstName || ""} {item.middleName || ""} {item.lastName || ""}
          </>
        );
      },
    },
    {
      title: "Role",
      dataIndex: "designation",
      width: "10%",
      filters: [
        { text: "Executive", value: "Executive" },
        { text: "Manager", value: "Manager" },
      ],
      onFilter: (value, record) => record.designation.includes(value),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
    },
    {
      title: "Phone #",
      width: "10%",
      render: (name, item, i) => {
        return (
          <>
            {item.dialCode || ""} {item.phoneNo || ""}
          </>
        );
      },
    },
    {
      title: "Alternate No",
      width: "10%",
      render: (name, item, i) => {
        return (
          <>
            {item.dialCode1 || ""} {item.alternateNo || ""}
          </>
        );
      },
    },
    {
      title: "Start Date",
      width: "10%",
      dataIndex: "locationStartDate",
      render: (name, item, i) => {
        return <>{dayjs(item.locationStartDate).format("ll")}</>;
      },
    },
    {
      title: "End Date",
      width: "10%",
      dataIndex: "locationEndDate",
      render: (name, item, i) => {
        return <>{dayjs(item.locationEndDate).format("ll")}</>;
      },
    },
    {
      title: "Location",
      width: "8%",
      dataIndex: "locationDetailsName",
      ...getColumnSearchProps("locationDetailsName"),
    },
    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, i) => {
        //debugger
        return (
          <Tooltip title="Edit">
            <div
              style={{ cursor: "pointer", fontSize: "12px" }}
              onClick={() => {
                setEditTeamsAllocation(item);
                handleUpdateTeamsAllocationModal(true);
              }}
            />
          </Tooltip>
        );
      },
    },
  ];

  if (fetchingProductionExecutiveAndManagerError) {
    return <APIFailed />;
  }

  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight - 200;

  return (
    <>
      <Suspense fallback={<BundleLoader />}>
      <StyledTable
        columns={columns}
        dataSource={productionExecutiveAndManager}
        loading={fetchingProductionExecutiveAndManager || fetchingProductionExecutiveAndManagerError}
        onChange={() => console.log("task onChangeHere...")}
        pagination={false}
        scroll={{ y: tableHeight }}
      />

      <UpdateTeamsAllocationModal
        updateTeamsAllocationModal={updateTeamsAllocationModal}
        handleUpdateTeamsAllocationModal={handleUpdateTeamsAllocationModal}
      />
      </Suspense>
    </>
  );
}

const mapStateToProps = ({ teams, auth, plant }) => ({
  userId: auth.userDetails.userId,
  productionExecutiveAndManager: teams.productionExecutiveAndManager,
  fetchingProductionExecutiveAndManagerAndManager: teams.fetchingProductionExecutiveAndManager,
  plant: plant.plant,
  updateTeamsAllocationModal: teams.updateTeamsAllocationModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProductionExecutiveAndManager,
      setEditTeamsAllocation,
      handleUpdateTeamsAllocationModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TeamsAllocationTable);
