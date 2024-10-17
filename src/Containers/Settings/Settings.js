import React, { Component, lazy, Suspense } from "react";
const NotificationSetting = lazy(() => import( "./Notification/NotificationSetting"));
const AddRecruitmentDrawerModal = lazy(() => import( "../Settings/Recruitement/Child/RecruitmentTab/AddRecruitmentDrawerModal"));
class Settings extends Component {
    render() {
        const {
            addDrawerRecruitmentModal,
            handleRecruitmentDrawerModal,
          } = this.props;
        return (
            <>
            <Suspense fallback={"Loading..."}>
                <NotificationSetting />
                <AddRecruitmentDrawerModal
          addDrawerRecruitmentModal={addDrawerRecruitmentModal}
          handleRecruitmentDrawerModal={handleRecruitmentDrawerModal}
        />
        </Suspense>
            </>
        )
    }
}

export default Settings;