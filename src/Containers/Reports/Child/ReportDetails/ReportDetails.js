import React, { Component,Suspense,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


const ReportDetailLeft=lazy(()=> import("./ReportDetailLeft"));
const ReportDetailRight=lazy(()=> import("./ReportDetailRight"));

class ReportDetails extends Component {
  render() {
    const { customer, fetchingCustomerDetailsById } = this.props;
    return (
      <>
        <>
      
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
            visibilityConditions={this.props.visibilityConditions}
               handleDropChange={this.props.handleDropChange} 
               selectedButtonIcon={this.props.selectedButtonIcon}
               handleButtonIcon={this.props.handleButtonIcon}
               UserOrgFlipClick={this.props.UserOrgFlipClick}
               userorgflipClick={this.props.userorgflipClick}
               translateText={this.props.translateText}
               selectedLanguage={this.props.selectedLanguage}
               />
                    </div>
                    <div class=" w-[70%] max-sm:w-full">
                      <ReportDetailRight 
                      gettingReportProspect={this.props.gettingReportProspect}
                      reportProspect={this.props.reportProspect}
                      reportLeads={this.props.reportLeads}
                      gettingReportLeads={this.props.gettingReportLeads}
                      selectedCategory={this.props.selectedCategory}
                      customer={customer} 
                      reportTask={this.props.reportTask}
          gettingReportTask={this.props.gettingReportTask}
          selectedButtonIcon={this.props.selectedButtonIcon}
          handleButtonIcon={this.props.handleButtonIcon}
          UserOrgFlipClick={this.props.UserOrgFlipClick}
          userorgflipClick={this.props.userorgflipClick}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}

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

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetails)

