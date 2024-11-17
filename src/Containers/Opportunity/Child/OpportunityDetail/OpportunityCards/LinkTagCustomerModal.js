import React, { } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LinkTagCustomerForm from "../OpportunityCards/LinkTagCustomerForm"
import {linktagCustomer} from "../../../OpportunityAction";
import { StyledModal } from "../../../../../Components/UI/Antd";

const LinkTagContactModal = (props) => {
  // useEffect(() => {
  //  props.getCustomerListByUserId(props.userId)
  // }, []);
  const { ...formProps } = props;


  return (
    <>
       <StyledModal
          title={<FormattedMessage
            id="app.tagcustomer"
            defaultMessage="Tag Customer"
          />}
          width="35%"
          visible={props.linkContactModalVisible}
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onCancel={props.handleLinkContactModalVisible}
          footer={null}
        >
       
          <LinkTagCustomerForm
           opportunityId={props.opportunityId}
          />
        </StyledModal>
    </>
  );
};
const mapStateToProps = ({ customer,auth,opportunity}) => ({
    // customerByUserId:customer.customerByUserId,
    userId: auth.userDetails.userId,
    linkingtagCustomerOpportunity:opportunity.linkingtagCustomerOpportunity,
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        //  getCustomerListByUserId,
        linktagCustomer
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(LinkTagContactModal);


