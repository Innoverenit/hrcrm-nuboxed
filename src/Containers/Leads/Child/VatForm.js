import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field,} from "formik";
import { getCountries } from "../../Auth/AuthAction";
import { creatVat } from "../../Settings/SettingsAction";
import { Select } from "../../../Components/UI/Elements";
import * as Yup from "yup";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";

const { Option } = Select;

const currSchema = Yup.object().shape({
    // reportingCurrency: Yup.string().required("Input needed!"),
    // conversionCurrency: Yup.string().required("Input needed!"),
    value: Yup.string().required("Input needed!"),
  });

const VatForm = (props) => {
    useEffect(()=>{
        props.getCountries();
    },[]);

    const[reportingCurrency,setReportingCurrency]=useState("");
   

   const reportCurr = props.countries
  
    const handleSelect1Change = (value) => {
      setReportingCurrency(value);
     
    };
  

  

    return (
      <>
       <Formik

                    initialValues={{
                        country:reportingCurrency,
                        value:"",
                        userId:props.userId,
                        orgId:props.orgId
                    }}
                    validationSchema={currSchema}
                    onSubmit={(values, { resetForm }) => {
                        props.creatVat({
                            ...values,
                            country:reportingCurrency,
                        },
                       
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
                                        <div class=" text-xs font-bold font-poppins text-black">Country</div>
        <Select value={reportingCurrency} onChange={handleSelect1Change}>
          {reportCurr.map((option) => {
          return   <Option key={option.country_id} value={option.country_name}>
             {option.country_name}
           </Option>
})}
        </Select>
        {!reportingCurrency && (
  <div class="text-[tomato] font-semibold">Input needed!</div>
)}
        </div>

      
        <div class=" w-[18%]" >
                                            <Field
                                                isRequired
                                                name="value"
                                                isColumn
                                                label="Value"
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
                                    loading={props.creatingVat}
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
    countries:auth.countries,
    creatingVat:settings.creatingVat
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            creatVat,
            getCountries,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VatForm);
