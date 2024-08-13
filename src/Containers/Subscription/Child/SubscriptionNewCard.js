


// import React, { useState,useEffect } from 'react';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { base_url } from "../../../Config/Auth";
// import {addSuscrptions,getSubscrptions,addSubRules} from "../SubscriptionAction"
// import { Card, Button, Input, Switch,Select, Form } from 'antd';


// const { Option } = Select;


// const SubscriptionManager = (props) => {
//   const [subscriptions, setSubscriptions] = useState([]);

//   const [isLoadingRuleType, setIsLoadingRuleType] = useState(false);

//   const [touchedRuleType, setTouchedRuleType] = useState(false);


//   const [ruleType, setRuleType] = useState([]);

//   const [isLoadingSector, setIsLoadingSector] = useState(false);
  
//   useEffect(() => {
    
   
//     props.getSubscrptions(props.orgId);
 
// }, [props.orgId]);
// console.log(props.subscriptionsFormData)
// useEffect(() => {
//   // Check if data is available
//   if (props.subscriptionsFormData.length > 0) {
    
//     setSubscriptions(props.subscriptionsFormData);
//   }
// }, [props.subscriptionsFormData]);

//   const addSubscription = () => {
//     setSubscriptions([
//       ...subscriptions,
//       { callInd: false, noOfcalls: '', perMonthValue: '', subscriptionId: null, subscriptionName: '', publishInd: false,ruleDto:[] }
//     ]);
//   };

//   const removeSubscription = (id) => {
//     setSubscriptions(subscriptions.filter(sub => sub.subscriptionId !== id));
//   };

//   const handleInputChange = (index, field, value) => {
//     const newSubscriptions = [...subscriptions];
//     newSubscriptions[index][field] = value;
//     setSubscriptions(newSubscriptions);
//   };

//   const handleSwitchChange = (index, field, checked,ruleIndex) => {
//     const newSubscriptions = [...subscriptions];
//     const rule = updatedSubscription.ruleDto[ruleIndex];
//     newSubscriptions[index][field] = checked;
//     setSubscriptions(newSubscriptions);

//     const updatedSubscription = newSubscriptions[index];
//     let data = {
//       callInd: updatedSubscription.callInd,
//       description: "",
//       liveInd: true,
//       noOfcalls: updatedSubscription.noOfcalls || 0,
//       orgId: props.orgId,
//       perMonthValue: updatedSubscription.perMonthValue || 0,
//       subscriptionId: updatedSubscription.subscriptionId || null,
//       subscriptionName: updatedSubscription.subscriptionName,
//       userId: props.userId,
//       publishInd: updatedSubscription.publishInd,
//       subscriptionRuleId: rule ? rule.subscriptionRuleId : null, // Print null if rule doesn't exist
//       ruleTypeId: rule ? rule.ruletypeId : null,                 // Print null if rule doesn't exist
//       ruleValue: rule ? rule.rulevalue : null
//     };
//     props.addSuscrptions(data,updatedSubscription.subscriptionId);
//   };




//   const handleRuleChange = (subIndex, ruleIndex, field, value) => {
//     const newSubscriptions = [...subscriptions];
//     newSubscriptions[subIndex].ruleDto[ruleIndex][field] = value;
//     setSubscriptions(newSubscriptions);
//   };

//   const handlePressEnter = (index,ruleIndex) => {
//     const updatedSubscription = subscriptions[index];
   
