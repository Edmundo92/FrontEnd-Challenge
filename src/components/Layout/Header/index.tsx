import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li className="">
            <NavLink to="/veiculos" activeClassName="active">
              Listagem
            </NavLink>
          </li>
          <li>
            <NavLink to="/veiculo">Cadastro</NavLink>
          </li>
          <li>
            <span className="menu">
              <svg
                className="icon-menu"
                focusable="false"
                viewBox="0 0 24 24"
                color="#5063F0"
                aria-hidden="true"
              >
                <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path>
              </svg>
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
