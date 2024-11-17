import React, { Component, lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import Tabs from "react-draggable-tabs";

import ReactDOM from "react-dom";
import QuotProAndService from "./QuotProAndService";
import { Tooltip, Button, message, Icon } from "antd";
import { ActionIcon } from "../../../../../Components/Utils";
import AddTagProfileModal from "./Recruitment/AddTagProfileModal";
import { connect } from "react-redux";
import AddRecruiterModal from "./Recruitment/AddRecruitModal";
import SummaryTable from "./Recruitment/Child/SummaryTable";
import RecruitmentTable from "./Recruitment/RecruitmentTable";
import { Breadcrumb, Alert } from "antd";
import {
  TabsWrapper,
} from "../../../../../Components/UI/Layout";
import LinkedGenerateQuote from "./LinkedGenerateQuote";
import AddTaskModal from "../../../../Task/Child/AddTaskModal";

class DraggableTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recriutmentdashboard: false,
      partnerPopover: false,
      breadCumb: false,
      quotProPopover: false,
      visibleModal: false,
    };
    this.moveTab = this.moveTab.bind(this);
    this.selectTab = this.selectTab.bind(this);
    this.addTab = this.addTab.bind(this);
    this.state = {
      tabs: [
        {
          id: 1,
          content: (
            <>
              <span onClick={this.handleQuoteClick}>
                <Icon type="shopping" />
                {/* <ShoppingOutlined /> */}
                <FormattedMessage
                  id="app.quotes"
                  defaultMessage="Quotes"
                />
                {/* Quotes */}
              </span>

              <>
                {this.props.partnerLogin === "Yes" &&
                  this.props.department === "Partner" ? null : (
                    <Tooltip //title="Create"
                      title={<FormattedMessage
                        id="app.create"
                        defaultMessage="Create"
                      />}
                    >
                      <Icon
                       
                        //tooltipTitle="Create"
                        tooltiptitle={<FormattedMessage
                          id="app.create"
                          defaultMessage="Create"
                        />}
                        onClick={this.handleOpenBreadCumb}
                        size="0.875em"
                        style={{ marginLeft: "0.3125em", verticalAlign: "center" }}
                      />
                    </Tooltip>
                  )}
              </>
              {this.state.breadCumb ? (
                <Suspense fallback={"Loading ..."}>
                  <Breadcrumb
                    style={{
                      marginBottom: "0.625em",
                      marginTop: "0.625em",
                      marginLeft: "0.625em",
                    }}
                  >
                    <Breadcrumb.Item>
                      <FormattedMessage
                        id="app.newquotation"
                        defaultMessage="New Quotation"
                      />
                      {/* New Quotation */}
                      <Tooltip //title="Create"
                        title={<FormattedMessage
                          id="app.create"
                          defaultMessage="Create"
                        />}
                      >
                        <Icon
                          type="shopping-cart"
                          // tooltipTitle="Create"
                          tooltiptitle={<FormattedMessage
                            id="app.create"
                            defaultMessage="Create"
                          />}                     
                          size="0.875em"
                          style={{
                            marginLeft: "0.375em",
                            verticalAlign: "center",
                            color: "#0093d7",
                          }}
                        />
                      </Tooltip>
                    </Breadcrumb.Item>
                  </Breadcrumb>

                  {/* <QuotProAndService /> */}

                  <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto m-[0.3125rem] ">         
                    <Button
                      type="primary"
                      onClick={() =>
                        this.props.contactListByOpportunityId &&
                          this.props.contactListByOpportunityId.length > 1
                          ? this.handleOpenModal(true)
                          : this.handleButtonClick()
                      }
                    >
                      <FormattedMessage
                        id="app.generatequote"
                        defaultMessage=" Generate Quote"
                      />
                      {/* Generate Quote */}
                    </Button>
                  </div>
                </Suspense>
              ) : (
                  <>
                    <Suspense fallback={"Loading ..."}>
                      {/* <QuotationTable /> */}
                    </Suspense>
                  </>
                )}
            </>
          ),
          active: true,
          display: (
            <>
              {!this.state.breadCumb ? (
                <QuotProAndService />
              ) : (
                  {
                    /* <QuotationTable /> */
                  }
                )}
            </>
          ),
        },
        {
          id: 2,
          content: (
            <>
              <span
                onClick={this.handleRecruitClick}
              // style={{ backgroundColor: "white", color: "blue" }}
              >
                <Icon type="reconciliation" />
                {/* <ReconciliationOutlined /> */}
                <FormattedMessage
                  id="app.recruitpro"
                  defaultMessage="RecruitPro"
                />
                {/* RecruitPro */}
              </span>
              &nbsp;&nbsp;&nbsp;
              <>
                {this.props.subscriptionType === "FREE" && (
                  <Tooltip
                    title={
                      this.props.subscriptionType === "FREE"
                        ? "Upgrade subscription to unlock interesting features"
                        : ""
                    }
                  >
                    <Icon
                     
                      //  tooltipTitle="Tag Document"
                      tooltiptitle={<FormattedMessage
                        id="app.tagdocument"
                        defaultMessage="Tag Document"
                      />}

                      // handleIconClick={() => handleDocumentUploadModal(true)}
                      size="0.875em"
                      style={{
                        // marginLeft: "0.25em",
                        verticalAlign: "center",
                        cursor: "not-allowed",
                      }}
                    />
                    <Tooltip //title="Tag Position"
                      title={<FormattedMessage
                        id="app.tagposition"
                        defaultMessage="Tag Position"
                      />}

                    >
                      <Icon
                        type="link"
                        //  tooltipTitle="Tag Document"
                        tooltiptitle={<FormattedMessage
                          id="app.tagdocument"
                          defaultMessage="Tag Document"
                        />}
                        onClick={() => {
                          this.handlepartnerPopoverVisibleChange();
                          this.props.handleTagProfileModal(true);
                        }}
                        size="0.875em"
                        style={{
                          marginLeft: "-0.3125em",
                          verticalAlign: "center",
                        }}
                      />
                    </Tooltip>
                  </Tooltip>
                )}
                {this.props.subscriptionType !== "FREE" && (
                  <>
                    <Tooltip //title="Add Requirement"
                      title={<FormattedMessage
                        id="app.addrequirement"
                        defaultMessage="Add Requirement"
                      />}

                    >
                      <Icon
                       
                        // tooltipTitle="Add Requirement"
                        tooltiptitle={<FormattedMessage
                          id="app.addrequirement"
                          defaultMessage="Add Requirement"
                        />}

                        onClick={() => this.props.handleRecruitModal(true)}
                        size="0.875em"
                        style={{
                          marginLeft: "0.25em",
                          verticalAlign: "center",
                        }}
                      />
                    </Tooltip>
                    &nbsp;&nbsp;
                    <Tooltip //title="Tag Position"
                      title={<FormattedMessage
                        id="app.tagposition"
                        defaultMessage="Tag Position"
                      />}
                    >
                      <Icon
                        type="link"
                        //tooltipTitle="Tag Position"
                        tooltip title={<FormattedMessage
                          id="app.tagposition"
                          defaultMessage="Tag Position"
                        />}
                        onClick={() => {
                          this.handlepartnerPopoverVisibleChange();
                          this.props.handleTagProfileModal(true);
                        }}
                        size="0.875em"
                        style={{
                          marginLeft: "-0.3125em",
                          verticalAlign: "center",
                        }}
                      />
                    </Tooltip>
                    &nbsp;&nbsp;
                    <Tooltip title="Summary">
                      <Icon
                        type="area-chart"
                        tooltipTitle="Summary"
                        onClick={() => {
                          this.handleRecriutmentdashboard();
                        }}
                        size="0.875em"
                        style={{
                          marginLeft: "-0.3125em",
                          verticalAlign: "center",
                        }}
                      />
                    </Tooltip>
                    {this.state.recriutmentdashboard ? (
                      <Suspense fallback={"Loading ..."}>
                        {" "}
                        {/* <RecruitProJumpstart /> */}
                        {/* <RecruitProgressBar /> */}
                        <SummaryTable />
                      </Suspense>
                    ) : (
                        <Suspense fallback={"Loading ..."}>
                          {" "}
                          {/* <RecruitmentTable /> */}
                        </Suspense>
                      )}
                  </>
                )}          
              </>
            </>
          ),
          display: (
            <>
              {this.state.recriutmentdashboard ? (
                <Suspense fallback={"Loading ..."}>
                  {" "}
                  {/* <RecruitProJumpstart /> */}
                  {/* <RecruitProgressBar /> */}
                  <SummaryTable />
                </Suspense>
              ) : (
                  <Suspense fallback={"Loading ..."}>
                    {" "}
                    <RecruitmentTable />
                  </Suspense>
                  //                     ):(
                  // <QuotProAndService />
                )}
            </>
          ),
        },
        {
          id: 5,
          content: "Partner",
          display: (
            <iframe
              title="DuckDuckGo"
              src="https://duckduckgo.com/"
              style={{
                border: "0",
                margin: "3.125em",
                width: "31.25em",
                height: "50em",
              }}
            />
          ),
        },
        {
          id: 6,
          content: "Notes",
          display: (
            <iframe
              title="DuckDuckGo"
              src="https://duckduckgo.com/"
              style={{
                border: "0",
                margin: "3.125em",
                width: "31.25em",
                height: "50em",
              }}
            />
          ),
        },
        {
          id: 7,
          content: "Contacts",
          display: (
            <iframe
              title="DuckDuckGo"
              src="https://duckduckgo.com/"
              style={{
                border: "0",
                margin: "3.125em",
                width: "31.25em",
                height: "50em",
              }}
            />
          ),
        },
        {
          id: 8,
          content: "Calls",
          display: (
            <iframe
              title="DuckDuckGo"
              src="https://duckduckgo.com/"
              style={{
                border: "0",
                margin: "3.125em",
                width: "31.25em",
                height: "50em",
              }}
            />
          ),
        },
        {
          id: 9,
          content: "Events",
          display: (
            <iframe
              title="DuckDuckGo"
              src="https://duckduckgo.com/"
              style={{
                border: "0",
                margin: "3.125em",
                width: "31.25em",
                height: "50em",
              }}
            />
          ),
        },
        {
          id: 10,
          content: "Documents",
          display: (
            <iframe
              title="DuckDuckGo"
              src="https://duckduckgo.com/"
              style={{
                border: "0",
                margin: "3.125em",
                width: "31.25em",
                height: "50em",
              }}
            />
          ),
        },
      ],
    };
  }
  handleSubmitButtonClick = (values) => {
    console.log(values.contactId);
    const {
      productsByOpportunityId,
      servicesByOpportunityId,
      userId,
      opportunityId,
      organizationId,
    } = this.props;
    console.log(productsByOpportunityId, servicesByOpportunityId);

    console.log(userId);
    const dataForEmail = {
      userId: userId,
      opportunityId: opportunityId,
      organizationId: organizationId,
    };
    const finalData = [
      {
        productMapper: productsByOpportunityId,
        productServiceMapper: servicesByOpportunityId,
        contactId: values.contactId,
        status: "",
        userId: userId,
        opportunityId: opportunityId,
        organizationId: organizationId,
      },
    ];
    this.props.generateQuotation(finalData, opportunityId, (data, id) =>
      this.handleCallBack(data, id, dataForEmail)
    );

    this.setState({ breadCumb: false });
    this.setState({ visibleModal: false });
    message.success("Quotation generated successfully!");
    // const finalArray = productsByOpportunityId.concat(servicesByOpportunityId);
    console.log(finalData);
  };
  handlepartnerPopoverVisibleChange = () =>
    this.setState({ partnerPopover: !this.state.partnerPopover });

  handleRecriutmentdashboard = () => {
    console.log("................................");
    this.setState({ recriutmentdashboard: true });
  };
  handleRecruitClick = () => {
    this.setState({ recriutmentdashboard: false });
  };
  handleQuoteClick = () => {
    this.setState({ breadCumb: false });

    console.log("action clicked.........................................");
  };

  handleOpenBreadCumb = () => {
    this.setState({ breadCumb: true });

    console.log(this.state.breadCumb);
  };
  handleOpenModal = (data) => {
    this.setState({ visibleModal: data });
  };
  handleQuotProPopoverVisibleChange = () =>
    this.setState({ quotProPopover: !this.state.quotProPopover });
  handleQuoteClick = () => {
    this.setState({ breadCumb: false });

    console.log("action clicked.........................................");
  };
  moveTab(dragIndex, hoverIndex) {
    this.setState((state, props) => {
      let newTabs = [...state.tabs];
      newTabs.splice(hoverIndex, 0, newTabs.splice(dragIndex, 1)[0]);

      return { tabs: newTabs };
    });
  }
  handleTask = () => {
    this.props.getTasksListByOpportunityId(
      this.props.opportunity.opportunityId
    );
  };
  selectTab(selectedIndex, selectedID) {
    this.setState((state, props) => {
      const newTabs = state.tabs.map((tab) => ({
        ...tab,
        active: tab.id === selectedID,
      }));
      return { tabs: newTabs };
    });
  }

  // closedTab(removedIndex, removedID) {
  //   this.setState((state, props) => {
  //     let newTabs = [...state.tabs];
  //     newTabs.splice(removedIndex, 1);

  //     if (state.tabs[removedIndex].active && newTabs.length !== 0) {
  //       // automatically select another tab if needed
  //       const newActive = removedIndex === 0 ? 0 : removedIndex - 1;
  //       newTabs[newActive].active = true;
  //     }

  //     return { tabs: newTabs };
  //   });
  // }

  addTab() {
    this.setState((state, props) => {
      let newTabs = [...state.tabs];
      newTabs.push({
        id: newTabs.length + 1,
        content: "Cute *",
        display: <div key={newTabs.length + 1}>Cute *</div>,
      });

      return { tabs: newTabs };
    });
  }
  componentDidMount() {
    // this.props.getOpportunityCard(this.props.userId);
  }
  render() {
    const activeTab = this.state.tabs.filter((tab) => tab.active === true);
    return (
      <>
        <div>
          <Tabs
            moveTab={this.moveTab}
            selectTab={this.selectTab}
            // closeTab={this.closedTab}
            tabs={this.state.tabs}
          ></Tabs>
          {activeTab.length !== 0 ? activeTab[0].display : ""}
        </div>

        {/* <AddTagProfileModal
          addTagProfileModal={this.props.addTagProfileModal}
          handleTagProfileModal={this.props.handleTagProfileModal}
        /> */}
        {/* <AddRecruiterModal
          addRecruitModal={this.props.addRecruitModal}
          handleRecruitModal={this.props.handleRecruitModal}
        /> */}
        <LinkedGenerateQuote
          visibleModal={this.state.visibleModal}
          handleOpenModal={this.handleOpenModal}
          handleSubmitButtonClick={this.handleSubmitButtonClick}
        />
      </>
    );
  }
}
const mapStateToProps = ({ opportunity, auth, task }) => ({
  // addTagProfileModal: opportunity.addTagProfileModal,
  // user: auth.userDetails,
  // addTaskModal: task.addTaskModal,
  // opportunityId: opportunity.opportunity.opportunityId,
  // addLinkConfigureModal: opportunity.addLinkConfigureModal,
  // addRecruitModal: opportunity.addRecruitModal,
  // contactListByOpportunityId: opportunity.contactListByOpportunityId,
  // department: auth.userDetails && auth.userDetails.department,
  // partnerLogin: auth.userDetails && auth.userDetails.partnerLogin,
  // subscriptionType: auth.userDetails.metaData.organization.subscriptionType,
  // userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // handleTagProfileModal,
      // handleRecruitModal,
      // handleLinkConfigureModal,
      // handleTaskModal,
      // getTasksListByOpportunityId,
      // getOpportunityCard,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DraggableTabs);
