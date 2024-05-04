import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PropertyDetail = () => {
  const { itemId } = useParams();
  const [itemDetails, setItemDetails] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/property/${itemId}`)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.data) setItemDetails(responseData.data);
        else return navigate("/not-found");
      });
  }, []);

  if (itemDetails == undefined) {
    return <p>loading</p>;
  }

  return (
    <div className="container-full-height">
        <div className="item-detail">
            <div className="item-detail-imgs">

                { itemDetails?.imgList?.length == 0 
                    ? <p className="item-detail-no-imgs">No Image Available</p>
                    : itemDetails?.imgList?.map(imgUrl => <img src={imgUrl} />)}
            </div>
            <div className="item-detail-body">
                <div className="item-detail-basic">
                    <div className="item-detail-price">₹{itemDetails.price.toLocaleString()}</div>
                    <div className="item-detail-title">{itemDetails.title}</div>
                    <div className="item-detail-row-space-between">
                        <p>{itemDetails.location}</p>
                        <p>{itemDetails.updatedAt.toLocaleString()}</p>
                    </div>
                </div>
                <div className="item-detail-basic">
                    <p className="item-detail-author">{itemDetails.author.name}</p>
                </div>
                <div className="item-detail-basic item-detail-desc">
                    {itemDetails.description.split('\n').map( (line, idx) => <p key={idx}>{line}</p> )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default PropertyDetail;
