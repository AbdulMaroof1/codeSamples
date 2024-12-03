@extends('layouts.dashboard')

@section('content')
    <h1>Stocks & Prices</h1>
    <a href="{{ route('admin.fetch.stocks') }}" class='btn btn-danger'>Fetch Stocks</a> |||  <a href="{{ route('admin.prices.fetch') }}" class='btn btn-danger'>Fetch Prices </a>
      <br>
    <br>
    <div class="table-responsive">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>code</th>
                    <th>Full Code</th>
                    <th>Stock</th>
                    <th>price</th>
                    <th>margin</th>
                    <th>Markup Price </th>
                </tr>
            </thead>
            <tbody>
               @foreach($products as $product)
                <tr>
                    <td>{{ $product->simpleCode }}</td>
                    <td>{{ $product->fullCode }}</td>
                    <td>{{ $product->stock }}</td>
                    <td>{{ $product->price }}</td>
                    <td>{{ $product->margin }}</td>
                    <td>{{ $product->markupprice }}</td>
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
