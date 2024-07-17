import React, { Suspense,useState, useEffect,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSuppliesViewType, handleSuppliesModal } from "./SuppliesAction";
import SuppliesHeader from "./SuppliesHeader";
import { BundleLoader } from "../../../Components/Placeholder";

const SuppliesTable =lazy(()=>import("./SuppliesTable"));
const SuppliesDeletedTable =lazy(()=>import("./SuppliesDeletedTable"));


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
            <SuppliesHeader
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
                setSuppliesViewType={setSuppliesViewType}
                viewType={viewType}
                handleSuppliesModal={handleSuppliesModal}
            />

            <Suspense fallback={<BundleLoader />}>
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
                ) : null}
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
