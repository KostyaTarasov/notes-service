<?php

namespace Tests\Feature;

use App\Models\Note;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NoteApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_notes_are_listed_newest_first(): void
    {
        $first = Note::factory()->create();
        $second = Note::factory()->create();

        $this->getJson('/api/notes')
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.id', $second->id)
            ->assertJsonPath('data.1.id', $first->id)
            ->assertJsonStructure([
                'data' => [['id', 'title', 'content', 'created_at', 'updated_at']],
            ]);
    }

    public function test_note_can_be_created(): void
    {
        $this->postJson('/api/notes', [
            'title' => 'Список покупок',
            'content' => 'Молоко, хлеб, кофе',
        ])
            ->assertCreated()
            ->assertJsonPath('data.title', 'Список покупок');

        $this->assertDatabaseHas('notes', ['title' => 'Список покупок']);
    }

    public function test_note_is_not_created_without_required_fields(): void
    {
        $this->postJson('/api/notes', [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['title', 'content']);

        $this->assertDatabaseCount('notes', 0);
    }

    public function test_note_is_not_created_with_too_long_title(): void
    {
        $this->postJson('/api/notes', [
            'title' => str_repeat('a', 256),
            'content' => 'Текст',
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('title');
    }

    public function test_single_note_can_be_fetched(): void
    {
        $note = Note::factory()->create();

        $this->getJson("/api/notes/{$note->id}")
            ->assertOk()
            ->assertJsonPath('data.id', $note->id)
            ->assertJsonPath('data.content', $note->content);
    }

    public function test_missing_note_returns_not_found(): void
    {
        $this->getJson('/api/notes/404')->assertNotFound();
    }

    public function test_note_can_be_updated(): void
    {
        $note = Note::factory()->create();

        $this->putJson("/api/notes/{$note->id}", [
            'title' => 'Новый заголовок',
            'content' => 'Новый текст',
        ])
            ->assertOk()
            ->assertJsonPath('data.title', 'Новый заголовок');

        $this->assertDatabaseHas('notes', [
            'id' => $note->id,
            'content' => 'Новый текст',
        ]);
    }

    public function test_note_is_not_updated_with_empty_title(): void
    {
        $note = Note::factory()->create(['title' => 'Заметка']);

        $this->putJson("/api/notes/{$note->id}", ['title' => ''])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('title');

        $this->assertDatabaseHas('notes', ['id' => $note->id, 'title' => 'Заметка']);
    }

    public function test_note_can_be_deleted(): void
    {
        $note = Note::factory()->create();

        $this->deleteJson("/api/notes/{$note->id}")->assertNoContent();

        $this->assertDatabaseMissing('notes', ['id' => $note->id]);
    }
}
