import React, { Component  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OpportunityReportCard from "./OpportunityCards/OpportunityReportCard"
import OpportunityAboutViewCard from "./OpportunityCards/OpportunityAboutViewCard";
import OpportunityAboutCard from "./OpportunityCards/OpportunityAboutCard";


class OpportunityDetailRight extends Component {
  render() {
    const {
      opportunity,
    } = this.props;
    return (
      <>
      <div style={{display:"flex"}}>
        <div style={{ width: "30%" }}>     
            <OpportunityAboutViewCard
          opportunity={opportunity} 
        />
        </div>
        {/* <div style={{ width: "20%" ,}}>
          <OpportunityAboutCard
          opportunity={opportunity}
          department={this.props.department}
          partnerLogin={this.props.partnerLogin}
          tradeCurrency={this.props.tradeCurrency}
        />
        </div> */}
         <div style={{width: "26%"}}>
         <OpportunityReportCard
          opportunity={opportunity}
          
        />
        </div>
        </div>
        
        
      </>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunityDetailRight);
