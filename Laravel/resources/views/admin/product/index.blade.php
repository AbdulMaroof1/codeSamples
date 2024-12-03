@extends('layouts.dashboard')

@section('content')
    <h1>Dealer Products</h1>
    <a href="{{ route('admin.products.sync') }}" class='btn btn-danger'>Fetch Products</a> |||  <a href="{{ route('admin.products.sync.shopify') }}" class='btn btn-danger'>Sync Products To Shopify</a>
    <br>
    <br>
    <div class="table-responsive">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>code</th>
                    <th>product Json</th>
                    <th>total variant</th>
                    <th>shopify Id</th>
                </tr>
            </thead>
            <tbody>
               @foreach($products as $product)
                <tr>
                    <td>{{ $product->simpleCode }}</td>
                    <td><a href="{{route('admin.products.structure',[ 'id' => $product->id ])}}">View</a></td>
                    <td><a href="#">{{$product->variantsCount}}</a></td>
                    <td><a href="#">{{$product->shopify_product_id}}</a></td>
           
                </tr>
               @endforeach
            </tbody>
        </table>
        <!-- Pagination -->
        <div class="d-flex justify-content-center">
            <ul class="pagination">
                @for ($i = 1; $i <= $products->lastPage(); $i++)
                    <li class="page-item {{ $i == $products->currentPage() ? 'active' : '' }}">
                        <a class="page-link" href="{{ $products->url($i) }}">{{ $i }}</a>
                    </li>
                @endfor
            </ul>
        </div>
    </div>
</div>
@endsection
