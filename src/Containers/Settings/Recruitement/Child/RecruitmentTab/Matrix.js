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

  useEffect(() => {
    if (activeTab) {
      props.getMatrixdata(activeTab, props.organizationId);
    }
  }, [activeTab]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (activeTab) {
  //       setLoading(true);
  //       try {
  //         await props.getMatrixdata(activeTab, props.organizationId);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [activeTab]);

  return (
    <Tabs type="card" activeKey={activeTab} onChange={handleTabClick}>
      {props.countries.map((item) => (
        <TabPane key={item.country_id} tab={item.country_name}>
         {loading ? (
             <div className=' flex justify-center items-center h-[20vh]'>
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
