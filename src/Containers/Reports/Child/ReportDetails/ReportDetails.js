import React, { Component,Suspense,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { getCustomerDetailsById } from "../../CustomerAction";
import { withRouter } from "react-router";
import ReportDetailRight from "./ReportDetailRight";
const ReportDetailLeft=lazy(()=> import("./ReportDetailLeft"));


class ReportDetails extends Component {
//   componentDidMount() {
//     this.props.getCustomerDetailsById(this.props.match.params.customerId);
//   }
  render() {
    const { customer, fetchingCustomerDetailsById } = this.props;
    return (
      <>
        <>
          {/* <CustomerDetailHeader />
          {fetchingCustomerDetailsById ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : ( */}
              <div>
                <Suspense fallback={"Loading..."}>
                  <div class=" flex flex-nowrap w-full max-sm:flex-col max-sm:overflow-x-auto max-sm:h-[63vh]"
                >
                    <div class=" w-1/4 max-sm:w-full">
                      <ReportDetailLeft   handleIconClick={this.props.handleIconClick}
            activeIcon={this.props.activeIcon}
            handleButtonTask={this.props.handleButtonTask}
            taskData={this.props.taskData}
            dropdownData={this.props.dropdownData}
            selectedCategory={this.props.selectedCategory}
            dropdownOptions={this.props.dropdownOptions}
            handleSelectChange={this.props.handleSelectChange}
            handleButtonClick={this.props.handleButtonClick}
            buttonData={this.props.buttonData}
               handleDropChange={this.props.handleDropChange} />
                    </div>
                    <div class=" w-3/4 max-sm:w-full">
                      <ReportDetailRight 
                      gettingReportProspect={this.props.gettingReportProspect}
                      reportProspect={this.props.reportProspect}
                      selectedCategory={this.props.selectedCategory}
                      customer={customer} />
                    </div>
                  </div>
                </Suspense>
              </div>
            {/* )} */}
        </>
      </>
    );
  }
}
const mapStateToProps = ({ customer }) => ({
  fetchingCustomerDetailsById: customer.fetchingCustomerDetailsById,
  customer: customer.customer,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   getCustomerDetailsById,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReportDetails)
);
