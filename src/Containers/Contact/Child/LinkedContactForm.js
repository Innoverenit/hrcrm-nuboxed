import React, { Component, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button } from "antd";
import { getContactListByCustomerId, } from "../../../Containers/Customer/CustomerAction";
import { Formik, Form, Field,} from "formik";
import {linkOpportunityContact} from "../../Contact/ContactAction"
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";

class LinkedContactForm extends Component {
  handleReset = (resetForm) => {
    resetForm();
  };

  componentDidMount() {
     this.props.getContactListByCustomerId(this.props.opportunity.customerId);
    //  this.props.getAllSalesList();
}

  render() {
    
    const customerNameOption = this.props.contactByCustomerId.map((item) => {
      return {
          label: `${item.firstName || ""} ${item.middleName ||
            ""} ${item.lastName || ""}`,
          value: item.contactId,
      };
  });
 

    const {
    
    } = this.props;
 
    return (
      <>
        <Formik
            initialValues={{
              contactId: [],
              opportunityId:this.props.opportunityId
            }}
            onSubmit={(values, { resetForm }) => {
                console.log(values);
                console.log(values);
    
                this.props.linkOpportunityContact(
                  {
                    ...values,
                   
                  },
                  this.props.opportunityId,
                  // this.props.customerId,
                  resetForm()
                );
              }}
            
          >
            {({
              errors,
              touched,
              isSubmitting,
              setFieldValue,
              setFieldTouched,
              values,
              ...rest
            }) => (
              <Form className="form-background">
      <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                  <div style={{ width: "80%" }}>
                    <Field
                       name="contactId"
                    //    selectType="contactOpportunityList"
                      placeholder="Select"
                      noLabel
                      
                      component={SelectComponent}
                      options={Array.isArray(customerNameOption) ? customerNameOption : []}
                    
                    //   mode
                      style={{
                        borderRadius: 5,

                      }}
                    />
                  </div>

                  <Button type="primary" htmlType="submit" 
                  loading={this.props.linkingOpportunityContact}>
                  
                    <FormattedMessage
                      id="app.add"
                      defaultMessage="Add"
                    />
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        
      </>
    );
  }
}

const mapStateToProps = ({ auth, opportunity, contact, customer }) => ({
//   user: auth.userDetails,
linkContactModal: contact.linkContactModal,
linkingOpportunityContact:contact.linkingOpportunityContact,
// customerId: customer.customer.customerId,
  contactByCustomerId: customer.contactByCustomerId,
  opportunityId: opportunity.opportunity.opportunityId,
  opportunity: opportunity.opportunity,
//   userId: auth.userDetails.userId,
//   organizationId: auth.userDetails.organizationId,
//   contactId: contact.contactByUserId.contactId,
//   customerId: customer.customer.customerId,
//   addingOpportunity: opportunity.addingOpportunity,
//   addingOpportunityError: opportunity.addingOpportunityError,
//   recruiterName:opportunity.recruiterName,
//   // salesUserIds:auth.userDetails.userId,
//   sales:opportunity.sales,
//   currencies:auth.currencies
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getContactListByCustomerId,
        linkOpportunityContact
       
    //   addOpportunity,
    //    getRecruiterName,
    //    getAllSalesList,
       
      
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedContactForm);