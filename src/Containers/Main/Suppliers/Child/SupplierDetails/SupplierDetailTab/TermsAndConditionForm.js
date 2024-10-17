import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { FormattedMessage } from "react-intl";
import { addTermsnCondition, getTermsnConditionOfPo } from "../../../SuppliersAction"
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";

function TermsAndConditionForm(props) {
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          setLoading(true); 
          const itemsToTranslate = [
  
         "1262",   //  "Special terms and conditions",//0
         "772",   //   "Delivery",//1
         "1263",   //  "Freight",
         "1264",  //  "Packing",
         "1204",   //   "Warrenty",
         "1266",  //   "Test Certificate",
         "1267", //   "Order Acceptance",
         "1171",     // "Payment",
         "154",     // "Submit"

          ];
  
          const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
          setTranslatedMenuItems(translations);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error('Error translating menu items:', error);
        }
      };
  
      fetchMenuTranslations();
    }, [props.selectedLanguage]);

    useEffect(() => {
        props.getTermsnConditionOfPo(props.poSupplierDetailsId)
    }, [])
console.log(props.termsnconditionofpo)
    return (
        <>
            <Formik
                initialValues={{
                    specialTerms: props.termsnconditionofpo.specialTerms || "",
                    delivery: props.termsnconditionofpo.delivery || "",
                    freight: props.termsnconditionofpo.freight || "",
                    packing: props.termsnconditionofpo.packing || "",
                    orderacceptance: props.termsnconditionofpo.orderacceptance || "",
                    warrenty: props.termsnconditionofpo.warrenty || "",
                    testCertificate: props.termsnconditionofpo.testCertificate || "",
                    payment: props.termsnconditionofpo.payment || ""
                }}
                onSubmit={(values, { resetForm }) => {
                    props.addTermsnCondition({
                        ...values,
                        userId: props.userId,
                        poSupplierDetailsId: props.poSupplierDetailsId,
                    },
                        props.poSupplierDetailsId
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
                        <div className="flex flex-row justify-between">
                        <div class="flex flex-col justify-between w-[45%]">
                            <div class="w-wk">
                                <div class=" text-xs font-bold font-poppins">{translatedMenuItems[0]}</div>
                                <Field
                                    name="specialTerms"
                                    // label={<FormattedMessage
                                    //     id="app.specialtermsandcondition"
                                    //     defaultMessage="Special terms and condition"
                                    // />}
                                    isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={TextareaComponent}
                                />
                            </div>
                            <div class="w-wk">
                            <div class=" text-xs font-bold font-poppins mt-1">{translatedMenuItems[1]}</div>
                                <Field
                                    name="delivery"
                                    // label={<FormattedMessage
                                    //     id="app.delivery"
                                    //     defaultMessage="Delivery"
                                    // />}
                                    isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={TextareaComponent}
                                />
                            </div>
                            <div class="w-wk">
                            <div class=" text-xs font-bold font-poppins mt-1">{translatedMenuItems[2]}</div>
                                <Field
                                    name="freight"
                                    // label={<FormattedMessage
                                    //     id="app.freight"
                                    //     defaultMessage="Freight"
                                    // />}
                                    F isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={TextareaComponent}
                                />
                            </div>
                            <div class="w-wk">
                            <div class=" text-xs font-bold font-poppins mt-1">{translatedMenuItems[6]}</div>
                                <Field
                                    name="orderacceptance"                          
                                    //     id="app.orderacceptance"                             
                                    isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={TextareaComponent}
                                />
                            </div>
                        </div>
                        <div class="flex  flex-col justify-between  w-[45%]">
                            <div class="w-wk">
                            <div class=" text-xs font-bold font-poppins">{translatedMenuItems[3]}</div>
                                <Field
                                    name="packing"
                                    // label={<FormattedMessage
                                    //     id="app.packing"
                                    //     defaultMessage="Packing"
                                    // />}
                                    isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={TextareaComponent}
                                />
                            </div>
                            <div class="w-wk ">
                            <div class=" text-xs font-bold font-poppins mt-1">{translatedMenuItems[4]}</div>
                                <Field
                                    name="warrenty"                             
                                    //     defaultMessage="Warrenty"                                 
                                    isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={TextareaComponent}
                                />
                            </div>
                            <div class="w-wk">
                            <div class=" text-xs font-bold font-poppins mt-1">{translatedMenuItems[5]}</div>
                                <Field
                                    name="testCertificate"                               
                                    F isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={TextareaComponent}
                                />
                            </div>
                            <div class="w-wk">
                            <div class=" text-xs font-bold font-poppins mt-1">{translatedMenuItems[7]}</div>
                                <Field
                                 name="payment"                          
                                    //     defaultMessage="Payment"
                               
                                    isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={TextareaComponent}
                                />
                            </div>
                        </div>
                        </div>
                        <div class="flex justify-end">
                                                 
                            <div class="w-wk mt-3.7rem mt-1">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={props.addingTermsnCondition}
                                >
                                 {translatedMenuItems[8]}   {/* <FormattedMessage
                                        id="app.submit"
                                        defaultMessage="Submit"
                                    /> */}
                                </Button>
                            </div>
                        </div>
                    </Form>                   
                )}
            </Formik>
        </>
    );
}
const mapStateToProps = ({ suppliers, plant, auth }) => ({
    termsnconditionofpo: suppliers.termsnconditionofpo,
    userId: auth.userDetails.userId,
    addingTermsnCondition: suppliers.addingTermsnCondition
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        addTermsnCondition,
        getTermsnConditionOfPo
    }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TermsAndConditionForm);
