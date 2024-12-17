import React from "react";
import { connect } from "react-redux";
import {
  getCertification,
} from "../../../../../Settings/Recruitement/Child/Certification/CertificationAction";
import { bindActionCreators } from "redux";
import { Tag, Input, Tooltip, } from "antd";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ViewEditCard,  } from "../../../../../../Components/UI/Elements";
import {
  addCertificationByCandidateId,
  getCertificationByCandidateId,
  deleteCertificationByCandidateId,
} from "../../../../CandidateAction";
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
          candidateId: this.props.uniqueId,
          certificationName:inputValue.charAt(0).toUpperCase() +inputValue.substr(1),
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

      addCertificationByCandidateId,
    } = this.props;
      addCertificationByCandidateId(
        {
          candidateId: this.props.uniqueId,
          certificationName:"",
        },
        this.props.userType
      );
  };
  handleTopicDelete = ({ candiCertiLinkId, candidateId }) => {
    const { deleteCertificationByCandidateId } = this.props;
    deleteCertificationByCandidateId(this.props.userType,candiCertiLinkId, candidateId);
  };

  saveInputRef = (input) => (this.input = input);
  componentDidMount = () => {
     this.props.getCertificationByCandidateId(this.props.userType,this.props.uniqueId);
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
            <div class=" h-44" >
            <div class=" flex items-center justify-around mb-3" >
            <div className=" font-bold font-poppins text-xs mb-1 ">
                Certification{" "}
              </div>
            
              <div>
                      <CertificationSelect
                      certifications={this.props.certifications}
                      candidateId={this.props.uniqueId}
                      userType={this.props.userType}
                      />
                      </div>
                      </div>
              {fetchingCertificationByCandidateId ? (
                <p>fetching Certification ...</p>
              ) : (
                certificationByCandidateId &&
                certificationByCandidateId.map((topic, index) => {
                  console.log(topic);
                  
                  const isLongTopic = topic.certificationName===null?[]:topic.certificationName.length >= 30;
                  const topicElem = (
                    <Tag
                      key={topic.candiCertiLinkId}
                      color="blue"
                      closable
                      onClose={() => this.handleTopicDelete(topic)}
                      style={{ marginBottom: "0.4rem" }}
                    >
                      {isLongTopic
                        ? `${topic.certificationName===null?[]:topic.certificationName.slice(0, 30)}...`
                        : topic.certificationName}
                    </Tag>
                  );
                  return isLongTopic ? (
                    <Tooltip
                      title={topic.certificationName}
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
                  <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]" /> Certification
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

