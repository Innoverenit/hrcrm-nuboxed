import React, { useState,  useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import {  StyledLabel } from "../../../../../Components/UI/Elements";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { Select } from "antd";
import { getSequence } from "../../../../Settings/SettingsAction";
import {updateSequence} from "../../../../Settings/SettingsAction"

const { Option } = Select;

function SequenceCandidateForm(props) {
  const [selectType, setSelectType] = useState("");
  const [selectType1, setSelectType1] = useState("");
  const [selectType2, setSelectType2] = useState("");
  function handleFilterBy(value) {
    setSelectType(value);
  }
  function handleFilterFalse(value) {
    setSelectType1(value);
  }
  function handleFilterByNo(value) {
    setSelectType2(value);
  }
 function handleReset (resetForm)  {
    resetForm();
  };

  useEffect(() => {
    props.getSequence(props.organizationId);
    // props.getAllSalesList();
  }, []);

  const sequenceOption = props.sequence.map((item) => {
    return {
      label: item.name,
      value: item.sequenceId,
    };
  });


   console.log(props.sequenceId);
  return (
    <>
      <Formik
        initialValues={{
          sequenceId:props.sequenceId,
         trueSequenceRule:"",
         falseSequenceRule:"",
         noInputSequenceRule:"",
         trueSequenceId:"",
         falseSequenceRule:props.falseSequenceRule || "",
         falseSequenceId:props.falseSequenceId || "",
         noInputSequenceRule:props.noInputSequenceRule || "",
         noInputSequenceId:props.noInputSequenceId || "",
          
         
        }}
       
        onSubmit={(values, { resetForm }) => {
          props.updateSequence(
            {
              ...values,
              sequenceId:props.sequenceId,
              trueSequenceRule:selectType,
              falseSequenceRule:selectType1,
              noInputSequenceRule:selectType2
            },
           // props.sequenceId,
           () => this.handleReset(resetForm)
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  height: "100%",
                  width: "98%",
                }}
              >
               <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                  <div style={{ width: "47%" }}>
                    <StyledLabel>True</StyledLabel>
                    <Select
                      style={{ width: "100%" }}
                     // name="trueSequenceRule"
                      placeholder="Select"
                        defaultValue={props.sequenceDetail.trueSequenceRule}
                      onChange={handleFilterBy}
                    >
                      <Option value="Next Step">Next Step</Option>
                      <Option value="Jump to">Jump to</Option>
                      <Option value="Stop">Stop</Option>
                      <Option value="Repeat">Repeat</Option>
                    </Select>
                  </div>
                  <div style={{ width: "47%" }}>
                    {selectType === "Jump to" && (
                      <Field
                        // isRequired
                        name="trueSequenceId"
                        label="Sequence"
                        component={SelectComponent}
                        options={
                          Array.isArray(sequenceOption) ? sequenceOption : []
                        }
                        isColumn
                        inlineLabel
                      />
                    )}
                  </div>
                </FlexContainer>
                <Spacer  />
                <FlexContainer justifyContent="space-between">
                  <div style={{ width: "47%" }}>
                    <StyledLabel>False</StyledLabel>
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Select"
                      name="falseSequenceRule"
                      defaultValue={props.sequenceDetail.falseSequenceRule}
                      onChange={handleFilterFalse}
                    >
                      <Option value=">Next Step">Next Step</Option>
                      <Option value="Jump to">Jump to</Option>
                      <Option value="Stop">Stop</Option>
                      <Option value="Repeat">Repeat</Option>
                    </Select>
                  </div>
                  <div style={{ width: "47%" }}>
                    {selectType1 === "Jump to" && (
                      <Field
                        // isRequired
                        name="falseSequenceId"
                        label="Sequence"
                        component={SelectComponent}
                        options={
                          Array.isArray(sequenceOption) ? sequenceOption : []
                        }
                        isColumn
                        inlineLabel
                      />
                    )}
                  </div>
                </FlexContainer>
                <Spacer />
                <FlexContainer justifyContent="space-between">
                  <div style={{ width: "47%" }}>
                    <StyledLabel>No Response</StyledLabel>
                    <Select
                      style={{ width: "100%" }}
                      name="noInputSequenceRule"
                      placeholder="Select"
                      defaultValue={props.sequenceDetail.noInputSequenceRule}
                      onChange={handleFilterByNo}
                    >
                      <Option value=">Next Step">Next Step</Option>
                      <Option value="Jump to">Jump to</Option>
                      <Option value="Stop">Stop</Option>
                      <Option value="Repeat">Repeat</Option>
                    </Select>
                  </div>
                  <div style={{ width: "47%" }}>
                    {selectType2 === "Jump to" && (
                      <Field
                        // isRequired
                        name="noInputSequenceId"
                        label="Sequence"
                        component={SelectComponent}
                        options={
                          Array.isArray(sequenceOption) ? sequenceOption : []
                        }
                        isColumn
                        inlineLabel
                      />
                    )}
                  </div>
                </FlexContainer>                
              </div>
            </div>
            <Spacer />
            <FlexContainer justifyContent="flex-end">
              <Button
                type="primary"
                htmlType="submit"
                 Loading={props.udatingSequence}
              >
                Create
              </Button>
            </FlexContainer>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth, settings,rule, contact, customer }) => ({
     user: auth.userDetails,
  sequence: settings.sequence,
  organizationId: auth.userDetails.organizationId,
  udatingSequence:settings.udatingSequence,
  udatingSequenceError:settings.udatingSequenceError,
  sequence: settings.sequence,
  //sequenceId: settings.sequence.sequenceId,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSequence,
      updateSequence,     
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SequenceCandidateForm);
