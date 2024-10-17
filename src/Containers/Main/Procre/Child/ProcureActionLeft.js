import React,{useEffect,useState} from "react";
import TocIcon from '@mui/icons-material/Toc';
import { StyledSelect } from "../../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import { connect } from "react-redux";
import {getRecords} from "../ProcreAction"
import { Avatar, Tooltip,Badge } from "antd";
import { FormattedMessage } from "react-intl";
import { AudioOutlined } from "@ant-design/icons"

const Option = StyledSelect.Option;

function ProcureActionLeft (props) {
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false);  //Code for Search
    const [pageNo, setPage] = useState(0);

    useEffect(() => {
        if (props.viewType === "card") {
          props.getRecords(props.orgId,"procure");
        } else if (props.viewType === "all") {
          props.getSupplierAllCount(props.orgId);
        } 
      }, [props.viewType, props.orgId]);
    
        const {
            user,
            viewType,
            setProcreViewType,
        } = props;
const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
      useEffect(() => {
        // props.getCustomerRecords();
        if (transcript) {
          console.log(">>>>>>>", transcript);
          setCurrentData(transcript);
        }
        }, [ transcript]);
        const handleChange = (e) => {
            setCurrentData(e.target.value);
        
            if (searchOnEnter&&e.target.value.trim() === "") {  //Code for Search
              setPage(pageNo + 1);
            //   props.getLeads(props.userId, pageNo, "creationdate");
            //   props.ClearReducerDataOfLead()
              setSearchOnEnter(false);
            }
          };
          const handleSearch = () => {
            if (currentData.trim() !== "") {
              // Perform the search
              props.inputDataSearch(currentData);
              setSearchOnEnter(true);  //Code for Search
            } else {
              console.error("Input is empty. Please provide a value.");
            }
          };
          const suffix = (
            <AudioOutlined
              onClick={SpeechRecognition.startListening}
              style={{
                fontSize: 16,
                color: '#1890ff',
              }}
        
            />
          );

        return (
            <div class="flex items-center">

                <Tooltip
                    title={<FormattedMessage id="app.cardview" defaultMessage="Active Orders" />}>
<Badge
          size="small"
          count={(props.viewType === "card" && props.recordData.order) || 0}
          overflowCount={999}
        >
                    <span class=" mr-2 text-sm cursor-pointer"
                        onClick={() => setProcreViewType("card")}
                        style={{
                            color: viewType === "card" && "#1890ff",
                        }}
                    >

                        <Avatar style={{ background: viewType === "card" ? "#f279ab" : "#28a355" }}>
                            <TocIcon className="text-white" /></Avatar>

                    </span>
                    </Badge> 
                </Tooltip>

            

            </div>
        );
}

const mapStateToProps = ({ auth, suppliers,procre }) => ({
    user: auth.userDetails,
    recordData:procre.recordData,
    dateRangeList: suppliers.dateRangeList,
    startDate: suppliers.startDate,
    endDate: suppliers.endDate,
    userId: auth.userDetails.userId,
    orgId:auth.userDetails.organizationId,
    countSupplier:suppliers.countSupplier,
    allCountSupplier:suppliers.allCountSupplier
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
          getRecords
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ProcureActionLeft);
