import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiInbox,
} from "react-icons/fi";

import Filter from "./Filter";

import api from "../api";
import { error } from "../helpers/alert";
import { listItems, pageItems } from "../helpers/pagination";
import { Loading } from "./Loading";

interface Vehicle {
  id: string;
  placa: string;
  cidade: string;
  uf: string;
  km_atual: number;
  email_proprietario: string;
}

const Table = () => {
  let history = useHistory();
  const [data, setData] = useState<any>([]);
  const [filter, setFilter] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const LIMIT_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    allVehicles();
  }, []);

  function handleClick(type: string) {
    switch (type) {
      case "new":
        history.push("/veiculo");
        break;
      case "filter":
        openFilter();
    }
  }

  function openFilter() {
    setFilter((old) => !old);
  }

  function handleDelete(id: string) {
    error("Tem certeza que deseja deletar este registro ?", () =>
      api.delete(`/veiculos/${id}`).then((resp) => {
        allVehicles();
      })
    );
  }

  function allVehicles() {
    setIsLoading(true);
    api
      .get("/veiculos")
      .then((resp) => {
        setIsLoading(false);
        setData(resp.data);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }

  return (
    <div className="table-container">
      <div className="buttons-container">
        <button className="btn-add" onClick={() => handleClick("new")}>
          <FiPlus className="filter-icon" />
          <span>Novo Veículo</span>
        </button>
        <button className="btn-filter" onClick={() => handleClick("filter")}>
          <svg
            className="filter-icon"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path>
          </svg>
          <span>Filtrar</span>
        </button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th className="plate-w">Placa</th>
              <th className="city-w">Cidade</th>
              <th>KM atual</th>
              <th>E-mail Proprietário</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              listItems(data, currentPage, LIMIT_PER_PAGE).map(
                (vehicle: Vehicle, index: number) => (
                  <tr key={index}>
                    <td>{vehicle.placa}</td>
                    <td>{vehicle.cidade}</td>
                    <td>{vehicle.km_atual}</td>
                    <td>{vehicle.email_proprietario}</td>
                    <td>
                      <div className="actions-btn">
                        <Link to={`veiculo/${vehicle.id}`}>
                          <FiEdit2 className="edit-icon" />
                        </Link>

                        <FiTrash2
                          className="remove-icon"
                          onClick={() => handleDelete(vehicle.id)}
                        />
                      </div>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="no-register">
            <FiInbox className="icon-no-register" />
            <p>Nenhum registro adicionado</p>
          </div>
        )}

        {data.length > 0 && (
          <ul className="pagination">
            <FiChevronRight className="chevron-icon" />
            {pageItems(data, LIMIT_PER_PAGE).map((item, index) => {
              return (
                <li
                  key={index}
                  className="pagination-item"
                  onClick={() => setCurrentPage(index + 1)}
                  style={
                    currentPage === index + 1
                      ? { backgroundColor: "#f2a72d" }
                      : {}
                  }
                >
                  {item}
                </li>
              );
            })}
            <FiChevronLeft className="chevron-left chevron-icon" />
          </ul>
        )}
      </div>

      <Filter filter={filter} setFilter={setFilter} setData={setData} />

      <Loading isLoading={isLoading} />
    </div>
  );
};

export default Table;
