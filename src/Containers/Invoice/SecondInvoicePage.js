import { Field, Form, Formik } from 'formik'
import React from 'react'


import { InputComponent } from '../../Components/Forms/Formik/InputComponent'

function SecondInvoicePage() {
    return (
        <>
<div class="mr-5 ml-5">
            <Formik>
                <Form style={{ minHeight:"30vh"}}>
                <div class=" flex justify-between ">
              <div class=" h-full w-1/2">
              <div class=" flex justify-between">
              <div class=" w-5/12">
              <Field
                          isRequired
                          name="billingAddress"
                          //label="Start "
                          label={
                            <FormattedMessage
                              id="app.billingAddress"
                              defaultMessage="Billing Address"
                            />
                          }
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
                          label={
                            <FormattedMessage
                              id="app.projectName"
                              defaultMessage="Contact Person"
                            />
                          }
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

export default SecondInvoicePage;