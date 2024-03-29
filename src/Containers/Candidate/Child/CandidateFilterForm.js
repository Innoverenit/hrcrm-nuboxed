import React, { useState,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Select } from "antd";
import { StyledLabel } from "../../../Components/UI/Elements";
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
                  <StyledLabel>Parameter
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select"
                    onChange={handleFilterBy}
                  >
                    <Option value="Role">Role</Option>
                    <Option value="Cost">Cost</Option>
                  </Select>
                  </StyledLabel>
                  <div class=" flex justify-between mt-4" >
                    <div style={{ flexBasis: "100%" }}>
                      {selectType === "Role" ? (
                        <FastField
                          name="roleType"
                          selectType="roleType"
                          label={
                            <FormattedMessage
                              id="app.role"
                              defaultMessage="Role"
                            />
                          }
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
                          label={
                            <FormattedMessage
                              id="app.currency"
                              defaultMessage="Currency"
                            />
                          }
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
                  <StyledLabel>
                    Parameter
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Select"
                      onChange={handleFilter}
                    >
                      <Option value="Work Preference">Work Preference</Option>
                      <Option value="Location">Location</Option>
                    </Select>
                  </StyledLabel>

                  <div class=" flex justify-between mt-4" >
                    <div style={{ flexBasis: "100%" }}>
                      {selectFilter === "Work Preference" && (
                        <FastField
                          name="workPreference"
                          label={
                            <FormattedMessage
                              id="app.workpreference"
                              defaultMessage="Work Preference"
                            />
                          }
                          options={["Remote", "Hybrid", "Office"]}
                          isColumn
                          component={SelectComponent}
                          inlineLabel
                        />
                      )}
                      {selectFilter === "Location" && (
                        <FastField
                          name="workLocation"
                          label={
                            <FormattedMessage
                              id="app.location"
                              defaultMessage="Location"
                            />
                          }
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
                <FormattedMessage id="app.create" defaultMessage="Create" />
                {/* Create */}
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
