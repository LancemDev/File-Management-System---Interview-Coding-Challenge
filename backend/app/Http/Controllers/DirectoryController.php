<?php

namespace App\Http\Controllers;

use App\Models\Directory;
use Illuminate\Http\Request;

class DirectoryController extends Controller
{
    public function index()
    {
        return Directory::all();
    }

    public function getSubDirectories($id)
    {
        return Directory::where('parent_id', $id)->get();
    }

    public function getFiles($id)
    {
        return Directory::findOrFail($id)->files;
    }

    public function store(Request $request)
    {
        $directory = new Directory();
        $directory->name = $request->name;
        $directory->parent_id = $request->parent_id;
        $directory->save();

        return response()->json($directory, 201);
    }

    public function update(Request $request, $id)
    {
        $directory = Directory::findOrFail($id);
        $directory->name = $request->name;
        $directory->parent_id = $request->parent_id;
        $directory->save();

        return response()->json($directory, 200);
    }

    public function destroy($id)
    {
        $directory = Directory::findOrFail($id);
        $directory->delete();

        return response()->json(null, 204);
    }
}
