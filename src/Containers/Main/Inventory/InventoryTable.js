import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Space, Button, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { getInventory, handleInventoryRoomRackModal } from "./InventoryAction";
import Highlighter from "react-highlight-words";
import InventoryDetailView from "./InventoryDetailView";
import InventoryRoomRackModal from "./InventoryRoomRackModal";
import { StyledTable } from "../../../Components/UI/Antd";

const InventoryTable = (props) => {
  const [rowData, setRowData] = useState({});

  const {
    getInventory,
    handleInventoryRoomRackModal,
    inventory,
    locationsType,
    userId,
    addroomrackininventory,
  } = props;

  useEffect(() => {
    getInventory(userId);
  }, [getInventory, userId]);

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
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
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
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
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

  const locationsTypeOption = locationsType.map((item) => ({
    text: item.locationType || "",
    value: item.locationType,
  }));
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight - 200;
  const columns = [
    {
      title: "",
      dataIndex: "",
      width: "2%",
    },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      render: (name, item, i) => {
        const currentdate = moment().format("DD/MM/YYYY");
        const date = moment(item.creationDate).format("DD/MM/YYYY");
        return (
          <>
            <InventoryDetailView locationDetailsId={item.locationDetailsId} inventoryName={item.name} />
            {date === currentdate ? (
              <span style={{ color: "tomato", fontWeight: "bold" }}>New</span>
            ) : null}
          </>
        );
      },
    },
    {
      title: "Management",
      dataIndex: "management",
      render: (name, item, i) => ({
        children: `${item.managementDetails.firstName || ""} ${item.managementDetails.lastName || ""}`,
      }),
      sorter: (a, b) => {
        const nameA = a.managementDetails.firstName.toLowerCase();
        const nameB = b.managementDetails.firstName.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      width: "8%",
      filters: locationsTypeOption,
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "Country",
      dataIndex: "country",
      ...getColumnSearchProps("country"),
      defaultSortOrder: "descend",
      render: (name, item, i) => (
        <span>{(item.addresses && item.addresses[0].country) || ""}</span>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "18%",
      render: (name, item, i) => (
        <span>
          {`${(item.addresses && item.addresses[0].city) || ""} ${" "}${(item.addresses && item.addresses[0].state) || ""
          }`}
        </span>
      ),
    },
    {
      title: "Pin Code",
      dataIndex: "pinCode",
      width: "8%",
      render: (name, item, i) => (
        <span>{(item.addresses && item.addresses[0].pinCode) || ""}</span>
      ),
    },
    {
      title: "",
      width: "12%",
      render: (name, item, i) => (
        <>
          <Button
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={() => {
              setRowData(item);
              handleInventoryRoomRackModal(true);
            }}
          >
            Confirgure Store
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <StyledTable
        columns={columns}
        dataSource={inventory}
        loading={props.fetchingInventoryList || props.fetchingInventoryListError}
        onChange={() => console.log("task onChangeHere...")}
        scroll={{ y: tableHeight }}
        pagination={false}
      />
      <InventoryRoomRackModal
        rowData={rowData}
        handleInventoryRoomRackModal={handleInventoryRoomRackModal}
        addroomrackininventory={addroomrackininventory}
      />
    </>
  );
};

const mapStateToProps = ({ inventory, auth, locations }) => ({
  userId: auth.userDetails.userId,
  fetchingInventoryList: inventory.fetchingInventoryList,
  inventory: inventory.inventory,
  locationsType: locations.locationsType,
  addroomrackininventory: inventory.addroomrackininventory,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInventory,
      handleInventoryRoomRackModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InventoryTable);
