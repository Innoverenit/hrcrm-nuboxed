import React, { useEffect,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import dayjs from "dayjs";
import { StyledTable } from "../../../../Components/UI/Antd";
const EmailSkillLoadMore = lazy(() =>
  import("../CandidateTable/EmailSkillLoadMore")
);


function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function ChooseCandidateEmailTable(props) {
  useEffect(() => {
   // props.getOpportunityListByCustomerId(props.customerId);
  }, []);

  const {
    chooseCandidateEmail,
    tablevalue,
    handleUpdateCustomerOpportunityModal,
    fetchingCustomerOpportunity,
    opportunityByCustomerId,
    fetchingCustomerOpportunityError,
    addUpdateCustomerOpportunityModal,
    setEditCustomerOpportunity,
  } = props;
  const data =["Name"]
  console.log("td",tablevalue)
  const columns = [
    {
      title: "",
      width: "2%",
    },
    {
      title: "",
      dataIndex: "imageId",
      width: "5%",
   
    },
    {
      // title: "Name",
      title: (
        <FormattedMessage id="app.name" defaultMessage="Name" />
      ),
      hidden:tablevalue.includes("Name") ? false : true,
      dataIndex: "name",
      defaultSortOrder: "ascend",
      width: "20%",
     
      
    },
    
    {
   
        title:"Role",
      hidden:tablevalue.includes("Role") ? false : true,
        
   
    
      
   
     
      dataIndex: "role",
      width: "20%",
       
      },
    
  
    

    
  
    {
      //title: "End Date",
      title: <FormattedMessage id="app.availlabillity" defaultMessage="Availability" />,
     hidden:tablevalue.includes("Available") ? false : true,
      dataIndex: "availableDate",
      width: "20%",
      render: (text, item) => {
        const endDate = dayjs(item.availableDate).format("ll");
        return <span>{endDate}</span>;
    },
  },
    {
      //title: "Value",
      title: (
        <FormattedMessage
          id="app.mobile"
          defaultMessage="Mobile"
        />
      ),
     hidden:tablevalue.includes("Mobile") ? false : true,
      dataIndex: "mobileNo",
      width: "20%",
   
    },

    {
      //title: "sponsor",
      title: (
        <FormattedMessage
          id="app.email"
          defaultMessage="Email"
        />
      ),
     hidden:tablevalue.includes("Email") ? false : true,
      dataIndex: "email",
      width: "20%",
     
    },
   

    {
      title: "Skill",
     hidden:tablevalue.includes("Skill") ? false : true,
      //dataIndex: "skill",
      width:"8%",
      render: (name, item, i) => {
        const data=item.skill===null?[]:item.skill.filter((skill)=>{
         return skill!==null&&skill!==""
        }
        )
      
         return <>
  
          
           <span>
             <EmailSkillLoadMore
             skill={data}
             />
           </span>
       
        
           </>
         
       },
    
    
    },
  ].filter((item) => !item.hidden);
 
  return (
    <>
      <StyledTable
        // rowSelection={rowSelection}
        rowKey="opportunityId"
        columns={columns}
        dataSource={
            chooseCandidateEmail
        }
        scroll={{ y: 460 }}
        pagination={false
          // defaultPageSize: 15,
          // showSizeChanger: true,
          // pageSizeOptions: ["15", "25", "40", "50"],
        }
      />
      {/* <AddCustomerUpdateOpportunityModal
      opportunityId={currentOpportunityId}
       addUpdateCustomerOpportunityModal={addUpdateCustomerOpportunityModal}
        handleUpdateCustomerOpportunityModal={handleUpdateCustomerOpportunityModal}
        handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
        
      /> */}
    </>
  );
}
// }
const mapStateToProps = ({ customer ,candidate}) => ({
  tablevalue:candidate.tablevalue
//   fetchingCustomerOpportunity: customer.fetchingCustomerOpportunity,
//   fetchingCustomerOpportunityError: customer.fetchingCustomerOpportunityError,
//   customerId: customer.customer.customerId,
//   opportunityByCustomerId: customer.opportunityByCustomerId,
//   addUpdateCustomerOpportunityModal:customer.addUpdateCustomerOpportunityModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   getOpportunityListByCustomerId,
    //   handleUpdateCustomerOpportunityModal,
    //   setEditCustomerOpportunity,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ChooseCandidateEmailTable);
