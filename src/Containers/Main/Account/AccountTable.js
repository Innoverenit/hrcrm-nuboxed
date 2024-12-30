import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import {
  Popconfirm,
  Tooltip,
  Input,
  Button,
  Progress,
  Select,
  Avatar,
} from "antd";
import { Link } from "react-router-dom";
import { handleCustomerOpportunityDrawerModal } from "../../Customer/CustomerAction";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import InfiniteScroll from "react-infinite-scroll-component";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import {
  getCustomerByUser,
  setEditDistributor,
  handleUpdateDistributorModal,
  handleDistributorOrderModal,
  handleDistributorActivityTableModal,
  deleteDistributor,
  handleBillingAddressModal,
  handleUpdateAccountModal,
  handleAccountModal,
  emptyDistributor,
  handleAccountPulse,
  updateAccountPrice,
  handleAccountAddress,
  handleAccountOpportunityModal,
} from "./AccountAction";
import { getCountry } from "../../../Containers/Settings/Category/Country/CountryAction";
import { getCustomer } from "../../Settings/Category/Customer/CustomerAction";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import dayjs from "dayjs";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MultiAvatar, MultiAvatar2 } from "../../../Components/UI/Elements";
import ExploreIcon from "@mui/icons-material/Explore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ContactsIcon from "@mui/icons-material/Contacts";
import AsignedOpenDrawer from "./AsignedOpenDrawer";
import Swal from "sweetalert2";
import { base_url2 } from "../../../Config/Auth";
import { getSaleCurrency, getCategory } from "../../Auth/AuthAction";
import axios from "axios";
import OppoOpenDrawer from "./OppoOpenDrawer";
import OrderOpenDrawer from "./OrderOpenDrawer";
const AddAccountAdressModal = lazy(() => import("./AddAccountAdressModal"));
const AccountCreditToggle = lazy(() => import("./AccountCreditToggle"));
const AccountSearchedData = lazy(() => import("./AccountSearchedData"));
const AccountPulseModal = lazy(() => import("./AccountPulseModal"));
const AccountModal = lazy(() => import("./AccountModal"));
const AccountQuotationDrawer = lazy(() =>
  import("./AccountDetailsTab/AccountQuotationDrawer")
);
const { Option } = Select;

