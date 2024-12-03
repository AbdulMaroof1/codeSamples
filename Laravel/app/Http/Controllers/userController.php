<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class userController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function store(request $request)
    {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return redirect()->route('admin.users.index');
    }
    public function index(request $request)
    {
        $users = User::all()->sortByDesc("id");
        return view('admin.users.index')->with('users',$users);
    }
    public function create(request $request)
    {
        return view('admin.users.create');
    }
    
    
}