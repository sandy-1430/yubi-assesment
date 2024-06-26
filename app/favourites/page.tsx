'use client';
import { useAppContext } from "@/context";
import { useEffect, useState } from "react";
import { ReceipeSearch } from "@/components/receipeSearch";
import { ReceipeSlide } from "@/components/receipeSlide";
import { getLSData } from "@/utils/localStorage";
import { useRouter } from "next/navigation";


export default function Home() {
  const {data:{ userInfo: { favorites } ,receipeList }, setData }:any = useAppContext()  
  const router = useRouter();
  const [recipe, setRecipe] = useState<any>([])
  const [favList, setFavList] = useState<any>(false)
  const [search, setSearch] = useState<any>("")  

  useEffect(() => {
    let userInfo = getLSData("userInfo");
    if (!userInfo) {
        console.log(userInfo);
        setData({ loggedIn: false })
        router.push("/login")
    } else {
        setData({ loggedIn: true, userInfo: userInfo })
    }
}, [router, setData])

  useEffect(() => {
    let favArr = receipeList.filter((x:any) => favorites.includes(x.recipeId) ? x : '')
    setFavList(favArr)
    setRecipe(favArr)
  }, [favorites, receipeList])

  const handleSearch =(value:any) =>{
    setSearch(value)
    let searchArr = favList.filter((x:any) => x.title.toLowerCase().includes(value.toLowerCase()) ? x : '')
    setRecipe(searchArr)
  }  

  return (
    <div className="home">
      <div className="container">
        <div className="d-flex justify-btn flex-wrap home-content">
          <div className="main_content">
            <h2>Favourites</h2>
          </div>
        </div>
        <ReceipeSearch hideFav={true} search={search} handleSearch={handleSearch} />
        <div className="receipe_list">
          {recipe && <ReceipeSlide recipe={recipe} hideFav={true} />}
        </div>
      </div>
    </div>
  );
}
