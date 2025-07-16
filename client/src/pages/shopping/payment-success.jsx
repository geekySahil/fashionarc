import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useNavigate } from "react-router-dom"

function PaymentSuccessfull() {

  const navigate = useNavigate()
  return (
    <Card>
        <CardHeader>
            <CardTitle>
              <div className="flex items-center justify-center text-5xl">
                Payment Successfull ! 
                <div className="bg-green-500 ml-2 rounded-full m-2 p-1 text-white">
                <Check />
                </div>
              </div>
              
            </CardTitle>
           
        </CardHeader>
        <CardContent>
              <div className="flex justify-center">
                <Button 
                onClick = {() => {navigate('/shopping/account')}}
                variant = 'outline'
                >
                  See Your Orders
                </Button>
              </div>
        </CardContent>
    </Card>
  )
}

export default PaymentSuccessfull