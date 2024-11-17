import React, { lazy, Suspense } from "react";

import { StyledModal } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
// import TaskForm from "./TaskForm";
const AddLeavesModal = (props) => {
    const { addLeavesModal, handleLeavesModal, ...formProps } = props;
    console.log(props.selectedTask);

    return (
        <>
            <StyledModal
                //title="Schedule Task"
                label={<FormattedMessage
                    id="app.scheduletask"
                    defaultMessage="Schedule Task"
                />}
                width="55vw"
                visible={addLeavesModal}
                maskClosable={false}
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onCancel={() => handleLeavesModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    {/* <TaskForm {...formProps} selectedTask={props.selectedTask} /> */}
                </Suspense>
            </StyledModal>
        </>
    );
};

export default AddLeavesModal;
