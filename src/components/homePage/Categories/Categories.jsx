import './Categories.css';
import { getCategories  } from "../../../features/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
function Categories() {
  const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getCategories())        
    },[]);
    const images =  ['https://i.ibb.co/s2nghrT/ad-operations-process-strategy-activation.png','https://i.ibb.co/ZWp3Yts/ad-operations-process-strategy.png']
    const { categories , isLoading} = useSelector((state) => state.category);
    const shuffledCategories = [...categories].sort(() => Math.random() - 0.5);
    console.log(Math.floor(Math.random * 1));
    return (
    <>
        <div className="traineeship">
        <h1>Categories</h1>
        <div className="process-row">
            {shuffledCategories.length > 0 ? (
            shuffledCategories.map((category, index) => (
                <div className={`activity animate-from-bottom__${index}`} key={category.id}>
                <div className="relative-block">
                    <div className="activity-icon">
                    <img alt="An image" src={images[Math.floor(Math.random() * 2)]}/>
                    </div>
                    <div className="inactive">
                    <div className="title">{category.name}</div>
                    </div>
                    <div className="active">
                    <div className="title">{category.name}</div>
                    <div className="sub-title">{category.description}</div>
                    </div>
                </div>
                </div>
            ))
            ) : (
            <div className='no-category'>No categories to display.</div>
            )}
        </div>
        </div>
    </>
    );
}

export default Categories