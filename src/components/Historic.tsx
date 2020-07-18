import React, { useState, useEffect } from "react";

const Situation = ({ data, setData, index }: any) => {
  const [date, setDate] = useState();
  const [situation, setSituation] = useState();
  const values: any = { id: null, data_hora: null, situacao: null };

  useEffect(() => {
    setData((old: any) => {
      return [...old, { id: index, date, situation }];
    });
  }, [index]);

  useEffect(() => {}, [date, situation]);

  function handleChange(e: any) {
    const { name, value } = e.target;
    values["id"] = index;
    values[name] = value;

    setData((old: any) => {
      old[index] = { ...values };
      return [...old];
    });
  }

  return (
    <>
      <input
        type="date"
        name="data_hora"
        value={date}
        onChange={handleChange}
      />
      <select name="situacao" onChange={handleChange}>
        <option value="BLOQUEADO ">BLOQUEADO</option>
        <option value="LIBERADO">LIBERADO</option>
      </select>
    </>
  );
};

const Historic = ({ view }: any) => {
  const [data, setData] = useState<any>([]);
  const [situation, setSituation] = useState([
    <Situation data={data} setData={setData} index={0} />,
  ]);

  useEffect(() => {}, [view.flag]);
  useEffect(() => {
    view.historic(data);
  }, [data]);

  function add(index: number) {
    setSituation((old) => [
      ...old,
      <Situation data={data} setData={setData} index={index + 1} />,
    ]);
  }

  function closeModal() {
    view.setFlag(false);
  }

  return (
    <>
      <div
        className="historic-wrapper"
        style={view.flag ? { display: "block" } : { display: "none" }}
      >
        <div className="historic">
          <span className="close-btn" onClick={closeModal}>
            X
          </span>
          {situation.length > 0 &&
            situation.map((el, index) => {
              return (
                <div className="historic-container">
                  {el}

                  {index + 1 ? (
                    <button onClick={(e) => add(index)}>+</button>
                  ) : (
                    <button onClick={(e) => alert()}>x</button>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Historic;
