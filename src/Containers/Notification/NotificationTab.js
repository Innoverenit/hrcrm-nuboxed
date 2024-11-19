import React, { Component } from 'react';
import { Tabs} from 'antd';
import PastNotification from './Child/PastNotification';
  import DateRangeIcon from '@mui/icons-material/DateRange';
import PresentNotification from './Child/PresentNotification';
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked';

const TabPane = Tabs.TabPane;

class NotificationTab extends Component {
    render() {
        return (
            <div>
                <Tabs defaultActiveKey={"2"} scrollToActive={true} style={{ width: 400 }}>
                    <TabPane key={"1"} tab={<span className=' !text-tab text-blue-500'><DatasetLinkedIcon type="database" />Previous</span>}>
                        <PastNotification />
                    </TabPane>
                    <TabPane key={"2"} tab={<span className=' !text-tab text-green-400'><DateRangeIcon type="calendar" />Today</span>}>
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
