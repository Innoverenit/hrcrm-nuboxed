// import React,{useEffect} from "react";
// import { Switch,Input, Button } from "antd";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {getApikey} from "../../../SettingsAction"

// function Logistictable(props) {


//   useEffect(() => {
//    props.getApikey(props.orgId)
//   }, []);

//     return (
//         <>
              
//          <div className=" flex justify-between">
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
//               placeholder="Auth Key"
//               name="firstName"
//               className="-ml-2"
//               // style={{marginLeft:"-6px"}}
          
//             /></div>
                  
//       <div> <Input
//               placeholder="Test Key"
//               name="firstName"
//               style={{marginLeft:"-6px"}}
          
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
//       <div> DTDC</div>
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
//               placeholder="Auth Key"
//               name="firstName"
//               style={{marginLeft:"-6px"}}
//             //   value="NAme"
//             //   onChange={handleInputChange}
//             /></div>
//             <div> <Input
//               placeholder="Test Key"
//               name="firstName"
//               style={{marginLeft:"-6px"}}
          
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
//       <div> DHL</div>
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
//               placeholder="Auth Key"
//               name="firstName"
//               style={{marginLeft:"-6px"}}
//             //   value="NAme"
//             //   onChange={handleInputChange}
//             /></div>
//             <div> <Input
//               placeholder="Test Key"
//               name="firstName"
//               style={{marginLeft:"-6px"}}
          
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
//       <div>UPS</div>
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
//               placeholder="Auth Key"
//               name="firstName"
//               style={{marginLeft:"-6px"}}
//             //   value="NAme"
//             //   onChange={handleInputChange}
//             /></div>
//             <div> <Input
//               placeholder="Test Key"
//               name="firstName"
//               style={{marginLeft:"-6px"}}
          
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
//       <div> Click Ship</div>
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
//               placeholder=" Auth Key"
//               name="firstName"
//               style={{marginLeft:"-6px"}}
//             //   value="NAme"
//             //   onChange={handleInputChange}
//             /></div>
//             <div> <Input
//               placeholder="Test Key"
//               name="firstName"
//               style={{marginLeft:"-6px"}}
          
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


// const mapStateToProps = ({ auth, account, opportunity }) => ({
//   userId: auth.userDetails.userId,
//   user: auth.userDetails,
//   orgId: auth.userDetails.organizationId,

// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getApikey
//     },
//     dispatch
//   );
// export default connect(mapStateToProps, mapDispatchToProps)(Logistictable);



// import React, { useState,useEffect } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {getApikey,addApi} from "../../../SettingsAction"
// import { Switch, Input, Row, Col, Button, Popconfirm } from "antd";

// const Logistictable = (props) => {
//   useEffect(() => {
//    props.getApikey(props.orgId)
//   }, []);
//   const [data, setData] = useState([
//     {
//       name: "ShipRocket",
//       liveInd: false,
//       apiValue1: null,
//       apiValue2: null,
//       apiValue3: null,
//       apiValue4: null,
//     },
//     {
//       name: "DTDC",
//       liveInd: false,
//       apiValue1: null,
//       apiValue2: null,
//       apiValue3: null,
//       apiValue4: null,
//     },
//     {
//       name: "DHL",
//       liveInd: false,
//       apiValue1: null,
//       apiValue2: null,
//       apiValue3: null,
//       apiValue4: null,
//     },
//     {
//       name: "UPS",
//       liveInd: false,
//       apiValue1: null,
//       apiValue2: null,
//       apiValue3: null,
//       apiValue4: null,
//     },
//     {
//       name: "Click Ship",
//       liveInd: false,
//       apiValue1: null,
//       apiValue2: null,
//       apiValue3: null,
//       apiValue4: null,
//     },
//   ]);

//   // Handler for the toggle switch after Popconfirm
//   const handleToggle = (checked, index) => {
//     const updatedData = [...data];
//     updatedData[index].liveInd = checked;
//     setData(updatedData);
//   };

//   // Handler for input changes
//   const handleInputChange = (e, index, key) => {
//     const updatedData = [...data];
//     updatedData[index][key] = e.target.value;
//     setData(updatedData);
//   };

