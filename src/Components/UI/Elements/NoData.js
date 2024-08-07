import React, { Component } from "react";
import { ApplicationWrapper } from "../Layout";
import {
  BellOutlined, PlusOutlined,FileFilled
  
} from '@ant-design/icons';

import { Title, SubTitle } from "./";

class NoData extends Component {
  render() {
    const { content } = this.props;

    return (
      <>
        <ApplicationWrapper>
        <div class=" flex flex-row flex-wrap items-center  self-start justify-center grow shrink h-[80vh] mr-auto ">
        <div class=" flex flex-col flex-wrap items-center self-center justify-center grow shrink h-auto mr-auto ">
          
              <FileFilled  type="file"  style={{ fontSize: "3.125em" }} />           
              <Title style={{ textAlign: "center" }}>
                Welcome to the {this.props.content || "Data"} tab.
              </Title>
              <SubTitle
                style={{
                  textAlign: "center",
                  color: "#1890ff",
                  cursor: "pointer",
                }}
                onClick={this.props.onClick || undefined}
              >
                Let us help you get started, click <PlusOutlined type="plus" /> Create{" "}
                {this.props.content || "Data"}
              </SubTitle>
            </div>
          </div>
        </ApplicationWrapper>
      </>
    );
  }
}

export default NoData;
