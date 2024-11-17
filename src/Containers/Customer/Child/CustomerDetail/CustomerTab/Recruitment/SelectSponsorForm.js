import React, { } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, message } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";


const OpportunitySchema = Yup.object().shape({});

function SelectSponsorForm(props) {
  const Sponsor = props.contactListByOpportunityId.map((item) => {
    return {
      label: `${item.firstName || ""}  ${item.middleName ||
        ""} ${item.lastName || ""}`,
      value: item.contactId,
    };
  });

  function handleCallback(status) {
    if (status === "success") {
      props.handleSponsorModal(false);
      message.success("sponser Offered successfully");
      // this.props.emailSendInvoice({ quoteId: this.props.quoteId });
    }
  }
  function handleSponsor(data, id) {
    debugger;
    if (data === "success") {
      props.sponsorSwitch(
        props.profileId,
        props.opportunityId,
        props.recruitmentId,
        id,
        handleCallback
      );
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          sponserId: undefined,
          recruitmentId: props.recruitmentId,
          profileId: props.profileId,
        }}
        validationSchema={OpportunitySchema}
        onSubmit={(values, { resetForm }) => {
      
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                {Sponsor.length ? (
                  <>
                    <Field
                      name="sponserId"
                      //label="Sponsor"
                      label={
                        <FormattedMessage
                          id="app.sponserId"
                          defaultMessage="Sponsor"
                        />
                      }
                      isColumn
                      style={{
                        flexBasis: "80%",

                        marginTop: "0.25em",
                      }}
                      component={SelectComponent}
                      options={Array.isArray(Sponsor) ? Sponsor : []}
                    />
                  </>
                ) : (
                  <>
                    <p>
                      Please Create or Tag atleast one Contact for selecting
                      Sponsor
                    </p>
                  </>
                )}

                <mt-3 />
              </div>
              &nbsp;
              <div
                style={{
                  height: "100%",
                }}
              ></div>
            </div>
            <mt-3 />
            {Sponsor.length ? (
              <>
             <div class=" flex flex-row flex-wrap items-start self-start justify-end  grow shrink h-auto mr-auto ">
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={props.updatingRecruitment}
                  >
                    <FormattedMessage id="app.update" defaultMessage="Update" />
                    {/* Update */}
                  </Button>
                </div>
              </>
            ) : (
              <></>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({
  auth,
  opportunity,
  team,
  contact,
  account,
  settings,
  partner,
}) => ({

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SelectSponsorForm);
