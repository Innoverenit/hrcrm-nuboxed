import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OpportunityCard from "./OpportunityCards/OpportunityCard";
const OpportunityDetailTab = lazy(() =>
  import("./OpportunityTab/OpportunityDetailTab")
);

class OpportunityDetailLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      account: {},
      isError: false,
    };
  }
 

  render() {
    const {
      user: {
        metaData: { productStatus },
      },
      opportunity,
    } = this.props;
    const { account } = this.state;
    console.log(opportunity);
    return (
      <div class=" flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
        <div>
        <OpportunityCard
          opportunity={opportunity}
          account={account}
          updateAccount={this.updateAccount}
          setAccount={this.setAccount}
          department={this.props.department}
          partnerLogin={this.props.partnerLogin}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems}
        />
        </div>
        
        
          <div className="w-[89vw]">
         <OpportunityDetailTab
          opportunity={opportunity}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems}
          />
          </div>
       </div>
    );
  }
}
const mapStateToProps = ({ opportunity, account, auth }) => ({
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
   
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunityDetailLeft);
