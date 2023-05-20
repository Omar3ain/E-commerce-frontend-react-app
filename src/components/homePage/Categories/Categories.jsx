import './Categories.css';
import { getCategories  } from "../../../features/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../layout/loader/Loader';

function Categories() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getCategories())        
    },[]);

    const handleCategoryClick = (categoryId) => {
        navigate(`/products/${categoryId}`);
    };
    const images =  ['https://i.ibb.co/s2nghrT/ad-operations-process-strategy-activation.png','https://i.ibb.co/ZWp3Yts/ad-operations-process-strategy.png']
    const { categories , isLoading} = useSelector((state) => state.category);
    const shuffledCategories = [...categories].sort(() => Math.random() - 0.5).slice(0, 5);
    return (
    <>
        <div className="traineeship">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <div className="titlepage">
                    <h2>Featured Categories</h2>
        </div>
        </div>
        <div className="process-row">
        {isLoading ? (
            <Loader/>
            ) : shuffledCategories.length > 0 ? (
            shuffledCategories.map((category, index) => (
                    
                    <div className={`activity animate-from-bottom__${index}`} key={category.id}
                    onClick={() => handleCategoryClick(category.id)}>
                    <div className="relative-block">
                        {/* <div className="activity-icon">
                        <img alt="An image" src={images[Math.floor(Math.random() * 2)]}/>
                        </div> */}
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
        </div>
        </div>
    </>
    );
}

export default Categories
