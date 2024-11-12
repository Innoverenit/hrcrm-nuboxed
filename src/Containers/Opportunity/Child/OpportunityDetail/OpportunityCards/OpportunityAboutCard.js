// import React, { Component } from "react";
// import { ViewEditCard } from "../../../../../Components/UI/Elements";
// import OpportunityAboutView from "./OpportunityAboutView";
// import OpportunityAboutEdit from "./OpportunityAboutEdit";

// class OpportunityAboutCard extends Component {
//   render() {
//     const { opportunity } = this.props;
//     console.log(opportunity);
//     return (
//       <div>
//         <ViewEditCard>
//           {({ viewType }, toggleViewType) =>
//             viewType === "view" ? (
//               <OpportunityAboutView
//                 opportunity={opportunity}
//                 toggleViewType={toggleViewType}
//                 department={this.props.department}
//                 partnerLogin={this.props.partnerLogin}
//                 tradeCurrency={this.props.tradeCurrency}
//               />
//             ) : (
//               <OpportunityAboutEdit
//                 opportunity={opportunity}
//                 toggleViewType={toggleViewType}
//               />
//             )
//           }
//         </ViewEditCard>
//       </div>
//     );
//   }
// }

// export default OpportunityAboutCard;
