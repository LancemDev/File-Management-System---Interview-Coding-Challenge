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

    public function download($id)
    {
        // Find the file by ID
        $file = File::findOrFail($id);

        // Get the relative file path from the database
        $relativePath = $file->path;

        // Construct the absolute file path
        $filePath = storage_path('app/' . $relativePath);

        // Check if the file exists
        if (!file_exists($filePath)) {
            return response()->json(['error' => 'File not found.'], 404);
        }

        // Return the file as a response with the content-disposition header
        return response()->download($filePath, $file->name, [
            'Content-Disposition' => 'attachment; filename="' . $file->name . '"'
        ]);
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
        $file->directory_id = $request->input('directory_id', null); 
        $file->save();
    
        return response()->json($file, 201);
    }

    public function update(Request $request, $id)
    {
        $file = File::findOrFail($id);
        $file->name = $request->name;
        $file->directory_id = $request->directory_id;
    
        // Assuming the path can be derived from the name
        $file->path = storage_path('app/files/' . $request->name);
    
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
