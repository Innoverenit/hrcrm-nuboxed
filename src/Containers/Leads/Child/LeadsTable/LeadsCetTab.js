import React, { lazy, Suspense,useEffect , useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { handleLeadCallModal,getLeadsActivityRecords } from "../../LeadsAction";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Tooltip,Badge } from "antd";

const AddCallTaskModal = lazy(() => import("./AddCallTaskModal"));



const TabPane = StyledTabs.TabPane;

 function LeadsCetTab (props) {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
     '1165', // 0  Activity
     '104', // "Create"


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
    props.getLeadsActivityRecords(props.rowdata.leadsId);
  }, []);
  const { addCallTaskModal, handleLeadCallModal } = props;
    const { ...formProps } = props;
    console.log(props.rowdata)
    return (
      <>
        <TabsWrapper >
          <StyledTabs className=" w-[52vw] p-2 h-[60rem] "
          // style={{height:"65rem"}}
            defaultActiveKey="1"            
            animated={false}
          >
            <TabPane
              tab={
                <>
                
                  <Badge
                count={props.leadsActivityCount.count}
                overflowCount={999}
              > 
                </Badge>
                <span>
                       <i class="fas fa-phone-square"></i>&nbsp;
                       {translatedMenuItems[0]} {/* Activity */}
                
                  </span>
                
                    <>
                      <Tooltip 
                        title={translatedMenuItems[1]}
                      >
                       &nbsp;
                        
 <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                                             
                          tooltiptitle={translatedMenuItems[1]}
                          onClick={() => {
                            handleLeadCallModal(true);
                          }}
                      
                        />
                       
                      </Tooltip>
                    </>
                 
                </>
              }
              key="1"
            >
              
            </TabPane>
          
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={<BundleLoader/>}>
        <AddCallTaskModal
        rowdata={props.rowdata}
          addCallTaskModal={addCallTaskModal}
          handleLeadCallModal={handleLeadCallModal}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
          translatedMenuItems={props.translatedMenuItems}
        />
        </Suspense>
      </>
    );
}


const mapStateToProps = ({ leads }) => ({
  addCallTaskModal: leads.addCallTaskModal,
  leadsActivityCount:leads.leadsActivityCount,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleLeadCallModal,
      getLeadsActivityRecords
     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(LeadsCetTab);


