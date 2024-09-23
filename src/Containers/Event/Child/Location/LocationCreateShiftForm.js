import React, {  useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, } from "antd";
import { Formik, Form, Field,  } from "formik";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import dayjs from "dayjs";
import { createShitLocation } from "./LocationAction";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
/**
 * yup validation scheme for creating a opportunity
 */


function LocationCreateShiftForm(props) {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
       
          "110",  // name9
          "176",   //    Start Date
          "126",  //    End Date
         "104" // create
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  useEffect(() => {
   // props.getCountry()
    // props.getAllUserData()
  }, []);


  const {
    user: {timeZone},
    startDate,
    endDate,
    storedLoc
  } = props;
  //console.log(customerId);
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{  
            shiftName:"",
            startDate: startDate || dayjs(),
            endDate: endDate || null,
            timeZone: timeZone,
            locationDetailsId:storedLoc.locationDetailsId,
        }}
       
        onSubmit={(values, { resetForm }) => {
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
            
          props.createShitLocation(
            {
              ...values,
              startDate: `${newStartDate}T${newStartTime}`,
              endDate: `${newEndDate}T${newEndTime}`,
             
            },
          
            resetForm()
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
            <div class="overflow-y-auto h-[30rem] overflow-x-hidden">
                <Form class="form-background">
               
                    <div class=" flex flex-row justify-between">
                    <div class="w-[60%]">
                      <div className=" text-xs font-poppins font-bold">{translatedMenuItems[0]}</div>
                    <Field
                      name="shiftName"
                      // label="Name"
                      type="text"
                       width={"80%"}
                      component={InputComponent}
                      isColumn
                      inlineLabel
                      isRequired
                    />
                  </div>
                      <div class=" w-[25%]">
                      <div className=" text-xs font-poppins font-bold">{translatedMenuItems[1]}</div>
                        <Field
                          isRequired
                          name="startDate"
                          //label="Start "
                          // label={
                          //   <FormattedMessage
                          //     id="app.startDate"
                          //     defaultMessage="Start Date"
                          //   />
                          // }
                          isColumn
                          component={DatePicker}
                          value={values.startDate}
                          inlineLabel
                          // style={{
                          //   width: "100%",
                          // }}
                        />
                      </div>
                      <div class=" w-[26%]">
                      <div className=" text-xs font-poppins font-bold">{translatedMenuItems[2]}</div>
                      <Field
                        isRequired
                        name="endDate"
                        // label={
                        //   <FormattedMessage
                        //     id="app.enddate"
                        //     defaultMessage="End Date"
                        //   />
                        // }
                        component={DatePicker}
                        isColumn
                        value={values.endDate || values.startDate}
                        inlineLabel
                        // style={{
                        //   width: "100%",
                        // }}
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
                    </div>

                    <div class="flex justify-end mt-3">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={props.creatingShiftLocation}
                >
               {translatedMenuItems[3]}  {/* Create */}
                </Button>
                </div>
                </Form>
           </div>
       
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ location,auth }) => ({
    creatingShiftLocation: location.creatingShiftLocation,
    user: auth.userDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        createShitLocation
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LocationCreateShiftForm);
