<!DOCTYPE html>
<html>
<head>
 <title>New Admission Request</title>
</head>
<body>
 
 <h1>Dear Admin</h1>
 <h1>New Admission Request Has Been Creatd With Following Details</h1>

 @foreach($data as $key => $value)
    <p>{{$key}} : {{$value}}</p>
 @endforeach
 
</body>
</html> 