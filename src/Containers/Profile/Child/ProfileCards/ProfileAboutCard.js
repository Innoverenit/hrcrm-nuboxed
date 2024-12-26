import React, { Component,lazy, Suspense } from 'react';
import { ViewEditCard } from "../../../../Components/UI/Elements";
const ProfileAboutView = lazy(() => import("./ProfileAboutView"))
const ProfileAboutEdit = lazy(() => import("./ProfileAboutEdit"))

class ProfileAboutCard extends Component {
    render() {
        const { user } = this.props;
        console.log(user)
        return (
            <div>
                <ViewEditCard>
                <Suspense fallback={"Loading..."}>
                    {/* {({ viewType }, toggleViewType) => (
                        viewType === 'view'
                            ? <ProfileAboutView
                                user={user}
                                toggleViewType={toggleViewType}
                            />
                            : <ProfileAboutEdit
                                user={user}
                                toggleViewType={toggleViewType}
                            />
                    )} */}
                    <ProfileAboutView
                                user={user}
                               
                            />
                    </Suspense>
                </ViewEditCard>
            </div>
        )
    }
}

export default ProfileAboutCard;