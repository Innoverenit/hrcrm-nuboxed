import React, { useEffect, useState, useMemo, lazy } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import styled from "styled-components";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExploreIcon from "@mui/icons-material/Explore";
import { getSectors } from "../../../Settings/Sectors/SectorsAction";
import moment from "moment";
import { getCountries } from "../../../Auth/AuthAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { StyledTable } from "../../../../Components/UI/Antd";
import { Tooltip, Button, Input, Select } from "antd";
import Highlighter from "react-highlight-words";
import {
  MultiAvatar,
  MultiAvatar1,
  MultiAvatar2,
  SubTitle,
} from "../../../../Components/UI/Elements";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
  getCustomerListByUserId,
  handleUpdateCustomerModal,
  setEditCustomer,
  updateOwnercustomerById,
  handleCustomerDrawerModal,
  getCustomerDetailsById,
  getCustomerKeySkill,
  handleCustomerEmailDrawerModal,
  getCustomerById,
  emptyCustomer,
} from "../../CustomerAction";
import { SearchOutlined } from "@ant-design/icons";
import AddCustomerDrawerModal from "../../AddCustomerDrawerModal";
import { getAllCustomerEmployeelist } from "../../../Employees/EmployeeAction";
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
import AddCustomerEmailDrawerModal from "../UpdateCustomer/AddCustomerEmailDrawerModal";
const CustomerDetailView = lazy(() => import("./CustomerDetailView"));
const UpdateCustomerModal = lazy(() =>
  import("../UpdateCustomer/UpdateCustomerModal")
);
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function CustomerTable(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleselect, setvisibleselect] = useState(false);
  const [selectedValue, setselectedValue] = useState("");

  function handleTransferClick() {
    setvisibleselect(true);
  }

  function handleSelected(value) {
    setselectedValue(value);
    console.log(value);
  }
  function handleSend() {
    let data = {
      customerIds: selectedRowKeys,
    };
    setselectedValue(props.updateOwnercustomerById(selectedValue, data));
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
    props.getCustomerListByUserId(props.userId, page);
    setPage(page + 1);
    props.getSectors();
    props.getCountries();
    props.getAllCustomerEmployeelist();
  }, []);

  useEffect(() => {
    return () => props.emptyCustomer();
  }, []);

  const [currentCustomerId, setCurrentCustomerId] = useState("");

  function handleSetCurrentCustomerId(customerId) {
    setCurrentCustomerId(customerId);
    console.log(customerId);
  }

  const handleLoadMore = () => {
    setTimeout(() => {
      setPage(page + 1);
      props.getCustomerListByUserId(
        props.currentUser ? props.currentUser : props.userId,
        page
      );
    }, 100);
  };

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
            icon={<SearchOutlined />}
            //icon="search"
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
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // setTimeout(() => this.searchInput.select());
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

  const AssignedTypeOption = useMemo(() => {
    if (!props.allCustomerEmployeeList) return [];
    return (
      props.allCustomerEmployeeList.length &&
      props.allCustomerEmployeeList.map((employees) => {
        return {
          text: employees.fullName || "",
          value: employees.fullName,
        };
      })
    );
  }, [props.employees]);

  const CountryTypeOption = props.countries.map((item) => {
    return {
      text: item.country_alpha3_code
      || "",
      value: item.country_alpha3_code
      ,
    };
  });
  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }

  const salelist = props.sales.map((item) => {
    return {
      label: item.fullName,
      value: item.employeeId,
    };
  });
  const recruiterlist = props.recruiterName.map((item) => {
    return {
      label: item.fullName,
      value: item.employeeId,
    };
  });
  const mergedlist = salelist.concat(recruiterlist);

  const sectorsNameOption = props.sectors.map((item) => {
    return {
      text: item.sectorName,
      value: item.sectorName,
    };
  });

  const {
    fetchingCustomers,
    customerByUserId,
    handleUpdateCustomerModal,
    updateCustomerModal,
    fetchingCustomersError,
    fetchingAllCustomers,
    user,
    IconShowhover,
  } = props;
  console.log("ee");
  const columns = [
    {
      title: "",
      dataIndex: "imageId",
      width: "3%",
      render: (name, item, i) => {
        return (
          <SubTitle>
            <MultiAvatar1
              primaryTitle={item.name}
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
      //title: "Name",
      title: <FormattedMessage id="app.name" defaultMessage="Name" />,
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      width: "19%",
      // defaultSortOrder: "ascend",
      sorter: (a, b) => {
        var nameA = a.name; // ignore upper and lowercase
        var nameB = b.name; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      },
      render: (name, item, i) => {
        const fullName = ` ${item.salutation || ""} ${item.firstName || ""} ${
          item.middleName || ""
        } ${item.lastName || ""}`;

        const currentdate = moment().format("DD/MM/YYYY");
        const date = moment(item.creationDate).format("DD/MM/YYYY");
        console.log(date, currentdate, currentdate === date);
        return (
          <>
            <CustomerDetailView customerId={item.customerId} name={item.name} />
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
            ) : null}
          </>
        );
      },
    },
    {
      width: "2%",

      render: (name, item, i) => {
        // const IconShowhover = item.url !== null ? true : false;

        return (
          <>
            <Tooltip title={item.url}>
              {item.url !== "" && (
                <span
                  //type="edit"
                  style={{ cursor: "pointer" }}
                  onClick={() => {}}
                >
                  {" "}
                  <a href={`https://${item.url}`} target="_blank">
                    <ExploreIcon
                      style={{ cursor: "pointer", color: "green" }}
                    />
                  </a>
                </span>
              )}
            </Tooltip>
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "category",
      width: "3%",
      render: (name, item, i) => {
        //debugger;
        return (
          <div>
            {item.category === "Blue" && (
              <Tooltip title={item.category}>
                <div
                  style={{
                    borderRadius: "45%",
                    height: "1.1875em",
                    width: "1.1875em",
                    backgroundColor: "#00afff",
                  }}
                ></div>
              </Tooltip>
            )}
            {item.category === "White" && (
              <Tooltip title={item.category}>
                <div
                  style={{
                    borderRadius: "45%",
                    height: "1.1875em",
                    width: "1.1875em",
                    backgroundColor: "bisque",
                  }}
                ></div>
              </Tooltip>
            )}
            {item.category === "Both" && (
              <Tooltip title={item.category}>
                <div
                  style={{
                    borderRadius: "45%",
                    height: "1.1875em",
                    width: "1.1875em",
                    backgroundColor: "grey",
                  }}
                ></div>
              </Tooltip>
            )}
            {item.category === null && (
              <Tooltip title={item.category}>
                <div
                  style={{
                    borderRadius: "45%",
                    height: "1.1875em",
                    width: "1.1875em",
                    backgroundColor: "grey",
                  }}
                ></div>
              </Tooltip>
            )}
          </div>
        );
      },
      filters: [
        { text: "Blue", value: "Blue" },
        { text: "White", value: "White" },
        { text: "Both", value: "Both" },
      ],
      onFilter: (value, record) => {
        return record.category === value;
        // sorter: (a, b) => a.type > b.type,
      },
    },

    {
      //title: "Group",
      title: <FormattedMessage id="app.sector" defaultMessage="Sector" />,
      dataIndex: "sector",
      width: "13%",

      filters: sectorsNameOption,
      onFilter: (value, record) => {
        return record.sector === value;
      },
    },
    {
      title: "Skills",
      width: "15%",
    },

    // {
    //   // title: "Address",
    //   title: (
    //     <FormattedMessage
    //       id="app.address"
    //       defaultMessage="Address"
    //     />
    //   ),
    //   // dataIndex: "address[0].address1",
    //   render: (name, item, i) => {
    //     console.log(item);
    //     return `${(item.address &&
    //       item.address.length &&
    //       item.address[0].address1) ||
    //       ""}
    //     ${(item.address && item.address.length && item.address[0].address2) ||
    //       ""}
    //      ${(item.address && item.address.length && item.address[0].street) ||
    //       ""}
    //        ${(item.address && item.address.length && item.address[0].city) ||
    //       ""},
    //        ${(item.address && item.address.length && item.address[0].state) ||
    //       ""}
    //         ${(item.address && item.address.length && item.address[0].country
    //       ) ||
    //       ""}
    //         ${(item.address && item.address.length && item.address[0].postalCode) ||
    //       ""}
    //         `;
    //   },
    //   width: "30%",
    // },
    {
      title: <FormattedMessage id="app.country" defaultMessage="Country" />,
      dataIndex: "country",
      width: "7%",
      filters: CountryTypeOption,
      onFilter: (value, record) => {
        return record.country === value;
      },
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
    },
    {
      title: (
        <FormattedMessage id="app.lastPost" defaultMessage="Last Posted on" />
      ),
      dataIndex: "lastRequirementOn",
      width: "9%",
      render: (text, item) => {
        // const lastRequirementOn = moment(item.lastRequirementOn ).format("ll");
        const diff = Math.abs(
          moment().diff(moment(item.lastRequirementOn), "days")
        );
        // const date=diff+1
        return (
          <>
            {item.lastRequirementOn === null ? (
              "No Data"
            ) : (
              <span
                style={{
                  marginRight: "0.5rem",
                  color: diff >= 30 && "blue",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                {diff} days ago
              </span>
            )}
          </>
        );
      },
    },
    {
      title: "Assigned",
      dataIndex: "assignedTo",
      width: "10%",
      filters: AssignedTypeOption,
      onFilter: (value, record) => {
        return record.country === value;
      },
      render: (name, item, i) => {
        return (
          <>
            {/* <Tooltip title={item.assignedTo}> */}
            <span>
              {item.assignedTo === null ? (
                "None"
              ) : (
                <MultiAvatar2
                  primaryTitle={item.assignedTo}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
              )}
            </span>
            {/* </Tooltip> */}
          </>
        );
      },
    },

    {
      title: <FormattedMessage id="app.owner" defaultMessage="Owner" />,
      dataIndex: "ownerName",
      width: "7%",
      filters: ownerlistType,
      render: (name, item, i) => {
        return (
          <>
            {/* <Tooltip title={item.ownerName}> */}
            <span>
              <MultiAvatar
                primaryTitle={item.ownerName}
                imageId={item.ownerImageId}
                imageURL={item.imageURL}
                imgWidth={"2.1em"}
                imgHeight={"2.1em"}
              />
            </span>
            {/* </Tooltip> */}
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
          <>
            {/* {user.talentUpdateInd ===true && ( */}

            <span
              style={{ cursor: "pointer" ,fontSize: "0.8rem"}}
              onClick={() => {
                props.getCustomerDetailsById(item.customerId);
                props.getCustomerKeySkill(item.customerId);
                //   this.props.getCustomerDocument(item.customerId );

                props.handleCustomerDrawerModal(item, true);
              }}
            >
              {" "}
              {user.pulseAccessInd === true && <MonitorHeartIcon  style={{
                cursor: "pointer",
                fontSize: "0.8rem",
                color: "#df9697"}}/>}
            </span>
          </>
        );
      },
    },
    {
      title: "",
      width: "2%",
      render: (name, item, i) => {
        const dataLoc = ` Address : ${
          item.address && item.address.length && item.address[0].address1
        } 
         Street : ${
           item.address && item.address.length && item.address[0].street
         }   
        State : ${item.address && item.address.length && item.address[0].state}
       Country : ${
         (item.address && item.address.length && item.address[0].country) || ""
       } 
         PostalCode : ${
           item.address && item.address.length && item.address[0].postalCode
         } `;
        return (
          <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
            <span
              style={{
                // color:
                //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
                cursor: "pointer",
              }}
            >
            <LocationOnIcon   style={{
                cursor: "pointer",
                fontSize: "0.8rem"
              }}/>
            </span>
          </Tooltip>
        );
      },
    },
    {
      width: "2%",
      render: (name, item, i) => {
        //debugger

        return (
          <>
            <Tooltip title={item.email}>
              <MailOutlineIcon
                type="mail"
                style={{ cursor: "pointer",fontSize: "0.8rem" }}
                onClick={() => {
                  props.getCustomerById(item.customerId);
                  props.handleCustomerEmailDrawerModal(true);
                }}
              />
            </Tooltip>
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "documentId",
      width: "2%",

      render: (name, item, i) => {
        // const IconShowhover = item.documentId !== null ? true : false;

        return (
          <>
            {props.user.customerUpdateInd === true && (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  props.setEditCustomer(item);
                  handleUpdateCustomerModal(true);
                  handleSetCurrentCustomerId(item.customerId);
                }}
              >
                <BorderColorIcon style={{ fontSize: "0.8rem" }} />
              </span>
            )}

            {/* }  */}
          </>
        );
      },
    },
  ];
  if (fetchingCustomersError) {
    return <APIFailed />;
  }
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;
  return (
    <>
      {/* <Spin tip="Loading..." spinning={!fetchingContactsLazyLoading}> */}
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
        </>
      )}
      <InfiniteScroll
        dataLength={props.customerByUserId.length}
        next={handleLoadMore}
        hasMore={true}
        // loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        height={600}
      >
        <StyledTable
          // rowKey="accountId"
          rowSelection={rowSelection}
          rowKey={(record) => record.customerId}
          columns={columns}
          dataSource={customerByUserId}
          loading={
            fetchingCustomers || fetchingCustomersError || fetchingAllCustomers
          }
          pagination={false}
        />
      </InfiniteScroll>
      <AddCustomerDrawerModal
        addDrawerCustomerModal={props.addDrawerCustomerModal}
        handleCustomerDrawerModal={props.handleCustomerDrawerModal}
      />

      <UpdateCustomerModal
        customerId={currentCustomerId}
        updateCustomerModal={updateCustomerModal}
        handleUpdateCustomerModal={handleUpdateCustomerModal}
        handleSetCurrentCustomerId={handleSetCurrentCustomerId}
      />
      <AddCustomerEmailDrawerModal
        // contactById={props.contactById}
        addDrawerCustomerEmailModal={props.addDrawerCustomerEmailModal}
        handleCustomerEmailDrawerModal={props.handleCustomerEmailDrawerModal}
      />
    </>
  );
}
// }
const mapStateToProps = ({
  auth,
  customer,
  sector,
  opportunity,
  employee,
}) => ({
  userId: auth.userDetails.userId,
  customerByUserId: customer.customerByUserId,
  sales: opportunity.sales,
  recruiterName: opportunity.recruiterName,
  fetchingAllCustomers: customer.fetchingAllCustomers,
  sectors: sector.sectors,
  fetchingCustomers: customer.fetchingCustomers,
  fetchingCustomersError: customer.fetchingCustomersError,
  updateCustomerModal: customer.updateCustomerModal,
  user: auth.userDetails,
  employees: employee.employees,
  countries: auth.countries,
  allCustomerEmployeeList: employee.allCustomerEmployeeList,
  addDrawerCustomerEmailModal: customer.addDrawerCustomerEmailModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCustomerListByUserId,
      handleUpdateCustomerModal,
      setEditCustomer,
      getSectors,
      emptyCustomer,
      updateOwnercustomerById,
      handleCustomerDrawerModal,
      getCustomerDetailsById,
      getCustomerKeySkill,
      handleCustomerEmailDrawerModal,
      getCustomerById,
      getCountries,
      getAllCustomerEmployeelist,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerTable);
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

const AppIcon1 = (props) => (
  <BorderColorIcon
  // className={`pen-to-square ${props.className}`}
  />
);

const EditIcon1 = styled(AppIcon1)`
  color: black;
  fontsize: 1rem;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
