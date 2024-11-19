import React, { Component } from "react";
import { connect } from "react-redux";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { bindActionCreators } from "redux";
import { BarChart1_, PieChart_ } from "../../../Components/Charts";
import { FlexContainer } from "../../../Components/UI/Layout";

class DashboardChart2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartModalVisible: false,
            // chartWidth: 0,
            // chartHeight: 0
        };
    }

    handleChartModalVisible = () =>
        this.setState({ chartModalVisible: !this.state.chartModalVisible });

    componentDidMount() {
        const {
            //   userId,
            //   startDate,
            //   endDate,
            user,
        } = this.props;
    }

    //   componentWillReceiveProps(nextProps) {
    //     if (
    //       this.props.startDate != nextProps.startDate ||
    //       this.props.endDate != nextProps.endDate ||
    //       this.props.userId != nextProps.userId
    //     ) {
    //       const {
    //         userId,
    //         startDate,
    //         endDate,
    //       } = nextProps;
    //     }
    //   }
    render() {
        const {
            //   fetchingOpportunityRelatedData,
            //   fetchingSources,
            //   opportunityAmountBySource,
            user,
        } = this.props;

        // console.log("opportunityAmountBySource", opportunityAmountBySource);

        // if (fetchingOpportunityRelatedData) {
        //   return (
        //     <BlurLoader>
        //       <BundleLoader type="Chart" />
        //     </BlurLoader>
        //   );
        // }
        // if (fetchingOpportunityRelatedData || fetchingSources) {
        //   return (
        //     <BlurLoader>
        //       <BundleLoader type="Chart" />
        //     </BlurLoader>
        //   );
        // }

        return (
            <>
                <div style={{ position: "relative" }}>
                    <FullscreenIcon

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
                        <PieChart_
                            width={450}
                            height={390}
                            // data={opportunityAmountBySource}
                            innerRadius={40}
                            outerRadius={80}
                            textData
                            curr
                            currency={user.tradeCurrency}
                        // chartClick={
                        //   this.props.subscriptionType === "PROFESSIONALPLUS"
                        //     ? () => this.props.handleChartModal(true)
                        //     : null
                        // }
                        // cursorData={
                        //   this.props.subscriptionType === "PROFESSIONALPLUS"
                        //     ? "pointer"
                        //     : "default"
                        // }
                        />
                        {/* <p style={{ fontSize: "18px" }}>
                {opportunityAmountBySource.length
                  ? `Value in ${user.tradeCurrency}`
                  : null}
              </p> */}
                    </FlexContainer>
                </div>

                {/* <StyledModal
          title={"Source"}
          width="55vw"
          visible={this.state.chartModalVisible}
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
        //   onCancel={this.handleChartModalVisible}
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
            <PieChart_
              width={600}
              height={450}
            //   data={opportunityAmountBySource}
              innerRadius={40}
              outerRadius={80}
              curr
              currency={user.tradeCurrency}
              textData
            />
          </div>
          <div style={{ textAlign: "center", fontSize: "18px" }}>
            {opportunityAmountBySource.length
              ? `Value in ${user.tradeCurrency}`
              : null}
          </div>
        </StyledModal> */}
            </>
        );
    }
}
const mapStateToProps = ({ dashboard, auth, opportunity }) => ({
    //   startDate: dashboard.startDate,
    //   endDate: dashboard.endDate,
    //   fetchingSources: opportunity.fetchingSources,
    //   fetchingOpportunityRelatedData: dashboard.fetchingOpportunityRelatedData,
    //   opportunityAmountBySource: opportunityAmoutBySourceSelector(
    //     dashboard,
    //     opportunity,
    //     auth
    //   ),
    user: auth.userDetails,
    //   userId: auth.userDetails.userId,
    //   subscriptionType: auth.userDetails.metaData.organization.subscriptionType,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DashboardChart2);
