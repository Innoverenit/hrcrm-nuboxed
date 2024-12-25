// import React, { Component, Suspense, lazy } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { withRouter } from "react-router";
// import InventoryMaterialTab from "./InventoryMaterialTab/InventoryMaterialTab";
// import InventoryProductionTab from "./InventoryProductionTab/InventoryProductionTab";
// import { BundleLoader } from "../../../../../Components/Placeholder";
// const InventoryDetailTab = lazy(() =>
//   import("./InventoryDetailTab/InventoryDetailTab")
// );

// function InventoryDetailRight(props) {
//   return (
//     <>
//       hello
//       {/* <Suspense fallback={<BundleLoader />}>
//         <InventoryDetailTab
//           inventory={this.props.inventory}
//           tabData={this.props.tabData}
//         />
//         {props.inventoryViewType === "repair" ? (
//           <div class=" w-full" >
//             <InventoryDetailTab
//               inventory={this.props.inventory}
//               tabData={this.props.tabData}
//             />
//           </div>
//         ) : props.inventoryViewType === "material" ? (
//           <div class=" w-full" >
//             <InventoryMaterialTab
//               inventory={this.props.inventory}
//               tabData={this.props.tabData}
//             />
//           </div>
//         ) : props.inventoryViewType === "production" ? (
//           <div class=" w-full" >
//             <InventoryProductionTab
//               inventory={this.props.inventory}
//               tabData={this.props.tabData}
//             />
//           </div>
//         ) : null}
//       </Suspense> */}
//     </>

//   );
// }

// const mapStateToProps = ({ }) => ({});
// const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(InventoryDetailRight)
// );
import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const InventoryDetailTab = lazy(() =>
  import("./InventoryDetailTab/InventoryDetailTab")
);

class InventoryDetailRight extends Component {
  render() {
    return (
      <div style={{ width: "100%" }}>
        <InventoryDetailTab
          inventory={this.props.inventory}
          tabData={this.props.tabData}
          translateText={this.props.translateText}
          translatedMenuItems={this.props.translatedMenuItems}
          selectedLanguage={this.props.selectedLanguage}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InventoryDetailRight)
