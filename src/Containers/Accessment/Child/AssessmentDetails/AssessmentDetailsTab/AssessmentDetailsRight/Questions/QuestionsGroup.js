import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QuestionForm from "../QuestionForm";
import { getQuestionsListByAssId,deleteQuestionsById } from "../../../../../AccessmentAction";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function QuestionsGroup(props) {
  const { assessmentId } = props;
  useEffect(() => {
    props.getQuestionsListByAssId(props.assessmentId);
  }, []);

  return (
    <>
     <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
        <div>
          <div class="flex">
            <div>
               <div class="h-[9rem] w-[21vw] rounded p-1 m-1 mt-5 bg-white border-[2px] border-[#eeeeee] text-black">
                <QuestionForm assessmentId={assessmentId} />
              </div>
            </div>
            {props.questionsList.map((item, i) => {
              return (
                <div class="h-[9rem] w-[21vw] rounded p-1 m-1 mt-5 bg-white border-[2px] border-[#eeeeee] text-black">
                 
                 <div class="w-7 h-7" >
                    </div>                             
                 
                  <div>
                  <div class="h-8 overflow-hidden whitespace-nowrap text-lg font-poppins font-bold overflow-ellipsis text-center">{i+1}. {item.question}</div>
                    {/* <Tooltip title={item.description}>
                     
                    </Tooltip> */}
                    <div class="h-8 font-bold font-poppins text-xs overflow-hidden whitespace-nowrap">{item.option1}</div>
                    <div class="h-8 font-bold font-poppins text-xs overflow-hidden whitespace-nowrap">{item.option2}</div>
                    <div class="h-8 font-bold font-poppins text-xs overflow-hidden whitespace-nowrap">{item.option3}</div>
                    <div class="h-8 font-bold font-poppins text-xs overflow-hidden whitespace-nowrap">{item.option4}</div>
                    <div style={{justifyContent:"space-between"}}>
                    <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                      <EditOutlined 
                      onClick={()=>{
                       // props.deleteQuestionsById(item.id,props.assessmentId)
                      }}
                      />
                      <DeleteOutlined
                      onClick={()=>{
                        props.deleteQuestionsById(item.id,props.assessmentId)
                      }}
                      />
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

const mapStateToProps = ({ assessment }) => ({
  questionsList: assessment.questionsList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getQuestionsListByAssId,deleteQuestionsById
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsGroup);
