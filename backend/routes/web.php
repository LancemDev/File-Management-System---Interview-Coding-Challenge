<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;
use App\Http\Controllers\DirectoryController;

Route::get('/', function () {
    return view('welcome');
});

// File routes
Route::get('/api/files', [FileController::class, 'index'])->name('api.files');
Route::get('/api/files/{id}', [FileController::class, 'show'])->name('api.files.show');
Route::post('/api/files', [FileController::class, 'store'])->name('api.files');
Route::put('/api/files/{id}', [FileController::class, 'update'])->name('api.files');
Route::delete('/api/files/{id}', [FileController::class, 'destroy'])->name('api.files');

// Directory routes
Route::get('/api/directories', [DirectoryController::class, 'index'])->name('api.directories');
Route::get('/api/directories/{id}/sub-directories', [DirectoryController::class, 'getSubDirectories'])->name('api.directories.sub-directories');
Route::get('/api/directories/{id}/files', [DirectoryController::class, 'getFiles'])->name('api.directories.files');
Route::post('/api/directories', [DirectoryController::class, 'store'])->name('api.directories');
Route::put('/api/directories/{id}', [DirectoryController::class, 'update'])->name('api.directories');
Route::delete('/api/directories/{id}', [DirectoryController::class, 'destroy'])->name('api.directories');
Route::get('/files{id}/download', [FileController::class, 'download'])->name('files.download');
