<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;
use App\Http\Controllers\DirectoryController;

Route::get('/', function () {
    return view('welcome');
});

// File routes
Route::get('/api/files', [FileController::class, 'index']);
Route::get('/api/files/{id}', [FileController::class, 'show']);
Route::post('/api/files', [FileController::class, 'store'])->name('api.files');
Route::put('/api/files/{id}', [FileController::class, 'update']);
Route::delete('/api/files/{id}', [FileController::class, 'destroy']);

// Directory routes
Route::get('/api/directories', [DirectoryController::class, 'index']);
Route::get('/api/directories/{id}/sub-directories', [DirectoryController::class, 'getSubDirectories']);
Route::get('/api/directories/{id}/files', [DirectoryController::class, 'getFiles']);
Route::post('/api/directories', [DirectoryController::class, 'store']);
Route::put('/api/directories/{id}', [DirectoryController::class, 'update']);
Route::delete('/api/directories/{id}', [DirectoryController::class, 'destroy']);
Route::get('/files{id}/download', [FileController::class, 'download']);


Route::get('/test-upload', function(){
    return view('upload');
});