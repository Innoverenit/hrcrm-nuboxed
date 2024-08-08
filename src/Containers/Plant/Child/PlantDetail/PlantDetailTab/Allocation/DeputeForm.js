import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { MainWrapper } from "../../../../../Components/UI/Layout";
import { StyledLabel } from "../../../../../Components/UI/Elements";
import dayjs from "dayjs";
import { addExecutive } from "../../../PlantAction";
import { getShiftDropdown } from "../../../../Shift/ShiftAction";

function ShiftForm(props) {
  useEffect(() => {
    props.getShiftDropdown();
  }, []);
  const { addExecutive, startTime, endTime, startDate, endDate } = props;
  const shiftDropdown = props.dropdownShift.map((item) => {
    return {
      label: item.shiftName || "",
      value: item.shiftName,
    };
  });
  return (
    <>
      <Formik
        // enableReinitialize
        initialValues={{
          shiftName: "",
          startTime: startDate || null,
          endTime: endDate || null,
          //   responsible: [],
        }}
        // validationSchema={FormSchema}
        onSubmit={(values) => {
          let timeZoneFirst = "GMT+05:30";

          let mytimeZone = timeZoneFirst.substring(4, 10);
          console.log(mytimeZone);

          var a = mytimeZone.split(":");
          console.log(a);
          var timeZoneminutes = +a[0] * 60 + +a[1];
          console.log(timeZoneminutes);
          if (!values.endDate) {
            values.endDate = values.startDate;
          }
          let newStartDate = dayjs(values.startDate).format("YYYY-MM-DD");
          console.log(newStartDate);
          //Time calculation
          let firstStartTime = dayjs(values.startTime).format(
            "HH:mm:ss.SSS[Z]"
          ); // getting start time from form input
          console.log(firstStartTime);

          let firstStartHours = firstStartTime.substring(0, 5); // getting only hours and minutes
          console.log(firstStartHours);

          let timeEndPart = firstStartTime.substring(5, 13); // getting seconds and rest
          console.log(timeEndPart);

          var firstStartTimeSplit = firstStartHours.split(":"); // removing the colon
          console.log(firstStartTimeSplit);

          var minutes = +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1]; // converting hours into minutes
          console.log(minutes);

          var firstStartTimeminutes = minutes - timeZoneminutes; // start time + time zone
          console.log(firstStartTimeminutes);

          let h = Math.floor(firstStartTimeminutes / 60); // converting to hours
          let m = firstStartTimeminutes % 60;
          h = h < 10 ? "0" + h : h;
          m = m < 10 ? "0" + m : m;
          let finalStartTime = `${h}:${m}`;
          console.log(finalStartTime);

          let newStartTime = `${finalStartTime}${timeEndPart}`;
          console.log(newStartTime);

          let newEndDate = dayjs(values.endDate).format("YYYY-MM-DD");
          let firstEndTime = dayjs(values.endTime).format("HH:mm:ss.SSS[Z]"); // getting start time from form input
          console.log(firstEndTime);
          let firstEndHours = firstEndTime.substring(0, 5); // getting only hours and minutes
          console.log(firstEndHours);

          var firstEndTimeSplit = firstEndHours.split(":"); // removing the colon
          console.log(firstEndTimeSplit);
          var endMinutes = +firstEndTimeSplit[0] * 60 + +firstEndTimeSplit[1]; // converting hours into minutes
          console.log(endMinutes);
          var firstEndTimeminutes = Math.abs(endMinutes - timeZoneminutes); // start time + time zone
          console.log(firstEndTimeminutes);
          let hr = Math.floor(firstEndTimeminutes / 60); // converting to hours
          console.log(hr);
          let mi = firstEndTimeminutes % 60;
          console.log(hr);
          hr = hr < 10 ? "0" + hr : hr;
          mi = mi < 10 ? "0" + mi : mi;
          let finalEndTime = `${hr}:${mi}`;
          console.log(finalEndTime);
          console.log(timeEndPart);
          console.log(`${finalEndTime}${timeEndPart}`);

          let newEndTime = `${finalEndTime}${timeEndPart}`;

          props.addExecutive(
            {
              ...values,
              startTime: `${newStartDate}T${newStartTime}`,
              endTime: `${newEndDate}T${newEndTime}`,
              // startTime: 0,
              // endTime: 0,
            }
            // props.userId
          );
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form>
            <MainWrapper>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: "100%",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "18%",
                    margin: "6% 3%",
                  }}
                >
                  <div style={{ width: "100%" }}>
                    <div class=" text-xs font-bold font-poppins text-black">Shift</div>
                    <Field
                      name="shiftName"
                      placeholder="Shift"
                      noLabel
                      // isRequired
                      component={SelectComponent}
                      options={
                        Array.isArray(shiftDropdown) ? shiftDropdown : []
                      }
                      style={{
                        borderRadius: "2px",
                        width: "100%",
                        // marginTop: "28px",
                      }}
                    />
                  </div>
                </div>

                {/* <div
                  style={{
                    height: "100%",
                    width: "15%",
                    margin: "6% 3%",
                  }}
                >
                  <Field
                    name="startTime"
                    label="Start Time"
                    isRequired
                    component={TimePicker}
                    isColumn
                    use12Hours
                    value={values.startTime}
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      width: "80%",
                      marginTop: "0px",
                    }}
                  />
                </div>
                <div class=" mt-3" />
                <div
                  style={{
                    height: "100%",
                    width: "15%",
                    margin: "6% 3%",
                  }}
                >
                  <Field
                    name="endTime"
                    label="End Time"
                    isRequired
                    component={TimePicker}
                    use12Hours
                    isColumn
                    value={values.endTime}
                    // inlineLabel
                    style={{
                      flexBasis: "80%",
                      marginTop: "0px",
                      width: "80%",
                    }}
                  />
                </div>
                <div class=" mt-3" /> */}

                <div
                  style={{
                    margin: "8% 3%",
                    width: "15%",
                  }}
                >
                  <Button
                    type="primary"
                    //   loading={}
                    htmlType="submit"
                    loading={props.addingExecutive}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </MainWrapper>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth, plant, shift }) => ({
  addingExecutive: plant.addingExecutive,
  userId: auth.userDetails.userId,
  dropdownShift: shift.dropdownShift,
  //   productionExecutive: shift.productionExecutive,
  shift: shift.shift,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addExecutive,
      getShiftDropdown,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShiftForm);
