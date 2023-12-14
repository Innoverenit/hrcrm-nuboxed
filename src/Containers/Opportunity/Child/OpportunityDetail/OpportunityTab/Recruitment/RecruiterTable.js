import React, { useEffect, useState,useMemo } from "react";
import { connect } from "react-redux";
import SkillsLoadMore from "../../../../../Candidate/Child/CandidateTable/SkillsLoadMore";
import { bindActionCreators } from "redux";
import moment from "moment";
import { getCountries } from "../../../../../Auth/AuthAction";
import { LinkCandidateRecruit,LinkRecruitCandidate,getSkillsCount,getRecruiter } from "../../../../OpportunityAction";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import { Tooltip, Button, Input, } from "antd";
import Highlighter from 'react-highlight-words';
import { MultiAvatar, SubTitle } from "../../../../../../Components/UI/Elements";
import RecruiterSkillLoadMore from "./RecruiterSkillLoadMore";
import { SearchOutlined } from "@ant-design/icons";
import { CurrencySymbol } from "../../../../../../Components/Common";

const includesMulti = (elements, inArray) => {
  const unmatched = inArray.slice();
  for (const element of elements) {
    const matchIndex = unmatched.indexOf(element);
    if (matchIndex === -1) return false;
    unmatched.splice(matchIndex, 1);
  }
  return true;
};



