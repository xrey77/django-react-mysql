import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
})

export default function AutomateTeller() {
    const [msg, setMsg]= useState(null);
    const [products, setProducts] = useState([]);
    const [totalpage, setTotalpage] = useState(0);
    const [page, setPage] = useState(1);

    const fetchProductdetails = async (page: any) => {
        await api.get(`/api/getallproducts?page=${page}`)
            .then(res => {
                setProducts(res.data.products)
                setTotalpage(res.data.totpages)
            }, (error) => {
               setMsg(error.message);
            });                
    }

    useEffect(() => {
        fetchProductdetails(page);
    },[]);

    const NextPage = async (e: any) => {
        e.preventDefault();
        if (page === totalpage) {
            return;
        }
        if (page != totalpage) {
            setPage(page+1)
            await fetchProductdetails(page+1);    
            return;
        } 
    }

    const PreviousPage = async (e: any) => {
        e.preventDefault();
        if (page === 1) {
            return;
        }
        if (page != 0) {
            setPage(page-1)
            return await fetchProductdetails(page-1);
        }
    }

    const FirstPage = async (e: any) => {
        e.preventDefault();
        setPage(1);
        await fetchProductdetails(1);
        return;
    }

    const LastPage = async (e: any) => {
        e.preventDefault();
        setPage(totalpage);
        await fetchProductdetails(totalpage);
        return;
    }

    return(
        <div className="container-fluid mt-4 mb-5">
            {
                msg !== null ?
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Message !</strong> {msg}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>    
                : null                
            }
            <div className="row">
                <div className="col">
                    <h4 style={{marginLeft: 20}}>Product Details</h4>
                </div>
                <div className="col">
                    <nav aria-label="Page navigation example">
                    <ul className="pagination pagination-sm justify-content-end">
                        <li className="page-item">
                        <a href="#" onClick={FirstPage} className="page-link">First</a>
                        </li>    
                        <li id="prev" className="page-item">
                        <a href="#" onClick={PreviousPage} className="page-link text-success">Previous</a>
                        </li>
                        <li id="next" className="page-item">
                        <a onClick={NextPage} className="page-link text-success" href="#">Next</a>
                        </li>
                        <li className="page-item">
                        <a onClick={LastPage} className="page-link" href="#">Last</a>
                        </li>
                        <li className="page-item">
                            <div className="page-link text-danger">Page&nbsp;{page}&nbsp;of&nbsp;{totalpage}</div>
                        </li>
                    </ul>
                    </nav>
                </div> 
            </div>
           <div className="card-group">

          {products.map((prods) => {
            return ( 
                <div className="sw">
                    <div className="card xcard">
                        <img src={prods['prod_pic']} className="card-img-top" alt="..."/>
                        <div className="card-body">
                        <h5 className="card-title">Details</h5>
                        <p className="card-text msg-fsize">{prods['descriptions']}</p>
                        <p className="card-text text-danger"><span className="text-dark">Price :</span>&nbsp;<span>&#8369;</span>{prods['sale_price']}</p>
                        </div>
                    </div>
                </div>
            );
          })}

          </div>

        <nav aria-label="Page navigation example">
         <ul className="pagination pagination-sm justify-content-start">
            <li className="page-item">
            <a href="#" onClick={FirstPage} className="page-link">First</a>
            </li>    
            <li id="prev" className="page-item">
            <a href="#" onClick={PreviousPage} className="page-link text-success">Previous</a>
            </li>
            <li id="next" className="page-item">
            <a onClick={NextPage} className="page-link text-success" href="#">Next</a>
            </li>
            <li className="page-item">
            <a onClick={LastPage} className="page-link" href="#">Last</a>
            </li>
            <li className="page-item">
                <div className="page-link text-danger">Page&nbsp;{page}&nbsp;of&nbsp;{totalpage}</div>
            </li>
         </ul>
        </nav>

        </div>
    );
}