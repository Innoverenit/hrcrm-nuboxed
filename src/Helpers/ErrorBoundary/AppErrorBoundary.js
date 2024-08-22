import React from "react";
import error from "../../Assets/Images/i.png";
import { Button } from "antd";
import { FormattedMessage } from "react-intl";

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  handleRefreshPage() {
    window.location.reload();
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
        <div class="flex justify-center items-center h-lvh"
          >
         <div class=" flex  flex-col justify-center items-center  w-[25rem] h-[25rem]  bg-[#f5f5f5]"
            style={{ boxShadow: " 0 0.8125em 1.6875em -0.3125em rgba(50, 50, 93, 0.25)"}}
            >
               <img className="h-[3.125rem] w-[3.125rem] rounded"
                src={error}           
              >              
              </img>
              <div>
              <div class=" flex text-lg  text-[blue] font-bold font-poppins justify-center items-center mt-2"

>
                  OOPS !
                </div>
                <div class=" flex justify-center text-lg font-bold font-poppins items-center mt-2 ml-4"
                >
                  It is a problem with us.
                  <br />
                  Please refresh your browser
                </div>
              </div>
           <div class=" mt-3">
              <Button
                type="primary"
              
                onClick={() => this.handleRefreshPage()}
              >
                <FormattedMessage
                  id="app.refresh"
                  defaultMessage="Refresh"
                />
                {/* Retry */}
              </Button>
              </div>
            </div>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
