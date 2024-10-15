

// import React, { useState, useEffect } from "react";
// import {
//   websiteSingleMultiple,
//   getDistributionAutomation,
//   getDepartmentwiserUser,
// } from "../../../../Settings/SettingsAction";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { getDepartments } from "../../../Department/DepartmentAction";
// import { Input, Switch, Select, Button, Space, Row, Col } from "antd";

// const { Option } = Select;

// const AddMoreComponent = (props) => {
//   const [items, setItems] = useState([
//     { url: "", singleMultiInd: false, departmentId: null, asignedTOId: null, multyAsignedTOId: [] },
//   ]); // Separated fields for single and multiple user selection

//   useEffect(() => {
//     props.getDepartments();
//   }, []);

//   // Function to handle "Add More" button click
//   const addMore = () => {
//     setItems([
//       ...items,
//       { url: "", singleMultiInd: false, departmentId: null, asignedTOId: null, multyAsignedTOId: [] },
//     ]);
//   };

//   // Function to update the values when changed
//   const handleChange = (index, key, value) => {
//     const newItems = [...items];
//     newItems[index][key] = value;
//     setItems(newItems);

//     // Fetch users when department changes
//     if (key === "departmentId") {
//       props.getDepartmentwiserUser(value); // Trigger the API call to fetch department-wise users
//     }
//   };

//   // Function to handle the toggle between single and multiple user selection
//   const handleSwitchChange = (index, checked) => {
//     const newItems = [...items];
//     newItems[index].assigned = checked; // Set assigned status for single or multiple mode
//     setItems(newItems);
//   };

//   // Function to log updated values
//   const handleUpdate = (index) => {
//     console.log("Updated item:", items[index]);
//   };

//   return (
//     <div>
//       {items.map((item, index) => (
//         <Space key={index} direction="vertical" style={{ marginBottom: 16, width: "100%" }}>
//           <Row gutter={16}>
//             <Col span={6}>
//               <Input
//                 placeholder="Enter URL"
//                 value={item.url}
//                 onChange={(e) => handleChange(index, "url", e.target.value)}
//               />
//             </Col>
//             <Col span={4}>
//               <Switch
//                 checked={item.singleMultiInd}
//                 onChange={(checked) => handleSwitchChange(index, checked)}
//                 checkedChildren="Multiple"
//                 unCheckedChildren="Single"
//               />
//             </Col>
//             <Col span={6}>
//               <Select
//                 placeholder="Select Department"
//                 value={item.departmentId}
//                 onChange={(value) => handleChange(index, "departmentId", value)}
//                 style={{ width: "100%" }}
//               >
//                 {props.departments.map((dept) => (
//                   <Option key={dept.departmentId} value={dept.departmentId}>
//                     {dept.departmentName}
//                   </Option>
//                 ))}
//               </Select>
//             </Col>
//             <Col span={6}>
//               {item.singleMultiInd ? (
//                 // Multiple user select
//                 <Select
//                   mode="multiple"
//                   placeholder="Select Users"
//                   value={item.multyAsignedTOId}
//                   onChange={(value) => handleChange(index, "multyAsignedTOId", value)}
//                   style={{ width: "100%" }}
//                 >
//                   {props.departmentwiseUser.map((user) => (
//                     <Option key={user.employeeId} value={user.employeeId}>
//                       {user.empName}
//                     </Option>
//                   ))}
//                 </Select>
//               ) : (
//                 // Single user select
//                 <Select
//                   placeholder="Select User"
//                   value={item.asignedTOId}
//                   onChange={(value) => handleChange(index, "asignedTOId", value)}
//                   style={{ width: "100%" }}
//                 >
//                   {props.departmentwiseUser.map((user) => (
//                     <Option key={user.employeeId} value={user.employeeId}>
//                       {user.empName}
//                     </Option>
//                   ))}
//                 </Select>
//               )}
//             </Col>
//             <Col span={2}>
//               <Button type="primary" onClick={() => handleUpdate(index)}>
//                 Update
//               </Button>
//             </Col>
//           </Row>
//         </Space>
//       ))}
//       <Button type="dashed" onClick={addMore} style={{ width: "100%" }}>
//         Add More
//       </Button>
//     </div>
//   );
// };

// const mapStateToProps = ({ settings, departments, auth }) => ({
//   userId: auth.userDetails.userId,
//   departmentwiseUser: settings.departmentwiseUser,
//   distributionAutomation: settings.distributionAutomation,
//   orgId: auth.userDetails.organizationId,
//   departments: departments.departments,
//   updateWebsiteSingle: settings.updateWebsiteSingle,
//   updateWebsiteSingleError: settings.updateWebsiteSingleError,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       websiteSingleMultiple,
//       getDepartments,
//       getDepartmentwiserUser,
//       getDistributionAutomation,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(AddMoreComponent);



import React, { useState, useEffect } from "react";
import {
  websiteSingleMultiple,
//   getDistributionAutomation,
  getDepartmentwiserUser,
} from "../../../../Settings/SettingsAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDepartments } from "../../../Department/DepartmentAction";
import { Input, Switch, Select, Button, Space, Row, Col } from "antd";

