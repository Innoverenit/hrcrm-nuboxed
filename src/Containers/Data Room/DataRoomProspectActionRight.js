// import React, { Component, useState } from 'react'
// import ProspectTaskOpenListData from "./ProspectTaskOpenListData"
// import ProspectQuotationListData from "./ProspectQuotationListData"
// import { Button, Row, Col, Card, Tabs } from 'antd';
// import { CloseOutlined, EditOutlined } from '@ant-design/icons';
// import ProspectQuotationClosedData from "./ProspectQuotationClosedData"


// const { TabPane } = Tabs;
// function DataRoomProspectActionRight (props) {
//   const [activeTab, setActiveTab] = useState("1"); 
//   const [isEditing, setIsEditing] = useState(false); 



//   const handleTabChange = (key) => {
//     setActiveTab(key);
//     setIsEditing(false); // Reset edit state when switching tabs
//   };
//   const toggleEdit = (e) => {
//     e.stopPropagation(); // Prevent the click from switching tabs
//     setIsEditing(!isEditing);
//   };
//     console.log(props.selectedPerson)
//     return (
//       <div>
//         {/* By List */}
//         {props.selectedPerson &&props.selectedButtonTab==="byList" &&( 
//          <Tabs activeKey={activeTab} onChange={handleTabChange}>
//            <TabPane
//           tab={
//             <>
//             <span onClick={toggleEdit}> {/* Ensures tab switching */}
//               Quotation 
//             </span>
//             <span style={{marginLeft:"9px"}}>
//               <CloseOutlined onClick={toggleEdit} />
//             </span>
//             </>
//           }
//           key="1"
//         >
//           {isEditing ? (
           
//             // Show editable list when in edit mode
//             <ProspectQuotationClosedData
//               selectedPersonData={props.selectedPersonData}
//               translateText={props.translateText}
//               selectedLanguage={props.selectedLanguage}
//             />
//           ) : (
//             // Show regular list when not in edit mode
//             <ProspectQuotationListData
//               selectedPersonData={props.selectedPersonData}
//               translateText={props.translateText}
//               selectedLanguage={props.selectedLanguage}
//             />
//           )}
//         </TabPane>
//           <TabPane tab="Task" key="2">
//           <ProspectTaskOpenListData
//            selectedPersonData={props.selectedPersonData}
//            translateText={props.translateText}
//            selectedLanguage={props.selectedLanguage} 
//           />
          
//           </TabPane>
        
//         </Tabs>
//         )}



// {props.selectedButtonTab==="bySector" && (
         
//            <Tabs defaultActiveKey="1">
//           <TabPane tab="Quotation" key="1">
//             Quotation content for 
//             {/* {selectedPerson.name} */}
//           </TabPane>
//           <TabPane tab="Task" key="2">
//             Task content for 
//             {/* {selectedPerson.name} */}
//           </TabPane>
//           <TabPane tab="Closed" key="3">
//             Event content for 
//             {/* {selectedPerson.name} */}
//           </TabPane>
//         </Tabs>
// )}

// {props.selectedButtonTab==="bySource" && (
        
//            <Tabs defaultActiveKey="1">
//           <TabPane tab="Quotation" key="1">
//             Quotation content for 
//             {/* {selectedPerson.name} */}
//           </TabPane>
//           <TabPane tab="Task" key="2">
//             Task content for 
//             {/* {selectedPerson.name} */}
//           </TabPane>
//           <TabPane tab="Closed" key="3">
//             Event content for 
//             {/* {selectedPerson.name} */}
//           </TabPane>
//         </Tabs>
// )}
//         </div>
//     )
//   }


// export default DataRoomProspectActionRight





import React, { Component, useState } from 'react'
import ProspectTaskOpenListData from "./ProspectTaskOpenListData"
import ProspectQuotationListData from "./ProspectQuotationListData"
import ProspectQuotationSectorListData from "./ProspectQuotationSectorListData"
import { Button, Row, Col, Card, Tabs } from 'antd';
import ProspectQuotationWonData from "./ProspectQuotationWonData"
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import ProspectQuotationClosedData from "./ProspectQuotationClosedData"
import { CheckCircleOutlineOutlined } from '@mui/icons-material';


