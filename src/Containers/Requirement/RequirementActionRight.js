import React from "react";
import { Button,  Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
class CandidateActionRight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          translatedMenuItems: [],
        };
      }
    
      componentDidMount() {
        this.fetchMenuTranslations();
      }
      handleClicked = (value) => {
        this.setState({
          isClicked: value,    
        });
        
      };
      componentDidUpdate(prevProps) {
        if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
          this.fetchMenuTranslations();
        }
      }
    
      fetchMenuTranslations = async () => {
        try {
          const itemsToTranslate = [
            
              
             
           "85", // "Add",
           "123" // "Import"
            
            
          ];
    
          const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
          this.setState({ translatedMenuItems: translations });
        } catch (error) {
          console.error('Error translating menu items:', error);
        }
      };
    render() {
        const { handleNwRecruitModal, viewType,user } = this.props;
        return (
          <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
               
                
        
            <Tooltip title="Create">
             
                <Button
                    type="primary"  
                    onClick={() => handleNwRecruitModal(true)}
                    >
                    <DataSaverOnIcon className=" !text-icon" /> 
                    {/* {this.state.translatedMenuItems[0]} */}
                     Add 
                </Button>
           
            </Tooltip>
      
            </div>
        );
    }
}

const mapStateToProps = ({auth }) => ({

});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CandidateActionRight);