import CompleteSection from "@/components/Section/completeSection";
import Card from "../../components/Section/card"

export default function Home() {
  return (
    <>
    <CompleteSection heading="Splitter AI" 
    subheading="Split music into separated parts with AI-Powered algorithms" />
    <Card title="Splitter" content="This app allows to separate music into an individual streams such as vocal, bass, percussion, and lets you rebalance their individual volumes. This is the simplest way to get multitracks from any song.
Once you choose a song, artificial intelligence will separate music into stems: vocals, bass, drums, others. Processing usually takes about 1 minute.
"/>
</>
  );
}
