
import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { Button } from "antd";
import {
    MainWrapper,
} from "../../../Components/UI/Elements";
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
        style={{marginTop:"3rem"}}
        visible={dispatchProcModal}
        destroyOnClose
        closable
        placement="right"
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
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
                    <MainWrapper style={{ minHeight: "50%" }}>
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
                                    // style={{ height: "5em", marginTop: "0.25em" }}
                                    />
                                    </div>
                            </div>
                                </div>
                                {/* <div class=" h-full w-[45%]">
                                    <div class="justify-between">
                                        <div class= "w-[47%]">
                                        <Field
                                                name="no"
                                                label="No#"
                                                type="text"
                                                isColumn
                                                width={"100%"}
                                                component={InputComponent}
                                                inlineLabel

                                            />
                                            
                                        </div>
                                      
                                        <div class= "w-[47%]">
                                            <Field
                                                name="orderno"
                                                label="Order #"
                                                width={"100%"}
                                                isColumn
                                                component={InputComponent}
                                            />
                                        </div>
                                        <div class= "w-[47%]">  
                                    <Field
                                                name="phone"
                                                label="Phone #"
                                                type="text"
                                                isColumn
                                                width={"100%"}
                                                component={InputComponent}
                                                inlineLabel

                                            />
                                            </div>
                                    </div>
                                </div> */}

                                    
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
                    </MainWrapper>
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


