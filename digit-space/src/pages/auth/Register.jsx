import React from 'react'
import { Link } from 'react-router-dom';
import ButtonLoading from '../../components/ButtonLoading';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import { REGISTRO } from '../../grapql/auth/mutations';
import useFormData from '../../hooks/useFormData';
import { Enum_Rol } from '../../utils/enum';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Register = () => {

    const {setToken} = useAuth()
    const navigate = useNavigate();
    const { form, formData, updateFormData } = useFormData();

    const [registro, { data: dataMutation, loading: loadingMutation, error: errorMutation }] = useMutation(REGISTRO);

    const submitForm = (e) => {
        e.preventDefault();
        registro({
            variables: formData
        });
    };

    useEffect(() => {
        console.log("Usuario a crear: ", dataMutation);
        if (dataMutation) {
            if (dataMutation.registro.token) {
                setToken(dataMutation.registro.token);
                navigate('/');
            }
        }     
    }, [dataMutation, setToken, navigate]);

    return (
        <div className='flex flex-col h-full w-full items-center justify-center'>
            <h1 className='text-3xl font-bold my-4'> Regístrate </h1>
            <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
                <div className='grid grid-cols-2 gap-5'>
                    <Input label='Nombre' name='nombre' type='text' required />
                    <Input label='Apellido' name='apellido' type='text' required />
                    <Input label='Identificación' name='identificacion' type='text' required />
                    <Dropdown label='Rol Aplicado' name='rol' required={true} options={Enum_Rol} />
                    <Input label='Correo' name='correo' type='email' required />
                    <Input label='Contraseña' name='password' type='password' required />
                </div>
                <ButtonLoading disabled={Object.keys(formData).length === 0} loading={loadingMutation} text='Registrarme' />
            </form>
            <span> ¿Ya tienes una cuenta? </span>
            <Link to='/auth/login'>
                <span className='text-blue-700'> Inicia Sesión </span>
            </Link>
        </div>
    );
};

export default Register;
