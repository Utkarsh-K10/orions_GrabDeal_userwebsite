import React from 'react'
import { Link } from 'react-router-dom';

function Successorder() {
    return (
			<div>
				<div className='loginSuccesPage'>
					<div className='userLoginSuccess-container'>
						<h1 className='LoginSuccessHd'>Thank You ! <br /> For Placing The order</h1>
						<div>
							<Link to='/home'>
								<button>Go to Home</button>
							</Link>
							<Link to='/'>
								<button>Order Summary</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
}

export default Successorder
