import React from "react";
import { Edit, Mail, Calendar, User as UserIcon, Trash } from "lucide-react";

const Button = ({ onClick, variant, size, className, children }) => {
  let baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  if (size === "sm") {
    baseClasses += " h-8 px-3";
  }
  if (variant === "outline") {
    baseClasses +=
      " border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground";
  }
  return (
    <button onClick={onClick} className={`${baseClasses} ${className}`}>
      {children}
    </button>
  );
};

export default function UserList({ user, onEdit, onDelete, index }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-md transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-600 transform hover:scale-[0.98] animate-fade-in group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-3">
          {/* Nome */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg group-hover:bg-teal-200 dark:group-hover:bg-teal-800/50 transition-colors">
              <UserIcon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                {user.name}
              </h3>
            </div>
          </div>

          {/* Idade */}
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{user.age} anos</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-sm break-all">{user.email}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
            {/* Data do cadastro */}
            <div className="text-xs text-gray-50 dark:text-gray-400">
              {user.createdAt && (
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  Cadastrado em: {new Date(user.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
            {user.updatedAt && user.updatedAt !== user.createdAt && (
            <span className="text-gray-400 dark:text-gray-500 hidden sm:inline">|</span>
            )}
            {/* Data de Atualização */}
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {user.updatedAt && user.updatedAt !== user.createdAt && (
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  Atualizado em: {new Date(user.updatedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col gap-2 ml-4">
          <Button
            onClick={() => onEdit(user)}
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 dark:text-blue-400 dark:border-blue-700 dark:hover:bg-blue-900/20"
          >
            <Edit className="w-3 h-3" />
          </Button>
          <Button
            onClick={() => onDelete(user)}
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 dark:text-red-400 dark:border-red-700 dark:hover:bg-red-900/20"
          >
            <Trash className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
