import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DonationCampaign } from "@/data/donationCampaigns";
import { Heart } from "lucide-react";

interface DonationCardProps {
  campaign: DonationCampaign;
}

export function DonationCard({ campaign }: DonationCardProps) {
  return (
    <div className="w-80 flex-shrink-0 rounded-xl overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 group">
      {/* Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center overflow-hidden">
        {campaign.imageUrl ? (
          <img
            src={campaign.imageUrl}
            alt={campaign.titleEn}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center text-red-300">
            <Heart className="h-16 w-16 opacity-50" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Bilingual Title */}
        <h3 className="text-base font-bold text-gray-900 leading-snug">
          {campaign.titleEn}
        </h3>
        <h3 className="text-sm font-semibold text-gray-700 mt-1" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          {campaign.titleHi}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm text-gray-700 leading-relaxed">
          {campaign.descriptionEn}
        </p>

        {/* Donation Amount */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-lg font-bold text-red-600">
            ₹{campaign.suggestedAmount.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 font-medium">
            Suggested amount
          </div>
        </div>

        {/* CTA Button */}
        <Link to="/donate" className="block w-full mt-4">
          <Button
            size="sm"
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Heart className="h-4 w-4" />
            Donate Now
          </Button>
        </Link>

        {/* Emotional Tagline */}
        <p className="mt-3 text-xs text-gray-600 italic text-center">
          "Your kindness can change a life today."
        </p>
      </div>
    </div>
  );
}
