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
        this.state = {
            name: '',
            description: '',
            price: '',
            image: '',
            alert_message: ''
        }
    }

    onChangeProductName(e) {
        this.setState({
            name: e.target.value
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

    fileUpload(image) {
        const url = 'http://localhost:8000/api/fileupload';
        const formData = { file: this.state.image }
        return post(url, formData)
            .then(response => console.log(response))
    }

    onSubmit(e) {
        e.preventDefault();
        const product = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            image: this.state.image,
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
                    <div className="form-group">
                        <h3><label htmlFor="file">Image Upload:</label></h3>
                        <input
                            type="file"
                            title="Choose File” and “No file Chosen"
                            onChange={this.onChangeProductImage}
                            accept="image/*"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Enregistrer</button>
                </form>
            </div>
        );
    }
}
