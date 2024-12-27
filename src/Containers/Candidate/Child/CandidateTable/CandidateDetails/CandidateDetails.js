import React, { Component,useEffect,useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  MainWrapper,
} from "../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { getCandidateById } from "../../../CandidateAction";
const CandidateDetailHeader = lazy(() => import("../CandidateDetails/CandidateDetailHeader"));
const CandidateDetailLeft = lazy(() => import("./CandidateDetailLeft"));
const CandidateDetailRight = lazy(() => import("./CandidateDetailRight"));

function CandidateDetails (props) {
  const { candidateId, data } = useParams();
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  // componentDidMount() {
  //   props.getCandidateById(props.match.params.candidateId);
  // }
  useEffect(() => {
       props.getCandidateById(candidateId);
    }, [candidateId]);
  // render() {
   useEffect(() => {
          const fetchMenuTranslations = async () => {
            try {
              setLoading(true); 
              const itemsToTranslate = [
                        
              "140",// Email ID    0          
              "299",//Mobile #     1        
              "547",//Linkedin     2             
              "980",// Role 3
              "1783",//Benefits 4
              "1010",//Billing 5
              "1275",//Availability 6
              "277",//Company 7
             "325",// Designation 8
             "622",// Identification 9 
             "1775",// Gender 10 
             "1779",// Notice Period 11
             "1697",// Experience 12 
           //  "",//Skills 13 
            // "",//Certification 14
              //"",// Nationality 6
              // "" ,// "Cost Type",//6
              ];
      
              const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
              setTranslatedMenuItems(translations);
              setLoading(false);
            } catch (error) {
              setLoading(false);
              console.error('Error translating menu items:', error);
            }
          };
      
          fetchMenuTranslations();
        }, [props.selectedLanguage]);
    const { candidate, fetchingCandidateById } =props;
    console.log(props.candidateId);
    return (
      <>
        <CandidateDetailHeader />
        {fetchingCandidateById ? (
          <MainWrapper>
            <BundleLoader />
          </MainWrapper>
        ) : (
          <div class=" flex ">
            <Suspense fallback={""}>
              <div class=" flex flex-no-wrap w-full" >
                <div class=" w-[25%]" >
                  <CandidateDetailLeft 
                  candidate ={candidate}
                  translateText={props.translateText}
                  selectedLanguage={props.selectedLanguage}
                  translatedMenuItems={translatedMenuItems}
                  />
                </div>
                <div class=" w-[75%]" >
                  <CandidateDetailRight 
                  candidate={candidate}
                  translateText={props.translateText}
             selectedLanguage={props.selectedLanguage}
             translatedMenuItems={translatedMenuItems}

                  />
                </div>
              </div>
            </Suspense>
          </div>
        )}
      </>
    );
  }
// }

const mapStateToProps = ({ candidate }) => ({
  fetchingCandidateById: candidate.fetchingCandidateById,
  candidate: candidate.candidate,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 
      getCandidateById,
    }, 
    dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CandidateDetails);
