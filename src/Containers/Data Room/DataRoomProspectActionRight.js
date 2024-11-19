
import React, {  useState, useEffect , } from 'react'
import ProspectTaskOpenListData from "./ProspectTaskOpenListData"
import ProspectQuotationListData from "./ProspectQuotationListData"
import ProspectQuotationSectorListData from "./ProspectQuotationSectorListData"
import ProspectQuotationSource from "./ProspectQuotationSource"
import ProspectQuotationSectorLostData from "./ProspectQuotationSectorLostData"
import { Tabs } from 'antd';
import ProspectQuotationSectorWonData from "./ProspectQuotationSectorWonData"
import ProspectQuotationWonData from "./ProspectQuotationWonData"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ProspectQuotationClosedData from "./ProspectQuotationClosedData"
import ProspectQuotationSourceWonData from "./ProspectQuotationSourceWonData"
import ProspectQuotationSourceLostData from "./ProspectQuotationSourceLostData"



const { TabPane } = Tabs;
function DataRoomProspectActionRight (props) {
  const [activeTab, setActiveTab] = useState("1");
  const [customerView, setCustomerView] = useState('all'); // 'all', 'won', 'lost'
  const [loading, setLoading] = useState(false); 
  const [isEditing, setIsEditing] = useState(false);
  const[prospectSourceView,setProspectSourceView] =useState('all')
  const[prospectSectorView,setProspectSectorView]=useState('all');
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
 
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
    '213', // 0 Quotation
    '105', // 1  Task 
// '', // 2 By Source
// ""// No data found
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

  const handleViewChange = (view) => {
   
   
      setCustomerView(view);
      
  };


  const handleViewSectorChange = (view) => {
   
   
    setProspectSectorView(view);
    
};


const handleViewSourceChange = (view) => {
   
   
  setProspectSourceView(view);
  
};

    console.log(props.selectedPerson)
    console.log(props.selectedPropsectSource)
    return (
      <div>
        {/* By List */}
        {props.selectedPerson &&props.selectedButtonTab==="byList" &&( 
         <Tabs defaultActiveKey="1">
       <TabPane
        tab={
          <span>
            {/* Customer Tab */}
            <span className=' cursor-pointer'
              onClick={() => handleViewChange('all')}
            >
              {/* Quotation */}{translatedMenuItems[0]}
            </span>
            {/* Won Icon */}
            <CheckCircleOutlineIcon  className=' cursor-pointer ml-2 text-green-600'
              onClick={() => handleViewChange('won')}
              title="Won"
            />
            {/* Lost Icon */}
            <HighlightOffIcon  className=' cursor-pointer ml-1 text-red-600'
              onClick={() => handleViewChange('lost')}
              title="Lost"
            />
          </span>
        }
        key="1"
      >
        {/* Fixed height container to prevent jumping */}
        <div className='min-h-[14vh] p-4'>
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
          <TabPane tab={translatedMenuItems[1]} key="2">
          <ProspectTaskOpenListData
           selectedPersonData={props.selectedPersonData}
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage} 
          />
          
          </TabPane>
        
        </Tabs>
        )}



{props.selectedButtonTab==="bySector" && props.selectedPropsectSector&&(
         
           <Tabs defaultActiveKey="1">
          <TabPane
        tab={
          <span>
            {/* Customer Tab */}
            <span className=' cursor-pointer'
              onClick={() => handleViewSectorChange('all')}
            >
              {/* Quotation */}{translatedMenuItems[0]}
            </span>
            {/* Won Icon */}
            <CheckCircleOutlineIcon
              style={{ color: 'green', marginLeft: 8, cursor: 'pointer' }}
              onClick={() => handleViewSectorChange('won')}
              title="Won"
            />
            {/* Lost Icon */}
            <HighlightOffIcon
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
                <ProspectQuotationSectorWonData
                selectedPropsectSector={props.selectedPropsectSector}
              
              translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
         />
         {/* Hello Won */}
                </p>}
              {prospectSectorView === 'lost' && <p>
                <ProspectQuotationSectorLostData
                selectedPropsectSector={props.selectedPropsectSector}
              
              translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
         />
         {/* Hello Lost */}
                </p>}
            </>
         
        </div>
      </TabPane>
          <TabPane tab="Task" key="2">
            Task content for 
            {/* {selectedPerson.name} */}
          </TabPane>
        
        </Tabs>
)}

{props.selectedButtonTab==="bySource" && props.selectedPropsectSource&&(
        
           <Tabs defaultActiveKey="1">
          {/* <TabPane tab="Quotation" key="1">
        <ProspectQuotationSource
        selectedPropsectSource={props.selectedPropsectSource}
        />
           
          </TabPane> */}
               <TabPane
        tab={
          <span>
            {/* Customer Tab */}
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => handleViewSourceChange('all')}
            >
              Quotation
            </span>
            {/* Won Icon */}
            <CheckCircleOutlineIcon
              style={{ color: 'green', marginLeft: 8, cursor: 'pointer' }}
              onClick={() => handleViewSourceChange('won')}
              title="Won"
            />
            {/* Lost Icon */}
            <HighlightOffIcon
              style={{ color: 'red', marginLeft: 4, cursor: 'pointer' }}
              onClick={() => handleViewSourceChange('lost')}
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
           
              {prospectSourceView === 'all' && <p>
                {/* <ProspectQuotationSectorListData
              selectedPropsectSector={props.selectedPropsectSector}
              translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}
            /> */}
             <ProspectQuotationSource
        selectedPropsectSource={props.selectedPropsectSource}
        />
           
                </p>
              }
              {prospectSourceView === 'won' && <p>
                <ProspectQuotationSourceWonData
                selectedPropsectSource={props.selectedPropsectSource}
              
              translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
         />
         {/* Hello Won */}
                </p>}
              {prospectSourceView === 'lost' && <p>
                <ProspectQuotationSourceLostData
                selectedPropsectSource={props.selectedPropsectSource}
              
              translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
         />
         Hello Lost
                </p>}
            </>
         
        </div>
      </TabPane>
          <TabPane tab="Task" key="2">
            Task content for 
            {/* {selectedPerson.name} */}
          </TabPane>
         
        </Tabs>
)}
        </div>
    )
  }


export default DataRoomProspectActionRight