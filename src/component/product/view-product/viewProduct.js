import React, { Component } from 'react';
import axios from 'axios';
import utils from "./../../../utils/moment";
import { Loader } from '../../common/loader/loader.component';

export default class viewProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            isLoading:false
        }
    }

    componentDidMount() {
       this.setState({
        isLoading:true
       })
        axios.get("http://localhost:2021/api/product", {
            headers: {
                "content-Type": "application/json",
                "authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                this.setState({
                    product: response.data

                })

            })
            .catch(err => {

            })
            .finally(()=>{
                this.setState({
                    isLoading:false
                   })
            })
    }
    editProduct = (id) => {
this.props.history.push(`/Edit Product/${id}`);
    }
    deleteProduct = (id, index) => {
        console.log("id>>", id + "index>>" + index);
        // eslint-disable-next-line no-restricted-globals
        let confirmation = confirm("Are you sure want to delete?")
        if (confirmation) {
            axios.delete(`http://localhost:2021/api/product/${id}`, {
                headers: {
                    "content-Type": "application/json",
                    "authorization": localStorage.getItem("token")


                }
            })
                .then((response) => {
                    const {product}=this.state;
                    product.splice(index,1);
                    this.setState({
                        product
                    })


                })
                .catch((err) => {


                })

        }






    }



    render() {
        let tableContent = (this.state.product || []).map((item, index) => (
            <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{utils.formatDate(item.createdAt)}</td>
                <td>{utils.formatTime(item.createdAt)}</td>

                <td>
                    <button onClick={() => this.editProduct(item._id)} className="btn btn-info">edit</button>
                    <button onClick={() => this.deleteProduct(item._id, index)} className="btn btn-danger">delete</button>
                </td>
            </tr>
        ));
        let mainContent =this.state.isLoading
        ?<Loader></Loader>
        :   <table className="table table-bordered">
        <thead>
            <tr>
                <th>S.N</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Created Date</th>
                <th>Created Time</th>

                <th>action</th>
            </tr>
        </thead>
        <tbody>
            {tableContent}
        </tbody>

    </table>
        return (
            <>
                <h2>View Product</h2>
             {mainContent}
            </>
        )
    }
}
