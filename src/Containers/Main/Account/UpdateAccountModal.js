import React, { Suspense,lazy } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const UpdateAccountForm =lazy(()=>import("./UpdateAccountForm"));


const UpdateAccountModal = (props) => {
    const {RowData, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={props.RowData.name}
                width="60%"
                visible={props.updateAccountModal}
                maskClosable={false}
                destroyOnClose
                onClose={() => props.handleUpdateAccountModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <UpdateAccountForm RowData={RowData} 
                    selectedLanguage={props.selectedLanguage}
                    translateText={props.translateText}/>
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default UpdateAccountModal;
