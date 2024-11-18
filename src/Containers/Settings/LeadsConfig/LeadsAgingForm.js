import React, {  useEffect,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Popconfirm,  } from "antd";

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
                  l-Category
              
                </div>
                </div>

                <div className="flex flex-col mt-3 ">
                  <div >
                    <div class="flex justify-between w-[18rem]" >
                      <i
                        className="fas fa-mug-hot  !text-icon"
                      />                 
                      <div class="font-bold ml-8">
                        Hot                    
                        </div>      
                      <div class="flex">
                        <Field className="w-40 h-2 text-center bg-[#f5f3f3] "
                          name="hot"
                          // label="To Start"
                          isColumn                         
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel                     
                        />
                        <div >
                        <div class=" text-xs font-bold font-poppins text-black">
                          Days
                     
                        </div>
                      </div>
                      </div>                   
                    </div>
                 {/* .............................................................. */}
                    <div class="flex justify-between w-[18rem]" >
                      <i
                        className="fas fa-burn  !text-icon"
                      />                 
                      <div class="font-bold ml-8">
                        Warm                  
                        </div>      
                      <div class="flex">
                        <Field className="w-40 h-2 text-center bg-[#f5f3f3] "
                          name="warm"
                          // label="To Start"
                          isColumn                         
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel                     
                        />
                        <div >
                        <div class=" text-xs font-bold font-poppins text-black">
                          Days
                        </div>
                      </div>
                      </div>                   
                    </div>               
                  </div>          
                  <div class="flex justify-between w-[18rem]" >
                      <i
                        className="far fa-snowflake  !text-icon"
                      />                 
                      <div class="font-bold ml-8">
                        Cold                 
                        </div>      
                      <div class="flex">
                        <Field className="w-40 h-2 text-center bg-[#f5f3f3] "
                          name="cold"
                          // label="To Start"
                          isColumn                         
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel                     
                        />
                        <div >
                        <div class=" text-xs font-bold font-poppins text-black">
                          Days
                          
                        </div>
                      </div>
                      </div>                   
                    </div> 
                                          
                </div>
              </div>

              <div class=" h-full w-[45%] mr-3"
              >
                <div class=" text-xs font-bold font-poppins text-white">.</div>
              <div class=" mt-3">
                <div class=" text-xs font-bold font-poppins text-white">.</div>
                </div>
               <div class=" mb-3">
                <div class=" text-xs font-bold font-poppins text-white">.</div>
                </div>
                

                <div class=" mt-3">
                  
                </div>
              </div>
            </div>
        

              <>
                <div class=" flex justify-end mr-3 mt-3"
                >
                  <Popconfirm
                    title="Do you wish to proceed?"
                    onConfirm={() => props.addLeadsaging(values)}
                    onCancel={props.getLeadAging}
                    okText="Ok"
                    cancelText="Cancel"
                  >
                    <Button className="mr-[-0.43em] mt-[1.25rem] mb-[0.31em]"
                      type="primary"
                      loading={props.addingLeadAging}
                      htmlType="submit"
                    >
                      Update
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
