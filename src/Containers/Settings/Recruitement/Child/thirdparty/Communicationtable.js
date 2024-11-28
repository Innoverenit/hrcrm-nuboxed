// import React from "react";
// import { Switch,Input, Button } from "antd";

// function Communicationtable(props) {

//     return (
//         <>
            
//             <div className=" flex justify-between">
//       <div> Zoom </div>
//       <div>
//         <Switch
//     //     checked={includeVisible}
//     // onChange={() => toggleFieldVisibility('include')}
//           checkedChildren="Visible"
//             unCheckedChildren="Hidden"
//             // style={{ marginTop:" 4px "}}
//           />
//           </div>
//       <div> <Input
//               placeholder="First Name"
//               name="firstName"
//               style={{marginLeft:"-6px"}}
//             //   value="NAme"
//             //   onChange={handleInputChange}
//             /></div>
//       <div> <Button
//                 type="primary"
//                 htmlType="submit"
//                 // loading={props.addingCustomerConfig}
//               >
//                 <div class="font-bold font-poppins text-xs"> Submit</div>
             
//               </Button></div>
//         </div>
//         <div className=" flex justify-between">
//       <div>Whatsapp</div>
//       <div>
//         <Switch
//     //     checked={includeVisible}
//     // onChange={() => toggleFieldVisibility('include')}
//           checkedChildren="Visible"
//             unCheckedChildren="Hidden"
//             // style={{ marginTop:" 4px "}}
//           />
//           </div>
//       <div> <Input
//               placeholder="First Name"
//               name="firstName"
//               style={{marginLeft:"-6px"}}
//             //   value="NAme"
//             //   onChange={handleInputChange}
//             /></div>
//       <div> <Button
//                 type="primary"
//                 htmlType="submit"
//                 // loading={props.addingCustomerConfig}
//               >
//                 <div class="font-bold font-poppins text-xs"> Submit</div>
             
//               </Button></div>
//         </div>
//         <div className=" flex justify-between">
//       <div>Email</div>
//       <div>
//         <Switch
//     //     checked={includeVisible}
//     // onChange={() => toggleFieldVisibility('include')}
//           checkedChildren="Visible"
//             unCheckedChildren="Hidden"
//             // style={{ marginTop:" 4px "}}
//           />
//           </div>
//       <div> <Input
//               placeholder="First Name"
//               name="firstName"
//               style={{marginLeft:"-6px"}}
//             //   value="NAme"
//             //   onChange={handleInputChange}
//             /></div>
//       <div> <Button
//                 type="primary"
//                 htmlType="submit"
//                 // loading={props.addingCustomerConfig}
//               >
//                 <div class="font-bold font-poppins text-xs"> Submit</div>
             
//               </Button></div>
//         </div>
//         <div className=" flex justify-between">
//       <div>SMS</div>
//       <div>
//         <Switch
//     //     checked={includeVisible}
//     // onChange={() => toggleFieldVisibility('include')}
//           checkedChildren="Visible"
//             unCheckedChildren="Hidden"
//             // style={{ marginTop:" 4px "}}
//           />
//           </div>
//       <div> <Input
//               placeholder="First Name"
//               name="firstName"
//               style={{marginLeft:"-6px"}}
//             //   value="NAme"
//             //   onChange={handleInputChange}
//             /></div>
//       <div> <Button
//                 type="primary"
//                 htmlType="submit"
//                 // loading={props.addingCustomerConfig}
//               >
//                 <div class="font-bold font-poppins text-xs"> Submit</div>
             
//               </Button></div>
//         </div>
//         <div className=" flex justify-between">
//       <div> FaceBook</div>
//       <div>
//         <Switch
//     //     checked={includeVisible}
//     // onChange={() => toggleFieldVisibility('include')}
//           checkedChildren="Visible"
//             unCheckedChildren="Hidden"
//             // style={{ marginTop:" 4px "}}
//           />
//           </div>
//       <div> <Input
//               placeholder="First Name"
//               name="firstName"
//               style={{marginLeft:"-6px"}}
//             //   value="NAme"
//             //   onChange={handleInputChange}
//             /></div>
//       <div> <Button
//                 type="primary"
//                 htmlType="submit"
//                 // loading={props.addingCustomerConfig}
//               >
//                 <div class="font-bold font-poppins text-xs"> Submit</div>
             
//               </Button></div>
//         </div>
//         <div className=" flex justify-between">
//       <div> Shiprocket</div>
//       <div>
//         <Switch
//     //     checked={includeVisible}
//     // onChange={() => toggleFieldVisibility('include')}
//           checkedChildren="Visible"
//             unCheckedChildren="Hidden"
//             // style={{ marginTop:" 4px "}}
//           />
//           </div>
//       <div> <Input
//               placeholder="First Name"
//               name="firstName"
//               style={{marginLeft:"-6px"}}
//             //   value="NAme"
//             //   onChange={handleInputChange}
//             /></div>
//       <div> <Button
//                 type="primary"
//                 htmlType="submit"
//                 // loading={props.addingCustomerConfig}
//               >
//                 <div class="font-bold font-poppins text-xs"> Submit</div>
             
