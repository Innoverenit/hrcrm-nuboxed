import React, { useEffect, useState, useMemo, lazy } from "react";
import { StyledPopconfirm} from "../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {
  MultiAvatar2,
} from "../../Components/UI/Elements";
import ReceiptIcon from '@mui/icons-material/Receipt';
import BorderColorIcon from '@mui/icons-material/BorderColor';
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
} from "../Projects/ProjectsAction";
import { Link } from 'react-router-dom';
import { OnlyWrapCard } from "../../Components/UI/Layout";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DateRangeIcon from '@mui/icons-material/DateRange';
const UpdateProjectsModal =lazy(()=> import('./Child/UpdateProject/UpdateProjectsModal'));
const AddInvoiceProjectsModal =lazy(()=> import('./Child/ProjectsDetail/AddInvoiceProjectsModal'));



function ProjectsAllTable(props) {
      const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
      const [loading, setLoading] = useState(true)

        useEffect(() => {
          const fetchMenuTranslations = async () => {
            try {
              setLoading(true); 
              const itemsToTranslate = [
                "137", // 'project', // 0
                "248", // 'Customer', // 1
                 // "",  // 'Creator', // 2
            "100",//new 2
               // Create Invoice
              "170" ,// Edit
              "1259" // Delete
              ];
      
              const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
              setTranslatedMenuItems(translations);
              setLoading(false);
            } catch (error) {
              setLoading(false);
              console.error('Error translating menu items:', error);
            }
          };
      
          fetchMenuTranslations();
        }, [props.selectedLanguage]);

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
      <div className=' flex justify-end sticky top-28 z-auto h-[90vh]'>
            <OnlyWrapCard style={{ backgroundColor: "white" }}>
            <div className=" flex font-poppins text-xs justify-between w-[98%] max-xl:text-[0.65rem] max-lg:text-[0.45rem] !text-lm   p-1 bg-transparent font-bold sticky items-end z-10 max-sm:hidden">
                    <div className="w-[15.7rem] text-[#00A2E8] text-sm truncate max-md:w-[21.1rem]">{translatedMenuItems[0]}
                      {/* project  */}
                      </div>
                    <div className="w-[12.1rem] truncate max-md:w-[27.1rem]">
                    <AcUnitIcon  className="!text-icon text-[#4f5d75]  "/>
                      {translatedMenuItems[1]}
                      {/* customer */}
                      </div>
                    <div className="w-[10.8rem] truncate max-md:w-[9.8rem] ">
                    
                    <AccountCircleIcon  className="!text-icon  text-[#C1121F]  " />
                   
                    {/* {translatedMenuItems[2]}        */}          
                    Owner</div>
                    <div className="w-[5.8rem] truncate max-md:w-[5.8rem]"><DateRangeIcon className="!text-icon text-[green]"/>Start Date</div>
                    <div className="w-[6.8rem] truncate max-md:w-[5.8rem]"><DateRangeIcon className="!text-icon text-[teal]"/>End Date</div>
                    
                </div>
                {props.projectsData.map((item) => {
                    const currentdate = dayjs().format("DD/MM/YYYY");
                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                    return (
                        <div>
                            <div className="flex rounded justify-between  bg-white mt-1 py-ygap items-center  max-xl:p-1 max-sm:h-[9rem] max-sm:scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "  >                 
                                                 <div class="flex max-sm:justify-between max-sm:w-wk items-center ">
                                                 <div className=" flex w-[27rem] h-8 max-md:w-[12rem] max-xl:w-[11rem] max-lg:w-[8rem] border-l-2 border-green-500 bg-[#eef2f9]  max-sm:w-auto">
                                                               <>
                                                               <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`/projects/${item.projectId}`} title={item.projectName}>
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
                 ><div class="text-[0.65rem] text-[tomato] font-bold">
                  {translatedMenuItems[2]} 
                 </div>
                  
                 {/* New */}
               </span>
            ) : null}
         </>
                                    </div>

                                    <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8  max-sm:w-auto w-[19.2rem] max-md:w-[4.2rem] max-xl:w-[6rem] max-lg:w-[5rem]  max-sm:flex-row  max-sm:justify-between ">
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
                                    <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8 w-[19rem]  max-sm:w-auto  max-md:w-[4.2rem] max-xl:w-[6rem] max-lg:w-[5rem]  max-sm:flex-row  max-sm:justify-between ">



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
                                <div className=" items-center justify-end flex bg-[#eef2f9] h-8 w-[16rem] max-xl:w-[1.25rem] max-sm:flex-row  max-sm:justify-between  ">
                                <div class=" text-xs  font-poppins">   <Tooltip title="Create Invoice">
            <ReceiptIcon  className=" !text-icon cursor-pointer text-[#df9697]"
           onClick={()=>{
             props.handleInvoiceProjectModal(true);
            // handlePassRowData(item);
            

           
          }}

           
           />
            </Tooltip>

                                  
                                </div>
                                <div className=" flex font-medium  max-sm:flex-row max-sm:justify-between ">
                                <Tooltip title={translatedMenuItems[3]} >
            <BorderColorIcon  className="!text-icon cursor-pointer text-[tomato]"
              type="edit"
              style={{ cursor: "pointer", fontSize:"0.8rem"}}
              onClick={() => {
                props.setEditProjects(item);
               handleUpdateProjectsModal(true);
                handleSetCurrentProjectId(item);
             }}
            />
          </Tooltip>
                                </div>
                                <div className=" flex font-medium  max-sm:flex-row max-sm:justify-between ">
                                <StyledPopconfirm
            title= {translatedMenuItems[4]} 
             onConfirm={() => removeProjectData(item.projectId)}
          >
                <DeleteIcon  className="!text-icon cursor-pointer text-[tomato]"
            type="delete" style={{ cursor: "pointer", color: "red",fontSize:"0.8rem" }} />
          </StyledPopconfirm>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsAllTable);
