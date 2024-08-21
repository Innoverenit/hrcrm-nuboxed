import React, { Component } from "react";
import { PlusOutlined,FileFilled
} from '@ant-design/icons';

import { Title, SubTitle } from "./";

class NoData extends Component {
  render() {
    const { content } = this.props;

    return (
      <>
        <div class=" p-1 bg-light-gray ">
        <div class=" flex flex-row flex-wrap items-center  self-start justify-center grow shrink h-[80vh] mr-auto ">
          
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
      </>
    );
  }
}

export default NoData;
