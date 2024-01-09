import React,{useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import useFetch from "../../../hooks/useFetch";
import "./style.scss";
import Img from "../../../components/lazyLoadingImg/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [backGround,setBackground] = useState("");
  const [query,setQuery] = useState("");

  const navigate=useNavigate();
  const {url} = useSelector((state) => state.home);
  const {data,loading} = useFetch("/movie/upcoming")

  useEffect(()=>{
    const bg = url.backdrop+
    data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
    setBackground(bg);

  },[data]);

  const searchQueryHandler = (event) => {
    if(event.key==="Enter" && query.length > 0){
      navigate(`/search/${query}`)
    }  
  }

  const searchQueryClickHandler = (event) => {
    if( query.length > 0){
      navigate(`/search/${query}`)
    }  
  }

  return (
    <div className="herobanner">
      {!loading && <div className="backdrop-img">
        <Img src={backGround} />
      </div>}
      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="tittle">Welcome</span>
          <span className="sub-Tittle"> 
            Your One stop Destination for hundreds of Movies and TV shows
          </span>
          <div className="searchinput">
            <input type="text"
              placeholder="Search for a Movie and TV Shows"
              onChange={((e) => setQuery(e.target.value))}
              onKeyUp={searchQueryHandler} >
            </input>
            <button onClick={searchQueryClickHandler} >Search</button>
          </div>
        </div>
      </ContentWrapper>
  </div>
  )   
}

export default HeroBanner ;