import React from "react";

interface InputInfo {
  label: string;
  placeholder: string;
  name: string;
  value?: any;
  onChange?: any;
  onClick?: any;
  errors?: any;
  type: string;
  icon: any;
  disabled?: boolean;
}

const Input = ({
  label,
  placeholder,
  errors,
  name,
  icon,
  ...restProps
}: InputInfo) => {
  return (
    <div className="input-container">
      {icon}
      <div className="input-content">
        <label htmlFor="">{label}</label>
        <div>
          <input
            placeholder={placeholder}
            name={name}
            {...restProps}
            autoComplete="off"
          />
        </div>
        {errors[name] && <span className="field-msg">{errors[name]}</span>}
      </div>
    </div>
  );
};

export default Input;
