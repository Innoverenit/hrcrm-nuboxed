import React, { useEffect, useState, useMemo, lazy } from "react";
import { StyledTable } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { getListOfInvoice } from "../../Invoice/InvoiceAction";
import { Button, Input, Tooltip } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import Highlighter from "react-highlight-words";
import "jspdf-autotable";
import { CurrencySymbol } from "../../../Components/Common";
import { BundleLoader } from "../../../Components/Placeholder";
import { MultiAvatar } from "../../../Components/UI/Elements";

function InvoiceTable(props) {
  console.log(props.programs);
  useEffect(() => {
    props.getListOfInvoice(props.userId);
  }, []);
  const [isExpanded, setIsExpanded] = useState(false);

  const [rowdata, setrowData] = useState({});

  const handleRowData = (data) => {
    setrowData(data);
  };
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  const handleExpandClick = () => {
    setIsExpanded(true);
  };

  const handleCollapseClick = () => {
    setIsExpanded(false);
  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
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
        <SearchIcon
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

  const columns = [
    {
      title: "",
      //dataIndex: "logo",
      width: "2%",
    },
    {
      title: "Invoice Id",
      dataIndex: "invoiceId",
      width: "8%",
    },
    {
      title: "Team",
      dataIndex: "candidateName",
      width: "8%",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      width: "8%",
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
      width: "8%",
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
      title: "Amount",
      dataIndex: "billingAmount",
      width: "8%",
      render: (text, item) => {
        return (
          <>
            <span>
              <CurrencySymbol currencyType={item.billableCurency} />
              &nbsp;
              {item.billingAmount}
            </span>
          </>
        );
      },
    },
    {
      title: "Hour",
      dataIndex: "hour",
      width: "8%",
    },
    {
      title: "Projected Billable Amount",
      dataIndex: "actualBillableAmount",
      width: "8%",
      render: (text, item) => {
        return (
          <>
            <span>
              <CurrencySymbol currencyType={item.billableCurency} />
              &nbsp;
              {item.actualBillableAmount}
            </span>
          </>
        );
      },
    },
    {
      title: "Projected Billable Hour",
      dataIndex: "actualBillableHour",
      width: "8%",
    },
    {
      title: "Actual Billable Amount",
      dataIndex: "projectedBillableAmount",
      width: "8%",
      render: (text, item) => {
        return (
          <>
            <span>
              <CurrencySymbol currencyType={item.billableCurency} />
              &nbsp;
              {item.projectedBillableAmount}
            </span>
          </>
        );
      },
    },
    {
      title: "Actual Billable Hour",
      dataIndex: "projectedBillableHour",
      width: "8%",
    },

    {
      title: "Month",
      dataIndex: "month",
      width: "8%",
      render: (text, item) => {
        return (
          <>
            {item.month} {item.year}
          </>
        );
      },
    },
  ];

  if (props.fetchingLeadsTabData) {
    return <BundleLoader />;
  }
  return (
    <>
      <div className=" flex sticky z-auto">
        <div class="rounded m-1 p-1  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-semibold fonr-poppins items-end !text-lm sticky z-10">
            <div className="w-[7.09rem] max-max-md:w-[7rem] text-sm">
              {" "}
              {props.translatedMenuItems[10]} ID
            </div>
            {/* <div className=" max-md:w-[4.21rem] ">Invoice Id</div>  */}
            <div className="w-[4.5rem] max-max-md:w-[4.5rem] ">
              {props.translatedMenuItems[166]}
            </div>
            <div className="w-[5.8rem] max-max-md:w-[5.8rem] ">
              {props.translatedMenuItems[167]}
            </div>
            <div className="w-[4.25rem] max-max-md:w-[4.2rem] ">
              {props.translatedMenuItems[66]}
            </div>{" "}
            {/* 929 */}
            <div className="w-[4.24rem] max-max-md:w-[4.2rem] ">
              {props.translatedMenuItems[67]}
            </div>
            {/* 86 */}
            <div className="w-[4.22rem] max-max-md:w-[4.2rem] ">
              {props.translatedMenuItems[168]}
            </div>
            <div className="w-[6.21rem] max-max-md:w-[6.2rem] ">
              Projected Billable Amount
            </div>
            <div className="w-[6.21rem] max-max-md:w-[6.2rem] ">
              Projected Billable Hour
            </div>
            <div className="w-[6.21rem] max-max-md:w-[6.2rem] ">
              Actual Billable Amount
            </div>
            <div className="w-[6.21rem] max-max-md:w-[6.2rem] ">
              Actual Billable Hour
            </div>
            <div className="w-[6.21rem] max-max-md:w-[6.2rem] ">
              {props.translatedMenuItems[169]}
            </div>
          </div>

          {props.invoiceList.map((item) => {
            return (
              <div>
                <div className="flex rounded justify-between mt-1 bg-white items-center py-ygap  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                  <div class="flex">
                    <div className=" flex w-[4rem]  h-8  border-l-2 border-green-500 bg-[#eef2f9]  max-md:w-[4rem] max-sm:flex-row  max-sm:justify-between "></div>
                    <div className=" flex w-[7rem] max-md:w-[7rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:  ">
                      <div class="text-xs text-ellipsis overflow-hidden  cursor-pointer">
                        {item.invoiceId}
                      </div>
                    </div>
                  </div>
                  <div className=" flex w-[6.2rem] max-max-md:w-[6.2rem] max-sm:flex-row  items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:justify-between ">
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
                  </div>
                  <div className=" flex  max-md:w-[6.5rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row">
                    <div class=" text-xs  font-poppins">
                      <span>
                        <Tooltip title={item.projectName}>
                          <span>
                            <MultiAvatar
                              primaryTitle={item.projectName}
                              imgWidth={"2.1em"}
                              imgHeight={"2.1em"}
                            />
                          </span>
                        </Tooltip>
                      </span>
                    </div>
                  </div>
                  <div className=" flex w-[6.2rem] max-max-md:w-[6.2rem] max-sm:flex-row  items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:justify-between ">
                    <div class=" text-xs  ">
                      <CurrencySymbol currencyType={item.billableCurency} />
                      &nbsp;
                      {item.billingAmount}
                    </div>
                  </div>
                  <div className=" flex  max-md:w-[6.5rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">{item.hour}</div>
                  </div>

                  <div className=" flex  max-md:w-[6.5rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">
                      <CurrencySymbol currencyType={item.billableCurency} />
                      &nbsp;
                      {item.actualBillableAmount}
                    </div>
                  </div>
                  <div className=" flex  max-md:w-[6.5rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">{item.remarks}</div>
                  </div>
                  <div className=" flex  max-md:w-[6.5rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">
                      {item.actualBillableHour}
                    </div>
                  </div>
                  <div className=" flex  max-md:w-[6.5rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">
                      {item.projectedBillableAmount}
                    </div>
                  </div>
                  <div className=" flex  max-md:w-[6.5rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">
                      <CurrencySymbol currencyType={item.billableCurency} />
                      &nbsp;
                      {item.projectedBillableAmount}
                    </div>
                  </div>
                  <div className=" flex  max-md:w-[6.5rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">
                      {item.projectedBillableHour}
                    </div>
                  </div>
                  <div className=" flex  max-md:w-[6.5rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">
                      {item.month} {item.year}
                    </div>
                  </div>
                  <div class="w-6"></div>
                  <div class="flex  max-md:w-[6rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row max-sm:w-[10%]"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = ({ auth, invoice }) => ({
  userId: auth.userDetails.userId,
  invoiceList: invoice.invoiceList,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getListOfInvoice,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceTable);
