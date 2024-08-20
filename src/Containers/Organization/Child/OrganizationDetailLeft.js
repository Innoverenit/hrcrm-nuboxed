import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const OrganizationOverviewCard = lazy(() =>
  import("./OrganizationCards/OrganizationOverviewCard")
);
const OrganizationAboutCard = lazy(() =>
  import("./OrganizationCards/OrganizationAboutCard")
);
const OrganizationStatsCard = lazy(() =>
  import("./OrganizationCards/OrganizationStatsCard")
);
const OrganizationDetailMap = lazy(() =>
  import("./OrganizationCards/OrganizationDetailMap")
);
const OrganizationAddress = lazy(() =>
  import("./OrganizationCards/OrganizationAddress")
);


class OrganizationDetailLeft extends Component {
  render() {
    const { organizationDetails } = this.props;
    console.log(organizationDetails);
    return (
      <div class=" flex flex-col ">
        <OrganizationOverviewCard
         organizationList={this.props.organizationList} 
         organization={organizationDetails} />
        {/* <OrganizationTopicOfIntrest organizationDetails={organizationDetails} /> */}
        <OrganizationAboutCard
           organizationList={this.props.organizationList} 
        organization={organizationDetails} />
        <OrganizationStatsCard 
           organizationList={this.props.organizationList} 
        organization={organizationDetails} />
        <OrganizationAddress
           organizationList={this.props.organizationList} 
         organization={organizationDetails} />
        {/* <OrgannizationTermsCard organizationDetails={organizationDetails} /> */}
        <OrganizationDetailMap 
           organizationList={this.props.organizationList} 
        organization={organizationDetails} />
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  organizationDetails: auth.organizationDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationDetailLeft);
