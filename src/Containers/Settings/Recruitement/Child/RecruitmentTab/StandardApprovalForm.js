// import React, { useState, useEffect, useMemo } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as Yup from "yup";
// import { Button, Switch, Icon, Tooltip, Popconfirm, Popover,Select } from "antd";
// import { Formik, Form, Field, FastField } from "formik";
// import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
// import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
// import { SwitchComponent } from "../../../../../Components/Forms/Formik/SwitchComponent";
// import { div } from "../../../../../Components/UI/Layout";
// import { StyledLabel } from "../../../../../Components/UI/Elements";
// 
// import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
// import {
//   addApproval,
//   getApprovalData,
//   getDepartmentList
// } from "../../../../Settings/SettingsAction";
// import { functions } from "lodash";
// import { CloseOutlined } from "@ant-design/icons";
// const { Option } = Select;
// function StandardApprovalForm(props) {

//     useEffect(() => {
//         props.getApprovalData(props.stageId);
//         props.getDepartmentList()
//     }, [])

//     const [rows, setRows] = useState([{ value: "", id: 1 }]);
//     const [id, setId] = useState(1);
//     const [level, setLevel] = useState(1);

//     function buttonOnClick() {
//         var mapped = rows.map((item,i) => ({ [`level${i+1}`]: item.value }));
//         var data = Object.assign(
//             {},
//             ...mapped,
//             { levelCount: level },
//             { approvalIndicator: props.approvalIndicator },
//             { approvalType: props.approvalType },
//             { processName: "Indent" },
//             { subProcessName: "IndentApproval" }
//         );
//         console.log(data);
//         // props.addIndentApproval(data);
//     };


//     //     approvalIndicator: true
//     // approvalType: "Exception"
//     // designationId: "DDG49470159634152021"
//     // functionId: "FDG18460358639152021"
//     // jobLevel: "3"
//     // processName: "BOQ"
//     // reportingTo: ""
//     // subProcessName: "BOQApprove"
//     // threshold: ""
//     function handleChangeValue(value, a) {
//         setRows((v) => {
//             return v.map((d) => {
//                 if (`${d.id}_value` === a) {
//                     return { ...d, value: value };
//                 } else {
//                     return d;
//                 }
//             });
//         });
//     }
//     function handleAddRowClick() {
//         setId((v) => v + 1);
//         setLevel((v) => v + 1);
//         setRows((v) => [...v, { value: "", id: id + 1 }]);
//     }

//     function handleAddRowClick() {
//         setId((v) => v + 1);
//         setLevel((v) => v + 1);
//         setRows((v) => [...v, { value: "", id: id + 1 }]);

//     }

//     function handleDelete(row) {
//         setRows((v) => v.filter((d) => d.id !== row.id));
//         setLevel((v) => v - 1);
//     }
//     console.log(rows);
//     return (
//         <div>
//             <div className="MainBox">
//                 <div className="InputBox">
//                     {rows.map((row, i) => {
//                         return (
                            
//                             <div style={{ width: "100%", display: "flex", fontWeight: "bold" }}>
                                
//                                 <div style={{ width: "16%" }}>
//                                     <p>{`Level ${i + 1}`}</p>
//                                 </div>
                                        
//                                 <div style={{ width: "47%" }}>
//                                     <Select
//                                         name={`${row.id}_value`}
//                                         value={`${row.value}`}
//                                         onChange={(value) =>
//                                             handleChangeValue(value, `${row.id}_value`)
//                                         }
//                                     // placeholder={`select`}
//                                     >
//                                        {props.departmentList.map((a) => {
//                                         return <Option value={a.departmentId}>{a.departmentName}</Option>;
//                                     })}
                                        
//                                     </Select>
                          
//                                 </div>
//                                 {rows.length > 1 && (row.id + 1 > row.id) ? (
//                                     <CloseOutlined onClick={() => handleDelete(row)} />

//                                 ) : null}
//                             </div>
//                         );
//                     })}
//                      {/* <div justifyContent="space-between">
//                             <div style={{ width: "47%" }}>
//                               <Field
//                                 name="reportingTo"
//                                 label="Threshold"
//                                 isRequired
//                                 isColumn
//                                 component={SelectComponent}
//                                 options={[
//                                   "Best Match",
//                                   "Skill set matching job description",
//                                   "Skill set matches primary skill requirement",
//                                   " Approval not required for all cases" ,
//                                 ]}
                               
