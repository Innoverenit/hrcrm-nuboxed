import React from "react";
import { connect } from "react-redux";
import {
  getLibrarys,
} from "../../../../../Settings/Library/LibraryAction";
import { bindActionCreators } from "redux";
import { Tag, Input, Tooltip, } from "antd";
import { PlusOutlined,
} from '@ant-design/icons';
import { ViewEditCard, Title } from "../../../../../../Components/UI/Elements";
import {
  addTopicByCandidateId,
  getTopicsByCandidateId,
  deleteTopicByCandidateId,
} from "../../../../CandidateAction";
import { Select } from "antd";
import CandidateSelect from "./CandidateSelect";

const { Option } = Select;
class CandidateTopicOfInterest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: false,
      inputValue: "",
      selectValue:"",
    };
  }

  showInput = () =>
    this.setState({ inputVisible: true }, () => this.input.focus());

  handleInputChange = (e) => this.setState({ inputValue: e.target.value });
  // handleSelectChange = (e) => this.setState({ selectValue: e.target.value });

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    const {
      candidateId,

      addTopicByCandidateId,
    } = this.props;
    if (inputValue) {
      addTopicByCandidateId(
        {
          candidateId: this.props.candidate.candidateId,
          skillName:inputValue.charAt(0).toUpperCase() +inputValue.substr(1),
        },
        this.props.candidate.candidateId
      );
    }
    this.setState({
      inputVisible: false,
      inputValue: "",
    });
  };


  handleSelectConfirm = () => {
    const { selectValue } = this.state;
    const {
      candidateId,

      addTopicByCandidateId,
    } = this.props;
    // if (selectValue) {
      addTopicByCandidateId(
        {
          candidateId: this.props.candidate.candidateId,
          skillName:"",
        },
        this.props.candidate.candidateId
      );
    
    // this.setState({
    //   inputVisible: false,
    //   selectValue: "",
    // });
  };
  handleTopicDelete = ({ skillSetDetailsId, candidateId }) => {
    const { deleteTopicByCandidateId } = this.props;
    deleteTopicByCandidateId(skillSetDetailsId, candidateId);
  };

  saveInputRef = (input) => (this.input = input);
  componentDidMount = () => {
     this.props.getTopicsByCandidateId(this.props.candidate.candidateId);
     this.props.getLibrarys(this.props.organizationId);
  };

  render() {

    // const libraryOption = this.props.librarys
    // .sort((a, b) => {
    //   const libraryNameA = a.name && a.name.toLowerCase();
    //   const libraryNameB = b.name && b.name.toLowerCase();
    //   if (libraryNameA < libraryNameB) {
    //     return -1;
    //   }
    //   if (libraryNameA > libraryNameB) {
    //     return 1;
    //   }

    //   // names must be equal
    //   return 0;
    // }
    // )
    // .map((item) => {
    //   return {
    //     // label: `${item.salutation || ""} ${item.firstName ||
    //     //   ""} ${item.middleName || ""} ${item.name || ""}`,
    //     // value: item.userId,
    //     label: item.name || "",
    //     value: item.name,
    //   };
    // });
    console.log(this.props.candidate.candidateId)

    console.log("select",this.state.selectValue)

    const { tags, inputVisible, inputValue ,selectValue} = this.state;
    const {
      fetchingTopicsByCandidateId,
      fetchingTopicsByCandidateIdError,
      topicsByCandidateId,
    } = this.props;
    return (
      <ViewEditCard>
        {({ viewType }, toggleViewType) =>
          viewType === "view" ? (
            <div class=" h-[11em]" >
              <div class=" flex " >
              <Title
                fontSize="0.875em"
                style={{ fontWeight: 600, marginBottom: "0.2rem" }}
              >
                Skills{" "}
              </Title>
              {/* <Select
              // ref={this.saveInputRef}
                         name="skillName"
                        // mode="multiple"
                        style={{ width: '135%' }}
                        placeholder="Select"
                        // onPressEnter={this.handleSelectConfirm}
                       
                        // value={selectValue}
                      onChange={this.handleSelectConfirm}
                      >
  
                        {this.props.librarys.map((item, i) => {
                          return (
                            <Option value={item.name}>{item.name}</Option>
                            )
                          })}
                      </Select> */}
                      <div>
                      <CandidateSelect
                      candidateId={this.props.candidate.candidateId}
                      />
                      </div>
                      </div>
                      <div class=" mt-3" />

              {fetchingTopicsByCandidateId ? (
                <p>fetching Skills ...</p>
              ) : (
                topicsByCandidateId &&
                topicsByCandidateId.map((topic, index) => {
                  console.log(topic);
                  
                  const isLongTopic = topic.skillName===null?[]:topic.skillName.length >= 30;
                  const topicElem = (
                    <Tag
                      key={topic.skillSetDetailsId}
                      color="blue"
                      closable
                      onClose={() => this.handleTopicDelete(topic)}
                      style={{ marginBottom: "0.4rem" }}
                    >
                      {isLongTopic
                        ? `${topic.skillName===null?[]:topic.skillName.slice(0, 30)}...`
                        : topic.skillName}
                    </Tag>
                  );
                  return isLongTopic ? (
                    <Tooltip
                      title={topic.skillName}
                      key={topic.skillSetDetailsId}
                    >
                      {topicElem}
                    </Tooltip>
                  ) : (
                    topicElem
                  );
                })
              )}
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  style={{ width: 78,textTransform: "capitalize" }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag
                  onClick={this.showInput}
                  visible={this.props.topicsByCandidateId.length===null?[]:this.props.topicsByCandidateId.length !== 30}
                  style={{ background: "#fff", borderStyle: "dashed" }}
                >
                  <PlusOutlined type="plus" /> Skill
                </Tag>
              )}
            </div>
          ) : null
        }
      </ViewEditCard>
    );
  }
}

const mapStateToProps = ({ candidate, auth,librarys }) => ({
  user: auth.userDetails,
  librarys: librarys.librarys,
  organizationId: auth.userDetails.organizationId,
  fetchingTopicsByCandidateId: candidate.fetchingTopicsByCandidateId,
  fetchingTopicsByCandidateIdError: candidate.fetchingTopicsByCandidateIdError,
  topicsByCandidateId: candidate.topicsByCandidateId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTopicsByCandidateId,
      addTopicByCandidateId,
      deleteTopicByCandidateId,
      getLibrarys
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateTopicOfInterest);

