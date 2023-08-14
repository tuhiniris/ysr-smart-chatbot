import Swal from "sweetalert2";
// import MessageTranslator from "./MessageTranslator";

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    message = message.toLowerCase();
    console.log(message);
    const Toast = Swal.mixin({
      toast: true,
      position: "top",

      showConfirmButton: false,
      timer: 1000,
      grow: "false",

      timerProgressBar: true,
      didOpen: toast => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      }
    });

    if (
      message.includes("options") ||
      message.includes("help") ||
      message.includes("do for me")
    ) {
      Toast.fire({
        icon: "success",
        title: "Recognition Successful"
      });
      return this.actionProvider.handleGrievanceInfo({ withAvatar: true });
    }

    if (
      message.includes("talk") ||
      message.includes("speak") ||
      message.includes("real person") ||
      message.includes("call") ||
      message.includes("emergency") ||
      message.includes("contact")
    ) {
      Toast.fire({
        icon: "success",
        title: "Recognition Successful"
      });
      return this.actionProvider.handleGrievanceInfo({ withAvatar: true });
    }

    if (message.includes("help") || message.includes("info")) {
      Toast.fire({
        icon: "success",
        title: "Recognition Successful"
      });
      return this.actionProvider.handleGrievanceInfo({ withAvatar: true });
    }

    if (
      message.includes("find hospital") ||
      message.includes("hospital") ||
      message.includes("search hospital")
    ) {
      Toast.fire({
        icon: "success",
        title: "Recognition Successful"
      });
      return this.actionProvider.handleInfo({ withAvatar: true });
    }

    if (
      message.includes("procedure") ||
      message.includes("search") ||
      message.includes("procedure search")
    ) {
      // MessageTranslator(message);
      Toast.fire({
        icon: "success",
        title: "Recognition Successful"
      });
      return this.actionProvider.handleProcedure({
        withAvatar: true
      });
    }

    if (message.includes("thanks") || message.includes("ఉల్లిపాయ")) {
      Toast.fire({
        icon: "success",
        title: "Recognition Successful"
      });

      return this.actionProvider.handleThanks({ withAvatar: true });
    }
    Toast.fire({
      icon: "warning",
      title: "Unrecognised Command"
    });
    return this.actionProvider.handleOptions({ withAvatar: true });
  }
}
//Please use this component for chatcommands and Telugu Stuff
export default MessageParser;
