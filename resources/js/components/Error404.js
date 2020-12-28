import React, { Component } from 'react';
import '../../css/app.css';

export default class Footer extends Component {
    render() {
        return (
            <div>
                <br />
                <br />
                <div className="alert alert-danger">
                    404 Page non trouvée. 
                    <Link to="/" className="alert-link">Retour à Tableau de bord </Link>
                </div>
            </div>
        );
    }
}
