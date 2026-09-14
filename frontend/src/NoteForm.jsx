import { useState } from 'react'

const emptyNote = { title: '', content: '' }

export default function NoteForm({ note, onSave, onCancel }) {
    const [values, setValues] = useState(note ? { title: note.title, content: note.content } : emptyNote)
    const [errors, setErrors] = useState({})
    const [saving, setSaving] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target
        setValues((current) => ({ ...current, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSaving(true)

        try {
            await onSave(values)
            setErrors({})

            if (!note) {
                setValues(emptyNote)
            }
        } catch (error) {
            setErrors(error.errors ?? { title: [error.message] })
        } finally {
            setSaving(false)
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit} noValidate>
            <label>
                Заголовок
                <input name="title" value={values.title} onChange={handleChange} placeholder="О чём заметка" />
            </label>
            {errors.title && <span className="error">{errors.title[0]}</span>}

            <label>
                Текст
                <textarea name="content" rows="4" value={values.content} onChange={handleChange} placeholder="Подробности" />
            </label>
            {errors.content && <span className="error">{errors.content[0]}</span>}

            <div className="form__actions">
                <button type="submit" disabled={saving}>{note ? 'Сохранить' : 'Добавить'}</button>
                {note && <button type="button" className="secondary" onClick={onCancel}>Отмена</button>}
            </div>
        </form>
    )
}
