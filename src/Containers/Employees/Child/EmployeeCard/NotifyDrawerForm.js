import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field } from "formik";
import { Button, Switch } from "antd";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import { UpdateAdminUser, getAdminUser } from "../../EmployeeAction";
import dayjs from "dayjs";

function NotifyDrawerForm(props) {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          "10",//0 "Admin"
          "1507",//1  "User"
           "176",//2 "Start Date"
        "126" , //  "End Date"3
        "154" ,//   Submit
       "1611",// Updated on
        "1335"// by
       
                 
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
    props.getAdminUser(props.currentEmployeeId.employeeId);
  }, []);

  const [admini, setAdmini] = useState(props.userAdminnoti.adminInd);

  const {
    user: { timeZone },
    startDate,
    endDate,
  } = props;

  useEffect(() => {
    setAdmini(props.userAdminnoti.adminInd);
  }, [props.userAdminnoti]);

  const handleAdmini = () => {
    setAdmini((prevAdmini) => !prevAdmini);
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          userId: props.userId,
          startDate: props.userAdminnoti.startDate ? dayjs(props.userAdminnoti.startDate) : dayjs(),
          endDate: props.userAdminnoti.endDate ? dayjs(props.userAdminnoti.endDate) : null,
          adminInd: admini ? "true" : "false",
          employeeId: props.currentEmployeeId.employeeId,
          orgId: props.orgId,
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);

          let timeZoneFirst = "GMT+05:30";
          let mytimeZone = timeZoneFirst.substring(4, 10);
          var a = mytimeZone.split(":");
          var timeZoneminutes = +a[0] * 60 + +a[1];

          if (!values.endDate) {
            values.endDate = values.startDate;
          }

          let newStartDate = dayjs(values.startDate).format("YYYY-MM-DD");
          let firstStartTime = dayjs(values.startTime).format(
            "HH:mm:ss.SSS[Z]"
          );

          let firstStartHours = firstStartTime.substring(0, 5);
          let timeEndPart = firstStartTime.substring(5, 13);
          var firstStartTimeSplit = firstStartHours.split(":");
          var minutes = +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1];
          var firstStartTimeminutes = minutes - timeZoneminutes;

          let h = Math.floor(firstStartTimeminutes / 60);
          let m = firstStartTimeminutes % 60;
          h = h < 10 ? "0" + h : h;
          m = m < 10 ? "0" + m : m;
          let finalStartTime = `${h}:${m}`;
          let newStartTime = `${finalStartTime}${timeEndPart}`;

          let newEndDate = dayjs(values.endDate).format("YYYY-MM-DD");
          let firstEndTime = dayjs(values.endTime).format("HH:mm:ss.SSS[Z]");
          let firstEndHours = firstEndTime.substring(0, 5);
          var firstEndTimeSplit = firstEndHours.split(":");
          var endMinutes = +firstEndTimeSplit[0] * 60 + +firstEndTimeSplit[1];
          var firstEndTimeminutes = Math.abs(endMinutes - timeZoneminutes);

          let hr = Math.floor(firstEndTimeminutes / 60);
          let mi = firstEndTimeminutes % 60;
          hr = hr < 10 ? "0" + hr : hr;
          mi = mi < 10 ? "0" + mi : mi;
          let finalEndTime = `${hr}:${mi}`;
          let newEndTime = `${finalEndTime}${timeEndPart}`;

          props.UpdateAdminUser({
            ...values,
            startDate: `${newStartDate}T00:00:00Z`,
            endDate: `${newEndDate}T00:00:00Z`,
            adminInd: admini ? "true" : "false",
          });
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
         <div class="mr-5 ml-5 min-h-[50%]">
            <Form>
              <div>
                <Switch
                  style={{ width: "6.25em" }}
                  checked={props.userAdminnoti.adminInd || admini}
                  onChange={handleAdmini}
                  checkedChildren={translatedMenuItems[0]}
                  unCheckedChildren={translatedMenuItems[1]}
                />
              </div>

              {admini && (
                <div className="flex justify-between mt-4">
                  <div className="h-full w-[35%]">
                    <div className="justify-between">
                      <div className="w-1/2">
                      <div className=" text-xs font-bold font-poppins text-black">{translatedMenuItems[2]}</div>
                        <Field
                          isRequired
                          name="startDate"
                          // label={
                          //   <FormattedMessage
                          //     id="app.startdate"
                          //     defaultMessage="Start Date"
                          //   />
                          // }
                          component={DatePicker}
                          value={values.startDate}
                          isColumn
                          inlineLabel
                        />
                      </div>
                    </div>
                  </div>
                  <div className="h-full w-[35%]">
                    <div className="justify-between">
                      <div className="w-1/2">
                      <div className=" text-xs font-bold font-poppins text-black">{translatedMenuItems[3]}</div>
                    
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
                          value={values.endDate || values.startDate}
                          isColumn
                          inlineLabel
                          disabledDate={(currentDate) => {
                            if (values.startDate) {
                              return dayjs(currentDate).isBefore(
                                dayjs(values.startDate)
                              );
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={props.updateAdminUser}
                >
                {translatedMenuItems[4]}  {/* Submit */}
                </Button>
              </div>
              <h4 className="mt-4">
              {translatedMenuItems[5]}{" "}
                {dayjs(props.userAdminnoti.updatedOn).format("ll")}  {translatedMenuItems[6]} {" "}
                {props.userAdminnoti.updatedBy}
              </h4>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth, employee }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  updateAdminUser: employee.updateAdminUser,
  userAdminnoti: employee.userAdminnoti,
  orgId: auth.userDetails.organizationId,
  // currentEmployeeId: auth.userDetails.currentEmployeeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      UpdateAdminUser,
      getAdminUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotifyDrawerForm);
