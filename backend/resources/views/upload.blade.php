<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload test from Laravel view</title>
</head>
<body>
    <form action="{{ route('api.files') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <input type="file" name="file">
        <input type="submit" value="Upload">
    </form>
</body>
</html>