import { useMutation } from '@apollo/client';
import React from 'react'
import { Link } from 'react-router-dom'
import ButtonLoading from '../../components/ButtonLoading'
import Input from '../../components/Input'
import { useAuth } from '../../context/authContext';
import { LOGIN } from '../../grapql/auth/mutations';
import useFormData from '../../hooks/useFormData';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const { setToken } = useAuth();
    const { form, formData, updateFormData } = useFormData();

    const [
      login,
      { data: dataMutation, loading: mutationLoading, error: mutationError },
    ] = useMutation(LOGIN);

    const submitForm = (e) => {
        e.preventDefault();

        login({
            variables: formData,
        });
    };

    useEffect(() => {
      console.log("Usuario a crear: ", dataMutation);
      if (dataMutation) {
        if (dataMutation.login.token) {
          setToken(dataMutation.login.token);
          navigate("/");
        }
      }
    }, [dataMutation, setToken, navigate]);

    return (
        <div className='flex flex-col items-center justify-center w-full h-full p-10'>
            <h1 className='text-xl font-bold text-gray-900'> Iniciar Sesión </h1>
            <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
                <Input name='correo' type='email' label='Correo' required={true} />
                <Input name='password' type='password' label='Contraseña' required={true} />
                <ButtonLoading disabled={Object.keys(formData).length === 0} loading={mutationLoading} text='Iniciar Sesión' />
            </form>
            <span> ¿No tienes una Cuenta? </span>
            <Link to='/auth/register'>
                <span className='text-blue-700'> Regístrate </span>
            </Link>
        </div>
    );
};

export default Login;
