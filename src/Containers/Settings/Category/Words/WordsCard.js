import React, { useEffect, useState, } from "react";
import { Select } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RotatingCircleLoader } from 'react-loaders-kit';
import BorderColorIcon from '@mui/icons-material/BorderColor';
// import {getStepOne,   getMandatoryLanguage,} from "../../Auth/AuthAction";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { elipsize } from "../../../../Helpers/Function/Functions";

const TabPane = StyledTabs.TabPane;
const { Option } = Select;

function WordsCard(props) {
  const { translateText,selectedLanguage} =props;
  const [loading, setLoading] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [activeKey, setActiveKey] = useState(null);
  const [currentProcess, setCurrentProcess] = useState(null);

 

//   useEffect(() => {
//     const defaultTab = props.mandatorylanguage.find(item => item.baseInd === true);
//     if (defaultTab) {
//       setActiveKey(defaultTab.language);
//       setCurrentProcess(defaultTab);
//       props.getStepOne(defaultTab.language);
//     }
//   }, [props.mandatorylanguage]);

//   const handleTabChange = (key) => {
//     setActiveKey(key);
//     const selectedLanguage = props.mandatorylanguage.find(item => item.language === key);
//     if (selectedLanguage) {
//       setCurrentProcess(selectedLanguage);
//       props.getStepOne(selectedLanguage.language);
//     }
//   };
  useEffect(() => {
    //  props.getMandatoryLanguage();
  },[]);




//   const loaderProps = {
//     loading,
//     size: 20,
//     duration: 1,
//     marginTop: "20rem",
//     colors: ['#5e22f0', '#f6b93b']
//   }

//   if (props.fetchingStepOne) {
//     return (
//       <div class=" flex justify-center items-center mt-[20rem]" >
//         <RotatingCircleLoader {...loaderProps} />
//       </div>
//     );
//   }
 

    return (
        <>
             {/* <StyledTabs
              style={{ width: "80%" }}
              defaultActiveKey={activeKey}
              activeKey={activeKey}
              onChange={handleTabChange}
              type="card"
            >
              {props.mandatorylanguage.map((item, i) => (
                <TabPane
                  key={item.language}
                  tab={<span
                    style={{
                      backgroundColor: item.baseInd ? "#54B254" : "#B254B2",
                      display: "inline-block",
                      padding: "5px 10px",
                      border: activeKey === item.language ? '3px solid yellow' : 'none', 
                      borderRadius: "4px",
                      color: "#fff",
                    }}
                  >
                   
                    {elipsize(item.language, 10)}
                   
                    </span>
                    }
                >
           
                </TabPane>
              ))}
            </StyledTabs> */}

               <div className="cwrapper" style={{ height: "80vh", overflowY: "auto" }}>
    
    <div className=" w-full my-2 h-16 scale-98 hover:scale-100 ease-in duration-100 ">
<div class="bg-white rounded-md shadow-2xl border-solid w-w95 h-16  p-1 max-sm:h-28 m-0  md:m-auto ">
<div class="flex max-sm:flex-col  md:flex flex-row justify-around ">
<div class="w-full md:flex flex-col justify-center mb-auto">
 <div class="flex justify-evenly">
 <div className="Ccard__title w-48">

<div>
<label class=" text-black-600 text-xs font-poppins"> 

</label>
</div>
<label class=" text-black-600 text-xs font-poppins"> 
{/* {props.stepones.header1} */}
</label>

</div>
   <div className="Ccard__title w-48">

 <div>
 <label class=" text-black-600 text-xs font-poppins"> 

 </label>
  </div>
  <label class=" text-black-600 text-xs font-poppins"> 
  {/* {props.stepones.companyData} */}
 </label>

   </div>
   <div className="Ccard__title w-48">
<div>
<label class=" text-black-600 max-sm:text-sm md:text-xs font-poppins">
</label> 
</div>
<label class=" text-black-600 max-sm:text-sm md:text-xs font-poppins">
{/* {props.stepones.companyName} */}
  </label>
   </div>

   <div className="Ccard__title w-32">
<div>
<label class=" text-black-600 max-sm:text-sm md:text-xs font-poppins">

</label> 
</div>
<label class=" text-black-600 max-sm:text-sm md:text-xs font-poppins">
{/* {props.stepones.vatNumber} */}


  </label>
   </div>

   <div className="Ccard__title w-32">
<div>
<label class=" text-black-600 max-sm:text-sm md:text-xs font-poppins">

</label> 
</div>
<label class=" text-black-600 max-sm:text-sm md:text-xs font-poppins">

{/* {props.stepones.number} */}
  </label>
   </div>
   <div className="Ccard__title w-32">
<div>
<label class=" text-black-600 max-sm:text-sm md:text-xs font-poppins">

</label> 
</div>
<label class=" text-black-600 max-sm:text-sm md:text-xs font-poppins">
{/* {props.stepones.street}  */}
  </label>
   </div>
   <div className="Ccard__title w-32">
<div>
<label class=" text-black-600 max-sm:text-sm md:text-xs font-poppins">
</label> 
</div>
<label class=" text-black-600 max-sm:text-sm md:text-xs font-poppins">
{/* {props.stepones.city}  */}
  </label>
   </div>
   <div className="Ccard__title w-32">
<div>
<label class=" text-black-600 max-sm:text-sm md:text-xs font-poppins">
</label> 
</div>
<label class=" text-black-600 max-sm:text-sm md:text-xs font-poppins">
{/* {props.stepones.country}  */}
  </label>
   </div>
   <div className="Ccard__title w-32">
<div>
<label class=" text-black-600 max-sm:text-sm md:text-xs font-poppins">
</label> 
</div>
<label class=" text-black-600 max-sm:text-sm md:text-xs font-poppins">
{/* {props.stepones.stateProvince}  */}
  </label>
   </div>
   <div className="Ccard__title w-32">
<div>
<label class=" text-black-600 max-sm:text-sm md:text-xs font-poppins">
</label> 
</div>
<label class=" text-black-600 max-sm:text-sm md:text-xs font-poppins">
{/* {props.stepones.postcode}  */}
  </label>
   </div>
   <div class="flex justify-around w-8 flex-col">
   {/* <div style={{filter: "drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))"}} class="rounded-full bg-white w-5 h-5">
   <BorderColorIcon
     onClick={() => {
      props.setUser(item);
      handlePassRowData(item);
      handleUpdateModal(true)}}
style={{ color: "blue" ,display:"flex",justifyItems:"center",justifyContent:"center",fontSize:"0.75rem",marginTop:"0.25rem",marginLeft:"0.25rem"}}
 
/>

</div> */}


</div> 
 
         </div>
         
 </div>

   
  
 
 </div>
 </div>
 </div>




</div>

        </>
    );
}

const mapStateToProps = ({ auth}) => ({
//   stepones:auth.stepones,
//   language:auth.userDetails.language,
//   fetchingStepOne:auth.fetchingStepOne,
//   mandatorylanguage: auth.mandatorylanguage,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
        //   getStepOne,
        //   getMandatoryLanguage,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WordsCard);