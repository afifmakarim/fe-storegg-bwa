import { ComponentStory, ComponentMeta, Meta } from "@storybook/react";
import StepItem, {
  StepItemProps,
} from "../../../../components/moleculs/StepItem";

export default {
  title: "Components/Molecules/StepItem",
  component: StepItem,
} as Meta;

const Template = (args: StepItemProps) => <StepItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Super Mechs",
  icon: "step1",
  desc1: "Pilih salah satu game",
  desc2: "yang ingin kamu top up",
};
