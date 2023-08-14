import Button from "@mui/material/Button";
import CallSharpIcon from "@mui/icons-material/CallSharp";
import LoadingBarAction from "./LoadingBarAction";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }
  handleOptions = options => {
    const message = this.createChatBotMessage(
      "How can I help you? Below are some possible options.",
      {
        widget: "overview",
        loading: true,
        terminateLoading: true,
        ...options
      }
    );

    this.addMessageToState(message);
  };

  handleThanks = () => {
    const message = this.createChatBotMessage("You're welcome, and stay safe!");
    this.addMessageToState(message);
  };

  handleCancel = () => {
    const message = this.createChatBotMessage(
      "Thank you so much , Lastly can you please tell us, if you are looking for anything in particular?"
    );
    this.addMessageToState(message);
  };

  handleFeedbackUpdate = () => {
    const message = this.createChatBotMessage(
      "Thank you so much for your valuable feedback. Lastly can you please tell us, if you are looking for anything in particular?"
    );
    this.addMessageToState(message);
  };

  handleGrievanceInfo = () => {
    const message = this.createChatBotMessage(
      <>
        We provide Grievance services from our dedicated call center team.
        Please avail the service by calling 104.<br></br>
        <Button
          startIcon={<CallSharpIcon />}
          sx={{ mt: 1, fontWeight: "bold" }}
          size="small"
          color="success"
          variant="contained"
        >
          <a
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "larger"
            }}
            href="tel:104"
          >
            104
          </a>
        </Button>
      </>
    );
    this.addMessageToState(message);
  };

  handleCardSearch = () => {
    const message = this.createChatBotMessage(
      "Please enter UHID or Aadhar Number",
      {
        widget: "CardSearch",
        loading: true,
        terminateLoading: true,
        withAvatar: true
      }
    );

    this.addMessageToState(message);
  };

  handleCaseSearch = () => {
    const message = this.createChatBotMessage("Find a Case", {
      widget: "CaseSearch",
      loading: true,
      terminateLoading: true,
      withAvatar: true
    });
    this.addMessageToState(message);
  };

  handleCardAadhar = () => {
    const message = this.createChatBotMessage(
      "Loading Card Search using Aadhar",
      {
        widget: "card_aadhar",
        loading: true,
        terminateLoading: true,
        withAvatar: true
      }
    );
    this.addMessageToState(message);
  };
  handleCardUhid = () => {
    const message = this.createChatBotMessage(
      "Loading Card Search using UHID",
      {
        widget: "card_uhid",
        loading: true,
        terminateLoading: true,
        withAvatar: true
      }
    );
    this.addMessageToState(message);
  };

  handleCaseNumber = () => {
    const message = this.createChatBotMessage(
      "Loading Case Search using Case Number",
      {
        widget: "case_number",
        loading: true,
        terminateLoading: true,
        withAvatar: true
      }
    );
    this.addMessageToState(message);
  };
  handleCaseUhid = () => {
    const message = this.createChatBotMessage(
      "Loading Case Search using UHID",
      {
        widget: "uhid",
        loading: true,
        terminateLoading: true,
        withAvatar: true
      }
    );
    this.addMessageToState(message);
  };

  handleHospitalSearch = () => {
    const message = this.createChatBotMessage("Find a Hospital", {
      widget: "RangeSearch",
      loading: true,
      terminateLoading: true,
      withAvatar: true
    });

    this.addMessageToState(message);
  };

  handleHelpYou = () => {
    const message = this.createChatBotMessage("Please enter your query", {
      widget: "HelpYou",
      loading: true,
      terminateLoading: true,
      withAvatar: true
    });

    this.addMessageToState(message);
  };

  handleProcedure = options => {
    const message = this.createChatBotMessage(
      "Please find the amounts based on procedure chosen",
      {
        widget: "ProcedureSearch",
        loading: true,
        terminateLoading: true,
        withAvatar: true
      }
    );
    this.addMessageToState(message);
  };
  handleDepartmentDetail = () => {
    const message = this.createChatBotMessage(
      "Selected Department : Food, Public Distribution and Consumer Affairs.",
      {
        widget: "linklist",
        loading: true,
        terminateLoading: true,
        withAvatar: true
      }
    );

    this.addMessageToState(message);
  };

  handleInfo = options => {
    const message = this.createChatBotMessage(
      "Select any option to get detailed information",
      {
        widget: "info",
        loading: true,
        terminateLoading: true,
        withAvatar: true
      }
    );
    this.addMessageToState(message);
  };

  handleDepartmentDetail1 = () => {
    const message = this.createChatBotMessage(
      "Selected Department : School Education and Literacy.",
      {
        widget: "linklist1",
        loading: true,
        terminateLoading: true,
        withAvatar: true
      }
    );

    this.addMessageToState(message);
  };

  handleInfoDetail1 = () => {
    const message = this.createChatBotMessage("Loading Search", {
      widget: "hosp_search",
      loading: true,
      terminateLoading: true,
      withAvatar: true
    });

    this.addMessageToState(message);
  };
  handleInfoDetail2 = () => {
    const message = this.createChatBotMessage(
      "Loading Search based on your current location",
      {
        widget: "gps_search",
        loading: true,
        terminateLoading: true,
        withAvatar: true
      }
    );

    this.addMessageToState(message);
  };

  handleFeedbackRequest = result => {
    if (result === "Yes") {
      console.log(result);
    }
    if (result === "No") {
      console.log(result);
    }
  };

  addMessageToState = message => {
    this.setState(state => ({
      ...state,
      messages: [...state.messages, message]
    }));
  };
}

export default ActionProvider;
