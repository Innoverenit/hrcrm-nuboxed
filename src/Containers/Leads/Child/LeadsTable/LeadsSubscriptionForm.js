import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Card, Col, Row, Layout } from 'antd';
import { getLeadSubscriptionData, addSubscriptionData, getSubscriptionCompare } from "../../LeadsAction";

const { Header, Content, Footer } = Layout;

function LeadsSubscriptionForm(props) {
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  console.log("Component Rendered");
  console.log(props.item)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        await props.getLeadSubscriptionData(props.orgId);
        await props.getSubscriptionCompare(props.item.leadsId);
        console.log("Data fetched successfully");
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [props.orgId, props.item.leadsId]);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
    '1588', // 0 Per Month Value
'1589', // 1 10% discount on additional services
'70', // 2 Calls

        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  useEffect(() => {
    console.log("Checking if data is loaded", { isDataLoaded, subscriptionLeadsData: props.subscriptionLeadsData, compareSubscription: props.compareSubscription });

    if (isDataLoaded && props.subscriptionLeadsData && props.compareSubscription) {
      const index = props.subscriptionLeadsData.findIndex(
        (sub) => sub.subscriptionId === props.compareSubscription.subscriptionId
      );

      console.log("Highlighted Index:", index);

      if (index !== -1) {
        setHighlightedIndex(index);
      } else {
        console.log("No matching subscriptionId found");
      }
    } else {
      console.log("Data not loaded yet or missing data");
    }
  }, [isDataLoaded, props.subscriptionLeadsData, props.compareSubscription]);

  const handleClick = (subscription, index) => {
    if (highlightedIndex !== index) { // Disable click if highlighted
      console.log("Card Clicked:", subscription);
      setClickedIndex(index);
      let data = {
        leadsId: props.item.leadsId,
        amount:subscription.perMonthValue,
        name:props.item.name,
        phone:props.item.phoneNumber,
        currency:"INR",
        email:props.item.email,
        // paymentId: "",
        userId:props.userId,
        orgId:props.orgId
        // paymentInd: true,
        // subscriptionId: subscription.subscriptionId,
        // validationFrom: "",
        // validationTo: ""
      };
      props.addSubscriptionData(data);
    }
  };
console.log(props.compareSubscription)
  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Row gutter={16}>
            {props.subscriptionLeadsData.map((subscription, index) => (
              <Col span={8} key={index}>
                <Card
                  title={subscription.subscriptionName}
                  bordered={false}
                  style={{
                    margin: '10px',
                    border: clickedIndex === index 
                      ? '2px solid #1890ff' 
                      : highlightedIndex === index 
                      ? '2px solid #52c41a' // Initial highlight color
                      : '1px solid #f0f0f0',
                    transition: 'border 0.3s ease', // Smooth transition
                    //opacity: highlightedIndex === index ? 0.5 : 1
                  }}
                  hoverable
                  onClick={() => handleClick(subscription, index)}
                >
                  <p>{translatedMenuItems[0]}: ₹{subscription.perMonthValue}</p>
                  {subscription.callInd && (
                    <p>{translatedMenuItems[2]}: {subscription.noOfcalls}</p>
                  )}
{subscription.ruleDto.map((item, index) => (
  <p key={index}>{item.ruleType}: {item.ruleValue}</p>
))}
<p style={{fontWeight:"bolder"}}>{translatedMenuItems[1]}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
     
    </Layout>
  );
}

const mapStateToProps = ({ auth, leads, subscription }) => ({
  userDetails: auth.userDetails,
  user: auth.userDetails,
  subscriptionLeadsData: leads.subscriptionLeadsData,
  organizationId: auth.userDetails.organizationId,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  compareSubscription: leads.compareSubscription,
  updatingSuscrption: subscription.updatingSuscrption,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLeadSubscriptionData,
      addSubscriptionData,
      getSubscriptionCompare
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsSubscriptionForm);






