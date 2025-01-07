import React, { useEffect, useState ,useRef,lazy,Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field} from "formik";
import * as Yup from "yup";
import { Tabs } from 'antd';
import {addKpi, } from "./TeamsAction";
import {getLob} from "../../Settings/Category/LOB/LOBAction"
import {getKpis} from "../../Settings/Category/KPI/KPIAction"
import { BundleLoader } from "../../../Components/Placeholder";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
const AssigenedKpiCardList = lazy(() => import("./TeamsCard.js/AssigenedKpiCardList"));
const { TabPane } = Tabs;

/**
 * yup validation scheme for creating a Team
 */
const TeamsSchema = Yup.object().shape({
  name: Yup.string().required("Please provide Team name"),

});

function KpiList(props) {
  const tab=[
    "Q1","Q2","Q3","Q4"
  ]
  const years=[2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
  const [selected, setSelected] = useState("");
  const [lob, setLob] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);
  const yearSelectRef = useRef(null);

  const resetData = () => {
    setSelectedYear(null);
    setActiveTab(null)
    // setSales({ amount: null, currency: null });
    // setFulfillment({ amount: null });
    // setInvestment({ amount: null, currency: null });
   
    if (yearSelectRef.current) {
      yearSelectRef.current.value = ""; // Reset the value of the select element
    }
  };
    useEffect(()=>{
      props.getLob(props.orgId); 
        props.getKpis(props.rowdata.departmentId,props.rowdata.roleType)
        // props.getEmployeeKpiList(props.rowdata.employeeId)
    },[]);

  function handleReset(resetForm) {
    resetForm();
  }

  const handleYearChange = async (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
  
   
  };
  const handleTabClick = async (key) => {
    setActiveTab(key);
    setLoading(true); 
    await loadKPIsForTab(selectedYear, key);
  
    setLoading(false); 
  };
  
  const loadKPIsForTab = async (year, tabKey) => {
    await props.getKpis(props.rowdata.departmentId,props.rowdata.roleType);
  };
  

  const handleWorkflowChange = (event) => {
    const selected = event.target.value;
    setSelected(selected);
    // setSelectedUser("");
    // props.getDepartmentwiserUser(selected) // Assuming you want to pass the selected department and filtered roles to a parent component
  };
  const handleLobChange = (event) => {
    const lob = event.target.value;
    setLob(lob);
    // setSelectedUser("");
    // props.getDepartmentwiserUser(selected) // Assuming you want to pass the selected department and filtered roles to a parent component
  };
  

  const kpiNameOption = props.kpiList.map((item) => {
    return {
      label: `${item.kpi || ""}`,
      value: item.performanceManagementId,
    };
  });
  const { addingKpi } = props;
  return (
    <>

<Formik
        enableReinitialize
        initialValues={{
          // performanceManagementId:[],
          employeeId:props.rowdata.employeeId,
          performanceManagementId: selected,
          lobDetailsId: lob,
          month1AssignedValue:"",
          month2AssignedValue:"",
          month3AssignedValue:"",
          weitageValue:"",
          year: selectedYear,
          quarter:activeTab,
        
        }}
        onSubmit={(values) => {
          const month1AssignedValue = values.month1AssignedValue !== "" ? values.month1AssignedValue : 0;  
          const month2AssignedValue = values.month2AssignedValue !== "" ? values.month2AssignedValue : 0;  
          const month3AssignedValue = values.month3AssignedValue !== "" ? values.month3AssignedValue : 0;   
          props.addKpi(
            {
              ...values,
              month1AssignedValue:month1AssignedValue,
              month2AssignedValue:month2AssignedValue,
              month3AssignedValue:month3AssignedValue,
            },
            // props.orgId
          );
        }}
      >
   
        {({
          errors,
          touched,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
          values,
          ...rest
        }) => (
            <Form className="form-background">
            <div class="flex   items-center  pr-2 max-sm:flex-col">
              <div class=" w-[30%] flex justify-between">
                <div>Assesment Year</div>
            <select 
      ref={yearSelectRef}
      onChange={handleYearChange}>
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      </div>
      {selectedYear && (
        <div class=" w-[30%] flex items-center flex-col mt-4">
           <Tabs type="card" 
           activeKey={activeTab} 
          onChange={handleTabClick}
           >
      {tab.map((tabs) => (
        <TabPane key={tabs} tab={tabs}>
       
       
       
        </TabPane>
      ))}
    </Tabs>
    </div> 
    )}
     </div>
     <div className="flex flex-wrap justify-between mt-2">
  {activeTab && (
    <div className="w-[25%] mt-[1.2rem] max-sm:w-wk">
      <div className="text-[#444] font-bold flex-col text-[0.75rem]">
        Assign KPI
      </div>
      <select
        className="customize-select"
        onChange={handleWorkflowChange}
      >
        <option value="">Select</option>
        {props.kpiListData.map((item, index) => (
          <option key={index} value={item.performanceManagementId}>
            {item.kpi}
          </option>
        ))}
      </select>
    </div>
  )}
  {selected && (
    <div className="w-[18%] mt-[1.2rem] max-sm:w-wk">
      <div className="text-[#444] font-bold flex-col text-[0.75rem]">
        LOB
      </div>
      <select
        className="customize-select"
        style={{ width: "50%" }}
        onChange={handleLobChange}
      >
        <option value="">Select</option>
        {props.lobListData.map((item, index) => (
          <option key={index} value={item.lobDetsilsId}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  )}
  {selected && (
    <>
      <div className="w-[35%]">
        <div className="text-[#444] font-bold text-[0.75rem]">Assigned</div>
     
<div class=" flex flex-row">
        <Field
     
     name="month1AssignedValue"
     type="number"
     placeholder="Month1"
     style={{width:"90%"}}
                    component={InputComponent}
                    inlineLabel
                    validate={(value) => {
         
                      if (value === 0) {
                          return null;
                      }
                   
                      if (!value || isNaN(Number(value))) {
                        return 'Assigned Value must be a number';
                      }
                      return null;
                  }}
               
                  />
     
     <Field
     
     name="month2AssignedValue"
     type="number"
     placeholder="Month2"
     style={{width:"90%"}}
                    component={InputComponent}
                    inlineLabel
                    validate={(value) => {
         
                      if (value === 0) {
                          return null;
                      }
                   
                      if (!value || isNaN(Number(value))) {
                        return 'Assigned Value must be a number';
                      }
                      return null;
                  }}
               
                  />
        <Field
     
     name="month3AssignedValue"
     type="number"
     placeholder="Month3"
     style={{width:"90%"}}
                    component={InputComponent}
                    inlineLabel
                    validate={(value) => {
         
                      if (value === 0) {
                          return null;
                      }
                   
                      if (!value || isNaN(Number(value))) {
                        return 'Assigned Value must be a number';
                      }
                      return null;
                  }}
               
                  />
                  </div>
        {/* </div> */}
      </div>
      <div className="w-[15%] ">
        <div className="text-[#444] font-bold text-[0.75rem]">Weightage</div>
        <Field
          onChange={(e) => setFieldValue("weitageValue", parseFloat(e.target.value))}
          name="weitageValue"
          type="number"
          validate={(value) => {
            if (!value || isNaN(Number(value))) {
              return 'Weightage value must be a number';
            }
            return null;
          }}
          component={InputComponent}
          inlineLabel
        />
      </div>
      <div className="flex items-end">
      <Button
        htmlType="submit"
        type="primary"
        loading={addingKpi}
      >
        Submit
      </Button>
    </div>
    </>
  )}

</div>

        
       
       
       
      </Form>
   
        )}
      </Formik>

      {activeTab && (
        <Suspense  fallback={<BundleLoader />}>
      <AssigenedKpiCardList  rowdata={props.rowdata}
      selectedYear={selectedYear}
      activeTab={activeTab}
 
      /></Suspense>
      )}
    </>
  );
}

const mapStateToProps = ({ teams, auth, kpi,lob }) => ({
    userDetails: auth.userDetails,
    lobListData: lob.lobListData,
    kpiList:teams.kpiList,
    kpiListData:kpi.kpiListData,
    addingKpi:teams.addingKpi,
    orgId:auth.userDetails.organizationId,
    employeeKpiList:teams.employeeKpiList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getKpis,
        getLob,
        addKpi,
      
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(KpiList);
