import { useEffect, useState } from 'react'
import NoteForm from './NoteForm.jsx'
import { createNote, deleteNote, fetchNotes, updateNote } from './api.js'

const dateFormat = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'short', timeStyle: 'short' })

export default function App() {
    const [notes, setNotes] = useState([])
    const [editing, setEditing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchNotes()
            .then(setNotes)
            .catch((problem) => setError(problem.message))
            .finally(() => setLoading(false))
    }, [])

    const handleSave = async (values) => {
        if (editing) {
            const updated = await updateNote(editing.id, values)
            setNotes((current) => current.map((note) => (note.id === updated.id ? updated : note)))
            setEditing(null)

            return
        }

        const created = await createNote(values)
        setNotes((current) => [created, ...current])
    }

    const handleDelete = async (id) => {
        try {
            await deleteNote(id)
            setNotes((current) => current.filter((note) => note.id !== id))

            if (editing?.id === id) {
                setEditing(null)
            }
        } catch (problem) {
            setError(problem.message)
        }
    }

    return (
        <main className="page">
            <h1>Заметки</h1>

            <NoteForm
                key={editing?.id ?? 'new'}
                note={editing}
                onSave={handleSave}
                onCancel={() => setEditing(null)}
            />

            {error && <p className="error">{error}</p>}

            {loading && <p className="hint">Загрузка…</p>}
            {!loading && notes.length === 0 && <p className="hint">Пока ни одной заметки.</p>}

            <ul className="notes">
                {notes.map((note) => (
                    <li key={note.id} className="note">
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                        <div className="note__footer">
                            <time dateTime={note.updated_at}>{dateFormat.format(new Date(note.updated_at))}</time>
                            <span>
                                <button type="button" className="secondary" onClick={() => setEditing(note)}>Изменить</button>
                                <button type="button" className="danger" onClick={() => handleDelete(note.id)}>Удалить</button>
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    )
}
