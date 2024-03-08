import React, { useState } from 'react';

function OrderForm() {
    const [formData, setFormData] = useState({
        key: '250a0f35334fe87656e381fec9ce2b08',
        country: 'UA',
        buyer_name: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };

        // Disable SSL certificate verification for this fetch request
        fetch('https://keennode.lp-crm.biz/api/addNewOrder.html', {
            ...requestOptions,
            // Temporary solution: disable SSL certificate verification
            agent: new window.Agent({ rejectUnauthorized: false })
        })
        .then(response => {
            if (response.ok) {
                console.log('Data sent successfully');
            } else {
                console.error('Failed to send data');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="buyer_name" placeholder="Your Name" value={formData.buyer_name} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Your Phone Number" value={formData.phone} onChange={handleChange} required />
            <button type="submit">Submit</button>
        </form>
    );
}

export default OrderForm;
