import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { ArrowRightIcon } from "lucide-react";

interface Props {
  onComplete: () => void;
}

const storyPages = [
  {
    emoji: "🛡️",
    title: "The Security Oasis",
    text: "Cyrus leads you to a shimmering oasis. \"This is where we learn the most important lesson of Digital Dunes: how to protect your money and information from digital dangers.\"",
  },
  {
    emoji: "🔐",
    title: "Passwords Are Keys",
    text: "\"Think of passwords as keys to your treasure chest. A strong password is like a complex lock - hard for thieves to pick! Use a mix of letters, numbers, and symbols. Never use simple passwords like '123456' or 'password'.\"",
  },
  {
    emoji: "🚫",
    title: "What NEVER to Share",
    text: "NEVER share these online: Your full social security number, all credit/debit card details, online banking passwords, verification codes sent to your phone, or your home address to strangers. Real companies will NEVER ask for passwords!",
  },
  {
    emoji: "👥",
    title: "The Two-Factor Shield",
    text: "\"Two-factor authentication (2FA) is like having two locks instead of one,\" explains Cyrus. \"Even if someone steals your password, they can't get in without the code sent to YOUR phone. Always enable 2FA!\"",
  },
  {
    emoji: "🌐",
    title: "Public WiFi Dangers",
    text: "\"Be careful with public WiFi at cafes or airports! Hackers can spy on your activity. Never do banking or enter passwords on public WiFi. Use your phone's data connection for sensitive activities instead.\"",
  },
  {
    emoji: "✅",
    title: "The Golden Rules",
    text: "Remember: Use strong, unique passwords. Enable two-factor authentication. Never share sensitive info. Avoid public WiFi for banking. Keep your apps updated. Check for 'https' and the lock symbol on websites. Stay alert!",
  },
];

export default function Lesson3Story({ onComplete }: Props) {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage < storyPages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onComplete();
    }
  };

  const page = storyPages[currentPage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950 p-4">
      <div className="mx-auto max-w-2xl pt-8">
        <Card className="border-2 border-orange-300 dark:border-orange-700">
          <CardHeader className="space-y-4 text-center">
            <div className="text-8xl">{page.emoji}</div>
            <CardTitle className="text-3xl font-bold text-orange-900 dark:text-orange-100">
              {page.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg leading-relaxed text-foreground">
              {page.text}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Page {currentPage + 1} of {storyPages.length}
              </span>
              <Button
                size="lg"
                onClick={handleNext}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
              >
                {currentPage < storyPages.length - 1 ? (
                  <>
                    Next
                    <ArrowRightIcon className="ml-2 size-4" />
                  </>
                ) : (
                  "Complete Lesson"
                )}
              </Button>
            </div>

            <div className="flex gap-1">
              {storyPages.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    index <= currentPage
                      ? "bg-gradient-to-r from-orange-500 to-amber-500"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
