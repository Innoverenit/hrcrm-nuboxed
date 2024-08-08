import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { getLibrarys } from "../../../Settings/Library/LibraryAction";
import { Button } from "antd";
import { Select } from "antd";
import {updateLeadsInitiative} from "../../LeadsAction";
import { Formik, Form, Field} from "formik";

import { setEditLeadsInitiative } from "../../LeadsAction";
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

<div class=" text-xs font-bold font-poppins text-black">Skills</div> 
  
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

  <div class="mt-3" />
                </div>
              </div>
              <div class="mt-3" />
              <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={props.updateLeadsInitiatives}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                  {/* Create */}
                </Button>
              </div>
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
