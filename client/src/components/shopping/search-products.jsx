import { useEffect } from "react"
import { Input } from "../ui/input"
import { useDispatch, useSelector } from "react-redux"
import { searchProducts } from "@/store/search-slice"

function SearchProductsInput({search, setSearch}) {

    const dispatch = useDispatch()

    useEffect(() => {
        if(search.length > 2) dispatch(searchProducts(search))
        else dispatch(searchProducts())
    }, [search])


  return (
    <div className="m-6">
        <Input
        placeholder='Searh for Products'
        value={search}
        onChange = {(e) => setSearch(e.target.value)}
        />
    </div>
  )
}

export default SearchProductsInput