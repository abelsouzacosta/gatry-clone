import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PagesPromotionSearch from "./Promotion/Search/Search";

/**
 * Componente raiz da aplicação
 * Substitui o App.js
 */
const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <PagesPromotionSearch />
        </Route>
      </Switch>
    </Router>
  );
};

export default Root;
