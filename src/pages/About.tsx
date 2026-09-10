import { AboutExperience } from "../components/about/AboutExperience";

export function About({ navigate }: { navigate: (to: string) => void }) {
  return <AboutExperience navigate={navigate} />;
}
