import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";


function Rules2Form() {
  const [visible, setVisible] = useState(false);

  const handleChange = (checked) => {
    debugger;
    setVisible(checked);
  };

  return (
    <>
      <Formik
        initialValues={{
          type: undefined,
        }}
        onSubmit={(values) => {}}
      >
        {({ values }) => (
          <Form className="form-background">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  height: "100%",
                  width: "53%",
                }}
              >
                     <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                  <div style={{ width: "50%", marginTop: "0.625em" }}>
                    <div class=" text-xs font-bold font-poppins text-black">Opportunity Closure</div>
                    <Switch
                      style={{ width: "5em", marginLeft: "0.625em" }}
                      onChange={handleChange}
                      checked={visible}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </div>
                  {visible && (
                    <div style={{ width: "50%" }}>
                      <Field
                        name="type"
                        component={SelectComponent}
                        options={["Aging", "Days in Final stage"]}
                        inlineLabel
                        isColumn
                        style={{ flexBasis: "80%", marginTop: "0.25em" }}
                        // defaultValue='low'
                      />
                    </div>
                  )}
                </div>
                <mt-3 />
                {values.type && (
                         <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                    <div style={{ width: "65%" }}>
                      <Field
                        name="unit"
                        label="Time"
                       
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          marginTop: "0.25em",
                          height: "2.0625em",
                        }}
                      />
                    </div>
                    <div style={{ width: "30%", marginTop: "1.375em" }}>
                      <FastField
                        name="unitValue"
                        isRequired
                        label="text"
                         
                        type="text"
                        isColumn
                        options={["Days", "Hours"]}
                        component={SelectComponent}
                        inlineLabel
                        className="field"
                        style={{
                          flexBasis: "80%",
                          margintop: "0.25em",
                        }}
                      />
                    </div>
                    <mt-3 />
                    <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                      <Button type="primary" htmlType="submit">
                        Add Rule
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ settings }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Rules2Form);
