import React, { Component } from 'react';
import NotificationRow from "./NotificationRow";


class PushNotificationSetting extends Component {
    render() {
        return (
            <>
                <NotificationRow
                    // label='New user added by Super user / Admin'
                    label={<FormattedMessage
                        id="app.newuseraddedbysuperuser/admin"
                        defaultMessage="New user added by Super user / Admin"
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
                    //label='Opportunity Won / Lost'
                    label={<FormattedMessage
                        id="app.opportunitylon/lost"
                        defaultMessage="Opportunity Won / Lost"
                    />}
                    enabled={true}
                />
                <NotificationRow
                    //label='Call with contact - 15 min / 5 min before event'
                    label={<FormattedMessage
                        id="app.callwithcontact-15min/5minbeforeevent"
                        defaultMessage="Call with contact - 15 min / 5 min before event"
                    />}
                    enabled={false}
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
                    //    label='Reach limit - storage (100%)'
                    label={<FormattedMessage
                        id="app.reachlimit-storage(100%)"
                        defaultMessage="Reach limit - storage (100%)"
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

export default PushNotificationSetting;