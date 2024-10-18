import React, { useEffect, useState } from 'react';
import { Timeline, Button, Popconfirm, Tooltip } from 'antd';
import { connect } from 'react-redux';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { base_url2 } from '../../../../../Config/Auth';
import axios from 'axios';
import { BundleLoader } from '../../../../../Components/Placeholder';

const ContactHistoryDrawerCard = (props) => {
  

    useEffect(() => {
        fetchContactHistotryList()
  }, []);

const [contactHistotryList, setcontactHistotryList] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const fetchContactHistotryList = async () => {
  try {
    const response = await axios.get(`${base_url2}/contactPerson/histroy/${props.rowData.contactPersonId}`,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    });
    setcontactHistotryList(response.data);
    setLoading(false);
  } catch (error) {
    setError(error);
    setLoading(false);
  }
};

  const [selectedStatus, setSelectedStatus] = useState(null);


  const currentDate = dayjs().format("DD/MM/YYYY");
  if (loading) return <BundleLoader/>;

  return (
    <div className="mt-4 ml-4 flex text-center">
   
      <Timeline>
        {contactHistotryList &&
          contactHistotryList.map((status, index) => ( 
            <Timeline.Item key={index} > 
              <div className="flex flex-row justify-between items-center">           
                <div class=" flex flex-col w-[30rem]">
                 <div> {dayjs(status.creationDate).format('DD/MM/YYYY')} </div>
                <div class="flex flex-row"> 
                  <div class="mr-2">{status.name} </div>
                  {currentDate === dayjs(status.creationDate).format("DD/MM/YYYY") ? (
                    <span className="text-xs text-[tomato] font-bold  mr-2">
                      New
                    </span>
                  ) : null}{status.email}</div>
                  Updated on {dayjs(status.modifyDate).format('DD/MM/YYYY')}
                 
                </div>
          <div class="flex  items-end  justify-end">
          {/* <div class="">
                  <div
                    type="link"
                    style={{ margin: '0 8px', padding: 0 }}
                    onClick={() => handleNotesClick(status)}
                  >
                    <NoteAltIcon className=' !text-icon  text-green-600 cursor-pointer'/>
                  </div>
                </div>
                <div >
                  <Tooltip title="Edit">
                    <BorderColorIcon
                      className="!text-icon cursor-pointer text-[tomato]"
                      onClick={() => {handleEditClick(status)
                        props.setEditActivityEvents(status)
                      }}
                    />
                  </Tooltip>
                </div> */}
            </div>
                
              </div>
            </Timeline.Item>
          ))}
      </Timeline>

      
     
    </div>
  );
};

const mapStateToProps = ({ customer, auth }) => ({
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactHistoryDrawerCard);