function AccountTable(props) {
  const [page, setPage] = useState(0);
  const [RowData, setRowData] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [particularRowData, setParticularRowData] = useState({});
  const [asignedDrawer, setasignedDrawer] = useState(false);
  const [editableField, setEditableField] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [customerLists, setcustomerLists] = useState([]);
  const [isCategoryDropdownClicked, setIsCategoryDropdownClicked] =
    useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [customerListOpt, setcustomerListOpt] = useState([]);
  const [isCustomerDropDownClick, setIsCustomerDropDownClick] = useState(false);
  const [isDialCodeDropDownClicked, setIsDialCodeDropDownClicked] =
    useState(false);
  const [dialCodeOpts, setDialCodeOpts] = useState([]);
  const [currencyOpts, setcurrencyOpts] = useState([]);
  const [isCurrencyDropdownClick, setIsCurrencyDropdownClick] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [openOpportunity, setOpenOpportunity] = useState(false);

  const fetchCategoryData = () => {
    if (!isCategoryDropdownClicked) {
      props.getCategory(props.orgId);
      setIsCategoryDropdownClicked(true);
    }
  };
  useEffect(() => {
    if (props.category && props.category.length > 0) {
      setCategoryOptions(props.category);
    }
  }, [props.category]);
  const fetchCustomerList = () => {
    if (!isCustomerDropDownClick) {
      props.getCustomer(props.orgId);
      setIsCustomerDropDownClick(true);
    }
  };
  useEffect(() => {
    if (props.customerListData && props.customerListData.length > 0) {
      setcustomerListOpt(props.customerListData);
    }
  }, [props.customerListData]);
  const fetchDialCode = () => {
    if (!isDialCodeDropDownClicked) {
      props.getCountry();
      setIsDialCodeDropDownClicked(true);
    }
  };
  useEffect(() => {
    if (props.countries && props.countries.length > 0) {
      setcustomerListOpt(props.countries);
    }
  }, [props.countries]);
  const fetchCurrency = () => {
    if (!isCurrencyDropdownClick) {
      props.getSaleCurrency();
      setIsCurrencyDropdownClick(true);
    }
  };
  useEffect(() => {
    if (props.saleCurrencies && props.saleCurrencies.length > 0) {
      setcurrencyOpts(props.saleCurrencies);
    }
  }, [props.saleCurrencies]);
  useEffect(() => {
    setPage(page + 1);
    props.getCustomerByUser(props.userId, page);
  }, [props.userId]);
  useEffect(() => {
    setcustomerLists(props.customerListByUser);
  }, [props.customerListByUser]);
  function handleCurrentRowData(datas) {
    setRowData(datas);
  }
  function handleSetParticularOrderData(item) {
    setParticularRowData(item);
  }
  const [visible, setVisible] = useState(false);
  const handleUpdateRevisePrice = () => {
    setVisible(!visible);
  };
  const [price, setPrice] = useState(
    particularRowData.dispatchPaymentPercentage
  );
  const handleChange = (val) => {
    if (!isNaN(val) && val > 0 && val < 101) {
      setPrice(val);
    } else {
      setPrice("");
    }
  };
  const handleSubmitPrice = () => {
    props.updateAccountPrice(
      {
        dispatchPaymentPercentage: price,
      },
      particularRowData.distributorId
    );
    setVisible(false);
  };
  const handleLoadMore = () => {
    const PageMapd =
      props.customerListByUser &&
      props.customerListByUser.length &&
      props.customerListByUser[0].pageCount;
    setTimeout(() => {
      if (props.customerListByUser) {
        if (page < PageMapd) {
          setPage(page + 1);
          props.getCustomerByUser(props.userId, page);
        }
        if (page === PageMapd) {
          setHasMore(false);
        }
      }
    }, 100);
  };
  const handleEditRowField = (distributorId, field, currentValue) => {
    setEditableField({ distributorId, field });
    setEditingValue(currentValue);
  };
  const handleChangeRowItem = (e) => {
    setEditingValue(e.target.value);
  };
  const handleChangeRowSelectItem = async (value) => {
    setEditingValue(value);
    const { distributorId, field } = editableField;
    const updatedData = {};
    let mappedField = field;
    if (field === "clientName") {
      mappedField = "clientId";
    } else if (field === "dcategoryName") {
      mappedField = "dcategory";
    } else if (field === "curName") {
      mappedField = "currency";
    }
    updatedData[mappedField] = value;
    try {
      const response = await axios.put(
        `${base_url2}/distributor/rowEdit/${distributorId}`,
        updatedData,
        {
          headers: {
            Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
          },
        }
      );
      setcustomerLists((prevData) =>
        prevData.map((cat) =>
          cat.distributorId === distributorId ? response.data : cat
        )
      );
      setEditableField(null);
      setEditingValue("");
      Swal.fire({
        icon: "success",
        title: "Update successful",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating item:", error);
      setEditableField(null);
    }
  };
  const handleUpdateSubmit = async () => {
    const { distributorId, field } = editableField;
    const updatedData = {};
    let mappedField = field;
    if (field === "clientName") {
      mappedField = "clientId";
    } else if (field === "dcategoryName") {
      mappedField = "dcategory";
    }
    updatedData[mappedField] = editingValue;
    try {
      const response = await axios.put(
        `${base_url2}/distributor/rowEdit/${distributorId}`,
        updatedData,
        {
          headers: {
            Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
          },
        }
      );
      setcustomerLists((prevData) =>
        prevData.map((cat) =>
          cat.distributorId === distributorId ? response.data : cat
        )
      );
      setEditableField(null);
      setEditingValue("");
      Swal.fire({
        icon: "success",
        title: "Update successful",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating item:", error);
      setEditableField(null);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdateSubmit();
    }
  };
  const handleCancel = () => {
    setEditableField(null);
    setEditingValue("");
  };

  const {
    handleUpdateAccountModal,
    handleAccountModal,
    handleCustomerOpportunityDrawerModal,
  } = props;
  useEffect(() => {
    return () => props.emptyDistributor();
  }, []);
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 1.2;
  return (
    <>
      {props.distributorSearch.length > 0 ? (
        <Suspense fallback={<BundleLoader />}>
          <AccountSearchedData
            selectedLanguage={props.selectedLanguage}
            translateText={props.translateText}
            distributorSearch={props.distributorSearch}
          />
        </Suspense>
      ) : (
        <div className=" flex  sticky  z-auto">
          <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-white">
            <div className=" flex max-sm:hidden   w-[94%]  justify-between p-1 bg-transparent sticky max-xl:text-[0.65rem] max-lg:text-[0.45rem]  z-10">
              <div class=" flex justify-between items-end !text-lm font-poppins  font-bold  w-[100%]  ">
                <div className=" w-[11.7rem] text-[#00A2E8] text-sm max-md:w-[12.1rem]">
                  <ContactsIcon className="!text-icon  " />{" "}
                  {props.translatedMenuItems[0]}
                  {/* Name */}
                </div>
                <div className=" w-[7.6rem] max-md:w-[8.11rem]">
                  <ApartmentIcon className="!text-icon mr-1 " />
                  {props.translatedMenuItems[1]}
                  {/* Work */}
                </div>
                <div className=" w-[7.1rem] max-md:w-[8.1rem] ">
                  <FormatListNumberedIcon className="!text-icon    text-[#42858c]" />{" "}
                  {props.translatedMenuItems[2]}
                  {/* Category */}
                </div>
                <div className="w-[6.4rem] max-md:w-[6.02rem]">
                  <MergeTypeIcon className="!text-icon text-[#c42847] " />{" "}
                  {props.translatedMenuItems[3]}
                  {/* Type */}
                </div>
                <div className="w-[4.01rem] max-md:w-[4.01rem] ">
                  <DynamicFeedIcon className="!text-icon  text-[#5A189A]" />{" "}
                  {props.translatedMenuItems[20]}
                  {/* Orders */}
                </div>
                <div className="w-[5.03rem] max-md:w-[5.03rem]">
                  <LightbulbIcon className="!text-icon text-[#84a59d]" />{" "}
                  {props.translatedMenuItems[21]}
                  {/* Quotation*/}
                </div>
                <div className="w-[5.210rem] max-md:w-[5.2rem]">
                  {/* Club */}{" "}
                  <GolfCourseIcon className="!text-base   text-[#f42c04]" />{" "}
                  {props.translatedMenuItems[17]}
                </div>

                <div className="w-[10.2rem] max-md:w-[9.2rem]">
                  <CurrencyExchangeIcon className="!text-icon    text-[#c42847]" />{" "}
                  {props.translatedMenuItems[5]}
                  {/* Payment % */}
                </div>
                {/* "billingaddress" */}
                <div className="w-[13.1rem] max-md:w-[5.2rem]">
                  <CurrencyExchangeIcon className="!text-icon    text-[#c42847]" />{" "}
                  {props.translatedMenuItems[8]}
                  {/* Credit */}
                </div>
                <div className="w-[6.9rem] max-md:w-[5.3rem]">
                  <AccountCircleIcon className="!text-icon  text-[#d64933]" />{" "}
                  {props.translatedMenuItems[7]}
                  {/* Assigned */}
                </div>
              </div>
            </div>
            <InfiniteScroll
              dataLength={customerLists.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={
                props.fetchingCustomerByUser ? (
                  <div style={{ textAlign: "center" }}>
                    <BundleLoader />
                  </div>
                ) : null
              }
              height={"83vh"}
              style={{ scrollbarWidth: "thin" }}
              endMessage={
                <p class="fles text-center font-bold text-xs text-red-500">
                  You have reached the end of page
                </p>
              }
            >
              {customerLists.length ? (
                <>
                  {customerLists.map((item) => {
                    const currentdate = dayjs().format("DD/MM/YYYY");
                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                    const acivedPercentage = isNaN(
                      Math.floor((item.outstanding / item.currencyPrice) * 100)
                    )
                      ? 0
                      : Math.floor(
                          (item.outstanding / item.currencyPrice) * 100
                        );
                    const diff = Math.abs(
                      dayjs().diff(dayjs(item.lastRequirementOn), "days")
                    );
                    const dataLoc = `${
                      item.address &&
                      item.address.length &&
                      item.address[0].address1
                    } 
            ${item.address && item.address.length && item.address[0].street}   
           ${item.address && item.address.length && item.address[0].state}
          ${
            (item.address && item.address.length && item.address[0].country) ||
            ""
          } 
                   ${
                     item.address &&
                     item.address.length &&
                     item.address[0].postalCode
                   }
            `;
                    return (
                      <div>
                        <div className="flex  justify-between  bg-white mt-1 py-ygap items-center  max-xl:p-1 max-sm:h-[9rem] max-sm:scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center ">
                            <div className=" flex w-[12rem] h-8 max-md:w-[12rem] max-xl:w-[11rem] max-lg:w-[8rem] border-l-2 border-green-500 bg-[#eef2f9]  max-sm:w-auto">
                              <div className="flex max-sm:w-auto">
                                <div>
                                  <MultiAvatar
                                    primaryTitle={item.name}
                                    imageId={item.imageId}
                                    imageURL={item.imageURL}
                                    imgWidth={"1.8rem"}
                                    imgHeight={"1.8rem"}
                                  />
                                </div>
                                <div class="w-[0.25rem]"></div>

                                <Tooltip>
                                  <div class="flex max-sm:flex-row justify-between  ">
                                    <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer flex items-center">
                                      <Link
                                        class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 max-sm:text-xs text-[#042E8A] font-bold font-poppins flex items-center cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] "
                                        to={`/distributor/${item.distributorId}`}
                                        title={`${item.name}`}
                                      >
                                        {item.name.substring(0, 25)}
                                      </Link>
                                      {date === currentdate ? (
                                        <div class="text-[0.65rem] text-[tomato] font-bold items-center">
                                          {props.translatedMenuItems[9]}{" "}
                                          {/* New */}
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                </Tooltip>
                              </div>
                            </div>
                            <div className=" flex  items-center justify-start h-8 ml-gap  bg-[#eef2f9] w-[7.1rem] max-md:w-[7.1rem] max-xl:w-[6.1rem] max-lg:w-[4.1rem] max-sm:flex-row  max-sm:justify-between max-sm:w-auto  ">
                              <div class="flex ml-gap text-xs font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] items-center max-sm:text-xs ">
                                {editableField?.distributorId ===
                                  item.distributorId &&
                                editableField?.field === "dialCode" ? (
                                  <Select
                                    style={{ width: "7.1rem" }}
                                    value={editingValue}
                                    onChange={handleChangeRowSelectItem}
                                    onBlur={() =>
                                      handleEditRowField(null, null, null)
                                    }
                                    autoFocus
                                    onClick={fetchDialCode}
                                  >
                                    {dialCodeOpts.map((cntr) => (
                                      <Option
                                        key={cntr.country_dial_code}
                                        value={cntr.country_dial_code}
                                      >
                                        {cntr.country_dial_code}
                                      </Option>
                                    ))}
                                  </Select>
                                ) : (
                                  <div
                                    className="cursor-pointer !text-xs font-Poppins"
                                    onClick={() =>
                                      handleEditRowField(
                                        item.distributorId,
                                        "dialCode",
                                        item.dialCode
                                      )
                                    }
                                  >
                                    {item.dialCode || "Dialcode"}
                                  </div>
                                )}
                                &nbsp;
                                <div>
                                  {editableField?.distributorId ===
                                    item.distributorId &&
                                  editableField?.field === "phoneNo" ? (
                                    <Input
                                      type="text"
                                      className="h-7 w-[4rem] text-xs"
                                      value={editingValue}
                                      onChange={handleChangeRowItem}
                                      onBlur={handleUpdateSubmit}
                                      onKeyDown={handleKeyDown}
                                      autoFocus
                                    />
                                  ) : (
                                    <div
                                      onClick={() =>
                                        handleEditRowField(
                                          item.distributorId,
                                          "phoneNo",
                                          item.phoneNo
                                        )
                                      }
                                      className="cursor-pointer !text-xs font-Poppins"
                                    >
                                      {item.phoneNo || " Mobile"}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className=" flex items-center justify-start max-sm:w-auto max-md:w-[7.2rem] w-[7.2rem]  max-xl:w-[5.2rem] bg-[#eef2f9] h-8 ml-gap max-lg:w-[4.2rem] max-sm:flex-row  max-sm:justify-between ">
                              <div class="flex ml-gap text-xs items-center  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                {editableField?.distributorId ===
                                  item.distributorId &&
                                editableField?.field === "dcategoryName" ? (
                                  <Select
                                    style={{ width: "7.2rem" }}
                                    value={editingValue}
                                    onChange={handleChangeRowSelectItem}
                                    onBlur={() =>
                                      handleEditRowField(null, null, null)
                                    }
                                    autoFocus
                                    onClick={fetchCategoryData}
                                  >
                                    {categoryOptions.map((ctg) => (
                                      <Option
                                        key={ctg.categoryId}
                                        value={ctg.categoryId}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                          }}
                                        >
                                          <MultiAvatar
                                            primaryTitle={ctg.name}
                                            size="small"
                                            style={{
                                              backgroundColor:
                                                ctg.color || "#ccc",
                                            }}
                                          />
                                          <span>{ctg.name}</span>
                                        </div>
                                      </Option>
                                    ))}
                                  </Select>
                                ) : (
                                  <div
                                    onClick={() =>
                                      handleEditRowField(
                                        item.distributorId,
                                        "dcategoryName",
                                        item.dcategoryName
                                      )
                                    }
                                    className="cursor-pointer !text-xs font-Poppins"
                                  >
                                    {item.dcategoryName || "Update..."}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className=" flex items-center justify-start  max-sm:w-auto w-[6.2rem] max-md:w-[6.2rem] max-xl:w-[6rem] max-lg:w-[5rem] ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                              <div class=" flex ml-gap text-xs items-center  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                {editableField?.distributorId ===
                                  item.distributorId &&
                                editableField?.field === "clientName" ? (
                                  <Select
                                    style={{ width: "6.2rem" }}
                                    value={editingValue}
                                    onChange={handleChangeRowSelectItem}
                                    onBlur={() =>
                                      handleEditRowField(null, null, null)
                                    }
                                    autoFocus
                                    onClick={fetchCustomerList}
                                  >
                                    {customerListOpt.map((clnt) => (
                                      <Option
                                        key={clnt.customerTypeId}
                                        value={clnt.customerTypeId}
                                      >
                                        <MultiAvatar primaryTitle={clnt.name} />
                                        <span>{clnt.name}</span>
                                      </Option>
                                    ))}
                                  </Select>
                                ) : (
                                  <div
                                    onClick={() =>
                                      handleEditRowField(
                                        item.distributorId,
                                        "clientName",
                                        item.clientName
                                      )
                                    }
                                    className="cursor-pointer !text-xs font-Poppins"
                                  >
                                    {item.clientName || "Update..."}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8  max-sm:w-auto w-[4.2rem] max-md:w-[4.2rem] max-xl:w-[6rem] max-lg:w-[5rem]  max-sm:flex-row  max-sm:justify-between ">
                              <div class=" text-xs cursor-pointer text-blue-600 font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"
                               onClick={() => {
                                setOpenOpportunity(true);
                                        handleCurrentRowData(item);
                                      }}
                              >
                                {item.procureCount}
                              </div>
                            </div>
                            <div className=" flex items-center justify-center  max-sm:w-auto w-[5.21rem] max-md:w-[5.21rem] max-xl:w-[6rem] max-lg:w-[5rem] ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                              <div
                                class=" text-xs cursor-pointer font-bold font-poppins text-center text-blue-600  max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"

                                 onClick={() => {
                                  setOpenOrder(true);
                                          handleCurrentRowData(item);
                                        }}
                              >
                                {item.qtProcureCount}
                              </div>
                            </div>
                            <div className=" flex items-center justify-center  max-sm:w-auto w-[5rem] max-md:w-[5rem] max-xl:w-[3rem] max-lg:w-[2rem] ml-gap bg-[cadetblue] h-8 max-sm:flex-row  max-sm:justify-between ">
                              <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                {editableField?.distributorId ===
                                  item.distributorId &&
                                editableField?.field === "clubName" ? (
                                  <Input
                                    type="text"
                                    className="h-7 w-[4rem] text-xs"
                                    value={editingValue}
                                    onChange={handleChangeRowItem}
                                    onBlur={handleUpdateSubmit}
                                    onKeyDown={handleKeyDown}
                                    autoFocus
                                  />
                                ) : (
                                  <div
                                    onClick={() =>
                                      handleEditRowField(
                                        item.distributorId,
                                        "clubName",
                                        item.clubName
                                      )
                                    }
                                    className="cursor-pointer text-xs font-Poppins"
                                  >
                                    {item.clubName}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className=" flex  items-center justify-center max-sm:w-auto w-[10.2rem] max-md:w-[12rem] max-xl:w-[3rem] max-lg:w-[2rem] ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                              <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                {/* {item.payment} days */}
                                {editableField?.distributorId ===
                                  item.distributorId &&
                                editableField?.field === "payment" ? (
                                  <Input
                                    type="text"
                                    className="h-7 w-[4rem] text-xs"
                                    value={editingValue}
                                    onChange={handleChangeRowItem}
                                    onBlur={handleUpdateSubmit}
                                    onKeyDown={handleKeyDown}
                                    autoFocus
                                  />
                                ) : (
                                  <div
                                    onClick={() =>
                                      handleEditRowField(
                                        item.distributorId,
                                        "payment",
                                        item.payment
                                      )
                                    }
                                    className="cursor-pointer !text-xs font-Poppins"
                                  >
                                    {item.payment || "Update..."} days
                                  </div>
                                )}
                              </div>

                              <div className=" flex  items-center justify-center max-sm:w-auto w-[3rem] max-md:w-[3rem] max-xl:w-[3rem] max-lg:w-[2rem]  bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                  {visible &&
                                  item.distributorId ===
                                    particularRowData.distributorId ? (
                                    <Input
                                      type="text"
                                      value={price}
                                      onChange={(e) =>
                                        handleChange(e.target.value)
                                      }
                                    />
                                  ) : (
                                    item.dispatchPaymentPercentage
                                  )}
                                  %
                                </div>
                              </div>
                              <div className=" flex  items-center justify-center  w-[1.06rem] max-md:w-[1.06rem] bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between  ">
                                <div class=" text-xs  font-poppins">
                                  {visible &&
                                  item.distributorId ===
                                    particularRowData.distributorId ? (
                                    <>
                                      <div className=" flex justify-between ">
                                        <Button
                                          onClick={() => {
                                            handleSubmitPrice();
                                          }}
                                        >
                                          {props.translatedMenuItems[10]}
                                        </Button>
                                        <Button
                                          onClick={() =>
                                            handleUpdateRevisePrice(false)
                                          }
                                        >
                                          {props.translatedMenuItems[15]}
                                        </Button>
                                      </div>
                                    </>
                                  ) : (
                                    <Tooltip
                                      title={props.translatedMenuItems[16]}
                                    >
                                      <PublishedWithChangesIcon
                                        onClick={() => {
                                          handleUpdateRevisePrice();
                                          handleSetParticularOrderData(item);
                                        }}
                                        className="!text-icon cursor-pointer text-[tomato]"
                                      />
                                    </Tooltip>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className=" flex items-center justify-between bg-[#eef2f9] h-8 ml-gap max-sm:w-auto w-[13.01rem] max-md:w-[9.01rem] max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                              <div className=" flex items-center max-sm:w-auto w-[2rem] max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                                <AccountCreditToggle
                                  distributorCreditInd={
                                    item.distributorCreditInd
                                  }
                                  distributorId={item.distributorId}
                                />
                                &nbsp;
                              </div>
                              <div className=" w-[6rem] cursor-pointer ml-2">
                                <Tooltip title="">
                                  <Progress
                                    percent={acivedPercentage}
                                    success={{ acivedPercentage }}
                                    format={() => `${acivedPercentage}%`}
                                    className=" w-[6rem] cursor-pointer ml-2"
                                  />
                                </Tooltip>
                              </div>
                              <div class=" text-xs flex items-center justify-center font-poppins w-[6.021rem] bg-[#eef2f9] h-8   text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                {editableField?.distributorId ===
                                  item.distributorId &&
                                editableField?.field === "curName" ? (
                                  <Select
                                    style={{ width: "6.021rem" }}
                                    value={editingValue}
                                    onChange={handleChangeRowSelectItem}
                                    onBlur={() =>
                                      handleEditRowField(null, null, null)
                                    }
                                    autoFocus
                                    onClick={fetchCurrency}
                                  >
                                    {currencyOpts.map((crr) => (
                                      <Option
                                        key={crr.currency_id}
                                        value={crr.currency_id}
                                      >
                                        {crr.currency_name}
                                      </Option>
                                    ))}
                                  </Select>
                                ) : (
                                  <div
                                    onClick={() =>
                                      handleEditRowField(
                                        item.distributorId,
                                        "curName",
                                        item.curName
                                      )
                                    }
                                    className="cursor-pointer  !text-xxs font-Poppins"
                                  >
                                    {item.curName || "Update..."}
                                  </div>
                                )}
                                {editableField?.distributorId ===
                                  item.distributorId &&
                                editableField?.field === "currencyPrice" ? (
                                  <Input
                                    type="text"
                                    className="h-7 w-[4rem]  text-xs"
                                    value={editingValue}
                                    onChange={handleChangeRowItem}
                                    onBlur={handleUpdateSubmit}
                                    onKeyDown={handleKeyDown}
                                    autoFocus
                                  />
                                ) : (
                                  <div
                                    onClick={() =>
                                      handleEditRowField(
                                        item.distributorId,
                                        "currencyPrice",
                                        item.currencyPrice
                                      )
                                    }
                                    className="cursor-pointer text-xs ml-[0.25rem] font-poppins"
                                  >
                                    {(item.currencyPrice / 1000).toFixed(0)}k
                                  </div>
                                )}
                              </div>
                            </div>

                            <div class=" text-xs items-center justify-center flex bg-[#eef2f9] h-8 ml-gap w-[5.1rem] max-md:w-[2.5rem] font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {/* Assigned */}
                              {item.assignToUser ? (
                                <span
                                  onClick={() => {
                                    handleCurrentRowData(item);
                                    setasignedDrawer(true);
                                  }}
                                >
                                  <MultiAvatar2
                                    primaryTitle={item.assignToUser}
                                    imgWidth={"1.8rem"}
                                    imgHeight={"1.8rem"}
                                  />
                                </span>
                              ) : (
                                ""
                              )}
                            </div>

                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                              <div className=" flex items-center justify-center bg-[#eef2f9] h-8  ml-gap  max-xl:w-[1.2rem] max-sm:flex-row  max-sm:justify-between  ">
                                <div class=" text-xs  font-poppins">
                                  <Tooltip
                                    title={props.translatedMenuItems[12]}
                                  >
                                    {/* "Pulse"> */}
                                    <MonitorHeartIcon
                                      onClick={() => {
                                        props.handleAccountPulse(true);
                                        handleCurrentRowData(item);
                                      }}
                                      className=" !text-icon cursor-pointer text-[#df9697]"
                                    />
                                  </Tooltip>
                                </div>
                              </div>
                              <div className="bg-[#eef2f9] h-8  items-center justify-center flex">
                                <Tooltip title={props.translatedMenuItems[18]}>
                                  <AddLocationAltIcon
                                    className=" !text-icon cursor-pointer text-[#8e4bc0]"
                                    onClick={() => {
                                      props.handleAccountAddress(true);
                                      handleCurrentRowData(item);
                                    }}
                                  />
                                </Tooltip>
                              </div>
                              <div className=" items-center justify-center flex  bg-[#eef2f9] h-8  max-xl:w-[1.25rem] max-sm:flex-row  max-sm:justify-between  ">
                                <div class=" text-xs  font-poppins">
                                  <Tooltip
                                    title={props.translatedMenuItems[11]}
                                  >
                                    <AcUnitIcon
                                      className=" !text-icon cursor-pointer text-[tomato]"
                                      onClick={() => {
                                        handleAccountModal(true);
                                        handleCurrentRowData(item);
                                      }}
                                    />
                                  </Tooltip>
                                </div>
                              </div>
                              <div className="bg-[#eef2f9] h-8  items-center justify-center flex">
                                <Tooltip title={item.url}>
                                  {item.url !== "" ? (
                                    <div
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {}}
                                    >
                                      {" "}
                                      <a
                                        href={`https://${item.url}`}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        <ExploreIcon className=" !text-icon cursor-pointer text-[green]" />
                                      </a>
                                    </div>
                                  ) : (
                                    <div class=" w-0"></div>
                                  )}
                                </Tooltip>
                              </div>
                              <div className=" items-center justify-center flex bg-[#eef2f9] h-8  max-xl:w-[1.25rem] max-sm:flex-row  max-sm:justify-between  ">
                                <div class=" text-xs  font-poppins">
                                  <Tooltip
                                    title={props.translatedMenuItems[19]}
                                  >
                                    <Popconfirm
                                      loading={props.deletingDistributorById}
                                      title={props.translatedMenuItems[14]}
                                      // Do you want to delete?"
                                      onConfirm={() =>
                                        props.deleteDistributor(
                                          {},
                                          item.distributorId,
                                          props.userId
                                        )
                                      }
                                    >
                                      <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer" />
                                    </Popconfirm>
                                  </Tooltip>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : !customerLists.length && !props.fetchingCustomerByUser ? (
                <NodataFoundPage />
              ) : (
                ""
              )}
            </InfiniteScroll>
          </div>
        </div>
      )}
      <Suspense fallback={<BundleLoader />}>
        <AccountPulseModal
          RowData={RowData}
          handleAccountPulse={props.handleAccountPulse}
          showPulseModal={props.showPulseModal}
          selectedLanguage={props.selectedLanguage}
          translateText={props.translateText}
        />
        <AccountModal
          RowData={RowData}
          accountModal={props.accountModal}
          handleAccountModal={handleAccountModal}
          selectedLanguage={props.selectedLanguage}
          translateText={props.translateText}
        />
        <AddAccountAdressModal
          item={RowData}
          type="Distributor"
          addAccountAddressModal={props.addAccountAddressModal}
          handleAccountAddress={props.handleAccountAddress}
        />
        <AccountQuotationDrawer
          RowData={RowData}
          selectedLanguage={props.selectedLanguage}
          translateText={props.translateText}
          addAccountOpportunityModal={props.addAccountOpportunityModal}
          handleAccountOpportunityModal={props.handleAccountOpportunityModal}
        />

        <AsignedOpenDrawer
          RowData={RowData}
          setasignedDrawer={setasignedDrawer}
          asignedDrawer={asignedDrawer}
          selectedLanguage={props.selectedLanguage}
          translateText={props.translateText}
        />
         <OppoOpenDrawer
          RowData={RowData}
          setOpenOrder={setOpenOrder}
          openOrder={openOrder}
          selectedLanguage={props.selectedLanguage}
          translateText={props.translateText}
        />
         <OrderOpenDrawer
          RowData={RowData}
          setOpenOpportunity={setOpenOpportunity}
          openOpportunity={openOpportunity}
          selectedLanguage={props.selectedLanguage}
          translateText={props.translateText}
        />
        {/* <CustomerOpportunityDrawerModal
        RowData={RowData}
        addDrawerCustomerOpportunityModal={addDrawerCustomerOpportunityModal}
        handleCustomerOpportunityDrawerModal={props.handleCustomerOpportunityDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      /> */}
      </Suspense>
    </>
  );
}
const mapStateToProps = ({ distributor, auth, catgCustomer, customer }) => ({
  customerListByUser: distributor.customerListByUser,
  serachedData: distributor.serachedData,
  showPulseModal: distributor.showPulseModal,
  fetchingCustomerByUser: distributor.fetchingCustomerByUser,
  fetchingDistributorsByUserIdError:
    distributor.fetchingDistributorsByUserIdError,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  updateAccountModal: distributor.updateAccountModal,
  addDistributorOrderModal: distributor.addDistributorOrderModal,
  addDistributorActivityTableModal:
    distributor.addDistributorActivityTableModal,
  addBillToAddress: distributor.addBillToAddress,
  accountModal: distributor.accountModal,
  deletingDistributorById: distributor.deletingDistributorById,
  distributorSearch: distributor.distributorSearch,
  addAccountAddressModal: distributor.addAccountAddressModal,
  addAccountOpportunityModal: distributor.addAccountOpportunityModal,
  addDrawerCustomerOpportunityModal: customer.addDrawerCustomerOpportunityModal,
  category: auth.category,
  customerListData: catgCustomer.customerListData,
  saleCurrencies: auth.saleCurrencies,
  countries: auth.countries,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUpdateDistributorModal,
      getCustomerByUser,
      setEditDistributor,
      handleDistributorOrderModal,
      handleDistributorActivityTableModal,
      deleteDistributor,
      handleBillingAddressModal,
      handleUpdateAccountModal,
      handleAccountModal,
      emptyDistributor,
      handleAccountPulse,
      updateAccountPrice,
      handleAccountAddress,
      handleAccountOpportunityModal,
      handleCustomerOpportunityDrawerModal,
      getCategory,
      getCustomer,
      getSaleCurrency,
      getCountry,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountTable);
