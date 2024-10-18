import React, { Component } from "react";
import { Tag, Checkbox } from "antd";
import styled from "styled-components";
import { Title, HeaderText, SubTitle } from "../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";

class SubscriptionConfirmationContent extends Component {
  handleChange = (type) => {
    this.props.handleChooseSubscription(type);
  };

  render() {
    const { type } = this.props;
    console.log(type);
    return (
      <div>
        <>
          <HeaderText>
            <FormattedMessage
              id="app.changeinsubscriptionwillbeappliedforallyourusers"
              defaultMessage="Change in Subscription will be applied for all your users"
            />,
      {/* Change in Subscription will be applied for all your users */}
          </HeaderText>
          <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
            <PlanBox isActive={type === "STARTER"}>
              <Checkbox
                checked={type === "STARTER"}
                disabled={type === "STARTER"}
                onChange={() => this.handleChange("STARTER")}
              ></Checkbox>
              <Title
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  marginTop: "-0.9375em",
                  color: this.props.type === "STARTER" ? "white" : "black",
                }}
              >
                STARTER{type === "STARTER " && <Tag> Selected</Tag>}
              </Title>
              <br />
              <SubTitle
                style={{
                  color: this.props.type === "STARTER" ? "white" : "black",
                }}
              >
                10,000 contacts
              </SubTitle>
              <br />
              <SubTitle
                style={{
                  color: this.props.type === "STARTER" ? "white" : "black",
                }}
              >
                Multi currency support
              </SubTitle>
              <br />
              <SubTitle
                style={{
                  color: this.props.type === "STARTER" ? "white" : "black",
                }}
              >
                1 GB storage
              </SubTitle>
              <br />
              <SubTitle
                style={{
                  color: this.props.type === "STARTER" ? "white" : "black",
                }}
              >
                Funnel management
              </SubTitle>
              <br />
              <SubTitle
                style={{
                  color: this.props.type === "STARTER" ? "white" : "black",
                }}
              >
                Reports & Dashboards
              </SubTitle>
              <br />
              <SubTitle
                style={{
                  color: this.props.type === "STARTER" ? "white" : "black",
                }}
              >
                Email support
              </SubTitle>
              <br />
            </PlanBox>
            <PlanBox isActive={type === "ENTERPRISE"}>
              <Checkbox
                checked={type === "ENTERPRISE"}
                disabled={type === "ENTERPRISE"}
                onChange={() => this.handleChange("ENTERPRISE")}
              ></Checkbox>
              <Title
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  marginTop: "-0.9375em",
                  color: this.props.type !== "STARTER" ? "white" : "black",
                }}
              >
                ENTERPRISE {type === "ENTERPRISE " && <Tag> Selected</Tag>}
              </Title>
              <br />
              <SubTitle
                style={{
                  color: this.props.type !== "STARTER" ? "white" : "black",
                }}
              >
                Features available in STARTER
              </SubTitle>
              <br />
              <SubTitle
                style={{
                  color: this.props.type !== "STARTER" ? "white" : "black",
                }}
              >
                Unlimited contacts
              </SubTitle>
              <br />
              <SubTitle
                style={{
                  color: this.props.type !== "STARTER" ? "white" : "black",
                }}
              >
                5 GB storage space
              </SubTitle>
              <br />
              <SubTitle
                style={{
                  whiteSpace: "normal",
                  color: this.props.type !== "STARTER" ? "white" : "black",
                }}
              >
                In built algorithms to aid sales management
              </SubTitle>
              <br />
              <SubTitle
                style={{
                  color: this.props.type !== "STARTER" ? "white" : "black",
                }}
              >
                Team management
              </SubTitle>
              <br />
            </PlanBox>
          </div>
        </>
      </div>
    );
  }
}

export default SubscriptionConfirmationContent;

const PlanBox = styled.div`
      height: 18.75em;
      width:13.75em;
      margin: 0.3rem;
      padding: 0.5rem;
      border: 0.0625em solid ${(props) => (props.isActive ? "#40a0db" : "black")}
      background-color:  ${(props) => (props.isActive ? "#40a0db" : "")}
      /* width: 45%; */
      border-top: 0.0625em solid ${(props) => (props.isActive ? "#40a0db" : "black")}
      primaryColor: ${(props) => (props.isActive ? "#40a0db" : "black")}
  checkbox
  
        `;
