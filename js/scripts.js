function validacionFormulario(){

      let correo= document.getElementById("txtEmail").value;
      let asunto= document.getElementById("txtAsunto").value;
      let mensaje = document.getElementById("txtMensaje").value;
      let sexo=document.getElementById("cboSexo").value;
      let edad= parseInt( document.getElementById("txtEdad").value );
      if(asunto.length<3){
        alert("el asunto debe tener un minimo de 3 caracteres")
        return false;
      }
      if(edad<18){
        alert("solo mayores de edad")
        return false;
      }
    }