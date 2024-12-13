import React, {  useState } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import { bindActionCreators } from "redux";
import {
  addTopicByCandidateId,
} from "../../../../CandidateAction";
import { getLibrarys } from "../../../../../Settings/Library/LibraryAction";
const { Option } = Select;
function CandidateSelect(props) {
  const [selectType, setSelectType] = useState("");
  
  function handleChange(selectType) {
    props.addTopicByCandidateId(
      {
        skillName: selectType,
        candidateId: props.candidateId,
      },
      props.userType
    );
  }

  return (
    <div>
      <Select style={{ width: "9rem" }} onChange={(e) => handleChange(e)}
        placeholder="Select">
      
        {props.librarys.map((item, i) => {
          return <Option value={item.name}>{item.name}</Option>;
        })}
      </Select>
    </div>
  );
}
const mapStateToProps = ({ candidate, auth, librarys }) => ({
  user: auth.userDetails,
  librarys: librarys.librarys,
  organizationId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addTopicByCandidateId,

      getLibrarys,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CandidateSelect);
