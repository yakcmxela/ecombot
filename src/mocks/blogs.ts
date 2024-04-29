import { Blog, BlogsResponse } from "@/types/Blog";
import { v4 as uuidv4 } from "uuid";

export const getBlogMocks = async (): Promise<BlogsResponse> => {
  const response =
    "In a typical scenario, I would be returning real data from the API, providing you with accurate and relevant information. However, since this is a demo environment, I'm currently generating mock content to showcase the functionality and demonstrate how the system would behave under normal circumstances.";
  const blogs: Blog[] = [
    {
      id: uuidv4(),
      readingTime: "5 min read",
      author: "Captain Blackbeard Bones",
      url: "https://github.com/yakcmxela",
      title:
        "Crustacean Chronicles: Exploring the Hidden Lives of Underwater Crustaceans",
      content:
        "Explore the world of crustaceans with our in-depth blog, uncovering the hidden lives of crabs, lobsters, and shrimp in their diverse habitats.",
    },
    {
      id: uuidv4(),
      readingTime: "10 min read",
      author: "Red Anne Rackham",
      url: "https://github.com/yakcmxela",
      title:
        "Deep Dive into Crustacean Ecology: From Coral Reefs to Ocean Depths",
      content:
        "Dive into the fascinating world of crustaceans through our blog series, delving into their unique adaptations, behaviors, and ecological importance.",
    },
    {
      id: uuidv4(),
      readingTime: "15 min read",
      author: "Long John Silverhook",
      url: "https://github.com/yakcmxela",
      title:
        "The Wonders of Crustaceans: A Visual Journey through Marine Marvels",
      content:
        "Discover the wonders of crustaceans in our blog, from the colorful coral reefs where they thrive to the depths of the ocean where mysterious creatures dwell.",
    },
    {
      id: uuidv4(),
      readingTime: "20 min read",
      author: "Mad Dog Morgan",
      url: "https://github.com/yakcmxela",
      title: "Crustacean Odyssey: Evolution, Behavior, and Ecosystem Impact",
      content:
        "Learn about the extraordinary world of crustaceans in our blog, featuring captivating stories, stunning images, and fascinating facts about these marine marvels.",
    },
    {
      id: uuidv4(),
      readingTime: "25 min read",
      author: "Calico Jack Cutlass",
      url: "https://github.com/yakcmxela",
      title:
        "Claws, Shells, and Barnacles: The Intriguing World of Crustaceans",
      content:
        "Join us on a journey to unravel the secrets of crustaceans in our blog, as we delve into their evolutionary history, intriguing behaviors, and vital roles in marine ecosystems.",
    },
    {
      id: uuidv4(),
      readingTime: "30 min read",
      author: "Iron-eyed Isabella Thunderstruck",
      url: "https://github.com/yakcmxela",
      title:
        "Sailing the Seven Seas: A Swashbuckling Journey into the World of Pirates",
      content:
        "Join us on a thrilling voyage as we delve into the captivating history, daring exploits, and legendary lore of pirates. From the infamous buccaneers of the Caribbean to the fearless privateers of the Golden Age of Piracy, discover the allure and intrigue of life on the high seas.",
    },
  ];
  return {
    blogs,
    response,
  };
};