//               </Button></div>
//         </div>
//         <div className=" flex justify-between">
//       <div>Instagram</div>
//       <div>
//         <Switch
//     //     checked={includeVisible}
//     // onChange={() => toggleFieldVisibility('include')}
//           checkedChildren="Visible"
//             unCheckedChildren="Hidden"
//             // style={{ marginTop:" 4px "}}
//           />
//           </div>
//       <div> <Input
//               placeholder="First Name"
//               name="firstName"
//               style={{marginLeft:"-6px"}}
//             //   value="NAme"
//             //   onChange={handleInputChange}
//             /></div>
//       <div> <Button
//                 type="primary"
//                 htmlType="submit"
//                 // loading={props.addingCustomerConfig}
//               >
//                 <div class="font-bold font-poppins text-xs"> Submit</div>
             
//               </Button></div>
//         </div>
//         </>
//     );
// };
// export default Communicationtable;




import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import {getApikey,addApi} from "../../../SettingsAction"
import { Switch, Input, Row, Col, Button, Popconfirm } from "antd";

const CommunicationTable = (props) => {
  const [data, setData] = useState([
    {
      name: "Zoom",
      liveInd: false,
      apiValue1: null,
      apiValue2: null,
      apiValue3: null,
      apiValue4: null,
    },
    {
      name: "WhatsApp",
      liveInd: false,
      apiValue1: null,
      apiValue2: null,
      apiValue3: null,
      apiValue4: null,
    },
    {
      name: "Email",
      liveInd: false,
      apiValue1: null,
      apiValue2: null,
      apiValue3: null,
      apiValue4: null,
    },
    {
      name: "SMS",
      liveInd: false,
      apiValue1: null,
      apiValue2: null,
      apiValue3: null,
      apiValue4: null,
    },
    {
      name: "Facebook",
      liveInd: false,
      apiValue1: null,
      apiValue2: null,
      apiValue3: null,
      apiValue4: null,
    },
    {
      name: "Instagram",
      liveInd: false,
      apiValue1: null,
      apiValue2: null,
      apiValue3: null,
      apiValue4: null,
    },
  ]);

  // Handler for the toggle switch after Popconfirm
  const handleToggle = (checked, index) => {
    const updatedData = [...data];
    updatedData[index].liveInd = checked;
    setData(updatedData);
  };

  // Handler for input changes
  const handleInputChange = (e, index, key) => {
    const updatedData = [...data];
    updatedData[index][key] = e.target.value;
    setData(updatedData);
  };

  // Submit handler for each row
  const handleSubmit = (index) => {
    console.log("Submitted Data:", data[index]);
   // props.addApi( data[index])
  };

  return (
    <div style={{ padding: "20px" }}>
      {data.map((item, index) => (
        <Row key={index} gutter={[16, 16]} align="middle" style={{ marginBottom: "10px" }}>
          <Col span={4}>
            <strong>{item.name}</strong>
          </Col>
          <Col span={4}>
            <Popconfirm
              title={`Are you sure you want to ${item.liveInd ? "disable" : "enable"} ${item.name}?`}
              onConfirm={() => handleToggle(!item.liveInd, index)}
              okText="Yes"
              cancelText="No"
            >
              <Switch 
              checkedChildren="Visible"
                       unCheckedChildren="Hidden"
              checked={item.liveInd} />
            </Popconfirm>
          </Col>
          <Col span={12}>
            <Input
              placeholder="API Value 1"
              value={item.apiValue1}
              onChange={(e) => handleInputChange(e, index, "apiValue1")}
              style={{ width: "20%", marginRight: "10px" }}
            />
            <Input
              placeholder="API Value 2"
              value={item.apiValue2}
              onChange={(e) => handleInputChange(e, index, "apiValue2")}
              style={{ width: "20%", marginRight: "10px" }}
            />
            {/* <Input
              placeholder="API Value 3"
              value={item.apiValue3}
              onChange={(e) => handleInputChange(e, index, "apiValue3")}
              style={{ width: "20%", marginRight: "10px" }}
            />
            <Input
              placeholder="API Value 4"
              value={item.apiValue4}
              onChange={(e) => handleInputChange(e, index, "apiValue4")}
              style={{ width: "20%" }}
            /> */}
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={() => handleSubmit(index)}>
              Submit
            </Button>
          </Col>
        </Row>
      ))}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre>  */}
      {/* For debugging */}
    </div>
  );
};

const mapStateToProps = ({ auth, account, opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  orgId: auth.userDetails.organizationId,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getApikey,
      // addApi
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CommunicationTable);