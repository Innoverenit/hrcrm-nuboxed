import React, {  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field,} from "formik";

function CurrencyCoversionForm(props)  {

        const { distributorStartDate, distributorEndDate } = props;
        return (
            <>
                <Formik
                    enableReinitialize
                    initialValues={{
                        currency:"",

                    }}
                    onSubmit={(values, { resetForm }) => {
                        // this.props.addDistributorOffer({
                        //     ...values,
                        // });
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
                                <div class=" w-full h-full"
                                 
                                >

                                    <div class="flex justify-between">
                                        <div class=" w-[18%]" >
                                            <Field
                                                isRequired
                                                name="currency"
                                                isColumn
                                                label="Reporting Currency"
                                                component={SelectComponent}
                                                inlineLabel
                                               options={["USD","EUR","GBP","INR"]}
                                                style={{
                                                    flexBasis: "80%",
                                                }}
                                            />
                                        </div>
                                        <div>
                                        <Button
                                    type="primary"
                                    htmlType="submit"
                                    // loading={this.props.addingDistributorOffer}
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


const mapStateToProps = ({ product }) => ({
    // addingDistributorOffer: product.addingDistributorOffer,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            // setClearbitProductDistributorData,
            // addDistributorOffer,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrencyCoversionForm);
