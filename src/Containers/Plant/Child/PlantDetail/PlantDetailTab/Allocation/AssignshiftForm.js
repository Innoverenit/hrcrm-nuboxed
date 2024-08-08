import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { DatePicker } from "../../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import {
  getShift,
  assignShiftToProductionManager,
} from "../../../../Shift/ShiftAction";

function AssignShiftForm(props) {
  useEffect(() => {
    props.getShift(props.locationDetailsId);
  }, []);
  dayjs.addRealYear = function addRealYear(y) {
    var fm = dayjs(y).add(10, "Y");
    var fmEnd = dayjs(fm).endOf("year");
    return y.date() != fm.date() && fm.isSame(fmEnd.format("YYYY-MM-DD"))
      ? fm.add(10, "y")
      : fm;
  };
  const shiftName = props.shift.map((item) => {
    return {
      label: item.shiftName || "",
      value: item.shiftId,
    };
  });
  // var nextMonth = dayjs.addRealMonth(dayjs());
  return (
    <>
      <Formik
        initialValues={{
          startDate: dayjs(),
          endDate: dayjs.addRealYear(dayjs()),
          shiftId: "",
          userId: props.setEditingPlantAllocation.userId,
        }}
        // validationSchema={FormSchema}
        onSubmit={(values, { resetForm }) => {
          //debugger;
          console.log(values);
          props.assignShiftToProductionManager({
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "100%",
                width: "100%",
                alignItems:"end",
              }}
            >
              <div style={{ width: "25%" }} >
                <Field
                  name="startDate"
                  label="Start Date"
                  component={DatePicker}
                  isColumn
                  width={"100%"}
                  value={values.startDate}
                  inlineLabel
                />
              </div>
              <div style={{ width: "25%"  }} >
                {" "}
                <Field
                  name="endDate"
                  label="End Date"
                  component={DatePicker}
                  isColumn
                  width={"100%"}
                  value={values.endDate}
                  inlineLabel
                />
              </div>
              <div style={{ width: "25%" }} >
                <Field
                  name="shiftId"
                  type="text"
                  placeholder="Shift"
                  label="Shift"
                  isRequired
                  width={"100%"}
                  component={SelectComponent}
                  options={Array.isArray(shiftName) ? shiftName : []}                 
                />
              </div>
              <div style={{ width: "10%" }} >
                <Button
                  type="primary"
                  htmlType="submit"
                  // loading={props.assignShiftToProductionManager}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
const mapStateToProps = ({ plant, shift, auth }) => ({
  locationDetailsId: plant.plantDetailById.locationDetailsId,
  shiftId: shift.shift.shiftId,
  shift: shift.shift,
  shiftName: shift.dropdownShift.shiftName,
  setEditingPlantAllocation: plant.setEditingPlantAllocation,
  assignShiftToProductionManager: shift.assignShiftToProductionManager,
  // userId: auth.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getShift, assignShiftToProductionManager }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AssignShiftForm);
