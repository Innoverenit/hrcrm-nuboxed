import React, { useState, useEffect, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { MainWrapper } from "../../../Components/UI/Layout";
import { TextInput } from "../../../Components/UI/Elements";
import dayjs from "dayjs";
import {
  getLibrarys,
  getLibraryRecords,
  addLibrarys,
  removeSkills,
  updateLibrarys,
  searchLibraryName,
  ClearReducerDataOfLibrary,
} from "./LibraryAction";
const SingleLibrary = lazy(() => import("./SingleLibrary"));

const Library = ({
  getLibrarys,
  getLibraryRecords,
  addLibrarys,
  removeSkills,
  updateLibrarys,
  searchLibraryName,
  ClearReducerDataOfLibrary,
  fetchingLibrarys,
  fetchingLibrarysError,
  librarys,
  addingLibrarys,
  updatingLibrarys,
  userId,
  orgId,
  organizationId,
}) => {
  const [linkedLibrarys, setLinkedLibrarys] = useState([]);
  const [isTextInputOpen, setIsTextInputOpen] = useState(false);
  const [name, setName] = useState("");
  const [singleLibrary, setSingleLibrary] = useState("");
  const [editInd, setEditInd] = useState(true);
  const [currentData, setCurrentData] = useState("");

  const handleChangeDes = (e) => {
    setCurrentData(e.target.value);

    if (e.target.value.trim() === "") {
      // Assuming you have pageNo in the state
      // setPageNo((prevPageNo) => prevPageNo + 1);
      getLibrarys(organizationId);
      ClearReducerDataOfLibrary();
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      // Perform the search
      searchLibraryName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleClear = () => {
    setCurrentData("");
    getLibrarys(organizationId);
  };

  const handleSearchChange = (e) => {
    setCurrentData(e.target.value);
  };

  const toggleInput = () => setIsTextInputOpen((prev) => !prev);

  const handleChange = (e) => setName(e.target.value);

  const handleAddLibrary = () => {
    let library = { name, editInd, userId, orgId: organizationId };

    let exist =
      librarys &&
      librarys.some((element) => element.name === name);

    addLibrarys(library, () => console.log("add library callback"));

    setName("");
    setSingleLibrary("");
    setIsTextInputOpen(false);
    setEditInd(true);
  };

  const handleUpdateLibrary = (name, definationId, cb) => {
    updateLibrarys(name, definationId, cb);
    setName("");
    setSingleLibrary("");
  };

  const handleDeleteSkill = (definationId) => {
    removeSkills(definationId);
    setName("");
    setSingleLibrary("");
  };

  useEffect(() => {
    getLibrarys(organizationId);
    getLibraryRecords(orgId);
  }, [getLibrarys,getLibraryRecords, organizationId,orgId]);

  if (fetchingLibrarys) return <p>Loading ...</p>;
  if (fetchingLibrarysError) return <p>Error ...</p>;

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
                onChange={handleChange}
                width="61%"
                style={{ marginRight: "0.125em" }}
              />
         
              <Button
                type="primary"
                htmlType="submit"
                disabled={!name}
                loading={addingLibrarys}
                onClick={handleAddLibrary}
                style={{ marginRight: "0.125em" }}
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
              <br />
              <div className="flex justify-end">
                <Button
                  type="primary"
                  ghost
                  htmlType="button"
                  loading={addingLibrarys}
                  onClick={toggleInput}
                >
                  Add Skill
                </Button>
              </div>
            </>
          )}
          </div>
          <div className="flex flex-col">
            <div>
            {/* <MainWrapper style={{ height: "34rem" }}> */}
              {librarys.length ? (
                librarys
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((library, i) => (
                    <SingleLibrary
                      key={i}
                      value={singleLibrary}
                      data="singleLibrary"
                      library={library}
                      linkedLibrarys={linkedLibrarys}
                      updatingLibrarys={updatingLibrarys}
                      handleChange={handleChange}
                      handleDeleteSkill={handleDeleteSkill}
                      handleUpdateLibrary={handleUpdateLibrary}
                      handleClear={handleClear}
                      handleSearchChange={handleSearchChange}
                      currentData={currentData}
                      setCurrentData={setCurrentData}
                    />
                  ))
              ) : (
                <p>None Available</p>
              )}
            {/* </MainWrapper> */}</div>
          </div>
        </MainWrapper>
      </div>
      <div>
        Updated on{" "}
        {dayjs(
          librarys && librarys.length && librarys[0].updationDate
        ).format("ll")}{" "}
        by {librarys && librarys.length && librarys[0].updatedName}
      </div>
    </>
  );
};

