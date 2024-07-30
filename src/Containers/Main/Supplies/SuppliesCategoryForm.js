import React, { useState, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import LazySelect from "../../../Components/Forms/Formik/LazySelect";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { CurrencySymbol } from "../../../Components/Common";
import { base_url2 } from "../../../Config/Auth";
import axios from "axios";
import * as Yup from "yup";

async function addSuppliesCategory(values, setLoading,callback) {
    try {
        setLoading(true);
        const response = await axios.post(
            `${base_url2}/supplies/suppliescategory`,
            values,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token') || ''}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log("API Response:", response.data);
        if (callback) callback();
    } catch (error) {
        console.error("Error adding category:", error);
    }
    finally {
        setLoading(false); 
    }
}

const formSchema = Yup.object().shape({
    categoryName: Yup.string().required("Input Required!"),
  });

function SuppliesCategoryForm (props) {

    const [loading, setLoading] = useState(false);

    return (
        <>
        <Formik
          initialValues={{
            categoryName:"",
            imageId: "",
          }}
          validationSchema={formSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addSuppliesCategory(
              {
                ...values,
                
              },
              setLoading, 
              () => resetForm(),
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
            <Form>
              <div class="flex justify-between">
                <div class="h-full w-[45%]">
                  <div class=" flex  flex-nowrap">
                    <div> <FastField name="imageId" component={PostImageUpld} /></div>
                    <div>
                      <div class=" flex justify-between max-sm:flex-col">
                        <div class=" w-1/2 max-sm:w-full">
                          <Field
                            name="categoryName"
                            label="Category"
                            placeholder="Category"
                            isColumn
                            width={"100%"}
                            inlineLabel
                            component={InputComponent}

                          />
                        </div>
                       
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div class="flex justify-end ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Create
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        </>
    )
}

const mapStateToProps = ({  product }) => ({
    
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {

      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(SuppliesCategoryForm);
  