import React, { useEffect, useState ,useRef} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import * as Yup from "yup";
import { Tabs,Select } from 'antd';
import {addKpi, } from "./TeamsAction";
import {getLob} from "../../Settings/Category/LOB/LOBAction"
import {getKpis} from "../../Settings/Category/KPI/KPIAction"
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import AssigenedKpiCardList from "./TeamsCard.js/AssigenedKpiCardList";
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
          lobDetsilsId: lob,
          assignedValue:"",
          weitageValue:"",
          year: selectedYear,
          quarter:activeTab,
      
        }}
        // validationSchema={TeamsSchema}
        onSubmit={(values, { resetForm }) => {
          props.addKpi(values,
            
             () => handleReset(resetForm));
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
              <div class=" w-[21%] flex justify-between">
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
    <div class=" flex flex-row mt-2 justify-between">
    {activeTab && (
            <div class=" w-[25%] mt-[1.2rem]  max-sm:w-wk">
            <label class=" text-[#444] font-bold  flex-col text-[0.75rem]" >Assign KPI</label>&nbsp;
                      <select  className="customize-select"
                       
                      onChange={handleWorkflowChange}>
          <option value="">Select</option>
          {props.kpiListData.map((item, index) => (
            <option 
           
            key={index} value={item.performanceManagementId}>
              {item.kpi}
            </option>
          ))}
        </select>
            {/* <Field
              name="performanceManagementId"
              isColumnWithoutNoCreate
              label={
                <FormattedMessage
                  id="app.kpi"
                  defaultMessage="KPI List"
                />
              } 
              onChange={(selectedValue) => setSelected(selectedValue)}
              component={SelectComponent}
              options={kpiNameOption}
              isColumn
              margintop={"0"}
              //value={values.customerId}
              inlineLabel
            />  */}
    
      </div>
      )}
        {selected && (
           <div class=" w-[25%] mt-[1.2rem]  max-sm:w-wk">
            <label class=" text-[#444] font-bold  flex-col text-[0.75rem]" >LOB</label>&nbsp;
                      <select  className="customize-select"
                       style={{width:"50%"}}
                      onChange={handleLobChange}>
          <option value="">Select</option>
          {props.lobListData.map((item, index) => (
            <option 
           
            key={index} value={item.lobDetsilsId}>
              {item.name}
            </option>
          ))}
        </select>
        
      
    
      </div>
       )}  
      {selected && (
          <>                                           
        <div class=" w-[37%]" >
        <label class=" text-[#444] font-bold text-[0.75rem]" >Assigned</label>&nbsp;
                          <Field
                            // isRequired
                            onChange={(e) => setFieldValue("assignedValue", parseFloat(e.target.value))}
                            name="assignedValue"
                            type="number"
                            validate={(value) => {
                              if (!value || isNaN(Number(value))) {
                                return 'Assigned Value must be a number';
                              }
                              return null;
                            }} 
                            // width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                          {/* <input value={this.state.value} onChange={this.onNumber}/> */}
                        </div>  
                        <div class=" w-[37%]" >
        <label class=" text-[#444] font-bold text-[0.75rem]" >Weitage</label>&nbsp;
                          <Field
                            onChange={(e) => setFieldValue("weitageValue", parseFloat(e.target.value))}
                            // isRequired
                            name="weitageValue"
                            type="number"
                            validate={(value) => {
                              if (!value || isNaN(Number(value))) {
                                return 'Weitage value must be a number';
                              }
                              return null;
                            }}
                            // width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                          {/* <input value={this.state.value} onChange={this.onNumber}/> */}
                        </div>                  
</> 
        )}   
        </div>
        {activeTab && (
     <div class="flex justify-end w-[25%]  ">
          <Button
            htmlType="submit"
            type="primary"
            loading={addingKpi}
          >
            Submit
          </Button>
        </div>
        )}
        
       
       
       
      </Form>
   
        )}
      </Formik>
      {activeTab && (
      <AssigenedKpiCardList  rowdata={props.rowdata}
      selectedYear={selectedYear}
      activeTab={activeTab}
      />
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
