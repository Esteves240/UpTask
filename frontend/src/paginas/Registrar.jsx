import { useState} from 'react'
import { Link } from "react-router-dom"

const Registrar = () => {
    const [nombre, setNobre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')

  return (
    <>
        <h1 className="text-sky-600 font-black text-6xl capitalize">Cria uma conta e administra os teus
        <span className="text-slate-700"> projectos</span>
        </h1>

        <form className="my-10 bg-white shadow rounded-lg p-10">
              <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="email"
                >Nome</label>
                <input 
                    id="nombre"
                    type="text" 
                    placeholder="Primeiro nome e Apelido"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={nombre}
                    onChange={e=>setNobre(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="email"
                >Email</label>
                <input 
                    id="email"
                    type="email" 
                    placeholder="Email de Registo"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="password"
                >Password</label>
                <input 
                    id="password"
                    type="password" 
                    placeholder="Password de Registo"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={password}
                    onChange={e =>setPassword(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="password"
                >Repetir Password</label>
                <input 
                    id="password2"
                    type="password" 
                    placeholder="Repita a Password"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={repetirPassword}
                    onChange={e => setRepetirPassword(e.target.value)}
                />
            </div>

            <input 
                type="submit"
                value= "Criar Conta"
                className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold 
                rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />

        </form>

        <nav className="lg:flex lg:justify-between">
            <Link 
                className="block text-center my-5 text-slate-500 uppercase text-sm"
                to="/"
            >Já tens conta? Registra-te</Link>
            <Link 
                className="block text-center my-5 text-slate-500 uppercase text-sm"
                to="/olvide-password"
            >Esqueceste-te da tua palavra-passe?</Link>
        </nav>
    </>
  )
}

export default Registrar