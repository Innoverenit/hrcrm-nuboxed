import React, { useState, useEffect, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  handleDistributorModal,
  handleAccountImportModal,
  setDistributorViewType,
  getDistributorsByUserId,
  getAllDistributorsList,
} from "./AccountAction";
import { BundleLoader } from "../../../Components/Placeholder";
const AccountHeader = lazy(() => import("./AccountHeader"));
const AddAccountImportModal = lazy(() =>
  import("../Account/AddAccountImportModal")
);
const AddAccountModal = lazy(() => import("./AddAccountModal"));
const AccountTable = lazy(() => import("./AccountTable"));
const AccountDeleteTable = lazy(() => import("./AccountDeleteTable"));
const AllAccountList = lazy(() => import("./AllAccountList"));

const Account = ({
  addDistributorModal,
  viewType,
  setDistributorViewType,
  userId,
  handleDistributorModal,
  getDistributorsByUserId,
  getAllDistributorsList,
  addAccountImportModal,
  handleAccountImportModal,
  selectedLanguage,
  translateText,
  addPitchModal,
}) => {
  const [currentData, setCurrentData] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleClear = () => {
    setCurrentData("");
    if (viewType === "table") {
      getDistributorsByUserId(userId);
    } else if (viewType === "all") {
      getAllDistributorsList();
    }
  };
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true);
        const itemsToTranslate = [
          "110", // 'Name', // 0
          "378", // 'Work', // 1
          "14", // 'Category', // 2
          "71", // 'Type', // 3
          "688", // 'Payment(Days)', // 4
          "1171", // 'Payment', // 5
          "1215", // 'Tax', // 6
          "76", // 'Assigned', // 7
          "1338", // "Credit",//8
          "100", // New 9
          "1259", // "Save" //10
          "692", // More Info With AI 11
          "392", // "Pulse" 12
          "170", // "Edit"13
          "1259", // "Do you want to delete?"14
          "1079", // cancel15
          "1246", // Update  16
          "592", // club 17
          "185", //Adress 18
          "84", //Delete 19
          "202", //Orders 20
          "213", //Quotation 21
          "85", // "Add", 22
          "123", // "Import" 23
          "1295", // Open Order  24
          "679", //Created 25
          "77", // Owner 26
          "546", // 'Mobile', // 27
          "700", // 'Website', // 28
          "188", // 'City', // 29
          "879", // 'Pin Code', // 30
          "357", // "Dial Code",31
          "102", // "Phone",32
          "1109", // "Country",33
          "702", // "Tax Registration",34
          "703", // "Insurancegrade",35
          "705", // "Creditlimit",36
          "707", // "Payment Term Days",37
          "1466", // "Custom Payment",38
          "104", //  "Create"39
          "158", // Start 40
          "5", // "Stop  41
          "194", // "Clear 42
          "710", // Billing address 43
          "241",   // "Currency",44
        ];

        const translations = await translateText(
          itemsToTranslate,
          selectedLanguage
        );
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error translating menu items:", error);
      }
    };

    fetchMenuTranslations();
  }, [selectedLanguage]);
  return (
    <>
      <Suspense fallback={<BundleLoader />}>
        <AccountHeader
          selectedLanguage={selectedLanguage}
          translateText={translateText}
          translatedMenuItems={translatedMenuItems}
          viewType={viewType}
          setDistributorViewType={setDistributorViewType}
          handleClear={handleClear}
          currentData={currentData}
          setCurrentData={setCurrentData}
          handleAccountImportModal={handleAccountImportModal}
          handleDistributorModal={handleDistributorModal}
        />
        <AddAccountModal
          selectedLanguage={selectedLanguage}
          translateText={translateText}
          addPitchModal={addPitchModal}
          handleDistributorModal={handleDistributorModal}
          addDistributorModal={addDistributorModal}
          translatedMenuItems={translatedMenuItems}
        />

        {viewType === "list" ? (
          <div
            className={isLargeScreen ? "hidden sm:block" : "block sm:hidden"}
          >
            <AccountTable
              selectedLanguage={selectedLanguage}
              translateText={translateText}
              translatedMenuItems={translatedMenuItems}
              addPitchModal={addPitchModal}
            />
          </div>
        ) : viewType === "dashboard" ? (
          <div
            className={isLargeScreen ? "hidden sm:block" : "block sm:hidden"}
          >
            <AccountDeleteTable
              selectedLanguage={selectedLanguage}
              translateText={translateText}
              translatedMenuItems={translatedMenuItems}
            />
          </div>
        ) : viewType === "all" ? (
          <div
            className={isLargeScreen ? "hidden sm:block" : "block sm:hidden"}
          >
            <AllAccountList
              selectedLanguage={selectedLanguage}
              translateText={translateText}
              addPitchModal={addPitchModal}
              translatedMenuItems={translatedMenuItems}
            />
          </div>
        ) : null}
        <AddAccountImportModal
          selectedLanguage={selectedLanguage}
          translateText={translateText}
          addAccountImportModal={addAccountImportModal}
          handleAccountImportModal={handleAccountImportModal}
          // addLeadsImportModal={this.props.addLeadsImportModal}
        />
      </Suspense>
    </>
  );
};

const mapStateToProps = ({ distributor, auth, account }) => ({
  viewType: distributor.viewType,
  addDistributorModal: distributor.addDistributorModal,
  userId: auth.userDetails.userId,
  addAccountImportModal: distributor.addAccountImportModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setDistributorViewType,
      handleDistributorModal,
      getDistributorsByUserId,
      handleAccountImportModal,
      getAllDistributorsList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Account);
