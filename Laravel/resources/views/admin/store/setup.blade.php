@extends('layouts.dashboard')

@section('content')
    <h1>Shopify Store Setup</h1>

    @if(session('message'))
        <div class="alert alert-success">
            {{ session('message') }}
        </div>
    @endif
    <form method="POST" action = "{{route('admin.store.save')}}">
        {{csrf_field()}}
        <div class='form-group'>
            <label>Store Domain</label>
            <input type='text' name='url' value="@if(isset($store)) {{$store->base_url}}@endif"  placeholder='you shopify domain url : fiverrmarketplaces.myshopify.com' class='form-control' value='' />
        </div>
        <div class='form-group'>
            <label>Api Key</label>
            <input type='text' name='apikey' value="@if(isset($store)) {{$store->client_id}}@endif" class='form-control' value='' />
        </div>
        <div class='form-group'>
            <label>Admin Api Access Token</label>
            <input type='text' name='access_token' value="@if(isset($store)) {{$store->client_secret}}@endif"   class='form-control' value='' />
        </div>
        <div class='form-group'>
            <label>Admin Api Version</label>
            <input type='text' name='version'   class='form-control' value='' />
        </div>

        <div class='text-center'>
            <input type='submit' value='connect' class='btn btn-danger' />
        </div>
    </form>

    </div>
</div>

@endsection