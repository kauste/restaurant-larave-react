<div class="container">
    <div class="row justify-content-center">
        @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
        @endif
    </div>
</div>
