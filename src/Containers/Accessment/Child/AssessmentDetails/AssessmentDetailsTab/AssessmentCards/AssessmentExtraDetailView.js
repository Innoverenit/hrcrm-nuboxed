import React, { Component } from "react";
import { div } from "../../../../../../Components/UI/Layout";
import { SubTitle } from "../../../../../../Components/UI/Elements";


function AssessmentExtraDetailView(props) {
    const {
        assessmentByAssessmentId: { url, category,level,noOfQuestions,theme },
      } = props;
    return (
        <>
        
          <AssessmentItemRow // label="URL" 
            label={<FormattedMessage
              id="app.url"
              defaultMessage="URL"
            />}
  
            value={url} />
          <AssessmentItemRow //label="Phone Number" 
            label={<FormattedMessage
              id="app.category"
              defaultMessage="Category"
            />}
  
            value={category} 
            
            />
            
            <AssessmentItemRow //label="Phone Number" 
            label={<FormattedMessage
              id="app.level"
              defaultMessage="Level"
            />}
  
             value={level} 
            
            />
  
  <AssessmentItemRow //label="Phone Number" 
            label={<FormattedMessage
              id="app.questions"
              defaultMessage="Questions #"
            />}
  
             value={noOfQuestions} 
            
            />
            <AssessmentItemRow //label="Phone Number" 
            label={<FormattedMessage
              id="app.theme"
              defaultMessage="Theme"
            />}
  
             value={theme} 
            
            />
  
        </>
      );
}

export default AssessmentExtraDetailView

const AssessmentItemRow = ({ label, value }) => {
    return (
      <div class=" flex flex-row  m-2 flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
        <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
        <SubTitle style={{
           //marginLeft: "-1.875em" 
           }}>{value}</SubTitle>
      </div>
    );
  };