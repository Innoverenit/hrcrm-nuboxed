import React, { Suspense,useState, useEffect,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SuppliesLocationTable from "./SuppliesLocationTable"
import SuppliesBrandModelTable from "./SuppliesBrandModelTable"
import { setSuppliesViewType, handleSuppliesModal } from "./SuppliesAction";
import FWLogo1 from "../../../Assets/Images/smallLogo.png"
import SuppliesTab from "./SuppliesTab";
const SuppliesBrandTable =lazy(()=>import("./SuppliesBrandTable"))
const SuppliesHeader =lazy(()=>import("./SuppliesHeader"));
const SuppliesTable =lazy(()=>import("./SuppliesTable"));
const SuppliesDeletedTable =lazy(()=>import("./SuppliesDeletedTable"));
const SuppliesCategoryCard =lazy(()=>import("./SuppliesCategoryCard"));

function Supplies(props) {
    const { setSuppliesViewType, viewType, handleSuppliesModal } = props;
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);


    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    


    return (
        <React.Fragment>
              <Suspense fallback={ <div className="custom-loader">
          <div className="loader !block"> </div>
      <div className="custom-loader" ><img src={FWLogo1}   className="w-12 -mt-[5.5rem]"  alt="Loading..."  /></div>
    </div>}>
              <SuppliesHeader
             translateText={props.translateText}
             selectedLanguage={props.selectedLanguage}
                setSuppliesViewType={setSuppliesViewType}
                viewType={viewType}
                handleSuppliesModal={handleSuppliesModal}
            />

          
                {viewType === "all" ? (
              
                   <SuppliesTable
                   translateText={props.translateText}
                   selectedLanguage={props.selectedLanguage}
                    />
                  
                ) : viewType === "dashboard" ? (
                   
                     <SuppliesDeletedTable 
                     translateText={props.translateText}
                     selectedLanguage={props.selectedLanguage}
                     /> 
                    ) : viewType === "brand" ? (
                   
                        <SuppliesBrandTable 
                        translateText={props.translateText}
                        selectedLanguage={props.selectedLanguage}
                        /> 
                    ) : viewType === "brandModel" ? (
                   
                        <SuppliesBrandModelTable 
                        translateText={props.translateText}
                        selectedLanguage={props.selectedLanguage}
                        /> 
                    ) : viewType === "suppliesLocation" ? (
                   
                        <SuppliesLocationTable 
                        translateText={props.translateText}
                        selectedLanguage={props.selectedLanguage}
                        /> 
                ) : viewType === "category" ? (
                <SuppliesCategoryCard translateText={props.translateText}
                selectedLanguage={props.selectedLanguage}/>) :
            viewType === "newList" ? (
                <SuppliesTab translateText={props.translateText}
                selectedLanguage={props.selectedLanguage}/>) :
                null}
            </Suspense>
        </React.Fragment>
    );
}

const mapStateToProps = ({ supplies }) => ({
    viewType: supplies.viewType,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            setSuppliesViewType,
            handleSuppliesModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Supplies);
