import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";

import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { MainWrapper } from "../../../../Components/UI/Elements";
import { Formik, Form, Field } from "formik";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import { getLibrarys } from "../../../Settings/Library/LibraryAction";
import {
  addInitiativeByLeadsId,
  getInitiativeByLeadsId,
} from "../../LeadsAction";
import LeadsInitiativeData from "./LeadsInitiativeData";

const expRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const experienceSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
});
function LeadsInitiativeForm(props) {
  useEffect(() => {
    props.getLibrarys(props.organizationId);
  }, [props.leadsId]);

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
    props.getInitiativeByLeadsId(props.leadsId);
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          leadsId: props.leadsId,
          initiativeDetailsId: "",
          initiativeName: "",
          skillList: [],
        }}
        onSubmit={(values, { resetForm }) => {
          props.addInitiativeByLeadsId(
            {
              ...values,
              leadsId: props.leadsId,
            },
            // handleCallBack(),
            props.leadsId,
            // resetForm()
          );
        }}
      >
        {({ setFieldValue, setFieldTouched, values, ...rest }) => (
          <Form className="form-background">
            <div class=" flex flex-col">
              <MainWrapper style={{ padding: "4%" }}>
              <div  class=" flex justify-between">
              <div class=" h-full w-1/2">
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
                  <div class=" h-full w-1/2">
                  <Field
                     name="notes"
                    label={
                      <FormattedMessage id="app.description" defaultMessage="Description" />
                    }
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                  />
                  </div>
                  </div>
                <div class=" mt-3" />
                <div class=" flex justify-end" >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={props.addingInitiativeByLeadsId}
                >
                  <FormattedMessage id="app.submit" defaultMessage="Submit" />
                </Button>
              </div>
              </MainWrapper>
            </div>
          </Form>
        )}
      </Formik>
      <MainWrapper style={{ padding: "3% 0" }}>
        <div class=" flex flex-wrap">
          <LeadsInitiativeData initiativesByLeadsId={props.initiativesByLeadsId} />
        </div>
      </MainWrapper>
    </>
  );
}

const mapStateToProps = ({ leads, auth, suppliers, librarys }) => ({
  leadsId: leads.lead.leadsId,
  librarys: librarys.librarys,
  addingInitiativeByLeadsId: leads.addingInitiativeByLeadsId,
  addingInitiativeByLeadsIdError: leads.addingInitiativeByLeadsIdError,
  fetchingInitiativeByLeadsId: leads.fetchingInitiativeByLeadsId,
  fetchingInitiativeByLeadsIdError:
  leads.fetchingInitiativeByLeadsIdError,
  initiativesByLeadsId: leads.initiativesByLeadsId,
  organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addInitiativeByLeadsId,
      getInitiativeByLeadsId,
      getLibrarys,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsInitiativeForm);
