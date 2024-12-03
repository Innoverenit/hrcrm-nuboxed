import React, { useState, useEffect, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  handleDistributorModal,
  handleAccountImportModal,
  setDistributorViewType,
  getDistributorsByUserId,
  getAllDistributorsList
} from "./AccountAction";
const  AccountHeader = lazy(() => import("./AccountHeader"));
const AddAccountImportModal = lazy(() => import("../Account/AddAccountImportModal"));
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
  addPitchModal

}) => {
  const [currentData, setCurrentData] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
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

  return (
    <>
    <Suspense fallback={"Loading.."}>
      <AccountHeader
        selectedLanguage={selectedLanguage}
        translateText={translateText}
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
      />
      
        {viewType === "list" ? (
          <div className={isLargeScreen ? "hidden sm:block" : "block sm:hidden"}>
            <AccountTable
             selectedLanguage={selectedLanguage}
             translateText={translateText}
              addPitchModal={addPitchModal}
            />
          </div>
        )
          : viewType === "dashboard" ? (
            <div className={isLargeScreen ? "hidden sm:block" : "block sm:hidden"}>
               <AccountDeleteTable
                selectedLanguage={selectedLanguage}
                translateText={translateText}/> 
                
            </div>
          ) : viewType === "all" ? (
            <div className={isLargeScreen ? "hidden sm:block" : "block sm:hidden"}>
              <AllAccountList
               selectedLanguage={selectedLanguage}
               translateText={translateText}
                addPitchModal={addPitchModal} />
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

const mapStateToProps = ({ distributor, auth ,account}) => ({
  viewType: distributor.viewType,
  addDistributorModal: distributor.addDistributorModal,
  userId: auth.userDetails.userId,
  addAccountImportModal:distributor.addAccountImportModal
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setDistributorViewType,
      handleDistributorModal,
      getDistributorsByUserId,
      handleAccountImportModal,
      getAllDistributorsList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Account);
