import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PagesPromotionSearch from "./Promotion/Search/Search";
import PagesPromotionForm from "./Promotion/Form/Form";

/**
 * Componente raiz da aplicação
 * Substitui o App.js
 */
const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create">
          <PagesPromotionForm />
        </Route>
        <Route path="/edit/:id">
          <PagesPromotionForm />
        </Route>
        <Route path="/">
          <PagesPromotionSearch />
        </Route>
      </Switch>
    </Router>
  );
};

export default Root;
