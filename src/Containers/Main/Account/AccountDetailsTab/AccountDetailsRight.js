import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
const AccountDetailsTab = lazy(() => import("./AccountDetailsTab"));
function AccountDetailsRight(props) {
    return (
        <div style={{ width: "100%" }}>
            <Suspense fallback={<BundleLoader />}>
                <AccountDetailsTab distributorData={props.distributorData}
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText} />
            </Suspense>
        </div>
    );}
const mapStateToProps = ({ }) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AccountDetailsRight);