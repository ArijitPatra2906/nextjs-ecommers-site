import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'
import { Store } from '../utils/Store'

export default function ShippingScreen() {
    const { handleSubmit, register, formState: { errors }, setValue, } = useForm()
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress } = cart;
    const router = useRouter()
    useEffect(() => {
        setValue('fullName', shippingAddress.fullName);
        setValue('address', shippingAddress.address);
        setValue('city', shippingAddress.city);
        setValue('pinCode', shippingAddress.pinCode);
        setValue('country', shippingAddress.country);
    }, [setValue, shippingAddress])
    const submitHandler = ({ fullName, address, city, pinCode, country }) => {
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { fullName, address, city, pinCode, country },
        });
        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                shippingAddress: {
                    fullName,
                    address,
                    city,
                    pinCode,
                    country,
                },
            })
        );

        router.push("/payment")
    }
    return (
        <Layout title="Shipping Address">
            <CheckoutWizard activeStep={1} />
            <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
                <h1 className='mb-4 text-xl'>Shipping Adress</h1>
                <div className='mb-4'>
                    <label htmlFor="fullName">Full Name</label>
                    <input className='w-full' id='fullName' autoFocus
                        {...register("fullName", {
                            required: "Please enter full name"
                        })}
                    />
                    {errors.fullName && (
                        <div className="text-red-500">
                            {errors.fullName.message}
                        </div>
                    )}
                </div>
                <div className='mb-4'>
                    <label htmlFor="address">Address</label>
                    <input className='w-full' id='address' autoFocus
                        {...register("address", {
                            required: "Please enter address",
                            minLength: { value: 3, message: "Address is more than 2 chars" }
                        })}
                    />
                    {errors.address && (
                        <div className="text-red-500">
                            {errors.address.message}
                        </div>
                    )}
                </div>
                <div className='mb-4'>
                    <label htmlFor="city">City</label>
                    <input className='w-full' id='city' autoFocus
                        {...register("city", {
                            required: "Please enter city",
                            minLength: { value: 3, message: "Address is more than 2 chars" }
                        })}
                    />
                    {errors.city && (
                        <div className="text-red-500">
                            {errors.city.message}
                        </div>
                    )}
                </div>
                <div className='mb-4'>
                    <label htmlFor="pinCode">Pin Code</label>
                    <input className='w-full' id='pinCode' autoFocus
                        {...register("pinCode", {
                            required: "Please enter pincode",
                            minLength: { value: 3, message: "Address is more than 2 chars" }
                        })}
                    />
                    {errors.pincode && (
                        <div className="text-red-500">
                            {errors.pincode.message}
                        </div>
                    )}
                </div>
                <div className='mb-4'>
                    <label htmlFor="country">Country</label>
                    <input className='w-full' id='country' autoFocus
                        {...register("country", {
                            required: "Please enter country",
                            minLength: { value: 3, message: "Address is more than 2 chars" }
                        })}
                    />
                    {errors.country && (
                        <div className="text-red-500">
                            {errors.country.message}
                        </div>
                    )}
                </div>
                <div className="mb-4" flex justify-between>
                    <button className='primary-button hover:bg-amber-500'>Next</button>
                </div>
            </form>
        </Layout>
    )
}

ShippingScreen.auth = true;