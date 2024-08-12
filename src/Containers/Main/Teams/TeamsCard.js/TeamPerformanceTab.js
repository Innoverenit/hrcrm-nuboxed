import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SalaryForm from "../EmployeeTable/SalaryForm"
import styled from 'styled-components'
import { StyledDrawer } from "../../../../Components/UI/Antd";
import EmployeeTreeMap from "./EmployeeTreeMap";
import EmployeeDocumentView from "./EmployeeDrawer/EmployeeDocumentView";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import ContactsIcon from '@mui/icons-material/Contacts';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import UserKpiList from "./EmployeeDrawer/UserKpiList";
const TabPane = StyledTabs.TabPane;
class EmployeePulseDrawerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }
  handleTabChange = (key) => {
    this.setState({ activeKey: key });

  };
  render() {
    const {
      singleEmployee: { employeeId, middleName, lastName,candidateId },
      toggleViewType,
      singleEmployee,
    } = this.props;
    return (
      <div>
 <StyledDrawer
          title={this.props.employeeName.fullName}
          closable
          maskClosable={false}
          destroyOnClose
          width={"70%"}
          visible={this.props.addDrawerEmployeePulseModal}
        onClose={() => this.props.handleEmployeePulseDrawerModal(false)}
        
        >
          <Suspense fallback={<BundleLoader />}>
      
        
          {/* <EmployeeDocumentView
           employeeId={employeeId}
           documentsByEmployeeId={this.props.documentsByEmployeeId}
          //candidate={candidate}
          />

          <EmployeeTreeMap
          employeeTreeMap={this.props.employeeTreeMap}
          /> */}
        
        </Suspense>
         
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ profile, auth,employee,candidate }) => ({
    
  singleEmployee: employee.singleEmployee,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getCandidateById
      //getCandidateDocument
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmployeePulseDrawerModal);

