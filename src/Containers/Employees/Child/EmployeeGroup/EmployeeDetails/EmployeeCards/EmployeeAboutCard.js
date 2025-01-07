import React, { Component ,lazy} from 'react';
import { ViewEditCard } from "../../../../../../Components/UI/Elements"
const EmployeeAboutView = lazy(() => import("./EmployeeAboutView"));
const EmployeeAboutEdit = lazy(() => import("./EmployeeAboutEdit"));

class EmployeeAboutCard extends Component {
    render() {
        const { singleEmployee } = this.props;
        console.log(singleEmployee)
        return (
            <div>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) => (
                        viewType === 'view'
                            ? <EmployeeAboutView
                                translateText={this.props.translateText}
                               selectedLanguage={this.props.selectedLanguage}
                                translatedMenuItems={this.props.translatedMenuItems}
                                singleEmployee={singleEmployee}
                                toggleViewType={toggleViewType}
                            />
                            : <EmployeeAboutEdit
                               translateText={this.props.translateText}
                               selectedLanguage={this.props.selectedLanguage}
                                translatedMenuItems={this.props.translatedMenuItems}
                                singleEmployee={singleEmployee}
                                toggleViewType={toggleViewType}
                            />
                    )}
                </ViewEditCard>
            </div>
        )
    }
}

export default EmployeeAboutCard;