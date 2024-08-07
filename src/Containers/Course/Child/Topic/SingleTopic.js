import React, { Component } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import QuizIcon from '@mui/icons-material/Quiz';
import {handleTestDrawerModal} from "../../CourseAction"
import { Button, Tooltip} from "antd";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TextInput} from "../../../../Components/UI/Elements";
import { elipsize } from "../../../../Helpers/Function/Functions";
import { ViewEditCard } from "../../../../Components/UI/Elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const TabPane = StyledTabs.TabPane;
class SingleTopic extends Component {
 

  handleStageType=(value)=>
  this.setState({responsible:value});
 
  

  render() {
    const { topicsData } = this.props;
    console.log(topicsData);

    const {
      topicsData: {
        topics,
        opportunityStagesId,

        probability,
      },
      linkedStages,
     
      newTopicName,
    
      updatingStages,
   
      color,
      currentStage,
    } = this.props;

    const disabled = probability === 100 || probability === 0 ? true : false;
    const disableDelete = linkedStages && linkedStages.includes(opportunityStagesId);
    return (
      <StageWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
                
                {/* <StageName style={{ flexBasis: "25%", textAlign: "left" }}> */}
                <StyledTabs>
                <TabPane
                tab={elipsize(topics, 23)}
                ></TabPane>
                </StyledTabs>
                {/* </StageName> */}
           
                <div class=" flex justify-between">     
                <Tooltip title="Test" >
                    <span
                    onClick={(item) => 
                     {
                       this.props.handleTestDrawerModal(true);                                      
                    }                     
                    }
                     style={{ 
                     marginLeft: "35px",
                      }} 
                     >
                  <QuizIcon/>
                   </span>
                   </Tooltip>  
</div>
                 
           </div>
            
            ) : (
              
              <div class=" flex flex-row flex-wrap items-start self-start justify-center grow shrink h-auto mr-auto ">
                <TextInput
                  name={newTopicName}
                  // value={stageValue1 || stageName}
                  defaultValue={topics}
                  onChange={this.handleChange}
                  // disabled={disabled}
                  width={"25%"}
                />
                &nbsp;
               
     
                &nbsp;&nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  // disabled={disabled}
                  loading={updatingStages}                  
            
                >
                  <FormattedMessage
                    id="app.save"
                    defaultMessage="Save"
                  />
                </Button>
                &nbsp;
                <Button type="primary" ghost onClick={() => toggleViewType()}>
                  <FormattedMessage
                    id="app.cancel"
                    defaultMessage="Cancel"
                  />
                </Button>
              </div>
            )
          }
        </ViewEditCard>  

         

      </StageWrapper>
     
   
     
    );
   
  }

}
const mapStateToProps = ({ course, auth }) => ({
 
  addTestDrawerModal:course.addTestDrawerModal


});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      
      handleTestDrawerModal
     
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SingleTopic);
// export default SingleRecruitStages;


const StageWrapper = styled.div`
  width: 100%;
  height: auto;
  cursor: pointer;
`;
const StageName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 400;
  // margin-bottom: 0;
  margin: 0;
`;
const StageValue = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-size: 1 rem;
  font-weight: 400;
  margin: 0;
`;

