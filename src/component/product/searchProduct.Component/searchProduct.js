import React, { Component } from 'react';
import ViewProductComponent from '../view-product/viewProduct';
import { httpClient } from '../../../utils/httpclient';

const defaultForm = {
    category: '',
    name: '',
    minPrice: '',
    maxPrice: '',
    fromDate: '',
    toDate: '',
    brand: '',
    tags: ''
}
export default class SearchProduct extends Component {
    constructor() {
        super()
        this.state = {
            data: { ...defaultForm },
            error: { ...defaultForm },
            isSubmitting: false,
            isLoading: false,
            categories: [],
            allProducts: [],
            namesArray: [],
            searchResult: []
        }
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        })
        httpClient.post("/product/search", {}, {})
            .then(response => {
                console.log('response is>>', response);
                let categories = []
                response.data.forEach((item) => {
                    if (categories.indexOf(item.category) === -1) {
                        categories.push(item.category);
                    }

                });
                this.setState({
                    categories,
                    allProducts: response.data
                })
            })
            .catch(err => {
                console.log('err>>', err);
            })
            .finally({
                isLoading: false
            })

    }
    handleChange = (e) => {
        let { name, type, value,checked} = e.target;
        if (name === 'category') {
            this.filterNames(value);
        }
        if(type==='checkbox'){
                value= checked
        }
        this.setState((pre) => ({
            data: {
                ...pre.data,
                [name]: value
            }
        }))
    }
    filterNames(category) {
        let names = this.state.allProducts.filter(item => item.category === category)
        this.setState({
            namesArray: names
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.search(this.state.data);
    }
    search(data) {
        if (!data.toDate) {
            data.toDate = data.fromDate
        }
        this.setState({
            isSubmitting: true
        })
        console.log('data is', data);
        httpClient.post("/product/search", data)

            .then(response => {
              
                this.setState({
                    searchResult: response.data
                })
            })
            .catch(err => {

            })
            .finally(() => {
                this.setState({
                    isSubmitting: false
                })
            })
    }
    render() {
        let btn = this.state.isSubmitting
            ? <button className='btn btn-info' disabled={true}>submitting....</button>
            : <button className='btn btn-primary' type='submit'>submit</button>

        let categoryContent = this.state.categories.map((item, i) => (
            <option key={i} value={item}>{item} </option>
        ));

        let nameContent = this.state.namesArray.map(item => (
            <option key={item._id} value={item.name}>{item.name}</option>
        ));

        let toDate = this.state.data.multipleDateRange
            ? <>
                <label>To Date</label>

                <input type='date' name='toDate' className='form-control' onChange={this.handleChange}></input>
            </>
            : '';



        let mainContent = this.state.searchResult.length
            ? <ViewProductComponent productData={this.state.searchResult}></ViewProductComponent>
            : <>
                <h2>Search Product</h2>
                <form onSubmit={this.handleSubmit} className='form-group'>
                    <label>Category</label>
                    <select className='form-control' name='category' onChange={this.handleChange}>
                        <option disabled={true} Value="">(select Category)</option>

                        {categoryContent}
                    </select>
                    <br></br>
                    <label>Name</label>
                    <select name='name' className='form-control' onChange={this.handleChange}>
                        <option disabled={true}>(Select Name)</option>
                        {nameContent}
                    </select>
                   
                    <br></br>
                    <label>minPrice</label>

                    <input type='number' name='minPrice' className='form-control' placeholder='MinPrice' onChange={this.handleChange}></input>
                    <br></br>
                    <label>maxPrice</label>
                    <input type='number' name='maxPrice' className='form-control' placeholder='MaxPrice' onChange={this.handleChange}></input>
                    <br></br>
                    <label>tags</label>

                    <input type='text' name='tags' placeholder='Tags' className='form-control' onChange={this.handleChange}></input>
                    <br></br>
                    <label>Date</label>

                    <input type='date' name='fromDate' className='form-control' onChange={this.handleChange}></input>
                    <input type='checkbox' name='multipleDateRange' onChange={this.handleChange}></input>
                    <label >Multiple Date Range</label>
                    <br></br>
                    {toDate}

                    <br></br>

                    {btn}
                </form>
            </>
        return (
            mainContent
        );
    }
}

