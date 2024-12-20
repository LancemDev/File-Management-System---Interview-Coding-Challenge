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
        $file = new File();
        $file->name = $request->name;
        $file->path = $request->path;
        $file->directory_id = $request->directory_id;
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
