import React, { useEffect, useState } from "react";

// estilos
import "./Search.css";

// componentes
import PromotionCard from "components/Promotion/Card/Card";

import axios from "axios";

const PagesPromotionSearch = () => {
  const [promotionList, setPromotionList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/promotions?_embed=comments")
      .then((response) => setPromotionList(response.data));
  }, []);

  const promotionApiReturnResponse = {
    id: 1,
    title:
      "Kit Notebook Acer Aspire 3 + Mochila Green, A315-41-R790, AMD Ryzen 3 2200U Dual Core",
    price: 1799,
    imageUrl:
      "https://cdn.gatry.com/gatry-static/promocao/imagem_url/2631517face1861bc4f46ae154d387de.png",
    url: "https://www.amazon.com.br/Notebook-Acer-Mochila-A315-41-R790-Mem%C3%B3ria/dp/B07YDWLV7S/ref=as_li_ss_tl?ie=UTF8&linkCode=sl1&tag=gatry0b-20&linkId=e4a1146599e36741a720a6a952cbc328&language=pt_BR",
    comments: [
      {
        id: 1,
        comment: "TELA HD",
      },
    ],
  };

  return (
    <div className="main">
      <PromotionCard promotionApiResponse={promotionApiReturnResponse} />
      {promotionList.length > 0 &&
        promotionList.map((promotionApiReturnResponse) => {
          return (
            <PromotionCard promotionApiResponse={promotionApiReturnResponse} />
          );
        })}
    </div>
  );
};

export default PagesPromotionSearch;
