import React, { lazy, Suspense, Component } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
const SalaryDocumentForm =lazy(()=>import("./SalaryDocumentForm"));


class AddSalaryModal extends Component {
    render() {
        const { addSalaryModal, handleSalaryModal, ...formProps } = this.props;
        return (
            <>
                <StyledDrawer
                    //title="Salary"
                    title={<FormattedMessage
                        id="app.salary"
                        defaultMessage="Salary"
                    />}
                    width="49%"
                    visible={addSalaryModal}
                    onClose={() => handleSalaryModal(false)}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <SalaryDocumentForm />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default AddSalaryModal;
