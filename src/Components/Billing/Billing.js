import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader} from "../../Components/Placeholder";
import { setBillingViewType } from "../Billing/BillingAction";

const BillingHeader=lazy(()=>import ("./Child/BillingHeader"));
const BillingListTable=lazy(()=>import ("./BillingTable/BillingListTable"));
const BillingJumpStartBox=lazy(()=>import ("./BillingJumpStart/BillingJumpStartBox"));
class Billing extends Component {

  state = { currentData: "" };
  handleClear = () => {
    this.setState({ currentData: "" });
    // this.props.getEmployeelist();
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  render() {
    const {
      setBillingViewType,
      addEmployeeModal,
      handleEmployeeModal,
      departmentType,
      viewType,
    } = this.props;
    return (
      <React.Fragment>
         <Suspense fallback={<BundleLoader />}>
        <BillingHeader
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
          setBillingViewType={setBillingViewType}
          viewType={viewType}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />
         <BillingJumpStartBox/>
       
        
          <BillingListTable
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
            departmentType={departmentType}
            currentUser={this.state.currentUser}
          />
         
        </Suspense>

      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ billings }) => ({
  viewType: billings.viewType,
  departmentType: billings.departmentType,
      billingByDesignation: billings.billingByDesignation,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setBillingViewType
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Billing);
