import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { FlexContainer } from "../../../../../../Components/UI/Elements";
import { Formik, Form, Field } from "formik";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import { addReceivedItem } from "../../../InventoryAction";

import dayjs from "dayjs";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";

function ReceivedForm(props) {
  const { date } = props;
  return (
    <>
      <Formik
        initialValues={{
          date: dayjs(),
          userId: props.userId,
          description: "",
        }}
        // validationSchema={FormSchema}
        onSubmit={(values, { resetForm }) => {
          props.addReceivedItem({
            ...values,
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
          <Form>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  height: "100%",
                  width: "47%",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "36%",
                    margin: "3.5% 0%",
                  }}
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
                <div
                  style={{
                    height: "100%",
                    width: "90%",
                  }}
                >
                  <Field
                    name="description"
                    label="Description"
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      height: "80px",
                      marginTop: "0px",
                    }}
                  />
                </div>
              </div>
            </div>
            <FlexContainer justifyContent="flex-end">
              <Button
                type="primary"
                htmlType="submit"
                loading={props.addingRecievedItem}
                style={{ marginTop: "20px" }}
              >
                Submit
              </Button>
            </FlexContainer>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth, inventory }) => ({
  userId: auth.userDetails.userId,
  addingRecievedItem: inventory.addingRecievedItem,
  setEditingInventory: inventory.setEditingInventory,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addReceivedItem,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedForm);
