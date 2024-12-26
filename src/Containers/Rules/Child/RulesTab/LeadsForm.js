import React, { useState, useEffect,  } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { Button,  } from "antd";
import { Formik, Form, Field,  } from "formik";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { addLeaves, getLeavesDetails } from "../../../Settings/SettingsAction";
import dayjs from "dayjs";


function LeadsForm(props) {
  const [visible, setVisible] = useState(false);

  const handleChange = (checked) => {
    debugger;
    setVisible(checked);
  };
  useEffect(() => {
    props.getLeavesDetails(props.country_id);
    // props.getOnlySalesUser();
  }, [props.country_id]);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          // employeeId: props.userId,
country:props.countryId,
          maximumLeaves: props.leaveData.maximumLeaves || "",
          carryForward: props.leaveData.carryForward || "",
          mileageRate:props.leaveData.mileageRate || "",
          maxOpsnlHoliday:props.leaveData.maxOpsnlHoliday ||"",
          leavesCappedTimesAnnualy: props.leaveData.leavesCappedTimesAnnualy || "",
          // organizationId: props.organizationId,
        }}
        // onSubmit={(values) => {
        //   props.addLeaves(values),props.countryId;
        // }}
        onSubmit={(values) => {
          props.addLeaves({ ...values  },props.country_id);
      }}
      
      >
        {({ values }) => (
          <Form className="form-background">
            <div class="flex justify-between  pr-2 max-sm:flex-col">
            <div class=" h-full w-w47.5.5 max-sm:w-wk"   >
            <div class=" mt-2">
                <Field
                  isRequired
                  name="maximumLeaves"
                  label="Max leaves (in days)"
                  width={"50%"}
                  component={InputComponent}
                  inlineLabel
               
                />
                </div>
            <div class=" mt-4">
                <Field
                  isRequired
                  name="carryForward"
                  label="Carry Forward(%)"
                  inlineLabel
                  width={"50%"}
                  component={InputComponent}
                
                
                />
                </div>
                <div class=" mt-4">
                <Field
                  isRequired
                  name="leavesCappedTimesAnnualy"
                  label="Max Carry Forward(%)"
                  inlineLabel
                  width={"50%"}
                  component={InputComponent}
              
                />
                   </div>                                                 
              </div>
              <div class=" h-full w-w47.5.5 max-sm:w-wk"   >
              <div class=" mt-2">
                <Field
                  isRequired
                  name="mileageRate"
                  label="Max leaves (in days)"
                  width={"50%"}
                  component={InputComponent}
                  inlineLabel
             
                />

</div>
              </div>
            </div>
            <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={props.addingLeaves}
                  >
                    Submit
                  </Button>
                </div>
                
                <div>Updated on {dayjs(props.leaveData.updationDate).format("ll")} by {props.leaveData.updatedBy}</div> 
           
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth, settings, team }) => ({
  userId: auth.userDetails.userId,
  addingLeaves: settings.addingLeaves,
  leaveData: settings.leaveData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addLeaves,
      getLeavesDetails,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsForm);
