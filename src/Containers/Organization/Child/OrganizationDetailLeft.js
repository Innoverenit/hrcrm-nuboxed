import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OrganizationOverviewCard from "./OrganizationCards/OrganizationOverviewCard";
import OrganizationAboutCard from "./OrganizationCards/OrganizationAboutCard";
import OrganizationStatsCard from "./OrganizationCards/OrganizationStatsCard";
import OrganizationDetailMap from "./OrganizationCards/OrganizationDetailMap";
import OrganizationAddress from "./OrganizationCards/OrganizationAddress";

class OrganizationDetailLeft extends Component {
  render() {
    const { organizationDetails } = this.props;
    console.log(organizationDetails);
    return (
      <div class=" flex flex-col block">
        <OrganizationOverviewCard organization={organizationDetails} />
        {/* <OrganizationTopicOfIntrest organizationDetails={organizationDetails} /> */}
        <OrganizationAboutCard organization={organizationDetails} />
        <OrganizationStatsCard organization={organizationDetails} />
        <OrganizationAddress organization={organizationDetails} />
        {/* <OrgannizationTermsCard organizationDetails={organizationDetails} /> */}
        <OrganizationDetailMap organization={organizationDetails} />
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
