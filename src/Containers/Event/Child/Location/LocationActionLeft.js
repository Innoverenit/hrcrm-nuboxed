import React, { useEffect, useState } from "react";
import LanguageIcon from '@mui/icons-material/Language';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import { Badge, Tooltip,Avatar } from "antd";
import {getLocationRecords,getLocationDeletedCount} from "./LocationAction";

const LocationActionLeft = (props) => {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
       
        "228",  // All
          "1003",  // Map View
          "1004", // "Inactive
         
       
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  useEffect(() => {
    if (props.viewType === "card") {
      props.getLocationRecords(props.orgId);
    }
    else if (props.viewType === "delete") {
      props.getLocationDeletedCount(props.orgId);
    }
  }, [props.viewType]);
    return (
        <div class=" flex  items-center" >
          <Tooltip
        title={translatedMenuItems[0]}
      >
         <Badge
          size="small"
           count={(props.viewType === "card" && props.recordData.locCount) || 0}
          overflowCount={999}
        >
          <span class=" mr-1 !text-icon cursor-pointer"
            onClick={() => props.setLocationViewType("card")}
            style={{
          
              color: props.viewType === "card" && "#1890ff",            
            }}
          >
             <Avatar style={{ background: props.viewType === "card" ? "#f279ab" : "#28a355" }}>
  
            <div className="text-white ">{translatedMenuItems[0]}</div>
            </Avatar>
          </span>
          </Badge>
      </Tooltip>

      <Tooltip
        title={translatedMenuItems[1]}
      
      >
           <Badge
          size="small"
          // count={(props.viewType === "card" && props.recordData.customer) || 0}
          overflowCount={999}
        >
          <span class=" mr-1 cursor-pointer text-[1rem]"
            onClick={() => props.setLocationViewType("map")}
            style={{
              color: props.viewType === "map" && "#1890ff",
            }}
          >
            <Avatar style={{ background: props.viewType === "map" ? "#f279ab" : "#28a355" }}>
            <LanguageIcon  className="text-white !text-icon"
            // icon={solid('users')}
             />
             </Avatar>
          </span>
          </Badge>
      </Tooltip>

      <Tooltip title={translatedMenuItems[2]}>
      {/* "Inactive"> */}
                <Badge size="small"
                        count={(props.viewType === "delete" && props.locationDeletedCount.locCount) || 0}
                        overflowCount={999}
                    >
                        <span class="  mr-1 md:mr-1 text-sm cursor-pointer"
                            onClick={() => props.setLocationViewType("delete")}
                            style={{
                                color: props.viewType === "delete" && "#1890ff",
                            }}
                        >
                            <Avatar style={{ background: props.viewType === "delete" ? "#f279ab" : "#28a355" }}>
                                <DeleteOutlined className="text-white !text-icon " /></Avatar>

                        </span>
                    </Badge>
                </Tooltip>

        </div>
    )
}
const mapStateToProps = ({ auth,location }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  recordData:location.recordData,
  locationDeletedCount:location.locationDeletedCount,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLocationRecords,
      getLocationDeletedCount
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LocationActionLeft)
);


