import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tag, Input, Tooltip } from "antd";
import { getLibrarys } from "../../../../Settings/Library/LibraryAction";
import AddBoxIcon from '@mui/icons-material/AddBox';
import CustomerSelect from "./CustomerSelect";
import { ViewEditCard, Title } from "../../../../../Components/UI/Elements";
import {
  addInitiativeByCustomerId,
  getInitiativeByCustomerId,
  deleteTopicByCustomerId,
} from "../../../CustomerAction";
import { Select } from "antd";

const { Option } = Select;
class CustomerTopicOfInterest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: false,
      inputValue: "",
      selectValue: "",
    };
  }

  showInput = () =>
    this.setState({ inputVisible: true }, () => this.input.focus());

  handleInputChange = (e) => this.setState({ inputValue: e.target.value });

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    const {
      customerId,

      addInitiativeByCustomerId,
    } = this.props;
    if (inputValue) {
      addInitiativeByCustomerId(
        {
          customerId: this.props.customer.customerId,
          skillName: inputValue.charAt(0).toUpperCase() + inputValue.substr(1),
        },
        this.props.customer.customerId
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
      customerId,

      addInitiativeByCustomerId,
    } = this.props;
    // if (selectValue) {
    addInitiativeByCustomerId(
      {
        customerId: this.props.customer.customerId,
        skillName: "",
      },
      this.props.customer.customerId
    );

  };
  handleTopicDelete = ({ customerSkillLinkId, customerId }) => {
    const { deleteTopicByCustomerId } = this.props;
    deleteTopicByCustomerId(customerSkillLinkId, customerId);
  };

  saveInputRef = (input) => (this.input = input);
  componentDidMount = () => {
    this.props.getInitiativeByCustomerId(this.props.customer.customerId);
    this.props.getLibrarys(this.props.organizationId);
  };

  render() {
    console.log("follow", this.props.length);

    const { tags, inputVisible, inputValue } = this.state;
    const {
      fetchingInitiativeByCustomerId,
      fetchingInitiativeByCustomerIdError,
      topicsByCustomerId,
      candidateId,
      length,
    } = this.props;
    return (
      <ViewEditCard>
        {({ viewType }, toggleViewType) =>
          viewType === "view" ? (
            <div style={{ height: "11em" }}>
              <div class=" flex">
                <Title
                  fontSize="0.875em"
                  style={{ fontWeight: 600, marginBottom: "0.2rem" }}
                >
                  Skills{" "}
                </Title>
                <div>
                  <CustomerSelect customerId={this.props.customer.customerId} />
                </div>
              </div>
              {fetchingInitiativeByCustomerId ? (
                <p>fetching Skills ...</p>
              ) : (
                topicsByCustomerId &&
                topicsByCustomerId.map((topic, index) => {
                  console.log(topic);

                  const isLongTopic =
                    topic.skillName === null
                      ? []
                      : topic.skillName.length >= 30;
                  const topicElem = (
                    <Tag
                      key={topic.customerSkillLinkId}
                      color="blue"
                      closable
                      onClose={() => this.handleTopicDelete(topic)}
                      style={{ marginBottom: "0.4rem" }}
                    >
                      {isLongTopic
                        ? `${
                            topic.skillName === null
                              ? []
                              : topic.skillName.slice(0, 30)
                          }...`
                        : topic.skillName}
                    </Tag>
                  );
                  return isLongTopic ? (
                    <Tooltip
                      title={topic.skillName}
                      key={topic.customerSkillLinkId}
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
                  style={{ width: 78, textTransform: "capitalize" }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag
                  onClick={this.showInput}
                  visible={
                    this.props.topicsByCustomerId.length === null
                      ? []
                      : this.props.topicsByCustomerId.length !== 30
                  }
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

const mapStateToProps = ({ customer, auth, librarys }) => ({
  user: auth.userDetails,
  librarys: librarys.librarys,
  organizationId: auth.userDetails.organizationId,
  fetchingInitiativeByCustomerId: customer.fetchingInitiativeByCustomerId,
  fetchingInitiativeByCustomerIdError:
    customer.fetchingInitiativeByCustomerIdError,
  topicsByCustomerId: customer.topicsByCustomerId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInitiativeByCustomerId,
      addInitiativeByCustomerId,
      deleteTopicByCustomerId,
      getLibrarys,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerTopicOfInterest);
