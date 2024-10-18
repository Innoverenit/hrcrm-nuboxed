
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import { addOpportunitySkills} from "../../OpportunityAction";
import { StyledTable } from "../../../../Components/UI/Antd";
import { Button, } from "antd";
import Input from "antd/es/input/Input";

const includesMulti = (elements, inArray) => {
  const unmatched = inArray.slice();
  for (const element of elements) {
    const matchIndex = unmatched.indexOf(element);
    if (matchIndex === -1) return false;
    unmatched.splice(matchIndex, 1);
  }
  return true;
};


const backenddata=[ 
  {
  noOfPosition: "6",
  oppInnitiative: "IDG165422547152022",
  opportunityId:  "OIG95455684217172023",
  opportunitySkillLinkId : "OSLG86304798635172023",
  orgId: "OIF73746229259222021",
  definationId: "DEIN5473703404692022",
  skillName :  "Admin",
  userId: "EMP16818052295222021",
  }
]



function OpportunityInitiativeForm(props) {
 

  useEffect(() => {
    // props.getSkillsCount(props.candidatePostData.recruitmentId,props.organizationId,);
    // props.getCountries();
       
  }, []);
 

  // const [initiative, setInitiative] = useState(initiativeNameOption);
  const [input, setInput] = useState([]);
  const [row, setselectedRowKeys] = useState(null);
  function handleChange(e, item) {
    setInput([...input, { ...item, noOfPosition: e.target.value }]);
  }
  function handleSend() {
    console.log(row, input);

    const data = input.filter((item, i) => {
      if (item.definationId === row[i]) {
        return item
        
      }
      
    
    });
    const newData=data.map((item)=>{
      return {
        skill:item.definationId,
        noOfPosition:item.noOfPosition

      }
    }
    )
    console.log("new",newData)
    console.log(data)
    props.addOpportunitySkills(
      {
        opportunitySkill:newData,
        oppInnitiative:props.item.oppInnitiative,
        opportunityId:props.item.opportunityId
        // candidateIds: selectedRowData,
        // document:selectType
      },
      
    );
    console.log(data);
  }
  console.log(input);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setselectedRowKeys(selectedRowKeys);
    }
  };

  const data1=props.opportunityInitiativesSkillsDetails.map((item)=>{
    return item
    
  })

  console.log("detoc",data1&&data1.noOfPosition)

  // const initiativeNameOption = props.opportunityInitiativesSkillsDetails.map((item) => {
  //   return item.noOfPosition
  // }
  // )

  // useEffect(() => {
  //   console.log("helo")
  //   const initiativeNameOption = props.opportunityInitiativesSkillsDetails.map((item) => {
  //     return item.noOfPosition
  //   }

  //   );
  
  //   setInitiative(initiativeNameOption)
   
  // }, [props.opportunityInitiativesSkillsDetails]);



  

  const columns = [


    {
      title: "",
      dataIndex: "imageId",
      width: "3%",
      // render: (name, item, i) => {
      //   return (
      //     <SubTitle>
      //       <MultiAvatar
      //         primaryTitle={item.firstName}
      //         imageId={item.imageId}
      //         imageURL={item.imageURL}
      //         imgWidth={"2.5em"}
      //         imgHeight={"2.5em"}
      //       />
      //     </SubTitle>
      //   );
      // },
    },

    {
      title:"Skills",
      dataIndex:"name"
    },
    {
      title: "Value",
      render: (text, item) => (
        <span>
          <Input 
          onChange={(e) => handleChange(e, item)} 
          // defaultValue={initiative}
          />
        </span>
      )
    }
  ];

console.log("check",row)

  return (
    <>
          
      <StyledTable
        rowKey="definationId"
        columns={columns}
        dataSource={props.opportunitySkills}
        scroll={{ y: 460 }}
        loading={props.fetchingOpportunitySkills}
        rowSelection={rowSelection}
        pagination={false}
      />
      <Button type="primary"
      onClick={handleSend}
      disabled={row===null}
      >Select</Button>
    </>
  );
}
// }
const mapStateToProps = ({ auth, opportunity }) => ({

  // organizationId: auth.userDetails.organizationId,
  // skillsCount:opportunity.skillsCount,
  // userId:auth.userDetails.userId,
  // user: auth.userDetails,
  // role: auth.userDetails.role,
  // countries:auth.countries,
  // fetchingRecruiter: opportunity.fetchingRecruiter,
  // opportunityId: opportunity.opportunity.opportunityId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addOpportunitySkills
      // LinkCandidateRecruit,
      // LinkRecruitCandidate,
      // getSkillsCount,
      // getRecruiter,
      // getCountries
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityInitiativeForm);