const mapStateToProps = ({ librarys, auth }) => ({
  addingLibrarys: librarys.addingLibrarys,
  addingLibrarysError: librarys.addingLibrarysError,
  librarys: librarys.librarys,
  updatingLibrarys: librarys.updatingLibrarys,
  updatingLibrarysError: librarys.updatingLibrarysError,
  fetchingLibrarys: librarys.fetchingLibrarys,
  fetchingLibrarysError: librarys.fetchingLibrarysError,
  userId: auth.userDetails.userId,
  libraryRecordData:librarys.libraryRecordData,
  orgId: auth.userDetails.organizationId,
  organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLibrarys,
      getLibraryRecords,
      addLibrarys,
      removeSkills,
      updateLibrarys,
      ClearReducerDataOfLibrary,
      searchLibraryName,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Library);







// import React, { Component ,lazy} from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Button,Input } from "antd";
// import { AudioOutlined } from "@ant-design/icons";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
// import { MainWrapper } from "../../../Components/UI/Layout";
// import { TextInput,  } from "../../../Components/UI/Elements";
// import dayjs from "dayjs";
// import {
//   getLibrarys,
//   addLibrarys,
//   removeSkills,
//   updateLibrarys,
//   searchLibraryName,
//   ClearReducerDataOfLibrary
// } from "./LibraryAction";
// const SingleLibrary = lazy(() => import("./SingleLibrary"));

// class Library extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       linkedLibrarys: [],
//       isTextInputOpen: false,
//       addingLibrary: false,
//       name: "",
//       singleLibrary: "",
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
//       this.props.getLibrarys(this.props.organizationId);
//       this.props.ClearReducerDataOfLibrary();
//     }
//   };
//   handleSearch = () => {
//     if (this.state.currentData.trim() !== "") {
//       // Perform the search
//       this.props.searchLibraryName(this.state.currentData);
//     } else {
//       console.error("Input is empty. Please provide a value.");
//     }
//   };
//   handleClear = () => {
//     this.setState({ currentData: "" });
//     this.props.getLibrarys(this.props.organizationId);
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
//   handleAddLibrary = () => {
//     const { addLibrarys, librarys } = this.props;
//     const { name,editInd, addingLibrarys, isTextInputOpen } = this.state;
//     let library = { name,editInd,userId: this.props.userId, orgId: this.props.organizationId};

//     let exist =
//     librarys &&
//     librarys.some((element) => element.name == name);

//     // if (exist) {
//     //   message.error(
//     //     "Can't create as another library type exists with same name!"
//     //   );
//     // } else {
//     //   addLibrarys(library, () => console.log("add library callback"));
//     // }
//     addLibrarys(library, () => console.log("add library callback"));

//     this.setState({
//       name: "",
//       singleLibrary: "",
//       isTextInputOpen: false,
//       editInd:true,
//     });
//   };
//   // handleDeleteLibrary = (id) => {
//   //   this.props.removeDocuments(id);
//   //   this.setState({ documentTypeName: "", singleDocument: "" });
//   // };
//   handleUpdateLibrary = (name,definationId, cb) => {
//     this.props.updateLibrarys(name,definationId,  cb);
//     this.setState({ name: "", singleLibrary: "" });
//    // let library = { name,userId: this.props.userId, orgId: this.props.organizationId};
//   };
//   handleDeleteSkill = (definationId = { definationId }) => {
//     this.props.removeSkills(definationId);
//     this.setState({ name: "", singleLibrary: "" });
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
//     const { getLibrarys,organizationId } = this.props;
//     console.log();
//     getLibrarys(organizationId);
//   }
//   render() {
//     const {
//       fetchingLibrarys,
//       fetchingLibrarysError,
//       librarys,
//       addingLibrarys,
//       updatingLibrarys,
//     } = this.props;
//     const {
//       isTextInputOpen,
//       name,
//       singleLibrary,
//       linkedLibrarys,
//     } = this.state;
//     const suffix = (
//       <AudioOutlined
//         onClick={SpeechRecognition.startListening}
//         style={{
//           fontSize: 16,
//           color: "#1890ff",
//         }}
//       />
//     );
//     const {
//       transcript,
//       listening,
//       resetTranscript,
//       browserSupportsSpeechRecognition,
//     } = useSpeechRecognition();
//     console.log(transcript);
//     if (fetchingLibrarys) return <p>Loading ...</p>;
//     if (fetchingLibrarysError) return <p>Error ...</p>;
//     return (
//       <>
//          <div class="flex flex-no-wrap" >
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
//              suffix={suffix}
//             onPressEnter={this.handleSearch}  
//             onChange={this.handleChangeDes}
//             // value={currentData}
//           />
//             </div>
//             {isTextInputOpen ? (
//            <div class=" flex items-center ml-[0.3125em] mt-[0.3125em]"
            
//            >
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
//                   Loading={addingLibrarys}
//                   onClick={this.handleAddLibrary}
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
//                     Loading={addingLibrarys}
//                     onClick={this.toggleInput}
//                   >
//                     Add Skill
//                   </Button>
//                 </div>
//               </>
//             )}
//             <div class=" flex flex-col" >
             
//               <MainWrapper style={{ height: "30em" }}>
//               {librarys.length ? (
//   librarys
//     .slice() 
//     .sort((a, b) => a.name.localeCompare(b.name)) 
//     .map((library, i) => (
//                     <SingleLibrary
//                       key={i}
//                       value={singleLibrary}
//                       data="singleLibrary"
//                       library={library}
//                       linkedLibrarys={linkedLibrarys}
//                       updatingLibrarys={updatingLibrarys}
//                       handleChange={this.handleChange}
//                       handleDeleteSkill={this.handleDeleteSkill}
//                       handleUpdateLibrary={this.handleUpdateLibrary}
//                       // handleDeleteDocument={this.handleDeleteDocument}
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
//               {/* <div>Updated on {dayjs(props.librarys && props.librarys.length && props.librarys[0].updationDate).format("ll")} by {props.librarys && props.librarys.length && props.librarys[0].name}</div>              */}
//             </div>
          
//           </MainWrapper>
//           {/* <MainWrapper>
//             <FlexContainer
//               style={{
//                 border: "0.0625em solid #eee",
//                 width: "100%",
//                 padding: "1.6rem",
//                 marginRight: 70,
//               }}
//             >
//                <p class="mt-2 text-red-600">
//       Getting a new business off the ground is a lot of hard work.
//       Here are five ideas you can use to find your first customers.
//     </p>
             
//               <p style={{ color: "#035b9b", fontSize: "1rem" }}>
//               Korero allows you to edit and update the skills as per your requirements.
//               </p>
//             </FlexContainer>
//           </MainWrapper> */}
//         </div>
//         <div>Updated on {dayjs(this.props.librarys && this.props.librarys.length && this.props.librarys[0].updationDate).format("ll")} by {this.props.librarys && this.props.librarys.length && this.props.librarys[0].updatedName}</div>
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ librarys,auth }) => ({
//   addingLibrarys: librarys.addingLibrarys,
//   addingLibrarysError: librarys.addingLibrarysError,
//   librarys: librarys.librarys,
//   // removingLibrarys: librarys.removingLibrarys,
//   // removingLibrarysError: librarys.removingLibrarysError,
//      updatingLibrarys: librarys.updatingLibrarys,
//      updatingLibrarysError: librarys.updatingLibrarysError,
//   fetchingLibrarys: librarys.fetchingLibrarys,
//   fetchingLibrarysError: librarys.fetchingLibrarysError,
//   userId: auth.userDetails.userId,
//   organizationId: auth.userDetails.organizationId,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getLibrarys, 
//       addLibrarys,
//       removeSkills,
//        updateLibrarys,
//        ClearReducerDataOfLibrary,
//        searchLibraryName,
//     },
//     dispatch
//   );
// export default connect(mapStateToProps, mapDispatchToProps)(Library);
