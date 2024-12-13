import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {addApi,addHideFlow} from "../../../SettingsAction"
import { Switch, Input, Row, Col, Button, Popconfirm } from "antd";
import image1 from "../../../../../Assets/Images/DHL.webp";
import image2 from "../../../../../Assets/Images/shiprocket.webp";  
import image3 from "../../../../../Assets/Images/Dtdc.webp";  
import image4 from "../../../../../Assets/Images/ups.webp";
import image5 from "../../../../../Assets/Images/Clickship-new.webp";
import image6 from "../../../../../Assets/Images/fedex.webp";
import image7 from "../../../../../Assets/Images/Zoom-Logo.webp";
import image8 from "../../../../../Assets/Images/insta.webp";
import image9 from "../../../../../Assets/Images/awss3.webp";
import image10 from "../../../../../Assets/Images/email.webp";
import image11 from "../../../../../Assets/Images/WhatsApp.webp";
import image12 from "../../../../../Assets/Images/facebook-logo.webp";
import image13 from "../../../../../Assets/Images/sms.webp";
import image14 from "../../../../../Assets/Images/Google-Logo.webp";
import image15 from "../../../../../Assets/Images/tally.webp";
import image16 from "../../../../../Assets/Images/qb.webp";
import image17 from "../../../../../Assets/Images/paypal.webp";
import image18 from "../../../../../Assets/Images/razorpay.webp";
import image19 from "../../../../../Assets/Images/Stripe-Logo.webp";



const Logistictable = (props) => {
  console.log(props.apikey)
 
  const [data, setData] = useState(props.apikey
  //   [
  //   {
  //     name: "ShipRocket",
  //     liveInd: false,
  //     apiValue1: null,
  //     apiValue2: null,
  //     apiValue3: null,
  //     apiValue4: null,
  //   },
  //   {
  //     name: "DTDC",
  //     liveInd: false,
  //     apiValue1: null,
  //     apiValue2: null,
  //     apiValue3: null,
  //     apiValue4: null,
  //   },
  //   {
  //     name: "DHL",
  //     liveInd: false,
  //     apiValue1: null,
  //     apiValue2: null,
  //     apiValue3: null,
  //     apiValue4: null,
  //   },
  //   {
  //     name: "UPS",
  //     liveInd: false,
  //     apiValue1: null,
  //     apiValue2: null,
  //     apiValue3: null,
  //     apiValue4: null,
  //   },
  //   {
  //     name: "Click Ship",
  //     liveInd: false,
  //     apiValue1: null,
  //     apiValue2: null,
  //     apiValue3: null,
  //     apiValue4: null,
  //   },
  // ]
);


 useEffect(() => {
    if (props.apikey.length > 0) {
      // Update activeTab when data is available
      setData(props.apikey);
    }

  }, [props.apikey]);
  // Handler for the toggle switch after Popconfirm
  const handleToggle = (item,checked, index) => {
    const updatedData = [...data];
    updatedData[index].liveInd = checked;
    console.log(checked)
    setData(updatedData);
    props.addHideFlow(item.thirdPartyApiId,checked)
  };
  const imageMap = {
    "Dhl": image1,
    "Shiprocket": image2,
    "Dtdc": image3,
    "Ups": image4,
    "Click ship": image5,
    "Fedex": image6,
    "Zoom": image7,
    "Instagram": image8,
    "AWS S3": image9,
    "Email": image10,
    "Whatsapp": image11,
    "Facebook": image12,
    "Sms": image13,
    "Google": image14,
    "Tally": image15,
    "Quickbooks": image16,
    "Paypal": image17,
    "Razorpay": image18,
    "Stripe": image19,
    
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
    let result={
    
apiKey1: data[index].apiKey1,
apiKey2: data[index].apiKey2,
apiKey3: data[index].apiKey3,
apiKey4: data[index].apiKey4,
apiKey5: data[index].apiKey5,
thirdPartyApiId:data[index].thirdPartyApiId
    }
    props.addApi(result)
  };

  return (
    <div style={{ padding: "20px" }}>
      {data.map((item, index) => (
        <Row key={index} gutter={[16, 16]} align="middle" style={{ marginBottom: "10px" }}> 
          <Col span={4}>
            <Row
          justify="start"
          align="middle"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <img
            src={
              imageMap[item.thirdPartyName] 
            }
            alt={item.thirdPartyName}
            style={{
              width: "40px",
              height: "30px",
              margin: "5px",
            }}
          />
          <strong
  style={{
    fontFamily: "Poppins" }}>{item.thirdPartyName}</strong>
        </Row>
          </Col>
          <Col span={4}>
            <Popconfirm
              title={`Are you sure you want to ${item.hideInd ? "disable" : "enable"} ${item.thirdPartyName}?`}
               onConfirm={() => handleToggle(item,!item.hideInd, index)}
              okText="Yes"
              cancelText="No"
            >
              <Switch 
              checkedChildren="Visible"
                       unCheckedChildren="Hidden"
              checked={item.hideInd}
               />
            </Popconfirm>
          </Col>
          <Col span={12}>
            <Input
              placeholder="API Value 1"
              value={item.apiKey1}
              onChange={(e) => handleInputChange(e, index, "apiKey1")}
              style={{ width: "20%", marginRight: "10px" }}
            />
            <Input
              placeholder="API Value 2"
              value={item.apiKey2}
              onChange={(e) => handleInputChange(e, index, "apiKey2")}
              style={{ width: "20%", marginRight: "10px" }}
            />
            <Input
              placeholder="API Value 3"
              value={item.apiKey3}
              onChange={(e) => handleInputChange(e, index, "apiKey3")}
              style={{ width: "20%", marginRight: "10px" }}
            />
            <Input
              placeholder="API Value 4"
              value={item.apiKey4}
              onChange={(e) => handleInputChange(e, index, "apiKey4")}
              style={{ width: "20%" }}
            />
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={() => handleSubmit(index)}>
              Submit
            </Button>
          </Col>
        </Row>
      ))}
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
    
      addApi,
      addHideFlow
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Logistictable);