const { Option } = Select;
const initialData=[
    {
  
asignedTOId
: 
"EMP62587859362232024",

departmentId
: 
"DEP39089123311122023",




multyAsignedTOId
: 
["EMP62587859362232024"],

singleMultiInd
: 
false,
type
: 
"lead",

url
: 
"talent.tekorero.com"

    }
    ]

const AddMoreComponent = (props) => {
  // Initialize state with initial data
//   const [items, setItems] = useState(
//     props.distributionAutomation.map((item) => ({
//       url: item.url || "",
//       assigned: item.singleMultiInd, // true for multiple, false for single
//       department: item.departmentId || null,
//       singleUser: item.asignedTOId || null,
//       multipleUsers: item.multyAsignedTOId || [],
//     }))
//   );
const [items, setItems] = useState([])

  useEffect(() => {
    props.getDepartments();
   // props.getDistributionAutomation(props.orgId,"lead");
  }, []);
  useEffect(() => {
    // Check if data is available
    if (props.distributionAutomation.length > 0) {
      
        setItems(props.distributionAutomation);
    }
  }, [props.distributionAutomation]);

  // Function to handle "Add More" button click
  const addMore = () => {
    setItems([
      ...items,
      { url: "", singleMultiInd: false, departmentId: null, asignedTOId: null, multyAsignedTOId: [],type:props.activeKey, },
    ]);
  };

  // Function to update the values when changed
  const handleChange = (index, key, value) => {
    const newItems = [...items];
    newItems[index][key] = value;
    setItems(newItems);

    // Fetch users when department changes
    if (key === "departmentId") {
      props.getDepartmentwiserUser(value);
    }
  };

  // Function to handle the toggle between single and multiple user selection
  const handleSwitchChange = (index, checked) => {
    const newItems = [...items];
    newItems[index].singleMultiInd = checked; // Set assigned status for single or multiple mode
    setItems(newItems);
  };

  // Function to log updated values
  const handleUpdate = (index) => {
    console.log("Updated item:", items[index]);
    props.websiteSingleMultiple(items[index],props.orgId,props.activeKey)
  };

  return (
    <div>
      {items.map((item, index) => (
        <Space key={index} direction="vertical" style={{ marginBottom: 16, width: "100%" }}>
          <Row gutter={16}>
            <Col span={6}>
              <Input
                placeholder="Enter URL"
                value={item.url}
                onChange={(e) => handleChange(index, "url", e.target.value)}
              />
            </Col>
            <Col span={4}>
              <Switch
                checked={item.singleMultiInd}
                onChange={(checked) => handleSwitchChange(index, checked)}
                checkedChildren="Multiple"
                unCheckedChildren="Single"
              />
            </Col>
            <Col span={6}>
              <Select
                placeholder="Select Department"
                value={item.departmentId}
                onChange={(value) => handleChange(index, "departmentId", value)}
                style={{ width: "100%" }}
              >
                {props.departments.map((dept) => (
                  <Option key={dept.departmentId} value={dept.departmentId}>
                    {dept.departmentName}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={6}>
              {item.singleMultiInd ? (
                // Multiple user select
                <Select
                  mode="multiple"
                  placeholder="Select Users"
                  value={item.multyAsignedTOId}
                  onChange={(value) => handleChange(index, "multyAsignedTOId", value)}
                  style={{ width: "100%" }}
                >
                  {props.departmentwiseUser.map((user) => (
                    <Option key={user.employeeId} value={user.employeeId}>
                      {user.empName}
                    </Option>
                  ))}
                </Select>
              ) : (
                // Single user select
                <Select
                  placeholder="Select User"
                  value={item.asignedTOId}
                  onChange={(value) => handleChange(index, "asignedTOId", value)}
                  style={{ width: "100%" }}
                >
                  {props.departmentwiseUser.map((user) => (
                    <Option key={user.employeeId} value={user.employeeId}>
                      {user.empName}
                    </Option>
                  ))}
                </Select>
              )}
            </Col>
            <Col span={2}>
              <Button type="primary" onClick={() => handleUpdate(index)}>
                Update
              </Button>
            </Col>
          </Row>
        </Space>
      ))}
      <Button type="dashed" onClick={addMore} style={{ width: "100%" }}>
        Add More
      </Button>
    </div>
  );
};

const mapStateToProps = ({ settings, departments, auth }) => ({
  userId: auth.userDetails.userId,
  departmentwiseUser: settings.departmentwiseUser,
  //distributionAutomation: settings.distributionAutomation,
  orgId: auth.userDetails.organizationId,
  departments: departments.departments,
  updateWebsiteSingle: settings.updateWebsiteSingle,
  updateWebsiteSingleError: settings.updateWebsiteSingleError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      websiteSingleMultiple,
      getDepartments,
      getDepartmentwiserUser,
    //   getDistributionAutomation,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddMoreComponent);




