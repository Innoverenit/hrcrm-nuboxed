import React, { useEffect, Suspense, Component } from "react";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";
import { MultiAvatar } from "../../../../../../../Components/UI/Elements";
import { Button, Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
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
      <FlexContainer>
        <div>
          <div class="flex">
            <div>
              <CardElement>
                <QuestionForm assessmentId={assessmentId} />
              </CardElement>
            </div>
            {props.questionsList.map((item, i) => {
              return (
                <CardElement
                  style={{
                    backgroundColor: "#ADD8E6",
                    borderRadius: "1rem",
                    boxShadow: "2px 5px #888888",
                  }}
                >
                  <CardImage>
                    {/* <MultiAvatar
                    // imageId={item.imageId ? item.imageId : ''}
                    imgHeight={200}
                    imgWidth={200}
                    imgRadius={20}
                  /> */}
                    
                  </CardImage>
                  <CardDescription>
                    <Header>{i+1}. {item.question}</Header>
                    {/* <Tooltip title={item.description}>
                     
                    </Tooltip> */}
                    <Price>{item.option1}</Price>
                    <Price>{item.option2}</Price>
                    <Price>{item.option3}</Price>
                    <Price>{item.option4}</Price>
                    <div style={{justifyContent:"space-between"}}>
                      <FlexContainer justifyContent="flex-end" >
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
                      </FlexContainer>
                      
                    </div>
                    {/* <Cd>{` ${dayjs(item.creationDate).format("ll")}`}</Cd> */}
                    {/* <div style={{ display: "flex" }}>
                      Cancel:<RequirementCancelToggle />
                    </div> */}
                  </CardDescription>
                </CardElement>
              );
            })}
          </div>
        </div>
      </FlexContainer>
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

const CardElement = styled.div`
  //   width: 20%;
  border-radius: 0.2rem;
  border: 2px solid #eeeeee;
  background-color: rgb(255, 255, 255);
  //  height: 23em;
  color: rgb(68, 68, 68);
  margin: 0.3rem;
  padding: 0.3rem;
  width: 20vw;
  //   padding: 0 20px;
  //margin-top: 1.5em;
  /* margin:0px 20px; */
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
const CardDescription = styled.div`
  @media only screen and (max-width: 600px) {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;
const CardImage = styled.div`
  width: 200;
  height: 200 @media only screen and (max-width: 600px) {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;
const WithOutImage = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  flex-direction:column @media only screen and (max-width: 600px) {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

const Header = styled.div`
  text-overflow: ellipsis;

  white-space: nowrap;
  overflow: hidden;
  height: 2em;
  font-size: 1.3em;
  font-family: Poppins;
  font-weight: 700;
  @media only screen and (max-width: 600px) {
    text-overflow: ellipsis;

white-space: nowrap;
overflow: hidden;
height: 2em;
font-size: 1.3em;
font-family: Poppins;
font-weight: 700;
width:100%
text-align:center
  }
`;
const Desc = styled.p`
  height: 0px;
`;
const Price = styled.div`
  height: 2em;
  font-weight: 700;
  font-family: Poppins;
  font-size: 1em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const Cd = styled.div`
  height: 1.5em;
  font-weight: 700;
  font-family: Poppins;
  font-size: 1em;
`;
