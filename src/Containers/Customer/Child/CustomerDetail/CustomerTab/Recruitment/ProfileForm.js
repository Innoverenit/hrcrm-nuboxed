import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import {
  getProcessForRecruit,
  getProcessStagesForRecruit,
  getAllProcessStagesForRecruit,
} from "../../../../../Settings/SettingsAction";
import {
  addRecruitProProfile,
   getRecruitByCustomerId,
} from "../../../../CustomerAction";
import { getProfile } from "../../../../CustomerAction";

/**
 * yup validation scheme for creating a Customer
 */

const ProfileSchema = Yup.object().shape({
  // requirementName: Yup.string().required("Please provide Requirement"),
  recruitmentId: Yup.string().required("Please provide Requirement"),

  recruitmentProcessId: Yup.string().required("Input needed!"),

  stageId: Yup.string().required("Input needed!"),
});

function ProfileForm(props) {
  const recruitmentName = props.profileRecruit.map((item) => {
    return {
      label: item.requirementName || "",
      value: item.recruitmentId,
    };
  });

  function secondOption(exist) {
    const option2 =
      props.profileRecruit.length &&
      props.profileRecruit
        .filter((item) => {
          debugger;
          if (exist === item.recruitmentId) {
            return item;
          }
        })
        .map((item) => {
          debugger;
          return {
            label: item.processName,
            value: item.recruitmentProcessId,
          };
        });
    console.log(option2);
    return option2;
  }
  function thirdOption(exist) {
    const option3 =
      props.allProcessStagesForRecruit.length &&
      props.allProcessStagesForRecruit
        .filter((item) => {
          debugger;
          if (
            item.processId === exist &&
            item.probability !== 0 &&
            item.probability !== 100
          ) {
            return item;
          }
        })
        .map((item) => {
          debugger;
          return {
            label: item.stageName,
            value: item.stageId,
          };
        });

    return option3;
  }

  useEffect(() => {
    props.getProcessForRecruit(props.organizationId);
    // props.getCurrency();
    props.getAllProcessStagesForRecruit();
    props.getProfile(props.customerId);
  }, []);
  function handleCallback() {
    props.getRecruitByCustomerId(props.customerId);
  }
  console.log(props.profileRecruit);
  return (
    <>
      <Formik
        // enableReinitialize
        initialValues={{
          recruitmentId: undefined,
          recruitmentProcessId: undefined,
          stageId: undefined,
          customerId: props.customerId,
        }}
        validationSchema={ProfileSchema}
        onSubmit={(values, { resetForm }) => {
          console.log({
            ...values,
          });
          props.addRecruitProProfile(values, handleCallback);
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
          <div class=" flex justify-between">
                <div class=" h-full w-full"
                >
                  <Field
                    name="recruitmentId"
                    label="Requirement"
                    width={"100%"}
                    isRequired
                    isColumn
                    style={{
                      flexBasis: "80%",
                      width: "100%",

                      marginTop: "0.25em",
                    }}
                    // component={InputComponent}
                    component={SelectComponent}
                    options={
                      Array.isArray(recruitmentName) ? recruitmentName : []
                    }
                  />

                  <div class=" mt-3" />

                  <Field
                    name="recruitmentProcessId"
                    label="Workflow"
                    isRequired
                    isColumn
                    width={"100%"}
                    style={{
                      flexBasis: "80%",
                      width: "100%",

                      marginTop: "0.25em",
                    }}
                    // component={InputComponent}
                    disabled={!values.recruitmentId}
                    component={SelectComponent}
                    // options={
                    //   Array.isArray(secondOption(values.recruitmentId))
                    //     ? secondOption(values.recruitmentId)
                    //     : []}
                        options={Array.isArray(secondOption) ? secondOption : []
                    }
                  />

                  <div class=" mt-3" />

                  <Field
                    name="stageId"
                    label="Stage"
                    // component={InputComponent}
                    component={SelectComponent}
                    isColumn
                    isRequired
                    style={{
                      flexBasis: "80%",
                      marginTop: "0.25em",
                      width: "100%"
                    }}
                    disabled={!values.recruitmentProcessId}
                    options={
                      Array.isArray(thirdOption(values.recruitmentProcessId))
                        ? thirdOption(values.recruitmentProcessId)
                        : []
                    }
                  />

                  <div class=" mt-3" />
                </div>
              <div class=" h-full"
                ></div>
              </div>
              <div class=" mt-3" />
              <div class=" flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={props.addingRecruitmentProfile}
                >
                  Create
              </Button>
              </div>
            </Form>
          )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({
  auth,
  customer,
  team,
  contact,
  account,
  settings,
  partner,
}) => ({
  recruitProcess: settings.recruitProcess,
  // recruitProcessStages: settings.recruitProcessStages,
  allProcessStagesForRecruit: settings.allProcessStagesForRecruit,
  organizationId: auth.userDetails.organizationId,
  customerId: customer.customer.customerId,
  // currencies: customer.currencies,
  profileRecruit: customer.profileRecruit,
  addingRecruitmentProfile: customer.addingRecruitmentProfile,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProcessForRecruit,
      getProcessStagesForRecruit,
      getAllProcessStagesForRecruit,
      getProfile,
      // getCurrency,
      addRecruitProProfile,
       getRecruitByCustomerId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
