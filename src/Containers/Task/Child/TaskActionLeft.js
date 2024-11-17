import React , { useState, useEffect}from "react";
import {Avatar, Tooltip } from "antd";

import FactCheckIcon from '@mui/icons-material/FactCheck';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import TocIcon from '@mui/icons-material/Toc';

const TaskActionLeft = props => {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
        "119",  // My Tasks
          "120",// My Tasks- Gantt View
         "121", //Approvals

       

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
    <div class=" flex items-center" >
      <Tooltip
        title={translatedMenuItems[0]}
        // {<FormattedMessage id="app.myTasks" defaultMessage="My Tasks" />}
      >
        <span class=" mr-1 text-xs"
          onClick={() => props.setTaskViewType("table")}
          style={{
            color: props.viewType === "table" && "#1890ff",
            
          }}
        > <Avatar style={{ background: props.viewType === "table" ? "#f279ab" : "#28a355" }}>
           <TocIcon className="text-white !text-icon cursor-pointer "  />
           </Avatar>
        </span>
      </Tooltip>
      <Tooltip
        title={translatedMenuItems[1]}
        // {<FormattedMessage id="app.mytaskView" defaultMessage="My Tasks- Gantt View" />}
      >
        <span class=" mr-1 text-xs"
          onClick={() => props.setTaskViewType("gantt")}
          style={{
            color: props.viewType === "gantt" && "#1890ff",
           
          }}
        > 
        <Avatar style={{ background: props.viewType === "gantt" ? "#f279ab" : "#28a355" }}><LeaderboardIcon className="text-white !text-icon cursor-pointer "   /></Avatar>
        
        
        </span>
      </Tooltip>
      <Tooltip
        title={translatedMenuItems[2]}
        // {<FormattedMessage id="app.approvals" defaultMessage="Approvals" />}
      >  
        
        <span class=" mr-1 text-xs"
          onClick={() => props.setTaskViewType("approve")}
          style={{
            color: props.viewType === "approve" && "#1890ff",
            
          }}
        >
         <Avatar style={{ background: props.viewType === "approve" ? "#f279ab" : "#28a355" }}><FactCheckIcon className="text-white !text-icon  cursor-pointer  " /></Avatar> 
        </span>
       
      </Tooltip>

    </div>
  
  );
};

export default TaskActionLeft;
