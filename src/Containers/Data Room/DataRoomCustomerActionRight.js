import React, { Component } from 'react'
import { Button, Row, Col, Card, Tabs } from 'antd';


const { TabPane } = Tabs;
export class DataRoomCustomerActionRight extends Component {
  render() {
    return (
      <div>
         <Tabs defaultActiveKey="1">
          <TabPane tab="Quotation" key="1">
            Quotation content for 
            {/* {selectedPerson.name} */}
          </TabPane>
          <TabPane tab="Order" key="2">
            Task content for 
            {/* {selectedPerson.name} */}
          </TabPane>
          
        </Tabs>
        </div>
    )
  }
}

export default DataRoomCustomerActionRight