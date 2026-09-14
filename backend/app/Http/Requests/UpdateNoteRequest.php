<?php

namespace App\Http\Requests;

class UpdateNoteRequest extends StoreNoteRequest
{
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'content' => ['sometimes', 'required', 'string', 'max:10000'],
        ];
    }
}
