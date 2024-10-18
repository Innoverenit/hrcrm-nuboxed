import React, { useEffect,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,  } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { FormattedMessage } from "react-intl";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import {
  getProcessForRecruit,
  getProcessStagesForRecruit,
   getAllProcessStagesForRecruit,
} from "../../../../../Settings/SettingsAction";
import {
  addRecruitProProfile,
  getRecruitByOpportunityId,
} from "../../../../OpportunityAction";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { getProfile } from "../../../../OpportunityAction";

/**
 * yup validation scheme for creating a opportunity
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
      label: item.jobOrder || "",
      
      value: item.recruitmentId,
    };
  });

  // const secondOption = useMemo(() => {
  //   debugger;
  //   if (!props.recruitProcess) return [];
  //   return (
  //     props.recruitProcess.length &&
  //     props.recruitProcess.map((process) => {
  //       return {
  //         label: process.recruitmentProcessName || "",
  //         value: process.recruitmentProcessId,
  //       };
  //     })
  //   );
  // }, [props.recruitProcess]);
  function secondOption(exist) {
    const option2 =
      props.profileRecruit.length &&
      props.profileRecruit
        .filter((item) => {
          //debugger;
          if (exist === item.recruitmentId) {
            return item;
          }
        })
        .map((item) => {
          //debugger;
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
            item.recruitmentProcessId === exist &&
            item.probability !== 0 &&
            item.probability !== 100
          ) {
            return item;
          }
        }).sort((a,b)=>{
          return a.probability - b.probability})
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
    //   props.getCurrency();
 props.getAllProcessStagesForRecruit();
    props.getProfile(props.opportunityId);
  }, []);
  function handleCallback() {
    props.getRecruitByOpportunityId(props.opportunityId);
  }
  console.log(props.profileRecruit);
  return (
    <>
      <Formik
        // enableReinitialize
        initialValues={{
          recruitmentId: undefined,
          jobId:"",
          recruitmentProcessId: undefined,
          stageId: undefined,
          opportunityId: props.opportunityId,
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                {/* <Field
                  name="recruitmentId"
                  // label="Requirement"
                  label={<FormattedMessage
                    id="app.recruitmentId"
                    defaultMessage="Requirement"
                  />}
                  width={"100%"}
                  isRequired
                  isColumn
                  style={{
                    flexBasis: "80%",
                    width: "100%",

                    // marginTop: "0.25em",
                  }}
                  // component={InputComponent}
                  component={SelectComponent}
                  options={
                    Array.isArray(recruitmentName) ? recruitmentName : []
                  }
                /> */}

                <div class=" mt-3" />
                <Field
                  name="recruitmentId"
                  // label="Requirement"
                  label={<FormattedMessage
                    id="app.jobid"
                    defaultMessage="Job ID"
                  />}
                  width={"100%"}
                  isRequired
                  isColumn
                  style={{
                    flexBasis: "80%",
                    width: "100%",

                    // marginTop: "0.25em",
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
                  //label="Workflow"
                  label={<FormattedMessage
                    id="app.workflow"
                    defaultMessage="Workflow"
                  />}
                  isRequired
                  isColumn
                  width={"100%"}
                  style={{
                    flexBasis: "80%",
                    width: "100%",

                    // marginTop: "0.25em",
                  }}
                   disabled={!values.recruitmentId}
                  // component={InputComponent}
                  component={SelectComponent}
                  options={
                    Array.isArray(secondOption(values.recruitmentId))
                      ? secondOption(values.recruitmentId)
                      : []
                  }
                  //  options={Array.isArray(secondOption) ? secondOption : []}
                
                />

                <div class=" mt-3" />

                <Field
                  name="stageId"
                  // label="Stage"
                  label={<FormattedMessage
                    id="app.stageId"
                    defaultMessage="Stage"
                  />}
                  // component={InputComponent}
                  component={SelectComponent}
                  isColumn
                  isRequired
                  style={{
                    flexBasis: "80%",
                    // marginTop: "0.25em",
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
              &nbsp;
              <div
                style={{
                  height: "100%",
                  //   width: "45%",
                }}
              ></div>
            </div>
            <div class=" mt-3" />
            <FlexContainer justifyContent="flex-end">
              <Button
                type="primary"
                htmlType="submit"
                Loading={props.addingRecruitmentProfile}
              >
                <FormattedMessage
                  id="app.create"
                  defaultMessage="Create"
                />
                {/* Create */}
              </Button>
            </FlexContainer>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({
  auth,
  opportunity,
  team,
  contact,
  account,
  settings,
  partner,
}) => ({
  recruitProcess: settings.recruitProcess,
  recruitProcessStages: settings.recruitProcessStages,
   allProcessStagesForRecruit: settings.allProcessStagesForRecruit,
  organizationId: auth.userDetails.organizationId,
  opportunityId: opportunity.opportunity.opportunityId,
  // currencies: opportunity.currencies,
  profileRecruit: opportunity.profileRecruit,
  addingRecruitmentProfile: opportunity.addingRecruitmentProfile,
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
      getRecruitByOpportunityId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
