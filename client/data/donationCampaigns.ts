import cow from "@/data/cow.png";
import dogs from "@/data/dogs.png";
import kind from "@/data/kind.png";
import h from "@/data/h.png";
import orphan from "@/data/orphan.png";
import elder from "@/data/elder.png";
import poor from "@/data/poor.png";
import sew from "@/data/sew.png";
import girl from "@/data/girl.png";
import shoe from "@/data/shoe.png";
import lamp from "@/data/lamp.png";
import tree from "@/data/tree.png";
import sonu from "@/data/sonu.png";

export interface DonationCampaign {
  id: number;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  suggestedAmount: number;
  imageUrl: string;
}

export const donationCampaigns: DonationCampaign[] = [
  {
    id: 1,
    titleEn: "Feed 3 Cows for ₹1100",
    titleHi: "सिर्फ ₹1100 में 3 गायों को भोजन कराएं",
    descriptionEn: "Your kindness will bring food to sacred cows who go hungry every day.",
    descriptionHi: "आपकी दया से पवित्र गायों को रोज भोजन मिलेगा जो भूखी रहती हैं।",
    suggestedAmount: 1100,
    imageUrl: cow,
  },
  {
    id: 2,
    titleEn: "Help Sonu Buy His First Books",
    titleHi: "सोनू की पहली किताबों के लिए मदद करें",
    descriptionEn: "A small step that fuels a child's big dreams of education.",
    descriptionHi: "एक छोटा सा कदम जो बच्चे के शिक्षा के सपनों को बड़ा करता है।",
    suggestedAmount: 500,
    imageUrl: sonu,
  },
  {
    id: 3,
    titleEn: "Save a Life with ₹50",
    titleHi: "सिर्फ ₹50 में किसी की जान बचाएं",
    descriptionEn: "Even the smallest contribution can make someone's tomorrow possible.",
    descriptionHi: "छोटा सा योगदान भी किसी का कल बदल सकता है।",
    suggestedAmount: 50,
    imageUrl: kind,
  },
  {
    id: 4,
    titleEn: "Feed 10 Stray Dogs for ₹1000",
    titleHi: "₹1000 में 10 आवारा कुत्तों को खाना खिलाएं",
    descriptionEn: "Bring warmth and love to helpless strays waiting for a meal.",
    descriptionHi: "बेसहारा जानवरों को प्यार और खाना देकर उन्हें गर्माहट दें।",
    suggestedAmount: 1000,
    imageUrl: dogs,
  },
  {
    id: 5,
    titleEn: "Support Rani's Heart Surgery",
    titleHi: "रानी की हार्ट सर्जरी में मदद करें",
    descriptionEn: "Help this 7-year-old fight her battle for life with your blessings.",
    descriptionHi: "7 साल की रानी को अपना आशीर्वाद देकर जीवन की लड़ाई जीतने में मदद करें।",
    suggestedAmount: 2500,
    imageUrl: h,
  },
  {
    id: 6,
    titleEn: "Light a Village with Solar Lamps",
    titleHi: "गाँव में रोशनी फैलाएं",
    descriptionEn: "Your donation can bring sustainable light to rural homes.",
    descriptionHi: "आपका दान गाँव के घरों में हमेशा के लिए रोशनी ला सकता है।",
    suggestedAmount: 700,
    imageUrl: lamp,
  },
  {
    id: 7,
    titleEn: "Sponsor a Blanket for the Homeless",
    titleHi: "ठंड से किसी की रक्षा करें",
    descriptionEn: "One blanket can protect a life during chilling winter nights.",
    descriptionHi: "एक कंबल सर्दी की ठंडी रात में किसी की जान बचा सकता है।",
    suggestedAmount: 300,
    imageUrl: orphan,
  },
  {
    id: 8,
    titleEn: "Gift Clean Water to 5 Families",
    titleHi: "5 परिवारों को स्वच्छ जल दिलाएं",
    descriptionEn: "Provide access to safe drinking water and prevent diseases.",
    descriptionHi: "स्वच्छ पानी से परिवारों को स्वास्थ्य का उपहार दें।",
    suggestedAmount: 800,
    imageUrl: poor,
  },
  {
    id: 9,
    titleEn: "Feed Orphaned Kids for ₹600",
    titleHi: "अनाथ बच्चों को भोजन दिलाएं",
    descriptionEn: "Every plate you fill brings a smile to a child who needs hope.",
    descriptionHi: "हर प्लेट भरने से एक बच्चे के चेहरे पर मुस्कान आती है।",
    suggestedAmount: 600,
    imageUrl: orphan,
  },
  {
    id: 10,
    titleEn: "Help Rekha Learn Stitching Work",
    titleHi: "रेखा की सिलाई मशीन में सहयोग करें",
    descriptionEn: "Empower a woman to earn and live with dignity.",
    descriptionHi: "एक महिला को आत्मनिर्भर बनाकर उसे गरिमा से जीने का अधिकार दें।",
    suggestedAmount: 1200,
    imageUrl: sew,
  },
  {
    id: 11,
    titleEn: "Plant 10 Trees for ₹450",
    titleHi: "प्रकृति को जीवन दें",
    descriptionEn: "A small seed from you can grow into a green tomorrow.",
    descriptionHi: "आपका दान कल को हरा-भरा बना सकता है।",
    suggestedAmount: 450,
    imageUrl: tree,
  },
  {
    id: 12,
    titleEn: "Buy School Shoes for Slum Kids",
    titleHi: "झुग्गी के बच्चों के लिए स्कूल के जूते",
    descriptionEn: "Give comfort and confidence to children walking miles barefoot.",
    descriptionHi: "नंगे पैर चलने वाले बच्चों को आत्मविश्वास और आराम दें।",
    suggestedAmount: 400,
    imageUrl: shoe,
  },
  {
    id: 13,
    titleEn: "Provide Meals to a Senior Citizen",
    titleHi: "किसी बुज़ुर्ग की भूख मिटाएं",
    descriptionEn: "Respect the elders who raised us — feed them with love.",
    descriptionHi: "उन बुजुर्गों को प्यार से खिलाएं जिन्होंने हमें पाला।",
    suggestedAmount: 750,
    imageUrl: elder,
  },
  {
    id: 14,
    titleEn: "Build a Shelter for Street Dogs",
    titleHi: "स्ट्रीट डॉग्स के लिए आश्रय बनाएं",
    descriptionEn: "Offer safety and shade to voiceless beings under the sun.",
    descriptionHi: "बेजुबान जानवरों को सूरज से छाया और सुरक्षा दें।",
    suggestedAmount: 1500,
    imageUrl: dogs,
  },
  {
    id: 15,
    titleEn: "Support a Girl's Education",
    titleHi: "बेटी को पढ़ाई का हक़ दें",
    descriptionEn: "Because when a girl studies, the whole family rises.",
    descriptionHi: "जब बेटी पढ़ती है तो पूरा परिवार आगे बढ़ता है।",
    suggestedAmount: 1000,
    imageUrl: girl,
  }
];
