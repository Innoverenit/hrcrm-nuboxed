
import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Select } from "../../../../Components/UI/Elements";
import { getDeletedLoCell} from "./LocationAction";
import { BundleLoader } from "../../../../Components/Placeholder";
import ReInstateLocCellToggle from "./ReInstateLocCellToggle";

const { Option } = Select;



const ReinstateCellTable = (props) => {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
       
        "1631",  //Cell Code,//0
         "744", // Cell,//1
         "147", // Description,//2
         "1069", // Reinstate,//3
       
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

    useEffect(()=>{
        
        props.getDeletedLoCell(props.storedLoc.locationDetailsId,props.orgId);
    },[]);

      if (props.fetchingDeletedLocationCell) {
    return <BundleLoader />;
  }

    return (
      <>
     


                <div className=' flex sticky z-auto'>
        <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky z-10">
          
            <div className=" md:w-[6rem]">{translatedMenuItems[0]}</div>
            <div className=" md:w-[4.2rem] ">#{translatedMenuItems[1]}</div> 
            <div className=" md:w-[5.1rem]">{translatedMenuItems[2]}</div>
            <div className="w-12">{translatedMenuItems[3]}</div>
                         </div>
                    <div className="z-auto" style={{ maxHeight: "500px", overflowX: "hidden",overflowY:"auto",position: "sticky" }}>
           {props.deletedLoCell.map((item) => {
            return (
              <div key={item.roomRackId}>
                <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-3">

                  <div className=" flex  md:w-[10.1rem] max-sm:w-full  ">
                    <div class="text-xs  font-semibold  font-poppins cursor-pointer">
                    {item.cell}
                    </div>
                  </div>

                  <div className=" flex   md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                    <div class=" text-xs  font-poppins">
                    
                      <div className=" text-xs  font-poppins">
                        <div> {item.cellUnit}</div>
                      </div>
                    
                    </div>

                  </div>
                
                  <div className=" flex  md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                 
                      <div className=" text-xs  font-poppins">
                        <div> {item.description}</div>
                      </div>
                  
                  </div>

                  <div class="flex md:items-center">


                    <div class="flex w-20 max-sm:flex-row max-sm:w-[10%]">
                    <div class="  text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            <ReInstateLocCellToggle locationDetailsId={item.locationDetailsId}
                            storedLoc={props.storedLoc} 
                            cellId={item.cellId}/>
                            </div>

                    </div>
                  </div>

                </div>
              </div>
            );
          })} 
            </div>

        </div>
      </div>

      </>
    );
   }

const mapStateToProps = ({ auth,location,distributor, departments, }) => ({
    userId: auth.userDetails.userId,
    orgId:auth.userDetails.organizationId,
    locationId:auth.userDetails.locationId,
    creatingLocationCell:location.creatingLocationCell,
    deletedLoCell:location.deletedLoCell,
    departments: departments.departments,
    departmentUser: distributor.departmentUser,
    fetchingDeletedLocationCell:location.fetchingDeletedLocationCell,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
           
            getDeletedLoCell,
        
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReinstateCellTable);
