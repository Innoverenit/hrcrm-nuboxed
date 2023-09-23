import React from "react";
import { connect } from "react-redux";
import {
  getCertification,
} from "../../../../../Settings/Recruitement/Child/Certification/CertificationAction";
import { bindActionCreators } from "redux";
import { Tag, Input, Tooltip, Icon } from "antd";
import {
  EyeInvisibleOutlined, PlusOutlined,
} from '@ant-design/icons';
import { ViewEditCard, Title, Spacer } from "../../../../../../Components/UI/Elements";
import {
  addCertificationByCandidateId,
  getCertificationByCandidateId,
  deleteCertificationByCandidateId,
} from "../../../../CandidateAction";
//import { getCertification } from "../../../../../Settings/Recruitement/Child/Certification/CertificationAction";
import { Select } from "antd";
import CertificationSelect from "./CertificationSelect";

const { Option } = Select;
class certificationLibrary extends React.Component {
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
      candidateId,

      addCertificationByCandidateId,
    } = this.props;
    if (inputValue) {
      addCertificationByCandidateId(
        {
          candidateId: this.props.candidate.candidateId,
          candidateCertificationName:inputValue.charAt(0).toUpperCase() +inputValue.substr(1),
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

      addCertificationByCandidateId,
    } = this.props;
    // if (selectValue) {
      addCertificationByCandidateId(
        {
          candidateId: this.props.candidate.candidateId,
          candidateCertificationName:"",
        },
        this.props.candidate.candidateId
      );
    
    // this.setState({
    //   inputVisible: false,
    //   selectValue: "",
    // });
  };
  handleTopicDelete = ({ candiCertiLinkId, candidateId }) => {
    const { deleteCertificationByCandidateId } = this.props;
    deleteCertificationByCandidateId(candiCertiLinkId, candidateId);
  };

  saveInputRef = (input) => (this.input = input);
  componentDidMount = () => {
     this.props.getCertificationByCandidateId(this.props.candidate.candidateId);
     this.props.getCertification(this.props.orgId)
  };

  render() {
    console.log("follow",this.props.length)

    const { tags, inputVisible, inputValue } = this.state;
    const {
      fetchingCertificationByCandidateId,
      fetchingCertificationByCandidateIdError,
      certificationByCandidateId,
      length,
    } = this.props;
    return (
      <ViewEditCard>
        {({ viewType }, toggleViewType) =>
          viewType === "view" ? (
            <div style={{ height: "11em" }}>
               <div style={{display:"flex"}}>
              <Title
                fontSize="0.875em"
                style={{ fontWeight: 600, marginBottom: "0.2rem" }}
              >
                Certification{" "}
              </Title>
            
              <div>
                      <CertificationSelect
                      certifications={this.props.certifications}
                      candidateId={this.props.candidate.candidateId}
                      />
                      </div>
                      </div>
              {fetchingCertificationByCandidateId ? (
                <p>fetching Certification ...</p>
              ) : (
                certificationByCandidateId &&
                certificationByCandidateId.map((topic, index) => {
                  console.log(topic);
                  
                  const isLongTopic = topic.candidateCertificationName===null?[]:topic.candidateCertificationName.length >= 30;
                  const topicElem = (
                    <Tag
                      key={topic.candiCertiLinkId}
                      color="blue"
                      closable
                      onClose={() => this.handleTopicDelete(topic)}
                      style={{ marginBottom: "0.4rem" }}
                    >
                      {isLongTopic
                        ? `${topic.candidateCertificationName===null?[]:topic.candidateCertificationName.slice(0, 30)}...`
                        : topic.candidateCertificationName}
                    </Tag>
                  );
                  return isLongTopic ? (
                    <Tooltip
                      title={topic.candidateCertificationName}
                      key={topic.candiCertiLinkId}
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
                   visible={this.props.certificationByCandidateId.length===null?[]:this.props.certificationByCandidateId.length !== 30}
                  style={{ background: "#fff", borderStyle: "dashed" }}
                >
                  <PlusOutlined type="plus" /> Certification
                </Tag>
              )}
            </div>
          ) : null
        }
      </ViewEditCard>
    );
  }
}

const mapStateToProps = ({ candidate, auth,certifications }) => ({
  user: auth.userDetails,
  certifications:certifications.certifications,
  orgId: auth.userDetails.organizationId,
  fetchingCertificationByCandidateId: candidate.fetchingCertificationByCandidateId,
  fetchingCertificationByCandidateIdError: candidate.fetchingCertificationByCandidateIdError,
  certificationByCandidateId: candidate.certificationByCandidateId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getCertificationByCandidateId,
      addCertificationByCandidateId,
      deleteCertificationByCandidateId,
      getCertification
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(certificationLibrary);

