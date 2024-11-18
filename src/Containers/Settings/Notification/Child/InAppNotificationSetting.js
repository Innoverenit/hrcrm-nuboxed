import React, { Component,lazy } from 'react';

const NotificationRow = lazy(() => import('./NotificationRow'))
class InAppNotificationSetting extends Component {
    render() {
        return (
            <>
                <NotificationRow
                    label='New customer added'
                    enabled={true}
                />
                <NotificationRow
                    label='New partner added'
                    enabled={true}
                />
                <NotificationRow
                    label='New advisor added'
                    enabled={false}
                />
                <NotificationRow
                    label='New contact added'
                    enabled={true}
                />
                <NotificationRow
                    label='New opportunity created'
                    enabled={true}
                />
                <NotificationRow
                    label='Opportunity status change'
                    enabled={true}
                />
                <NotificationRow
                    label='Opportunity Won / Lost'
                    enabled={false}
                />
                <NotificationRow
                    label='Call with contact - 15 min / 5 min before event'
                    enabled={true}
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
                    label='Reach limit - storage (90%)'
                    enabled={true}
                />
                <NotificationRow
                       label='Reach limit - storage (100%)'
                    enabled={false}
                />
                <NotificationRow
                    label='Password update / change'
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

export default InAppNotificationSetting;