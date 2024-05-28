import { useState, useEffect } from "react";
import { Container, Text, VStack, IconButton, Select, Input, Box, HStack } from "@chakra-ui/react";
import { FaMicrophone } from "react-icons/fa";

const Index = () => {
  const [openAIBaseUrl, setOpenAIBaseUrl] = useState("");
  const [openAIApiKey, setOpenAIApiKey] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("es"); // Default to Spanish
  const [transcribedText, setTranscribedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const languages = [
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
  ];

  const handleMicrophoneClick = async () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setTranscribedText(transcript);
      const translated = await translateText(transcript);
      setTranslatedText(translated);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    recognition.start();
  };

  const translateText = async (text) => {
    const response = await fetch(`${openAIBaseUrl}/v1/engines/davinci-codex/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAIApiKey}`,
      },
      body: JSON.stringify({
        prompt: `Translate the following text to ${languages.find((lang) => lang.code === selectedLanguage).name}: ${text}`,
        max_tokens: 60,
      }),
    });

    const data = await response.json();
    return data.choices[0].text.trim();
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" background="linear-gradient(to bottom, #000000, #000000)">
      <VStack spacing={4} width="100%">
        <HStack spacing={4} width="100%">
          <Input placeholder="Base URL" value={openAIBaseUrl} onChange={(e) => setOpenAIBaseUrl(e.target.value)} color="white" />
          <Input placeholder="API KEY" value={openAIApiKey} onChange={(e) => setOpenAIApiKey(e.target.value)} color="white" />
        </HStack>
        <Select placeholder="Select language" value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </Select>
        <IconButton aria-label="Start voice recognition" icon={<FaMicrophone />} size="lg" colorScheme="green" onClick={handleMicrophoneClick} />
        <Box width="100%" p={4} borderWidth={1} borderRadius="md">
          <Text fontSize="lg" color="white">
            Transcribed Text:
          </Text>
          <Text color="white">{transcribedText}</Text>
        </Box>
        <Box width="100%" p={4} borderWidth={1} borderRadius="md">
          <Text fontSize="lg" color="white">
            Translated Text:
          </Text>
          <Text color="white">{translatedText}</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
