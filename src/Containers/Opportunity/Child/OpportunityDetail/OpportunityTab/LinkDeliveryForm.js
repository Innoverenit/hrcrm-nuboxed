import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";

import { Formik, Form, Field } from "formik";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { DatePicker } from "../../../../../Components/Forms/Formik/DatePicker";

/**
 * yup validation scheme for creating a product
 */
// const LinkProductSchema = Yup.object().shape({
//   allowedDiscount: Yup.number().min(0)
// });

class LinkDeliveryForm extends Component {
  // handleCallback = () => {
  //   const {
  //     getProductsByOpportunityId,
  //     opportunity: { opportunityId }
  //   } = this.props;
  //   getProductsByOpportunityId(opportunityId);
  //   console.log();
  // };
  render() {
    const {
      opportunity: { opportunityId }
    } = this.props;
    // console.log(deliveryUser);
    const { addDelivery, addingDelivery, deliveryUsers } = this.props;
    console.log(deliveryUsers);
    const deliveryId = deliveryUsers.userId;
    console.log(deliveryId);
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            opportunityId: opportunityId,
            billingRate: "",
            deliveryStartDate: "",
            deliveryEndDate: "",
            designation: ""
            // deliveryId: deliveryId
          }}
          // validationSchema={LinkProductSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);

            // addDelivery(values);
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
                <div style={{ width: 500 }}>
                  <Field
                    name="deliveryId"
                    // label="Delivery UserName "
                    label={<FormattedMessage
                      id="app.deliveryId"
                      defaultMessage="Delivery UserName"
                    />}
                    selectType="deliveryUsers"
                    component={SearchSelect}
                    inlineLabel
                    style={{ flexBasis: "50%" }}
                  />
                  <div class=" mt-3" />
                  <Field
                    name="billingRate"
                    isDisabled
                    //label="Billing Rate"
                    label={<FormattedMessage
                      id="app.billingRate"
                      defaultMessage="Billing Rate"
                    />}
                    value={values.billingRate}
                    inlineLabel
                    component={InputComponent}
                    style={{ flexBasis: "80%", height: "2.375em" }}
                  />
                  <div class=" mt-3" />
                  <Field
                    name="deliveryStartDate"
                    // label="Start Date"
                    label={<FormattedMessage
                      id="app.deliveryStartDate"
                      defaultMessage="Start Date"
                    />}
                    component={DatePicker}
                    value={values.deliveryStartDate}
                    inlineLabel
                    style={{ flexBasis: "80%", height: "2.375em" }}
                  />
                  <div class=" mt-3" />
                  <Field
                    name="deliveryEndDate"
                    // label="End Date"
                    label={<FormattedMessage
                      id="app.deliveryEndDate"
                      defaultMessage="End Date"
                    />}
                    component={DatePicker}
                    value={values.deliveryEndDate}
                    inlineLabel
                    style={{ flexBasis: "80%", height: "2.375em" }}
                  />
                  <div class=" mt-3" />
                  <Field
                    name="designation"
                    isDisabled
                    //label="Designation"
                    label={<FormattedMessage
                      id="app.designation"
                      defaultMessage="Designation"
                    />}
                    value={values.designation}
                    inlineLabel
                    component={InputComponent}
                    style={{ flexBasis: "80%", height: "2.375em" }}
                  />
                  <div class=" mt-3" />
                  <Button
                    type="primary"
                    style={{ marginLeft: "26.5625em" }}
                    htmlType="submit"
                    Loading={addingDelivery}
                  >
                    <FormattedMessage
                      id="app.create"
                      defaultMessage="Create"
                    />
                    {/* Create */}
                  </Button>
                </div>
              </Form>
            )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, product, opportunity, team }) => ({
  user: auth.userDetails,
  opportunity: opportunity.opportunity,
  // addingDelivery: opportunity.addingDelivery,
  // deliveryUsers: team.deliveryUsers
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // addDelivery
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkDeliveryForm);
