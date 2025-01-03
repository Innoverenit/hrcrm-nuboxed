import React, { } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { base_url } from "../../../Config/Auth";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Button, Tooltip } from "antd";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import { StyledSelect } from "../../../Components/UI/Antd";

const Option = StyledSelect.Option;

class EmployeesActionRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // translatedMenuItems: [],
    };
  }

  componentDidMount() {
    // this.fetchMenuTranslations();
  }
  handleClicked = (value) => {
    this.setState({
      isClicked: value,    
    });
    
  };
  componentDidUpdate(prevProps) {
    // if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
    //   this.fetchMenuTranslations();
    // }
  }

  // fetchMenuTranslations = async () => {
  //   try {
  //     const itemsToTranslate = [
  //    "85" //  'Add'
  //      ];

  //     const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
  //     this.setState({ translatedMenuItems: translations });
  //   } catch (error) {
  //     console.error('Error translating menu items:', error);
  //   }
  // };
  state = {
    isClicked: "import",
  };
 
  render() {
    const { handleEmployeeModal, userId,user } = this.props;
    return (
      <>
        <div class=" flex items-center">
          {this.props.role === "ADMIN" && (
            <Tooltip placement="left" title="XL">
              <a
                href={`${base_url}/excel/export/vendor/user/employee/${userId}`}
              >
                <InsertDriveFileIcon className="!text-icon" />
              </a>
            </Tooltip>
          )}
{user.userCreateInd === true || user.role === "ADMIN" ? (
          <Button
            type="primary"
         
            onClick={() => handleEmployeeModal(true)}
          >
          < DataSaverOnIcon className="!text-icon"/>  
          {this.props.translatedMenuItems[47]} {/* Add */}
          </Button>
         ):null} 
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ auth, team, account }) => ({
  userId: auth.userDetails.userId,
  role: auth.userDetails.role,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EmployeesActionRight)

