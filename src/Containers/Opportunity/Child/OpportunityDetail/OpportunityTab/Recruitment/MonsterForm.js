import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button} from "antd";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";


import {getJobCategory,getJobBoardName,getJobBoardOccupation,getJobBoardIndustry,addMonster} from "../../../../OpportunityAction";

//import ExperienceTable from "./ExperienceTable";

function MonsterForm(props) {
  useEffect(()=>{
    props.getJobCategory();
    props.getJobBoardName();
    props.getJobBoardOccupation();
     props.getJobBoardIndustry();


  },[])
   const categoryOption = props.jobCategory.map((item) => {
      return {
        label: item.jobCategoryAlias||"",
        value: item.monsterCategoryId,
      };
    });
    const occupationOption = props.jobOccupation.map((item) => {
      return {
        label: item.occupationAlias||"",
        value: item.monsterOccupationId,
      };
    });
    const boardNameOption = props.jobBoardName.map((item) => {
      return {
        label: item.jobBoardName||"",
        value: item.monsterBoardId,
      };
    });
    const jobIndustryOption = props.jobBoardIndustry.map((item) => {
      return {
        label: item.industryAlias||"",
        value: item.monsterIndustryId,
      };
    });
    
  return (
    <>
      <Formik
        initialValues={{
          displayTemplate:1,
          industry:"",
          jobOccupation:"",
          jobDuration:"",
          jobBoardName:"",
          jobCategory:"",
          recruitmentId: props.recruitmentId,
         
          // shiftId: props.shiftId,
        }}
        // validationSchema={FormSchema}
         onSubmit={(values, { resetForm }) => {
          props.addMonster(
            {
              ...values,             
            },
     
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
            {/* <MainWrapper> */}
            
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  height: "100%",
                  width: "50%",
                }}
              >
                     
                     <div >
                     <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                  <div class=" text-xs font-bold font-poppins text-black">Industry</div>
                  <Field
                    name="industry"
                    //label=""
                    type="text"
                     isColumn
                    width={"100%"}
                    // component={InputComponent}
                    component={SelectComponent}
                 options={Array.isArray(jobIndustryOption) ? jobIndustryOption : []}                      
                    inlineLabel
                  />
                  </div>
                </div>

                     <div >
                     <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                  <div class=" text-xs font-bold font-poppins text-black">Job Category</div>
                  <Field
                    name="jobCategory"
                    //label=""
                    type="text"
                     isColumn
                    width={"100%"}
                    // component={InputComponent}
                    component={SelectComponent}
                 options={Array.isArray(categoryOption) ? categoryOption : []}                      
                    inlineLabel
                  />
                  </div>
                </div>
                <div class="mt-3" />
                <div >
                <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                  <div class=" text-xs font-bold font-poppins text-black">Job Occupation</div>
                  <Field
                    name="jobOccupation"
                    //label=""
                    type="text"
                     isColumn
                    width={"100%"}
                    // component={InputComponent}
                    component={SelectComponent}
                    options={Array.isArray(occupationOption) ? occupationOption : []}                      
                    inlineLabel
                  />
                  </div>
                </div>
                <div class="mt-3" />
                      <div >
                      <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                  <div class=" text-xs font-bold font-poppins text-black">Template</div>
                  <Field
                    name="displayTemplate"
                    //label=""
                    type="text"
                     isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                  </div>
                </div>
                <div class="mt-3" />
             
                <div >
                <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                  <div class=" text-xs font-bold font-poppins text-black">Job Duration</div>
                  <Field
                    name="jobDuration"
                    //label=""
                    //type="number"
                     isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                  </div>
                </div>
                <div class="mt-3" />
                <div >      
                    </div>
                      <div class="mt-3" />

                <div >
                <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                  <div class=" text-xs font-bold font-poppins text-black">Job Board Name</div>
                  <Field
                    name="jobBoardName"
                    //label=""
                    type="number"
                     isColumn
                    width={"100%"}
                    // component={InputComponent}
                    component={SelectComponent}
                    options={Array.isArray(boardNameOption) ? boardNameOption : []}                      
                    inlineLabel
                  />
                  </div>
                </div>
                <div class="mt-3" />
               

                
                <div class="mt-3" style={{marginTop:"1.25em"}}/>              
                <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={props.linkingMonster}
                >
                 Submit
                </Button>
              </div>
                                           
                </div>
                
              </div>
            {/* </MainWrapper> */}
          </Form>
        )}
      </Formik>
      {/* <CommercialsTable/> */}
    </>   
  );
}

const mapStateToProps = ({opportunity,auth}) => ({
  jobCategory:opportunity.jobCategory,
  fetchingJobCategory:opportunity.fetchingJobCategory,
  fetchingJobCategoryError:opportunity.fetchingJobCategoryError,
  organizationId: auth.userDetails.organizationId,
  jobBoardName:opportunity.jobBoardName,
  jobOccupation:opportunity.jobOccupation,
  jobBoardIndustry:opportunity.jobBoardIndustry,
  linkingMonster:opportunity.linkingMonster
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getJobCategory,
        addMonster,
        getJobBoardName,
        getJobBoardOccupation,
        getJobBoardIndustry

    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonsterForm);