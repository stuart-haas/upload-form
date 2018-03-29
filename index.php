<!doctype html>
<html lang="eng">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="css/index.css">
<form id="upload" method="post" action="php/upload.php" enctype="multipart/form-data">
	<div id="drop">Drop Here
    	<a id="browse">Browse</a>
        <a id="batch-ctrl">Batch Upload</a>
        <input type="file" name="upload" multiple>
    </div>
    <ul>
    </ul>
</form>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
<script src="../../js/jquery.ui.widget.js"></script>
<script src="../../js/jquery.iframe-transport.js"></script>
<script src="../../js/jquery.fileupload.js"></script>
<script src="../../js/load-image.all.min.js"></script>
<script src="js/upload.js"></script>
</html>