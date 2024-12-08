import React, { Component } from "react";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { Title } from "./";

class NoData extends Component {
  render() {
    const { content } = this.props;

    return (
      <>
        <div class=" p-1 bg-light-gray ">
        <div class=" flex flex-row flex-wrap items-center  self-start justify-center grow shrink h-[80vh] mr-auto ">
          
              <TextSnippetIcon  type="file"  style={{ fontSize: "3.125em" }} />           
              <Title style={{ textAlign: "center" }}>
                Welcome to the {this.props.content || "Data"} tab.
              </Title>
              <div 
                style={{
                  textAlign: "center",
                  color: "#1890ff",
                  cursor: "pointer",
                }}
                onClick={this.props.onClick || undefined}
              >
                Let us help you get started, click <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]" /> Create{" "}
                {this.props.content || "Data"}
              </div >
            </div>
        </div>
      </>
    );
  }
}

export default NoData;
