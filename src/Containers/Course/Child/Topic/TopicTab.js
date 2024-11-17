import React, { Component,lazy,Suspense } from "react";
import { connect } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";

import { bindActionCreators } from "redux";
import { Button, message, } from "antd";
import styled from "styled-components";
import { addTopic,
   getTopics
   } from "../../CourseAction";
import {
  TextInput,
} from "../../../../Components/UI/Elements";
import SingleTopic from "./SingleTopic";
import Upload from "../../../../Components/Forms/Formik/Upload";

const AddTestModal =lazy(()=>import("./AddTestModal"));

class TopicTab extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = {
      topics: "",
      currentProcess: [],
      isTextInputOpen: false,
    };
  }
  componentDidMount() {
    this.props.getTopics(this.props.courseId);
 }

  handleSetImage = (imageId) => {
    this.setState({imageId : imageId });
  };
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleAddTopic = () => {
    const { addProcessStage } = this.props;
    const { topics, currentProcess,imageId,courseId } = this.state;

    const { topicsData } = this.props;
    let exist =
      topicsData && topicsData.some((element) => element.topics == topics);

    const Id = currentProcess.courseId;

    let topic = {
      topics,
      imageId:this.state.imageId,
      // courseId: Id,
      imageId,
      courseId: this.props.course.courseId,
    };
    if (exist) {
      debugger;
      message.error("Can not create as another stage exists with same name !");
    } else {
      this.props.addTopic(
        topic,
        this.handleCallBack,

        this.props.course.courseId
      );
    }
    this.setState({
      topics: "",
      imageId:"",
      isTextInputOpen: false,
    });
  };
  render() {
    return (
      <>
       <div class="flex flex-no-wrap" >
       <div class="mr-5 ml-5 text-[#FFFAFA] overflow-auto">                         
            <div class=" flex flex-col" >
             
           <div class="mr-5 ml-5 h-8 mt-2">
              {this.props.topicsData.map((topicsData, i) => ( 
             <SingleTopic
                key={i}
                stageValue1={this.state.topics}
                newTopicName="topics"
                topicsData={topicsData}
                organization={this.props.organization}
                className="scrollbar"
                id="style-3"
              /> 
            ))}
              </div>
            </div>
            {this.state.isTextInputOpen ? (
              <div class=" flex items-center ml-[0.3125em] mt-[0.3125em]">
                   <TextInput
                    placeholder="Name"
                    name="topics"
                    value={this.state.topics}
                    onChange={this.handleChange}
                    width={"20%"}
                  />
                
                <div
                 name="imageId"
                >
                  
                  <Upload
                  handleSetImage={this.handleSetImage}
                  />
                </div>
                
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={this.handleAddTopic}
                >
                  
              Save
                </Button>
                &nbsp;
                <Button type="primary" ghost onClick={this.toggleInput}>
Cancel
                </Button>
              </div>
            ) : (
              <>
              <div class=" flex justify-end" >
                <Button
                    type="primary"
                    ghost
                    htmlType="button"
                    onClick={this.toggleInput}
                  >
                 Add Topic
                  </Button>
                </div>
               
              </>
            )}
          </div>
         
        </div>
        <Suspense fallback={"Loading"}> 
                <AddTestModal
        handleTestDrawerModal={this.props.handleTestDrawerModal}
        addTestDrawerModal={this.props.addTestDrawerModal}
        />
        </Suspense>
      </>
    );
  }
}

const mapStateToProps = ({ course }) => ({
  addingTopic: course.addingTopic,
  addingTopicError: course.addingTopicError,
  topicsData: course.topicsData,
  courseId:course.course.courseId
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addTopic,
      getTopics,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TopicTab);
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

const AppIcon1 = (props) => (
  <EditIcon className={`pen-to-square ${props.className}`} />
);

const EditIcon1 = styled(AppIcon1)`
  color: white;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
