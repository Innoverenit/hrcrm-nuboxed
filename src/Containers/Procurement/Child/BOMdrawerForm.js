import React, { Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { Button} from "antd";
import { Formik, Form, Field } from "formik";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import {AddBOM} from "../ProcurementAction";

const BOMDrawerForm = (props) => {
  const {addBOMdrawer,handleBOMdrawer,  ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title="BOM"
        width="60%"
        visible={addBOMdrawer}
        destroyOnClose
        closable
        placement="right"
        onClose={() => handleBOMdrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <BOMform/>
          
        </Suspense>
      </StyledDrawer>  
    </>
 );

function BOMform(){
    return (
        <>
   <Formik
                initialValues={{
                    order: "",
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
                                                label="HSN"
                                                width={"100%"}
                                                isColumn
                                                component={InputComponent}
                                            />
                                        </div>
                                        <div class= "w-[47%]">
                                            <Field
                                                name="model"
                                                label="Model"
                                                width={"100%"}
                                                isColumn
                                                component={InputComponent}
                                            />
                                        </div>
                                 <div class= "w-[47%]">
                                            <Field
                                        name="type"
                                        label="Type"
                                        isColumn
                                        component={InputComponent}
                                    // style={{ height: "5em", marginTop: "0.25em" }}
                                    />
                                    </div>
                            </div>
                                </div>
                                <div class=" h-full w-[45%]">
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
                                                name="order"
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
export default connect(mapStateToProps, mapDispatchToProps)(BOMDrawerForm);


