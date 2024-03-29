import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Button, Tooltip } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import { handleMileageModal } from "../MileageAction";

const Option = StyledSelect.Option;

class MileageActionRight extends React.Component {
  state = {
    isClicked: "import",
  };
  componentDidMount() {
    // this.props.getUsers();
  }
  handleClicked = (value) => {
    this.setState({
      isClicked: value,
    });
  };
  render() {
    return (
      <div class=" flex items-center ml2" >
        {/* <Button
          type={this.state.isClicked === "import" ? "primary" : ""}
          onClick={() => this.handleClicked("import")}
          // onClick={() => this.props.history.push("/import/product")}
        >
          Import
        </Button> */}
       
      
        <Button
          type={this.state.isClicked === "export" ? "primary" : ""}
          onClick={() => this.handleClicked("export")}
        >
          Export
        </Button>
      <div class=" ml-2">
        <Tooltip placement="left" title="Create">
          <Button
            type="primary"
            onClick={() => this.props.handleMileageModal(true)}
          >
            {/* <Icon type="plus" /> */}

            Add
          </Button>
        </Tooltip>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, team, account }) => ({});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ handleMileageModal }, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MileageActionRight)
);
