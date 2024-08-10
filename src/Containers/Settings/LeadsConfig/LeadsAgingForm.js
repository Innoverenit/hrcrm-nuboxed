import React, {  useEffect,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Popconfirm,  } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, } from "formik";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";

import { addLeadsaging, getLeadAging } from "../SettingsAction";

function LeadsAgingForm(props) {
  useEffect(() => {
    props.getLeadAging(props.organizationId);
  }, []);

  console.log("legdi",props.leadAging && props.leadAging.length && props.leadAging[0].cold )
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          cold:props.leadAging && props.leadAging.length && props.leadAging[0].cold ||"",
          hot:props.leadAging && props.leadAging.length && props.leadAging[0].hot || "",
          worm: props.leadAging && props.leadAging.length && props.leadAging[0].worm || "",
          notDefined:props.leadAging && props.leadAging.length && props.leadAging[0].notDefined || "",
          userId: props.userId,
          liveInd: true,
          orgId: props.organizationId,

        }}
        onSubmit={(values) => {
      
        }}
      >
        {({ values }) => (
          <Form>
            <div class=" flex justify-between h-[32vh]"
            >
              <div class=" h-full w-[45%] ml-3"
              >
                <div class=" text-xs font-bold font-poppins "style={{ fontStyle: "italic" }}>
                  Configure rules for ageing of Contacts in Leads section, if
                  not qualified within the stipulated time then they will be
                  automatically transferred to
                </div>

<div class=" mt-3">
                <div class=" text-xs font-bold font-poppins" style={{ fontStyle: "italic" }}>
                  Junk section. Junk leads will show up in the admin account for
                  future redistribution.
                </div>
                </div>
                <div class=" mb-8">
                <div class=" text-xs font-bold font-poppins text-black">
                  l<FormattedMessage
                    id="app.category"
                    defaultMessage="Category"
                  />
                </div>
                </div>

                <div className="flex flex-col mt-3 ">
                  <div >
                    <div class="flex justify-between w-[18rem]" >
                      <i
                        className="fas fa-mug-hot"
                        style={{ fontSize: "1.12em" }}
                      />                 
                      <div class="font-semibold ml-8">
                        Hot
                        
                        </div>      
                      <div class="flex">
                        <Field
                          name="hot"
                          // label="To Start"

                          isColumn
                          
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel
                          style={{
                            width:"11rem",
                            marginTop: "0em",
                            height: "2em",
                            textAlign: "center",
                            backgroundColor:"#f5f3f3"
                          }}
                        />
                        <div >
                        <div class=" text-xs font-bold font-poppins text-black">
                          {/* Days */}
                          <FormattedMessage
                            id="app.days"
                            defaultMessage="Days"
                          />
                        </div>
                      </div>
                      </div>
                      
                    </div>

                    <div  class="flex justify-between">
                      
                      <div  class="flex justify-between" >
                    <div>
                      <i className="	fas fa-burn" style={{ fontSize: "1.12em",marginRight:"2rem" }} />
                     <div class="mr-[0.7rem] font-semibold">
                        Warm
                        
                        </div>
                    </div>

                    <div>
                      <div class="flex" >
                        <Field
                          name="worm"
                     
                          isColumn
                          width={"100%"}
                          
                          component={InputComponent}
                          inlineLabel
                          style={{
                            flexBasis: "80%",
                            marginTop: "0em",
                            width:"10rem",
                            height: "2em",
                            textAlign: "center",
                            backgroundColor:"#f5f3f3"
                       
                          }}
                        />
                         <div >
                        <div class=" text-xs font-bold font-poppins text-black">
                          {/* Days */}
                          <FormattedMessage
                            id="app.days"
                            defaultMessage="Days"
                          />
                        </div>
                      </div>
                      </div>
                     
                      <div >
                        {/* <div class=" text-xs font-bold font-poppins text-black">
                          Days
                        </div> */}
                      </div>
                    </div>
                  </div>
                    </div>
                  </div>
                  <div class="flex justify-between w-[18rem]">
                    <div>
                      <i
                        className="far fa-snowflake"
                        style={{ fontSize: "1.12em",marginRight:"2rem" }}
                      />
                    
                      <div class="font-semibold">
                        {/* Cold */}
                        <FormattedMessage
                          id="app.cold"
                          defaultMessage="Cold"
                        />
                      </div>
                    </div>
                    <div class="flex justify-between">
                      <div >
                        <Field
                          name="cold"
                          // label="To Start"
                          isColumn
                          disabled={props.subscriptionType === "FREE"}
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel
                          style={{
                            flexBasis: "80%",
                            marginTop: "0em",
                            height: "2em",
                            textAlign: "center",
                            backgroundColor:
                              props.subscriptionType === "FREE"
                                ? "#f5f3f3"
                                : null,
                          }}
                        />
                      </div>
                      <div >
                        <div class=" text-xs font-bold font-poppins text-black">
                          {/* Days */}
                          <FormattedMessage
                            id="app.days"
                            defaultMessage="Days"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex justify-between w-[18rem]">
                  
                    <div >
                    <div class="font-semibold">Not Defined</div>
                    </div>
                    <div class="flex justify-between">
                      <div >
                        <Field
                          name="notDefined"
                          isColumn
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel
                          style={{
                            flexBasis: "80%",
                            marginTop: "0em",
                            height: "2em",
                            textAlign: "center",
                            backgroundColor:"#f5f3f3"
                          }}
                        />
                      </div>
                      <div >
                        <div class=" text-xs font-bold font-poppins text-black">
                          <FormattedMessage
                            id="app.days"
                            defaultMessage="Days"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                 
                </div>
              </div>

              <div class=" h-full w-[45%] mr-3"
              >
                <div class=" text-xs font-bold font-poppins" style={{ color: "white" }}>.</div>
              <div class=" mt-3">
                <div class=" text-xs font-bold font-poppins" style={{ color: "white" }}>.</div>
                </div>
               <div class=" mb-3">
                <div class=" text-xs font-bold font-poppins" style={{ color: "white" }}>.</div>
                </div>
                

                <div class=" mt-3">
                  
                </div>
              </div>
            </div>
        

              <>
                <div class=" flex justify-end mr-3 mt-3"
                >
                  <Popconfirm
                    // title="Do you wish to proceed?"
                    title={<FormattedMessage
                      id="app.doyouwishtoproceed?"
                      defaultMessage="Do you wish to proceed?"
                    />}
                    onConfirm={() => props.addLeadsaging(values)}
                    onCancel={props.getLeadAging}
                    okText="Ok"
                    // cancelText="Cancel"
                    cancelText={<FormattedMessage
                      id="app.cancel"
                      defaultMessage="Cancel"
                    />}
                  >
                    <Button
                      type="primary"
                      loading={props.addingLeadAging}
                      htmlType="submit"
                      style={{
                        marginRight: "-0.43em",
                        marginTop: "1.25em",
                        marginBottom: "0.31em",
                      }}
                    >
                      {/* Update */}
                      <FormattedMessage
                        id="app.update"
                        defaultMessage="Update"
                      />
                    </Button>
                  </Popconfirm>
                </div>
              </>
       
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ settings, auth }) => ({
  leadAging: settings.leadAging,
  addingLeadAging: settings.addingLeadAging,
  organizationId: auth.userDetails.organizationId,
  addingLeadAging: settings.addingLeadAging,
  userId:auth.userDetails.userId

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 
    addLeadsaging, getLeadAging 
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LeadsAgingForm);
