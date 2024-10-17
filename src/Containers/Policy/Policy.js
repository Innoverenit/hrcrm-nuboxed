import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form } from "formik";
import { MainWrapper} from "../../Components/UI/Layout";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { getStages } from "../Opportunity/OpportunityAction";
import SinglePolicy from './SinglePolicy';

class Policy extends Component {
  componentDidMount = () => {
    this.props.getStages()
  }
  onDragEnd = (result) => {
    console.log(result)
    this.setState({ isDragging: false })
    //stop navigation is offline
    if (!navigator.onLine) {
      return;
    }
    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const { draggableId, destination, source } = result;
    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    this.props.updateOpportunityStage(source.droppableId, destination.droppableId, draggableId)
  };
  dragStart = () => {
    this.setState({ isDragging: true })
  }
  dragUpdate = () => {
    this.setState({ isDragging: false })
  }
  render() {
    const { fetchingStages, fetchingStagesError, stages } = this.props;
    if (fetchingStages) return <p>Loading ...</p>
    if (fetchingStagesError) return <p>error ...</p>
    return (
      <DragDropContext onDragEnd={this.onDragEnd} type='stage' onDragStart={this.dragStart} >
        <MainWrapper>
          <Formik
            enableReinitialize
            initialValues={{

            }}
            // validationSchema={}
            onSubmit={values => {
              console.log(values)
            }}>
            {({ errors, touched, isSubmitting, setFieldValue, setFieldTouched, values, ...rest }) => (

              <Form className="form-background">
       <div class=" flex flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
                  {stages && stages
                    .map(stage => Number(stage.probability) === 0 ? { ...stage, probability: 101 } : stage)
                    .sort((a, b) => Number(a.probability) > Number(b.probability) ? 1 : -1)
                    .map(stage => <SinglePolicy stage={stage} />)}
                </div>
                <Button type='primary' ghost htmlType='button'>Add stage</Button>&nbsp;
                <Button type='primary' htmlType='submit'>Save</Button>
              </Form>
            )}
          </Formik>
        </MainWrapper>
      </DragDropContext>
    )
  }
}

const mapStateToProps = ({ opportunity }) => ({
  fetchingStages: opportunity.fetchingStages,
  fetchingStagesError: opportunity.fetchingStagesError,
  stages: opportunity.stages,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getStages,
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Policy);