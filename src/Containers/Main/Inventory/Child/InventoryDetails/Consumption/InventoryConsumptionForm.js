import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import { addInventoryConsumption } from "../../../InventoryAction";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { setClearbitPurchaseData } from "../../../../Suppliers/SuppliersAction";
import PurchaseClearbit from "../../../../../../Components/Forms/Autocomplete/PurchaseClearbit";
import dayjs from "dayjs";

function InventoryConsumption(props) {
  return (
    <>
      <Formik
        initialValues={{
          deliveryDate: dayjs(),
          suppliesFullName: "",
          quantity: 0,
          userId: props.userId,
         suppliesId: props.suppliesId,   
        }}
        onSubmit={(values, { resetForm }) => {
          props.addInventoryConsumption(
            {
              ...values,
              locationDetailsId: props.locationDetailsId,
              suppliesId: props.suppliesId,
              deliveryDate: dayjs(values.deliveryDate).toISOString(),
      
            },
            props.locationDetailsId
        
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
          <Form>
      <div class="mr-5 ml-5">
            <div className="flex justify-evenly h-full w-full items-end">
            
                <div class=" w-[20%]"
                >
                  <Field
                    isRequired
                    name="label"
                    type="text"
                    label="Search"
                    width={"100%"}
                    placeholder="Start typing..."
                    isColumnWithoutNoCreate
                    setClearbitPurchaseData={props.setClearbitPurchaseData}
                    component={PurchaseClearbit}
                    inlineLabel
                    // style={{ flexBasis: "80%", width: "50%" }}
                  />
                </div>
                <div class=" w-[20%]"
                >
                  <Field
                    name="suppliesFullName"
                    disabled
                    label="Details"
                    type="text"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                </div>
                <div class=" w-[20%]"
                >
                  <Field
                    isRequired
                    name="quantity"
                    label="Opening Inventory(in units)"
                    type="number"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                </div>
                <div class=" w-[15%]"
                >
                  <Field
                    name="batchNumber"
                    label="Batch No."
                    type="number"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                </div>
                <div class=" w-[13%]"
                >
                  <Field
                    name="deliveryDate"
                    label="Date"
                    component={DatePicker}
                    isColumn
                    width={"100%"}
                    isRequired
                    value={values.deliveryDate}
                    inlineLabel
                  />
                </div>
                <div class=" w-[8%]"
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={props.addingInventoryConsumption}
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

const mapStateToProps = ({ inventory, auth, suppliers }) => ({
  userId: auth.userDetails.userId,
  addingInventoryConsumption: inventory.addingInventoryConsumption,
  locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
  suppliesId: suppliers.clearbitPurchase.suppliesId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addInventoryConsumption,
      setClearbitPurchaseData,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryConsumption);
