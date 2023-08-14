import Options from "./Options";
import { darken, minHeight, Stack } from "@mui/system";
const colors = ["#2169b3", "#dbaf18", "#7bc04c", "#c00000", "#8a52b5"];
const GeneralOptions = props => {
  const options = [
    {
      name: "Card Search",
      handler: props.actionProvider.handleCardSearch,
      id: 5,
      colorcode: darken(colors[0], 0.2),
      icon: "ImageSearch"
    },
    ,
    {
      name: "Case Search",
      handler: props.actionProvider.handleCaseSearch,
      id: 6,
      colorcode: darken(colors[1], 0.2),
      icon: "CaseIcon"
    },
    {
      name: "Procedure Search",
      handler: props.actionProvider.handleProcedure,
      id: 7,
      colorcode: darken(colors[2], 0.2),
      icon: "ToolIcon"
    },
    ,
    {
      name: "Hospital Search",
      handler: props.actionProvider.handleInfo,
      id: 8,
      colorcode: darken(colors[3], 0.2),
      icon: "HospitalIcon"
    },
    {
      name: "Raise a Grievance",
      handler: props.actionProvider.handleGrievanceInfo,
      id: 9,
      colorcode: darken(colors[4], 0.2),
      icon: "LocalPhoneIcon"
    },
    {
      name: "May I Help You",
      handler: props.actionProvider.handleHelpYou,
      id: 10,
      colorcode: darken(colors[0], 0.2),
      icon: "LightbulbIcon"
    }
  ];
  return <Options options={options} title="Choose an Option" {...props} />;
};

export default GeneralOptions;
