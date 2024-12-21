<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function index()
    {
        return File::all();
    }

    public function show($id)
    {
        return File::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'file' => 'required|file',
            'directory_id',
        ]);
    
        $path = $request->file('file')->store('files');
    
        $file = new File();
        $file->name = $request->file('file')->getClientOriginalName();
        $file->path = $path;
        $file->directory_id = $request->input('directory_id', null); // Set to null if not provided
        $file->save();
    
        return response()->json($file, 201);
    }

    public function update(Request $request, $id)
    {
        $file = File::findOrFail($id);
        $file->name = $request->name;
        $file->path = $request->path;
        $file->directory_id = $request->directory_id;
        $file->save();

        return response()->json($file, 200);
    }

    public function destroy($id)
    {
        $file = File::findOrFail($id);
        $file->delete();

        return response()->json(null, 204);
    }
}
