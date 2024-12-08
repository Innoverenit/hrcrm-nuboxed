import { Field, Form, Formik } from 'formik'
import React from 'react'


import { TimePicker } from "../../Components/Forms/Formik/TimePicker";
import { InputComponent } from '../../Components/Forms/Formik/InputComponent'

function ThirdInvoicePage() {
    return (
        <>
      <div class="mr-5 ml-5 w-1/2">
            <Formik>
                <Form>
                <div class=" flex justify-between ">
              <div class=" h-full w-1/2">
              <div class=" flex justify-between">
              <div class=" w-5/12">
              <Field
                          isRequired
                          name="billingAddress"
                          //label="Start "
                          label=
                            "Billing Address"
                            
                          
                          isColumn
                          component={InputComponent}
                          style={{
                            width: "100%",
                          }}
                        />
             </div>
             <div class=" mt-3" />
                    <div class=" w-5/12">
                  <Field
                          isRequired
                          name="contactPerson"
                          //label="Start "
                          label="Contact Person"
                          isColumn
                          component={InputComponent}
                          style={{
                            width: "100%",
                          }}
                        />
                  </div>
                </div>
              </div>         
           </div>
                </Form>
            </Formik>
            </div>
        </>
    )
}

export default ThirdInvoicePage;