import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Button,Tooltip ,Popconfirm} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {removeEvents} from "../Event/EventAction"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { DeleteOutlined } from "@ant-design/icons";
import { TextInput } from "../../../Components/UI/Elements";
import dayjs from "dayjs";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";


class SingleEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      eventType: "",
      editInd:true,
    };
  }
  render() {
    const {
        event: { eventType,creationDate, eventTypeId },
      handleChange,
      name,
      value,
      linkedEvents,
      updatingEvents,
      handleUpdateEvent,
      handleDeleteEvent,
    } = this.props;
    console.log(linkedEvents);
    const currentdate = dayjs().format("DD/MM/YYYY");
        const date = dayjs(creationDate).format("DD/MM/YYYY");
    // const disableDelete = linkedSources && linkedSources.includes(documentTypeId)
    return (
      <div class=" w-full cursor-pointer">
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between" >
                <div class=" font-semibold" >
                  {eventType}&nbsp;&nbsp;&nbsp;
            {date === currentdate ?<span class="text-xs text-[tomato] font-bold"
                                  >
                                    New
                                  </span> : null}
                </div>
                <div>
                  {this.props.event.editInd?
                <BorderColorIcon 
                    tooltipTitle="Edit"
                    iconType="edit"
                    onClick={toggleViewType}
                    style={{fontSize:"1rem"}}
                  />:null}
                
                  <Tooltip title="Delete">
                  <Popconfirm
                          title="Do you want to delete?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => this.props.removeEvents(eventTypeId )}
                        >
                    <DeleteOutlined
                 
                        // onClick={() => handleDeleteEvent(eventTypeId)}
                    
                      style={{
                        verticalAlign: "center",
                        marginLeft: "1rem",
                        fontSize:"1rem",
                        color: "red",
                      }}
                    />
                       </Popconfirm>
                  </Tooltip>
                  {/* {disableDelete && <ActionIcon
                                        tooltipTitle='Delete'
                                        iconType='delete'
                                        handleIconClick={() => handleDeleteSource(documentTypeId)}
                                        size='0.75em'
                                        theme='filled'
                                        style={{ color: '#666' }}
                                    />} */}
                  {/* <ActionIcon
                    tooltipTitle="Delete"
                    iconType="delete"
                    handleIconClick={() => handleDeleteDesignation(designationTypeId)}
                    size="0.75em"
                    theme="filled"
                    style={{ color: "#666" }}
                  />*/}
                </div> 
              </div>
            ) : (
              <div class=" flex">
                  <TextInput
                    name={name}
                    // value={value || eventType}
                    defaultValue={eventType}
                    onChange={handleChange}
                    style={{ width: "60%" }}
                  />
                
                  <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!value}
                    loading={updatingEvents}
                  onClick={() => handleUpdateEvent(eventTypeId, value, toggleViewType())}
                  >
                    {/* Save */}
                    <FormattedMessage
              id="app.update"
              defaultMessage="Update"
            />
                </Button>
               
                  <Button type="cancel"  onClick={() => toggleViewType()}>
                    {/* Cancel */}
                    <FormattedMessage
              id="app.cancel"
              defaultMessage="Cancel"
            />
                </Button>
                </div>
                </div>
              )
          }
        </ViewEditCard>
      </div>
    );
  }
}

const mapStateToProps = ({ departments, sector }) => ({

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      removeEvents,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SingleEvent);



