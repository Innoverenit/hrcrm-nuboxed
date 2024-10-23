import React, { Component } from "react";
import { connect } from "react-redux";
import { FullscreenOutlined } from "@ant-design/icons";
import { FlexContainer } from "../../../Components/UI/Layout";
import { BarChart_ } from "../../../Components/Charts";
import { bindActionCreators } from "redux";

class DashboardChart1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartModalVisible: false,
    };
  }
  handleChartModalVisible = () =>
    this.setState({ chartModalVisible: !this.state.chartModalVisible });
  render() {
    const {
      //   fetchingContactListRangeByUserId,
      //   fetchingContactListByUserIdError,
      //   contactAddedBarChartData,
      noDataText,
      user,
    } = this.props;
    // if (fetchingContactListRangeByUserId)
    //   return (
    //     <BlurLoader>
    //       <BundleLoader type="Chart" />
    //     </BlurLoader>
    //   );
    // if (fetchingContactListByUserIdError)
    //   return (
    //     <Empty description={noDataText || ` We couldn't find relevant data`} />
    //   );
    return (
      <>
        <div style={{ position: "relative" }}>
          <FullscreenOutlined

            style={{
              fontSize: "16px",
              color: "#08c",
              border: "1px solid #285bd3",
              borderRadius: "20%",
              left: 0,
              top: 0,
            }}
            //   onClick={this.handleChartModalVisible}
            theme="outlined"
          />
          <FlexContainer justifyContent="space-evenly">
            <BarChart_
              // data={contactAddedBarChartData}
              width={370}
              height={150}
              noLegend
            // barClick={
            //   this.props.subscriptionType === "PROFESSIONALPLUS"
            //     ? () => this.props.handleContactsModal(true)
            //     : null
            // }
            // cursorData={
            //   this.props.subscriptionType === "PROFESSIONALPLUS"
            //     ? "pointer"
            //     : "default"
            // }
            />
          </FlexContainer>
        </div>

        {/* <StyledModal
          title={"Contacts added"}
          width="55vw"
          visible={this.state.chartModalVisible}
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={this.handleChartModalVisible}
          footer={null}
        >
          <div
            id="chart-box"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <BarChart_
            //   data={contactAddedBarChartData}
              width={600}
              height={450}
              // noLegend
            />
          </div>
        </StyledModal> */}
      </>
    );
  }
}

const mapStateToProps = ({ dashboard, contact, auth }) => ({
  //   fetchingContactListRangeByUserId: contact.fetchingContactListRangeByUserId,
  //   contactAddedBarChartData: contactsAddedBarChartSelector(contact, dashboard),
  user: auth.userDetails,
  //   fetchingContactListByUserIdError: contact.fetchingContactListByUserIdError,
  //   subscriptionType: auth.userDetails.metaData.organization.subscriptionType,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {},
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardChart1);
