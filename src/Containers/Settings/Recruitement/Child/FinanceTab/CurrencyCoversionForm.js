import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field,} from "formik";
import { getCurrency } from "../../../../Auth/AuthAction";
import { createCurrencyConversion } from "../../../SettingsAction";
import { Select, StyledLabel } from "../../../../../Components/UI/Elements";

const { Option } = Select;

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
                        reportingFactor:"1",
                        userId:props.userId,
                        orgId:props.orgId
                    }}
                    onSubmit={(values, { resetForm }) => {
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
                                        <StyledLabel>Reporting Currency</StyledLabel>
        <Select value={reportingCurrency} onChange={handleSelect1Change}>
          {reportCurr.map((option) => {
          return   <Option key={option.currency_id} value={option.currency_name}>
             {option.currency_name}
           </Option>
})}
        </Select>
        </div>

        <div class=" w-[18%]">
        <StyledLabel>Conversion Currency</StyledLabel>
        <Select value={conversionCurrency} onChange={handleSelect2Change}>
          
          {convoCurr.map((option) => {
            return <Option key={option.currency_id} value={option.currency_name}>
          {option.currency_name}
             </Option>
})}
        </Select>
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
