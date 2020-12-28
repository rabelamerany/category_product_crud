import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import SuccessAlert from '../SuccessAlert';
import ErrorAlert from '../ErrorAlert';
import { format } from 'date-fns';

export default class IndexProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 3,
            alert_message: ''
        }
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/product')
            .then(response => {
                this.setState({
                    products: response.data.data,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    activePage: response.data.current_page
                });
            });
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        //  this.setState({activePage: pageNumber});
        //"http://127.0.0.1:8000/product?page=1
        axios.get('http://127.0.0.1:8000/api/product?page=' + pageNumber)
            .then(response => {
                this.setState({
                    products: response.data.data,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    activePage: response.data.current_page
                });
            });
    }

    onDelete(product_id) {
        axios.delete('http://127.0.0.1:8000/api/product/delete/' + product_id)
            .then(response => {

                var products = this.state.products;

                for (var i = 0; i < products.length; i++) {
                    if (products[i].id == product_id) {
                        products.splice(i, 1);
                        this.setState({ products: products });
                    }
                }
                this.setState({ alert_message: "success" })
            }).catch(error => {
                this.setState({ alert_message: "error" });
            })

    }

    sortBy(key) {
        debugger
        let arrayCopy = [...this.state.products];
        const arrInStr = JSON.stringify(arrayCopy);
        arrayCopy.sort(this.compareByAsc(key));
        const arrInStr1 = JSON.stringify(arrayCopy);
        if (arrInStr === arrInStr1) {
          arrayCopy.sort(this.compareByDesc(key));
        }
        this.setState({ products: arrayCopy });
    }

    compareByAsc(key) {
        return function (a, b) {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        };
    }

    compareByDesc(key) {
        return function (a, b) {
            if (a[key] < b[key]) return 1;
            if (a[key] > b[key]) return -1;
            return 0;
        };
    }

    render() {
        return (
            <div>
                <hr />

                {this.state.alert_message == "success" ? <SuccessAlert message={"product deleted successfully."} /> : null}
                {this.state.alert_message == "error" ? <ErrorAlert message={"Error occured while deleting the product."} /> : null}

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nom Produit</th>
                            <th scope="col">Description</th>
                            <th scope="col" onClick={() => this.sortBy('price')}>Prix</th>
                            <th scope="col">Créé à</th>
                            <th scope="col">Mis à jour à</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.products.map(product => {
                                return (
                                    <tr key={product.id}>
                                        <th scope="row">{product.id}</th>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td>{format(new Date(product.created_at), 'yyyy/MM/dd kk:mm:ss')}</td>
                                        <td>{format(new Date(product.updated_at), 'yyyy/MM/dd kk:mm:ss')}</td>
                                        <td>
                                            <Link to={`/product/edit/${product.id}`} className="btn btn-primary">Edit</Link> &nbsp;
                                            <a href="#" onClick={this.onDelete.bind(this, product.id)} className="btn btn-danger">Delete</a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                        onChange={this.handlePageChange}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
            </div>
        );
    }
}
