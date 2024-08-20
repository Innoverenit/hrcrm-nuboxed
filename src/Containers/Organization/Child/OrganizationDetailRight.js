import React, { Component, lazy, Suspense } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { BundleLoader } from "../../../Components/Placeholder";
const OrganizationDetailTab = lazy(() => import('./OrganizationTabs/OrganizationDetailTab'))
class OrganizationDetailRight extends Component {
    render() {

        return (
            <div class=" flex flex-col" >
                 <Suspense fallback={<BundleLoader />}>
                <OrganizationDetailTab userDetails={this.props.userDetails} 
                 selectedLanguage={this.props.selectedLanguage}
                 translateText={this.props.translateText}/>
                </Suspense>
            </div>
        )
    }
}
const mapStateToProps = ({ auth }) => ({
    userDetails: auth.userDetails
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationDetailRight);