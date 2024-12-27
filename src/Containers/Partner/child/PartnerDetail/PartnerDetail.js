import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPartnerDetailsById } from "../../PartnerAction";
import {  MainWrapper } from "../../../../Components/UI/Layout";

import { BundleLoader } from "../../../../Components/Placeholder";
import PartnerDetailRight from "./PartnerDetailRight";
import PartnerDetailLeft from "./PartnerDetailLeft";
import PartnerDetailHeader from "./PartnerDetailHeader";

class PartnerDetail extends Component {
  componentDidMount() {
    this.props.getPartnerDetailsById(this.props.match.params.partnerId);
  }
  render() {
    const { partner, fetchingPartnerDetailsById } = this.props;
    return (
      <>
        <>
          <PartnerDetailHeader />
          {fetchingPartnerDetailsById ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : (
            <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
              <Suspense fallback={"Loading..."}>
              <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-full ">
                  <div style={{ width: "25%" }}>
                    <PartnerDetailLeft partner={partner} />
                  </div>
                  <div style={{ width: "75%" }}>
                    <PartnerDetailRight partner={partner} />
                  </div>
                </div>
              </Suspense>
            </div>
          )}
        </>
      </>
    );
  }
}
const mapStateToProps = ({ partner }) => ({
  fetchingPartnerDetailsById: partner.fetchingPartnerDetailsById,
  partner: partner.partner,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPartnerDetailsById,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PartnerDetail)

