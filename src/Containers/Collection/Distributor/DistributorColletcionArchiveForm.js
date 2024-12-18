import React, { useEffect, useState }  from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, } from "formik";
import dayjs from "dayjs";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import { DistributorCollectionArchiveToday } from "../CollectionAction";


function EventForm(props) {


  const {
    user: { userId, timeZone },
    DistributorCollectionArchiveToday,
    startDate,
    endDate,

  } = props;
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={
          {

            startDate: startDate || dayjs(),
            endDate: endDate || null,
            type: "distributor",
          }
        }
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          let timeZoneFirst = "GMT+05:30";
          console.log(timeZone);

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
          var minutes =
            +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1]; // converting hours into minutes
          console.log(minutes);

          var firstStartTimeminutes = minutes - timeZoneminutes; // start time + time zone
          console.log(firstStartTimeminutes);

          let h = Math.floor(firstStartTimeminutes / 60); // converting to hours
          let m = firstStartTimeminutes % 60;
          h = h < 10 ? "0" + h : h;
          m = m < 10 ? "0" + m : m;
          let finalStartTime = `${h}:${m}`;

          let newStartTime = `${finalStartTime}${timeEndPart}`;

          let newEndDate = dayjs(values.endDate).format("YYYY-MM-DD");
          let firstEndTime = dayjs(values.endTime).format("HH:mm:ss.SSS[Z]"); // getting start time from form input
          let firstEndHours = firstEndTime.substring(0, 5); // getting only hours and minutes
          var firstEndTimeSplit = firstEndHours.split(":"); // removing the colon
          var endMinutes = +firstEndTimeSplit[0] * 60 + +firstEndTimeSplit[1]; // converting hours into minutes
          console.log(endMinutes);
          var firstEndTimeminutes = Math.abs(endMinutes - timeZoneminutes); // start time + time zone
          console.log(firstEndTimeminutes);
          let hr = Math.floor(firstEndTimeminutes / 60); // converting to hours
          let mi = firstEndTimeminutes % 60;
          hr = hr < 10 ? "0" + hr : hr;
          mi = mi < 10 ? "0" + mi : mi;
          let finalEndTime = `${hr}:${mi}`;

          let newEndTime = `${finalEndTime}${timeEndPart}`;

          DistributorCollectionArchiveToday(
            {
              ...values,

              startDate: `${newStartDate}T20:00:00Z`,
              endDate: `${newEndDate}T20:00:00Z`,
            },

          );
          resetForm();
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
            <div class="flex justify-evenly h-full w-[40%] items-end">


              <div class="w-[29%]">
                <Field
                  isRequired
                  name="startDate"
                  //label="Start "
                  label= {props.translatedMenuItems[9]}                  
                  isColumn
                  component={DatePicker}
                  value={values.startDate}
                  inlineLabel

                />
              </div>


              <div class="w-[29%]">
                <Field
                  isRequired
                  name="endDate"
                  // label="End "
                  label={props.translatedMenuItems[10]} 
                 
                  component={DatePicker}
                  isColumn
                  value={values.endDate || values.startDate}
                  defaultValue={dayjs("2015-01-01")}
                  inlineLabel

                  disabledDate={(currentDate) => {
                    if (values.startDate) {
                      if (
                        dayjs(currentDate).isBefore(
                          dayjs(values.startDate)
                        )
                      ) {
                        return true;
                      } else {
                        return false;
                      }
                    }
                  }}
                />
              </div>
              <Button
                type="primary"
                htmlType="submit"
                loading={props.DistributorCollectionArchive}
              >

                        <div class="text-xs font-bold font-poppins"> {props.translatedMenuItems[11]}</div>    

              </Button>
            </div>

            <div class=" flex mt-3 justify-end">

            </div>
          </Form>

        )}
      </Formik>
    </>
  );
}
const mapStateToProps = ({ auth, collection }) => ({
  DistributorCollectionArchive: collection.DistributorCollectionArchive,
  user: auth.userDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      DistributorCollectionArchiveToday,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
