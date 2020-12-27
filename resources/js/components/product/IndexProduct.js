import React, { Component } from 'react';

import { Link, Route } from 'react-router-dom';
import Add from "./AddProduct";
import Listing from "./ListingProduct";
import Edit from "./EditProduct"

export default class IndexCategory extends Component {
    render() {
        return (
            <div>
                <hr />
                <Link to="/product" className="btn btn-danger">Liste </Link> &nbsp;
                <Link to="/product/add" className="btn btn-danger">Ajouter </Link>
                <Route exact path="/product" component={Listing} />
                <Route exact path="/product/add" component={Add} />
                <Route exact path="/product/edit/:id" component={Edit} />
            </div>
        );
    }
}
