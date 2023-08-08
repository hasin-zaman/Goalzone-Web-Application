import React, { Component } from 'react';
import BadRequest from './routes/protected/badRequest';
import Forbidden from './routes/protected/forbidden';
import InternalServerError from './routes/protected/internalServerError';
import NotFound from './routes/protected/notFound';
import ServiceUnavailable from './routes/protected/serviceUnavailable';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorType: null };
    }

    static getDerivedStateFromError(error) {
        if(error.response && error.response.status===500) {
            return { hasError: true, errorType: 'internalServerError' }
        }
        else if(error.response && error.response.status===503) {
            return { hasError: true, errorType: 'serviceUnavailable' }
        }
        else if(error instanceof TypeError && error.message === 'NetworkError when attempting to fetch resource.') {
            return { hasError: true, errorType: 'networkError' }
        }
        else if(error.response && error.response.status===404) {
            return { hasError: true, errorType: 'notFound' }
        }
        else if(error.response && error.response.status===403) {
            return { hasError: true, errorType: 'forbidden' }
        }
        else {
            return { hasError: true, errorType: 'unknown' };
        }
    }

    render() {
        if(this.state.hasError) {
            const { errorType } = this.state;

            switch(errorType) {
                case 'internalServerError': return <InternalServerError />;
                case 'serviceUnavailable': return <ServiceUnavailable />;
                case 'networkError': return <ServiceUnavailable />;
                case 'notFound': return <NotFound />;
                case 'forbidden': return <Forbidden />;
                default: return <BadRequest />;
            }
        }

        return this.props.children;
    }
}

export default ErrorBoundary;