//     const rule = updatedSubscription.ruleDto ? updatedSubscription.ruleDto[ruleIndex] : null;
//     console.log({
//       callInd: updatedSubscription.callInd,
//       createdBy: "string",
//       creationDate: "2024-08-05T07:22:47.795Z",
//       description: "string",
//       liveInd: true,
//       noOfcalls: updatedSubscription.noOfcalls || 0,
//       orgId: "string",
//       perMonthValue: updatedSubscription.perMonthValue || 0,
//       subscriptionId: updatedSubscription.subscriptionId || null,
//       subscriptionName: updatedSubscription.subscriptionName,
//       updatedBy: "string",
//       updationDate: "2024-08-05T07:22:47.796Z",
//       userId: "string",
//       publishInd: updatedSubscription.publishInd
//     });
//     let data={
//       callInd: updatedSubscription.callInd,
//       // createdBy: "string",
//       // creationDate: "2024-08-05T07:22:47.795Z",
//       description: "",
//       liveInd: true,
//       noOfcalls: updatedSubscription.noOfcalls || 0,
//       orgId: props.orgId,
//       perMonthValue: updatedSubscription.perMonthValue || 0,
//       subscriptionId: updatedSubscription.subscriptionId || null,
//       subscriptionName: updatedSubscription.subscriptionName,
//       // updatedBy: "string",
//       // updationDate: "2024-08-05T07:22:47.796Z",
//       userId: props.userId,
//       publishInd: updatedSubscription.publishInd,
//       subscriptionRuleId: rule ? rule.subscriptionRuleId : null, // Print null if rule doesn't exist
//       ruleTypeId: rule ? rule.ruletypeId : null,                 // Print null if rule doesn't exist
//       ruleValue: rule ? rule.rulevalue : null
//     }
//     props.addSuscrptions(data,updatedSubscription.subscriptionId)
//   };


//   const addRule = (subIndex) => {
//     const newSubscriptions = [...subscriptions];
//     newSubscriptions[subIndex].ruleDto.push({
//       subscriptionRuleId: null,
//       ruletypeId: null, // Initially null until an event is selected
//       rulevalue: ''
//     });
//     setSubscriptions(newSubscriptions);
//   };


//   const handleSelectRuleType = () => {
//     if (!touchedRuleType) {
     
//       fetchSelectRuleType();

//       setTouchedRuleType(true);
//     }
//   };



