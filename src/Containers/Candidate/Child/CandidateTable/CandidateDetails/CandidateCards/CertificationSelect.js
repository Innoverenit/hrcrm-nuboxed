import React, {  useState, } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import { bindActionCreators } from "redux";
import {
    addCertificationByCandidateId,
} from "../../../../CandidateAction";
const { Option } = Select;
function CertificationSelect(props) {
  const [selectType, setSelectType] = useState("");
  
  function handleChange(selectType) {
  
    props.addCertificationByCandidateId(
      {
        candidateCertificationName: selectType,
        candidateId: props.candidateId,
      },
      props.userType
    );
  }

  return (
    <div>
      <Select style={{ width: "9rem" }} onChange={(e) => handleChange(e)}
        placeholder="Select">
      {props.certifications.map((item, i) => {
          return <Option value={item.name}>{item.name}</Option>;
        })}
      </Select>
    </div>
  );
}
const mapStateToProps = ({ candidate, auth, certifications }) => ({
  user: auth.userDetails,
  organizationId: auth.userDetails.organizationId,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addCertificationByCandidateId,
  
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CertificationSelect);