const { TabPane } = Tabs;
function DataRoomProspectActionRight (props) {
  const [activeTab, setActiveTab] = useState("1");
  const [customerView, setCustomerView] = useState('all'); // 'all', 'won', 'lost'
  const [loading, setLoading] = useState(false); 
  const [isEditing, setIsEditing] = useState(false); 
  const[prospectSectorView,setProspectSectorView]=useState('all');

  const handleViewChange = (view) => {
   
   
      setCustomerView(view);
      
  };


  const handleViewSectorChange = (view) => {
   
   
    setProspectSectorView(view);
    
};

    console.log(props.selectedPerson)
    return (
      <div>
        {/* By List */}
        {props.selectedPerson &&props.selectedButtonTab==="byList" &&( 
         <Tabs defaultActiveKey="1">
       <TabPane
        tab={
          <span>
            {/* Customer Tab */}
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => handleViewChange('all')}
            >
              Quotation
            </span>
            {/* Won Icon */}
            <CheckCircleOutlined
              style={{ color: 'green', marginLeft: 8, cursor: 'pointer' }}
              onClick={() => handleViewChange('won')}
              title="Won"
            />
            {/* Lost Icon */}
            <CloseCircleOutlined
              style={{ color: 'red', marginLeft: 4, cursor: 'pointer' }}
              onClick={() => handleViewChange('lost')}
              title="Lost"
            />
          </span>
        }
        key="1"
      >
        {/* Fixed height container to prevent jumping */}
        <div style={{ minHeight: '150px', padding: '16px' }}>
          {/* Show a spinner if loading is true */}
         
            <>
           
              {customerView === 'all' && <p>
                <ProspectQuotationListData
              selectedPersonData={props.selectedPersonData}
              translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}
            />
                </p>
              }
              {customerView === 'won' && <p>
                <ProspectQuotationWonData
              selectedPersonData={props.selectedPersonData}
              translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
         />
                </p>}
              {customerView === 'lost' && <p>
                <ProspectQuotationClosedData
              selectedPersonData={props.selectedPersonData}
              translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
         />
                </p>}
            </>
         
        </div>
      </TabPane>
          <TabPane tab="Task" key="2">
          <ProspectTaskOpenListData
           selectedPersonData={props.selectedPersonData}
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage} 
          />
          
          </TabPane>
        
        </Tabs>
        )}



{props.selectedButtonTab==="bySector" && (
         
           <Tabs defaultActiveKey="1">
          <TabPane
        tab={
          <span>
            {/* Customer Tab */}
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => handleViewSectorChange('all')}
            >
              Quotation
            </span>
            {/* Won Icon */}
            <CheckCircleOutlined
              style={{ color: 'green', marginLeft: 8, cursor: 'pointer' }}
              onClick={() => handleViewSectorChange('won')}
              title="Won"
            />
            {/* Lost Icon */}
            <CloseCircleOutlined
              style={{ color: 'red', marginLeft: 4, cursor: 'pointer' }}
              onClick={() => handleViewSectorChange('lost')}
              title="Lost"
            />
          </span>
        }
        key="1"
      >
        {/* Fixed height container to prevent jumping */}
        <div style={{ minHeight: '150px', padding: '16px' }}>
          {/* Show a spinner if loading is true */}
         
            <>
           
              {prospectSectorView === 'all' && <p>
                <ProspectQuotationSectorListData
              selectedPropsectSector={props.selectedPropsectSector}
              translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}
            />
           
                </p>
              }
              {prospectSectorView === 'won' && <p>
                {/* <ProspectQuotationWonData
              selectedPersonData={props.selectedPersonData}
              translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
         /> */}
         Hello Won
                </p>}
              {prospectSectorView === 'lost' && <p>
                {/* <ProspectQuotationClosedData
              selectedPersonData={props.selectedPersonData}
              translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
         /> */}
         Hello Lost
                </p>}
            </>
         
        </div>
      </TabPane>
          <TabPane tab="Task" key="2">
            Task content for 
            {/* {selectedPerson.name} */}
          </TabPane>
          <TabPane tab="Closed" key="3">
            Event content for 
            {/* {selectedPerson.name} */}
          </TabPane>
        </Tabs>
)}

{props.selectedButtonTab==="bySource" && (
        
           <Tabs defaultActiveKey="1">
          <TabPane tab="Quotation" key="1">
            Quotation content for 
            {/* {selectedPerson.name} */}
          </TabPane>
          <TabPane tab="Task" key="2">
            Task content for 
            {/* {selectedPerson.name} */}
          </TabPane>
          <TabPane tab="Closed" key="3">
            Event content for 
            {/* {selectedPerson.name} */}
          </TabPane>
        </Tabs>
)}
        </div>
    )
  }


export default DataRoomProspectActionRight