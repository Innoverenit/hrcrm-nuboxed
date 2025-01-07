import React, { Component,lazy,Suspense } from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
const PersonalView = lazy(() => import("./PersonalView"))
const PersonalEdit = lazy(() => import("./PersonalEdit"))

class PersonalCard extends Component {
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <div>
        <ViewEditCard>
        <Suspense fallback={"Loading..."}>
          {/* {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <PersonalView user={user} toggleViewType={toggleViewType} />
            ) : (
              <PersonalEdit user={user} toggleViewType={toggleViewType} />
            )
          } */}
           <PersonalView user={user}  />
          </Suspense>
        </ViewEditCard>
      </div>
    );
  }
}

export default PersonalCard;
