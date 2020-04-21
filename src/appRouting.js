import React from "react";
import { BrowserRouter as Router, Route,Switch,Redirect} from "react-router-dom";
import { LoginComponent } from "./component/auth /login/login.component";
import { RegisterComponent } from "./component/auth /register/register.components";
import { Header } from "./component/common/header/header.component";
import { notFound } from "./component/common/pag/notfound/notfound";
import { DashbardComponent } from "./component/user/dashBoard/dashboard";
import { Sidebar} from "./component/common/sidebar/sidebar";
import AddProductForm from "./component/product/ProductForm/add.productForm";
// import SearchProductForm from "./component/product/productForm/edit.productForm";
// import EditProductForm from "./component/product/edit-product/edit.productForm";
import viewProductComponent from "./component/product/view-product/viewProduct";
import EditProductComponents from "./component/product/edit-product/edit.productForm";

const About=()=>{
    return<p>about Component</p>
}

const Contact=()=>{
    return<p>contact Component</p>
}
const Home=()=>{
    return<p>home Component</p>
}
const ProtectedRoute = ({ component: Component, ...props }) => (
    <Route {...props} render={(props) => (
        localStorage.getItem('token')
            ? <>
                <div className="nav_bar">
                    <Header isLoggedIn={true}></Header>
                </div>
                <div className="sidenav">
                    <Sidebar></Sidebar>
                </div>
                <div className="main">
                    <Component {...props}></Component>
                </div>
            </>
            : <Redirect to="/"></Redirect> 
    )}></Route>
)
const PublicRoute = ({ component: Component, ...props }) => (
    <Route {...props} render={(props) => (
        <>
          <div className="main">
                <Component {...props}></Component>
            </div>
            <div className="nav_bar">
                <Header isLoggedIn={localStorage.getItem('token')}></Header>
            </div>
           
        </>
    )}></Route>
)


const AppRoutes=()=>{
    return(
        <Router>
            
            {/* <Header isLoggedIn={localStorage.getItem("token") ? true :false}></Header>
            <Sidebar></Sidebar> */}
            <div className="main">
            <Switch>
            <PublicRoute exact path="/" component={LoginComponent}></PublicRoute>
            <PublicRoute path="/register" component={RegisterComponent}></PublicRoute>
            <PublicRoute path="/home" component={Home}></PublicRoute>
            <PublicRoute path="/about" component={About}></PublicRoute>
            <PublicRoute path="/contact" component={Contact}></PublicRoute>
            <ProtectedRoute path="/Add Product" component={AddProductForm}></ProtectedRoute>
            <ProtectedRoute path="/View Product" component={viewProductComponent}></ProtectedRoute>
            <ProtectedRoute path="/Edit Product/:id" component={EditProductComponents}></ProtectedRoute>
              <ProtectedRoute path="/dashboard" component={DashbardComponent}></ProtectedRoute>
            <PublicRoute component={notFound}></PublicRoute>   
            </Switch>
            </div>
          
          
        </Router>
    )

}
export default AppRoutes;