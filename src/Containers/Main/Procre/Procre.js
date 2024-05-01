import React, { Suspense,useState, useEffect,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setProcreViewType } from "../Procre/ProcreAction";
import { BundleLoader } from "../../../Components/Placeholder";
import ProcreCardList from "./ProcreCardList";
import ProcureHeader from "./Child/ProcureHeader";


function Procre(props) {
    const { setProcreViewType, viewType, } = props;
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
            <ProcureHeader
                setProcreViewType={setProcreViewType}
                viewType={viewType}
                // handleSuppliesModal={handleSuppliesModal}
            />

            <Suspense fallback={<BundleLoader />}>
                {viewType === "card" ? (
              
                   <ProcreCardList />
               
                ) : null}
            </Suspense>
        </React.Fragment>
    );
}

const mapStateToProps = ({ procre }) => ({
    viewType: procre.viewType,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            setProcreViewType,
        
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Procre);