//   // Submit handler for each row
//   const handleSubmit = (index) => {
//     console.log("Submitted Data:", data[index]);
//     props.addApi( data[index])
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       {data.map((item, index) => (
//         <Row key={index} gutter={[16, 16]} align="middle" style={{ marginBottom: "10px" }}>
//           <Col span={4}>
//             <strong>{item.name}</strong>
//           </Col>
//           <Col span={4}>
//             <Popconfirm
//               title={`Are you sure you want to ${item.liveInd ? "disable" : "enable"} ${item.name}?`}
//               onConfirm={() => handleToggle(!item.liveInd, index)}
//               okText="Yes"
//               cancelText="No"
//             >
//               <Switch 
//               checkedChildren="Visible"
//                        unCheckedChildren="Hidden"
//               checked={item.liveInd} />
//             </Popconfirm>
//           </Col>
//           <Col span={12}>
//             <Input
//               placeholder="API Value 1"
//               value={item.apiValue1}
//               onChange={(e) => handleInputChange(e, index, "apiValue1")}
//               style={{ width: "20%", marginRight: "10px" }}
//             />
//             <Input
//               placeholder="API Value 2"
//               value={item.apiValue2}
//               onChange={(e) => handleInputChange(e, index, "apiValue2")}
//               style={{ width: "20%", marginRight: "10px" }}
//             />
//             <Input
//               placeholder="API Value 3"
//               value={item.apiValue3}
//               onChange={(e) => handleInputChange(e, index, "apiValue3")}
//               style={{ width: "20%", marginRight: "10px" }}
//             />
//             <Input
//               placeholder="API Value 4"
//               value={item.apiValue4}
//               onChange={(e) => handleInputChange(e, index, "apiValue4")}
//               style={{ width: "20%" }}
//             />
//           </Col>
//           <Col span={4}>
//             <Button type="primary" onClick={() => handleSubmit(index)}>
//               Submit
//             </Button>
//           </Col>
//         </Row>
//       ))}
//       {/* <pre>{JSON.stringify(data, null, 2)}</pre>  */}
//       {/* For debugging */}
//     </div>
//   );
// };

// const mapStateToProps = ({ auth, account, opportunity }) => ({
//   userId: auth.userDetails.userId,
//   user: auth.userDetails,
//   orgId: auth.userDetails.organizationId,

// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getApikey,
//       addApi
//     },
//     dispatch
//   );
// export default connect(mapStateToProps, mapDispatchToProps)(Logistictable);





import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getApikey, addApi } from "../../../SettingsAction";
import { Switch, Input, Row, Col, Button, Popconfirm } from "antd";

const Logistictable = (props) => {
  useEffect(() => {
    props.getApikey(props.orgId);
  }, []);

  // Individual states for each logistic provider
  const [shipRocket, setShipRocket] = useState({
    liveInd: false,
    apiValue1: null,
    apiValue2: null,
    apiValue3: null,
    apiValue4: null,
  });

  const [dtdc, setDtdc] = useState({
    liveInd: false,
    apiValue1: null,
    apiValue2: null,
    apiValue3: null,
    apiValue4: null,
  });

  const [dhl, setDhl] = useState({
    liveInd: false,
    apiValue1: null,
    apiValue2: null,
    apiValue3: null,
    apiValue4: null,
  });

  const [ups, setUps] = useState({
    liveInd: false,
    apiValue1: null,
    apiValue2: null,
    apiValue3: null,
    apiValue4: null,
  });

  const [clickShip, setClickShip] = useState({
    liveInd: false,
    apiValue1: null,
    apiValue2: null,
    apiValue3: null,
    apiValue4: null,
  });

  // Handler for toggling switches
  const handleToggle = (checked, setState) => {
    setState((prev) => ({ ...prev, liveInd: checked }));
  };

  // Handler for input changes
  const handleInputChange = (e, key, setState) => {
    const value = e.target.value;
    setState((prev) => ({ ...prev, [key]: value }));
  };

  // Submit handler for each provider
  const handleSubmit = (state) => {
    console.log("Submitted Data:", state);
    props.addApi(state);
  };

  // Rendering each row for logistic providers
  const renderRow = (name, state, setState) => (
    <Row gutter={[16, 16]} align="middle" style={{ marginBottom: "10px" }}>
      <Col span={4}>
        <strong>{name}</strong>
      </Col>
      <Col span={4}>
        <Popconfirm
          title={`Are you sure you want to ${
            state.liveInd ? "disable" : "enable"
          } ${name}?`}
          onConfirm={() => handleToggle(!state.liveInd, setState)}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            checkedChildren="Visible"
            unCheckedChildren="Hidden"
            checked={state.liveInd}
          />
        </Popconfirm>
      </Col>
      <Col span={12}>
        <Input
          placeholder="API Value 1"
          value={state.apiValue1}
          onChange={(e) => handleInputChange(e, "apiValue1", setState)}
          style={{ width: "20%", marginRight: "10px" }}
        />
        <Input
          placeholder="API Value 2"
          value={state.apiValue2}
          onChange={(e) => handleInputChange(e, "apiValue2", setState)}
          style={{ width: "20%", marginRight: "10px" }}
        />
        <Input
          placeholder="API Value 3"
          value={state.apiValue3}
          onChange={(e) => handleInputChange(e, "apiValue3", setState)}
          style={{ width: "20%", marginRight: "10px" }}
        />
        <Input
          placeholder="API Value 4"
          value={state.apiValue4}
          onChange={(e) => handleInputChange(e, "apiValue4", setState)}
          style={{ width: "20%" }}
        />
      </Col>
      <Col span={4}>
        <Button type="primary" onClick={() => handleSubmit(state)}>
          Submit
        </Button>
      </Col>
    </Row>
  );

  return (
    <div style={{ padding: "20px" }}>
      {renderRow("ShipRocket", shipRocket, setShipRocket)}
      {renderRow("DTDC", dtdc, setDtdc)}
      {renderRow("DHL", dhl, setDhl)}
      {renderRow("UPS", ups, setUps)}
      {renderRow("Click Ship", clickShip, setClickShip)}
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getApikey,
      addApi,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Logistictable);

