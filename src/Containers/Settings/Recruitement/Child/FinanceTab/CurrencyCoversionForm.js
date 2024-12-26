import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field,} from "formik";
import { getCurrency } from "../../../../Auth/AuthAction";
import { createCurrencyConversion } from "../../../SettingsAction";
import { Select } from "../../../../../Components/UI/Elements";
import * as Yup from "yup";

const { Option } = Select;

const currSchema = Yup.object().shape({
    // reportingCurrency: Yup.string().required("Input needed!"),
    // conversionCurrency: Yup.string().required("Input needed!"),
    conversionFactor: Yup.string().required("Input needed!"),
  });

const CurrencyCoversionForm = (props) => {
    useEffect(()=>{
        props.getCurrency();
    },[]);

    const[reportingCurrency,setReportingCurrency]=useState("");
    const[conversionCurrency,setConversionCurrency]=useState("");

   const reportCurr = props.currencies
  
    const handleSelect1Change = (value) => {
      setReportingCurrency(value);
      setConversionCurrency('');
    };
  
    const handleSelect2Change = (value) => {
      setConversionCurrency(value);
    };
  
    const convoCurr = reportCurr.filter(option => option.currency_name !== reportingCurrency);

    return (
      <>
       <Formik
                    initialValues={{
                        reportingCurrency:reportingCurrency,
                        conversionCurrency:conversionCurrency,
                        conversionFactor:"",
                        userId:props.userId,
                        orgId:props.orgId
                    }}
                    validationSchema={currSchema}
                    onSubmit={(values, { resetForm }) => {
                        if (!reportingCurrency || !conversionCurrency) {
                            return;
                          }
                        props.createCurrencyConversion({
                            ...values,
                            reportingCurrency:reportingCurrency,
                        conversionCurrency:conversionCurrency,
                        },
                        props.orgId
                        );
                        resetForm();
                    }
                    }
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
                            <div class=" flex" >
                                <div class=" w-full h-full">

                                    <div class="flex justify-between">
                                    <div class=" w-[18%]">
                                        <div class=" text-xs font-bold font-poppins text-black">From - Currency</div>
        <Select value={reportingCurrency} onChange={handleSelect1Change}>
          {reportCurr.map((option) => {
          return   <Option key={option.currency_id} value={option.currency_name}>
             {option.currency_name}
           </Option>
})}
        </Select>
        {!reportingCurrency && (
  <div class="text-[tomato] font-semibold">Input needed!</div>
)}
        </div>

        <div class=" w-[18%]">
        <div class=" text-xs font-bold font-poppins text-black">To - Currency</div>
        <Select value={conversionCurrency} onChange={handleSelect2Change}>
          
          {convoCurr.map((option) => {
            return <Option key={option.currency_id} value={option.currency_name}>
          {option.currency_name}
             </Option>
})}
        </Select>
        {!conversionCurrency && (
  <div class="text-[tomato] font-semibold">Input needed!</div>
)}
        </div>
        <div class=" w-[18%]" >
                                            <Field
                                                isRequired
                                                name="conversionFactor"
                                                isColumn
                                                label="Conversion Factor"
                                                component={InputComponent}
                                                inlineLabel
                                                style={{
                                                    flexBasis: "80%",
                                                }}
                                            />
                                        </div>
        <div>  
                                        <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={props.creatingCurrencyConversion}
                                    style={{
                                        marginTop: "20px",
                                        marginLeft: "286px",
                                    }}
                                >
                                    Submit
                                </Button>
                                </div>
                                    </div>
                                </div>
                            </div>

                     
                        </Form>
                    )}
                </Formik>
      </>
    );
   }

const mapStateToProps = ({ auth,settings }) => ({
    userId: auth.userDetails.userId,
    orgId:auth.userDetails.organizationId,
    currencies: auth.currencies,
    creatingCurrencyConversion:settings.creatingCurrencyConversion
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            createCurrencyConversion,
            getCurrency,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrencyCoversionForm);
