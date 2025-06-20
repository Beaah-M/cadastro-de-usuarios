import React from 'react';

export default function DeleteModal({ user, onConfirm, onCancel}) {
    return (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96'>
                <h2 className='text-xl font-bold mb-4 text-gray-800 dark:text-white'>Confirmar Exclusão</h2>
                <p className='mb-6 text-gray-700 dark:text-gray-300'>
                    Tem certeza que deseja excluir o usuário <span className='font-semibold'>{user.name}</span>?
                </p>
                <div className='flex justify-end gap-2'>
                    <button
                        onClick={onCancel}
                        className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white'>
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
};