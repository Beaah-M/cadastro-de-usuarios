import React from 'react';
import { Search, Filter } from 'lucide-react';

export default function FilterBar({ filter, setFilter }) {
    const {nome, idade, ordernar} = filter;

    const handleImputTermChange = (e) => {
      setFilter(prevFilter => ({
        ...prevFilter,
        nome: e.target.value
      }));
    };
    const handleAgeChange = (e) => {
      setFilter(prevFilter => ({
        ...prevFilter,
        idade: e.target.value
      }));
    };
    const handleSortChange = (e) => {
      setFilter(prevFilter => ({
        ...prevFilter,
        ordernar: e.target.value
      }));
    };
    const handleClearFilters = () => {
      setFilter({
        nome: '',
        idade: '',
        ordernar: 'asc'
      });
    };
    const isFilterActive = nome !== '' || idade !== '';
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-teal-600"></Filter>
        <h3 className="font-semibold text-gray-800 dark:text-white">Buscar e Filtrar</h3>
      </div>
      <div className="space-y-4">
        {/* Busca por Nome */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 trasform -translate-y-1/2 w-4 h-4 text-gray-400"></Search>
          <input 
          type="text" 
          placeholder='Buscar por nome'
          value={nome}
          onChange={handleImputTermChange}
          className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
        {/* Filtro por Idade */}
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
            Filtrar por Idade
          </label>
          <input
           type="number"
           placeholder='Idade'
           value={idade}
           onChange={handleAgeChange}
           className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
           />
        </div>

        {/* Ordenar por Nome */}
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
            Ordenar por
          </label>
          <select
          value={ordernar}
          onChange={handleSortChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
          >
            <option value="asc">Nome (A-Z)</option>
            <option value="desc">Nome (A-Z)</option>
            <option value="idade-asc">Idade (Crescente)</option>
            <option value="idade-desc">Idade (Decrescente)</option>
          </select>
        </div>
        </div>

        {/*Limpar Filtros */}
        {isFilterActive && (
          <button 
          onClick={handleClearFilters}
          className='text-sm text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-300 transition-colors'
          >
            Limpar Filtros
          </button>
        )}
      </div>
    </div>
  );
}