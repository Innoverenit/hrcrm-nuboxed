import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPlantById } from "../../PlantAction";
import { MainWrapper } from "../../../../Components/UI/Layout";

import { BundleLoader } from "../../../../Components/Placeholder";
import PlantDetailHeader from "./PlantDetailHeader";
const PlantDetailRight = lazy(() => import("./PlantDetailRight"));
const PlantDetailLeft = lazy(() => import("./PlantDetailLeft"));

class PlantDetail extends Component {
  componentDidMount() {
    this.props.getPlantById(this.props.match.params.plantId);

  }
  render() {
    const { plant = { plant }, fetchingPlantById } = this.props;
    return (
      <>
        <>
          <PlantDetailHeader />
          {fetchingPlantById ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : (
            <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
              <Suspense fallback={"Loading..."}>
              <div class=" flex flex-row flex-wrap w-full items-start self-start justify-start grow shrink h-auto mr-auto ">
                  <div style={{ width: "22%" }}>
                    <PlantDetailLeft plant={plant} /> 
                  </div>
                  <div style={{ width: "78%" }}>
                    <PlantDetailRight plant={plant} />
                  </div>
                </div>
              </Suspense>
            </div>
          )}
        </>
      </>
    );
  }
}
const mapStateToProps = ({ plant }) => ({
  fetchingPlantById: plant.fetchingPlantById,
  plant: plant.plantDetailById,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPlantById,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlantDetail)

