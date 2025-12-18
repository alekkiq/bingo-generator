import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import GeneratorLayout from "@/components/GeneratorLayout";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth={"lg"}>
      <GeneratorLayout />
    </Container>
  );
}
