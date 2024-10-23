import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { FormattedMessage } from "react-intl";
// import { addRemark } from "../../../../../OpportunityAction";
import * as Yup from "yup";
/**
 * yup validation scheme for creating a opportunity
 */
const ProfileSchema = Yup.object().shape({
  note: Yup.string().required("Input needed!"),

  stageId: Yup.string().required("Input needed!"),
});
function RemarkForm(props) {
  console.log("stageList", props.stageList);
  const stageList = props.stageList
    .filter((item) => {
      if (item.probability !== 0 && item.probability !== 100) {
        return item;
      }
    })
    .map((item) => {
      return {
        label: item.stageName || "",
        value: item.stageId,
      };
    });
  return (
    <>
      <Formik
        initialValues={{
          stageId: undefined,
          reviewer: "",
          note: "",
          profileId: props.profileId,
        }}
        validationSchema={ProfileSchema}
        onSubmit={(values, { resetForm }) => {
          // props.addRemark(values, props.profileId);
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
                {" "}
                <Field
                  name="stageId"
                  // label="Stage"
                  label={
                    <FormattedMessage
                      name="stageId"
                      id="app."
                      defaultMessage="Stage"
                    />
                  }
                  isRequired
                  isColumn
                  style={{
                    flexBasis: "80%",

                    marginTop: "0.25em",
                  }}
                  component={SelectComponent}
                  options={Array.isArray(stageList) ? stageList : []}
                />{" "}
                <div class=" mt-3" />
                <Field
                  name="reviewer"
                  //label="Reviewer"
                  label={
                    <FormattedMessage
                      id="app.reviewer"
                      defaultMessage="Reviewer"
                    />
                  }
                  width={"100%"}
                  isColumn
                  component={InputComponent}
                  style={{
                    flexBasis: "80%",
                    height: "2em",
                    marginTop: "0.25em",
                  }}
                />
                <div class=" mt-3" />
                <Field
                  name="note"
                  isRequired
                  label="Comments"
                
                  width={"100%"}
                  isColumn
                  component={TextareaComponent}
                  style={{
                    flexBasis: "80%",
                    height: "5em",
                    // marginLeft: "2.5em",
                    marginTop: "0.25em",
                  }}
                />
              </div>
              <div
                style={{
                  height: "100%",
                }}
              ></div>
            </div>
            <div class=" mt-3" />
            <FlexContainer justifyContent="flex-end">
              <Button
                type="primary"
                htmlType="submit"
                Loading={props.addingRemark}
              >
                <FormattedMessage id="app.remark" defaultMessage="Remark" />
                {/* Remark */}
              </Button>
            </FlexContainer>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ opportunity }) => ({
  // addingRemark: opportunity.addingRemark,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      //  addRemark
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RemarkForm);
