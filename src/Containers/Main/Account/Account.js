import React, { useState, useEffect, Suspense, lazy } from "react";
import AccountHeader from "./AccountHeader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddAccountImportModal from '../Account/AddAccountImportModal'
import { BundleLoader } from "../../../Components/Placeholder";
import {
  handleDistributorModal,
  handleAccountImportModal,
  setDistributorViewType,
  getDistributorsByUserId,
  getAllDistributorsList
} from "./AccountAction";
const AddAccountModal = lazy(() => import("./AddAccountModal"));
const AccountTable = lazy(() => import("./AccountTable"));
const AccountDeleteTable = lazy(() => import("./AccountDeleteTable"));
const AllAccountList = lazy(() => import("./AllAccountList"));
const AccountCard = lazy(() => import("./AccountCard"));
const AccountDeleteCard = lazy(() => import("./AccountDeleteCard"));

const Account = ({
  addDistributorModal,
  viewType,
  setDistributorViewType,
  userId,
  handleDistributorModal,
  getDistributorsByUserId,
  getAllDistributorsList,
  addAccountImportModal,
  handleAccountImportModal
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
      <AccountHeader
        viewType={viewType}
        setDistributorViewType={setDistributorViewType}
        handleClear={handleClear}
        currentData={currentData}
        setCurrentData={setCurrentData}
        handleAccountImportModal={handleAccountImportModal}
        handleDistributorModal={handleDistributorModal}
      />
      <AddAccountModal
        handleDistributorModal={handleDistributorModal}
        addDistributorModal={addDistributorModal}
      />
      <Suspense fallback={<BundleLoader />}>
        {viewType === "list" ? (
          <div className={isLargeScreen ? "hidden sm:block" : "block sm:hidden"}>
            <AccountTable />
          </div>
        )
          : viewType === "card" ? (
            <AccountCard />
          ) : viewType === "dashboard" ? (
            <div className={isLargeScreen ? "hidden sm:block" : "block sm:hidden"}>
              {isLargeScreen ? <AccountDeleteTable /> : <AccountDeleteCard />}
            </div>
          ) : viewType === "all" ? (
            <div className={isLargeScreen ? "hidden sm:block" : "block sm:hidden"}>
              <AllAccountList />
            </div>
          ) : null}
            <AddAccountImportModal
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
