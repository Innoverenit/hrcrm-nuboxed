import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { Button, Switch} from "antd";
import { MainWrapper } from "../../../../../../Components/UI/Elements";
import { Formik, Form, Field } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { StyledLabel } from "../../../../../../Components/UI/Elements";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { Spacer } from "../../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import {addCommercialsByCustomerId,getCommercialsByCustomerId} from "../../../../CustomerAction";
import dayjs from "dayjs";

function CommercialsForm(props) {
  useEffect(()=>{
    props.getCommercialsByCustomerId(props.customerId);

  },[])
  return (
    <>
      <Formik
        initialValues={{
          deliveryDate: dayjs(),
          suppliesFullName: "",
          quantity: 0,
          requirementType:"",
          //currency: this.props.user.currency,
          paymentDate:"",
          commissionAmount:"",
          userId: props.userId,
          suppliesId: props.suppliesId,
          customerId:props.customerId,
        }}
        onSubmit={(values) => {
          props.addCommercialsByCustomerId(
            {
              ...values,
            },
            props.customerId
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
          <Form className="form-background">
            <MainWrapper>
            
            <div class=" flex justify-between">
              <div class=" h-full w-1/2">
                     
                <div >
                <div class=" flex justify-between">
                  <StyledLabel>Permanent</StyledLabel>        
                 </div>
                </div>
                <Spacer/>

                <div class=" w-2/4">
                <div class=" flex justify-between">
                      <StyledLabel>Type</StyledLabel>
                      <Switch                                           
                        checkedChildren="Percentage"
                        unCheckedChildren="Amount"
                      />
                      </div>
                      </div>
                      <Spacer/>
                <div >
                <div class=" flex justify-between">
                  <StyledLabel>Currency</StyledLabel>   
                      <Field
                        name="currency"
                        isColumnWithoutNoCreate
                        placeholder="Currency"
                        // defaultValue={{
                        //   value: this.props.user.currency,
                        // }}
                        isColumn
                        selectType="currencyName"
                        isRequired
                        component={SearchSelect}
                      />
                      </div>
                    </div>
                
                      <Spacer/>
                <div >
                <div class=" flex justify-between">
                  <StyledLabel>Payment after (in days)</StyledLabel>
                  <Field
                    name="paymentDate"
                    type="number"
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                  </div>
                  <h4>Updated on {dayjs(props.commercialsByCustomerId && props.commercialsByCustomerId.length && props.commercialsByCustomerId[0].lastUpdatedOn).format("ll")} by {props.commercialsByCustomerId && props.commercialsByCustomerId.length && props.commercialsByCustomerId[0].ownerName}</h4>
                </div>
                <Spacer />
                <Spacer/>
                <div class=" flex justify-end">
                <Button
                  type="primary"
                  htmlType="Update"
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                  {/*                     
                    Create */}
                </Button>
              </div>
                </div>
                
              </div>
            </MainWrapper>
          </Form>
        )}
      </Formik>
      {/* <CommercialsTable/> */}
    </>   
  );
}

const mapStateToProps = ({customer,auth}) => ({
  commercialsByCustomerId:customer.commercialsByCustomerId,
  organizationId: auth.userDetails.organizationId,
  addingCommercials:customer.addingCommercials,
  customerId: customer.customer.customerId,
  addingCommercialsError:customer.addingCommercialsError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCommercialsByCustomerId,
      addCommercialsByCustomerId
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommercialsForm);