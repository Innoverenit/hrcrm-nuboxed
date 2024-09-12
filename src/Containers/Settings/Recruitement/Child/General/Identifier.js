import React, { useEffect, lazy, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, Field } from "formik";
import {
  Select,
} from "../../../../../Components/UI/Elements";
import { SwitchComponent } from "../../../../../Components/Forms/Formik/SwitchComponent";
import { FormattedMessage } from "react-intl";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { Button, } from "antd";
import {
  addingIdentifier,
  getIdentifier,
} from "../../../../Settings/SettingsAction";
import * as Yup from "yup";
import dayjs from "dayjs";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";


const { Option } = Select;
const GeneralSchema = Yup.object().shape({
  criticlDateRange: Yup.number()
    .typeError("Input must be a number!")
});
function Identifier(props) {

  useEffect(() => {
    props.getIdentifier(props.orgId);
  }, []);

  console.log(props.identifiers.deviceCode)
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          deviceCode: props.identifiers.deviceCode === "barcode" ? true : false,
          invoiceCode: props.identifiers.invoiceCode === "barcode" ? true : false,
          materialCode: props.identifiers.materialCode === "barcode" ? true : false,
          orderCode: props.identifiers.orderCode === "barcode" ? true : false,
          ownerName: props.identifiers.ownerName === "barcode" ? true : false,
          packetCode: props.identifiers.packetCode === "barcode" ? true : false,
          paymentCode: props.identifiers.paymentCode === "barcode" ? true : false,
          productCode: props.identifiers.productCode === "barcode" ? true : false,
          repairCode: props.identifiers.repairCode === "barcode" ? true : false,
          userCode: props.identifiers.userCode === "barcode" ? true : false,

        }}
        validationSchema={GeneralSchema}
        onSubmit={(values) => {
          console.log(values)
        
          props.addingIdentifier(
            {
              ...values,
              deviceCode: values.deviceCode === true ? "barcode" : "qrcode",
    invoiceCode: values.invoiceCode === true ? "barcode" : "qrcode",
    materialCode: values.materialCode === true ? "barcode" : "qrcode",
    orderCode: values.orderCode === true ? "barcode" : "qrcode",
    ownerName: values.ownerName === true ? "barcode" : "qrcode",
    packetCode: values.packetCode === true ? "barcode" : "qrcode",
    paymentCode: values.paymentCode === true ? "barcode" : "qrcode",
    productCode: values.productCode === true ? "barcode" : "qrcode",
    repairCode: values.repairCode === true ? "barcode" : "qrcode",
    userCode: values.userCode === true ? "barcode" : "qrcode",
            },
            props.orgId
          );
        }}
      >
        {({ values , setFieldValue }) => (
           <div class="mr-5 ml-5 overflow-auto" style={{ scrollbarWidth:"thin"  }}>
            <div class=" flex    ">
            <div class=" h-[70vh] overflow-auto overflow-x-hidden">
              <Form className="form-background">
                <div class=" flex justify-between w-full p-3 ">             
                  <div>              
                  
                    <div class=" flex justify-between   mt-2">                
                       <div class=" text-xs  ">Device</div>
                      <div>
    <div>
    <Field
  name="deviceCode"
  component={SwitchComponent}
  data={values.deviceCode}
  checkedChildren={"Bar Code"}
  unCheckedChildren={"QR Code"}
  width={"7em"}
  onChange={(checked) => {
    setFieldValue("deviceCode", checked ? "barcode" : "qrcode");
  }}
/>
                        </div>                   
                      </div>
                    </div>

                    <div class=" flex justify-between   mt-2">                 
                       <div class=" text-xs  ">Invoice</div>
                      <div>
                        <Field
                          name="invoiceCode"
                          component={SwitchComponent}
                          data={values.invoiceCode}
                          checkedChildren={"Bar Code"}
                          unCheckedChildren={"QR Code"}
                          width={"7em"}
                          onChange={(checked) => {
                            setFieldValue("invoiceCode", checked ? "barcode" : "qrcode");
                          }}
                        />
                      </div>
                    </div>               
                    <div class=" flex flex-col justify-between   mt-2">                               
   <>
   <div class=" flex  justify-between mt-2 ">
   <div class=" text-xs  ">Material</div>
   <div>
   <Field
     name="materialCode"
     component={SwitchComponent}
     data={values.materialCode}
     checkedChildren={"Bar Code"}
     unCheckedChildren={"QR Code"}
     width={"7em"}
     onChange={(checked) => {
      setFieldValue("materialCode", checked ? "barcode" : "qrcode");
    }}
   />
   </div>
 </div>
 <div class=" flex  justify-between mt-2 ">
 <div class=" text-xs  ">Order</div>
 <div>
   <Field
     name="orderCode"
     component={SwitchComponent}
     data={values.orderCode}
     checkedChildren={"Bar Code"}
     unCheckedChildren={"QR Code"}
     width={"7em"}
     onChange={(checked) => {
      setFieldValue("orderCode", checked ? "barcode" : "qrcode");
    }}
   />
     </div>
 </div>

 <div class=" flex  justify-between mt-2">
 <div class=" text-xs  ">Owner</div>
 <div>
   <Field
      name="ownerName"
     component={SwitchComponent}
     data={values.ownerName}
     checkedChildren={"Bar Code"}
     unCheckedChildren={"QR Code"}
     width={"7em"}
     onChange={(checked) => {
      setFieldValue("ownerName", checked ? "barcode" : "qrcode");
    }} 
   />
     </div>
 </div>
 <div class=" flex  justify-between mt-2 ">
 <div class=" text-xs  ">Packet</div>
 <div>
   <Field
      name="packetCode"
     component={SwitchComponent}
     data={values.packetCode}
     checkedChildren={"Bar Code"}
     unCheckedChildren={"QR Code"}
     width={"7em"}
     onChange={(checked) => {
      setFieldValue("packetCode", checked ? "barcode" : "qrcode");
    }} 
   />
     </div>
 </div>
</>
                

                      <div class=" flex  justify-between mt-2">
                      <div class=" text-xs  ">Payment</div>
                      <div>
                        <Field
                          name="paymentCode"
                          component={SwitchComponent}
                          data={values.paymentCode}
                          checkedChildren={"Bar Code"}
                          unCheckedChildren={"QR Code"}
                          width={"7em"}
                          onChange={(checked) => {
                            setFieldValue("paymentCode", checked ? "barcode" : "qrcode");
                          }} 
                        />
                        </div>
                      </div>                
                      <div class=" flex  justify-between mt-2">
                      <div class=" text-xs  ">Product</div>
                      <div>
                        <Field
                          name="productCode"
                          component={SwitchComponent}
                          data={values.productCode}
                          checkedChildren={"Bar Code"}
                          unCheckedChildren={"QR Code"}
                          width={"7em"}
                          onChange={(checked) => {
                            setFieldValue("productCode", checked ? "barcode" : "qrcode");
                          }} 
                        />
                        </div>
                      </div>
                      <div class=" flex  justify-between mt-2">
                          <div class=" text-xs  ">Repair</div>
                          <div>
                            <Field
                               name="repairCode"
                              component={SwitchComponent}
                              data={values.repairCode}
                              checkedChildren={"Bar Code"}
                              unCheckedChildren={"QR Code"}
                              width={"7em"}
                              onChange={(checked) => {
                                setFieldValue("repairCode", checked ? "barcode" : "qrcode");
                              }}
                            />
                              </div>
                          </div>
                          <div class=" flex  justify-between mt-2">
                          <div class=" text-xs  ">User</div>
                          <div>
                            <Field
                               name="userCode"
                              component={SwitchComponent}
                              data={values.userCode}
                             checkedChildren={"Bar Code"}
                             unCheckedChildren={"QR Code"}
                              width={"7em"}
                              onChange={(checked) => {
                                setFieldValue("userCode", checked ? "barcode" : "qrcode");
                              }}
                            />
                              </div>
                          </div>
                    </div>

                  </div>

                </div>
                <div class="mt-4">
                  Updated on{" "}
                  {dayjs(props.identifiers.creationDate).format("ll")} by{" "}
                  {props.identifiers.ownerName}
                </div>

                <div class=" flex justify-end mt-[1.25em]" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={props.addingIdentifiers}
                  >
                    <FormattedMessage id="app.update" defaultMessage="Update" />
                    {/* Update */}
                  </Button>
                </div>
              </Form>
              </div>
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
  requirementDuration: settings.requirementDuration,
  orgId: auth.userDetails.organizationId,
  addingIdentifiers: settings.addingIdentifiers,
  addingIdentifiersError: settings.addingIdentifiersError,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  identifiers: settings.identifiers,
  fetchingIdentifiers: settings.fetchingIdentifiers,
  fetchingIdentifiersError: settings.fetchingIdentifiersError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addingIdentifier,
      getIdentifier,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Identifier);

