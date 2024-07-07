
import React, { useState, useEffect, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import {getCertificationRecords} from "../../../Library/LibraryAction"
import { MainWrapper } from "../../../../../Components/UI/Layout";
import { TextInput } from "../../../../../Components/UI/Elements";
import {
  getCertification,
  addCertification,
  removeCertification,
  updateCertification,
  searchCertificationName,
  ClearReducerDataOfCertification,
} from "../Certification/CertificationAction";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import moment from "moment";
const SingleCertification = lazy(() => import("./SingleCertification"));

const Certification = ({
  getCertification,
  getCertificationRecords,
  addCertification,
  removeCertification,
  updateCertification,
  searchCertificationName,
  ClearReducerDataOfCertification,
  fetchingCertifications,
  fetchingCertificationsError,
  certifications,
  addingCertifications,
  updatingCertifications,
  userId,
  orgId,
  organizationId,
}) => {
  const [linkedCertification, setLinkedCertification] = useState([]);
  const [isTextInputOpen, setIsTextInputOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [singleCertification, setSingleCertification] = useState("");
  const [editInd, setEditInd] = useState(true);
  const [currentData, setCurrentData] = useState("");

  const handleChangeDes = (e) => {
    setCurrentData(e.target.value);

    if (e.target.value.trim() === "") {
      getCertification(organizationId);
      ClearReducerDataOfCertification();
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      searchCertificationName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleClear = () => {
    setCurrentData("");
    getCertification(organizationId);
  };


  const handleSearchChange = (e) => {
    setCurrentData(e.target.value);
  };

  const toggleInput = () => setIsTextInputOpen((prev) => !prev);

  const handleChange = (e) => setName(e.target.value);

  const handleAddCertification = () => {
    const { addCertification } = this.props;
    const { name } = this.state;
    let certification = { name };
    
    addCertification(certification, () => console.log("add certification callback"));

    setName("");
    setSingleCertification("");
    setIsTextInputOpen(false);
    setEditInd(true);
  };

  const handleDeleteCertification = (certificationId) => {
    removeCertification(certificationId);
    setName("");
    setSingleCertification("");
  };

  const handleUpdateCertification = (name, certificationId, editInd, cb) => {
    updateCertification(name, certificationId, editInd, cb);
    setName("");
    setSingleCertification("");
  };

  useEffect(() => {
    getCertification(organizationId);
    getCertificationRecords(orgId)
  }, [getCertification,getCertificationRecords, organizationId,orgId]);

  if (fetchingCertifications) return <p>Loading ...</p>;

  return (
    <>
      <div className="flex flex-no-wrap">
        <MainWrapper
          style={{
            flexBasis: "100%",
            overflow: "auto",
            color: "#FFFAFA",
          }}
        >
          <div class=" flex flex-row justify-between">
          <div className="flex w-[18vw]">
            <Input
              placeholder="Search by Name"
              suffix={
                <AudioOutlined
                  onClick={SpeechRecognition.startListening}
                  style={{
                    fontSize: 16,
                    color: "#1890ff",
                  }}
                />
              }
             
              onPressEnter={handleSearch}
              onChange={handleChangeDes}
            />
          </div>
          {isTextInputOpen ? (
            <div className="flex items-center ml-[0.3125em] ">
              <TextInput
                placeholder="Add More"
                name="name"
                value={name}
                onChange={(e) => handleChange(e)}
                width="61%"
                style={{ marginRight: "0.125em" }}
              />
          
              <Button
                type="primary"
                htmlType="submit"
                disabled={!name}
                loading={addingCertifications}
                onClick={handleAddCertification}
                style={{ marginRight: "0.125em"}}
              >
                Save
              </Button>
            
              <Button type="primary" 
             
              ghost onClick={toggleInput}>
                Cancel
              </Button>
            </div>
          ) : (
            <>
           
              <div className="flex justify-end">
                <Button
                  type="primary"
                  ghost
                  htmlType="button"
                  // loading={addingCertifications}
                  onClick={toggleInput}
                >
                  Add Certification
                </Button>
              </div>
            </>
          )}

</div>
          <div className="flex flex-col">
            <MainWrapper style={{ height: "30em" }}>
              {certifications.length ? (
                certifications
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((certification, i) => (
                    <SingleCertification
                      key={i}
                      value={singleCertification}
                      data="singleCertification"
                      certification={certification}
                      linkedCertification={linkedCertification}
                      updatingCertifications={updatingCertifications}
                      handleChange={handleChange}
                      handleUpdateCertification={handleUpdateCertification}
                      handleDeleteCertification={handleDeleteCertification}
                      handleClear={handleClear}
                      handleSearchChange={handleSearchChange}
                      currentData={currentData}
                      setCurrentData={setCurrentData}
                    />
                  ))
              ) : (
                <p>None Available</p>
              )}
            </MainWrapper>
          </div>
        </MainWrapper>
      </div>
      <div>
        Updated on{" "}
        {moment(
          certifications &&
            certifications.length &&
            certifications[0].updationDate
        ).format("ll")}{" "}
        by{" "}
        {certifications &&
          certifications.length &&
          certifications[0].updatedName}
      </div>
    </>
  );
};

const mapStateToProps = ({ certifications,librarys, auth }) => ({
  certificationRecordData:librarys.certificationRecordData,
  addingCertifications: certifications.addingCertifications,
  addingCertificationsError: certifications.addingCertificationsError,
  certifications: certifications.certifications,
  certificationId: certifications.certificationId,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  organizationId: auth.userDetails.organizationId,
  updatingCertifications: certifications.updatingCertifications,
  updatingCertificationsError: certifications.updatingCertificationsError,
  fetchingCertifications: certifications.fetchingCertifications,
  fetchingCertificationsError: certifications.fetchingCertificationsError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCertification,
      getCertificationRecords,
      addCertification,
      removeCertification,
      updateCertification,
      searchCertificationName,
      ClearReducerDataOfCertification,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Certification);





// import React, { Component,lazy } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Button, Input } from "antd";
// import { MainWrapper, } from "../../../../../Components/UI/Layout";
// import { TextInput,} from "../../../../../Components/UI/Elements";
// import {
//   getCertification,
//   addCertification,
//   removeCertification,
//   updateCertification,
//   searchCertificationName,
//   ClearReducerDataOfCertification
// } from "../Certification/CertificationAction";
// import moment from "moment";
// const SingleCertification = lazy(() => import("./SingleCertification"));

// class Certification extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       linkedCertification: [],
//       isTextInputOpen: false,
//       addingCertification: false,
//       name :"",
//       type:"",
//       singleCertification: "",
//       userId:"",
//       orgId:"",
//       editInd:true,
//       currentData:"",
//     };
//   }
//   handleChangeDes = (e) => {
//     this.setState({ currentData: e.target.value });
  
//     if (e.target.value.trim() === "") {
//       this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
//       this.props.getCertification(this.props.organizationId);
//       this.props.ClearReducerDataOfCertification();
//     }
//   };
//   handleSearch = () => {
//     if (this.state.currentData.trim() !== "") {
//       // Perform the search
//       this.props.searchCertificationName(this.state.currentData);
//     } else {
//       console.error("Input is empty. Please provide a value.");
//     }
//   };
//   handleClear = () => {
//     this.setState({ currentData: "" });
//     this.props.getCertification(this.props.organizationId);
//   };
//   setCurrentData = (value) => {
//     this.setState({ currentData: value });
//   };

//   handleSearchChange = (e) => {
//     // console.log(e.target.value)
//     // this.setState({ text: e.target.value });
//     this.setState({ currentData: e.target.value })
   
//   };
//   toggleInput = () =>
//     this.setState((prevState) => ({
//       isTextInputOpen: !prevState.isTextInputOpen,
//     }));
//   handleChange = ({ target: { name, value } }) =>
//     this.setState({ [name]: value });
//   handleAddCertification = () => {
//     const { addCertification, certifications } = this.props;
//     const { editInd,name, addingCertifications, isTextInputOpen } = this.state;
//     let certification = {name};
//     // let exist =
//     // certifications &&
//     // certifications.some((element) => element.name == name);

//     // if (exist) {
//     //   message.error(
//     //     "Can't create as another certification type exists with same name!"
//     //   );
//     // } else {
//     //   addCertification(certification, () => console.log("add certifications callback"));
//     // }
//     addCertification(certification, () => console.log("add certification callback"));

//     this.setState({
//       name: "",
//       singleCertification: "",
//       isTextInputOpen: false,
//       editInd:true,
//     });
//   };
//   handleDeleteCertification = (certificationId={certificationId}) => {
//     this.props.removeCertification(certificationId);
//     this.setState({ name: "", singleCertification: "" });
//   };
//   handleUpdateCertification = (name,certificationId,editInd, cb) => {
//     this.props.updateCertification(name,certificationId,editInd,  cb);
//     this.setState({ name: "", singleCertification: "",editInd:true ,liveInd: true,userId: this.props.userId,certificationId:this.props.certificationId, orgId: this.props.organizationId,creationDate:""});
//    // let library = { name,userId: this.props.userId, orgId: this.props.organizationId};
//   };
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
//     const { getCertification,organizationId,certificationId} = this.props;
//     console.log(organizationId);
//     getCertification(organizationId);
//     // this.props.removeCertification(certificationId);
//     // this.props.updateCertification(
//     //   {
//     //   certificationId:this.props.certificationId,

//     //   },
//     //   this.props.certificationId,
//     //   this.props.userId
//     //   );
//   }
//   render() {
//     const {
//       fetchingCertifications,
//     fetchingCertificationsError,
//     certifications,
//     addingCertifications,
//     updatingCertifications,
//     } = this.props;
//     const {
//       isTextInputOpen,
//       name,
//       singleCertification,
//       linkedCertification,
//     } = this.state;
//     if (fetchingCertifications) return <p>Loading ...</p>;
//     // if (fetchingCertificationsError) return <p>Error ...</p>;
//     return (
//       <>
//        <div class="flex flex-no-wrap" >
//           <MainWrapper
//             style={{
//               flexBasis: "100%",
//               overflow: "auto",
//               color: "#FFFAFA",
//             }}
//           >

// <div class=" flex w-[18vw]" >
//             <Input
//          placeholder="Search by Name"
//         style={{width:"100%",marginLeft:"0.5rem"}}
//             // suffix={suffix}
//             onPressEnter={this.handleSearch}  
//             onChange={this.handleChangeDes}
//             // value={currentData}
//           />
//             </div>
//             {isTextInputOpen ? (
//               <div class=" flex items-center ml-[0.3125em] mt-[0.3125em]"
            
//               >
//                 <br />
//                 <br />
//                 <TextInput
//                   placeholder="Add More"
//                   name="name"
//                   value={name}
//                   onChange={this.handleChange}
//                   width="61%"
//                   style={{ marginRight: "0.125em" }}
//                 />
//                 &nbsp;
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   disabled={!name}
//                   Loading={addingCertifications}
//                   onClick={this.handleAddCertification}
//                   style={{ marginRight: "0.125em" }}
//                 >
//                   Save
//                 </Button>
//                 &nbsp;
//                 <Button type="primary" ghost onClick={this.toggleInput}>
//                   Cancel
//                 </Button>
//               </div>
//             ) : (
//               <>
//                 <br />
//                 <div class=" flex justify-end" >
//                   <Button
//                     type="primary"
//                     ghost
//                     htmlType="button"
//                     Loading={addingCertifications}
//                     onClick={this.toggleInput}
//                   >
//                     Add Certification
//                   </Button>
//                 </div>
//               </>
//             )}
//             <div class=" flex flex-col" >
             
//               <MainWrapper style={{ height: "30em"}}>
//               {certifications.length ? (
//   certifications
//     .slice() 
//     .sort((a, b) => a.name.localeCompare(b.name)) 
//     .map((certification, i) => (
//                     <SingleCertification
//                       key={i}
//                       value={singleCertification}
//                       data="singleCertification"
//                       certification={certification}
//                       linkedCertification={linkedCertification}
//                       updatingCertifications={updatingCertifications}
//                       handleChange={this.handleChange}
//                       handleUpdateCertification={this.handleUpdateCertification}
//                       handleDeleteCertification={this.handleDeleteCertification}
//                       handleClear={this.handleClear}
//                       handleSearchChange={this.handleSearchChange}
//                       currentData={this.state.currentData}
//                       setCurrentData={this.setCurrentData}
//                     />
//                    ))
//                    ) : (
//                     <p>None Available</p>
//                   )}
//               </MainWrapper>
//             </div>
          
//           </MainWrapper>
//           <MainWrapper>
//             <div class=" flex w-full mr-[70px]"
//               style={{
//                 border: "0.0625em solid #eee",
//                 padding: "1.6rem",
//               }}
//             >
//               <p style={{ color: "#035b9b", fontSize: "1rem" }}>
//                 Here is the list of certifications that you will be able to attribute to your talent pool.
//               </p>
//               <p style={{ color: "#035b9b", fontSize: "1rem" }}>
//                 Korero allows you to edit and update the certifications as per your requirements.
//               </p>
//             </div>
//           </MainWrapper>
//         </div>
//         <div>Updated on {moment(this.props.certifications && this.props.certifications.length && this.props.certifications[0].updationDate).format("ll")} by {this.props.certifications && this.props.certifications.length && this.props.certifications[0].updatedname}</div>
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ certifications,auth }) => ({
//   addingCertifications:certifications.addingCertifications,
//   addingCertificationsError:certifications.addingCertificationsError,
//   certifications:certifications.certifications,
//   certificationId:certifications.certificationId,
//   userId: auth.userDetails.userId,
//    orgId: auth.userDetails.organizationId,
//    organizationId: auth.userDetails.organizationId,
//    updatingCertifications:certifications.updatingCertifications,
//    updatingCertificationsError:certifications.updatingCertificationsError,
//    fetchingCertifications:certifications.fetchingCertifications,
//    fetchingCertificationsError:certifications.fetchingCertificationsError,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getCertification, 
//        addCertification,
//        removeCertification,
//        updateCertification,
//         searchCertificationName,
//         ClearReducerDataOfCertification
//     },
//     dispatch
//   );
// export default connect(mapStateToProps, mapDispatchToProps)(Certification);
