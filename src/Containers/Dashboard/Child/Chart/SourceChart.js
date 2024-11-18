import React, { Component,lazy } from "react";
import { Tabs } from "antd";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";

const SourceMainChart=lazy(() => import("./SourceMainChart"));

const TabPane = Tabs.TabPane;

class SourceChart extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      {
        // title: "Source", 
        title: "Source"
       ,
        content: <SourceMainChart />,
        key: "1"
      },
      {
        // title: "Source", 
        title: "funnel"
    ,
        // content: <SourceMainChart />,
        key: "2"
      },
      {
        title:"Stages",
        
        // content: <SourceMainChart />,
        key: "3"
      },
     
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
  };

  render() {
    return (
      <TabsWrapper style={{ height: "36.4em" }}>
        <StyledTabs
          size={"small"}
          animated={true}
          onChange={this.onChange}
          activeKey={this.state.activeKey}
        >
          {this.state.panes.map((pane) => (
            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
              {pane.content}
            </TabPane>
          ))}
        </StyledTabs>
      </TabsWrapper>
    );
  }
}

export default SourceChart;
