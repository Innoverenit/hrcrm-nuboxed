import React,{useState, useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Avatar, Tooltip } from "antd";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AcUnitIcon from '@mui/icons-material/AcUnit';

function RefurbishActionLeft (props) {
  const [currentData, setCurrentData] = useState("");
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [searchOnEnter, setSearchOnEnter] = useState(false);  //Code for Search
  const [pageNo, setPage] = useState(0);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
    '97', // 0"Prospect
'248', // 1customer      
'201', // 2 Investor
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

        return (
          <>
            <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto " >                  
              <Tooltip title={translatedMenuItems[0]}>
                <span class=" text-sm cursor-pointer"
                  onClick={() => props.setSelectedTab('prospect')}
                  style={{
                    color: props. selectedTab === "prospect" && "#1890ff",
                  }}
                >
                  <Avatar style={{ background: props.selectedTab === "prospect" ? "#f279ab" : "#28a355" }}>
                    <HomeRepairServiceIcon className="!text-icon cursor-pointer" /></Avatar>  
                </span>
              </Tooltip> 
              <Tooltip title={translatedMenuItems[1]}>
                <span class=" text-sm cursor-pointer"
                    onClick={() => props.setSelectedTab('customer')}
                  style={{
                    color: props.selectedTab === "customer" && "#1890ff",
                  }}
                >
                  
                    <AcUnitIcon className="!text-icon cursor-pointer" /> 
                </span>
              </Tooltip>
              <Tooltip title={translatedMenuItems[2]}>
                <span class=" text-sm cursor-pointer"
                 onClick={() => props.setSelectedTab('list')}
                 style={{
                  color: props.selectedTab === "list" && "#1890ff",
                }}
                >
                  
                    <ApartmentIcon className="!text-icon cursor-pointer" />
                </span>
              </Tooltip>            
            </div>   
          </>
        );
}
const mapStateToProps = ({ auth, refurbish }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  allCountRefurbish:refurbish.allCountRefurbish,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
 // getRefurbishAllCount
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RefurbishActionLeft);
