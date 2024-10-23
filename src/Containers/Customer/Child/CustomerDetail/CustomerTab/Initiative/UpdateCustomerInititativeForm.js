import React, { useState, Component, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { getLibrarys } from "../../../../../Settings/Library/LibraryAction";
import { Button } from "antd";
import { Select } from "antd";
import { updateCustomerInitiative } from "../../../../CustomerAction";
import { Formik, Form, Field } from "formik";
import { setEditCustomerInitiative } from "../../../../CustomerAction";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";

const { Option } = Select;
function UpdateCustomerInititativeForm(props) {

  useEffect(() => {
    props.getLibrarys(props.organizationId);
  }, []);
  const skillNameOption = props.setEditingCustomerInitiative.initiativeSkillMapper === null ? [] : props.setEditingCustomerInitiative.initiativeSkillMapper.map((item) => {
    return item.definationId
  }
  )
  const [skillNames, setSkills] = useState(skillNameOption);
  useEffect(() => {
    console.log("helo")
    const skillNameOption = props.setEditingCustomerInitiative.initiativeSkillMapper === null ? [] : props.setEditingCustomerInitiative.initiativeSkillMapper.map((item) => {
      return item.definationId
    }

    );
    setSkills(skillNameOption)
  }, [props.setEditingCustomerInitiative]);
  function handleChangeSkills(value) {
    setSkills(value)
  }



  return (
    <>
      <Formik
        initialValues={{
          initiativeName:
            props.setEditingCustomerInitiative.initiativeName || "",
          initiativeDetailsId: props.initiativeDetailsId,
          skillList: skillNames
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          props.updateCustomerInitiative(
            {
              ...values,
              skillList: skillNames


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
                <mt-3 />
              </div>
              <div
                style={{
                  height: "100%",
                  width: "45%",
                }}
              >
                <Field
                  name="description"
                  label={
                    <FormattedMessage id="app.description" defaultMessage="Description" />
                  }
                  width={"100%"}
                  isColumn
                  component={TextareaComponent}
                />
              </div>
            </div>
            <mt-3 />
            <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
              <Button
                type="primary"
                htmlType="submit"
                Loading={props.updateCustomerInitiatives}
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


const mapStateToProps = ({ auth, opportunity, librarys, contact, customer }) => ({
  updateCustomerInitiatives: customer.updateCustomerInitiatives,
  updateCustomerInitiativesError: customer.updateCustomerInitiativesError,
  user: auth.userDetails,
  librarys: librarys.librarys,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  setEditingCustomerInitiative: customer.setEditingCustomerInitiative,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateCustomerInitiative,
  setEditCustomerInitiative,
  getLibrarys
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCustomerInititativeForm);
