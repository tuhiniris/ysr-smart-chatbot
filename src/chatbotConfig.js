import { createChatBotMessage } from "react-chatbot-kit";
import Overview from "./widgets/Overview";
import SearchLink from "./widgets/SearchOptions";
import Department from "./widgets/Department";
import CardSearch from "./widgets/CardSearch";
import HospitalSearchGroup from "./widgets/HospitalSearchGroup";
import CoBotAvatar from "./CoBotAvatar";
import LinkList from "./widgets/LinkList/LinkList";
import MayHelp from "./widgets/MayHelp";
import ProcedureSearch from "./widgets/ProcedureSearch";
import HospitalSearch from "./widgets/HospitalSearch";
import DistrictSearch from "./widgets/DistrictSearch";
import CaseSearch from "./widgets/CaseSearch";
import CaseNumberSearch from "./widgets/CaseNumberSearch";
import CaseUhidSearch from "./widgets/CaseUhidSearch";
import CardAadharSearch from "./widgets/CardAadharSearch";
import CardUhidSearch from "./widgets/CardUhidSearch";

const config = {
  lang: "no",
  botName: "Dr. YSR Aarogyasri Scheme Guide",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#2898ec"
    },
    chatButton: {
      backgroundColor: "#4361ee"
    }
  },
  initialMessages: [
    createChatBotMessage(`Hello Citizen 🙏 I am your friendly assistant !!`),
    // createChatBotMessage(`I'm here to help. What do you want to know?`),
    createChatBotMessage(
      "Here's a quick overview of what I can help you with. Choose a topic or write something below to get started.",
      {
        withAvatar: true,
        delay: 3000,
        widget: "overview"
      }
    )
  ],
  state: {},
  customComponents: { botAvatar: props => <CoBotAvatar {...props} /> },
  widgets: [
    {
      widgetName: "overview",
      widgetFunc: props => <Overview {...props} />,
      mapStateToProps: ["messages"]
    },
    {
      widgetName: "CardSearch",
      //widgetFunc: (props) => <RequestFeedback hidden={false} handleYesNo={handleFeedbackRequest} />
      widgetFunc: props => <CardSearch {...props} />
    },
    {
      widgetName: "card_aadhar",
      //widgetFunc: (props) => <RequestFeedback hidden={false} handleYesNo={handleFeedbackRequest} />
      widgetFunc: props => <CardAadharSearch {...props} />
    },
    {
      widgetName: "card_uhid",
      //widgetFunc: (props) => <RequestFeedback hidden={false} handleYesNo={handleFeedbackRequest} />
      widgetFunc: props => <CardUhidSearch {...props} />
    },
    {
      widgetName: "CaseSearch",
      //widgetFunc: (props) => <RequestFeedback hidden={false} handleYesNo={handleFeedbackRequest} />
      widgetFunc: props => <CaseSearch {...props} />
    },
    {
      widgetName: "case_number",
      //widgetFunc: (props) => <RequestFeedback hidden={false} handleYesNo={handleFeedbackRequest} />
      widgetFunc: props => <CaseNumberSearch {...props} />
    },
    {
      widgetName: "uhid",
      //widgetFunc: (props) => <RequestFeedback hidden={false} handleYesNo={handleFeedbackRequest} />
      widgetFunc: props => <CaseUhidSearch {...props} />
    },
    {
      widgetName: "RangeSearch",
      //widgetFunc: (props) => <RequestFeedback hidden={false} handleYesNo={handleFeedbackRequest} />
      widgetFunc: props => <HospitalSearchGroup {...props} />
    },
    {
      widgetName: "HelpYou",
      //widgetFunc: (props) => <RequestFeedback hidden={false} handleYesNo={handleFeedbackRequest} />
      widgetFunc: props => <MayHelp {...props} />
    },
    {
      widgetName: "info",
      // widgetFunc: (props) => <Contact/>
      widgetFunc: props => <SearchLink {...props} />
    },
    {
      widgetName: "ProcedureSearch",
      widgetFunc: props => <ProcedureSearch {...props} />
    },
    {
      widgetName: "hosp_search",
      widgetFunc: props => <DistrictSearch {...props} />
    },
    {
      widgetName: "gps_search",
      widgetFunc: props => <HospitalSearch {...props} />
    },
    {
      widgetName: "linklist",
      widgetFunc: props => <LinkList {...props} />,
      props: {
        options: [
          {
            text: {
              name: "Akash",
              designation: "Manager",
              Contact: "8902749732",
              URL: "https://www.jharkhand.gov.in/food"
            },
            url: "https://www.jharkhand.gov.in/food",
            id: 1
          }
        ]
      }
    },

    {
      widgetName: "linklist1",
      widgetFunc: props => <LinkList {...props} />,
      props: {
        options: [
          {
            text: {
              name: "Sudipta",
              designation: "Manager",
              Contact: "9038528963",
              URL: "https://www.jharkhand.gov.in/school"
            },
            url: "https://www.jharkhand.gov.in/school",
            id: 2
          }
        ]
      }
    },
    {
      widgetName: "linklist2",
      widgetFunc: props => <LinkList {...props} />,
      props: {
        options: [
          {
            text: {
              name: "Paresh",
              designation: "Manager",
              Contact: "6290438103",
              URL: "https://www.jharkhand.gov.in/labour"
            },
            url: "https://www.jharkhand.gov.in/labour",
            id: 3
          }
        ]
      }
    },
    {
      widgetName: "linklist3",
      widgetFunc: props => <LinkList {...props} />,
      props: {
        options: [
          {
            text: {
              name: "Aniruddha",
              designation: "Manager",
              Contact: "8017290475",
              URL: "https://www.jharkhand.gov.in/welfare"
            },
            url: "https://www.jharkhand.gov.in/welfare",
            id: 3
          }
        ]
      }
    }
  ]
};

export default config;
