"use client";

import Link from "next/link";
import {
  Upload,
  BookOpen,
  Mic,
  Sparkles,
  ArrowRight,
  Headphones,
  FileText,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EmptyLibraryState() {
  return (
    <div className="w-full my-8">
      <Card className="border border-[#e8d5b5] bg-gradient-to-b from-[#fffbf4] to-[#fbf7ee] shadow-md overflow-hidden">
        <CardHeader className="text-center pb-4 pt-8 px-6 sm:px-10">
          <div className="mx-auto size-14 rounded-2xl bg-[#f3e4c7] flex items-center justify-center mb-3 shadow-inner">
            <BookOpen className="size-7 text-[#663820]" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl text-[#212a3b] font-serif font-bold">
            Your Library is Waiting for Its First Book
          </CardTitle>
          <CardDescription className="text-base text-[#5c687e] max-w-xl mx-auto mt-2">
            Upload any PDF to talk with your book, ask questions, and listen to
            real-time voice responses.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-4 sm:px-10 pb-8">
          <Tabs defaultValue="upload" className="w-full max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="size-4" />
                <span className="hidden sm:inline">Quick</span> Upload
              </TabsTrigger>
              <TabsTrigger
                value="how-it-works"
                className="flex items-center gap-2"
              >
                <Sparkles className="size-4" />
                How It Works
              </TabsTrigger>
              <TabsTrigger value="prompts" className="flex items-center gap-2">
                <Lightbulb className="size-4" />
                Test Ideas
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: Quick Upload */}
            <TabsContent value="upload" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/70 border border-[#eddcc4] shadow-xs">
                  <div className="size-10 rounded-full bg-[#f8f0e3] flex items-center justify-center text-[#663820] mb-2.5">
                    <FileText className="size-5" />
                  </div>
                  <h4 className="font-semibold text-sm text-[#212a3b] mb-1">
                    Instant PDF Parsing
                  </h4>
                  <p className="text-xs text-[#5c687e]">
                    Smart chapter and segment indexing ready for deep questions.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/70 border border-[#eddcc4] shadow-xs">
                  <div className="size-10 rounded-full bg-[#f8f0e3] flex items-center justify-center text-[#663820] mb-2.5">
                    <Mic className="size-5" />
                  </div>
                  <h4 className="font-semibold text-sm text-[#212a3b] mb-1">
                    Voice AI Assistant
                  </h4>
                  <p className="text-xs text-[#5c687e]">
                    Talk naturally with low latency voice agents powered by
                    Vapi.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/70 border border-[#eddcc4] shadow-xs">
                  <div className="size-10 rounded-full bg-[#f8f0e3] flex items-center justify-center text-[#663820] mb-2.5">
                    <Headphones className="size-5" />
                  </div>
                  <h4 className="font-semibold text-sm text-[#212a3b] mb-1">
                    Live Transcripts
                  </h4>
                  <p className="text-xs text-[#5c687e]">
                    Follow spoken insights and chat logs in a spacious reader
                    window.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-[#663820] hover:bg-[#522c18] text-white px-8 py-6 text-base font-semibold rounded-xl shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Link href="/books/new" className="flex items-center gap-2">
                    <Upload className="size-5" />
                    Upload a Book to Start Learning
                    <ArrowRight className="size-5 ml-1" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            {/* TAB 2: How It Works */}
            <TabsContent value="how-it-works" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/80 border border-[#eddcc4]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#996515]">
                    Step 01
                  </span>
                  <h4 className="font-semibold text-base text-[#212a3b] mt-1 mb-1.5">
                    Upload PDF Book
                  </h4>
                  <p className="text-xs text-[#5c687e] leading-relaxed">
                    Provide the title, author, and upload your PDF book or
                    paper.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/80 border border-[#eddcc4]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#996515]">
                    Step 02
                  </span>
                  <h4 className="font-semibold text-base text-[#212a3b] mt-1 mb-1.5">
                    Pick Voice Persona
                  </h4>
                  <p className="text-xs text-[#5c687e] leading-relaxed">
                    Choose from curated voice personas to customize the
                    assistant&apos;s tone.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/80 border border-[#eddcc4]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#996515]">
                    Step 03
                  </span>
                  <h4 className="font-semibold text-base text-[#212a3b] mt-1 mb-1.5">
                    Speak &amp; Explore
                  </h4>
                  <p className="text-xs text-[#5c687e] leading-relaxed">
                    Tap the mic, ask questions, or debate ideas directly with
                    the author&apos;s voice.
                  </p>
                </div>
              </div>

              <div className="text-center pt-2">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[#663820] text-[#663820] hover:bg-[#663820]/10 rounded-xl cursor-pointer"
                >
                  <Link href="/books/new">Get Started &rarr; Add Book</Link>
                </Button>
              </div>
            </TabsContent>

            {/* TAB 3: Test Ideas */}
            <TabsContent value="prompts" className="space-y-4">
              <div className="p-5 rounded-xl bg-white/80 border border-[#eddcc4] space-y-3">
                <p className="text-sm font-semibold text-[#212a3b]">
                  Excited to test? Here are great voice prompts to try once your
                  book is uploaded:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-lg bg-[#faf6ee] text-xs font-medium text-[#4a5568] border border-[#e8d5b5]">
                    &ldquo;Give me a 2-minute elevator pitch of this
                    book.&rdquo;
                  </div>
                  <div className="p-3 rounded-lg bg-[#faf6ee] text-xs font-medium text-[#4a5568] border border-[#e8d5b5]">
                    &ldquo;Explain the main arguments in chapter 1 like I&apos;m
                    five.&rdquo;
                  </div>
                  <div className="p-3 rounded-lg bg-[#faf6ee] text-xs font-medium text-[#4a5568] border border-[#e8d5b5]">
                    &ldquo;Quiz me on the key takeaways from this book.&rdquo;
                  </div>
                  <div className="p-3 rounded-lg bg-[#faf6ee] text-xs font-medium text-[#4a5568] border border-[#e8d5b5]">
                    &ldquo;What are the most practical actionable tips?&rdquo;
                  </div>
                </div>
              </div>

              <div className="text-center pt-2">
                <Button
                  asChild
                  className="bg-[#663820] hover:bg-[#522c18] text-white rounded-xl cursor-pointer"
                >
                  <Link href="/books/new">Upload &amp; Try Now</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
