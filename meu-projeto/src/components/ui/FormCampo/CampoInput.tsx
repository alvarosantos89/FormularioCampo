import { UseFormRegister, FieldError } from "react-hook-form";
import { FormData } from "../../../models/FormData";
import InputMask from "react-input-mask";
import { useState } from "react";

interface CampoInputProps {
  label: string;
  name: keyof FormData;
  register: UseFormRegister<FormData>;
  error?: FieldError;
}

const CampoInput = ({ label, name, register, error }: CampoInputProps) => {
  const [mask, setMask] = useState<string>("");
  const [warning, setWarning] = useState<string>("");

  const estadosBrasileiros = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PR", "PB", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");

    if (name === "cpfCnpj") {
      if (value.length > 11 && value.length <= 14) {
        setMask("99.999.999/9999-99");
        setWarning("");
      } else if (value.length > 14) {
        setWarning("O número de dígitos excedeu o limite de 14 caracteres.");
      } else {
        setMask("999.999.999-99");
        setWarning("");
      }
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-gray-700 font-medium">
        {label}
      </label>

      {/* Renderiza um SELECT para UF */}
      {name === "uf" ? (
        <select
          id={name}
          {...register(name)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione o estado</option>
          {estadosBrasileiros.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>
      ) : name === "cpfCnpj" ? (
        // Renderiza um campo de input com máscara apenas para CPF/CNPJ
        <InputMask
          id={name}
          {...register(name)}
          mask={mask}
          onBlur={handleBlur}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        // Renderiza um input normal para os outros campos
        <input
          id={name}
          {...register(name)}
          type="text"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {warning && <p className="text-yellow-500 text-sm">{warning}</p>}
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default CampoInput;