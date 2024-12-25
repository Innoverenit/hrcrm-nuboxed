import React from "react";
import Button from "antd/lib/button";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Tooltip } from "antd";
import { handlePlantModal } from "../PlantAction";
import AddPlantModal from "./AddPlantModal";

class PlantActionRight extends React.Component {
  render() {
    const { handlePlantModal, addPlantModal } = this.props;
    return (
      <>
        <Tooltip placement="left" title="Create">
          <Button type="primary" ghost onClick={() => handlePlantModal(true)}>
            <i class="fas fa-plus"></i>
          </Button>
        </Tooltip>
        <AddPlantModal
          handlePlantModal={handlePlantModal}
          addPlantModal={addPlantModal}
        />
      </>
    );
  }
}
const mapStateToProps = ({ plant }) => ({
  addPlantModal: plant.addPlantModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handlePlantModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(PlantActionRight)

