@extends('layouts.dashboard')

@section('content')
    <h1>NTW ORDERS</h1>

  
    <table class="table table-bordered table-responsive">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            @foreach($users as $user)
             
            <tr>
                <td>{{$user->id}}</td>
                <td>{{$user->name}}</td>
                <td>{{$user->email}}</td>
            </tr>       
            @endforeach
        </tbody>
    </table>
    

    </div>
</div>

@endsection