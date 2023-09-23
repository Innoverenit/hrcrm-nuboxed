import React, { Component, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import {linktagCustomer} from "../../../OpportunityAction";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";

import { getCustomerListByUserId } from "../../../../Customer/CustomerAction";
import { FlexContainer } from "../../../../../Components/UI/Layout";



import dayjs from "dayjs";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";

/**
 * yup validation scheme for creating a opportunity
 */


class LinkTagCustomerForm extends Component {
  handleReset = (resetForm) => {
    resetForm();
  };

  componentDidMount() {
    this.props.getCustomerListByUserId(this.props.userId);
   
  }

  render() {

    const customerNameOption = this.props.customerByUserId
    .sort((a, b) => {
      const libraryNameA = a.name && a.name.toLowerCase();
      const libraryNameB = b.name && b.name.toLowerCase();
      if (libraryNameA < libraryNameB) {
        return -1;
      }
      if (libraryNameA > libraryNameB) {
        return 1;
      }
  
      // names must be equal
      return 0;
    }
  )
    .map((item) => {
      return {
        label: `${item.name || ""}`,
        value: item.customerId,
      };
    });

 



    const {
      user: { userId },
      candidateDate,
      onboardDate
     
    } = this.props;
    // console.log("profile",this.props.profileId);
    return (
      <>
        <Formik
              // enableReinitialize
              initialValues={{
                // association: {
                customerId:"",
                // }
              }}
              onSubmit={(values, { resetForm }) => {
                this.props.linktagCustomer(
                  {
                    ...values,
                    customerId:"",
                   
                  },
                  this.props.opportunityId,
                  resetForm()
                );
                console.log(values);
                //resetForm();
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
                    <Field
                    name="customerId"
                 
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.customer"
                        defaultMessage="Customer"
                      />
                    }
                  
                    component={SelectComponent}
                    options={Array.isArray(customerNameOption) ? customerNameOption : []}
                    isColumn
                    margintop={"0"}
                    value={values.customerId}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                    <br />
                    <FlexContainer justifyContent="flex-end">
                      <Button
                        type="primary"
                        htmlType="submit"
                      
                        Loading={this.props.linkingtagCustomerOpportunity}
                      >
                        <FormattedMessage
                          id="app.add"
                          defaultMessage="Add"
                        /> 
                      </Button>
                    </FlexContainer>
                  </Form>
                )}
            </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, opportunity, contact, customer }) => ({
    user: auth.userDetails,
    userId: auth.userDetails.userId,
    customerByUserId:customer.customerByUserId,
  
    linkingtagCustomerOpportunity:opportunity.linkingtagCustomerOpportunity,
    // candidateRequirement:opportunity.candidateRequirement,
    // profileId:opportunity.candidateRequirement.profileId
    
  
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getCustomerListByUserId,
        linktagCustomer
     
        // addCandidateDate

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkTagCustomerForm);
