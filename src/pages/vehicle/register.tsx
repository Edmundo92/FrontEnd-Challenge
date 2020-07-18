import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import FieldGroup from "../../components/FieldGroup";
import { FiMapPin, FiAtSign, FiTriangle, FiTruck } from "react-icons/fi";

import { uuid } from "uuidv4";

import { Formik } from "formik";
import * as Yup from "yup";
import { useParams, useHistory } from "react-router-dom";

import api from "../../api";
import { sucess } from "../../helpers/alert";
import { Loading } from "../../components/Loading";
import { Veiculo } from "../../models";

const RegisterVehicle = () => {
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [oneVehicle, setOneVehicle] = useState<Veiculo>({
    id: "",
    km_atual: 0,
    placa: "",
    email_proprietario: "",
    cidade: "",
  });

  useEffect(() => {
    if (id) {
      findVehicle(id);
    }
  }, [id]);

  const RegisterVehicleSchema = Yup.object().shape({
    email_proprietario: Yup.string()
      .email("Email inválido")
      .required("Campo obrigatório"),
    placa: Yup.string()
      .min(7, "7 caracteres no minimo")
      .matches(
        /^[A-Z]{3}[0-9][A-Z][0-9]{2}$|^[A-Z]{3}[0-9]{4}$/,
        "Formato de placa inválido"
      )
      .required("Campo obrigatório"),
    km_atual: Yup.number().required("Campo obrigatório"),
    cidade: Yup.string().required("Campo obrigatório"),
  });

  let RegisterVehicleForm = {
    id: "",
    km_atual: 0,
    placa: "",
    email_proprietario: "",
    cidade: "",
    historico_situacoes: new Date(),
  };

  function handleSubmit(values: any) {
    setIsLoading(true);
    api
      .post("veiculos", values)
      .then((resp) => {
        setIsLoading(false);
        messageAndRedirect("Registro cadastrado com sucesso");
      })
      .catch((error) => setIsLoading(false));
  }

  function findVehicle(id: string) {
    api.get(`veiculos/${id}`).then((resp) => {
      setOneVehicle(resp.data);
    });
  }

  function handleSubmitUpdate(id: string, values: any) {
    api.patch(`veiculos/${id}`, values).then((resp) => {
      setOneVehicle(resp.data);
      messageAndRedirect("Registro atualizado com sucesso");
    });
  }

  function messageAndRedirect(message: string) {
    sucess(message, () => history.push("/"));
  }

  return (
    <div className="form-wrapper">
      <Formik
        initialValues={id ? oneVehicle : RegisterVehicleForm}
        validationSchema={RegisterVehicleSchema}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          if (id) {
            handleSubmitUpdate(id, values);
          } else {
            values.id = uuid();
            handleSubmit(values);
          }
        }}
        render={({
          handleSubmit,
          values,
          errors,
          handleChange,
          setValues,
          setFieldValue,
        }) => {
          return (
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
                    type="number"
                    label="KM Atual"
                    placeholder="Informar a kilometragem atual"
                    name="km_atual"
                    value={values.km_atual}
                    onChange={handleChange}
                    errors={errors}
                    icon={<FiTruck />}
                  />

                  <Input
                    type="text"
                    label="E-mail Proprietário"
                    placeholder="Informar e-mail"
                    name="email_proprietario"
                    value={values.email_proprietario}
                    onChange={handleChange}
                    errors={errors}
                    icon={<FiAtSign />}
                  />
                </FieldGroup>
              </div>

              <div className="button-container">
                <button type="submit" className="btn">
                  Salvar
                </button>
              </div>
            </form>
          );
        }}
      ></Formik>
      <Loading isLoading={isLoading} />
    </div>
  );
};

export default RegisterVehicle;
