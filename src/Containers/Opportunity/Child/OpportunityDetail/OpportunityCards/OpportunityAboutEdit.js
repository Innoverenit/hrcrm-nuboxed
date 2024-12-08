// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Button } from "antd";
// import dayjs from "dayjs";
// import EditSearchSelect from "../../../../../Components/Forms/Edit/EditSearchSelect";
// import EditableInput from "../../../../../Components/Forms/Edit/EditableInput";
// import EditableTextArea from "../../../../../Components/Forms/Edit/EditableTextArea";
// import EditableDatePicker from "../../../../../Components/Forms/Edit/EditableDatePicker";
// import EditableSelect from "../../../../../Components/Forms/Edit/EditableSelect";
// 

// class OpportunityAboutEdit extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       fields: {},
//     };
//   }
//   handleUpdate = () => {
//     const {
//       opportunity: { opportunityId },
//       updateOpportunity,
//       toggleViewType,
//     } = this.props;
//     // updateOpportunity(opportunityId, this.state.fields, this.callback);
//   };
//   callback = () => {
//     this.props.toggleViewType();
//     this.props.getHistoricalProposalAmount(
//       this.props.opportunity.opportunityId
//     );
//   };
//   handleChange = (name, value) => {
//     console.log(name, value);
//     this.setState({
//       fields: {
//         ...this.state.fields,
//         [name]: value,
//       },
//     });
//   };
//   render() {
//     const {
//       opportunity: {
//         sourceName,
//         sourceId,
//         proposalAmount,
//         currency,
//         endDate,
//         description,
//         oppType,
//       },
//       toggleViewType,
//       updateOpportunityById,
//     } = this.props;
//     return (
//       <>
//  <div class=" flex flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto p-2">
       
//  <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto w-full ">
          
//             <div style={{ width: "50%" }}>
//               <EditableInput
//                 isRequired
//                 defaultValue={proposalAmount}
//                 handleChange={this.handleChange}
//                 placeholder="Proposal Value"
//                 name={"proposalAmount"}
//                 label="Proposal Value"
//                
//                 value={this.state.fields.proposalAmount}
//                 height={"2.375em"}
//                 width="100%"
//               // width="17.625em"
//               />
//             </div>
//             <div style={{ width: "50%" }}>
//               <EditSearchSelect
//                 defaultValue={{
//                   value: currency,
//                   label: currency,
//                   color: "#FF8B00",
//                 }}
//                 selectType="currency"
//                 placeholder="Currency"
//                 name={"currency"}
//                 handleSelectChange={this.handleChange}
//                 value={this.state.fields.currency || currency}
//                 style={{ height: "1.25em" }}
//               />
//             </div>
//           </div>

//           <div class=" mt-3" style={{ margin: "0.125em" }} />
      
//           <div class=" flex flex-row flex-wrap items-start self-start justify-between w-full grow shrink h-auto mr-auto ">
//             <div style={{ width: "50%" }}>
//               <EditableDatePicker
//                 // defaultValue={dayjs(endDate).format('ll')}
//                 defaultValue={dayjs(endDate)}
//                 handleChange={this.handleChange}
//                 placeholder="Closure date"
//                 name={"endDate"}
//                 value={this.state.fields.endDate}
//               />
//             </div>
//             <div style={{ width: "46%" }}>
//               <EditableSelect
//                 defaultValue={oppType}
//                 handleChange={this.handleChange}
//                 name={"oppType"}
//                 placeholder={"Probability"}
//                 options={[
//                   "High",
//                   "Medium",
//                   "Small",
//                 ]}
//                 value={this.state.fields.oppType}
//                 style={{ width: "100%" }}

//               />

//             </div>
//           </div>

//           <div class=" mt-3" style={{ margin: "0.125em" }} />
//           <div style={{ width: "100%" }}>
//             <EditSearchSelect
//               defaultValue={{
//                 value: sourceId,
//                 label: sourceName,
//                 color: "#FF8B00",
//               }}
//               selectType="source"
//               placeholder={"Source.."}
//               name={"sourceId"}
//               handleSelectChange={this.handleChange}
//               value={this.state.fields.sourceId}
//             // width="100%"
//             />
//           </div>
//           <EditableTextArea
//             defaultValue={description}
//             handleChange={this.handleChange}
//             placeholder="Description"
//             name={"description"}
//             value={this.state.fields.description}
//             width={"100%"}
//             height={"2.375em"}
//           />
//           {/* <div class=" mt-3" style={{ margin: "0.125em" }} />
         
//           </div> */}
//           {/* <EditableInput
//                         defaultValue={sourceName}
//                         handleChange={this.handleChange}
//                         placeholder='Source'
//                         name={'sourceName'}
//                         value={this.state.fields.sourceName} /> */}
//         </div>
//         <div class=" flex flex-row flex-wrap items-start self-start justify-end mr-[1.25rem] grow shrink h-auto">
//           <Button
//             type="primary"
//             Loading={updateOpportunityById}
//           // onClick={this.handleUpdate}
//           >
//              Save 
//            
//           </Button>
//           &nbsp;
//           <Button type="ghost" onClick={() => toggleViewType()}>
//              Cancel 
//           
//           </Button>
//         </div>
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ opportunity }) => ({
//   // updateOpportunityById: opportunity.updateOpportunityById,
//   // updateOpportunityByIdFailure: opportunity.updateOpportunityByIdFailure,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       // updateOpportunity,
//       // getHistoricalProposalAmount,
//     },
//     dispatch
//   );
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(OpportunityAboutEdit);
