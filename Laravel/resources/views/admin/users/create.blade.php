@extends('layouts.dashboard')

@section('content')
    <h1>Users</h1>

  
    <form action="{{route('admin.user.store')}}" method='POST' >
        
        <div class='form-group'>
              {{ csrf_field() }}

            <label>Name</label>
            <input type='text' class='form-control' name='name' placeholder='name' />
        </div>
        <div class='form-group'>
            <label>email</label>
            <input type='email' class='form-control' name='email' placeholder='email' />
        </div>
        <div class='form-group'>
            <label>password</label>
            <input type='password' class='form-control' name='password' placeholder='password' />
        </div>
        <div class='text-center'>
            <input type='submit' class='btn btn-danger' value='Create User' />
        </div>
        
    </form>
    

    </div>
</div>

@endsection