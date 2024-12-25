import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { StyledTable } from "../../../../../../Components/UI/Antd";
import { Input, Tooltip, Button, Form, DatePicker } from "antd";
import dayjs from "dayjs";
import Highlighter from "react-highlight-words";
import SearchIcon from '@mui/icons-material/Search';

import { getShipperDispatch } from "../../../ShipperAction";

const originData = [];

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "date" ? <DatePicker /> : null;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function DispatchTable(props) {
  useEffect(() => {
    props.getShipperDispatch(props.shipperId);
  }, []);

  const [show, setShow] = useState(false);
  const [dispatchSuppliesId, setDispatchSuppliesId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [showShipperDetail, setShowShipperDetail] = useState(false);
  const [form] = Form.useForm();
  // const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    // form.setFieldsValue({
    //   name: "",
    //   age: "",
    //   address: "",
    //   ...record,
    // });
    console.log(record.key);
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };
  function handleDispatch(dispatchSuppliesId) {
    setShow(true);
    setDispatchSuppliesId(dispatchSuppliesId);
    setShowShipperDetail(false);
  }

  function handleShipper() {
    setShowShipperDetail(true);
    setShow(false);
  }
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
            // ref={node => {
            //   this.searchInput = node;
            // }}
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
            <SearchIcon ClassName="!text-icon" />  Search
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
        // <SearchIcon ClassName="!text-icon" style={{ color: filtered ? "#1890ff" : undefined }} />
        <SearchIcon ClassName="!text-icon" type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()) : "",
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
            textToHighlight={text ? text.toString(): ""}
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
      title: "Dispatch ID",
      width: "22%",
      // dataIndex: "dispatchSuppliesId",
      render: (name, item, i) => {
        const currentdate = dayjs().format("DD/MM/YYYY");
        const date = dayjs(item.creationDate).format("DD/MM/YYYY");
        return {
          props: {
            style: {
              background:
                show && dispatchSuppliesId === item.dispatchId
                  ? "#87ceeb"
                  : null,
            },
          },

          children: (
            <span
              onClick={() => handleDispatch(item.dispatchId)}
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                // color:
                //   show && item.dispatchSuppliesId === dispatchSuppliesId
                //     ? "green"
                //     : "#1890ff",
              }}
            >
              {`${item.dispatchId} `} &nbsp;
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
            </span>
          ),
        };
      },
    },
    {
      title: "Contact",
      dataIndex: "contactPersonName",
      width: "10%",
    },

    {
      title: "Pickup",
      dataIndex: "pickupDate",
      width: "8%",
      // editable: true,
      onFilter: (value, record) => record.pickupDate.indexOf(value) === 0,
      sorter: (a, b) => {
        const pickupDateA = a.pickupDate && a.pickupDate.toLowerCase();
        const pickupDateB = b.pickupDate && b.pickupDate.toLowerCase();
        if (pickupDateA < pickupDateB) {
          return -1;
        }
        if (pickupDateA > pickupDateB) {
          return 1;
        }

        // names must be equal
        return 0;
      },
      render: (name, item, i) => {
        return item.pickupDate ? (
          dayjs(item.pickupDate).format("DD/MM/YY")
        ) : (
          <span
            onClick={() => {
              props.handlePickupDateModal(true);
              props.setEditInventory(item);
            }}
          >
            <i class="far fa-calendar-alt" />
          </span>
        );
      },
    },
    {
      title: "",
      width: "2%",
      dataIndex: "pickupStatusInd",
      render: (name, item, i) => {
        return item.pickupStatusInd === true ? (
          <CheckCircleOutlineIcon
            theme="twoTone"
            twoToneColor="#00FF00"
            size={180}
            style={{
              color: "green",
              fontSize: "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        ) : (
          item.pickupStatusInd
        );
      },
    },

    {
      title: "Ship To",
      dataIndex: "shipToLocationName",
      ...getColumnSearchProps("shipToLocationName"),
      render: (name, item, i) => {
        return {
          props: {
            style: {
              background:
                show && dispatchSuppliesId === item.dispatchId
                  ? "#87ceeb"
                  : null,
            },
          },
          children: <span>{item.shipToLocationName} </span>,
        };
      },
      // render: (name, item, i) => {

      //   return (
      //     <>
      //       {/* <Link
      //         toUrl={`/inventory/${"LDS62083776118142022"}/Receive`}
      //         title={"Hello"}
      //       ></Link> */}
      //       <ShipToDetail dispatchSuppliesId={item.dispatchSuppliesId} />
      //     </>
      //   );
      // },
      width: "14%",
    },
    {
      title: "Bill To",
      dataIndex: "billToLocationName",
      ...getColumnSearchProps("billToLocationName"),
      width: "14%",
      render: (name, item, i) => {
        return {
          props: {
            style: {
              background:
                show && dispatchSuppliesId === item.dispatchId
                  ? "#87ceeb"
                  : null,
            },
          },
          children: <span>{item.billToLocationName} </span>,
        };
      },
    },
    {
      title: "Sent",
      dataIndex: "pickedByName",
      ...getColumnSearchProps("pickedByName"),
      width: "8%",
      render: (name, item, i) => {
        return {
          props: {
            style: {
              background:
                show && dispatchSuppliesId === item.dispatchSuppliesId
                  ? "#87ceeb"
                  : null,
            },
          },
        };
      },
    },
    {
      title: "Delivery",
      width: "8%",
      // dataIndex: "deliveryDate",
      render: (name, item, i) => {
        return {
          props: {
            style: {
              background:
                show && dispatchSuppliesId === item.dispatchSuppliesId
                  ? "#87ceeb"
                  : null,
            },
          },
          children: (
            <span>{dayjs(item.deliveryDate).format("DD/MM/YY")} &nbsp;&nbsp;</span>
          ),
        };
      },
      onFilter: (value, record) => record.deliveryDate.indexOf(value) === 0,
      sorter: (a, b) => {
        const deliveryDateA = a.deliveryDate && a.deliveryDate.toLowerCase();
        const deliveryDateB = b.deliveryDate && b.deliveryDate.toLowerCase();
        if (deliveryDateA < deliveryDateB) {
          return -1;
        }
        if (deliveryDateA > deliveryDateB) {
          return 1;
        }

        // names must be equal
        return 0;
      },
    },

    {
      // title: "Delivery Status",
      title: "",
      dataIndex: "deliveryStatus",
      width: "3%",
      render: (name, item, i) => {
        return {
          props: {
            style: {
              background:
                show && dispatchSuppliesId === item.dispatchSuppliesId
                  ? "#87ceeb"
                  : null,
            },
          },
        };
      },
    },
    {
      title: "Received",
      dataIndex: "receivedByName",
      ...getColumnSearchProps("receivedByName"),
      width: "12%",
      render: (name, item, i) => {
        return {
          props: {
            style: {
              background:
                show && dispatchSuppliesId === item.dispatchId
                  ? "#87ceeb"
                  : null,
            },
          },
        };
      },
    },
    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, i) => {
        //debugger
        return item.pickupStatusInd === false ? (
          <Tooltip title="Dispatch">
            <span
              style={{
                cursor: "pointer",
                fontSize: "12px",
                color: "green",
              }}
              onClick={() => {
                props.handleDispatchModal(true);
              }}
            >
              <i class="far fa-share-square"></i>
            </span>
          </Tooltip>
        ) : null;
      },
    },
    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, i) => {
        //debugger
        return (
          <Tooltip title="Shipper">
            <span
              style={{ cursor: "pointer", fontSize: "12px" }}
              onClick={() => {
                handleShipper();
              }}
            >
              <i class="fas fa-shopping-basket"></i>
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: "",
      width: "2%",
    },

    // {
    //   title: "operation",
    //   dataIndex: "operation",
    //   render: (_, record) => {
    //     const editable = isEditing(record);
    //     return editable ? (
    //       <span>
    //         <Typography.Link
    //           // onClick={() => save(record.key)}
    //           style={{
    //             marginRight: 8,
    //           }}
    //         >
    //           Save
    //         </Typography.Link>
    //         <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
    //           <a>Cancel</a>
    //         </Popconfirm>
    //       </span>
    //     ) : (
    //       <Typography.Link
    //         disabled={editingKey !== ""}
    //         onClick={() => edit(record)}
    //       >
    //         Edit
    //       </Typography.Link>
    //     );
    //   },
    // },
  ];
  // if (props.fetchingAllDispatchError) {
  //   return <APIFailed />;
  // }

  return (
    <>
      <Form form={form} component={false}>
        <StyledTable
          rowKey=""
          columns={columns}
          dataSource={props.shipperDispatch}
          loading={
            props.fetchingShipperDispatch || props.fetchingShipperDispatchError
          }
          pagination={false}
          scroll={{ y: 160 }}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
        />
      </Form>
      {/* <Suspense fallback={<BundleLoader />}>
        {show && (
          <DispatchDetailsTable dispatchSuppliesId={dispatchSuppliesId} />
        )}
        {showShipperDetail && (
          <ShipperDetailsTable dispatchSuppliesId={dispatchSuppliesId} />
        )}
      </Suspense>

      <DispatchModal
        dispatchModal={props.dispatchModal}
        handleDispatchModal={props.handleDispatchModal}
      />
      <PickUpDateModal
        handlePickupDateModal={props.handlePickupDateModal}
        openPickupDateModal={props.openPickupDateModal}
      /> */}
    </>
  );
}

const mapStateToProps = ({ shipper }) => ({
  fetchingShipperDispatch: shipper.fetchingShipperDispatch,
  shipperDispatch: shipper.shipperDispatch,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getShipperDispatch,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DispatchTable)

