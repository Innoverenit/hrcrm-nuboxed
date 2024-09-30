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
                <div className=" flex  flex-row">
                  <div class=" flex  max-sm:flex-col max-sm:overflow-x-auto max-sm:h-[63vh]"
                >
                    <div class=" w-1/5 max-sm:w-full">
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
               handleDropChange={this.props.handleDropChange} 
               selectedButtonIcon={this.props.selectedButtonIcon}
               handleButtonIcon={this.props.handleButtonIcon}
               UserOrgFlipClick={this.props.UserOrgFlipClick}
               userorgflipClick={this.props.userorgflipClick}
               />
                    </div>
                    <div class=" w-4/5 max-sm:w-full">
                      <ReportDetailRight 
                      gettingReportProspect={this.props.gettingReportProspect}
                      reportProspect={this.props.reportProspect}
                      selectedCategory={this.props.selectedCategory}
                      customer={customer} 
                      reportTask={this.props.reportTask}
          gettingReportTask={this.props.gettingReportTask}
          selectedButtonIcon={this.props.selectedButtonIcon}
          handleButtonIcon={this.props.handleButtonIcon}
          UserOrgFlipClick={this.props.UserOrgFlipClick}
          userorgflipClick={this.props.userorgflipClick}

                      />
                    </div>
                  </div>
                  {/* <div className=" h-[85vh] w-[ ]">
                  <div>click on the topic on the left pane to generate the report.</div>
                  </div> */}
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
