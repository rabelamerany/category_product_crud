import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Category from './category/IndexCategory';
import Product from './Product/IndexProduct';
import Error404 from './Error404';

export default class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark col-md-12">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Tableau de Bord</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/category">Categorie</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/product">Produit</Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-danger my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
                <div className='row'>
                    <div className='col-md-12'>
                        {
                            <Switch>
                                <Route exact path='/' component={Dashboard} />
                                <Route exact path='/category' component={Category} />
                                <Route exact path="/category/add" component={Category} />
                                <Route exact path="/category/edit/:id" component={Category} />

                                <Route exact path='/product' component={Product} />
                                <Route exact path="/product/add" component={Product} />
                                <Route exact path="/product/edit/:id" component={Product} />

                                <Route exact path="/*" component={Error404} />
                            </Switch>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
