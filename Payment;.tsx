import React from 'react';

class CarRentalPayment extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
        // You can redirect to a 'Thank you' page or perform further actions
    }

    render() {
        return (
            <div>
                <h1>Payment Information</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="amount">Amount:</label><br />
                        <input type="number" id="amount" name="amount" min="0" step="0.01" required /><br /><br />
                    </div>
                    <div>
                        <label htmlFor="cardholder_name">Cardholder Name:</label><br />
                        <input type="text" id="cardholder_name" name="cardholder_name" required />    
                    </div>
                    <br />
                    <div>
                        <label htmlFor="card_number">Card Number:</label><br />
                        <input type="text" id="card_number" name="card_number" required />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="expiry_date">Expiry Date:</label><br />
                        <input type="text" id="expiry_date" name="expiry_date" placeholder="MM/YY" required />
                        <label htmlFor="cvv">CVV:</label>
                        <input type="text" id="cvv" name="cvv" maxLength="3" required />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="billing_address">Billing Address:</label><br />
                        <input type="email" name="billing_address" id="billing_address" />
                    </div>
                    <br />
                    <div>
                        <input type="submit" value="Make Payment" />
                    </div>
                </form>
            </div>
        );
    }
}

export default CarRentalPayment;
