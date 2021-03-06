import React from 'react';
import PropTypes from 'prop-types';
import { checkErrors } from './validation-service';
class ShowErrors extends React.Component {

    static propTypes = {
        value: PropTypes.any,
        validations: PropTypes.object,
        display: PropTypes.bool
    };

    static defaultProps = {
        display: false
    };

    listOfErrors() {
        const { validations, value } = this.props;
        const errors = checkErrors(validations, value);
        console.log(errors.length);
        return errors;
    }

    render() {
        if (!this.props.display) { return null; }
        return (
            <div>
                {this.listOfErrors().map(
                    err => <small key={err}>{err}</small>
                )}
            </div>
        );
    }
}
export default ShowErrors;