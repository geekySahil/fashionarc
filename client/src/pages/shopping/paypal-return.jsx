import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { capturePayment, getAllShoppingOrders } from "@/store/order-slice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"

function PaypalReturn() {

    const location = useLocation()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)

    const orderId = sessionStorage.getItem('confirmOrderId')
    const params = new URLSearchParams(location.search)

    const payerId = params.get('PayerID')
    const paymentId = params.get('paymentId')


    useEffect(() => {
        if(paymentId && payerId){
            dispatch(capturePayment({paymentId, payerId, orderId})).then((data) => {
                console.log(data, 'data  .....')
                if(data?.payload.success){
                    sessionStorage.removeItem('confirmOrderId')
                    window.location.href = 'payment-success'
                    dispatch(getAllShoppingOrders(user.id))
                }
            })
        }
    }, [payerId, paymentId, dispatch])


    
    
    return (
    <Card>
        <CardHeader>
            <CardTitle>Payment in Process Please wait...</CardTitle>
        </CardHeader>
    </Card>
  )
}

export default PaypalReturn