<?php

namespace App\Models;

use Database\Factories\NoteFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/** @use HasFactory<NoteFactory> */
class Note extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
    ];
}
