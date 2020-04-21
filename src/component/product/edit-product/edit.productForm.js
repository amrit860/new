import React, { Component } from 'react';
import AddProductForm from "./../ProductForm/add.productForm";
import axios from "axios";
import { Loader } from '../../common/loader/loader.component';


export default class EditProductComponents extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            product: ''
        };
    }
    componentDidMount() {
        this.productId = this.props.match.params["id"];
        this.setState({
            isLoading: true
        })
        axios.get
            (`http://localhost:2021/api/product/${this.productId}`,
                {
                    headers: {
                        "content-Type": "application/json",
                        'Authorization': localStorage.getItem('token')

                    },
                    params: {},
                    responseType: "json"
                }
            )

            .then(response => {
                const data = response.data[0]
                if (typeof data.discount === 'object') {
                    data.discountedItem = data.discount.discountedItem;

                    data.discountType = data.discount.discountType
                        ? data.discount.discountType
                        : '';
                    data.discount = data.discount.discount
                        ? data.discount.discount
                        : '';
                }
                if (typeof data.warranty === 'object') {
                    data.warrantyItem = data.warranty.warrantyItem;
                    data.warrantyPeriod = data.warranty.warrantyPeriod;
                    data.warranty = undefined;
                }
                this.setState({
                    product: data
                })
            })
            // .then(response => {
            //     console.log("editproduct>>",response);
            //     this.setState({
            //         product:response.data
            //     })

            //   })
            .catch(err => {
                console.log("edit error>>", err);
                console.log("error >>", err);

            })
            .finally(() => {
                this.setState({
                    isLoading: false
                })
            })


    }



    render() {
        let content = this.state.isLoading
            ? <Loader></Loader>
            : <AddProductForm title="Edit Product" productData={this.state.product}></AddProductForm>

        return (
            <>
                {content}


            </>
        )
    }
}
