import React, { useState,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Select } from "antd";

import { Button, Switch } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { getCandidateFilter } from "../CandidateAction";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
const CandidateFilterTable = lazy(() => import("../Child/CandidateTable/CandidateFilterTable"));

const { Option } = Select;

function CandidateFilterForm(props) {
  const [selectType, setSelectType] = useState("");
  const [selectFilter, setSelectFilter] = useState("");
  const [selectParameter, setSelectParameter] = useState(false);

  function handleFilterBy(value) {
    setSelectType(value);
  }
  function handleFilter(value) {
    setSelectFilter(value);
  }

  function handleChange(value) {
    setSelectParameter(value);
  }

  return (
    <>
      <Formik
        initialValues={{
          parameter: "",
          roleType: "",
          billing: "",
          orAnd: selectParameter ? "And" : "or",
        }}
        onSubmit={(values, { resetForm }) => {
          props.getCandidateFilter(
            {
              ...values,
            },
            resetForm()
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
            <div class=" flex justify-between" >
              <div class=" flex justify-evenly" >
                <div class=" w-[36%]"
                >
                  <div class=" text-xs font-bold font-poppins text-black">Parameter
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select"
                    onChange={handleFilterBy}
                  >
                    <Option value="Role">Role</Option>
                    <Option value="Cost">Cost</Option>
                  </Select>
                  </div>
                  <div class=" flex justify-between mt-4" >
                    <div style={{ flexBasis: "100%" }}>
                      {selectType === "Role" ? (
                        <FastField
                          name="roleType"
                          selectType="roleType"
                          label="Role"
                            
                          isColumnWithoutNoCreate
                          isColumn
                          component={SearchSelect}
                          inlineLabel
                        />
                      ) : selectType === "Cost" ? (
                        <Field
                          name="billing"
                          label="Billing"
                          width={"100%"}
                          isColumn
                          component={InputComponent}
                        />
                      ) : null}
                    </div>
                    <div class=" w-[53%]" >
                      {selectType === "Cost" && (
                        <Field
                          name="currency"
                          isColumnWithoutNoCreate
                          placeholder="Currency"
                          label="Currency"
                           
                          style={{
                            width: "70%",
                          }}
                          isColumn
                          selectType="currencyName"
                          isRequired
                          component={SearchSelect}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div class=" flex justify-center w-[22%]"
                >
                  <Switch
                   
                    checked={selectParameter}
                    onChange={handleChange}
                    checkedChildren="And"
                    unCheckedChildren="Or"
                  />
                </div>
                <div class=" w-[36%]"
                >
                  <div class=" text-xs font-bold font-poppins text-black">
                    Parameter
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Select"
                      onChange={handleFilter}
                    >
                      <Option value="Work Preference">Work Preference</Option>
                      <Option value="Location">Location</Option>
                    </Select>
                  </div>

                  <div class=" flex justify-between mt-4" >
                    <div style={{ flexBasis: "100%" }}>
                      {selectFilter === "Work Preference" && (
                        <FastField
                          name="workPreference"
                          label="Work Preference"
                            
                          options={["Remote", "Hybrid", "Office"]}
                          isColumn
                          component={SelectComponent}
                          inlineLabel
                        />
                      )}
                      {selectFilter === "Location" && (
                        <FastField
                          name="workLocation"
                          label="Location"
                            
                          isColumn
                          component={InputComponent}
                          inlineLabel
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>



            <div class=" flex justify-end mt-4" >
              <Button
                type="primary"
                htmlType="submit"
              >
               
                Create
              </Button>
            </div>
          </Form>
          
        )}
      </Formik>
      <CandidateFilterTable/>
    </>
  );
}

const mapStateToProps = ({ auth, opportunity, candidate, customer }) => ({
  fetchingCandidateFilter: candidate.fetchingCandidateFilter,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCandidateFilter,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateFilterForm);