function RecruiterTable(props) {
  console.log("ff",props.candidatePostData.filtercandidatetList)
  const data=props.candidatePostData.filtercandidatetList===null?[]:props.candidatePostData.filtercandidatetList.map((item)=>{
    return item.candidateId
    
  })
  // console.log("ren",data)

  const desc=props.skillsCount
  let result = Object.keys(desc).map(key => {
    return ({ name: key, id:key })
  }
  )
 
 


  console.log("desc",result)

  //  const desc1=result.map((item)=>{
  //   return item.name
  // })
  // console.log("desc1",desc1)

  useEffect(() => {
    props.getSkillsCount(props.candidatePostData.recruitmentId,props.organizationId,);
    props.getCountries();
       
  }, []);

  const filteredData = props.recruiter.filter((item) => { return item.match==="Best Match" })
  console.log("match",filteredData)
  const data2=filteredData.map((item)=>{
    return item.candidateId
  })
  console.log("match1",data2)

  // const mergeddata=data.concat(filteredData)
  // const data1=props.candidatePostData.match
   
    // console.log("GGG",data1)
  // const data1=props.candidatePostData.billing
  // console.log("match",data1)
  // const data1= Best Match

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState(data);
  const [selectedRowData, setSelectedRowData] = useState(data);
  const [button, setButton] = useState([]);
//const [selectedfilterData, setSelectedFilteredData] = useState("");
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState(0);
  const [state, setState] = useState({
    name: "bob",
    color: "blue"
  });

  // const handleColor = (row) => {
    
  // };

  

  
  

  // function handleRecruiter() {
  //   props.getRecruiter(props.candidatePostData.skillName,props.candidatePostData.recruitmentId,props.opportunityId,);
   
  // }

  // function handleFilterCandidate(value,row) {
  //   setSelected(row.id);
    
  //   setSelectedFilteredData( value,  )
  // }

  function handleButton(data) {
    const checkData = button.includes(data);
    if (!checkData) {
      setButton([...button, data]);
    }
  }

  const start = () => {
    setLoading(true); // ajax request after empty completing

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys, b) => {

    console.log('selectedRowKeys changed: ', selectedRowKeys, newSelectedRowKeys, b);
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRowData(newSelectedRowKeys)

  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

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
            // ref={node => {
            //   this.searchInput = node;
            // }}
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
             icon={<SearchOutlined />}
            //icon="search"
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          &nbsp;
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          &nbsp;
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
        // <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        <SearchOutlined type="search" style={{ color: filtered ? 'tomato' : '1890ff' }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
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
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    };
  }

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }
  const countryTypeOption = useMemo(() => {
    if (!props.countries) return [];
    return (
      props.countries.length &&
      props.countries.map((countries) => {
        return {
           text: countries.countryAlpha3Code|| "",
          value: countries.countryAlpha3Code
          ,
        };
      })
    );
  }, [props.countries]);
  console.log("country",countryTypeOption);


  const {
    recruiter
  } = props;
  console.log("Pop",recruiter);
  console.log("recruit",props.recruiter&&props.recruiter.length&&props.recruiter[0].currency)

  const columns = [

    // {
    //   title: "",
    //   width: "2%",
    //   render: (name, item, i) => {
    //     console.log(name);
    //     console.log(item);
    //     return (
    //       <>
    //         <FlexContainer justifyContect="space-evenly">
    //           <CandidateActivity
    //             item={item}
    //             fullName={item.fullName}
    //             opportunityId={props.opportunityId}
    //             candidatePostData={props.candidatePostData}
    //             // completionInd={item.completionInd}
    //           />
    //         </FlexContainer>
    //         {/* )} */}
    //       </>
    //     );
    //   },
    // },
    {
      title: "",
      dataIndex: "imageId",
      width: "3%",
      render: (name, item, i) => {
        return (
          <SubTitle>
              <Tooltip title={item.fullName}>
            <MultiAvatar
              primaryTitle={item.fullName}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"2.5em"}
              imgHeight={"2.5em"}
            />
          </Tooltip>
          </SubTitle>
        );
      },
    },

    {
      title: "Name",
      //   title: <FormattedMessage id="app.url" defaultMessage="URL" />,
      dataIndex: "fullName",
      ...getColumnSearchProps('fullName'),
      width: "12%",
      render: (name, item, i) => {
        return (
          <>
            {item.fullName} &nbsp;&nbsp;
            <span
              style={{
                color: "tomato",
                fontWeight: "bold",
                fontSize: "0.9em",
              }}

            >
              {item.match}
            </span>
          </>
        );
      },
    },

    {
      title:"Score"
    },
    {
      title: "Skills",
      dataIndex: "skillList",
      ...getColumnSearchProps('skillList'),
      width: "15%",
      render: (name, item, i) => {
        const data=item.skillList.filter((skill)=>{
          return skill!==null&&skill!==""
         }
         )
        return (
          <span>
            <SkillsLoadMore
              skillList={data}
            />
          </span>

         
        );
      }

     


    },
    {
      title: "Matched Skill",
      //dataIndex:"matchSkill",
      width: "15%",
      sorter: (a, b) => {
        var nameA = a.matchSkill; // ignore upper and lowercase
        var nameB = b.matchSkill; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      },
      render: (name, item, i) => {
        const data=item.matchSkill===null?[]:item.matchSkill.filter((skill)=>{
         return skill!==null&&skill!==""
        }
        )
         return <>
  
           {/* {item.skillList===[] ? "No Data" : */}
           <span>
             <RecruiterSkillLoadMore
             matchSkill={data}
             />
           </span>
       {/* } */}
           </>
         
       },
    },

    {
      title: "Cost",
      dataIndex: "billing",
      width: "7%",
      sorter: (a, b) => {
        var nameA = a.billing; // ignore upper and lowercase
        var nameB = b.billing; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      },
      render: (name, item, i) => {
        return (
          <>
           {/* {item.billing} {item.currency} */}
        
            <span>
          <CurrencySymbol currencyType={item.currency} />
          {item.billing}
          </span>
          
          </>
        );
      },



    },
    {
      title: "Vendor",
      //   title: <FormattedMessage id="app.url" defaultMessage="URL" />,
      dataIndex: "partnerName",
      ...getColumnSearchProps('partner'),
      width: "9%",

    },
    {
      title: "Country",
      //   title: <FormattedMessage id="app.url" defaultMessage="URL" />,
      dataIndex: "country",
      filters: countryTypeOption,

      onFilter: (value, record) => {
        return record.country === value;
      },
      //  ...getColumnSearchProps('partner'),
      width: "7%",

    },
    {
      title: "Role",
      //   title: <FormattedMessage id="app.url" defaultMessage="URL" />,
      dataIndex: "roleType",
      ...getColumnSearchProps('role'),
      width: "7%",

    },
    {
      title: "Availability",
      //   title: <FormattedMessage id="app.url" defaultMessage="URL" />,
      dataIndex: "availableDate",

      width: "8%",
      sorter: (a, b) => {
        var nameA = a.availableDate; // ignore upper and lowercase
        var nameB = b.availableDate; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
  
        return 0;
      },
      render: (text, item) => {
        const availableDate = moment(item.availableDate).format("ll");
        return <>
          {item.availableDate === null ? "No Data" :
            <span>
              {moment(item.availableDate).format("l")} &nbsp;&nbsp;
            </span>
          }
        </>
      },


    },
    {
      // title: <FormattedMessage 
      // id="app.category" defaultMessage=""
      //  />,
      dataIndex: "category",
      width: "3%",
      render: (name, item, i) => {
        //debugger;
        return (
          <div>
          
              <Tooltip title={item.category}>
              <div
                style={{
                  borderRadius: "45%",
                  height: "1.1em",
                  width: "1.1em",
                  // backgroundColor: "blue",
                  backgroundColor:
                  item.category === "White" ?"bisque":item.category === "Blue" ?  "#00afff":item.category==="Both"&&"grey",
                }}
              >
              </div>
              </Tooltip>
          
          
          
         
          
          </div>
        );
      },
    },

    {
      title:"Distance(km)",
      width: "7%",
      dataIndex:"distance" ,
      textAlign: "center",
      
    },

    {
      title: "Type",
      dataIndex:"workType",
      width: "7%",
      filters: [
        { text: "Contract", value: "Contract" },
        { text: "Permanent", value: "Permanent" },
     
      ],
      onFilter: (value, record) => {
        return record.workType === value;
        // sorter: (a, b) => a.type > b.type,
      },
    },

    {
      title: "Work Preference",
       dataIndex:"workPreference",
       width: "12%",
       filters: [
        { text: "Remote", value: "Remote" },
        { text: "Hybrid", value: "Hybrid" },
        
        { text: "Office", value: "Office" },
     
      ],
      onFilter: (value, record) => {
        return record.workPreference === value;
        // sorter: (a, b) => a.type > b.type,
      },
       
    },

  ];

  const getIndexSkillData = recruiter.filter((data, index) => {
    if (button.length !== 0 && includesMulti(button, data.skillList)) {
      return data;
    }
  });

 // const filterValue = "horror";
 // const finalFilteredRecruiters = selectedfilterData.length===0?recruiter:recruiter.filter(val => val.skillList.includes(selectedfilterData));
 // const filteredBooks = books.filter(val => val.areas.some((el)=>filterValue.includes(el)));
  //const finalFilteredRecruiters = selectedfilterData.length===0?recruiter:recruiter.filter(val => val.skillList.some((el)=>selectedfilterData.includes(el)));
  // console.log("Filter",finalFilteredRecruiters)
