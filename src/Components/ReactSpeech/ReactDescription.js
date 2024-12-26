import React, { useState, useEffect, useRef } from 'react';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RotateRightIcon from "@mui/icons-material/RotateRight";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import {Tooltip} from "antd"
import useGoogleMapsLoader from '../../Components/CustomMap/useGoogleMapsLoader'
const SpeechRecognitionComponent = (props) => {
//   const [text, setText] = useState("");         // For manual text input
  const [transcript, setTranscript] = useState('');  // For speech recognition text
  const [isListening, setIsListening] = useState(false);  // To control listening state
  const recognitionRef = useRef(null);  // Store recognition instance
  const apiKey = "AIzaSyAQdQZU6zRL9w32DH2_9al-kkXnK38fnJY";
  const { isLoaded, error } = useGoogleMapsLoader(apiKey, 'places');

  useEffect(() => {
    // Check if the browser supports speech recognition
    if (!('webkitSpeechRecognition' in window)) {
      console.log('Browser does not support speech recognition.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    // Event handler for when speech recognition returns results
    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      finalTranscript = finalTranscript.trim(); // Remove any trailing spaces

      // Append final transcript only once
      setTranscript((prevTranscript) => {
        props.setText((prevText) => (prevText + ' ' + finalTranscript).trim());
        return (prevTranscript + ' ' + finalTranscript).trim();
      });
    };

    // Event handler when speech recognition ends
    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    // Cleanup on component unmount
    return () => {
      recognition.stop();
    };
  }, []);

  // Function to start listening
  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Function to stop listening
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Handle text changes manually in textarea
  const handleTextChange = (event) => {
    props.setText(event.target.value);
    setTranscript('');  // Clear transcript if manually editing text
  };

  // Reset both text and transcript
  const resetTranscript = () => {
    setTranscript('');
    props.setText('');
  };

  return (
    <>
        {!isLoaded ? (
      <div>Loading Google Autoplaces...</div>
     ) : (
    <div>
    <div>
                    <span class="font-bold font-poppins text-xs"> 
                        {/* {translatedMenuItems[1]} */}
                        Description
                        </span>
                    
                  <span>
                    <span onClick={startListening}>
                      <Tooltip 
                      title= "Start"
                      >
                        <span  >
                          <RadioButtonCheckedIcon className="!text-icon ml-1 text-red-600"/>
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={stopListening}>
                      <Tooltip 
                      title= "Stop"
                      >
                        <span
                          
                            >
                          <StopCircleIcon className="!text-icon ml-1 text-green-600"/>
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={resetTranscript}>
                      <Tooltip 
                      title= "Reset"
                      >
                        <span  >
                          <RotateRightIcon className="!text-icon ml-1" />
                        </span>
                      </Tooltip>
                    </span>
                  </span>
                  <div>
                    <textarea
                      name="description"
                      className="textarea"
                      type="text"
                      value={transcript ? transcript : props.text}
                      onChange={handleTextChange}
                    ></textarea>
                  </div>
                </div>
    </div>
       )}
    </>
  );
};

export default SpeechRecognitionComponent;
