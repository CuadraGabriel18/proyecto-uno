import React, { useState } from 'react';
import shortid from 'shortid';
import Swal from 'sweetalert2';

const Crud = () => {
    const [track, setTrack] = useState('');
    const [artista, setArtista] = useState('');
    const [genero, setGenero] = useState('');
    const [modoEditar, setModoEditar] = useState(false);
    const [list, setListaCanciones] = useState([]);
    const [id, setId] = useState('');

    const limpiarform = () => {
        setTrack('');
        setArtista('');
        setGenero('');
        setId('');
        setModoEditar(false);
    };

    const eliminarTrack = (id) => {
        Swal.fire({
            title: "Desea Eliminar Track?",
            text: "Después de eliminar no se revertirán cambios!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarlo!"
        }).then((result) => {
            if (result.isConfirmed) {
                const arrayFiltrado = list.filter(cancion => cancion.id !== id);
                setListaCanciones(arrayFiltrado);
                Swal.fire({
                    title: "Track Eliminado!",
                    text: "Tu track ha sido eliminado",
                    icon: "success"
                });
            }
        });
    };

    const editarTrack = (cancion) => {
        setModoEditar(true);
        setTrack(cancion.cancion);
        setArtista(cancion.artist);
        setGenero(cancion.gen);
        setId(cancion.id);
    };

    const editarTrackOk = (evt) => {
        evt.preventDefault();

        // Validando campos vacíos
        if (!track.trim()) {
            Swal.fire({
                title: "Canciones TESJI",
                text: "Debe ingresar el nombre del Track",
                icon: "error"
            });
            return;
        }
        if (!artista.trim()) {
            Swal.fire({
                title: "Canciones TESJI",
                text: "Debe ingresar el nombre del Artista",
                icon: "error"
            });
            return;
        }
        if (!genero.trim()) {
            Swal.fire({
                title: "Canciones TESJI",
                text: "Debe ingresar el nombre del Género",
                icon: "error"
            });
            return;
        }

        Swal.fire({
            title: "Desea Editar Track?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, editarlo!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Editar el array de canciones
                const arrayEditado = list.map(cancion =>
                    cancion.id === id ? { id: id, cancion: track, artist: artista, gen: genero } : cancion
        );

        // Actualizar el estado de las canciones
        setListaCanciones(arrayEditado);
        // Limpiar el formulario
        limpiarform();
                Swal.fire({
                    title: "Track Editado!",
                    text: "Tu track ha sido editado",
                    icon: "success"
                });
            }
        });
    };

    const guardarTrack = (evt) => {
        evt.preventDefault();

        // Validando campos vacíos
        if (!track.trim()) {
            Swal.fire({
                title: "Canciones TESJI",
                text: "Debe ingresar el nombre del Track",
                icon: "error"
            });
            return;
        }
        if (!artista.trim()) {
            Swal.fire({
                title: "Canciones TESJI",
                text: "Debe ingresar el nombre del Artista",
                icon: "error"
            });
            return;
        }
        if (!genero.trim()) {
            Swal.fire({
                title: "Canciones TESJI",
                text: "Debe ingresar el nombre del Género",
                icon: "error"
            });
            return;
        }

        Swal.fire({
            title: "¿Seguro que deseas agregar Track a la lista?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: "No Guardar"
        }).then((result) => {
            if (result.isConfirmed) {
                if (modoEditar) {
                    const arrayEditado = list.map(cancion => (
                        cancion.id === id ? { id, cancion: track, artist: artista, gen: genero } : cancion
                    ));
                    setListaCanciones(arrayEditado);
                    Swal.fire("Editado Correctamente!", "", "success");
                } else {
                    setListaCanciones([
                        ...list,
                        { id: shortid.generate(), cancion: track, artist: artista, gen: genero }
                    ]);
                    Swal.fire("Agregado Correctamente!", "", "success");
                }
                limpiarform();
            } else if (result.isDenied) {
                Swal.fire("No se guardaron los cambios", "", "info");
            }
        });
    };

    return (
        <div className="container">
            <h1 className='text-center'>Registro De Canciones</h1>
            <hr />
            <section className="row">
                <section className="col-12 col-md-5 col-lg-4">
                    <h3>Formulario</h3>
                    <form onSubmit={modoEditar ? editarTrackOk : guardarTrack}>
                        <input
                            type="text"
                            placeholder='Track'
                            className='form-control mb-3'
                            onChange={(evt) => setTrack(evt.target.value)}
                            value={track}
                        />
                        <input
                            type="text"
                            placeholder='Artista'
                            className='form-control mb-3'
                            onChange={(evt) => setArtista(evt.target.value)}
                            value={artista}
                        />
                        <input
                            type="text"
                            placeholder='Género'
                            className='form-control mb-3'
                            onChange={(evt) => setGenero(evt.target.value)}
                            value={genero}
                        />
                        <button type='submit' className={`btn btn-block ${modoEditar ? 'btn-warning' : 'btn-dark'}`}>
                            {modoEditar ? 'Editar Canción' : 'Agregar Canción'}
                        </button>
                    </form>
                </section>
                <section className="col-12 col-md-7 col-lg-8">
                    <h3>Lista De Canciones</h3>
                    <ul className='list-group'>
                        {
                        list.length == 0 ? (<li className='list-group-item'>No Hay Tracks Para Mostrar</li>)
                        :
                        (list.map((cancion) => (
                            <li key={cancion.id} className='list-group-item'>
                                <span className='lead'>
                                    Canción: {cancion.cancion} :: Artista: {cancion.artist} :: Género: {cancion.gen}
                                </span>
                                <button onClick={() => editarTrack(cancion)} className="btn btn-sm btn-warning float-right mx-2">
                                    Editar
                                </button>
                                <button onClick={() => eliminarTrack(cancion.id)} className="btn btn-sm btn-danger float-right">
                                    Eliminar
                                </button>
                            </li>
                        )))}
                    </ul>
                </section>
            </section>
        </div>
    );
}

export default Crud;
