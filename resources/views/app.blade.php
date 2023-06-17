<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Foof lovers') }}</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;600&family=STIX+Two+Text:wght@400;500&family=The+Girl+Next+Door&display=swap" rel="stylesheet">


    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
</head>
<body class="font-sans antialiased ">
    @inertia
</body>
</html>
