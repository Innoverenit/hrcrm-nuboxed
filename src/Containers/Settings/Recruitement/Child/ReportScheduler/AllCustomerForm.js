import React,{ } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import {addScheduler,
} from "../../../SettingsAction";
import dayjs from "dayjs";


function AllCustomerForm(props) {
    // useEffect(() => {
    //   props.getScheduler(props.departmentId)
    // },[props.departmentId])
    // console.log(props.departmentId)
  return (
    <>
      <Formik
       enableReinitialize
        initialValues={{
          type: props.scheduler.type,
          frequency: props.scheduler.frequency,
          department: props.departmentId
        }}
        onSubmit={(values) => {
          props.addScheduler(
            {
                ...values,
            },
            props.departmentId
        )
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
         <div class="mr-5 ml-5">  
              <div class=" flex justify-evenly h-full w-full items-end"             
              >               
                <div class=" w-[20%]"  >           
                  <Field
                    name="type"                   
                    label="Report Scheduler"
                    type="text"
                    isColumn
                    width={"100%"}
                    component={SelectComponent}
                    options={[ 
                      "Task",
                      "Calls",
                      "Events",
                      "Leads",
                      "Prospect",
                      "Contact",
                      "Quotation",
                      "Orders",
                      "Customer",
                      "Materials In Stock",
                      "Goods In Stock",
                      "Production",
                      "Productivity",
                      "Receivables",
                      "Invoice",
                      "Credit Memo",
                      "Investors",
                      "Deals",
                      "Requirment",
                      ] }  
                    inlineLabel
                  />
                </div>
                <div class=" w-[20%]"  >   
                  <Field
                    name="frequency"
                    label="Frequency & Range"
                    type="text"
                    isColumn
                    width={"100%"}
                    options={["Daily", "Weekly","Monthly", ]}                    
                    component={SelectComponent}
                    inlineLabel
                  />
                  
                </div>  
              
                <div class=" w-[8%]"  >   
                  <Button
                    type="primary"
                    htmlType="submit"
                   // loading={props.addingInventoryConsumption}
                  >Add</Button>
                </div>
               
              </div>
              <div>Updated on {dayjs(props.scheduler && props.scheduler.length && props.scheduler[0].updationDate).format("ll")} by {props.scheduler && props.scheduler.length && props.scheduler[0].name}</div>             
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth,settings}) => ({
  // departmentId:settings.departmentList.departmentId,
  scheduler: settings.scheduler,
  addingScheduler: settings.addingScheduler,
  addingSchedulerError: settings.addingSchedulerError,  
  fetchingScheduler: settings.fetchingScheduler,
  fetchingSchedulerError: settings.fetchingSchedulerError,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addScheduler,
     

     
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCustomerForm);
