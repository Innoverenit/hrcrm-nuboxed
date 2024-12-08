import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, message } from "antd";

import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import { MainWrapper } from "../../../../../../Components/UI/Elements";
import { Formik, Form, Field } from "formik";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import dayjs from "dayjs";
import * as Yup from "yup";
import InitiativeData from "./InitiativeData";
import { getLibrarys } from "../../../../../Settings/Library/LibraryAction";
import {
   addInitiatives,
    getInitiatives,
} from "../../../../CustomerAction";

const expRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const experienceSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
});
function InitiativeForm(props) {
  useEffect(() => {
    props.getLibrarys(props.organizationId);
  }, [props.customerId]);

  const libraryOption = props.librarys
    .sort((a, b) => {
      const libraryNameA = a.name && a.name.toLowerCase();
      const libraryNameB = b.name && b.name.toLowerCase();
      if (libraryNameA < libraryNameB) {
        return -1;
      }
      if (libraryNameA > libraryNameB) {
        return 1;
      }

      // names must be equal
      return 0;
    })
    .map((item) => {
      return {
        label: `${item.name || ""}`,
        value: item.definationId,
      };
    });

  useEffect(() => {
    props.getInitiatives(props.customerId);
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          customerId: props.customerId,
          initiativeDetailsId: "",
          initiativeName: "",
          skillList: [],
        }}
        onSubmit={(values, { resetForm }) => {
          props.addInitiatives
          (
            {
              ...values,
              customerId: props.customerId,
            },
            // handleCallBack(),
            props.customerId,
            // resetForm()
          );
        }}
      >
        {({ setFieldValue, setFieldTouched, values, ...rest }) => (
          <Form className="form-background">
            <div class=" flex flex-col"
            >
              <MainWrapper style={{ padding: "4%" }}>
              <div class=" flex justify-between">
              <div class=" h-full w-2/4"
                >
                    <Field
                      name="initiativeName"
                      label="Name"
                      // type="number"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                    />
                    <Field
                      name="skillList"
                      label="Skills"
                      mode="multiple"
                      // isColumn
                      allowClear
                      placeholder="Select"
                      width={"100%"}
                      component={SelectComponent}
                      options={
                        Array.isArray(libraryOption) ? libraryOption : []
                      }
                    />
                  </div>
                  <div class="h-full w-2/5"
                >
                  <Field
                     name="description"
                    label="Description" 
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                  />
                  </div>
                  </div>
                <div class=" mt-3" />
                <div class=" flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={props.addingInitiatives}
                >
                 Submit
                </Button>
              </div>
              </MainWrapper>
            </div>
          </Form>
        )}
      </Formik>
      <MainWrapper style={{ padding: "3% 0" }}>
        <div class=" flex flex-wrap"
      
        >
          <InitiativeData 
          initiatives={props.initiatives}
          />
        </div>
      </MainWrapper>
    </>
  );
}

const mapStateToProps = ({ customer, auth, suppliers, librarys }) => ({
  user: auth.userDetails,
  customerId: customer.customer.customerId,
  userId: auth.userDetails.userId,
  librarys: librarys.librarys,
  addingInitiatives:customer.addingInitiatives,
  addingInitiativesError:customer.addingInitiativesError,
  
  fetchingInitiatives: customer.fetchingInitiatives,
  fetchingInitiativesError:
    customer.fetchingInitiativesError,
initiatives: customer.initiatives,
  organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addInitiatives,
       getInitiatives,
      getLibrarys,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InitiativeForm);
