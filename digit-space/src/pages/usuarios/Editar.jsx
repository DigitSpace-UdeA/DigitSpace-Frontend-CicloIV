import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO } from '../../grapql/usuarios/queries';
import Input from '../../components/Input';
import useFormData from '../../hooks/useFormData';
import { EDITAR_USUARIO } from '../../grapql/usuarios/mutations';
import { toast } from 'react-toastify';
import { Dropdown } from '../../components/Dropdown';
import { ButtonLoading } from '../../components/ButtonLoading';
import { Enum_Estado_Usuario } from '../../utils/enum';


const EditarUsuario = () => {

    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();
    const { data: queryData, error: queryError, loading: queryLoading } = useQuery(GET_USUARIO, {
        variables: {_id },
    });

    const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(EDITAR_USUARIO);

    const submitForm = (e) => {
        e.preventDefault();
        // Dado que en el FormData viene el rol y éste no se debe enviar, se elimina con el siguiente código
        delete formData.rol;
        console.log("fd", formData);
        editarUsuario({
            variables: { _id, ...formData },
        });
    };

    useEffect(() => {
        if (mutationData) {
            toast.success("Usuario modificado exitosamente.")
        }
        console.log("Mutación de Edición: ", mutationData);
    }, [mutationData]);

    useEffect(() => {
        if (mutationData) {
            toast.error("Error modificando al usuario seleccionado.");
        }
        if (queryError) {
            toast.error("Error consultando al usuario seleccionado.");
        }
    }, [queryError, mutationError]);
    
    if (queryLoading) return <div> Cargando . . . </div>;
    
    return (
        <div className='flew flex-col w-full h-full items-center justify-center p-10'>
            <Link to='/usuarios'>
                <i className='fas fa-arrow-left text-gray-600 cursor pointer font-bold text-xl hover:text-gray-900' />
            </Link>
            <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'> Editar Usuario </h1>

            <form onSubmit={submitForm} onChange={updateFormData} ref={form} className='flex flex-col items-center justify-center'>
                <Input label='Nombre de la Persona' type='text' name='nombre' defaultValue={queryData.Usuario.nombre} required={true} />
                <Input label='Apellido de la Persona' type='text' name='apellido' defaultValue={queryData.Usuario.apellido} required={true} />
                <Input label='Correo de la Persona' type='email' name='correo' defaultValue={queryData.Usuario.correo} required={true} />
                <Input label='Identificación de la Persona' type='text' name='identificacion' defaultValue={queryData.Usuario.identificacion} required={true} />

                {/* Se crea una lista desplegable para el rol */}
                <Dropdown label='Estado de la Persona' name='estado' defaultValue={queryData.Usuario.estado} required={true} options={Enum_Estado_Usuario} />
                
                <span> Rol del Usuario: {queryData.Usuario.rol} </span>

                <ButtonLoading disabled={Object.keys(formData).length === 0} loading={mutationLoading} text=" Confirmar " />
            </form>
            
        </div>
    );
};

export default EditarUsuario;
