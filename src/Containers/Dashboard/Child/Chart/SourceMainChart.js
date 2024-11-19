import React, { Component } from "react";
import { connect } from "react-redux";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { bindActionCreators } from "redux";
import { PieChart, Pie, } from "recharts";

class SourceMainChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartModalVisible: false,
  
    };
  }
//   handleChartModalVisible = () =>
//     this.setState({ chartModalVisible: !this.state.chartModalVisible });
//   componentDidMount() {
//     const {
//       userId,
//       startDate,
//       endDate,
//       getOpportunityRelatedData,
//       getSources,
//       user,
//     } = this.props;

//     getOpportunityRelatedData(userId, startDate, endDate);
//     getSources();
//   }

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
//         getOpportunityRelatedData,
//         getSources,
//       } = nextProps;
//       getOpportunityRelatedData(userId, startDate, endDate);
//       getSources();
//     }
//   }
  render() {
    const {
      fetchingOpportunityRelatedData,
      fetchingSources,
    //   opportunityAmountBySource,
      user,
      handleChartModal,
      addChartModal,
    } = this.props;

    const data01 = [
        {
          "name": "Group A",
          "value": 400
        },
        {
          "name": "Group B",
          "value": 300
        },
        {
          "name": "Group C",
          "value": 300
        },
        {
          "name": "Group D",
          "value": 200
        },
        {
          "name": "Group E",
          "value": 278
        },
        {
          "name": "Group F",
          "value": 189
        }
      ];

    return (
      <div>
        
          <div style={{ position: "relative" }}>
            <FullscreenIcon
              // type="fullscreen"
              style={{
                fontSize: "1em",
                color: "#08c",
                border: "0.06em solid #285bd3",
                borderRadius: "20%",
                left: 0,
                top: 0,
              }}
              onClick={this.handleChartModalVisible}
              theme="outlined"
            />
            <div class=" flex justify-evenly" >
            <PieChart width={730} height={250}>
  <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
</PieChart>
            </div>
           
          </div>
      </div>
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
//   user: auth.userDetails,
//   userId: auth.userDetails.userId,
//   addChartModal: dashboard.addChartModal,
//   subscriptionType: auth.userDetails.metaData.organization.subscriptionType,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   getOpportunityRelatedData,
    //   getSources,
    //   handleChartModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SourceMainChart);
