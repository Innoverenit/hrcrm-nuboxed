import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import dayjs from "dayjs";
import { Input, Space, Tooltip, Button } from "antd";
import APIFailed from "../../../../../../Helpers/ErrorBoundary/APIFailed";
import {
  handleDeputeButtonModal,
  setEditPlantAllocation,
} from "../../../../PlantAction";
import Highlighter from "react-highlight-words";
import SearchIcon from '@mui/icons-material/Search';;

class AllocationTable extends Component {
  componentDidMount() {
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
    // const shiftName = this.props.shift.map((item) => {
    //   return {
    //     text: item.shiftName || "",
    //     value: item.shiftId,
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
        width:"18%",
        ...this.getColumnSearchProps("name"),
        render: (name, item, i) => {
          return (
            <>
              {item.firstName || ""} {item.middleName || ""}{" "}
              {item.lastName || ""}
            </>
          );
        },
      },
      {
        title: "Email",
        dataIndex: "email",
        width:"20%",
      },
      {
        title: "Phone #",
        width:"10%",
        //   dataIndex: "phoneNo",
        render: (name, item, i) => {
          return (
            <>
              {item.dialCode || ""} {item.phoneNo || ""}
            </>
          );
        },
      },

      {
        title: "Shift",
        width: "8%",
        dataIndex: "shiftName",
        // filters: shiftName,

        // onFilter: (value, record) => {
        //   return record.shiftName === value;
        // },
      },
      {
        title: "Start Date",
        width:"10%",
        dataIndex: "shiftStartDate",
        render: (name, item, i) => {
          return <>{dayjs(item.shiftStartDate).format("ll")}</>;
        },
      },
      {
        title: "End Date",
        width:"10%",
        dataIndex: "shiftEndDate",
        render: (name, item, i) => {
          return <>{dayjs(item.shiftEndDate).format("ll")}</>;
        },
      },

      // {
      //   title: "",
      //   // dataIndex: "shiftName",
      //   render: (name, item, i) => {
      //     return item.shiftName === "Not Assigned" ? (
      //       <AllShift value={item.shiftName} starter />
      //     ) : (
      //       item.shiftName
      //     );
      //   },
      // },
      // {
      //   title: "",
      //   // dataIndex: "documentId",
      //   // width: "2%",
      //   render: (name, item, i) => {
      //     //debugger
      //     return (
      //       <>
      //         {item.shiftName === "Not Assigned" && (
      //           // {/* {item.shiftName !== "Not Assigned" && ( */}
      //           <Tooltip title="Edit">
      //             <span
      //               style={{ cursor: "pointer", fontSize: "12px" }}
      //               onClick={() => {
      //                 this.props.setEditPlantAllocation(item);
      //                 // handleUpdatePlantModal(true);
      //                 //   // handleSetCurrentLeadsId(item.leadsId);
      //               }}
      //             >
      //               <i class="fas fa-pencil-alt"></i>
      //             </span>
      //           </Tooltip>
      //         )}
      //       </>
      //     );
      //   },
      // },

      {
        title: "",
        // dataIndex: "documentId",
        width: "2%",
        render: (name, item, i) => {
          //debugger
          return (
            <>
              {/* {item.shiftName === "Not Assigned" && ( */}
              {/* {item.shiftName !== "Not Assigned" && ( */}
              <Tooltip title="Assign Shift">
                <span
                  style={{ cursor: "pointer", fontSize: "0.75em" }}
                  onClick={() => {
                    this.props.setEditPlantAllocation(item);
                    this.props.handleAssignShiftModal(true);
                  }}
                >
                  <i class="fas fa-user-clock"></i>
                </span>
              </Tooltip>
              {/* )} */}
            </>
          );
        },
      },
    ];

    if (this.props.fetchingProductionExecutiveError) {
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight - 200;
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          columns={columns}
          // dataSource={this.props.productionExecutive}
          // loading={
          //   this.props.fetchingProductionExecutive ||
          //   this.props.fetchingProductionExecutiveError
          // }
          onChange={console.log("task onChangeHere...")}
          pagination={false}
          scroll={{ y: tableHeight }}
        />
        {/* <DeputeButtonModal
          deputeButtonModal={this.props.deputeButtonModal}
          handleDeputeButtonModal={this.props.handleDeputeButtonModal}
        />
        <AssignShiftModal
          handleAssignShiftModal={this.props.handleAssignShiftModal}
          assignShiftModal={this.props.assignShiftModal}
        /> */}
      </>
    );
  }
}

const mapStateToProps = ({ shift, auth, plant }) => ({
  userId: auth.userDetails.userId,
  // productionExecutive: shift.productionExecutive,
  // fetchingProductionExecutive: shift.fetchingProductionExecutive,
  // deputeButtonModal: plant.deputeButtonModal,
  // shift: shift.shift,
  // addingExecutive: plant.addingExecutive,
  // locationDetailsId: plant.plantDetailById.locationDetailsId,
  // assignShiftModal: shift.assignShiftModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getProductionExecutive,
      handleDeputeButtonModal,
      setEditPlantAllocation,
      // handleAssignShiftModal,
      // getShift,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllocationTable);

function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
  if (role === type) {
    size = "1.375em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.375em",
          borderColor: "transparent",
          color: role === type ? "#1890ff" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        <i className={`${iconType}`} style={{ fontSize: "1.25em" }}></i>
      </Button>
    </Tooltip>
  );
}
