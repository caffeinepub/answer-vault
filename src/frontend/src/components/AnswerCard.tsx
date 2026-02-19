import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Share2, Check } from 'lucide-react';
import { toast } from 'sonner';

interface AnswerCardProps {
  title: string;
  content: string;
}

export default function AnswerCard({ title, content }: AnswerCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: content,
        });
        toast.success('Shared successfully!');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      handleCopy();
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 border-gray-700 bg-gray-900/90 backdrop-blur-sm hover:scale-[1.02] hover:border-gray-600">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg sm:text-xl font-semibold text-white flex items-start gap-2">
          <span className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <pre className="font-mono text-xs sm:text-sm text-gray-200 leading-relaxed whitespace-pre overflow-x-auto bg-black/50 p-4 rounded border border-gray-800 select-text">
          {content}
        </pre>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none border-gray-600 text-white hover:bg-white hover:text-black transition-all duration-300 min-h-[44px]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none border-gray-600 text-white hover:bg-gray-700 transition-all duration-300 min-h-[44px]"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
