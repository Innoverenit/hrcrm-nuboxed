import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { Formik, Form, Field } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import dayjs from "dayjs";
import * as Yup from "yup";
import {
  getCommercialByOrgId,
  addCommercialByOrgId,
} from "../../../../PartnerAction";

const FormSchema = Yup.object().shape({
});

class CommercialsForm extends Component {
  componentDidMount() {
    this.props.getCommercialByOrgId(this.props.partnerId);
  }
  constructor(props) {
    super(props);

    this.state = {
      toggle: true,
    };
  }

  handleToggle = (checked) => {
    this.setState({ toggle: checked });
  };

  render() {
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            commissionDeal:
              this.props.commercials.length &&
              this.props.commercials[0].commissionDeal,
            currency:
              this.props.commercials.length &&
              this.props.commercials[0].currency,
            paymentDate:
              this.props.commercials.length &&
              this.props.commercials[0].paymentDate,
              partnerId:this.props.partnerId,
          }}
          //validationSchema={FormSchema}
          onSubmit={(values) => {
            this.props.addCommercialByOrgId(
              {
                ...values,
              },
              this.props.partnerId
            );
          }}
        >
          {({ values }) => (
            <Form className="form-background">
              <div class=" flex justify-between">
                <div class=" h-full w-full"
                >
                  <div class=" w-2/5">
                    <div class=" w-1/2">
                      <div class=" text-xs font-bold font-poppins text-black">Permanent</div>
                    </div>

                    <div class=" flex justify-between" >

                      <div>
                        <Switch
                          checked={this.state.toggle}
                          onChange={this.handleToggle}
                          unCheckedChildren={"Percentage"}
                          checkedChildren={"Amount"}
                        />
                      </div>
                      <div class=" w-2/5"
                    >
                        <Field
                          name="commissionDeal"
                          type="text"
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel
                        />
                      </div>
                      {this.state.toggle ? (
                          <div class=" w-2/5"
                          >
                          <Field
                            name="currency"
                            placeholder="Currency"
                            width={"100%"}
                            isColumn
                            selectType="currencyName"
                            isRequired
                            component={SearchSelect}
                          />
                        </div>
                      ) : null}
                    </div>
                    <div class=" mt-3" />
                    <div class=" flex justify-between" >
                    <div class=" w-1/2">
                        <div class=" text-xs font-bold font-poppins text-black">Payment after (in days)</div>
                      </div>
                      <div class=" w-2/5"
                          >
                        <Field
                          name="paymentDate"
                          type="number"
                          isRequired
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel
                        />
                      </div>
                    </div>

                    <div class=" mt-3" />
                  </div>
                  <h4>Updated on {dayjs(this.props.commercials && this.props.commercials.length && this.props.commercials[0].lastUpdatedOn).format("ll")} by {this.props.commercials && this.props.commercials.length && this.props.commercials[0].ownerName}</h4>
                  <div class=" mt-3" />
                  <div  class=" flex justify-end">
                    <Button
                      type="primary"
                      htmlType="submit"
                    >
                      Update
                    </Button>
                  </div>

                </div>
              </div>

            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, partner }) => ({
  commercials: partner.commercials,
  addingCommercials: partner.addingCommercials,
  addingCommercialsError: partner.addingCommercialsError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  partnerId: partner.partner.partnerId,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCommercialByOrgId,
      addCommercialByOrgId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CommercialsForm);
