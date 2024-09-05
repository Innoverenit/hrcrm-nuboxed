import React, { Suspense,useState, useEffect,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSuppliesViewType, handleSuppliesModal } from "./SuppliesAction";
import { BundleLoader } from "../../../Components/Placeholder";
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
              <Suspense fallback={<BundleLoader />}>
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
                ) : viewType === "category" ? (
                <SuppliesCategoryCard translateText={props.translateText}
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
