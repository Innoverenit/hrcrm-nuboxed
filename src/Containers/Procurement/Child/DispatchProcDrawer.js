
import React, { Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import {AddBOM} from "../ProcurementAction";

const DispatchProcDrawer = (props) => {
  const {dispatchProcModal,handleProcDispatchModal,  ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title="Dispatch"
        width="60%"
        visible={dispatchProcModal}
        destroyOnClose
        closable
        placement="right"
        onClose={() => handleProcDispatchModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <DispatchProcform/>
          
        </Suspense>
      </StyledDrawer>
     
    </>
 );

function DispatchProcform(){
    return (
        <>
   <Formik
                initialValues={{
                    orderno: "",
                    userId: props.userId,
                    phone: "",
                    model: "",
                    hsn: "",
                    no: "",
                    type: "",

                }}
                
                onSubmit={(values, { resetForm }) => {
                   
                        props.AddBOM(
                            {
                                ...values,
                            },
                    
                        );
                        resetForm()
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
                    <div class="mr-5 ml-5 min-h-[50%] ">
                        <Form>
                            <div class="flex justify-between" >
                                <div class=" h-full w-[45%]">
                                    <div class="justify-between">
                                        <div class= "w-[47%]">

                                            <Field
                                                name="hsn"
                                                label="Order"
                                                width={"100%"}
                                                isColumn
                                                component={InputComponent}
                                            />
                                        </div>
                                        <div class= "w-[47%]">
                                            <Field
                                                name="model"
                                                label="Dispatch"
                                                width={"100%"}
                                                isColumn
                                                component={InputComponent}
                                            />
                                        </div>
                                 <div class= "w-[47%]">
                                            <Field
                                        name="type"
                                        label="BOQ"
                                        isColumn
                                        component={InputComponent}
                                  
                                    />
                                    </div>
                            </div>
                                </div>
                                                                 
                                </div>
                     
                                <div class="flex justify-end">
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={props.addingBOM}
                                        >
                                            Add
                                        </Button>
                                    </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </>
    )
}

 

};



const mapStateToProps = ({ auth, procurement }) => ({
userId:auth.userDetails.userId,
addingBOM:procurement.addingBOM

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        AddBOM
     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DispatchProcDrawer);


