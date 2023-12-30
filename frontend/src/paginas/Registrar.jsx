import { useState} from 'react'
import { Link } from "react-router-dom"
import Alerta from '../components/Alerta.jsx'
import axios from 'axios'

const Registrar = () => {
    const [nombre, setNobre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e => {
        e.preventDefault();

        //revisar que todos os campos estejam preenchidos
        if([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({
                msg: 'Todos os campos são obrigatórios',
                error: true
            })
            return
        }

        if(password !== repetirPassword) {
            setAlerta({
                msg: 'As passwords são diferentes',
                error: true
            })
            return
        }

        if(password.length < 6) {
            setAlerta({
                msg: 'A password deve ter pelo menos 6 caracteres',
                error: true
            })
            return
        }

        setAlerta({})

        //Criar o usuário na API
        try {
            const respuesta = await axios.post('http://localhost:4000/api/usuarios', 
            {nombre, email, password})

            console.log(respuesta)
        } catch (error) {
            console.log(error)
        }
    }

    const { msg } = alerta

  return (
    <>
        <h1 className="text-sky-600 font-black text-6xl capitalize">Cria uma conta e administra os teus
        <span className="text-slate-700"> projectos</span>
        </h1>

        <form 
            className="my-10 bg-white shadow rounded-lg p-10"
            onSubmit={handleSubmit}
        >
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

        {msg && <Alerta alerta={alerta} />}

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