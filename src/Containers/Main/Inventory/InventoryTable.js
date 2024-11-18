import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Space, Button, Tooltip } from "antd";
import SearchIcon from '@mui/icons-material/Search';;
import dayjs from "dayjs";
import { Link } from "../../../Components/Common";
import { getInventory, handleInventoryRoomRackModal } from "./InventoryAction";
import Highlighter from "react-highlight-words";
import InventoryRoomRackModal from "./InventoryRoomRackModal";
import { StyledTable } from "../../../Components/UI/Antd";

const InventoryTable = (props) => {
  const [rowData, setRowData] = useState({});

  const {
    getInventory,
    handleInventoryRoomRackModal,
    inventory,
    locationsType,
    orgId,
    addroomrackininventory,
  } = props;

  useEffect(() => {
    getInventory(orgId);
  }, [getInventory, orgId]);

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

  // const locationsTypeOption = locationsType.map((item) => ({
  //   text: item.locationType || "",
  //   value: item.locationType,
  // }));
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight - 200;
  const { inventoryInd } = props;

  const filteredData = inventory.filter((item) => item.inventoryInd === true);
  const columns = [
    {
      title: "",
      dataIndex: "",
      width: "2%",
    },
    {
      title: "Name",
      // width: "15%",
      dataIndex: "locationName",
      // ...this.getColumnSearchProps("locationName"),
      render: (name, item, i) => {
        const currentdate = dayjs().format("DD/MM/YYYY");
        const date = dayjs(item.creationDate).format("DD/MM/YYYY");
        // const plantName = `${item.salutation || ""} ${item.firstName ||
        //   ""} ${item.middleName || ""} ${item.lastName || ""} `;
        return (
          <>
            {" "}
            <Link toUrl={`locationDetails/${item.locationDetailsId}`} title={`${item.locationName}`} />
            &nbsp;&nbsp;
            {/* <InventoryDetailView
              locationDetailsId={item.locationDetailsId}
              inventoryName={item.locationName}
            /> */}
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
      title: "Supervisor",
      dataIndex: "management",
      // render: (name, item, i) => ({
      //   children: `${item.managementDetails.firstName || ""} ${item.managementDetails.lastName || ""}`,
      // }),
      // sorter: (a, b) => {
      //   const nameA = a.managementDetails.firstName.toLowerCase();
      //   const nameB = b.managementDetails.firstName.toLowerCase();
      //   if (nameA < nameB) {
      //     return -1;
      //   }
      //   if (nameA > nameB) {
      //     return 1;
      //   }
      //   return 0;
      // },
    },
    // {
    //   title: "Type",
    //   dataIndex: "type",
    //   width: "8%",
    //   // filters: locationsTypeOption,
    //   onFilter: (value, record) => record.type === value,
    // },
    {
      title: "Country",
      dataIndex: "country_name",
      ...getColumnSearchProps("country_name"),
      defaultSortOrder: "descend",
      render: (name, item, i) => (
        <span>{(item.address && item.address[0].country) || ""}</span>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "18%",
      render: (name, item, i) => (
        <span>
          {`${(item.address && item.address[0].city) || ""} ${" "}${(item.address && item.address[0].state) || ""
          }`}
        </span>
      ),
    },
    {
      title: "Pin Code",
      dataIndex: "postalCode",
      width: "8%",
      render: (name, item, i) => (
        <span>{(item.address && item.address[0].postalCode) || ""}</span>
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
        dataSource={filteredData}
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
  orgId:auth.userDetails.organizationId,
  fetchingInventoryList: inventory.fetchingInventoryList,
  inventory: inventory.inventory,
  // locationsType: locations.locationsType,
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
