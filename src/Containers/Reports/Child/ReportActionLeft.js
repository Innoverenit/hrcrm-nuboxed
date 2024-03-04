import React from "react";
import { bindActionCreators } from "redux";
import { Badge, Popover,Tooltip } from "antd";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Tag, } from "antd";
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { StyledSelect, } from "../../../Components/UI/Antd";
import {
  setSelectedReportType,
  setSelectedTimeIntervalReport,
  setReportViewType,
  setTimeRangeReport,
  setSubSelectedReportType,
} from "../ReportAction";
const Option = StyledSelect.Option;
class ReportActionLeft extends React.Component {
  // state = {
  //   // dropdownData: {
  //   //   investorTypes: ["Investor List","Investor all contacts","All Deals","Open Deals","Closed Deals","Pitch"],
  //   //   prospectTypes: ["Prospect List","Prospect all contacts","All Opportunities","Open Opportunities","Closed Opportunities","Pitch"],
  //   //   hrTypes: ["Employee","Suspended Employee","All Attendedance","Expenses","Mileages","Leaves"],
  //   //   recruitProType: ["Requirement", "Selected"],
  //   //   // Add more icons and corresponding items as needed
  //   // },
  //   activeIcon: null,
  // };
  // handleIconClick = (iconKey) => {
  //   this.setState({ activeIcon: iconKey });
  // };
  render() {
    const {
      reportTypes,
      handleIconClick,
      reportType,
      investorTypes,
      selectedReportType,
      dateRangeList,
      reportViewType,
      setReportViewType,
      setTimeRangeReport,
      setSelectedReportType,
      setSelectedTimeIntervalReport,
      role,
      user,
      activeIcon,
      dropdownData,
      selectedSubReportType,
      reportOpportunitySubTypes,
      reportRequirementSubTypes,
      setSubSelectedReportType,
      reportTaskSubTypes,
      reportMileageSubTypes,
    } = this.props;
    const creationDate = user.creationDate;
    const dynamicData = [{ userName: "Samli", id: "1" }, { userName: "priya", id: "2" }]
    console.log(selectedSubReportType)
    return (
      <div class=" flex items-center" >

{/* <div class="flex w-[12rem] ">
        <Badge
        size="small"
      >
        <span class=" cursor-pointer ml-2 "
          > 
              <Tooltip title="My Details">
          <PersonIcon  style={{ fontSize: "1rem" }}/>
          </Tooltip>
        
        </span>
        </Badge>
        {user.hrInd === true  && (
        <Badge
        size="small"
      >
        <span class="cursor-pointer ml-2" 
 onClick={() => handleIconClick("hrTypes")}
        >
         <Tooltip title="HR">
             
     <FactCheckIcon
                style={{ fontSize: "1rem", }}
              />
              </Tooltip>
        </span>
  </Badge>
          )} 
    {user.crmInd === true && (
        <Badge
        size="small"
      >
        <span class="cursor-pointer ml-2"
          onClick={() => handleIconClick("prospectTypes")}
      
        >
          <Tooltip title="Prospects">
          <ApartmentIcon

style={{ fontSize: "1rem", }}
/>
</Tooltip>        
        </span>
        </Badge>
 )} 
       

   
    {user.erpInd === true && (
         <Badge
         size="small"
       >
        <span class="cursor-pointer ml-2"

        >
          <Tooltip title="Customers">
          <AcUnitIcon
                style={{ fontSize: "1rem", }}
              />
          </Tooltip>
        </span>
        </Badge>
  )}
{user.erpInd === true  && (
      <Badge
      size="small"
    >
        <span class="cursor-pointer ml-2"
        >  <Tooltip title="Order">
          <DynamicFeedIcon
                style={{ fontSize: "1rem", }}
              />
           </Tooltip>
        </span>
        </Badge>
 )} 
   
    {user.erpInd === true && (
        <Badge
        size="small"
        // count={(props.reportViewType === "card" && props.leadsCountData.LeadsDetails) || 0}
        // overflowCount={999}
      >
        <span class="cursor-pointer ml-2"
            // onClick={() => this.handleIconClick("investorTypes")}
        // onClick={() => handleButtonClick("Finance")} 
        // style={{
        //   color:activeButton === "Finance" && "tomato",
          
        // }}
        >
           <Tooltip title="Finance">
          <ReceiptIcon  style={{ fontSize: "1rem" ,}}/>
          </Tooltip>
          
        </span>
        </Badge>
     )} 
        {user.imInd === true  && (
            <Badge
            size="small"
            // count={(props.reportViewType === "card" && props.leadsCountData.LeadsDetails) || 0}
            // overflowCount={999}
          >
        <span class="cursor-pointer ml-2"
         onClick={() => handleIconClick("investorTypes")}
        // onClick={() => setReportViewType("investor")} 
        // style={{
        //   color:activeButton === "Investors" && "tomato",
    
        // }}
        >  
        <Tooltip title="Investors">
          <LocationCityIcon

style={{ fontSize: "1rem" ,}}
/>
</Tooltip>       
        </span>
        </Badge>
 )} 
    
   </div> */}
          {user.department === "Management" && (
              <>
              <div class=" flex ">
              <div class=" mt-2 ml-2">
                  <Tag
                    color={reportViewType === "ALL" ? "tomato" : "#FFA500"}
                    style={{
                      cursor: "pointer",
                      fontWeight: reportViewType === "ALL" ? "bold" : null,
                      textAlign: "center",
                      fontFamily:"poppins",
                      borderColor: "tomato",
                    }}
                    onClick={() => setReportViewType("ALL")}
                  >
                    {/* Organization */}
                    <FormattedMessage
                      id="app.enterprise"
                      defaultMessage="Enterprise"
                    />
                  </Tag>
                </div>
                {/* <div>
                  <Tag
                    color={reportViewType === "ME" ? "	#FFA500" : "orange"}
                    style={{
                      cursor: "pointer",
                      fontWeight: reportViewType === "ME" ? "bold" : null,
                      textAlign: "center",
                      borderColor: "orange",
                    }}
                    onClick={() => setReportViewType("ME")}
                  >My View</Tag>
                </div> */}
                <div class=" mt-2">
              {reportViewType === "ME" ? (
                <StyledSelect
                  showSearch
                  width={"20%"}
                  placeholder="Select Report"
                  onChange={(type) => setSelectedReportType(type)}
                  defaultValue={selectedReportType}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {reportTypes.map((option, i) => (
                    <Option key={i} value={option}>
                      {option}
                    </Option>
                  ))}
                </StyledSelect>
              ) : (
                <StyledSelect
                  showSearch
                  width={"20%"}
                  placeholder="Select Report"
                  onChange={(type) => setSelectedReportType(type)}
                  defaultValue={selectedReportType}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {reportType.map((option, i) => (
                    <Option key={i} value={option}>
                      {option}
                    </Option>
                  ))}
                </StyledSelect>
              )}

            </div>
            {activeIcon && (
            <div class=" mt-2">
              {/* {reportViewType === "investor" ? ( */}
              <StyledSelect
                  showSearch
                  width={"20%"}
                  placeholder="Select Report"
                  onChange={(e) => this.props.handleDropChange(e)}
                  defaultValue={selectedReportType}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                   {dropdownData[activeIcon].map((item, i) => (
                <Option key={i} value={item}>
                  {item}
                </Option>
              ))}
                  {/* {investorTypes.map((option, i) => (
                    <Option key={i} value={option}>
                      {option}
                    </Option>
                  ))} */}
                </StyledSelect>
            

            </div>
               )}
                </div>
              </>
            )}
    </div>
    );
  }
}
const mapStateToProps = ({ report, auth }) => ({
  reportTypes: report.reportTypes,
  investorTypes:report.investorTypes,
  role: auth.userDetails.role,
  user: auth.userDetails,
  reportType: report.reportType,
  reportTypes: report.reportTypes,
  dateRangeList: report.dateRangeList,
  reportViewType: report.reportViewType,
  selectedReportType: report.selectedReportType,
  selectedSubReportType: report.selectedSubReportType,
  reportOpportunitySubTypes: report.reportOpportunitySubTypes,
  reportRequirementSubTypes: report.reportRequirementSubTypes,
  reportMileageSubTypes: report.reportMileageSubTypes,
  reportTaskSubTypes: report.reportTaskSubTypes,
  reportTaskSubTypes: report.reportTaskSubTypes,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setSelectedReportType,
      setSelectedTimeIntervalReport,
      setReportViewType,
      setTimeRangeReport,
      setSubSelectedReportType,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ReportActionLeft);