//                               />
//                             </div>
//                             </div> */}
                            
//                     <div class=" mt-3" />
//                     <div justifyContent="flex-end">
//                         <div className="button">
//                             <Button type="primary" onClick={handleAddRowClick}>
//                             Add Level
//                             </Button>
//                         </div>
//                     </div>
//                     <div class=" mt-3" style={{marginTop:"1.25em"}} />
//                     <div justifyContent="flex-end"
//                         style={{ marginLeft: "104%", marginTop: "52px" }}>
//                         <Button
//                             type="primary"
//                             style={{
//                                 marginRight: "-230px",
//                                 marginTop: "52px",
//                                 marginBottom: "5px",
//                             }}
//                             onClick={() => buttonOnClick()}
//                         >
//                             Submit
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


// const mapStateToProps = ({ settings, user }) => ({
//     addingApproval: settings.addingApproval,
//     departmentList: settings.departmentList,
//     // functions: functions.functions,
//     // designationById: user.designationById,
//     approvalData: settings.approvalData,
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators({
//         addApproval,
//         getApprovalData,
//         getDepartmentList
//     }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(StandardApprovalForm);



import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Select } from "antd";

import {
  addApproval,
  getApprovalData,
  getDepartmentList
} from "../../../../Settings/SettingsAction";
import { CloseOutlined } from "@ant-design/icons";
const { Option } = Select;
function StandardApprovalForm(props) {
       useEffect(() => {
        props.getApprovalData(props.stageId);
        props.getDepartmentList()
    }, [])
    const [rows, setRows] = useState([{ value: "", id: 1 }]);
    const [id, setId] = useState(1);
    const [level, setLevel] = useState(1);


    function buttonOnClick() {
        var mapped = rows.map((item, i) => ({ [`level${i + 1}`]: item.value }));
        var data = Object.assign(
            {},
            ...mapped,
          

            { levelCount: level },
                        { approvalIndicator: props.approvalIndicator },
                        { approvalType: props.approvalType },
                        { processName: "Indent" },
                        { subProcessName: "IndentApproval" },
                        { stageId: props.stageId,}
        );
        console.log(data);
        props.addApproval(data);
    };
  
    function handleChangeValue(value, a) {
        setRows((v) => {
            return v.map((d) => {
                if (`${d.id}_value` === a) {
                    return { ...d, value: value };
                } else {
                    return d;
                }
            });
        });
    }
    function handleAddRowClick() {
        setId((v) => v + 1);
        setLevel((v) => v + 1);
        setRows((v) => [...v, { value: "", id: id + 1 }]);

    }

    function handleDelete(row) {
        setRows((v) => v.filter((d) => d.id !== row.id));
        setLevel((v) => v - 1);
    }
    console.log(rows);

    console.log("stages1",props.stageId)
    return (
        <div>
            <div className="MainBox">
                <div className="InputBox">
                    {rows.map((row, i) => {
                        return (
                            <div style={{ width: "100%", display: "flex", fontWeight: "bold" }}>
                                <div style={{ width: "16%" }}>
                                    <p>{`Level ${i + 1}`}</p>
                                </div>
                                <div style={{ width: "47%" }}>
                                    <Select
                                        name={`${row.id}_value`}
                                        value={`${row.value}`}
                                        onChange={(value) =>
                                            handleChangeValue(value, `${row.id}_value`)
                                        }
                                    // placeholder={`select`}
                                    >
                                        {props.departmentList.map((a) => {
                                            return <Option value={a.departmentId}>{a.departmentName}</Option>;
                                        })}
                                    </Select>
                                </div>
                                {rows.length > 1 && (row.id + 1 > row.id) ? (
                                    <CloseOutlined onClick={() => handleDelete(row)} />
                                ) : null}
                            </div>
                        );
                    })}
                 <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                        <div className="button">
                            <Button type="primary" onClick={handleAddRowClick}>
                                Add Level
                            </Button>
                        </div>
                    </div>
                    <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto "
                        style={{ marginLeft: "104%", marginTop: "52px" }}>
                        <Button
                            type="primary"
                            style={{
                                marginRight: "-105px",
                                marginTop: "-76px",
                                marginBottom: "5px",
                            }}
                            onClick={() => buttonOnClick()}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = ({ settings, user }) => ({
       addingApproval: settings.addingApproval,
    departmentList: settings.departmentList,
    // functions: functions.functions,
    // designationById: user.designationById,
    approvalData: settings.approvalData,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        addApproval,
                getApprovalData,
                getDepartmentList
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StandardApprovalForm);




// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { FormattedMessage } from "react-intl";
// import {
// //   addApproval,
// //   getApprovalData,
//   getDepartmentList
// } from "../../../../Settings/SettingsAction";
// import { Select } from "antd";

// import { Button, Divider, message,Input } from "antd";
// import { MainWrapper, div } from "../../../../../Components/UI/Layout";
// import { TextInput, Title } from "../../../../../Components/UI/Elements";
// //import SingleSectors from "./SingleSector";
// // import * as Yup from "yup";
// // import {
// //   getSectors,
// //   addSectors,
// //   removeSectors,
// //   updateSectors,
// //   searchSectorName,
// // } from "./SectorsAction";
// import axios from "axios";
// const { Option } = Select;
// // import { base_url } from "../../../Config/Auth";

// // const SectorsSchema = Yup.object().shape({
// //   sectorName: Yup.string().required("Input needed !"),
// // });

// class StandardApprovalForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       linkedSectors: [],
//       isTextInputOpen: false,
//       addingSector: false,
//       sectorName: "",
//       type: "",
//       singleSector: "",
//       editInd:true,
//       currentData: ""
//     };
//   }
// //   handleClear = () => {
// //     this.setState({ currentData: "" });
// //     this.props.getSectors();
// //   };
// //   setCurrentData = (value) => {
// //     this.setState({ currentData: value });
// //   };

// //   handleSearchChange = (e) => {
// //     // console.log(e.target.value)
// //     // this.setState({ text: e.target.value });
// //     this.setState({ currentData: e.target.value })
   
// //   };
// //   toggleInput = () =>
// //     this.setState((prevState) => ({
// //       isTextInputOpen: !prevState.isTextInputOpen,
// //     }));
// //   handleChange = ({ target: { name, value } }) =>
// //     this.setState({ [name]: value });
// //   handleAddSector = () => {
// //     const { addSectors, sectors } = this.props;
// //     const { sectorName,editInd,addingSectors, isTextInputOpen } = this.state;
// //     let sector = { sectorName,editInd };

// //     let exist =
// //       sectors &&
// //       sectors.some((element) => element.sectorName == sectorName);

// //     if (exist) {
// //       message.error(
// //         "Can't create as another sector type exists with same name!"
// //       );
// //     } else {
// //       addSectors(sector, () => console.log("add sector callback"));
// //     }

// //     this.setState({
// //       sectorName: "",
// //       singleSector: "",
// //       isTextInputOpen: false,
// //       editInd:true,
// //     });
// //   };
// //   handleDeleteSector = (sectorId = { sectorId }) => {
// //     this.props.removeSectors(sectorId);
// //     this.setState({ sectorName: "", singleSector: "" });
// //   };
// //   handleUpdateSector = (sectorName, sectorId,editInd, cb) => {
// //     this.props.updateSectors(sectorName, sectorId,  editInd, cb);
// //     this.setState({ sectorName: "", singleSector: "", editInd:true});
// //   };
//   // getLinkedDocuments = () => {
//   //   axios
//   //     .get(`${base_url}/opportunity/source/linkedSources`, {
//   //       headers: {
//   //         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//   //       },
//   //     })
//   //     .then((res) => {
//   //       console.log(res);
//   //       this.setState({ linkedSources: res.data });
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //     });
//   // };
//   componentDidMount() {
//     const { getDepartmentList } = this.props;
//     console.log();
//     getDepartmentList();
//     // this.getLinkedSources();
//   }
//   render() {
//     // const {
//     //   fetchingSectors,
//     //   fetchingSectorsError,
//     //   sectors,
//     //   addingSectors,
//     //   updatingSectors,
//     // } = this.props;
//     // const {
//     //   isTextInputOpen,
//     //   type,
//     //   sectorName,
//     //   singleSector,
//     //   linkedSectors,
//     // } = this.state;
//     // if (fetchingSectors) return <p>Loading ...</p>;
//     // if (fetchingSectorsError) return <p>We are unable to load data</p>;
//     return (
//       <>
//         <div flexWrap="nowrap">
//           <MainWrapper
//             style={{
//               flexBasis: "100%",
//               // height: "30.625em",
//               overflow: "auto",
//               color: "#FFFAFA",
//             }}
//           >
        
       
//             {/* <div flexDirection="column">
            
//               <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
//                 {sectors.length &&
//                   sectors.map((sector, i) => (
//                     <SingleSectors
//                       key={i}
//                       value={singleSector}
//                       name="singleSector"
//                       sector={sector}
//                       linkedSectors={linkedSectors}
//                       updatingSectors={updatingSectors}
//                       handleChange={this.handleChange}
//                       handleUpdateSector={this.handleUpdateSector}
//                       handleDeleteSector={this.handleDeleteSector}
//                       handleClear={this.handleClear}
//                       handleSearchChange={this.handleSearchChange}
//                       currentData={this.state.currentData}
//                       setCurrentData={this.setCurrentData}
//                     />
//                   ))}
//               </MainWrapper>
//             </div> */}
//             {/* {isTextInputOpen ? ( */}
//               <div
//                 alignItems="center"
//                 style={{ marginLeft: "0.3125em", marginTop: "0.3125em" }}
//               >
//                 <br />
//                 <br />
//                 <Select
//                   placeholder="Add More"
//                   name="sectorName"
//                 //   value={sectorName}
//                 //   onChange={this.handleChange}
//                   width="55%"
//                   style={{ marginRight: "0.125em" }}
//                   >
//                     {this.props.departmentList.map((item,i) => {
//                          return (
//                                     <Option value={item.departmentId}>{item.departmentName}</Option>
//                          )
//                                        })}
//                   </Select>
                
//                 &nbsp;
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                 //   disabled={!sectorName}
//                 //   Loading={addingSectors}
//                 //   onClick={this.handleAddSector}
//                   style={{ marginRight: "0.125em" }}
//                 >
//                   {/* Save */}
//                   <FormattedMessage
//                     id="app.save"
//                     defaultMessage="Save"
//                   />
//                 </Button>
//                 &nbsp;
//                 <Button type="primary" ghost onClick={this.toggleInput}>
//                   {/* Cancel */}
//                   <FormattedMessage
//                     id="app.cancel"
//                     defaultMessage="Cancel"
//                   />
//                 </Button>
//               </div>
//             {/* ) : ( */}
//               <>
//                 <br />
//                 <div justifyContent="flex-end">
//                   <Button
//                     type="primary"
//                     ghost
//                     htmlType="button"
//                     // Loading={addingSectors}
//                     // onClick={this.toggleInput}
//                   >
//                     {/* Add More */}
//                     <FormattedMessage
//                     id="app.addmore"
//                     defaultMessage="Add More"
//                   />
//                   </Button>
//                 </div>
//               </>
//             {/* )} */}
//           </MainWrapper>
//           {/* <MainWrapper>
//             <div
//               style={{
//                 border: "0.0625em solid #eee",
//                 width: "100%",
//                 padding: "1.6rem",
//                 marginRight: 70,
//               }}
//             >
//               <p style={{ color: "#035b9b", fontSize: "1rem" }}>
//                 Here is a list of sample sources, it will help attribute
//                 opportunities to their sources thereby identifying the effective
//                 channels and further allocating resources accordingly.
//               </p>
//               <p style={{ color: "#035b9b", fontSize: "1rem" }}>
//                 Korero allows you to change the sources as per your
//                 organization's requirements.
//               </p>
//               <p style={{ color: "#035b9b", fontSize: "1rem" }}>
//                 The only exception is if an opportunity is associated with a
//                 source then it cannot be deleted from the list till no
//                 opportunity exists in that source.
//               </p>
//             </div>
//           </MainWrapper> */}
//         </div>
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ sector ,settings}) => ({
// //   addingSectors: sector.addingSectors,
// //   addingSectorsError: sector.addingSectorsError,
// //   sectors: sector.sectors,

// //   removingSectors: sector.removingSectors,
// //   removingSectorsError: sector.removingSectorsError,
// //   fetchingSectors: sector.fetchingSectors,
// //    fetchingSectorsError: sector.fetchingSectorsError,
  
// //     updatingSectors: sector.updatingSectors,
// departmentList: settings.departmentList,
// //     updatingSectorsError: sector.updatingSectorsError,
//   // fetchingDocuments: document.fetchingDocuments,
//   // fetchingDocumentsError: document.fetchingDocumentsError,
  
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     { getDepartmentList
//     //   getSectors,
//     //   addSectors,
//     //   removeSectors,
//     //   updateSectors,
//     //   searchSectorName
//     },
//     dispatch
//   );
// export default connect(mapStateToProps, mapDispatchToProps)(StandardApprovalForm);