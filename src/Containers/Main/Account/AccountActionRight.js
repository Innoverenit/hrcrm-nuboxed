import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,  Tooltip } from "antd";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import UploadIcon from '@mui/icons-material/Upload';

class AccountActionRight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          translatedMenuItems: [],
        };
      }
    
      // componentDidMount() {
      //   this.fetchMenuTranslations();
      // }
    
      // componentDidUpdate(prevProps) {
      //   if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      //     this.fetchMenuTranslations();
      //   }
      // }
    
      // fetchMenuTranslations = async () => {
      //   try {
      //     const itemsToTranslate = [
            
              
             
      //      "85", // "Add",
      //      "123" // "Import"
            
            
      //     ];
    
      //     const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      //     this.setState({ translatedMenuItems: translations });
      //   } catch (error) {
      //     console.error('Error translating menu items:', error);
      //   }
      // };

    render() {
        const { handleDistributorModal, viewType,user } = this.props;
        return (
          <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
               
                 <div className="max-sm:hidden">
          <Button type="primary"  
        onClick={() => this.props.handleAccountImportModal(true)}
        >
          <UploadIcon className=" !text-icon"/> 
          {this.props.translatedMenuItems[23]} {/* Import */}
          </Button>
          </div>
           {viewType === "list" ? (
            <Tooltip title="Create">
                {user.accountCreateInd === true && user.erpInd === true &&(
                <Button
                    type="primary"  onClick={() => handleDistributorModal(true)}>
                    <DataSaverOnIcon className=" !text-icon" /> 
                    {this.props.translatedMenuItems[22]} {/* Add  */}
                </Button>
                )}
            </Tooltip>
        ) : null}
            </div>
        );
    }
}

const mapStateToProps = ({auth }) => ({
    user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountActionRight);
