import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tag, Input, Tooltip, } from "antd";
import { ViewEditCard, Title } from "../../../../Components/UI/Elements";
import AddBoxIcon from '@mui/icons-material/AddBox';
import {
  addTopicByUserId,
  getTopicsByUserId,
  deleteTopicByUserId,
} from "../../../Employees/EmployeeAction";
class ProfileTopicOfInterest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: false,
      inputValue: "",
    };
  }

  showInput = () =>
    this.setState({ inputVisible: true }, () => this.input.focus());

  handleInputChange = (e) => this.setState({ inputValue: e.target.value });

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    const {
      user: { employeeId },

      addTopicByUserId,
    } = this.props;
    if (inputValue) {
      addTopicByUserId(
        {
          employeeId: employeeId,
          keySkillsName: inputValue,
        },
        employeeId
      );
    }
    this.setState({
      inputVisible: false,
      inputValue: "",
    });
  };
  handleTopicDelete = ({ keySkillsId, employeeId }) => {
    const { deleteTopicByUserId } = this.props;
    deleteTopicByUserId(keySkillsId, employeeId);
  };

  saveInputRef = (input) => (this.input = input);

  componentDidMount = () => {
    this.props.getTopicsByUserId(this.props.user.employeeId);
  };

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const {
      fetchingTopicsByUserId,
      fetchingTopicsByUserIdError,
      topicsByUserId,
    } = this.props;
    return (
      <ViewEditCard>
        {({ viewType }, toggleViewType) =>
          viewType === "view" ? (
            <div style={{ height: 50 }}>
              <Title
                fontSize="0.875em"
                style={{ fontWeight: 600, marginBottom: "0.2rem" }}
              >
                Skills{" "}
              </Title>
              {fetchingTopicsByUserId ? (
                <p>fetching Skills ...</p>
              ) : (
                topicsByUserId &&
                topicsByUserId.map((topic, index) => {
                  console.log(topic);
                  const isLongTopic = topic.keySkillsName.length >= 20;
                  const topicElem = (
                    <Tag
                      key={topic.keySkillsId}
                      color="blue"
                      closable
                      onClose={() => this.handleTopicDelete(topic)}
                      style={{ marginBottom: "0.4rem" }}
                    >
                      {isLongTopic
                        ? `${topic.keySkillsName.slice(0, 20)}...`
                        : topic.keySkillsName}
                    </Tag>
                  );
                  return isLongTopic ? (
                    <Tooltip
                      title={topic.keySkillsName}
                      key={topic.keySkillsId}
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
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag
                  onClick={this.showInput}
                  visible={this.props.topicsByUserId.length !== 20}
                  style={{ background: "#fff", borderStyle: "dashed" }}
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

const mapStateToProps = ({ employee, auth }) => ({
  user: auth.userDetails,
  fetchingTopicsByUserId: employee.fetchingTopicsByUserId,
  fetchingTopicsByUserIdError: employee.fetchingTopicsByUserIdError,
  topicsByUserId: employee.topicsByUserId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTopicsByUserId,
      addTopicByUserId,
      deleteTopicByUserId,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileTopicOfInterest);
