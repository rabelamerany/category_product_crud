import React, { Component } from 'react';
import axios from 'axios';
import SuccessAlert from '../SuccessAlert';
import ErrorAlert from '../ErrorAlert';

export default class IndexProduct extends Component {

    constructor(props) {
        super(props);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductDescription = this.onChangeProductDescription.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeProductImage = this.onChangeProductImage.bind(this)
        this.onChangeCategoryName = this.onChangeCategoryName.bind(this)
        this.state = {
            name: '',
            description: '',
            price: '',
            image: '',
            alert_message: '',
            categories: [],
            category_id: '',
            fields: {},
            errors: {}
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/category')
            .then(response => {
                this.setState({
                    categories: response.data.data,
                });
            });
    }

    onChangeProductName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeCategoryName(e) {
        this.setState({
            category_id: e.target.value
        });
    }

    onChangeProductDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeProductPrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeProductImage(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);
    }

    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                image: e.target.result
            })
        };
        reader.readAsDataURL(file);
    }

    onSubmit(e) {
        e.preventDefault();
        const product = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            image: this.state.image,
            category_id: this.state.category_id,
        }

        axios.post('http://127.0.0.1:8000/api/product/store', product)
            .then(res => {
                this.setState({ alert_message: "success" })
            }).catch(error => {
                this.setState({ alert_message: "error" });
            })
    }

    render() {
        return (
            <div>
                <hr />
                {this.state.alert_message == "success" ? <SuccessAlert message={"Produit ajouté avec succès."} /> : null}
                {this.state.alert_message == "error" ? <ErrorAlert message={"Une erreur s'est produite lors de l'ajout du produit."} /> : null}

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nom</label>
                        <input type="text"
                            className="form-control"
                            id="name"
                            value={this.state.name}
                            onChange={this.onChangeProductName}
                            placeholder="Entrez le produit" />
                        <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea type="text"
                            className="form-control"
                            id="description"
                            value={this.state.description}
                            onChange={this.onChangeProductDescription}
                            placeholder="Entrez la description">
                        </textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Prix</label>
                        <input type="nbumber"
                            className="form-control"
                            id="price"
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            value={this.state.price}
                            onChange={this.onChangeProductPrice}
                            placeholder="Entrez le prix" />
                    </div>
                    <div className="form-group form-select">
                        <label htmlFor="category_name">Categorie:</label>
                        <select className="form-control" onChange={this.onChangeCategoryName}>
                            <option defaultValue>Open this select menu</option>
                            {
                                this.state.categories.map(category => {
                                    return (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <h3><label htmlFor="file">Image Upload:</label></h3>
                        <input
                            type="file"
                            title="Choose File” and “No file Chosen"
                            onChange={this.onChangeProductImage}
                            accept="image/*" />
                    </div>
                    <button type="submit" className="btn btn-danger">Enregistrer</button>
                </form>
            </div>
        );
    }
}
