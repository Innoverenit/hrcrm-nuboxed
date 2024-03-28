import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getKpiName, getKpis, addKpi } from "../KPI/KPIAction";
import { BundleLoader } from "../../../../Components/Placeholder";
import { Checkbox } from "antd";

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
              {/* <button onClick={() => this.handleCheckboxClick(item.kpi)}>
               
                Click me
              </button> */}
            </div>
          ))}
        </div>
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







// import React, { useEffect,lazy,useState ,Component} from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { DeleteOutlined } from "@ant-design/icons";
// import { MainWrapper } from "../../../../Components/UI/Layout";
// import { TextInput, } from "../../../../Components/UI/Elements";
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import { Popconfirm,Button, Input ,Tooltip} from "antd";
// import dayjs from "dayjs";
// import { Select } from "../../../../Components/UI/Elements";
// import { BundleLoader } from "../../../../Components/Placeholder";
// import {
//   getKpiName,
//   getKpis,
//     addKpi,
//     searchKpiName,
//     ClearReducerDataOfKpi,
//     removeKpi,
//     updateKpi
// } from "../KPI/KPIAction";
// import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
// import SingleKpi from "./SingleKpi";
// import { FormattedMessage } from "react-intl";


// class KPIList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       linkedSectors: [],
//       isTextInputOpen: false,
//       addingKpi: false,
//       kpi: "",
//       frequency:null,
//       type: "",
//       singleKpi: "",
//       editInd: true,
//       currentData: "",
//     };
//   }
//   handleFrequency=(value)=>
//   this.setState({frequency:value});





 
//   toggleInput = () =>
//     this.setState((prevState) => ({
//       isTextInputOpen: !prevState.isTextInputOpen,
//     }));
//   handleChange = ({ target: { name, value } }) =>
//     this.setState({ [name]: value });
//     handleAddPayment = () => {
//       const {   addKpi, kpis } = this.props;
//       const { kpi, editInd,frequency, addingKpi, isTextInputOpen } = this.state;
//       let customer = { kpi,
//         frequency,
//         departmentId:this.props.departmentId,
//         orgId: this.props.orgId,
//         userId:this.props.userId,
//          editInd };
    
//       let exist =
//       kpis && kpis.some((element) => element.kpi === kpi);
    
//       // if (exist) {
//       //   message.error(
//       //     "Can't create as another source type exists with the same name!"
//       //   );
//       // } else {
//         addKpi(customer,this.props.departmentId ,() => console.log("add sector callback"));
//         this.setState({
//           kpi: "",
//           frequency,
//           singleKpi: "",
//           isTextInputOpen: false,
//           editInd: true,
//         });
//       // }
//     };
    


//   componentDidMount() {
//     const {   getKpiName,getKpis,departmentId,roleTypeId,orgId } = this.props;
//     console.log();
//     getKpiName(orgId);
//     getKpis(departmentId,roleTypeId)
//     // this.getLinkedSources();
//   }
//   render() {
//     const {
//       fetchingKpiName,
//         fetchingKpiError,
//         kpiNames,
//         addingKpi,
//         updatingKpi,
//     } = this.props;
//     const {
//       isTextInputOpen,
//       type,
//       kpi,
//       singleKpi,
//       linkedSectors,
//     } = this.state;
//     if (fetchingKpiName) return <BundleLoader/>;
//     //if (fetchingSectorsError) return <p>We are unable to load data</p>;
//     return (
//       <>
//       <div class="flex flex-nowrap flex-col" >
//       {kpiNames.map((item, i) => {
//             return (
//               <div key={i} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   // checked={selectedKPIs.includes(item.kpi)}
//                   // onChange={() => this.handleCheckboxChange(item.kpi)}
//                 />
//                 <span className="font-bold ml-2">{item.kpi}</span>
//               </div>
//             );
//           })}
       
//         </div>
//         {/* <div class=" font-bold">Updated on {dayjs(this.props.kpiNames && this.props.kpiNames.length && this.props.kpiNames[0].updationDate).format('YYYY-MM-DD')} by {this.props.kpiNames && this.props.kpiNames.length && this.props.kpiNames[0].updatedBy}</div> */}
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ kpi,auth }) => ({
//     addingKpi: kpi.addingKpi,
//     addingKpiError: kpi.addingKpiError,
//     kpiNames: kpi.kpiNames,
// orgId:auth.userDetails.organizationId,
// userId:auth.userDetails.userId,
// removingKpi: kpi.removingKpi,
// removingKpiError: kpi.removingKpiError,
// fetchingKpiName: kpi.fetchingKpiName,
// fetchingKpiError: kpi.fetchingKpiError,
// kpiListData:kpi.kpiListData,
// updatingKpi: kpi.updatingKpi,
// updatingKpiError: kpi.updatingKpiError,

// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getKpiName,
//       getKpis,
//         ClearReducerDataOfKpi,
//         searchKpiName,
//         addKpi,
//         removeKpi,
//         updateKpi,

//     },
//     dispatch
//   );
// export default connect(mapStateToProps, mapDispatchToProps)(KPIList);
