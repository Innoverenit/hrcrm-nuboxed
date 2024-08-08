import React, { Component, lazy, Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer, MainWrapper } from "../../../../Components/UI/Layout";
import { withRouter } from "react-router";
import { getDistributorByDistributorId } from "../AccountAction"
import { BundleLoader } from "../../../../Components/Placeholder";
import AccountDetailsHeader from "./AccountDetailsHeader";
import AccountDetailsLeft from "./AccountDetailsLeft";
import AccountDetailsRight from "./AccountDetailsRight";

function AccountDetails(props) {

    useEffect(() => {
        props.getDistributorByDistributorId(props.match.params.distributorId)
    }, [])
    const { distributorData, fetchingDistributorDetailsByDistributorId } = props
    return (
        <>
            <>
                <AccountDetailsHeader distributorData={props.distributorData}
                 selectedLanguage={props.selectedLanguage}
                 translateText={props.translateText} />
                {fetchingDistributorDetailsByDistributorId ? (
                    <MainWrapper>
                        <BundleLoader />
                    </MainWrapper>
                ) : (
                    <FlexContainer>
                        <Suspense fallback={"Loading..."}>
                            <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                                {/* <div style={{ width: "22%" }}>
                                    <AccountDetailsLeft distributorData={distributorData}
                                     selectedLanguage={props.selectedLanguage}
              translateText={props.translateText} />
                                </div> */}
                                <div style={{ width: "100%" }}>
                                    <AccountDetailsRight distributorData={distributorData} 
                                      selectedLanguage={props.selectedLanguage}
                                      translateText={props.translateText}/>
                                </div>
                            </FlexContainer>
                        </Suspense>
                    </FlexContainer>
                )}
            </>
        </>
    );
}

const mapStateToProps = ({ distributor }) => ({
    distributorData: distributor.distributorDetailsByDistributorId,
    fetchingDistributorDetailsByDistributorId: distributor.fetchingDistributorDetailsByDistributorId
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDistributorByDistributorId
        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AccountDetails)
);
