import React,{lazy} from "react";
import { connect } from "react-redux";
import {
  getCertification,
} from "../../../../../Settings/Recruitement/Child/Certification/CertificationAction";
import { bindActionCreators } from "redux";
import { Tag, Input, Tooltip, } from "antd";
import { ViewEditCard, } from "../../../../../../Components/UI/Elements";
import AddBoxIcon from '@mui/icons-material/AddBox';
import {
  addCertificationByUserId,
  getCertificationByUserId,
  deleteCertificationByUserId,
} from "../../../../EmployeeAction";
import { Select } from "antd";
const EmployeeCertificationSelect = lazy(() => import("./EmployeeCertificationSelect"));

// import CertificationSelect from "./CertificationSelect";

const { Option } = Select;
class EmployeeCertificationLibrary extends React.Component {
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
      employeeId,

      addCertificationByUserId,
    } = this.props;
    if (inputValue) {
      addCertificationByUserId(
        {
          employeeId: this.props.singleEmployee.employeeId,
          employeeCertificationName:inputValue.charAt(0).toUpperCase() +inputValue.substr(1),
          orgId:this.props.orgId,
          userId:this.props.userId,
        },
        this.props.singleEmployee.employeeId
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
      employeeId,

      addCertificationByUserId,
    } = this.props;
    // if (selectValue) {
      addCertificationByUserId(
        {
          employeeId: this.props.singleEmployee.employeeId,
          employeeCertificationName:"",
          orgId:this.props.orgId,
          userId:this.props.userId,
        },
        this.props.singleEmployee.employeeId
      );
    
    // this.setState({
    //   inputVisible: false,
    //   selectValue: "",
    // });
  };
  handleTopicDelete = ({ employeeCertificationLinkId, employeeId }) => {
    const { deleteCertificationByUserId } = this.props;
    deleteCertificationByUserId(employeeCertificationLinkId, employeeId);
  };

  saveInputRef = (input) => (this.input = input);
  componentDidMount = () => {
     this.props.getCertificationByUserId(this.props.singleEmployee.employeeId);
     this.props.getCertification(this.props.orgId)
  };

  render() {
    console.log("follow",this.props.length)

    const { tags, inputVisible, inputValue } = this.state;
    const {
      fetchingCertificationByUserId,
      fetchingCertificationByUserIdError,
      certificationByUserId,
      length,
    } = this.props;
    return (
      <ViewEditCard>
        {({ viewType }, toggleViewType) =>
          viewType === "view" ? (
            <div class=" h-[11rem]" >
           <div class=" flex justify-between items-center" >
               <div class=" flex items-center justify-center font-semibold mb-[0.2rem] text-xs"
              
              >
                Certification{" "}
              </div>
            
              <div>
                      <EmployeeCertificationSelect
                      certifications={this.props.certifications}
                      employeeId={this.props.singleEmployee.employeeId}
                      />
                      </div>
                      </div>
              {fetchingCertificationByUserId ? (
                <p>fetching Certification ...</p>
              ) : (
                certificationByUserId &&
                certificationByUserId.map((topic, index) => {
                  console.log(topic);
                  
                  const isLongTopic = topic.employeeCertificationName===null?[]:topic.employeeCertificationName.length >= 30;
                  const topicElem = (
                    <Tag
                      key={topic.employeeCertificationLinkId}
                      color="blue"
                      closable
                      onClose={() => this.handleTopicDelete(topic)}
                      style={{ marginBottom: "0.4rem" }}
                    >
                      {isLongTopic
                        ? `${topic.employeeCertificationName===null?[]:topic.employeeCertificationName.slice(0, 30)}...`
                        : topic.employeeCertificationName}
                    </Tag>
                  );
                  return isLongTopic ? (
                    <Tooltip
                      title={topic.employeeCertificationName}
                      key={topic.employeeCertificationLinkId}
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
               <div className=" mt-1">
              {!inputVisible && (
                <Tag
                  onClick={this.showInput}
                   visible={this.props.certificationByUserId.length===null?[]:this.props.certificationByUserId.length !== 30}
                  style={{ background: "#fff", borderStyle: "dashed" }}
                >
                  <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]" /> Certification
                </Tag>
              )}
              </div>
            </div>
          ) : null
        }
      </ViewEditCard>
    );
  }
}

const mapStateToProps = ({ employee, auth,certifications }) => ({
  user: auth.userDetails,
  certifications:certifications.certifications,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  fetchingCertificationByUserId: employee.fetchingCertificationByUserId,
  fetchingCertificationByUserIdError: employee.fetchingCertificationByUserIdError,
  certificationByUserId: employee.certificationByUserId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCertificationByUserId,
        addCertificationByUserId,
        deleteCertificationByUserId,
      getCertification
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeCertificationLibrary);

