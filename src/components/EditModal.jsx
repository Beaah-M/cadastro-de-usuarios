import React, { useState, useEffect} from 'react';
import { validateEmail, validateAge, validateName } from '../utils/validation';
import { X, Save, User as UserIcon, Mail, Calendar } from 'lucide-react';

export default function EditModal({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: user.name,
    age: user.age,
    email: user.email
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  const validateForm = () => { 
    const newErrors = {};

    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error;
    }
    const ageValidation = validateAge(formData.age);
    if (!ageValidation.isValid) {
      newErrors.age = ageValidation.error;
    }
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsSubmitting(true);
    try { 
      const dataToSend = { 
        ...user,
        ...formData, age: String(formData.age) };
      await onSave(dataToSend);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    } finally { 
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: undefined
      }));
    }
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.age > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      { /* conteudo do modal */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md animate-scale in">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            Editar Usuário
          </h2>
          <button
          onClick={onClose}
          className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors'
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        { /* Formulário */}
        <form onSubmit={handleSubmit} className='p-6 space-y-4'>
          { /* Nome */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <UserIcon className="w-4 h-4"></UserIcon>
              Nome
            </label>
            <input 
            type="text" 
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-3 py-2 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                errors.name ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.name && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.name}</p>
            )}

            { /* Idade */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Calendar className="w-4 h-4"></Calendar>
              Idade
              </label>
              <input
               type="number"
                value={formData.age === 0 ? '' : formData.age}
                onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                min="1"
                max= "90"
                className={`w-full px-3 py-2 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                  errors.age ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'
                }`}
                />
              {errors.age && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.age}</p>
              )}
            </div>
            { /* Email */}
            <div className="space-y-2">
              <label className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
                <Mail className="w-4 h-4"></Mail>
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                  errors.email ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'
                }`}
                />
              {errors.email && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>
            { /* Botão de Salvar */}
            <button
            type='button'
            onClick={onClose}
            className='flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
            >
              Cancelar
            </button>
            <button
            type='submit'
            disabled={!isFormValid || isSubmitting}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                isFormValid && !isSubmitting
                  ? 'bg-teal-500 hover:bg-teal-600 text-white'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Salvar
                </>
              )}
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};
