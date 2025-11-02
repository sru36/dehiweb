// src/data/ngoPartners.ts

import ngo1 from "@/data/logo/H.png";
import ngo2 from "@/data/logo/M.png";
import ngo3 from "@/data/logo/MY.png";
import ngo4 from "@/data/logo/R.jpeg";
import ngo5 from "@/data/logo/HA (1).png";
import ngo6 from "@/data/logo/HA (2).png";

// Define the type of each partner entry
export interface NgoPartner {
  src: string;
  alt: string;
}

// Export the array of partners
export const ngoPartners: NgoPartner[] = [
  { src: ngo1, alt: "NGO 1" },
  { src: ngo2, alt: "NGO 2" },
  { src: ngo3, alt: "NGO 3" },
  { src: ngo4, alt: "NGO 4" },
  { src: ngo5, alt: "NGO 5" },
  { src: ngo6, alt: "NGO 6" },
];
