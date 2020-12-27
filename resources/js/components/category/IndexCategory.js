import React, { Component } from 'react';

import { Link, Route } from 'react-router-dom';
import Add from "./AddCategory";
import Listing from "./ListingCategory";
import Edit from "./EditCategory";

export default class IndexCategory extends Component {
    render() {
        return (
            <div>
                <div>
                    <hr />
                    <Link to="/category" className="btn btn-danger">Liste </Link> &nbsp;
                    <Link to="/category/add" className="btn btn-danger">Ajouter </Link>
                    <Route exact path="/category" component={Listing} />
                    <Route exact path="/category/add" component={Add} />
                    <Route exact path="/category/edit/:id" component={Edit} />
                </div>
            </div>
        );
    }
}
