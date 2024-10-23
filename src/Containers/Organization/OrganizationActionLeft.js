import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const OrganizationHeaderTab = lazy(() =>
  import("./Child/OrganizationHeader/OrganizationHeaderTab")
);



class OrganizationActionLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
render() {

    return (
      <>
    <Suspense fallback={"Loading..."}>

      <OrganizationHeaderTab
       activeTab={this.props.activeTab}
      organizationDetailsList={this.props.organizationDetailsList} 
      organizationDetails={this.props.organizationDetails}   
       handleOnClick={this.props.handleOnClick}/>
 
 </Suspense>
 
  
      </>
    );
  }
}
const mapStateToProps = ({ auth, customer, contact, opportunity }) => ({
  // organizationDetailsList:auth.organizationDetailsList,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationActionLeft);

