import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import "./compare.css";
import TopNavbar from "../Shared/Navbars/TopNavbar/TopNavbar";
import CategoryNavbar from "../Shared/Navbars/CategoryNavbar/CategoryNavbar";
import ServiceNavbar from "../Shared/Navbars/ServiceNavbar/ServiceNavbar";
import Footer from "../Shared/Footer/Footer";
import loaderImg from "./../Shared/Navbars/TopNavbar/Assets/Logo-materialBuy.png";

function Compare() {
	const [product1, setProduct1] = useState({});
	const [product2, setProduct2] = useState({});
	const [loading, setLoading] = useState(true);
	const history = useHistory();
	const { id1, id2 } = useParams();
	//code By Rohit - 20 july 2021
	const fetchData = async () => {
		axios //Load both products data using product API
			.all([
				axios.get(process.env.REACT_APP_PRODUCT_SINGLE + `${id1}`),
				axios.get(process.env.REACT_APP_PRODUCT_SINGLE + `${id2}`),
			])
			.then(
				axios.spread(async (data1, data2) => {
					// output of request
					console.log("data1", data1, "data2", data2);
					await setProduct1(data1.data);
					await setProduct2(data2.data);

					setLoading(false);
				})
			);
	};
	useEffect(() => {
		fetchData();
	}, []);

	const [table1Features, settable1Features] = useState([
		"table1 Data",
		"table1 Data",
		"table1 Data",
		"table1 Data",
		"table1 Data",
	]);
	const [table2Features, settable2Features] = useState([
		"table2 Data",
		"table2 Data",
		"table2 Data",
		"table2 Data",
	]);

	const TableData = () => {
		return table1Features.map((feature) => {
			let index = table1Features.indexOf(feature);
			return (
				<tr>
					<th scope='row' className='align-middle'>
						Feature
					</th>
					<td className='align-middle'>{table1Features[index]}</td>
					<td className='align-middle'>{table2Features[index]}</td>
				</tr>
			);
		});
	};

	const page = () => {
		return (
			<div>
				<TopNavbar />
				<CategoryNavbar />
				<ServiceNavbar />
				<div className='SingleProductPage'>
					<div
						className='container mt-5 mb-5 '
						style={{ backgroundColor: "white", padding: "10px" }}
					>
						<div className='table-responsive'>
							<table className='table text-center img-table'>
								<thead>
									<tr>
										<th scope='col'></th>
										<th scope='col'>
											<div className='d-flex justify-content-center'>
												<div>
													<img
														className='img-fluid card-img'
														src={process.env.REACT_APP_IMAGE_API + product1.gridimages[0]}
														alt='Go Back to Compare Different product'
													></img>
												</div>
												<div>
													{/* !TODO : Implement remove product on button click */}
													<i className='fas fa-times-circle'></i>
												</div>
											</div>
										</th>
										<th scope='col'>
											<div className='d-flex justify-content-center'>
												<div>
													<img
														className='img-fluid card-img'
														src={process.env.REACT_APP_IMAGE_API + product2.gridimages[0]}
														alt='Go Back to Compare Different product'
													></img>
												</div>
												<div>
													<i className='fas fa-times-circle'></i>
												</div>
											</div>
										</th>
									</tr>
								</thead>
							</table>
						</div>
						<div className='table-responsive'>
							<table className='table table-striped table-hover table-bordered text-center'>
								<thead>
									<tr>
										<th scope='row'></th>
										<th>{product1.product_name}</th>
										<th>{product2.product_name}</th>
									</tr>
								</thead>
								<tbody className=''>{TableData()}</tbody>
							</table>
						</div>
						<div className='d-flex mt-5 mb-4 ComparePgBtn'>
							<button
								className='buybtn ml-auto'
								onClick={() => {
									history.goBack();
								}}
							>
								GO BACK
							</button>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	};
	const loader = () => {
		return (
			<div className='text-center align-middle d-flex justify-content-center mt-5'>
				<img className='loader' src={loaderImg} alt='not found'></img>
			</div>
		);
	};

	return <>{loading ? loader() : page()}</>;
}

export default Compare;
