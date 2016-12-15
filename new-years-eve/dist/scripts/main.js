$(document).ready(function() {
	$("#contactoform").on('submit', function() {
        var that = $(this),
            url = that.attr('action'),
            type = that.attr('method'),
            data = {};
        that.find('[name]').each(function(index, value) {
            var that = $(this),
                name = that.attr('name'),
                value = that.val();
            data[name] = value;
        });
        $.ajax({
            url: url,
            type: type,
            data: data,
            success: function(response) {
                var respuesta = JSON.parse(response);
                if (respuesta.success) {
                    // swal(respuesta.message, "", "success");
                    alert('Enviado');
                    that.trigger('reset');
                } else { 
                    // swal(respuesta.message, "", "error");
                    alert('Ops, hubo un error');
                }

            }
        });
        return false;
    });
});