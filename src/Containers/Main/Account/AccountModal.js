import React, { Suspense,lazy } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
import AccountIconForm from "./AccountIconForm";


const AccountModal = (props) => {
    const {RowData, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={props.RowData.name}
                width="60%"
                visible={props.accountModal}
                maskClosable={false}
                destroyOnClose
                onClose={() => props.handleAccountModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <AccountIconForm RowData={RowData} /> 
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AccountModal;
