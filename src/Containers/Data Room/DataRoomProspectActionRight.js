import React, { Component } from 'react'
import ProspectQuotationListData from "./ProspectQuotationListData"
import { Button, Row, Col, Card, Tabs } from 'antd';


const { TabPane } = Tabs;
export class DataRoomProspectActionRight extends Component {
  render() {
    console.log(this.props.selectedPerson)
    return (
      <div>
        {/* By List */}
        {this.props.selectedPerson &&this.props.selectedButtonTab==="byList" &&( 
         <Tabs defaultActiveKey="1">
          <TabPane tab="Quotation" key="1">
          <ProspectQuotationListData
           selectedPersonData={this.props.selectedPersonData}
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage} 
          />
            {/* {selectedPerson.name} */}
          </TabPane>
          <TabPane tab="Task" key="2">
            Task content for 
            {/* {selectedPerson.name} */}
          </TabPane>
          <TabPane tab="Closed" key="3">
            Event content for 
            {/* {selectedPerson.name} */}
          </TabPane>
        </Tabs>
        )}



{this.props.selectedButtonTab==="bySector" && (
         
           <Tabs defaultActiveKey="1">
          <TabPane tab="Quotation" key="1">
            Quotation content for 
            {/* {selectedPerson.name} */}
          </TabPane>
          <TabPane tab="Task" key="2">
            Task content for 
            {/* {selectedPerson.name} */}
          </TabPane>
          <TabPane tab="Closed" key="3">
            Event content for 
            {/* {selectedPerson.name} */}
          </TabPane>
        </Tabs>
)}

{this.props.selectedButtonTab==="bySource" && (
        
           <Tabs defaultActiveKey="1">
          <TabPane tab="Quotation" key="1">
            Quotation content for 
            {/* {selectedPerson.name} */}
          </TabPane>
          <TabPane tab="Task" key="2">
            Task content for 
            {/* {selectedPerson.name} */}
          </TabPane>
          <TabPane tab="Closed" key="3">
            Event content for 
            {/* {selectedPerson.name} */}
          </TabPane>
        </Tabs>
)}
        </div>
    )
  }
}

export default DataRoomProspectActionRight