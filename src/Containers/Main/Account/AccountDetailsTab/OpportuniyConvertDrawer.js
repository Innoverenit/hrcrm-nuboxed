import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const OpportuniyConvertDrawerCard = lazy(() =>import("./OpportuniyConvertDrawerCard"));
const OpportuniyConvertDrawer = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "70%";
  return (
    <>
      <StyledDrawer
        title={`Order : ${props.particularRowItem.newOrderNo}`}
        width={drawerWidth}
        visible={props.openConvertModal}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.setopenConvertModal(false)}
        placement="right">
        <Suspense fallback={<BundleLoader />}>
          <OpportuniyConvertDrawerCard
            particularRowItem={props.particularRowItem}
            selectedLanguage={props.selectedLanguage}
            translateText={props.translateText}
            openConvertModal={props.openConvertModal}
            setopenConvertModal={props.setopenConvertModal}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );};
const mapStateToProps = ({ myorder, auth }) => ({
  employee_type: auth.userDetails.employee_type,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportuniyConvertDrawer);
