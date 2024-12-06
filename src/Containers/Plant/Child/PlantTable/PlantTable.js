import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../Components/UI/Antd";
import PlantDetailView from "./PlantDetailView";
import { Tooltip, Button, Input, Space } from "antd";
import {
  getPlant,
  setEditPlant,
  handleUpdatePlantModal,
} from "../../PlantAction";
import Highlighter from "react-highlight-words";
import SearchIcon from '@mui/icons-material/Search';
import dayjs from "dayjs";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

class PlantTable extends Component {
  componentDidMount() {
    this.props.getPlant(this.props.userId);
    // this.props.getLocationsType();
  }

  state = {
    searchText: "",
    searchedColumn: "",
  };
  getColumnSearchProps = (dataIndex) => ({
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
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
         
            size="small"
            style={{ width: 90 }}
          >
            <SearchIcon ClassName="!text-icon" /> Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
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
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
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
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const { plant, handleUpdatePlantModal, updatePlantModal } = this.props;
    // const locationsTypeOption = this.props.locationsType.map((item) => {
    //   return {
    //     text: item.locationType || "",
    //     value: item.locationtypeId,
    //   };
    // });
    const columns = [
      {
        title: "",
        dataIndex: "",
        width: "2%",
      },
      {
        title: "Name",
        width: "15%",
        dataIndex: "name",
        ...this.getColumnSearchProps("name"),
        render: (name, item, i) => {
          const currentdate = dayjs().format("DD/MM/YYYY");
          const date = dayjs(item.creationDate).format("DD/MM/YYYY");
          // const plantName = `${item.salutation || ""} ${item.firstName ||
          //   ""} ${item.middleName || ""} ${item.lastName || ""} `;
          return (
            <>
              <PlantDetailView
                locationDetailsId={item.locationDetailsId}
                plantName={item.name}
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
              ) : null}{" "}
            </>
          );
        },
      },
      {
        title: "Management",
        width: "14%",
        // dataIndex: "managementDetails",
        ...this.getColumnSearchProps("managementDetails"),
        render: (name, item, i) => {
          return {
            children: `${item.managementDetails.firstName || ""} 
            ${item.managementDetails.lastName || ""}`,
          };
        },
        
      },
      // {
      //   title: "Production Manager",
      //   dataIndex: "productionManager",
      //   width: "16%",
      //   ...this.getColumnSearchProps("productionManager"),
      //   render: (name, item, i) => {
      //     return {
      //       children: `${item.productionManagerDetails.firstName || ""} 
      //       ${item.productionManagerDetails.lastName || ""}`,
      //     };
      //   },
      //   width: "12%",
      // },
      {
        title: "Type",
        dataIndex: "type",
        width: "7%",
      //   filters: locationsTypeOption,
      //   onFilter: (value, record) => {
      //     return record.locationType === value;
      //   },

     },      
      {
        title: "Country",
        dataIndex: "country",
        width: "8%",
        ...this.getColumnSearchProps("country"),
        // defaultSortOrder: "descend",
        render: (name, item, i) => {
          return (
            <span>{(item.addresses && item.addresses[0].country) || ""}</span>
          );
        },
      },
      {
        title: "Address",
        dataIndex: "address",
        width: "18%",
        render: (name, item, i) => {
          return (
            <span>
              {`${(item.addresses && item.addresses[0].city) || ""}` +
                " " +
                `${(item.addresses && item.addresses[0].state) || ""}`}
            </span>
          );
        },
      },
      {
        title: "Pin Code",
        dataIndex: "pinCode",
        render: (name, item, i) => {
          return (
            <span>{(item.addresses && item.addresses[0].pinCode) || ""}</span>
          );
        },
        width: "8%",
      },
      
      // {
      //   title: "",
      //   dataIndex: "documentId",
      //   width: "2%",
      //   render: (name, item, i) => {
      //     //debugger
      //     return (
      //       <Tooltip title="Edit">
      //         <span
      //           style={{ cursor: "pointer", fontSize: "12px" }}
      //           onClick={() => {
      //             this.props.setEditPlant(item);
      //             handleUpdatePlantModal(true);
      //           }}
      //         >
      //           <i class="fas fa-pencil-alt"></i>
      //         </span>
      //       </Tooltip>
      //     );
      //   },
      // },
    ];

    if (this.props.fetchingPlantError) {
      return <NodataFoundPage />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight - 300;
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          columns={columns}
          dataSource={plant}
          loading={this.props.fetchingPlant || this.props.fetchingPlantError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
        />
        {/* <UpdatePlantModal
          updatePlantModal={updatePlantModal}
          handleUpdatePlantModal={handleUpdatePlantModal}
        /> */}
      </>
    );
  }
}

const mapStateToProps = ({ plant, auth, locations }) => ({
  userId: auth.userDetails.userId,
  fetchingPlant: plant.fetchingPlant,
  plant: plant.plant,
  updatePlantModal: plant.updatePlantModal,
  // locationsType: locations.locationsType,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPlant,
      setEditPlant,
      handleUpdatePlantModal,
      // getLocationsType, 
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlantTable);

function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
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
        <i className={`${iconType}`} style={{ fontSize: "20px" }}></i>
      </Button>
    </Tooltip>
  );
}
