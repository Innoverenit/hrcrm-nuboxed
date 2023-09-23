import React, { useState,Component,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { getLibrarys } from "../../../Settings/Library/LibraryAction";
import { Button } from "antd";
import { Select } from "antd";
import {updateLeadsInitiative} from "../../LeadsAction";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { Spacer,StyledLabel } from "../../../../Components/UI/Elements";
import { setEditLeadsInitiative } from "../../LeadsAction";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
const { Option } = Select;
function UpdateLeadsInititativeForm (props) {
 
  useEffect(() => {
    props.getLibrarys(props.organizationId);
  }, []);
  const skillNameOption = props.setEditingLeadsInitiative.initiativeSkillMapper===null?[]: props.setEditingLeadsInitiative.initiativeSkillMapper.map((item) => {
    return item.definationId
  }
  )
  const [skillNames, setSkills] = useState(skillNameOption);
  useEffect(() => {
    console.log("helo")
    const skillNameOption = props.setEditingLeadsInitiative.initiativeSkillMapper===null?[]:props.setEditingLeadsInitiative.initiativeSkillMapper.map((item) => {
      return item.definationId
    }

    );
    setSkills(skillNameOption)
  }, [props.setEditingLeadsInitiative]);
  function handleChangeSkills(value) {
    setSkills(value)
  }



    return (
      <>
        <Formik
          initialValues={{
            initiativeName:
              props.setEditingLeadsInitiative.initiativeName || "",
              initiativeDetailsId: props.initiativeDetailsId,
              skillList:skillNames
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            props.updateLeadsInitiative(
              {
                ...values,
                skillList:skillNames
  
                
              },
              props.initiativeDetailsId,
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
                    width: "45%",
                  }}
                >
                  <Field
                    name="initiativeName"
                    type="text"
                    //label="Name"

                    label={
                      <FormattedMessage id="app.name" defaultMessage="Name" />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    // accounts={accounts}
                    inlineLabel
                  />

<StyledLabel>Skills</StyledLabel> 
  
  <Select
    name="skillList"
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Select"
    defaultValue={skillNames}
     onChange={handleChangeSkills}
  >

    {props.librarys.map((item, i) => {
      return (
        <Option value={item.definationId}>{item.name}</Option>
      )
    })}
  </Select>


                   {/* <Field
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
                    /> */}
                  <Spacer />
                </div>
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={props.updateLeadsInitiatives}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                  {/* Create */}
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }


const mapStateToProps = ({ auth, opportunity,librarys, contact, leads }) => ({
  updateLeadsInitiatives: leads.updateLeadsInitiatives,
  updateLeadsInitiativesError: leads.updateLeadsInitiativesError,
  user: auth.userDetails,
  librarys: librarys.librarys,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  setEditingLeadsInitiative: leads.setEditingLeadsInitiative,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
   updateLeadsInitiative,
  setEditLeadsInitiative,
  getLibrarys
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateLeadsInititativeForm);
