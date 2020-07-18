import swal from "sweetalert";

export function sucess(msg: string, redirect: Function) {
  swal("Bom trabalho", msg, "success").then((value) => {
    redirect();
  });
}

export function error(msg: string, func: Function) {
  swal({
    title: "Atenção",
    text: msg,
    icon: "warning",
    buttons: ["Cancelar", "Ok"],
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      return func().then((resp: any) => {
        swal("Registro deletado com sucesso", {
          icon: "success",
        });
      });
    }
  });
}
