import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import {addProjectsData} from "../ProjectsAction"

import {getCustomerTask} from "../../Task/TaskAction"

import { Formik, Form, Field, } from "formik";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";

const expRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const courseSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
});
function ProjectsForm(props) {
  useEffect(() => {
    props.getCustomerTask(props.orgId);
  }, []);
  function handleReset(resetForm) {
    resetForm();
  }
  
  const customerData = props.customerTaskList
  .sort((a, b) => {
    const customerNameA = a.name && a.name.toLowerCase();
    const customerNameB = b.name && b.name.toLowerCase();
    if (customerNameA < customerNameB) {
      return -1;
    }
    if (customerNameA > customerNameB) {
      return 1;
    }

    // names must be equal
    return 0;
  })
  .map((item) => {
    return {
      label: `${item.name}`,
      // label: `${item.salutation || ""} ${item.firstName ||
      //   ""} ${item.middleName || ""} ${item.lastName || ""}`,
      value: item.customerId,
    };
  });
  const { addingProjectsData, addProjectsData } = props;
  return (
    <>
      <Formik
         enableReinitialize
        initialValues={{
          projectName: "",
          customerName:"",
          customerId: "",
          description: "",
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          addProjectsData(
            {
              ...values,
            },
           
            () => handleReset(resetForm)
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
          <Form className="form-background">
            <div class=" flex justify-between overflow-scroll ">
              <div class=" h-full w-1/2">
                <Field
                  isRequired
                  name="projectName"
                  type="text"
                  //label="Name"
                  label={
                    <FormattedMessage id="app.name" defaultMessage="Name" />
                  }
                  isColumn
                  width={"100%"}
                  component={InputComponent}
                  inlineLabel
                />
             
                <div class=" flex justify-between">
                  <div class=" w-full">
                  <Field
                          // isRequired
                          name="customerId"
                          label="Customer"
                          isColumn
                          component={SelectComponent}
                          value={values.customerId}
                          options={
                            Array.isArray(customerData) ? customerData : []
                          }
                          // use12Hours

                          inlineLabel
                          style={{
                            width: "100%",
                          }}
                        />
                  </div>
                </div>
              </div>
              <div class=" h-3/4 w-5/12 ">
                <Field
                  name="description"
                  label="Description"
                  isColumn
                  width={"100%"}
                  component={TextareaComponent}
                  inlineLabel
                />
              </div>
            </div>

            <div class=" mt-3" />
            <div class=" flex justify-end"> 
              <Button type="primary" htmlType="submit" loading={addingProjectsData}>
                <FormattedMessage id="app.create" defaultMessage="Create" />
                {/*                     
                    Create */}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ projects,task,auth }) => ({
    addingProjectsData: projects.addingProjectsData,
    customerTaskList: task.customerTaskList,
    orgId: auth.userDetails.organizationId,
    addingProjectsDataError: projects.addingProjectsDataError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addProjectsData,
        getCustomerTask,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsForm);
