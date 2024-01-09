import React  from 'react';
import "./style.scss";
import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import useFetch from "../../hooks/useFetch";
import VideoSection from "./videoSection/VideoSection";
import Similiar from "./carousel/Similiar";
import Recommended from "./carousel/Recommended";

const Details = () => {
  const {mediaType, id} = useParams();
  const {data, loading} = useFetch(`/${mediaType}/${id}/videos`)
  const {data:credits,loading:creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)

  return (
    <div>
      <DetailsBanner video={data?.results[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideoSection data={data} loading={loading} />
      <Similiar mediaType={mediaType} id={id}/>
      <Recommended mediaType={mediaType} id={id} />
    </div>
  )
  }
  export default Details;