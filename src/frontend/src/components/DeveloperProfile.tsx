import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SiInstagram } from 'react-icons/si';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function DeveloperProfile() {
  return (
    <section className="mt-16">
      <Card className="border-gray-700 bg-gray-900/90 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/assets/generated/josh-profile.dim_200x200.png" alt="JoshNvrDie" />
              <AvatarFallback className="bg-gradient-to-br from-gray-600 to-gray-800 text-white">
                JN
              </AvatarFallback>
            </Avatar>
            About the Developer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-gray-200 text-base sm:text-lg">
              <span className="font-semibold text-white">Created by:</span> JoshNvrDie
            </p>
            <p className="text-gray-400 text-sm sm:text-base">
              Bot/FiveM Developer with good skills. Available for custom bot development.
            </p>
          </div>
          <div className="pt-2">
            <a
              href="https://www.instagram.com/joshnvrdie?igsh=MWZjcnF0emk4aXJiNA=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-600 min-h-[44px]"
            >
              <SiInstagram className="w-5 h-5" />
              Follow on Instagram
            </a>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
