import React, { useEffect, useState, useMemo, lazy } from "react";
import { StyledPopconfirm} from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {
  MultiAvatar2,
} from "../../../Components/UI/Elements";
import { Link } from 'react-router-dom';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { FormattedMessage } from "react-intl";
import { Tooltip, Button, Input } from "antd";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from "@mui/icons-material/Search";
import Highlighter from "react-highlight-words";
import "jspdf-autotable";
 import { getProjectsData,
  removeProjectData ,
  setEditProjects,
  handleUpdateProjectsModal,
  handleInvoiceProjectModal
} from "../../Projects/ProjectsAction";
import { OnlyWrapCard } from "../../../Components/UI/Layout";
const UpdateProjectsModal =lazy(()=> import('./UpdateProject/UpdateProjectsModal'));
const AddInvoiceProjectsModal =lazy(()=> import('./ProjectsDetail/AddInvoiceProjectsModal'));


function ProjectsTable(props) {
  useEffect(() => {
     props.getProjectsData(props.organizationId);
  }, []);
  console.log("data",props.projectsData);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState("");
  const [rowdata, setrowData] = useState({});

  const handleRowData = (data) => {
    setrowData(data);
  };
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  const handleExpandClick = () => {
    setIsExpanded(true);
  };

  const handleCollapseClick = () => {
    setIsExpanded(false);
  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }

  function handleSetCurrentProjectId(item) {
    setCurrentProjectId(item);
    // console.log("opp",item);
  }
  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 240, marginBottom: 8, display: "block" }}
          />

          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchIcon
          type="search"
          style={{ color: filtered ? "#1890ff" : undefined }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : "",
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // setTimeout(() => this.searchInput.select());
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    };
  }
  const {
    removeProjectData,
    handleUpdateProjectsModal,
    updateProjectsModal
  } = props;

  return (
    <>
        <div className=' flex justify-end sticky top-28 z-auto'>
            <OnlyWrapCard style={{ backgroundColor: "#eaedf1" }}>
                <div className=" flex text-xs font-bold font-poppins w-[90%] p-2 bg-transparent sticky top-0 z-10">
                    <div className="w-[21.1rem] md:w-[21.1rem]"><FormattedMessage
                        id="app.project"
                        defaultMessage="project"
                    /></div>
                    <div className="w-[27.1rem] md:w-[27.1rem]"><FormattedMessage
                        id="app.customer"
                        defaultMessage="customer"
                    /></div>
                    <div className="w-[9.8rem] md:w-[9.8rem] "><FormattedMessage
                        id="app.creator"
                        defaultMessage="Creator"
                    /></div>
                    <div className="w-[5.8rem] md:w-[5.8rem]"></div>
                    
                </div>
                {props.projectsData.map((item) => {
                    const currentdate = dayjs().format("DD/MM/YYYY");
                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                    return (
                        <div>
                            <div className="flex rounded  mt-4 bg-white h-12 items-center p-3 "

                            >
                                <div class="flex">
                                    <div className=" flex font-medium  md:w-[22.2rem] max-sm:w-full  ">
                                    <>
                                    <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`projects/${item.projectId}`} title={item.projectName}>
      {item.projectName}
    </Link>
             {/* <ProjectsDetailsView
               projectId={item.projectId}
               projectName={item.projectName}
             /> */}
             &nbsp;&nbsp;
             {date === currentdate ? (
               <span
                 style={{
                  color: "tomato",
                   fontWeight: "bold",
                 }}
               >
                 New
               </span>
            ) : null}
         </>
                                    </div>

                                    <div className=" flex font-medium   md:w-[26.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                        <div class=" text-xs  font-poppins">
                                        <span>
            {item.customerName === null ? (
                ""
              ) : (
                <MultiAvatar2
                  primaryTitle={item.customerName}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
                )}
            </span>
                                        </div>

                                    </div>
                                    <div className=" flex font-medium w-[21.2rem]  md:w-[8.2rem] max-sm:flex-row  max-sm:justify-between ">



                                        <div class=" text-sm  font-poppins">
                                        <span>
                 <MultiAvatar2
                  primaryTitle={item.creatorName}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className=" flex font-medium justify-end items-center w-[10.5rem] md:w-[24.5rem] max-sm:flex-row max-sm:justify-between ">
                                <Tooltip title="Create Invoice">
            <ReceiptIcon className="!text-icon"
           onClick={()=>{
             props.handleInvoiceProjectModal(true);
            // handlePassRowData(item);
            

           
          }}
          style={{fontSize:"0.8rem",cursor:"pointer"}}
           
           />
            </Tooltip>

                                  
                               
                                <Tooltip title="Edit">
             <BorderColorIcon  className="!text-icon"
              type="edit"
              style={{ cursor: "pointer", fontSize:"0.8rem"}}
              onClick={() => {
                props.setEditProjects(item);
               handleUpdateProjectsModal(true);
                handleSetCurrentProjectId(item);
             }}
            />
          </Tooltip>
                              
                                <StyledPopconfirm
            title="Do you want to delete?"
             onConfirm={() => removeProjectData(item.projectId)}
          >
            <DeleteIcon  className="!text-icon cursor-pointer text-red-600"
            type="delete" />
          </StyledPopconfirm>
                                </div>

                            </div>
                        </div>
                    )
                })}
            </OnlyWrapCard>
            <AddInvoiceProjectsModal
        // rowDataPass={rowDataPass}
        invoiceProjectModal={props.invoiceProjectModal}
        handleInvoiceProjectModal={props.handleInvoiceProjectModal}
        />

<UpdateProjectsModal
        updateProjectsModal={updateProjectsModal}
        projectData={currentProjectId}
        handleUpdateProjectsModal={handleUpdateProjectsModal}
        handleSetCurrentProjectId={handleSetCurrentProjectId}
      />
        </div>
      
    </>
)
}

const mapStateToProps = ({ projects,auth }) => ({
  projectsData: projects.projectsData,
  updateProjectsModal:projects.updateProjectsModal,
  fetchingProjectsData:projects.fetchingProjectsData,
  organizationId: auth.userDetails.organizationId,
  invoiceProjectModal:projects.invoiceProjectModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProjectsData,
      removeProjectData,
      setEditProjects,
      handleUpdateProjectsModal,
      handleInvoiceProjectModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTable);
