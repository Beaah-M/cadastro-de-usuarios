import { useEffect, useState, useCallback } from "react";
import { Users, Search } from "lucide-react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import FilterBar from "./components/SearchAndFilter";
import ThemeToggle from "./components/ThemeToggle";
import DeleteModal from "./components/DeleteModal";
import EditModal from "./components/EditModal";
import api from "./services/api";

export default function App() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({nome: "", idade: "", ordenar: "asc"});
  const [darkMode, setDarkMode] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await api.get("/usuarios", {
        params: {
          nome: filter.nome || undefined,
          idade: filter.idade || undefined,
          ordenar: filter.ordenar
        },
      });
      let sortedUsers = [...response.data];
      if (filter.ordenar === "idade-desc") {
        sortedUsers.sort((a, b) => a.age - b.age);
      } else if (filter.ordenar === "idade-asc") {
        sortedUsers.sort((a, b) => b.age - a.age);
        
      } else if (filter.ordenar === "nome-asc") {
        sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filter.ordenar === "nome-desc") {
        sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
      }
      setUsers(sortedUsers);  
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }, [filter]);



  const cadastrarUsuario = async (usuario) => {
    try {
      await api.post("/usuarios", usuario);
      fetchUsers();
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  }

  const atualizarUsuario = async (usuario) => {
    try {
      await api.put(`/usuarios/${usuario.id}`, usuario);
      fetchUsers();
      setDeletingUser(null);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  const excluirUsuario = async (id) => {
    try {
      await api.delete(`/usuarios/${id}`);
      fetchUsers();
      setDeletingUser(null);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
   }

  const handleDelete = (user) => { 
    setDeletingUser(user);
  };

  const handleDeleteConfirm = async () => {
    if (deletingUser) {
     await excluirUsuario(deletingUser.id);
    }
  }

  useEffect(() => {
    const html = document.querySelector("html");
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    fetchUsers();
  }
, [fetchUsers]);



return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-slate-100 to-slate-200'}`}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-500 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Cadastro de Usuários
            </h1>
          </div>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Coluna Esquerda - Formulário e Filtro */}
          <div className="space-y-6">
            <UserForm onAdd={cadastrarUsuario} />
            <FilterBar filter={filter} setFilter={setFilter} />
          </div>

          {/* Coluna Direita - Lista de Usuários */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Usuários Cadastrados ({users.length}) 
              </h2>
            </div>

            {users.length === 0 ? ( 
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhum usuário cadastrado ainda.
                </p>
              </div>
            ) : (
        
              <div className="space-y-2 max-h-full overflow-y-auto p-2  ">
                {users.filter(user => { 
                  const matchesName = filter.nome === "" || user.name.toLowerCase().includes(filter.nome.toLowerCase());
                  const matchesAge = filter.idade === "" || user.age.toString().includes(filter.idade);
                  return matchesName && matchesAge;
                }).map((user, index) => (
                  <UserList
                    key={user.id}
                    user={user}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modais */}
        {editingUser && (
          <EditModal
            user={editingUser}
            onSave={atualizarUsuario}
            onClose={() => setEditingUser(null)}
          />
        )}

        {deletingUser && (
          <DeleteModal
            user={deletingUser}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setDeletingUser(null)}
          />
        )}
      </div>
    </div>
  );
}