//   const fetchSelectRuleType = async () => {
//     setIsLoadingRuleType(true);
//     try {
//       const apiEndpoint = ` ${base_url}/task/todo/taskType-eventType/subscription/drop-down/${props.orgId}`;
//       const response = await fetch(apiEndpoint,{
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${props.token}`,
//           'Content-Type': 'application/json',
//           // Add any other headers if needed
//         },
//       });
//       const data = await response.json();
//       setRuleType(data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     } finally {
//       setIsLoadingRuleType(false);
//     }
//   };

//   const handleValueChange = (index, ruleIndex) => {
//     const updatedSubscription = subscriptions[index];
   
//     const rule = updatedSubscription.ruleDto ? updatedSubscription.ruleDto[ruleIndex] : null;

//     console.log({
    
//       subscriptionId: updatedSubscription.subscriptionId || null,
//       subscriptionRuleId: rule ? rule.subscriptionRuleId : null, // Print null if rule doesn't exist
//       ruleTypeId: rule ? rule.ruletypeId : null,                 // Print null if rule doesn't exist
//       ruleValue: rule ? rule.rulevalue : null,
//       orgId: props.orgId,
//       userId:props.userId
//     });
//     let data={
//       subscriptionId: updatedSubscription.subscriptionId || null,
//       subscriptionRuleId: rule ? rule.subscriptionRuleId : null, // Print null if rule doesn't exist
//       ruleTypeId: rule ? rule.ruletypeId : null,                 // Print null if rule doesn't exist
//       ruleValue: rule ? rule.rulevalue : null
//     }
//     props.addSubRules(data)
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <Button type="primary" onClick={addSubscription}>Add Subscription</Button>
//       <div style={{ 
//         display: 'flex', 
//         flexWrap: 'wrap', 
//         height: '500px', 
//         overflowY: 'scroll', 
//         marginTop: '20px', 
//         border: '1px solid #ccc', 
//         padding: '10px' 
//       }}>

//         {subscriptions.map((sub, subIndex) => (
//           <Card
//             // key={index}
//             key={sub.subscriptionId || subIndex}
//             style={{ width: 300, margin: '10px' }}
//             // actions={[
//             //    <Button type="primary" htmlType="submit">Submit</Button>,
//             //   <Button type="danger" onClick={() => removeSubscription(sub.subscriptionId)}>Remove</Button>
//             // ]}
//           >
//             <Form layout="vertical">
//               <Form.Item
//                 label="Name"
//                 required
//                 rules={[{ required: true, message: 'Please enter the name' }]}
//               >
//                 <Input
//                   value={sub.subscriptionName}
//                   onChange={(e) => handleInputChange(subIndex, 'subscriptionName', e.target.value)}
//                   placeholder="Enter name"
//                   onPressEnter={() => handlePressEnter(subIndex)}
//                 />
//               </Form.Item>
//               <Form.Item
//                 label="Per month value"
//                 required
//                 rules={[{ required: true, message: 'Please enter the per month value' }]}
//               >
//                 <Input
//                   value={sub.perMonthValue}
//                   onChange={(e) => handleInputChange(subIndex, 'perMonthValue', e.target.value)}
//                   placeholder="Enter per month value"
//                   onPressEnter={() => handlePressEnter(subIndex)}
//                 />
//               </Form.Item>
//               <Form.Item label="Calls">
//                 <Switch
//                   checked={sub.callInd}
//                     checkedChildren="Yes"
//                         unCheckedChildren="No"
//                   onChange={(checked) => handleSwitchChange(subIndex, 'callInd', checked)}
//                 />
//                 {sub.callInd && (
//                   <Input
//                     value={sub.noOfcalls}
//                     onChange={(e) => handleInputChange(subIndex, 'noOfcalls', e.target.value)}
//                     style={{ marginTop: '10px' }}
//                     placeholder="Enter calls value"
//                     onPressEnter={() => handlePressEnter(subIndex)}
//                   />
//                 )}
//               </Form.Item>
//               <Form.Item label="Publish">
//                 <Switch
//                   checked={sub.publishInd}
//                     checkedChildren="Yes"
//                         unCheckedChildren="No"
//                   onChange={(checked) => handleSwitchChange(subIndex, 'publishInd', checked)}
//                 />
//               </Form.Item>
//               <div>
//                 <h4>More Rules</h4>
//                 {sub.ruleDto.map((rule, ruleIndex) => (
//                   <div key={ruleIndex} style={{ display: 'flex', marginBottom: '10px' }}>
//                     <Select
//                       value={rule.ruletypeId}
//                       onFocus={handleSelectRuleType}
//                       loading={isLoadingRuleType}
//                       onChange={(value) => handleRuleChange(subIndex, ruleIndex, 'ruletypeId', value)}
//                       style={{ width: 120, marginRight: '10px' }}
//                       placeholder="Select event"
//                     >
//                         {ruleType.map(rule => (
//           <Option key={rule.
//             typeId
//             } value={rule.
//               typeId
//               }>
//             {rule.type}
//           </Option>
//         ))}
//                     </Select>
//                     <Input
//                       value={rule.rulevalue}
//                       onChange={(e) => handleRuleChange(subIndex, ruleIndex, 'rulevalue', e.target.value)}
//                       placeholder="Enter value"
                     
//                       onPressEnter={() => handleValueChange(subIndex, ruleIndex)}
//                       disabled={!rule.ruletypeId} // Disable until event is selected
//                     />
//                   </div>
//                 ))}
//                 <Button type="dashed" onClick={() => addRule(subIndex)} style={{ width: '100%' }}>
//                   + Add Rule
//                 </Button>
//               </div>
//             </Form>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };
// const mapStateToProps = ({ auth,subscription, partner }) => ({
//   orgId:auth.userDetails.organizationId,
//   userId:auth.userDetails.userId,
//   token: auth.token,
//   subscriptionsFormData: subscription.subscriptionsFormData,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       addSuscrptions,
//       getSubscrptions,
//       addSubRules
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionManager);















import React, { useState,useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { base_url } from "../../../Config/Auth";
import {addSuscrptions,getSubscrptions,addSubRules} from "../SubscriptionAction"
import { Card, Button, Input, Switch,Select, Form } from 'antd';


const { Option } = Select;


const SubscriptionManager = (props) => {
  const [subscriptions, setSubscriptions] = useState([]);

  const [isLoadingRuleType, setIsLoadingRuleType] = useState(false);

  const [touchedRuleType, setTouchedRuleType] = useState(false);


  const [ruleType, setRuleType] = useState([]);

  const [isLoadingSector, setIsLoadingSector] = useState(false);
  
  useEffect(() => {
    
   
    props.getSubscrptions(props.orgId);
 
}, [props.orgId]);
console.log(props.subscriptionsFormData)
useEffect(() => {
  // Check if data is available
  if (props.subscriptionsFormData.length > 0) {
    
    setSubscriptions(props.subscriptionsFormData);
  }
}, [props.subscriptionsFormData]);

  const addSubscription = () => {
    setSubscriptions([
      ...subscriptions,
      { callInd: false, noOfcalls: '', perMonthValue: '', subscriptionId: null, subscriptionName: '', publishInd: false,ruleDto:[], description: '', }
    ]);
  };

  const removeSubscription = (id) => {
    setSubscriptions(subscriptions.filter(sub => sub.subscriptionId !== id));
  };

  const handleInputChange = (index, field, value) => {
    const newSubscriptions = [...subscriptions];
    newSubscriptions[index][field] = value;
    setSubscriptions(newSubscriptions);
  };

  const handleSwitchChange = (index, field, checked,ruleIndex) => {
    const newSubscriptions = [...subscriptions];
    const updatedSubscription = newSubscriptions[index];
    const rule = updatedSubscription.ruleDto[ruleIndex];
    newSubscriptions[index][field] = checked;
    setSubscriptions(newSubscriptions);

    
    let data = {
      callInd: updatedSubscription.callInd,
      description: "",
      liveInd: true,
      description: updatedSubscription.description,
      noOfcalls: updatedSubscription.noOfcalls || 0,
      orgId: props.orgId,
      perMonthValue: updatedSubscription.perMonthValue || 0,
      subscriptionId: updatedSubscription.subscriptionId || null,
      subscriptionName: updatedSubscription.subscriptionName,
      userId: props.userId,
      publishInd: updatedSubscription.publishInd,
      subscriptionRuleId: rule ? rule.subscriptionRuleId : null, // Print null if rule doesn't exist
      ruleTypeId: rule ? rule.ruleTypeId : null,                 // Print null if rule doesn't exist
      ruleValue: rule ? rule.ruleValue : null
    };
    props.addSuscrptions(data,updatedSubscription.subscriptionId);
  };




  const handleRuleChange = (subIndex, ruleIndex, field, value) => {
    const newSubscriptions = [...subscriptions];
    newSubscriptions[subIndex].ruleDto[ruleIndex][field] = value;
    setSubscriptions(newSubscriptions);
  };

  // const handleRuleChange = (subIndex, ruleIndex, field, value) => {
  //   const newSubscriptions = [...subscriptions];
  //   if (field === 'ruleTypeId') {
  //     newSubscriptions[subIndex].ruleDto[ruleIndex][field] = value.value; // Store the ID
  //     newSubscriptions[subIndex].ruleDto[ruleIndex].ruleTypeName = value.label; // Store the name
  //   } else {
  //     newSubscriptions[subIndex].ruleDto[ruleIndex][field] = value;
  //   }
  //   setSubscriptions(newSubscriptions);
  // };
  

  const handlePressEnter = (index,ruleIndex) => {
    const updatedSubscription = subscriptions[index];
   
    const rule = updatedSubscription.ruleDto ? updatedSubscription.ruleDto[ruleIndex] : null;
    console.log({
      callInd: updatedSubscription.callInd,
      createdBy: "string",
      creationDate: "2024-08-05T07:22:47.795Z",
      description: "string",
      liveInd: true,
      noOfcalls: updatedSubscription.noOfcalls || 0,
      orgId: "string",
      perMonthValue: updatedSubscription.perMonthValue || 0,
      subscriptionId: updatedSubscription.subscriptionId || null,
      subscriptionName: updatedSubscription.subscriptionName,
      updatedBy: "string",
      updationDate: "2024-08-05T07:22:47.796Z",
      userId: "string",
      publishInd: updatedSubscription.publishInd
    });
    let data={
      callInd: updatedSubscription.callInd,
      // createdBy: "string",
      // creationDate: "2024-08-05T07:22:47.795Z",
      description: "",
      liveInd: true,
      description: updatedSubscription.description,
      noOfcalls: updatedSubscription.noOfcalls || 0,
      orgId: props.orgId,
      perMonthValue: updatedSubscription.perMonthValue || 0,
      subscriptionId: updatedSubscription.subscriptionId || null,
      subscriptionName: updatedSubscription.subscriptionName,
      // updatedBy: "string",
      // updationDate: "2024-08-05T07:22:47.796Z",
      userId: props.userId,
      publishInd: updatedSubscription.publishInd,
      subscriptionRuleId: rule ? rule.subscriptionRuleId : null, // Print null if rule doesn't exist
      ruleTypeId: rule ? rule.ruleTypeId : null,                 // Print null if rule doesn't exist
      ruleValue: rule ? rule.ruleValue : null
    }
    props.addSuscrptions(data,updatedSubscription.subscriptionId)
  };


  const addRule = (subIndex) => {
    const newSubscriptions = [...subscriptions];
    newSubscriptions[subIndex].ruleDto.push({
      subscriptionRuleId: null,
      ruleTypeId: null, // Initially null until an event is selected
      ruleValue: ''
    });
    setSubscriptions(newSubscriptions);
  };


  const handleSelectRuleType = () => {
    if (!touchedRuleType) {
     
      fetchSelectRuleType();

      setTouchedRuleType(true);
    }
  };



  const fetchSelectRuleType = async () => {
    setIsLoadingRuleType(true);
    try {
      const apiEndpoint = ` ${base_url}/task/todo/taskType-eventType/subscription/drop-down/${props.orgId}`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setRuleType(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingRuleType(false);
    }
  };

  const handleValueChange = (index, ruleIndex) => {
    const updatedSubscription = subscriptions[index];
   
    const rule = updatedSubscription.ruleDto ? updatedSubscription.ruleDto[ruleIndex] : null;

    console.log({
    
      subscriptionId: updatedSubscription.subscriptionId || null,
      subscriptionRuleId: rule ? rule.subscriptionRuleId : null, // Print null if rule doesn't exist
      ruleTypeId: rule ? rule.ruleTypeId : null,                 // Print null if rule doesn't exist
      ruleValue: rule ? rule.ruleValue : null,
      orgId: props.orgId,
      userId:props.userId
    });
    let data={
      subscriptionId: updatedSubscription.subscriptionId || null,
      subscriptionRuleId: rule ? rule.subscriptionRuleId : null, // Print null if rule doesn't exist
      ruleTypeId: rule ? rule.ruleTypeId : null,                 // Print null if rule doesn't exist
      ruleValue: rule ? rule.ruleValue : null,
      orgId: props.orgId,
      userId:props.userId
    }
    props.addSubRules(data)
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button type="primary" onClick={addSubscription}>Add Subscription</Button>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        height: '500px', 
        overflowY: 'scroll', 
        marginTop: '20px', 
        border: '1px solid #ccc', 
        padding: '10px' 
      }}>

        {subscriptions.map((sub, subIndex) => (
          <Card
            // key={index}
            key={sub.subscriptionId || subIndex}
            style={{ width: 300, margin: '10px' }}
            // actions={[
            //    <Button type="primary" htmlType="submit">Submit</Button>,
            //   <Button type="danger" onClick={() => removeSubscription(sub.subscriptionId)}>Remove</Button>
            // ]}
          >
            <Form layout="vertical">
              <Form.Item
                label="Name"
                required
                rules={[{ required: true, message: 'Please enter the name' }]}
              >
                <Input
                  value={sub.subscriptionName}
                  onChange={(e) => handleInputChange(subIndex, 'subscriptionName', e.target.value)}
                  placeholder="Enter name"
                  onPressEnter={() => handlePressEnter(subIndex)}
                />
              </Form.Item>
              <Form.Item
                label="Per month value"
                required
                rules={[{ required: true, message: 'Please enter the per month value' }]}
              >
                <Input
                  value={sub.perMonthValue}
                  onChange={(e) => handleInputChange(subIndex, 'perMonthValue', e.target.value)}
                  placeholder="Enter per month value"
                  onPressEnter={() => handlePressEnter(subIndex)}
                />
              </Form.Item>
              <Form.Item label="Calls">
                <Switch
                  checked={sub.callInd}
                    checkedChildren="Yes"
                        unCheckedChildren="No"
                  onChange={(checked) => handleSwitchChange(subIndex, 'callInd', checked)}
                />
                {sub.callInd && (
                  <Input
                    value={sub.noOfcalls}
                    onChange={(e) => handleInputChange(subIndex, 'noOfcalls', e.target.value)}
                    style={{ marginTop: '10px' }}
                    placeholder="Enter calls value"
                    onPressEnter={() => handlePressEnter(subIndex)}
                  />
                )}
              </Form.Item>
              <Form.Item label="Publish">
                <Switch
                  checked={sub.publishInd}
                    checkedChildren="Yes"
                        unCheckedChildren="No"
                  onChange={(checked) => handleSwitchChange(subIndex, 'publishInd', checked)}
                />
              </Form.Item>
              <Form.Item
                label="Description"
                required
                rules={[{ required: true, message: 'Please enter the description' }]}
              >
                <Input.TextArea
                  value={sub.description}
                  onPressEnter={() => handlePressEnter(subIndex)}
                  onChange={(e) => handleInputChange(subIndex, 'description', e.target.value)}
                  placeholder="Enter description"
                />
              </Form.Item>
              <div>
                <h4>More Rules</h4>
                {sub.ruleDto.map((rule, ruleIndex) => (
                  <div key={ruleIndex} style={{ display: 'flex', marginBottom: '10px' }}>
                    <Select
                    // value={rule.ruleTypeId ? { value: rule.ruleTypeId, label: rule.ruleType } : undefined}
                      value={rule.ruleTypeId}
                      onFocus={handleSelectRuleType}
                      loading={isLoadingRuleType}
                      onChange={(value) => handleRuleChange(subIndex, ruleIndex, 'ruleTypeId', value)}
                      style={{ width: 120, marginRight: '10px' }}
                      placeholder="Select event"
                    >
                        {ruleType.map(rule => (
          <Option key={rule.
            typeId
            } value={rule.
              typeId
              }>
            {rule.type}
          </Option>
        ))}
                    </Select>
                    <Input
                      value={rule.ruleValue}
                      onChange={(e) => handleRuleChange(subIndex, ruleIndex, 'ruleValue', e.target.value)}
                      placeholder="Enter value"
                     
                      onPressEnter={() => handleValueChange(subIndex, ruleIndex)}
                      disabled={!rule.ruleTypeId} // Disable until event is selected
                    />
                  </div>
                ))}
                <Button type="dashed" onClick={() => addRule(subIndex)} style={{ width: '100%' }}>
                  + Add Rule
                </Button>
              </div>
            </Form>
          </Card>
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = ({ auth,subscription, partner }) => ({
  orgId:auth.userDetails.organizationId,
  userId:auth.userDetails.userId,
  token: auth.token,
  subscriptionsFormData: subscription.subscriptionsFormData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addSuscrptions,
      getSubscrptions,
      addSubRules
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionManager);