import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from 'jquery';

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
})

export default function SelfService() {
    const [msg, setMsg]= useState(null);
    const [products, setProducts] = useState([]);
    const [totpage, setTotpage] = useState(null);
    const [pg, setPg] = useState(1);

    const fetchProducts = async (pg: any) => {
        await api.get(`/api/getallproducts?page=${pg}`)
            .then(res => {
                console.log(res);
                setProducts(res.data.products)
                setTotpage(res.data.totpages)
            }, (error) => {
               setMsg(error.message);
            });                

    }    

    useEffect(() => {
        fetchProducts(pg);
    },[]);

    const Next = async (e: any) => {
        e.preventDefault();
        if (pg === totpage) {
            return;
        }
        if (pg != totpage) {
            setPg(pg+1)
            await fetchProducts(pg+1);    
            return;
        } 
    }

    const Previous = async (e: any) => {
        e.preventDefault();
        if (pg === 1) {
            return;
        }
        if (pg != 0) {
            $("#next").removeClass("disabled");
            setPg(pg-1)
            await fetchProducts(pg-1);
            return 
        }
    }

    const First = async (e: any) => {
        e.preventDefault();
        await fetchProducts(1);
        return;
    }

    const Last = async (e: any) => {
        e.preventDefault();
        await fetchProducts(totpage);
        return;
    }

    return (
        <div className="container mt-4">
            {
                msg !== null ?
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Message !</strong> {msg}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>    
                : null                
            }

            <h5 className="text-center">Product List</h5>
            <table className="table table-striped table-hover">
            <thead className="table-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Descriptions</th>
                <th scope="col">OnHand</th>
                <th scope="col">Unit</th>
                </tr>
            </thead>
            <tbody>
            {products.map((prods) => {

                            return ( 
                                <tr>
                                <td>{prods['id']}</td>
                                <td>{prods['descriptions']}</td>
                                <td>{prods['qty']}</td>
                                <td>{prods['unit']}</td>
                                </tr>                
                             );
                        })}
            </tbody> 
            </table>             

            <nav aria-label="Page navigation example">
                <ul className="pagination pagination-sm justify-content-start">
                    <li className="page-item">
                    <a href="#" onClick={First} className="page-link">First</a>
                    </li>    
                    <li id="prev" className="page-item">
                    <a href="#" onClick={Previous} className="page-link text-success">Previous</a>
                    </li>
                    <li id="next" className="page-item">
                    <a onClick={Next} className="page-link text-success" href="#">Next</a>
                    </li>
                    <li className="page-item">
                    <a onClick={Last} className="page-link" href="#">Last</a>
                    </li>
                    <li className="page-item">
                        <div className="page-link text-danger">Page&nbsp;{pg}&nbsp;of&nbsp;{totpage}</div>
                    </li>
                </ul>
            </nav>
        </div>        
    )
}