import React from "react";
import { connect } from "react-redux";
import {
  getLibrarys,
} from "../../../../../Settings/Library/LibraryAction";
import { bindActionCreators } from "redux";
import { Tag, Input, Tooltip, } from "antd";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
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

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    const {
      candidateId,

      addTopicByCandidateId,
    } = this.props;
    if (inputValue) {
      addTopicByCandidateId(
        {
          employeeId: this.props.employeeId,
          candidateId: this.props.candidateId,
          skillName:inputValue.charAt(0).toUpperCase() +inputValue.substr(1),
        },
        this.props.userType,this.props.uniqueId
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
      addTopicByCandidateId(
        {
          candidateId: this.props.uniqueId,
          skillName:"",
        },
        this.props.userType
      );
  };
  handleTopicDelete = ({ skillId }) => {
    const { deleteTopicByCandidateId } = this.props;
    deleteTopicByCandidateId(this.props.userType,skillId);
  };

  saveInputRef = (input) => (this.input = input);
  componentDidMount = () => {
     this.props.getTopicsByCandidateId(this.props.userType,this.props.uniqueId);
     this.props.getLibrarys(this.props.organizationId);
  };

  render() {

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
            <div class=" h-44" >
              <div class=" flex  items-center justify-around mb-3" >
              <div className=" font-bold font-poppins text-xs mb-1 "
               
              >
                Skills{" "}
              </div>
             
                      <div>
                      <CandidateSelect
                      candidateId={this.props.candidateId}
                      userType={this.props.userType}
                      employeeId={this.props.employeeId}
                      uniqueId={this.props.uniqueId}
                      />
                      </div>
                      </div>
                     

              {fetchingTopicsByCandidateId ? (
                <p>fetching Skills ...</p>
              ) : (
                topicsByCandidateId &&
                topicsByCandidateId.map((topic, index) => {
                  console.log(topic);
                  
                  const isLongTopic = topic.skillName===null?[]:topic.skillName.length >= 30;
                  const topicElem = (
                    <Tag
                    className="mb-[0.4rem]"
                      key={topic.skillId}
                      color="blue"
                      closable
                      onClose={() => this.handleTopicDelete(topic)}
                  
                    >
                      {isLongTopic
                        ? `${topic.skillName===null?[]:topic.skillName.slice(0, 30)}...`
                        : topic.skillName}
                    </Tag>
                  );
                  return isLongTopic ? (
                    <Tooltip
                      title={topic.skillName}
                      key={topic.skillId}
                    >
                      {topicElem}
                    </Tooltip>
                  ) : (
                    topicElem
                  );
                })
              )}
              {inputVisible && (
                <Input className="w-78 text-capitalize"
                  ref={this.saveInputRef}
                  type="text"
                  size="small"         
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag
                className="bg-[#fff] border-dashed"
                  onClick={this.showInput}
                  visible={this.props.topicsByCandidateId.length===null?[]:this.props.topicsByCandidateId.length !== 30}               
                >
                  <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]" /> Skill
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

