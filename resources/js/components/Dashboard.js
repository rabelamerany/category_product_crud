import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import '../../css/app.css';
import Category from './category/IndexCategory';
import Product from './Product/IndexProduct';

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <hr />
                <div className="d-flex justify-content-center">
                    <div className="card" style={{width: "18rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">Php - Coding challenge</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Produit et categorie</h6>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <Link className="card-link" to="/category">Categorie</Link> &nbsp; &nbsp;
                            <Link className="card-link" to="/product">Produit</Link>
                            <Route exact path='/category' component={Category} />
                            <Route exact path='/product' component={Product} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
