import React, { Suspense,useState, useEffect,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SuppliesLocationTable from "./SuppliesLocationTable"
import SuppliesBrandModelTable from "./SuppliesBrandModelTable"
import { setSuppliesViewType, handleSuppliesModal } from "./SuppliesAction";
import SuppliesTab from "./SuppliesTab";
import { BundleLoader } from "../../../Components/Placeholder";
const SuppliesBrandTable =lazy(()=>import("./SuppliesBrandTable"))
const SuppliesHeader =lazy(()=>import("./SuppliesHeader"));
const SuppliesTable =lazy(()=>import("./SuppliesTable"));
const SuppliesDeletedTable =lazy(()=>import("./SuppliesDeletedTable"));
const SuppliesCategoryCard =lazy(()=>import("./SuppliesCategoryCard"));

function Supplies(props) {
    const { setSuppliesViewType, viewType, handleSuppliesModal } = props;
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);


     useEffect(() => {
                const fetchMenuTranslations = async () => {
                  try {
                    const itemsToTranslate = [
                     "1237",//0
                      "228",//1
                      "14",//2
                      "798",//3
                      "264",// Brand//4
                     "1607", // Brand Model 5
                     "85",//6
                     "294",//7
                     "104",//8
                     "796",//9
            
                    ];
            
                    const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
                    setTranslatedMenuItems(translations);
                  } catch (error) {
                    console.error('Error translating menu items:', error);
                  }
                };
            
                fetchMenuTranslations();
              }, [props.selectedLanguage]);
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
                translatedMenuItems={translatedMenuItems}
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
