import React from "react";

import PromotionForm from "components/Promotion/Form/Form";
import UIContainer from "components/UI/Container/Container";

import { useParams } from "react-router-dom";

const PagesPromotionForm = () => {
  // id é retornado como String -> conversão para number Number.parseInt(id, 10)
  const { id } = useParams();

  return (
    <UIContainer>
      <PromotionForm id={id ? Number.parseInt(id, 10) : null} />
    </UIContainer>
  );
};

export default PagesPromotionForm;
