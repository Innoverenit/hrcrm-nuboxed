import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";

import { Formik, Form, Field } from "formik";
import { StyledModal } from "../../../../../Components/UI/Antd";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { getContactListByOpportunityId } from "../../../OpportunityAction";
function LinkedGenerateQuote(props) {
  console.log(props.opportunity.opportunityId);
  const { visibleModal, handleOpenModal } = props;
  // useEffect(() => {
  //   props.getContactListByOpportunityId(props.opportunity.opportunityId);
  // }, []);
  console.log(props.contactListByOpportunityId);
  const contactList =
    props.contactListByOpportunityId.length &&
    props.contactListByOpportunityId.map((item) => {
      debugger;
      return {
        label: `${item.firstName || ""} ${item.middleName ||
          ""} ${item.lastName || ""}`,
        value: item.contactId,
      };
    });

  return (
    <>
      <StyledModal
        // title="Send to"
        title={<FormattedMessage
          id="app.sendto"
          defaultMessage="Send to"
        />}
        width="25%"
        visible={visibleModal}
        maskClosable={false}
        destroyOnClose
        style={{ marginTop: 100 }}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onCancel={() => handleOpenModal(false)}
        footer={null}
      >
        <Formik
          initialValues={{
            contactId: undefined,
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            props.handleSubmitButtonClick(values);
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
                <FlexContainer justifyContent="space-between">

                  <Field
                    name="contactId"
                    width="40%"
                    component={SelectComponent}
                    options={Array.isArray(contactList) ? contactList : []}
                    style={{
                      borderRadius: 5,
                      height: "2em",
                    }}
                  />
                &nbsp; &nbsp;

                {/* <FlexContainer justifyContent="flex-end"> */}
                  <div>
                    <Button type="primary" htmlType="submit" Loading={false}>
                      <FormattedMessage
                        id="app.add"
                        defaultMessage="Add"
                      />
                      {/* Add */}
                    </Button>
                  </div>
                  {/* </FlexContainer> */}
                </FlexContainer>
              </Form>
            )}
        </Formik>
      </StyledModal>
    </>
  );
}

const mapStateToProps = ({ opportunity }) => ({
  opportunity: opportunity.opportunity,
  // contactListByOpportunityId: opportunity.contactListByOpportunityId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getContactListByOpportunityId,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkedGenerateQuote);
