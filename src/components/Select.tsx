import React, { useState, useEffect } from "react";
import api from "../api";
import { City } from "../models";

const Select = ({
  label,
  placeholder,
  name,
  errors,
  handleChange,
  value,
  icon,
  ...restProps
}: any) => {
  const [city, setCity] = useState<string>("");
  const [cityList, setCityList] = useState<City[]>([]);
  const [style, setStyle] = useState<object>({ display: "none" });

  function hanldeSearch(e: any) {
    let value = e.target.value;

    if (value.length >= 3) {
      api.get(`/cidades?q=${value}`).then((resp) => {
        setCityList(resp.data);
      });
    } else {
      setCity("");
      setCityList([]);
    }
  }

  function hideOrShow() {
    if (cityList.length > 0) {
      setStyle({ display: "block" });
    } else {
      setStyle({ display: "none" });
    }
    return style;
  }

  useEffect(() => {
    hideOrShow();
  }, [city, cityList]);

  function handleChoice(city: City) {
    value.cidade = city.nome;
    setTimeout(() => {
      setStyle((old) => ({ ...old, display: "none" }));
    }, 10);
  }

  return (
    <>
      <div className="input-container">
        {icon}
        <div className="input-content">
          <label htmlFor="">{label}</label>

          <div>
            <input
              type="text"
              placeholder={placeholder}
              onInput={hanldeSearch}
              name={name}
              autoComplete="off"
              onChange={(e) => {
                handleChange(e);
              }}
              {...restProps}
              value={value.cidade}
            />
          </div>
          {errors[name] && <span className="field-msg">{errors[name]}</span>}
        </div>
      </div>

      <div className="list-itens" style={style}>
        <ul>
          {cityList.length > 0 ? (
            cityList.map((el: City, index: number) => (
              <li key={index} onClick={() => handleChoice(el)}>
                {el.nome}
              </li>
            ))
          ) : (
            <li>Cidade não existe</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Select;
