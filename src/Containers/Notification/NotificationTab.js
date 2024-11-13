import React, { Component } from 'react'
import { Tabs} from 'antd';
// import { StyledTabs } from "../../Components/UI/Antd";
import PastNotification from './Child/PastNotification';
import {
    CalculatorOutlined,
    CalendarOutlined,
    DatabaseOutlined,
    EyeInvisibleOutlined,
   
    
  } from '@ant-design/icons';
import PresentNotification from './Child/PresentNotification';
import FutureNotification from './Child/FutureNotification';

const TabPane = Tabs.TabPane;

class NotificationTab extends Component {
    render() {
        return (
            <div>
                <Tabs defaultActiveKey={"2"} scrollToActive={true} style={{ width: 400 }}>
                    <TabPane key={"1"} tab={<span className=' !text-tab text-blue-500'><DatabaseOutlined type="database" />Previous</span>}>
                        <PastNotification />
                    </TabPane>
                    <TabPane key={"2"} tab={<span className=' !text-tab text-green-400'><CalendarOutlined type="calendar" />Today</span>}>
                        <PresentNotification />
                    </TabPane>
                    {/* <TabPane key={"3"} tab={<span style={{ color: 'tomato' }}><Icon type="line-chart" />Tommorow</span>}>
                        <FutureNotification />
                    </TabPane> */}
                </Tabs>
            </div>
        )
    }
}

export default NotificationTab;
