import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Scale, DollarSign, Award } from "lucide-react";

interface Lesson4QualityStoryProps {
  onComplete: () => void;
}

export default function Lesson4QualityStory({
  onComplete,
}: Lesson4QualityStoryProps) {
  const [page, setPage] = useState(0);

  const pages = [
    {
      title: "Quality vs. Price",
      text: "Sometimes the cheapest option isn't the best choice! Learning when to spend more for better quality is an important shopping skill.",
      icon: Scale,
    },
    {
      title: "The Cheap Shoes Story",
      text: "Sam bought $20 shoes instead of $60 ones. After 2 months, they fell apart. He had to buy new shoes again. Total spent: $40 - and still no good shoes!",
      icon: DollarSign,
    },
    {
      title: "The Smart Investment",
      text: "Meanwhile, his friend bought the $60 quality shoes. One year later, they still look great! Sometimes paying more upfront saves money long-term.",
      icon: Award,
    },
    {
      title: "When to Choose Quality",
      text: "Spend more on items you'll use often or for a long time: shoes, backpacks, winter coats, tech that you rely on. Go cheaper on: trendy items, things that won't last anyway, or items you'll outgrow quickly.",
      icon: Scale,
    },
    {
      title: "The Smart Question",
      text: "Before buying, ask yourself: 'How long will I use this?' If the answer is 'a long time,' quality matters. If it's 'just this season' or 'until the trend changes,' cheaper might be fine!",
      icon: Award,
    },
  ];

  const currentPage = pages[page];
  const Icon = currentPage.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Card className="p-8 space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Icon className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">{currentPage.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {currentPage.text}
            </p>
          </div>

          {page === 1 && (
            <Card className="p-4 bg-red-50 dark:bg-red-950/30">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Cheap shoes (Month 1):</span>
                  <span className="font-bold">$20</span>
                </div>
                <div className="flex justify-between">
                  <span>Replacement (Month 3):</span>
                  <span className="font-bold">$20</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-bold">Total in 1 year:</span>
                  <span className="font-bold text-red-600">
                    $80+ (4 pairs!)
                  </span>
                </div>
              </div>
            </Card>
          )}

          {page === 2 && (
            <Card className="p-4 bg-green-50 dark:bg-green-950/30">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Quality shoes (Month 1):</span>
                  <span className="font-bold">$60</span>
                </div>
                <div className="flex justify-between">
                  <span>Still great after 1 year:</span>
                  <span className="font-bold">$0</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-bold">Total in 1 year:</span>
                  <span className="font-bold text-green-600">
                    $60 (1 pair!)
                  </span>
                </div>
              </div>
            </Card>
          )}

          {page === 3 && (
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4 bg-purple-50 dark:bg-purple-950/30">
                <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">
                  ✓ Worth the Investment
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• School backpack</li>
                  <li>• Winter coat</li>
                  <li>• Phone or laptop</li>
                  <li>• Good shoes</li>
                </ul>
              </Card>
              <Card className="p-4 bg-blue-50 dark:bg-blue-950/30">
                <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">
                  ✓ Okay to Go Cheaper
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• Trendy accessories</li>
                  <li>• Party decorations</li>
                  <li>• Halloween costume</li>
                  <li>• Phone case</li>
                </ul>
              </Card>
            </div>
          )}

          <div className="flex gap-2 justify-center">
            {pages.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === page
                    ? "w-8 bg-green-500"
                    : "w-2 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            {page > 0 && (
              <Button variant="outline" onClick={() => setPage(page - 1)}>
                Back
              </Button>
            )}
            <Button
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              onClick={() => {
                if (page < pages.length - 1) {
                  setPage(page + 1);
                } else {
                  onComplete();
                }
              }}
            >
              {page < pages.length - 1 ? "Next" : "Got It!"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
