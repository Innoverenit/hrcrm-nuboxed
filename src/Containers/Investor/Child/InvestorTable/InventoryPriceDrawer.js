import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import {getInvestorsbyId} from "../../InvestorAction";
const InventoryPriceAddTable = lazy(() => import("./InventoryPriceAddTable"));

const InventoryPriceDrawer = (props) => {
  const { priceInvestorDrawer, handleInvestorPriceDrawer, particularDiscountData, getInvestorsbyId, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";

  const handleClose = () => {
    handleInvestorPriceDrawer(false);
    // getInvestorsbyId(props.userId, 0, "creationdate");
  };

  return (
    <>
      <StyledDrawer
        title={`${props.RowData.name || ""} - Shares Owned - ${props.RowData.allTotalQuantityOfShare}`}
        width={drawerWidth}
        visible={priceInvestorDrawer}
        destroyOnClose
        closable
        placement="right"
        onClose={handleClose}
      >
        <Suspense fallback={<BundleLoader />}>
          <InventoryPriceAddTable 
            RowData={props.RowData} 
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

const mapStateToProps = ({
  auth,
  customer,
  sector,
  opportunity,
  employee,
  investor
}) => ({
  userId: auth.userDetails.userId,
  addDrawerInvestorPulseModal:investor.addDrawerInvestorPulseModal,
  addDrawerInvestorContactModal:investor.addDrawerInvestorContactModal,
  investorsbyId:investor.investorsbyId,
  addDrawerInvestorNotesModal:investor.addDrawerInvestorNotesModal,
  fetchingAllCustomers: customer.fetchingAllCustomers,
  fetchingInvestors: investor.fetchingInvestors,
  fetchingInvestorsError: investor.fetchingInvestorsError,
  user: auth.userDetails,
  priceInvestorDrawer: investor.priceInvestorDrawer,
  employees: employee.employees,
  addDrawerCustomerEmailModal: customer.addDrawerCustomerEmailModal,
  investorSerachedData:investor.investorSerachedData,
  fetchingInvestorSearchData:investor.fetchingInvestorSearchData,
  addInvestorAddressModal: investor.addInvestorAddressModal,
  addDrawerInvestorDocumentModal: investor.addDrawerInvestorDocumentModal
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInvestorsbyId,
      
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(InventoryPriceDrawer);