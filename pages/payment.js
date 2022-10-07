import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

export default function PaymentScreen() {
    const [selectedPaymentDetails, setSelectedPaymentDetails] = useState('');

    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress, paymentDetails } = cart;

    const router = useRouter();

    const submitHandler = (e) => {
        e.preventDefault();
        if (!selectedPaymentDetails) {
            return toast.error('Payment method is required');
        }
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentDetails });
        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                paymentDetails: selectedPaymentDetails,
            })
        );

        router.push('/placeorder');
    };
    useEffect(() => {
        if (!shippingAddress.address) {
            return router.push('/shipping');
        }
        setSelectedPaymentDetails(paymentDetails || '');
    }, [paymentDetails, router, shippingAddress.address]);

    return (
        <Layout title="Payment Method">
            <CheckoutWizard activeStep={2} />
            <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
                <h1 className="mb-4 text-xl">Payment Details</h1>
                {['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
                    <div key={payment} className="mb-4">
                        <input
                            name="paymentMethod"
                            className="p-2 outline-none focus:ring-0"
                            id={payment}
                            type="radio"
                            checked={selectedPaymentDetails === payment}
                            onChange={() => setSelectedPaymentDetails(payment)}
                        />

                        <label className="p-2" htmlFor={payment}>
                            {payment}
                        </label>
                    </div>
                ))}
                <div className="mb-4 flex justify-between">
                    <button
                        onClick={() => router.push('/shipping')}
                        type="button"
                        className="default-button bg-blue-200 hover:bg-blue-400"
                    >
                        Back
                    </button>
                    <button className="primary-button hover:bg-amber-400">Next</button>
                </div>
            </form>
        </Layout>
    );
}