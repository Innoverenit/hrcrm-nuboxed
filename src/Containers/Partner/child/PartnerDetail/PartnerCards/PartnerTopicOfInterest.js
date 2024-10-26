import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tag, Input, Tooltip } from "antd";
import { ViewEditCard, Title } from "../../../../../Components/UI/Elements";
import AddBoxIcon from '@mui/icons-material/AddBox';
import {
  addTopicByPartnerId,
  getTopicsByPartnerId,
  deleteTopicByPartnerId,
} from "../../../PartnerAction";
class PartnerTopicOfInterest extends React.Component {
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
      partnerId,

      addTopicByPartnerId,
    } = this.props;
    if (inputValue) {
      addTopicByPartnerId(
        {
          partnerId: this.props.partner.partnerId,
          skillName: inputValue,
        },
        this.props.partner.partnerId
      );
    }
    this.setState({
      inputVisible: false,
      inputValue: "",
    });
  };
  handleTopicDelete = ({ skillSetDetailsId, partnerId }) => {
    const { deleteTopicByPartnerId } = this.props;
    deleteTopicByPartnerId(skillSetDetailsId, partnerId);
  };

  saveInputRef = (input) => (this.input = input);

  componentDidMount = () => {
    this.props.getTopicsByPartnerId(this.props.partner.partnerId);
  };

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const {
      fetchingTopicsByPartnerId,
      fetchingTopicsByPartnerIdError,
      topicsByPartnerId,
    } = this.props;
    return (
      <ViewEditCard>
        {({ viewType }, toggleViewType) =>
          viewType === "view" ? (
            <div style={{ height: "8em" }}>
              <Title
                fontSize="0.875em"
                style={{ fontWeight: 600, marginBottom: "0.2rem" }}
              >
                Skills{" "}
              </Title>
              {fetchingTopicsByPartnerId ? (
                <p>fetching Skills ...</p>
              ) : (
                topicsByPartnerId &&
                topicsByPartnerId.map((topic, index) => {
                  console.log(topic);
                  const isLongTopic = topic.skillName.length >= 30;
                  const topicElem = (
                    <Tag
                      key={topic.skillSetDetailsId}
                      color="blue"
                      closable
                      onClose={() => this.handleTopicDelete(topic)}
                      style={{ marginBottom: "0.4rem" }}
                    >
                      {isLongTopic
                        ? `${topic.skillName.slice(0, 30)}...`
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
                  visible={this.props.topicsByPartnerId.length !== 30}
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

const mapStateToProps = ({ partner, auth }) => ({
  user: auth.userDetails,
  fetchingTopicsByPartnerId: partner.fetchingTopicsByPartnerId,
  fetchingTopicsByPartnerIdError: partner.fetchingTopicsByPartnerIdError,
  topicsByPartnerId: partner.topicsByPartnerId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTopicsByPartnerId,
      addTopicByPartnerId,
      deleteTopicByPartnerId,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartnerTopicOfInterest);
