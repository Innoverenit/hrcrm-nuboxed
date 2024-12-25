import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import * as Yup from "yup";
import {getTeamMemberlist,addTeams} from "../Teams/TeamsAction"
import Upload from "../../../Components/Forms/Formik/Upload";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
/**
 * yup validation scheme for creating a Team
 */

const TeamsSchema = Yup.object().shape({
  name: Yup.string().required("Please provide Team name"),

});

function TeamsForm(props) {
  useEffect(() => {
props.getTeamMemberlist();
  }, []);

  function handleReset(resetForm) {
    resetForm();
  }
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
          const itemsToTranslate = [
          "110",  // 'Name',//0
           "1139", // 'Team Lead',//1
           "104" // 'Create',//2
           ];
        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  const employeesData = props.teamEmployeeList.map((item) => {
    return {
      label: `${item.empName}`,
      value: item.employeeId,
    };
  });

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          teamMember:[],
          teamName: "",
      
        }}
        // validationSchema={TeamsSchema}
        onSubmit={(values, { resetForm }) => {
          props.addTeams(values, () => handleReset(resetForm));
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
          <Form class="form-background h-[86vh]">
            <div class="flex justify-between" >
              <div class="h-full w-w47.5.5" >
                
               <div class="mt-4">
                  <FastField name="imageId" component={Upload} />
                  </div>
                        
                 <div class="flex justify-between mt-4">
                  <div class="w-full">
                  <div class=" text-xs font-bold font-poppins">{translatedMenuItems[0]}</div>
                  <Field
                  name="teamName"
                  // label="Name"
                  // label={props.translatedMenuItems[0]}
                  type="text"
                  width={"100%"}
                  component={InputComponent}
                  isColumn
                  inlineLabel
                  isRequired
                  
                />      
                <div class=" text-xs font-bold font-poppins">{translatedMenuItems[1]}</div>    
                 <Field
                    name="teamMember"
                    // label="Include"
                 
                    // label={props.translatedMenuItems[1]}
                    mode
                    placeholder="Select"
                    component={SelectComponent}
                    options={Array.isArray(employeesData) ? employeesData : []}
                    value={values.teamMember}
                    // defaultValue={{
                    //   label: `${fullName || ""} `,
                    //   value: employeeId,
                    // }}
                  />
                  </div>
                </div>          
              </div>
              <div class="h-full w-w47.5.5" >
               
              </div>
            </div>
          
            <div class="flex justify-end mt-4" >
              <Button
                type="primary"
                htmlType="submit"
                loading={props.addingTeam}
              >
                 {props.translatedMenuItems[2]} 
                 {/* Create */}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ teams, auth, area }) => ({
  teamEmployeeList:teams.teamEmployeeList,
  addingTeam:teams.addingTeam,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTeamMemberlist,
      addTeams
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TeamsForm);
