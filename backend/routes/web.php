<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;
use App\Http\Controllers\DirectoryController;

Route::get('/', function () {
    return view('welcome');
});

// Group API routes with a prefix
Route::prefix('api')->group(function () {
    // File routes
    Route::get('/files', [FileController::class, 'index'])->name('api.files');
    Route::get('/files/{id}', [FileController::class, 'show'])->name('api.files.show');
    Route::post('/files', [FileController::class, 'store'])->name('api.files.store');
    Route::put('/files/{id}', [FileController::class, 'update'])->name('api.files.update');
    Route::delete('/files/{id}', [FileController::class, 'destroy'])->name('api.files.destroy');
    Route::get('/files/{id}/download', [FileController::class, 'download'])->name('api.files.download');

    // Directory routes
    Route::get('/directories', [DirectoryController::class, 'index'])->name('api.directories');
    Route::get('/directories/{id}/sub-directories', [DirectoryController::class, 'getSubDirectories'])->name('api.directories.sub-directories');
    Route::get('/directories/{id}/files', [DirectoryController::class, 'getFiles'])->name('api.directories.files');
    Route::post('/directories', [DirectoryController::class, 'store'])->name('api.directories.store');
    Route::put('/directories/{id}', [DirectoryController::class, 'update'])->name('api.directories.update');
    Route::delete('/directories/{id}', [DirectoryController::class, 'destroy'])->name('api.directories.destroy');
});
