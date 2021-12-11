import React from 'react'
import { Link } from 'react-router-dom'

const Index = () => {
    return (
        <div>
            <div className="p-10 w-full flex flex-col items-start justify-start">
            <span className='text-2xl font-bold text-gray-900 flex w-full items-center justify-center'>Sistema de Gestión de Proyectos</span>
            <div className="p-10">
                <p className="py-3">Este es el módulo de gestión de proyectos diseñado por el Grupo DigitSpace Inc.</p>
                <p className="py-3">Por favor, contacte a uno de nuestros especialistas en caso de dudas o consultas sobre la plataforma:
                <ul className="py-3">
                    <li> <a href="mailto:yesicavillamil@gmail.com">Yesica Villamil</a> </li>
                    <li> <a href="mailto:katerinbarrera2001@gmail.com">Katerin Barrera</a></li>
                    <li> <a href="mailto:johnkevin96@hotmail.com">Kevin Giraldo</a></li>
                    <li> <a href="mailto:daniel.florez.orrego@gmail.com">Daniel Florez-Orrego</a></li>
                    <li> <a href="mailto:davidco.gonzalez@live.com">David Gonzalez</a></li>
                </ul>
                <span className="font-bold">Informaciones importantes:</span>
                <ol className="py-3">
                    <li> En la sección de <Link to="/usuarios">Usuarios es posible aceptar un usuario registrado y en estado pendiente. Solamente es posible acceder esta sección si es un usuario con rol líder o administrador</Link> </li> 
                    <li> En la sección de <Link to="/proyectos">Proyectos es posible listas los proyectos que están registrados. Si es estudiante, podrá inscribirse al número de proyectos que desee. Tenga en cuenta que su inscripción solamente estará finalizada cuando sea aprobada por el líder del proyecto. 
                    Si usted es un líder de proyecto, podrá crear proyectos, revisar los proyectos que tiene a su cargo, además de aprobar las inscripciones pendientes.</Link></li>
                    <li> En la sección de <Link to="/inscripciones">Inscripciones</Link> es posible verificar las inscripciones disponibles. </li>
                </ol>
                </p>
            </div>

        </div>   


        </div>
    )
}

export default Index
