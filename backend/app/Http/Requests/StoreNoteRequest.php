<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNoteRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:10000'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Укажите заголовок заметки.',
            'title.max' => 'Заголовок не должен быть длиннее 255 символов.',
            'content.required' => 'Добавьте текст заметки.',
            'content.max' => 'Текст не должен быть длиннее 10000 символов.',
        ];
    }
}
