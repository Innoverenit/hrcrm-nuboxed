import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { Formik, Form, Field, FastField, FieldArray } from "formik";
import * as Yup from "yup";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
// import { getPlant } from "../../../Plant/PlantAction";
import { updateTeamsAllocation } from "./TeamsAction";

function UpdateTeamsAllocationForm(props) {
//   useEffect(() => {
//     props.getPlant(props.userId);
//   }, []);
  dayjs.addRealYear = function addRealYear(y) {
    var fm = dayjs(y).add(10, "Y");
    var fmEnd = dayjs(fm).endOf("year");
    return y.date() != fm.date() && fm.isSame(fmEnd.format("YYYY-MM-DD"))
      ? fm.add(10, "y")
      : fm;
  };
  const locationsName = props.plant.map((item) => {
    return {
      label: item.name || "",
      value: item.locationDetailsId,
    };
  });
  return (
    <>
      <Formik
        initialValues={{
          startDate: dayjs(),
          endDate: dayjs.addRealYear(dayjs()),
          locationDetailsId: props.setEditingTeamsAllocation.locationDetailsId,
          productionManager: props.setEditingTeamsAllocation.userId,
        }}
        // validationSchema={FormSchema}
        onSubmit={(values, { resetForm }) => {
          //debugger;
          console.log(values);
          props.updateTeamsAllocation({
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
                alignItems: "end",
              }}
            >
              <div style={{width: "25%"}}>      
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
              <div style={{width: "25%"}}>                
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
              <div style={{width: "25%"}}>
                <Field
                  name="locationDetailsId"
                  type="text"
                  width={"100%"}
                  placeholder="Location"
                  label="Location"
                  isRequired
                  component={SelectComponent}
                  options={Array.isArray(locationsName) ? locationsName : []}
                />
              </div>
              <div style={{width: "10%"}}>
                <Button type="primary" htmlType="submit">
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
const mapStateToProps = ({ teams, plant, auth }) => ({
  setEditingTeamsAllocation: teams.setEditingTeamsAllocation,
  locationDetailsId: plant.plantDetailById.locationDetailsId,
  plant: plant.plant,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    //  getPlant,
    
    updateTeamsAllocation }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateTeamsAllocationForm);
