import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getKpiName, getKpis, addKpi } from "../KPI/KPIAction";
import { BundleLoader } from "../../../../Components/Placeholder";
import { Checkbox ,Button} from "antd";

class KPIList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKPIs: [], // Keep track of selected KPIs
    };
  }

  // Function to handle checkbox changes
  handleCheckboxChange = (kpi) => {
    const { selectedKPIs } = this.state;
    const index = selectedKPIs.indexOf(kpi);

    if (index === -1) {
      // KPI not selected, add it to selectedKPIs
      this.setState((prevState) => ({
        selectedKPIs: [...prevState.selectedKPIs, kpi],
      }));
    } else {
      // KPI already selected, remove it from selectedKPIs
      this.setState((prevState) => ({
        selectedKPIs: prevState.selectedKPIs.filter((item) => item !== kpi),
      }));
    }
  };

  // Function to handle POST request when checkbox is clicked
  handleCheckboxClick = (kpi) => {
    // Perform your POST request here
    console.log("POST request for KPI:", kpi);
  };

  componentDidMount() {
    const { getKpiName, getKpis, departmentId, roleTypeId, orgId } = this.props;
    getKpiName(orgId);
    getKpis(departmentId, roleTypeId);
  }

  handleSubmit = () => {
    const { selectedKPIs } = this.state;
    const { departmentId, roleTypeId } = this.props;

    // Map selected KPIs to the desired payload structure
    const kpisPayload = selectedKPIs.map(kpi => ({
      performanceManagementId: kpi.performanceManagementId // assuming each KPI object has a 'performanceManagementId' property
    }));

    // Construct the payload object
    const payload = {
      departmentId: departmentId,
      kpis: kpisPayload,
      roleTypeId: roleTypeId
    };

    // Dispatch the action with the payload
    this.props.addKpi(payload);
};



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
              checked={selectedKPIs.includes(item.kpi)}
              onChange={() => this.handleCheckboxChange(item.kpi)}
            />
            <span className="font-bold ml-2">{item.kpi}</span>
          </div>
        ))}
      </div>
      <button style={{float:"right",backgroundColor:"tomato"}}onClick={this.handleSubmit}>Submit</button>
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







