<head>
    <script src="js/jquery-4.0.0.min.js"></script>
    <script src="js/principal.js"></script>
    <link rel="stylesheet" href="css/estilo.css">
</head>
<body>
    <h2 class="texto_cambiar">Titulo de sección</h2>
    <p class="texto_cambiar">Lorem ipsum dolor sit.</p>
    <p>
        <?php
        echo 'Texto que No cambia de tamaño';
        ?>
    </p>
    <div class="parte_final">
        <h2 class="texto_cambiar">último titulo</h2>
        <p class="texto_cambiar">Lorem ipsum dolor sit amet.</p>
    </div>
    <div class="controles">
        <p><span id="subir">Aumentar</span></p><br>
        <p><span id="subir">Disminuir</span></p>
    </div>
</body>