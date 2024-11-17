import React, {useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { MainWrapper } from "../../../../../Components/UI/Elements";
import { addCommission } from "../../../../Settings/SettingsAction";

import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import AddressFieldArray from "../../../../../Components/Forms/Formik/AddressFieldArray";
import CommissionTable from "./CommissionTable";
import { getAllSalesList } from "../../../../Opportunity/OpportunityAction";
/**
 * yup validation scheme for creating a Customer
 */
// 

function CommissionForm(props) {

    useEffect(()=> {
        props.getAllSalesList();
    },[]);

    const salesNameOption = props.sales.map((item) => {
        return {
            label: `${item.fullName || ""}`,
            value: item.employeeId,
        };
    });
console.log("orggg",props.organizationId)

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{
                    comPersion: "",
                    commissionPrice: "",
                    currency:"",
                    calculatedOn:"",
                    type:"sales",
                    userId:props.userId,
                    orgId:props.organizationId
                }}
                onSubmit={(values, { resetForm }) => {
                    props.addCommission(
                        {
                            ...values,
                        },
                        props.organizationId,
                        "sales"
                    );
                    
                }}
            >
                {({ values }) => (
                    <MainWrapper>
                        <Form className="form-background">

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    height: "15vh",
                                    width: "75%",
                                    alignItems: "center",
                                }}
                            >

                    <div style={{width: "40%"}}>
                   <Field
                    name="comPersion"
                    // selectType="employee"
                    isColumnWithoutNoCreate
                    // label="Assigned"
                    label={
                      <FormattedMessage
                        id="app.name"
                        defaultMessage="Name"
                      />
                    }
                    component={SelectComponent}
                    options={Array.isArray(salesNameOption) ? salesNameOption : []}
                    // options={["rdf","desh"]}
                    isColumn
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  </div>
                  &nbsp;&nbsp;
                        <div style={{width: "40%"}}>
                            <Field
                                        name="commissionPrice"
                                        label="Amount"
                                        type="text"
                                        isColumn
                                        width={"100%"}
                                        component={InputComponent}
                                        inlineLabel

                                    />
                
                         </div>
                         &nbsp;&nbsp;

                         <div style={{ width: "47%" }}>
                      <Field
                        name="currency"
                        isColumnWithoutNoCreate
                        // defaultValue={{
                        //   value: this.props.user.currency,
                        // }}
                        label={
                          <FormattedMessage
                            id="app.currency"
                            defaultMessage="Currency"
                          />
                        }
                        width="100%"
                        isColumn
                        selectType="currencyName"
                       value={values.currencyName}
                        isRequired
                        component={SearchSelect}
                      // flag={values.currency}
                      // options={Array.isArray(currency) ? currency : []}
                      />
                    </div>
                    &nbsp;&nbsp;

                         <div style={{width: "40%"}}>
                            <Field
                                        name="calculatedOn"
                                        label="Frequency"
                                        type="text"
                                        isColumn
                                        width={"100%"}
                                        component={SelectComponent}
                                        options={[ "Monthly", "Quarterly", "Half Yearly" , "Annualy" ]}

                                        inlineLabel

                                    />
                                    </div>
                         &nbsp;&nbsp;
                                    {/* <div class=" mt-3"/> */}
                                    <div
                                    style={{
                                        width: "10%",  
                                        marginTop:"3%"
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={props.addingCommission}
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>
                            

                        </Form>
                    </MainWrapper>
                )}
            </Formik>
            <CommissionTable/>
        </>
    );
}

const mapStateToProps = ({ settings,opportunity,auth }) => ({
    addingCommission: settings.addingCommission,
    sales:opportunity.sales,
    userId:auth.userDetails.userId,
    organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        addCommission,
        getAllSalesList
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CommissionForm);
