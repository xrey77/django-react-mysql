import React from "react";

export default function Home() {
    return(
    <>
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
    <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div className="carousel-inner">
        <div className="carousel-item active">
        <img src="http://127.0.0.1:8000/assets/images/prod1.png" className="d-block w-100" alt="..."/>
        </div>
        <div className="carousel-item">
        <img src="http://127.0.0.1:8000/assets/images/prod2.png" className="d-block w-100" alt="..."/>
        </div>
        <div className="carousel-item">
        <img src="http://127.0.0.1:8000/assets/images/prod3.png" className="d-block w-100" alt="..."/>
        </div>
    </div>
    {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
    </button> */}
    </div>

    <div className="card mt-4 mb-4 mr-4 ml-4">
        <div className="card-header">
            <h3>Featured</h3>
        </div>
        <div className="card-body">
            <h5 className="card-title">Doha Bank is one of the largest commercial banks in the State of Qatar.
</h5>
            <p className="card-text">
            Inaugurated in 1979, Doha Bank provides domestic and international banking services for individuals, commercial, corporate and institutional clients through four business groups – Wholesale Banking, Retail Banking, International Banking and Treasury & Investments.<br/><br/>

Doha Bank has established overseas branches in Kuwait, United Arab Emirates, and India as well as representative offices in Japan, China, Singapore, South Africa, South Korea, Australia, Turkey, United Kingdom, Canada, Germany, Bangladesh, Sri Lanka and Nepal.<br/><br/>

Doha Bank, during 2022, has received numerous awards in recognition of its achievements. Doha Bank was adjudged as the ‘Best Digital Wallet APP in Qatar’ by Global Business Review Magazine, ‘Most Innovative Banking Brand Qatar’ and ‘Best Bank for Credit Card Qatar’ by Global Brand Awards, and ‘Most Socially Responsible Commercial Bank Qatar’ by World Business Outlook Awards, to name a few.<br/><br/>

In recognition of being one of the most active advocates of Corporate Social Responsibility (CSR) through initiatives such as ‘ECO-School Programme’, ‘Al Dana Green Run’, Beach Cleaning, Tree Planting etc., Doha Bank has won the ‘Best C S R Bank Qatar’ and ‘Best CSR Practices in Banking Sector Qatar’ by Global Brand Awards and World Business Outlook Awards, respectively.
                </p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
    </div>


    <div className="card-group">
    <div className="card">
        <img src="http://127.0.0.1:8000/assets/images/doha1.jpeg" className="card-img-top" alt="..."/>
        <div className="card-body">
        <h5 className="card-title">D-Ring Branch</h5>
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
        <div className="card-footer">
        <small className="text-muted">Last updated 3 mins ago</small>
        </div>
    </div>
    <div className="card">
        <img src="http://127.0.0.1:8000/assets/images/doha2.jpeg" className="card-img-top" alt="..."/>
        <div className="card-body">
        <h5 className="card-title">Corniche Branch</h5>
        <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
        </div>
        <div className="card-footer">
        <small className="text-muted">Last updated 3 mins ago</small>
        </div>
    </div>
    <div className="card">
        <img src="http://127.0.0.1:8000/assets/images/doha3.jpeg" className="card-img-top" alt="..."/>
        <div className="card-body">
        <h5 className="card-title">Doha Bank Owners</h5>
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
        </div>
        <div className="card-footer">
        <small className="text-muted">Last updated 3 mins ago</small>
        </div>
    </div>
    </div>
    </>
    );
}