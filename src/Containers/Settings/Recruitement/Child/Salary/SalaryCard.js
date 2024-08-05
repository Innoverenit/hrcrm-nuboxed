import React, { useEffect, lazy, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, Field } from "formik";
import {
  Select,
} from "../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import { Button, } from "antd";
import {
  addSalary,
  getSalary,
} from "../../../../Settings/SettingsAction";
import moment from "moment";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";

const { Option } = Select;
function SalaryCard(props) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    props.getSalary(props.roleTypeId);
  }, []);

  const calculateTotal = (values) => {
    const { basic, transportation, housing, others } = values;
    const totalValue = parseFloat(basic) + parseFloat(transportation) + parseFloat(housing) + parseFloat(others);
    setTotal(totalValue);
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          roleTypeId:props.roleTypeId,
          userId: props.userId,
          orgId: props.organizationId,
          basic: props.salary.basic || "",
          transportation: props.salary.transportation || "",
          housing: props.salary.housing || "",
          others: props.salary.others || "",
   

        }}
        onSubmit={(values) => {
          console.log(values)
          calculateTotal(values); // Calculate total before submitting
          props.addSalary(
            {
              ...values,
              departmentId:props.departmentId,     
            },
            props.orgId
          );
        }}
      
      >
        {({ values,
    
         }) => (
          <div class="mr-5 ml-5  ">
            <div class=" flex flex-row ">
              <Form className="form-background">

                <div class=" flex justify-between w-[58rem]"

                >
                  <div class=" mt-[0.625em] ml-[1em]"
                  >

<div class=" flex justify-between w-[74%] "

>
 <div class=" text-sm  ml-2 w-[25rem]">Basic (in %)</div>

  <div>
    <Field
      style={{ width: "7rem" }}
      name="basic"
      component={InputComponent}
      // options={["1", "2", "3", "4", "5", "Not Applicable"]}
      isColumn
    //  inlineLabel
    />
  </div>
</div>
                    <div class=" flex justify-between w-[74%] "

                    >
                        <div class=" text-sm  ml-2 w-[25rem] ">Transportation (in %)</div>
      
                      <div>
                        <Field
                          name="transportation"
                          style={{ width: "7rem" }}
                          component={InputComponent}
                          // options={["1", "2", "3", "4", "5", "Not Applicable"]}
                          isColumn
                        // inlineLabel
                        />
                      </div>
                    </div>

                    <div class=" flex justify-between w-[74%] "

>
 <div class=" text-sm  ml-2 w-[25rem] ">Housing (in %)</div>

  <div>
    <Field
      style={{ width: "7rem" }}
      name="housing"

      component={InputComponent}
      // options={["1", "2", "3", "4", "5", "Not Applicable"]}
      isColumn
    //  inlineLabel
    />
  </div>
</div>

                    <div class=" flex justify-between w-[74%] "

                    >
                        <div class=" text-sm  ml-2 w-[25rem] ">Others (in %)</div>
      
                      <div>
                        <Field
                          name="others"
                          style={{ width: "7rem" }}
                          component={InputComponent}
                          // options={["1", "2", "3", "4", "5", "Not Applicable"]}
                          isColumn
                        // inlineLabel
                        />
                      </div>
                    </div>
        
                  
                    <div className="flex flex-row justify-between w-[74%] mt-2">
                      <div className="text-sm ml-2 w-[20rem]">Total</div>
                      <div>{total}</div>
                    </div>

                  </div>

                </div>
                <div class="mt-4 font-bold">
                  Updated on{" "}
                  {moment(props.salary.creationDate).format("ll")} by{" "}
                  {props.salary.updatedBy}
                </div>

                <div class=" flex justify-end mt-[1.25em]" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={props.addingSalary}
                  >
                    <FormattedMessage id="app.update" defaultMessage="Update" />
                    {/* Update */}
                  </Button>
                </div>


              </Form>
           
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ settings, auth }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  salary: settings.salary,
  orgId: auth.userDetails.organizationId,
  addingSalary: settings.addingSalary,
  addingSalaryError: settings.addingSalaryError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addSalary,
      getSalary,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SalaryCard);
