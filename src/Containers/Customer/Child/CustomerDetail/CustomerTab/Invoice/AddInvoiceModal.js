import React, {  Suspense, Component } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { Button, } from "antd";
import { Formik, Form, Field } from "formik";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import {
    handleInvoiceModal,
} from "../../../../CustomerAction";


const documentSchema = Yup.object().shape({
documentId: Yup.string().required("Input needed !"),
});
class AddInvoiceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleClose = () => {
    const { handleInvoiceModal } = this.props;
    this.setState(
      {
      },
      handleInvoiceModal(false)
    );
  };
  callback = () => {
    const {
      customer,
      getCustomerDocument,
      handleInvoiceModal,
    } = this.props;
    handleInvoiceModal(false);
  };
  render() {
    console.log(this.state.data);
    const {
      customer,
      invoiceModal,
      handleInvoiceModal,
      addCustomerDocument,
      addingDocumentByCustomerId,
      oppoStages,
      subscriptionType,
      handleButtonClick,
      organization,
    } = this.props;

    return (
      <>
        <StyledDrawer
          title={
            <FormattedMessage id="app.invoice" defaultMessage="Invoice" />
          }
          width="65vw"
          visible={invoiceModal}
          onClose={() => this.handleClose()}
        >
          <Suspense fallback={""}>
            <Formik
              // enableReinitialize
              initialValues={{
                documentTypeId: "",
                documentTitle: '',
                documentDescription: "",
                documentId: "",
              }}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                resetForm();
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
                  <div class=" flex justify-between"
                  >
                    <div class=" h-full w-5/12"

                    >
                      
                      <Field
                        name="documentTypeId"
                        selectType="documentTypeName"
                        isColumnWithoutNoCreate
                        // label="Type"
                        label={
                          <FormattedMessage
                            id="app.type"
                            defaultMessage="Type"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        inlineLabel
                        />
                    </div>
                    <div class=" h-full w-2/4"
                    >
                      <Field
                        name="documentTitle"
                        label={
                          <FormattedMessage
                            id="app.name"
                            defaultMessage="Name"
                          />
                        }
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                        />
                   <div class=" mt-3">
                      <Field
                        name="documentDescription"
                        label={
                          <FormattedMessage
                            id="app.description"
                            defaultMessage="Description"
                          />
                        }
                        isRequired
                        isColumn
                        width={"100%"}
                        component={TextareaComponent}
                        />
                        </div>
                   
                      <div class=" flex justify-between mt-3">
                              <>
                                <div class=" w-2/6 mr-2"
                                >
                                  <Field
                                    inlineLabel
                                    name="department"
                                    label={
                                      <FormattedMessage
                                        id="app.department"
                                        defaultMessage="Function"
                                      />
                                    }
                                    isRequired
                                    isColumn
                                    component={InputComponent}
                                  />
                                </div>
                                <div class=" w-2/5">
                                  <Field
                                    isRequired
                                    name="level"
                                    isColumn
                                    selectType="level"
                                    component={InputComponent}
                                    inlineLabel
                                    />
                                </div>
                              </>
                        </div>
       
                    </div>
                  </div>

               
                  <div class=" flex justify-end mt-3">
                    <Button
                      htmlType="submit"
                      type="primary"
                    >
                      <FormattedMessage
                        id="app.submit"
                        defaultMessage="Submit"
                      />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

const mapStateToProps = ({ customer,auth }) => ({
  invoiceModal: customer.invoiceModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        handleInvoiceModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddInvoiceModal);