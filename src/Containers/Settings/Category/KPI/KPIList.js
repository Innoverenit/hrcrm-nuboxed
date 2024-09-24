import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getKpiName, getKpis, addKpi } from "../KPI/KPIAction";
import { BundleLoader } from "../../../../Components/Placeholder";
import { Checkbox, Button } from "antd";

class KPIList extends Component {
  constructor(props) {
    super(props);
    // Retrieve checked state from localStorage or initialize an empty object
    const storedState = JSON.parse(localStorage.getItem("selectedKPIs")) || {};
    this.state = {
      selectedKPIs: storedState,
    };
  }

  // Function to handle checkbox changes
  handleCheckboxChange = (kpi) => {
    this.setState((prevState) => ({
      selectedKPIs: {
        ...prevState.selectedKPIs,
        [kpi.performanceManagementId]: {
          ...prevState.selectedKPIs[kpi.performanceManagementId],
          checked: !prevState.selectedKPIs[kpi.performanceManagementId]?.checked,
        },
      },
    }), () => {
      // Update localStorage after state is updated
      localStorage.setItem("selectedKPIs", JSON.stringify(this.state.selectedKPIs));
    });
  };

  handleSubmit = () => {
    const { selectedKPIs } = this.state;
    const { departmentId, roleTypeId } = this.props;

    // Map selected KPIs to the desired payload structure
    const kpisPayload = Object.entries(selectedKPIs)
      .filter(([_, data]) => data.checked)
      .map(([kpiId, data]) => ({
        performanceManagementId: kpiId,
        inputValue: data.value,
      }));

    // Construct the payload object
    const payload = {
      departmentId: departmentId,
      kpis: kpisPayload,
      roleTypeId: roleTypeId,
    };

    // Dispatch the action with the payload
    this.props.addKpi(payload);
  };

  componentDidMount() {
    const { getKpiName, getKpis, departmentId, roleTypeId, orgId } = this.props;
    getKpiName(orgId);
    getKpis(departmentId, roleTypeId);
  }

  render() {
    const { fetchingKpiName, kpiNames } = this.props;
    const { selectedKPIs } = this.state;

    if (fetchingKpiName) return <BundleLoader />;

    return (
      <>
        <div className="flex flex-nowrap flex-col">
          {kpiNames.map((item, i) => (
            <div key={i} className="flex items-center">
              <Checkbox
                checked={selectedKPIs[item.performanceManagementId]?.checked}
                onChange={() => this.handleCheckboxChange(item)}
              />
              <span className="font-bold ml-2">{item.kpi}</span>
            </div>
          ))}
        </div>
        <Button style={{ float: "right", backgroundColor: "tomato" }} onClick={this.handleSubmit}>
          Submit
        </Button>
      </>
    );
  }
}

const mapStateToProps = ({ kpi, auth }) => ({
  fetchingKpiName: kpi.fetchingKpiName,
  kpiNames: kpi.kpiNames,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getKpiName,
      getKpis,
      addKpi,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(KPIList);
