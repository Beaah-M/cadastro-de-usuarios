import React, { useState } from "react";
import { User, Mail, Calendar, UserPlus } from "lucide-react";
import { validateEmail, validateName, validateAge } from "../utils/validation";

export default function UserForm({ onAdd }) {
  const [formData, setFormData] = useState ({
    name: "",
    age: "",
    email: ""
  });

  const [erro, setErro] = useState({});
  const [isSubmitting, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErro = {};

    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid) {
      newErro.name = nameValidation.error;
    }

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErro.email = emailValidation.error;
    }

    const ageValidation = validateAge(formData.age);
    if (!ageValidation.isValid) {
      newErro.age = ageValidation.error;
    }

    setErro(newErro);
    return Object.keys(newErro).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validateForm()) return;

    setIsSubmitted(true);
    try {
      'name', 'age', 'email'
      const dataToSend = { ...formData, age: String(formData.age) };
      await onAdd(dataToSend);
      setFormData({ name: "", age: "", email: "" });
      setErro({});
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    } finally {
      setIsSubmitted(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (erro[field]) {
      setErro(prev => ({ ...prev, [field]: null }));
    }
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.age > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-teal-500 rounded-lg">
          <UserPlus className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Cadastro de Usuário
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4"> 
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <User className="w-5 h-5 text-gray-500" />
            Nome
            </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
              erro.name ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Digite o nome completo"></input>
          {erro.name && (
            <p className="text-sm text-red-600 dark:text-red-400 animate-fade-in flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {erro.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Calendar className="w-4 h-4" />
            Idade
          </label>
          <input
            type="number"
            value={formData.age === 0 ? '' : formData.age}
            onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
            min="1"
            max='90'
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
              erro.age ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Digite a idade"></input>

          {erro.age && (
            <p className="text-sm text-red-600 dark:text-red-400 animate-fade-in flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {erro.age}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Mail className="w-4 h-4" />
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
              erro.email ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Digite o email"></input>

          {erro.email && (
            <p className="text-sm text-red-600 dark:text-red-400 animate-fade-in flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {erro.email}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            isFormValid && !isSubmitting
              ? 'bg-teal-500 hover:bg-teal-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}>
          {isSubmitting ? (
            <>
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              Cadastrando...
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              Cadastrar Usuário
            </>
          )}
          </button>
      </form>
    </div>
  );
}
