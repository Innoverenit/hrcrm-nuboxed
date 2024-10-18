import React, { Component,lazy, Suspense } from 'react';
import { ViewEditCard } from "../../../../Components/UI/Elements";
const ProfileStatsView = lazy(() => import("./ProfileStatsView"))
const ProfileStatsEdit = lazy(() => import("./ProfileStatsEdit"))


class ProfileAboutCard extends Component {
    render() {
        const { user } = this.props;
        console.log(user)
        return (
            <div>
                <ViewEditCard>
                <Suspense fallback={"Loading..."}>
                    {({ viewType }, toggleViewType) => (
                        viewType === 'view'
                            ? <ProfileStatsView
                                user={user}
                                toggleViewType={toggleViewType}
                            />
                            : <ProfileStatsEdit
                                user={user}
                                toggleViewType={toggleViewType}
                            />
                    )}
                    </Suspense>
                </ViewEditCard>
            </div>
        )
    }
}

export default ProfileAboutCard;