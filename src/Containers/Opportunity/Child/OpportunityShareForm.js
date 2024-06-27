import React, {useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getOpportunityPermissionsList,shareOpportunityPermission,getRecords } from "../OpportunityAction";
import { StyledSelect } from "../../../Components/UI/Antd";

const Option =StyledSelect;

function OpportunityShareForm(props) {
  useEffect(() => {
    props.getOpportunityPermissionsList();
  }, []);
  const permissionListForAll = props.permissionsDataList.map((item) => {
    return item.userId;
  });
  function handleChange(value){
    if(value === "all"){
    props.shareOpportunityPermission(
      {
        type: "opportunity",
        user: permissionListForAll,
      },
      value,
      "All"
    );
    }else{
      props.shareOpportunityPermission(
        {
          type: "candidate",
          user: [value],
        },
        value,
      
      );
    }
  }
  // console.log(props.shareUsers);
  const findLoginData=props.permissionsDataList.find((element)=>{
           if(element.userId === props.userId){
                return element.userName
          }
      });
  console.log("findLoginData",findLoginData&& findLoginData.userName);
  return (
    <>
    {findLoginData &&
      <StyledSelect
      defaultValue={props.fullName}
        style={{ width: 140 }}
        placeholder="Select to View"
        onChange={(e) => handleChange(e)}
      >
        <Option value={"all"}>{"All"} </Option>
        {props.permissionsDataList.map((item) => {
          return <Option value={item.userId}>{item.userName} </Option>;
        })}
      </StyledSelect>
       }
    </>
  );
}

const mapStateToProps = ({ opportunity,auth }) => ({
  addSharingOpportunity: opportunity.addSharingOpportunity,
  userId:auth.userDetails.userId,
  permissionsDataList: opportunity.permissionsDataList,
  fullName:(auth.userDetails.fullName),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      shareOpportunityPermission,
      getOpportunityPermissionsList,
      getRecords,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityShareForm);

