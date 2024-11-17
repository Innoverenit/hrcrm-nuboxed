import React, { Component,lazy } from 'react';

const NotificationRow = lazy(() => import('./NotificationRow'))
class InAppNotificationSetting extends Component {
    render() {
        return (
            <>
                <NotificationRow
                    //label='New customer added'
                    label={<FormattedMessage
                        id="app.newcustomeradded"
                        defaultMessage="New customer added"
                    />}
                    enabled={true}
                />
                <NotificationRow
                    //label='New partner added'
                    label={<FormattedMessage
                        id="app.newpartneradded"
                        defaultMessage="New partner added"
                    />}
                    enabled={true}
                />
                <NotificationRow
                    // label='New advisor added'
                    label={<FormattedMessage
                        id="app.newadvisoradded"
                        defaultMessage="New advisor added"
                    />}
                    enabled={false}
                />
                <NotificationRow
                    // label='New contact added'
                    label={<FormattedMessage
                        id="app.newcontactadded"
                        defaultMessage="New contact added"
                    />}
                    enabled={true}
                />
                <NotificationRow
                    //label='New opportunity created'
                    label={<FormattedMessage
                        id="app.newopportunitycreated"
                        defaultMessage="New opportunity created"
                    />}
                    enabled={true}
                />
                <NotificationRow
                    //label='Opportunity status change'
                    label={<FormattedMessage
                        id="app.opportunitystatuschange"
                        defaultMessage="Opportunity status change"
                    />}
                    enabled={true}
                />
                <NotificationRow
                    //label='Opportunity Won / Lost'
                    label={<FormattedMessage
                        id="app.opportunitylon/lost"
                        defaultMessage="Opportunity Won / Lost"
                    />}
                    enabled={false}
                />
                <NotificationRow
                    //label='Call with contact - 15 min / 5 min before event'
                    label={<FormattedMessage
                        id="app.callwithcontact-15min/5minbeforeevent"
                        defaultMessage="Call with contact - 15 min / 5 min before event"
                    />}
                    enabled={true}
                />
                <NotificationRow
                    //label='Meeting - 15 min / 5 min before event'
                    label={<FormattedMessage
                        id="app.meeting-15min/5minbeforeevent"
                        defaultMessage="Meeting - 15 min / 5 min before event"
                    />}
                    enabled={true}
                />
                <NotificationRow
                    // label='Opportunity pipeline emailed monthly'
                    label={<FormattedMessage
                        id="app.opportunitypipelineemailedmonthly"
                        defaultMessage="Opportunity pipeline emailed monthly"
                    />}
                    enabled={true}
                />
                <NotificationRow
                    //label='Reach limit - storage (90%)'
                    label={<FormattedMessage
                        id="app.reachlimit-storage(90%)"
                        defaultMessage="Reach limit - storage (90%)"
                    />}
                    enabled={true}
                />
                <NotificationRow
                    //    label='Reach limit - storage (100%)'
                    label={<FormattedMessage
                        id="app.reachlimit-storage(100%)"
                        defaultMessage="Reach limit - storage (100%)"
                    />}
                    enabled={false}
                />
                <NotificationRow
                    //label='Password update / change'

                    label={<FormattedMessage
                        id="app.passwordupdate/change"
                        defaultMessage="Password update / change"
                    />}
                    enabled={false}
                />
                <NotificationRow
                    //label='Change password after every 90 days'
                    label={<FormattedMessage
                        id="app.changepasswordafterevery90days"
                        defaultMessage="Change password after every 90 days"
                    />}
                    enabled={true}
                />
            </>
        );
    }
}

export default InAppNotificationSetting;