import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    console.log(response.data.data)
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error")
    }
  }
  useEffect(() => {
    fetchOrders();
  },[])


  const statusHandler = async(event,orderId)=>{
    // console.log(event, orderId);
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if (response.data.success) {
      await fetchOrders();  //sau khi cap nhap lai thi hien len toan bo
    }

  }
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity

                    } else {
                      return item.name + " x " + item.quantity + ', '
                    }
                  })}
                </p>
                <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                <div className='order-item-address'>
                  <p>{order.address.street}</p>
                  <p>{order.address.city + ", " + order.address.country + ", " + order.address.state + ", " + order.address.zipcode}</p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>

              <p>Items:{order.items.length}</p>
              <p>$ {order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivery">Delivery</option>
              </select>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orders
