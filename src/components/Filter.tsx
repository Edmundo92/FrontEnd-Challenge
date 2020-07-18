import React, { useState, useEffect } from "react";
import Select from "./Select";
import Input from "./Input";

import { FiMapPin, FiTriangle, FiTruck } from "react-icons/fi";

import { Formik } from "formik";
import * as Yup from "yup";

import { useTransition, animated } from "react-spring";
import { Transition } from "react-spring/renderprops";
import api from "../api";
import FieldGroup from "./FieldGroup";

const Filter = ({ filter, setFilter, setData }: any) => {
  const [toggle, setToggle] = useState({
    container: filter,
    content: filter,
  });

  useEffect(() => {
    setToggle((old) => ({
      container: filter,
      content: filter,
    }));
  }, [filter]);

  const transitions = useTransition(toggle, null, {
    from: { transform: "translate3d(0,-200px,0)" },
    enter: { transform: "translate3d(0,100px,0)" },
    leave: { transform: "translate3d(0,-40px,0)" },
  });

  const RegisterVehicleForm = {
    id: "",
    km_atual_gte: "",
    km_atual_lte: "",
    placa: "",
    email_proprietario: "",
    cidade: "",
  };

  function handleActionClose() {
    setToggle((old) => ({ container: false, content: false }));
    setFilter(!filter);
  }

  function handleResetForm(values: any, form: any) {
    handleActionClose();
  }

  function handleFilter(values: any) {
    const queryString = transformForQueryString(values);
    api.get(`/veiculos?${queryString}`).then((resp) => {
      handleActionClose();
      setData(resp.data);
    });
  }

  function transformForQueryString(obj: any) {
    let query = "";
    for (let key in obj) {
      if (obj[key]) {
        query += `${key}=${obj[key]}&`;
      }
    }

    query = query.substring(0, query.length - 1);
    return query;
  }

  return (
    <Transition
      items={toggle}
      from={{
        transform: "translate3d(0,-200px,0)",
        transition: "all 20ms ease-in-out",
      }}
      enter={{ transform: "translate3d(0,100px,0)" }}
      leave={{ transform: "translate3d(0,-1000px,0)" }}
    >
      {(toggle) => (props) => (
        <div
          className="filter-container"
          style={
            toggle.container
              ? { opacity: 1 }
              : {
                  opacity: 0,
                  transition: "all 2ms ease-in-out 200ms",
                  display: "none",
                }
          }
        >
          {toggle.content && (
            <div className="filter-content" style={props}>
              <header>
                <span className="close" onClick={handleActionClose}>
                  X
                </span>
                <span className="title-filter">Filtros</span>
              </header>
              <main>
                <Formik
                  onReset={handleResetForm}
                  initialValues={RegisterVehicleForm}
                  onSubmit={(values, actions) => {
                    handleFilter(values);
                  }}
                >
                  {({
                    values,
                    errors,
                    handleSubmit,
                    handleChange,
                  }: HTMLFormElement) => (
                    <form onSubmit={handleSubmit}>
                      <div className="form-container">
                        <Input
                          type="text"
                          label="Placa"
                          placeholder="Adicionar placa"
                          name="placa"
                          value={values.placa}
                          onChange={handleChange}
                          errors={errors}
                          icon={<FiTriangle />}
                        />
                        <Select
                          label="Cidade"
                          placeholder="Busque por cidade"
                          name="cidade"
                          value={values}
                          handleChange={handleChange}
                          errors={errors}
                          icon={<FiMapPin />}
                        />
                        <FieldGroup>
                          <Input
                            type="text"
                            label="KM atual - Ínicio"
                            placeholder="km inicial"
                            name="km_atual_gte"
                            value={values.km_atual_gte}
                            onChange={handleChange}
                            errors={errors}
                            icon={<FiTruck />}
                          />
                          <Input
                            type="text"
                            label="KM atual - Fim"
                            placeholder="km final"
                            name="km_atual_lte"
                            value={values.km_atual_lte}
                            onChange={handleChange}
                            errors={errors}
                            icon={<FiTruck />}
                          />
                        </FieldGroup>

                        <footer>
                          <button type="reset" className="button btn-inline">
                            Limpar filtros
                          </button>
                          <button type="submit" className="button btn-primary">
                            Aplicar filtros
                          </button>
                        </footer>
                      </div>
                    </form>
                  )}
                </Formik>
              </main>
            </div>
          )}
        </div>
      )}
    </Transition>
  );
};

export default Filter;