//   console.log("Filter1",selectedfilterData)
// console.log("Filter2",finalFilteredRecruiters);

const finalFilteredRecruiters=button.length > 0 ? getIndexSkillData : recruiter
console.log("final",finalFilteredRecruiters)


  return (
    <>
      {/* <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}> */}
     
      <span
        style={{
          marginLeft: 8,
        }}
      >
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
      </span>
     
      
     
<div style={{textAlign:"center",marginTop:"-26px"}}>
<Button type="primary" 
       onClick={()=>setButton([])}
      >
        Clear Search
      </Button>
       {result.map((item,i) => {
            return (
              <>
             
                <Button
                 onClick={()=>{
                  
                   handleButton(item.name)
                 
     }}
    //  key={item.id}
     
    style={{ backgroundColor: button.includes(item.name) ? "tomato" : "white" }}
                
                // style={{
                //     border: `1px solid`,
                //     padding: "0px 0.4em",
                //     textAlign: "center",
                //     margin: "2px",
                //     borderRadius: "0.4em",
                //  // backgroundColor: item.name === selectedfilterData ? "red" : ""
                //     // color: selectedfilterData ? 'white' : '', 
                //   }}
                  >

                    {item.name}
                    </Button>
        
              </>
            );
          })} 

<Button
type="primary" 
>
          Check Interest
        </Button>
        </div>

        
         
      <StyledTable
        rowKey="candidateId"
        columns={columns}
        dataSource={finalFilteredRecruiters}
        scroll={{ y: 460 }}
         rowSelection={rowSelection}
        pagination={false}
      />
      <Button type="primary" onClick={() => {
        console.log(props.item)
        if (props.role === "USER" && props.user.department === "Recruiter") {
        props.LinkRecruitCandidate(
          {
            opportunityId: props.candidatePostData.opportunityId,
            stageId: props.candidatePostData.stageId,
            recruitOwner :props.userId,
            recruitmentProcessId: props.candidatePostData.recruitmentProcessId,

            recruitmentId: props.candidatePostData.recruitmentId,
            profileId: props.candidatePostData.profileId,
            candidateIds: selectedRowData
          },
          props.opportunityId,
        );
      } else {
        props.LinkCandidateRecruit(
          {
            opportunityId: props.candidatePostData.opportunityId,
            stageId: props.candidatePostData.stageId,
            recruitOwner :props.userId,
            recruitmentProcessId: props.candidatePostData.recruitmentProcessId,

            recruitmentId: props.candidatePostData.recruitmentId,
            profileId: props.candidatePostData.profileId,
            candidateIds: selectedRowData
          },
          props.opportunityId,
        );
      }

      }}>Select</Button>
    </>
  );
}
// }
const mapStateToProps = ({ auth, opportunity }) => ({

  organizationId: auth.userDetails.organizationId,
  skillsCount:opportunity.skillsCount,
  userId:auth.userDetails.userId,
  user: auth.userDetails,
  role: auth.userDetails.role,
  countries:auth.countries,
  fetchingRecruiter: opportunity.fetchingRecruiter,
  opportunityId: opportunity.opportunity.opportunityId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      LinkCandidateRecruit,
      LinkRecruitCandidate,
      getSkillsCount,
      getRecruiter,
      getCountries
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(RecruiterTable);










// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import SkillsLoadMore from "../../../../../Candidate/Child/CandidateTable/SkillsLoadMore";
// import { FormattedMessage } from "react-intl";
// import { bindActionCreators } from "redux";
// import moment from "moment";
// // import StatusToggle from "./StatusToggle";
// // import moment from "moment";
// // import Highlighter from 'react-highlight-words';
// // import { EditOutlined, SearchOutlined } from "@ant-design/icons";
// import { StyledTable } from "../../../../../../Components/UI/Antd";
// import { FlexContainer } from "../../../../../../Components/UI/Layout";
// import { Tooltip, Icon,Button,Input, } from "antd";
// import Highlighter from 'react-highlight-words';
// import CandidateActivity from "./CandidateActivity";
//  import { MultiAvatar, SubTitle } from "../../../../../../Components/UI/Elements";
// import { 
//   // getAllPartnerListByUserId,
//   // getRecruiter,
  
//  } from "../../../../OpportunityAction";
// // import { BundleLoader } from "../../../../Components/Placeholder";
// // import PartnerDetailView from "./PartnerDetailView";
// // import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
// // import UpdatePartnerModal from "../UpdatePartner/UpdatePartnerModal";



// function RecruiterTable(props) {

//   const [searchText, setSearchText] = useState("");
//   const [searchedColumn, setSearchedColumn] = useState("");

//   function getColumnSearchProps(dataIndex) {
//     return {
//       filterDropdown: ({
//         setSelectedKeys,
//         selectedKeys,
//         confirm,
//         clearFilters,
//       }) => (
//         <div style={{ padding: 8 }}>
//           <Input
//             // ref={node => {
//             //   this.searchInput = node;
//             // }}
//             placeholder={`Search ${dataIndex}`}
//             value={selectedKeys[0]}
//             onChange={(e) =>
//               setSelectedKeys(e.target.value ? [e.target.value] : [])
//             }
//             onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             style={{ width: 240, marginBottom: 8, display: "block" }}
//           />
          
//             <Button
//               type="primary"
//               onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//               // icon={<SearchOutlined />}
//               icon="search"
//               size="small"
//               style={{ width: 90 }}
//             >
//               Search
//             </Button>
//             &nbsp;
//             <Button
//               onClick={() => handleReset(clearFilters)}
//               size="small"
//               style={{ width: 90 }}
//             >
//               Reset
//             </Button>
//             &nbsp;
//             <Button
//               type="link"
//               size="small"
//               onClick={() => {
//                 confirm({ closeDropdown: false });
//                 setSearchText(selectedKeys[0]);
//                 setSearchedColumn(dataIndex);
//               }}
//             >
//               Filter
//             </Button>
          
//         </div>
//       ),
//       filterIcon: (filtered) => (
//         // <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
//         <Icon type="search" style={{ color: filtered ? 'tomato' : '1890ff' }} />
//       ),
//       onFilter: (value, record) =>
//         record[dataIndex]
//           .toString()
//           .toLowerCase()
//           .includes(value.toLowerCase()),
//       onFilterDropdownVisibleChange: (visible) => {
//         if (visible) {
//           // setTimeout(() => this.searchInput.select());
//         }
//       },
//       render: (text) =>
//         searchedColumn === dataIndex ? (
//           <Highlighter
//             highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
//             searchWords={[searchText]}
//             autoEscape
//             textToHighlight={text.toString()}
//           />
//         ) : (
//           text
//         ),
//     };
//   }

//   function handleSearch(selectedKeys, confirm, dataIndex) {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   }

//   function handleReset(clearFilters) {
//     clearFilters();
//     setSearchText("");
//   }
  

//   const {
//     recruiter
//   } = props;
//   console.log(recruiter);
   
//   const columns=[

//     {
//       title: "",
//       width: "2%",
//       render: (name, item, i) => {
//         console.log(name);
//         console.log(item);
//         return (
//           <>
//             <FlexContainer justifyContect="space-evenly">
//               <CandidateActivity
//                 item={item}
//                 fullName={item.fullName}
//                 opportunityId={props.opportunityId}
//                 candidatePostData={props.candidatePostData}
//                 // completionInd={item.completionInd}
//               />
//             </FlexContainer>
//             {/* )} */}
//           </>
//         );
//       },
//     },
//     {
//       title: "",
//       dataIndex: "imageId",
//       width: "3%",
//       render: (name, item, i) => {
//         return (
//           <SubTitle>
//             <MultiAvatar
//               primaryTitle={item.firstName}
//               imageId={item.imageId}
//               imageURL={item.imageURL}
//               imgWidth={"2.5em"}
//               imgHeight={"2.5em"}
//             />
//           </SubTitle>
//         );
//       },
//     },
  
//     {
//       title: "Name",
//     //   title: <FormattedMessage id="app.url" defaultMessage="URL" />,
//        dataIndex: "fullName",
//        ...getColumnSearchProps('fullName'),
//       width: "12%",
//       render: (name, item, i) => {        
//         return (
//           <>
//             {item.fullName} &nbsp;&nbsp;
//             <span
//                 style={{
//                   color: "tomato",
//                   fontWeight: "bold",
//                   fontSize:"0.9em",
//                 }}
                
//               >
//                 {item.match}
//               </span>
//           </>
//         );
//       },
//     },
//     {
//        title: "Skills",
//         dataIndex: "skillList",
//        ...getColumnSearchProps('skillList'),
//       width: "28%",
//       render: (name, item, i) => {
//         return (
//           <span>
//             <SkillsLoadMore
//             skillList={item.skillList}
//             />
//           </span>

//         // return (
//         //   // <span>{item.skill && item.skill[0].skillName}</span>
//         //   //   <>
//         //   //   <SkillsForm topics={item.skill} />
//         //   // </>
//         //   <>
//         //     <div
//         //       style={{
//         //         display: "flex",
//         //         flexWrap: "wrap",
//         //         width: "100%",
//         //       }}
//         //     >
//         //       {item.skillList && item.skillList.map((option, i) => {
//         //         return (
  
//         //           <div key={i} style={{
//         //             border: "2px solid rgb(125 241 193)",
//         //             padding: "0px 0.62em",
//         //             textAlign: "center",
//         //             margin: "2px",
//         //             borderRadius: "0.62em",
//         //           }}>
//         //             {option}
//         //           </div>
  
//         //         );
//         //       })}
//         //     </div>
//         //   </>
//          );
//       }
      

//     },

//     {
//       title: "Cost",
//       dataIndex: "billing",
//      width: "7%",
//      sorter: (a, b) => {
//       var nameA = a.billing; // ignore upper and lowercase
//       var nameB = b.billing; // ignore upper and lowercase
//       if (nameA < nameB) {
//         return -1;
//       }
//       if (nameA > nameB) {
//         return 1;
//       }

//       return 0;
//     },
//      render: (name, item, i) => {        
//       return (
//         <>
//           {item.billing} {item.currency}
//         </>
//       );
//     },
   
     

//    },
//    {
//     title: "Partner",
//   //   title: <FormattedMessage id="app.url" defaultMessage="URL" />,
//      dataIndex: "partner",
//      ...getColumnSearchProps('partner'),
//     width: "9%",
    
//   },
//   {
//     title: "Country",
//   //   title: <FormattedMessage id="app.url" defaultMessage="URL" />,
//      dataIndex: "country",
//     //  ...getColumnSearchProps('partner'),
//     width: "7%",
    
//   },
//   {
//     title: "Role",
//   //   title: <FormattedMessage id="app.url" defaultMessage="URL" />,
//      dataIndex: "role",
//      ...getColumnSearchProps('role'),
//     width: "7%",
    
//   },
//    {
//     title: "Availability",
//   //   title: <FormattedMessage id="app.url" defaultMessage="URL" />,
//       dataIndex: "availableDate",
     
//     width: "10%",
//     render: (text, item) => {
//       const availableDate = moment(item.availableDate).format("ll");
//       return <>
//       {item.availableDate === null ? "No Data" :
//         <span>
//           {moment(item.availableDate).format("l")} &nbsp;&nbsp;
//         </span>
//       }
//     </>
//     },
  
    
//   },
//   {
//     title:"Category"
//   },

// ];
// //   if (fetchingPartnersError) {
// //     return <APIFailed />;
// //   }
//   return (
//     <>
//       <StyledTable
//         rowKey="profileId"
//         columns={columns}
//          dataSource={recruiter}
//         //  rowSelection={props.rowSelectionForRecruiter}
//         // dataSource={allpartnerByUserId}
//         // Loading={fetchingPartners || fetchingPartnersError}
//         scroll={{ y: 460 }}
//         // pagination={false
//           // defaultPageSize: 15,
//           // showSizeChanger: true,
//           // pageSizeOptions: ["15", "25", "40", "50"],
//         // }
//           pagination={false}
//       />

//       {/* <UpdatePartnerModal
//         partnerId={currentPartnerId}
//         updatePartnerModal={updatePartnerModal}
//         handleUpdatePartnerModal={handleUpdatePartnerModal}
//         handleSetCurrentPartnerId={handleSetCurrentPartnerId}
//       /> */}
//     </>
//   );
// }
// // }
// const mapStateToProps = ({ auth, opportunity }) => ({
 
//   fetchingRecruiter:opportunity.fetchingRecruiter,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       //  getRecruiter
//     },
//     dispatch
//   );
// export default connect(mapStateToProps, mapDispatchToProps)(RecruiterTable);
