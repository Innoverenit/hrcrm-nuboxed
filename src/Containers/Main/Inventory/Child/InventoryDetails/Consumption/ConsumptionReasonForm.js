import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import {
  addConsumptionReason,
  getConsumptionReasonList,
} from "../../../InventoryAction";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
function ConsumptionReasonForm(props) {

  return (
    <>
      <Formik
        initialValues={{
          date: dayjs(),
          locationDetailsId: props.locationDetailsId,
          suppliesId: props.setEditingInventoryConsumption.suppliesId || "",
          inStock: props.setEditingInventoryConsumption.quantity || "",
          userId: props.userId,
          units: "",
        }}
        // validationSchema={FormSchema}
        onSubmit={(values, { resetForm }) => {
          props.addConsumptionReason({
            ...values,
            date: dayjs(values.date).toISOString(),
          });
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
          <Form class="form-background">
           <div class="mr-5 ml-5">       
              <div class=" flex justify-evenly h-full w-full items-end">           
                <div class=" w-[35%]">
                
                  <Field
                    name="reasonId"
                    selectType="reasonType"
                    label="Reason"
                    component={SearchSelect}
                    isColumn
                   // margintop={"0.25em"}
                    value={values.reasonId}
                    // defaultValue={{ label: firstName, value: documentId }}
                    inlineLabel
                   // style={{ flexBasis: "80%" }}
                  />
                </div>
                <div class=" w-[11%]"
                >
                  <Field
                    disabled="true"
                    name="quantity"
                    label="In Stock"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    value={values.inStock}
                    inlineLabel
                  />
                </div>
                <div class=" w-[11%]"
                >
                  <Field
                    name="units"
                    label="Units"
                    type="number"
                    placeholder={"Value"}
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    isRequired
                  />
                </div>
                <div class=" w-[17%]"
                >
                  <Field
                    name="date"
                    label="Date"
                    component={DatePicker}
                    isColumn
                    width={"100%"}
                    isRequired
                    value={values.date}
                    inlineLabel                
                  />
                </div>
                <div class=" w-[8%]"
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={props.addingConsumptionReason}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ inventory, auth }) => ({
  userId: auth.userDetails.userId,
  addingConsumptionReason: inventory.addingConsumptionReason,
  addingConsumptionReasonError: inventory.addingConsumptionReasonError,
  setEditingInventoryConsumption: inventory.setEditingInventoryConsumption,
  locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
  consumptionReasonList: inventory.consumptionReasonList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { addConsumptionReason, getConsumptionReasonList },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsumptionReasonForm);
