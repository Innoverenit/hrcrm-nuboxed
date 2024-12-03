import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from 'react-intl';
import {
  getContactShipperList,
  handleUpdateShipperContactModal,
  setEditShipperContact,
} from "./ShipperAction";
import { Tooltip, Input, Button, Space } from "antd";
import SearchIcon from '@mui/icons-material/Search';;
import BorderColorIcon from "@mui/icons-material/BorderColor";
// import UpdateShipperContactModal from "./UpdateShipperContactModal";
import Highlighter from "react-highlight-words";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../Components/Placeholder";

class ShipperContactTable extends Component {
  componentDidMount() {
    this.props.getContactShipperList(this.props.shipperId);
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
<SearchIcon ClassName="!text-icon" />Search
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
    const columns = [
      {
        title: "Name",
        ...this.getColumnSearchProps("firstName"),
        render: (name, item, i) => {
          return ` ${item.salutation || ""} ${item.firstName ||
            ""} ${item.middleName || ""} ${item.lastName || ""}`;
        },
      },
      {
        title: "Email",
        dataIndex: "emailId",
        width: "18%",
      },
      {
        title: "Mobile No",
        render: (name, item, i) => {
          return ` ${item.dialCode1 || ""} ${item.mobileNo || ""} `;
        },
      },
      {
        title: "Designation",
        dataIndex: "designationName",
        width: "13%",
        // address1+street
      },
      {
        title: "Department",
        dataIndex: "departmentName",
        width: "13%",
      },
      {
        title: "",
        width: "2%",
        dataIndex: "documentId",
        render: (name, item, i) => {
          return (
            <Tooltip title="Edit">
              <BorderColorIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.props.setEditShipperContact(item);
                  this.props.handleUpdateShipperContactModal(true);
                }}
              />
            </Tooltip>
          );
        },
      },
    ];

    // if (this.props.fetchingDistributorHistoryError) {
    //     return <APIFailed />
    // }
    if (this.props.fetchingContactShipperById) {
      return <BundleLoader />;
    }
    return (
      <>
        <div className="flex justify-end sticky top-28 z-auto">
          <div className="rounded-lg max-sm:m-1 m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
            <div className="flex max-sm:hidden justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
              <div className="md:w-[0.5rem]"></div>

              <div className="md:w-[5.1rem]">
                <FormattedMessage id="app.name" defaultMessage="Name" />
              </div>
              <div className="md:w-[8.8rem]">
                <FormattedMessage id="app.Email" defaultMessage="Email" />
              </div>
              <div className="md:w-[8.8rem]">
                <FormattedMessage id="app.MobileNo" defaultMessage="Mobile No " />
              </div>
              <div className="md:w-[8.8rem]">
                <FormattedMessage id="app.Designation" defaultMessage="Designation" />
              </div>
              <div className="md:w-[8.8rem]">
                <FormattedMessage id="app.Department" defaultMessage="Department" />
              </div>
              <div class=" w-[2rem]"></div>
            </div>
            <div className="overflow-x-auto h-[64vh]">
              {this.props.contactShipper.length > 0 ? (
                this.props.contactShipper.map((item) => (
                  <div key={item.id}>
                    <div className="flex rounded mt-1 bg-white h-8 items-center p-1 max-sm:h-[7rem] max-sm:flex-col">
                      <div className="flex w-3/4">
                        <div className="flex font-medium flex-col md:w-[1.56rem] max-sm:w-full">
                          {` ${item.salutation || ""} ${item.firstName ||
                            ""} ${item.middleName || ""} ${item.lastName || ""}`}
                        </div>
                        <div className="flex font-medium flex-col md:w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between">
                          <div className="text-xs  font-poppins text-center">
                            {item.emailId}
                          </div>
                        </div>
                        <div className="flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between">
                          <div className="text-xs  font-poppins text-center">
                            {` ${item.dialCode1 || ""} ${item.mobileNo || ""} `}
                          </div>
                        </div>
                        <div className="flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between">
                          <div className="text-xs  font-poppins text-center">
                            {item.designationName}
                          </div>
                        </div>
                        <div className="flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between">
                          <div className="text-xs  font-poppins text-center">
                            {item.departmentName}
                          </div>
                        </div>
                        <div className="flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between">
                          <div className="text-icon  font-poppins text-center">
                            <Tooltip title="Edit">
                              <BorderColorIcon
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  this.props.setEditShipperContact(item);
                                  this.props.handleUpdateShipperContactModal(true);
                                }}
                              />
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-5">
                  <NodataFoundPage />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* {true && (
          <StyledTable
            rowKey="shipperId"
            columns={columns}
            dataSource={this.props.contactShipper}
            loading={this.props.fetchingContactShipperById}
            onChange={console.log("task onChangeHere...")}
            scroll={{ y: 280 }}
            pagination={false}
          />
        )} */}
        {/* <UpdateShipperContactModal
          handleUpdateShipperContactModal={
            this.props.handleUpdateShipperContactModal
          }
          updateShipperContactModal={this.props.updateShipperContactModal}
        /> */}
      </>
    );
  }
}

const mapStateToProps = ({ shipper, auth }) => ({
  contactShipper: shipper.contactShipper,
  fetchingContactShipperById: shipper.fetchingContactShipperById,
  updateShipperContactModal: shipper.updateShipperContactModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactShipperList,
      handleUpdateShipperContactModal,
      setEditShipperContact,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipperContactTable);
