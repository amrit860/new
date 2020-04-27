import React, { Component } from 'react';
import axios from 'axios';
import { httpClient } from '../../../utils/httpclient';
const IMG_URL = process.env.REACT_APP_IMG_URL;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const defaultForm = {
   
    name: '',
    category: '',
    brand: '',
    description: '',
    color: '',
    tags: '',
    manuDate: '',
    expiryDate: '',
    image: '',
    discountedItem: false,
    discountType: '',
    discount: '',
    warrantyItem: false,
    warrantyPeriod: '',
    price: '',

}

export default class AddProductForm extends Component {
    uploadArray = [];
    title="Add prduct"
    constructor() {
        super();
        this.state = {
            data: { ...defaultForm },
            err: { ...defaultForm },
            isSubmitting: false,
            isValidForm: false,
          
        }
    }
    componentDidMount() {
        console.log("props",this.props);
        if (this.props.title) {
            this.title = this.props.title
        }
        if (this.props.productData) {
            this.setState({
                data: {
                    ...defaultForm,
                    ...this.props.productData
                }
            })
        }
    }


    handleChange = e => {
        let { name, value, type, checked, files } = e.target;
        if (type === "checkbox") {
            value = checked
        }
        // if (type === "file") {
        //     this.uploadArray = files;
        //     value = files
        // }
        this.setState((pre) => ({
            data: {
                ...pre.data,
                [name]: value
            }
        }), () => {
            this.validateForm(name);
        })
    }
    validateForm(fieldName) {
        let errMsg;
        switch (fieldName) {
            case "category":
                errMsg = this.state.data[fieldName]
                    ? ""
                    : "category is required"
                break;
            default:
                break;
        }
        this.setState((pre) => ({
            error: {
                ...pre.error,
                [fieldName]: errMsg
            }
        }), () => {
            this.checkFormValidity();
        })

    }
    checkFormValidity() {
        const { error } = this.state;
        let errors = Object
            .values(error)
            .filter(err => err);
        this.setState({
            isValidForm: errors.length === 0,
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isSubmitting: true
        })
        if (this.state.data._id) {
            this.update();
        }
        else {
            this.add();
        }
    }
   add() {
       
         axios.post
            ("http://localhost:2021/api/product",
                this.state.data, {
                headers: {
                    "content-Type": "application/json",
                    'Authorization': localStorage.getItem('token')
                },
                params: {},
                responseType: "json"
            }
            )
            .then(response => {
                console.log("success in axios call>>", response);
                this.props.history.push("/View Product");
            })
            .catch(err => {
                console.log("error in axios call>>", err.response)
                this.setState({
                    isSubmitting: false
                })
            })
        }
        // httpClient.upload(this.state.data, this.state.data.image);
    //     axios.post
    //         ("http://localhost:2021/api/product",
    //             this.state.data, {
    //             headers: {
    //                 "content-Type": "application/json",
    //                 'Authorization': localStorage.getItem('token')
    //             },
    //             params: {},
    //             responseType: "json"
    //         }
    //         )
    //         .then(response => {
    //             console.log("success in axios call>>", response);
    //             this.props.history.push("/View Product");
    //         })
    //         .catch(err => {
    //             console.log("error in axios call>>", err.response)
    //             this.setState({
    //                 isSubmitting: false
    //             })
    //         })
    // };
    // let url = BASE_URL + '/product?token=' + localStorage.getItem('token')
    //     httpClient.upload("POST", this.state.data)
    //         .then(response => {
    //             // notification.showInfo("Product added successfully");
    //             this.props.history.push('/view-products');
    //         })
    //         .catch(err => {
    //             // notification.handleError(err);
    //             this.setState({
    //                 isSubmitting: false
    //             })
    //         })
    
    update() {
        // let url = BASE_URL + 'product/' + this.state.data._id + '?token=' + localStorage.getItem('token');
        // httpClient.upload("PUT", url, this.state.data, this.uploadArray)
        axios.put
                (`http://localhost:2021/api/product/${this.state.data._id}`,
                 this.state.data,   {
                    headers: {
                        "content-Type": "application/json",
                        'Authorization': localStorage.getItem('token')
                    },
                    params: {},
                    responseType: "json"
                }
                )
            .then(response => {
                console.log("success in axios call>>", response);
                this.props.history.push("/View Product");
            })
            .catch(err => {
                console.log("error in axios call>>", err.response)
                this.setState({
                    isSubmitting: false
                })

            })

    
    }
    render() {
       
        let discountContent = this.state.data.discountedItem
            ?
            <>
                <label>Discount Type</label>
                <input className="form-control" type="text" value={this.state.data.discountType} placeholder="DiscountType" name="discountType" onChange={this.handleChange}></input>
                <label>Discount</label>
                <input className="form-control" type="text" value={this.state.data.discount} placeholder="Discount" name="discount" onChange={this.handleChange}></input>
            </>
            : "";

        let warrantyContent = this.state.data.warrantyItem
            ?
            <>
                <label>warrantyPeriod</label>
                <input className="form-control" type="text" value={this.state.data.warrantyPeriod} placeholder="WarrantyPeriod" name="warrantyPeriod" onChange={this.handleChange}></input>
            </>
            : "";
        let btn = this.state.isSubmitting
            ? <button disabled={true} className="btn btn-info">submitting</button>
            : <button disabled={!this.state.isValidForm} type="submit" className="btn btn-primary">submit</button>
        return (
            <>
                <h2>{this.title} </h2>
                <form className="form-group" onSubmit={this.handleSubmit}>

                    <label>Name</label>
                    <input className="form-control" type="text" value={this.state.data.name} placeholder="Name" name="name" onChange={this.handleChange}></input>
                    <label>Descrition </label>
                    <input className="form-control" type="text" value={this.state.data.description} placeholder="Description" name="description" onChange={this.handleChange}></input>
                    <label>Color</label>
                    <input className="form-control" type="text" value={this.state.data.color} placeholder="Color" name="color" onChange={this.handleChange}></input>
                    <label>Category</label>
                    <input className="form-control" type="text" value={this.state.data.category} placeholder="Category" name="category" onChange={this.handleChange}></input>
                    <p className="danger">{this.state.data.category}</p>
                    <label>Brand</label>
                    <input className="form-control" type="text" value={this.state.data.brand} placeholder="Brand" name="brand" onChange={this.handleChange}></input>
                    <label>Price</label>
                    <input className="form-control" type="number" value={this.state.data.price} placeholder="Price" name="price" onChange={this.handleChange}></input>
                    <label>Tags</label>
                    <input className="form-control" type="text" value={this.state.data.tags} placeholder="Tags" name="tags" onChange={this.handleChange}></input>
                    <label>Manu Date</label>
                    <input className="form-control" type="date" value={this.state.data.manuDate} placeholder="ManuDate" name="manuDate" onChange={this.handleChange}></input>
                    <label>Expiry Date</label>
                    <input className="form-control" type="date" value={this.state.data.expiryDate} placeholder="ExpiryDate" name="expirydate" onChange={this.handleChange}></input>
                    <input type="checkbox" name="discountedItem" checked={this.state.data.discountedItem} onChange={this.handleChange}></input>
                    <label>DiscountedItem</label><br></br>

                    {discountContent}
                    <input type="checkbox" name="warrantyItem" checked={this.state.data.warrantyItem} onChange={this.handleChange}></input>
                    <label>warrantyItem</label><br></br>
                    {warrantyContent}
                    <input type="file" className="form-control" name="image" onChange={this.handleChange}></input>
                    {btn}
                </form>


            </>
        )
    }
}
