import React, { } from "react";
import { Formik, Form, Field } from "formik";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import { Button, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addPickupDate } from "../../../InventoryAction";

function PickUpForm(props) {
  console.log(props.orderPhoneId)
  return (
    <>
      <Formik
        initialValues={{
          orderId: props.orderPhoneId,
          dispatchReceivedInd: true,
          dispatchReceivedDate: "",

        }}
        onSubmit={(values) => {

          props.addPickupDate({
            ...values,
            userId: props.userId,
            completeOrderInd: props.completeOrderInd ? false : true,
            contactPersonId: props.contactPersonId
          },
            props.locationDetailsId);
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
          <Form>
            <div class=" w-[50%]" >
              <Field
                name="dispatchReceivedDate"
                label="Date"
                component={DatePicker}
                value={values.dispatchReceivedDate}
                isColumn
                isRequired
                width={"100%"}
                inlineLabel
              />
            </div>
            <Button
              type="primary"
              htmlType="submit"
              loading={props.addingpickupdate}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
const mapStateToProps = ({ inventory, auth }) => ({
  setEditingInventory: inventory.setEditingInventory,
  userId: auth.userDetails.userId,
  addingpickupdate: inventory.addingpickupdate,
  locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addPickupDate }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PickUpForm);
