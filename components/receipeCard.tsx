import { useAppContext } from "@/context";
import { setLSData } from "@/utils/localStorage";
import Image from "next/image";

export const ReceipeCard = ({ item, index }: any) => {
    const { data: { userInfo: { userId, favorites }, receipeList, userList }, setData }: any = useAppContext();
    const { title, duration, imageUrl } = item;

    const handleFavorites = (key: number) => {
        let getRecipe = receipeList.filter((x: any, index: number) => key === index ? x : '')
        let getUser = userList.filter((x: any) => x.userId === userId ? x : '');

        if (getUser[0].favorites.includes(getRecipe[0].recipeId)) {
            getUser[0].favorites.pop(getRecipe[0].recipeId);
        } else {
            getUser[0].favorites.push(getRecipe[0].recipeId)
        }

        setLSData("data", { userList, receipeList })
        setLSData("userInfo", getUser[0])
        setData({ userInfo: getUser[0] })
    }

    return (
        <div className="slider">
            <Image src={imageUrl} width="100" height="100" alt="test" />
            <div className="slider-caption d-flex justify-btn align-center">
                <div className="slider-content">
                    <p>{title}</p>
                    <p className="duration">{duration}</p>
                </div>
                <button className={favorites.includes(item.recipeId) ? "active" : ''} type="button" onClick={() => handleFavorites(index)}>
                    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.1 15.55L10 15.65L9.89 15.55C5.14 11.24 2 8.39 2 5.5C2 3.5 3.5 2 5.5 2C7.04 2 8.54 3 9.07 4.36H10.93C11.46 3 12.96 2 14.5 2C16.5 2 18 3.5 18 5.5C18 8.39 14.86 11.24 10.1 15.55ZM14.5 0C12.76 0 11.09 0.81 10 2.08C8.91 0.81 7.24 0 5.5 0C2.42 0 0 2.41 0 5.5C0 9.27 3.4 12.36 8.55 17.03L10 18.35L11.45 17.03C16.6 12.36 20 9.27 20 5.5C20 2.41 17.58 0 14.5 0Z" fill="#FB9127" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
