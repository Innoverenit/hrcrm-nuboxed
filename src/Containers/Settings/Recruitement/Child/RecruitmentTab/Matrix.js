// import React, { useState,useEffect } from 'react';
// import { Tabs, Card } from 'antd';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {getMatrixdata} from "../../../SettingsAction"
// import {getCountries} from "../../../../Auth/AuthAction"
// import MatrixData from './MatrixData';


// const { TabPane } = Tabs;

// const Matrix = (props) => {

 
//   const [activeTab, setActiveTab] = useState("");

//   const handleTabClick = (key) => {
//     console.log(key)
//     setActiveTab(key);
//     props.getMatrixdata(key,props.organizationId);
//   };

//   useEffect(() => {
//     props.getCountries();
//     props.getMatrixdata(activeTab,props.organizationId);
//     console.log(activeTab)
//   },[activeTab]);

//   // useEffect(() => {
   
//   //   props.getMatrixdata(activeTab,props.organizationId);
//   //   console.log(activeTab)
//   // },[activeTab]);

//   useEffect(() => {
//     // Check if data is available
//     if (props.countries.length > 0) {
//       // Update activeTab when data is available
//       setActiveTab(props.countries[0]?.country_id);
//     }
//   }, [props.countries]);

//   return (
//     <Tabs type="card" activeKey={activeTab} onChange={handleTabClick}>
//       {props.countries.map((item) => (
//         <TabPane key={item.country_id
//         } tab={item.country_name}>
//           {/* <Card>
//             <p>Country: {item.country_name}</p>
//             <p>ID: {item.country_id}</p>
//           </Card> */}
//           <MatrixData
//           activeTab={activeTab}
//           matrixData={props.matrixData}
//           />
//         </TabPane>
//       ))}
//     </Tabs>
//   );
// };

// const mapStateToProps = ({ settings, opportunity, auth }) => ({
//     countries: auth.countries,
//     organizationId: auth.userDetails.organizationId,
//     matrixData:settings.matrixData
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators({
//         getCountries,
//         getMatrixdata
//     }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(Matrix);




import React, { useState, useEffect } from 'react';
import { Tabs,Spin } from 'antd';
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { getMatrixdata } from "../../../SettingsAction";
import { getCountries } from "../../../../Auth/AuthAction";
import MatrixData from './MatrixData';

const { TabPane } = Tabs;

const Matrix = (props) => {
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTabClick = (key) => {
    setActiveTab(key);
    props.getMatrixdata(key, props.organizationId);
  };

  useEffect(() => {
    props.getCountries();
  }, []);

  useEffect(() => {
    if (props.countries.length > 0) {
      setActiveTab(props.countries[0]?.country_id);
    }
  }, [props.countries]);

  // useEffect(() => {
  //   if (activeTab) {
  //     props.getMatrixdata(activeTab, props.organizationId);
  //   }
  // }, [activeTab]);

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab) {
        setLoading(true);
        try {
          await props.getMatrixdata(activeTab, props.organizationId);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <Tabs type="card" activeKey={activeTab} onChange={handleTabClick}>
      {props.countries.map((item) => (
        <TabPane key={item.country_id} tab={item.country_name}>
         {loading ? (
             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
             <Spin />
           </div>
          ) : (
          <MatrixData
            activeTab={activeTab}
            matrixData={props.matrixData}
          />
        
          )}
        </TabPane>
      ))}
    </Tabs>
  );
};

const mapStateToProps = ({ settings, auth }) => ({
  countries: auth.countries,
  organizationId: auth.userDetails.organizationId,
  matrixData: settings.matrixData
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getCountries,
    getMatrixdata
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Matrix);
