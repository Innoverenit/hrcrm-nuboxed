import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Badge, Tag, Tooltip, Avatar, Button } from "antd";
import OnDeviceTrainingIcon from '@mui/icons-material/OnDeviceTraining';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ShopIcon from '@mui/icons-material/Shop'
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ApartmentIcon from '@mui/icons-material/Apartment';
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
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }

  componentDidMount() {
    this.fetchMenuTranslations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        "Enterprise",
        "My View"
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };


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
          {user.department === "Management" && (
              <>
              <div class=" flex ">
              <div>
                  <Tag
                    color={this.props.userorgflipClick && reportViewType === "ALL" ? "tomato" : "#FFA500"}
                    style={{
                      cursor: "pointer",
                      fontWeight: this.props.userorgflipClick && reportViewType === "ALL" ? "bold" : null,
                      textAlign: "center",
                      fontFamily:"poppins",
                      borderColor: "tomato",
                    }}
                    onClick={() =>{ 
                      {!this.props.userorgflipClick ? setReportViewType("ALL") : setReportViewType("ME");}
                      this.props.UserOrgFlipClick();
                    }}
                  >
                {this.props.userorgflipClick ?
                    <FormattedMessage
                      id="app.enterprise"
                      defaultMessage="Enterprise"
                    />
                     : <FormattedMessage
                    id="app.myview"
                    defaultMessage="My View"
                  />}
                  </Tag>
                </div>
             

{this.props.selectedCategory === "Orders" && (
                <Badge
                  size="small"
                // count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
                // overflowCount={999}
                >
                  <span class="cursor-pointer mr-1"
                    onClick={() => this.props.handleButtonIcon("repair")}
                    style={{
                      color: this.props.selectedButtonIcon === "repair" && "tomato",

                    }}
                  >
                    <Tooltip title="Repair">
                      <Avatar style={{ background: this.props.selectedButtonIcon === "repair" ? "#f279ab" : "#4bc076" }}>
                        <OnDeviceTrainingIcon className="text-white !text-icon" />
                      </Avatar>
                    </Tooltip>

                  </span>
                </Badge>
              )}
         
{this.props.selectedCategory === "Orders" && (     
 <Badge
                  size="small"
                // count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
                // overflowCount={999}
                >
                  <span class="cursor-pointer mr-1"
                    onClick={() => this.props.handleButtonIcon("Procure")}
                    style={{
                      color: this.props.selectedButtonIcon === "Procure" && "tomato",

                    }}
                  >
                    <Tooltip title="Procure">
                      <Avatar style={{ background: this.props.selectedButtonIcon === "Procure" ? "#f279ab" : "#4bc076" }}>
                        <ShopIcon className="text-white !text-icon" />
                      </Avatar>
                    </Tooltip>

                  </span>
                </Badge>
)}
{this.props.selectedCategory === "Orders" && (   
<Badge
                  size="small"
                // count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
                // overflowCount={999}
                >
                  <span class="cursor-pointer mr-1"
                    onClick={() => this.props.handleButtonIcon("production")}
                    style={{
                      color: this.props.selectedButtonIcon === "production" && "tomato",

                    }}
                  >  <Tooltip title="Production">
                      <Avatar style={{ background: this.props.selectedButtonIcon === "production" ? "#f279ab" : "#4bc076" }}>
                        <DynamicFeedIcon className="text-white !text-icon"

                        />
                      </Avatar>
                    </Tooltip>
                  </span>
                </Badge>)}
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
