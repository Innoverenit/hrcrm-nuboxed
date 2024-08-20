import HelpIcon from '@mui/icons-material/Help';
import React, { lazy } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleFAQModal } from "../../Auth/AuthAction"
import { Tooltip } from 'antd';
const FaqOrganizationModal = lazy(() =>
  import("./FaqOrganizationModal")
);



function FAQPage(props) {
  return (
    <>
      <div>
        <Tooltip title="FAQ/HELP">
          <HelpIcon
            className="!text-icon cursor-pointer text-[#1890FF] mr-[0.25rem]"
            onClick={() => {

              props.handleFAQModal(true);
            }}
          />
        </Tooltip>
      </div>

      <FaqOrganizationModal
        faqModal={props.faqModal}
        handleFAQModal={props.handleFAQModal}
      />
    </>
  )
}
const mapStateToProps = ({ auth, customer, employee }) => ({
  faqModal: auth.faqModal
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleFAQModal

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FAQPage);

