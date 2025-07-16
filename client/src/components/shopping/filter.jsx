import { filterOptions } from "@/config/auth"
import { Checkbox } from "../ui/checkbox"
import { Separator } from "../ui/separator"

function ProductFilter({handleFilters, filters}) {


  return (
    <div className="">
      <div className="border-b p-4">
        <h3 className="font-extrabold text-xl">Filter Options</h3>
      </div>
      <div className="space-y-4 p-4">
        {
          Object.keys(filterOptions).map(keyItem => {
            return (
              <div key={keyItem} >
                <h3 className="font-bold text-lg mb-2">{keyItem}</h3>
                {
                  filterOptions[keyItem].map((item) => {
                    return (
                      <div className="gap-2 font-medium" key={item.id}>
                        <Checkbox 
                        checked = {
                          filters && 
                          Object.keys(filters).length > 0 &&
                          filters[keyItem] &&
                          filters[keyItem].indexOf(item.id) > -1 
                        } 
                        onCheckedChange={() => {
                          handleFilters(keyItem, item.id)
                        }
                       

                        } 
                        className = 'mr-1'
                        />
                        {item.label}
                      </div>
                    )
                  })
                }
                <Separator className="my-3"/>


              </div>

            )
          })
        }

      </div>

    </div>
  )
}

export default ProductFilter