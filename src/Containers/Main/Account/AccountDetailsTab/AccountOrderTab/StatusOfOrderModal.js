import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { FormattedMessage } from 'react-intl';

const StatusOfOrder = lazy(() => import("./StatusOfOrder"));
class StatusOfOrderModal extends Component {
    render() {
        const {
            addStatusOfOrder,
            handleStatusOfOrder,
            particularRowData,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title={<div class="flex items-center">
                        <FormattedMessage id="app.statusoforder" defaultMessage="Status of Order #" /> -
                        {particularRowData.newOrderNo}
                    </div>}
                    width="60%"
                    visible={addStatusOfOrder}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => handleStatusOfOrder(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <StatusOfOrder particularRowData={particularRowData}
                        selectedLanguage={this.props.selectedLanguage}
                        translateText={this.props.translateText}
                         />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default StatusOfOrderModal;
