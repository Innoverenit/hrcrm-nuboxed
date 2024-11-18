import React, { Component } from 'react';
import NotificationRow from "./NotificationRow";


class PushNotificationSetting extends Component {
    render() {
        return (
            <>
                <NotificationRow
                    label='New user added by Super user / Admin'
                    enabled={true}
                />
                <NotificationRow
                    label='New opportunity created'
                    enabled={true}
                />
                <NotificationRow
                    label='Opportunity Won / Lost'
                    enabled={true}
                />
                <NotificationRow
                    label='Call with contact - 15 min / 5 min before event'
                    enabled={false}
                />
                <NotificationRow
                    label='Meeting - 15 min / 5 min before event'
                    enabled={true}
                />
                <NotificationRow
                    label='Opportunity pipeline emailed monthly'
                    enabled={true}
                />
                <NotificationRow
                       label='Reach limit - storage (100%)'
                    enabled={false}
                />
                <NotificationRow
                    label='Change password after every 90 days'
                 
                    enabled={true}
                />
            </>
        );
    }
}

export default PushNotificationSetting;