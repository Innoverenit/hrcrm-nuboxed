import React, { useEffect, useState,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProjectDetailById } from "../../ProjectsAction";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { useParams } from "react-router-dom";
import { BundleLoader } from "../../../../Components/Placeholder";
import ProjectsDetailHeader from "./ProjectsDetailHeader";
import ProjectsDetailLeft from "./ProjectsDetailLeft";
import ProjectDetailsRight from "./ProjectDetailsRight";

function ProjectsDetail  (props){
  const { ProjectId, data } = useParams();
   const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

       useEffect(() => {
              const fetchMenuTranslations = async () => {
                try {
                  setLoading(true); 
                  const itemsToTranslate = [
                            
                  "77",// owner   0          
                  "248",//customer #     1        
                 //   "",// Create Invoice
            
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
     useEffect(() => {
        props.getProjectDetailById(ProjectId);
      }, [ProjectId]);
    // console.log(projectsById)
    const { projectsById, fetchingProjectsDetailById } = props;
    return (
      <>
        <>
          <ProjectsDetailHeader />
          {fetchingProjectsDetailById ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : 
          (
              <div>
                <Suspense >
                <div class=" flex flex-nowrap w-full"
                >
                    <div class=" w-1/4">
                      <ProjectsDetailLeft projectsById={projectsById}
                        translateText={props.translateText}
                        selectedLanguage={props.selectedLanguage}
                        translatedMenuItems={translatedMenuItems} />
                    </div>
                    <div class=" w-3/4">
                      <ProjectDetailsRight projectsById={projectsById}
                        translateText={props.translateText}
                        selectedLanguage={props.selectedLanguage}
                        translatedMenuItems={translatedMenuItems} />
                    </div> 
                  </div>
                </Suspense>
              </div>
            )}
        </>
      </>
    );
  }

const mapStateToProps = ({ projects }) => ({
     fetchingProjectsDetailById: projects.fetchingProjectsDetailById,
     projectsById: projects.projectsById,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getProjectDetailById,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsDetail)

