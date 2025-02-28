import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormData } from "../../../models/FormData";
import { Campo } from "../../../models/Campo";
import CampoInput from "./CampoInput";

const schema = z.object({
  codigo_campo: z.string().min(1, "Código do campo é obrigatório"),
  codigo_cooperado: z.string().min(1, "Código do cooperado é obrigatório"),
  rensasem: z.string().min(1, "Rensasem é obrigatório"),
  nome_produtor: z.string().min(1, "Nome do produtor é obrigatório"),
  safra: z.string().min(1, "Safra é obrigatória"),
  cooperado: z.string().min(1, "Cooperado é obrigatório"),
  propriedade: z.string().min(1, "Propriedade é obrigatória"),
  inscricao_estadual: z.string().min(1, "Inscrição estadual é obrigatória"),
  municipio: z.string().min(1, "Município é obrigatório"),
  uf: z.string().min(2, "UF é obrigatória").max(2, "Sigla da UF inválida"),
  responsavel: z.string().min(1, "Responsável é obrigatório"),
  assistente: z.string().min(1, "Assistente é obrigatório"),
  codigo_sap: z.string().min(1, "Código SAP é obrigatório"),
  cultivar: z.string().min(1, "Cultivar é obrigatória"),
  cpfCnpj: z
    .string()
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
      "CPF ou CNPJ inválido"
    )
    .min(1, "CPF/CNPJ é obrigatório"),
});

const CampoForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const campo = new Campo(
      data.codigo_campo,
      data.codigo_cooperado,
      data.rensasem,
      data.nome_produtor,
      data.safra,
      data.cooperado,
      data.propriedade,
      data.inscricao_estadual,
      data.municipio,
      data.uf,
      data.responsavel,
      data.assistente,
      data.codigo_sap,
      data.cultivar,
      data.cpfCnpj
    );
    console.log(JSON.stringify(campo, null, 2));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/fundo.jpeg')" }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-lg z-10"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Cadastro de Campo</h1>
          <p className="text-gray-600 mt-2">Preencha os campos abaixo para cadastrar as informações.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <CampoInput label="Código do Campo" name="codigo_campo" register={register} error={errors.codigo_campo} />
          <CampoInput label="Código do Cooperado" name="codigo_cooperado" register={register} error={errors.codigo_cooperado} />
          <CampoInput label="Rensasem" name="rensasem" register={register} error={errors.rensasem} />
          <CampoInput label="Nome do Produtor" name="nome_produtor" register={register} error={errors.nome_produtor} />
          <CampoInput label="Safra" name="safra" register={register} error={errors.safra} />
          <CampoInput label="Cooperado" name="cooperado" register={register} error={errors.cooperado} />
          <CampoInput label="Propriedade" name="propriedade" register={register} error={errors.propriedade} />
          <CampoInput label="Inscrição Estadual" name="inscricao_estadual" register={register} error={errors.inscricao_estadual} />
          <CampoInput label="Município" name="municipio" register={register} error={errors.municipio} />
          <CampoInput label="UF" name="uf" register={register} error={errors.uf} />
          <CampoInput label="Responsável" name="responsavel" register={register} error={errors.responsavel} />
          <CampoInput label="Assistente" name="assistente" register={register} error={errors.assistente} />
          <CampoInput label="Código SAP" name="codigo_sap" register={register} error={errors.codigo_sap} />
          <CampoInput label="Cultivar" name="cultivar" register={register} error={errors.cultivar} />
          <CampoInput label="CPF/CNPJ" name="cpfCnpj" register={register} error={errors.cpfCnpj} />
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampoForm;